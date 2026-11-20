#!/bin/bash
# 在 Mac mini 上重建並換上新容器。由 .github/workflows/deploy-macmini.yml 透過 ssh 執行。
#
# 結束碼（workflow 依這個碼決定推播內容）：
#   0   成功
#   10  換容器之前就失敗（build 失敗），舊容器沒動，網站照常
#   20  新版沒起來或沒過健康檢查，已退回上一版，退回後健康檢查通過
#   30  退回也失敗、沒有可退回的映像，或其他網站可能停擺的情況
#
# 只用 bash 3.2 有的語法（Mac mini 的 /bin/bash 是 3.2）。
# 測試：scripts/test-rebuild-docker.sh 用假的 docker/curl 跑過各種情境。

# REBUILD_PATH_PREFIX 只給測試用（把假指令放到最前面），平常不設。
export PATH="${REBUILD_PATH_PREFIX:-/Applications/Docker.app/Contents/Resources/bin:/Users/kjyang/.nvm/versions/node/v22.22.0/bin:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin}:$PATH"
export DOCKER_CONFIG="$PWD/.docker-build-config"
mkdir -p "$DOCKER_CONFIG"
printf '{}\n' > "$DOCKER_CONFIG/config.json"

IMAGE="kjyang-wbs-astro"
CONTAINER="kjyang-wbs-astro-container"
# 網站容器的資源上限。Docker VM 只有 4 GB，所有容器都要有上限；
# 每次部署都會重建容器，上限寫在這裡才不會在部署後消失（閒置約用 7 MB）。
CONTAINER_CPUS="0.5"
CONTAINER_MEMORY="64m"
# 健康檢查輪詢次數，每次間隔 1 秒（測試會調小）
HEALTH_TRIES="${REBUILD_HEALTH_TRIES:-30}"

EXIT_BUILD_FAILED=10
EXIT_ROLLED_BACK=20
EXIT_SITE_DOWN=30

# 設置日誌文件
LOG_FILE="docker_rebuild.log"
ERROR_LOG="docker_error.log"

# 輸出時間戳記的函數
timestamp() {
    date "+%Y-%m-%d %H:%M:%S"
}

# 記錄訊息到日誌文件
log() {
    echo "$(timestamp) - $1" | tee -a "$LOG_FILE"
}

# 記錄錯誤到錯誤日誌
log_error() {
    echo "$(timestamp) - ERROR: $1" | tee -a "$ERROR_LOG"
}

finish() {
    log "結束碼 $1"
    exit "$1"
}

# 確保日誌目錄存在
mkdir -p logs

# 清理舊的日誌文件
echo "=== Docker Rebuild Log $(timestamp) ===" > "$LOG_FILE"
echo "=== Docker Error Log $(timestamp) ===" > "$ERROR_LOG"

log "開始Docker重構流程..."

# 先把「正在跑的容器實際用的映像」標成 previous，新容器起不來時可以退回去。
# 不用 :latest：上次部署若已退回，:latest 指的是那個壞掉的映像。
CURRENT_IMAGE_ID=$(docker inspect -f '{{.Image}}' "$CONTAINER" 2>/dev/null)
if [ -n "$CURRENT_IMAGE_ID" ] && docker tag "$CURRENT_IMAGE_ID" "$IMAGE:previous" >/dev/null 2>&1; then
    log "已把目前容器的映像 $CURRENT_IMAGE_ID 標成 previous"
elif docker tag "$IMAGE:latest" "$IMAGE:previous" >/dev/null 2>&1; then
    log "找不到現有容器的映像，改把 $IMAGE:latest 標成 previous"
else
    log "沒有可以標成 previous 的映像（首次部署？）"
fi

# 重新構建鏡像
log "開始重新構建Docker鏡像..."
if docker build --no-cache -t "$IMAGE" . >> "$LOG_FILE" 2>> "$ERROR_LOG"; then
    log "Docker鏡像構建成功"
else
    log_error "Docker鏡像構建失敗，舊容器沒有動"
    finish "$EXIT_BUILD_FAILED"
fi

# 清理舊版以 Node/Astro 直接啟動的網站程序，讓 Docker 接管專案固定的 3000 埠
stop_legacy_preview() {
    if ! command -v pgrep >/dev/null 2>&1; then
        return
    fi
    preview_pids=$(pgrep -f 'astro preview.*--port 3000' 2>/dev/null || true)
    for preview_pid in $preview_pids; do
        preview_command=$(ps -p "$preview_pid" -o command= 2>/dev/null || true)
        log "停止舊版 Astro preview PID $preview_pid: $preview_command"
        kill "$preview_pid" 2>/dev/null || true
    done
}

# 用指定映像啟動容器，最多試三次。成功回 0。
start_container() {
    run_image="$1"
    run_status=1
    for attempt in 1 2 3; do
        stop_legacy_preview
        docker rm -f "$CONTAINER" >/dev/null 2>&1 || true
        run_output=$(docker run -d --restart unless-stopped \
            --cpus "$CONTAINER_CPUS" --memory "$CONTAINER_MEMORY" --memory-swap "$CONTAINER_MEMORY" \
            -p 3000:3000 --name "$CONTAINER" "$run_image" 2>&1)
        run_status=$?
        printf '%s\n' "$run_output" >> "$LOG_FILE"
        if [ "$run_status" -eq 0 ]; then
            log "容器啟動成功（$run_image）"
            return 0
        fi
        printf '%s\n' "$run_output" >> "$ERROR_LOG"
        log_error "第 $attempt 次啟動失敗（$run_image）: $run_output"
        if command -v lsof >/dev/null 2>&1; then
            log "3000 埠目前的監聽程序:"
            lsof -nP -iTCP:3000 -sTCP:LISTEN 2>&1 | tee -a "$LOG_FILE" || true
        fi
        sleep 5
    done
    return 1
}

# 等 /healthz 和首頁都回 200（/healthz 也是 Mac mini 看門狗在檢查的網址）
wait_healthy() {
    for _ in $(seq 1 "$HEALTH_TRIES"); do
        if [ "$(curl -s -o /dev/null -m 3 -w '%{http_code}' http://127.0.0.1:3000/healthz)" = "200" ] \
           && [ "$(curl -s -o /dev/null -m 3 -w '%{http_code}' http://127.0.0.1:3000/)" = "200" ]; then
            return 0
        fi
        sleep 1
    done
    return 1
}

# 新版不能用時退回 previous。退回後健康檢查通過結束碼 20，否則 30。
rollback() {
    log_error "$1"
    docker logs --tail 30 "$CONTAINER" >> "$ERROR_LOG" 2>&1
    if ! docker image inspect "$IMAGE:previous" >/dev/null 2>&1; then
        log_error "沒有 $IMAGE:previous 可以退回，網站可能停擺"
        finish "$EXIT_SITE_DOWN"
    fi
    log "退回上一版鏡像..."
    if ! start_container "$IMAGE:previous"; then
        log_error "退回上一版也啟動失敗，網站可能停擺"
        finish "$EXIT_SITE_DOWN"
    fi
    log "等待退回版本的 /healthz 回應..."
    if wait_healthy; then
        log "已退回上一版，健康檢查通過"
        finish "$EXIT_ROLLED_BACK"
    fi
    log_error "退回上一版後健康檢查仍沒通過，網站可能停擺"
    finish "$EXIT_SITE_DOWN"
}

# 鏡像建好之後才停掉舊容器：建置期間（約 1 到 2 分鐘）舊網站繼續服務，
# 建置失敗時舊容器也還在，網站不會掉。
log "停止並移除現有容器..."
if docker stop "$CONTAINER" >/dev/null 2>&1; then
    log "成功停止容器"
else
    log "容器未運行或已停止"
fi

if docker rm -f "$CONTAINER" >/dev/null 2>&1; then
    log "成功移除容器"
else
    log "容器不存在或已移除"
fi

# 釋放3000埠，避免容器啟動時發生port衝突
PORT_CONTAINERS=$(docker ps -q --filter publish=3000)
if [ -n "$PORT_CONTAINERS" ]; then
    log "偵測到3000埠被占用，開始清理佔用容器..."
    for container_id in $PORT_CONTAINERS; do
        container_name=$(docker inspect --format '{{.Name}}' "$container_id" 2>/dev/null | sed 's#^/##')
        if [ "$container_name" != "$CONTAINER" ]; then
            log "停止容器: $container_name"
            docker stop "$container_id" >> "$LOG_FILE" 2>> "$ERROR_LOG"
            log "移除容器: $container_name"
            docker rm "$container_id" >> "$LOG_FILE" 2>> "$ERROR_LOG"
        fi
    done
fi

stop_legacy_preview

if command -v lsof >/dev/null 2>&1; then
    PORT_PIDS=$(lsof -tiTCP:3000 -sTCP:LISTEN 2>/dev/null || true)
    for port_pid in $PORT_PIDS; do
        process_command=$(ps -p "$port_pid" -o command= 2>/dev/null || true)
        log "3000 埠監聽程序 PID $port_pid: $process_command"
        case "$process_command" in
            *node*|*npm*|*astro*)
                log "停止舊版 Node/Astro 網站程序 PID $port_pid"
                kill "$port_pid"
                ;;
            *)
                # 舊容器已經移除，這時網站是停的；退回也會撞到同一個埠，所以直接回 30。
                log_error "3000 埠由非網站程序占用，拒絕自動停止: $process_command"
                finish "$EXIT_SITE_DOWN"
                ;;
        esac
    done

    # 等待 macOS 釋放 listener，最長 10 秒
    for _ in 1 2 3 4 5 6 7 8 9 10; do
        if ! lsof -tiTCP:3000 -sTCP:LISTEN >/dev/null 2>&1; then
            break
        fi
        sleep 1
    done
fi

# 運行新容器
log "啟動新容器..."
if ! start_container "$IMAGE"; then
    rollback "重試三次後仍無法啟動新容器"
fi

# 檢查容器狀態
log "檢查容器狀態..."
if docker ps | grep "$CONTAINER" >> "$LOG_FILE" 2>> "$ERROR_LOG"; then
    log "容器運行正常"
    log "容器ID: $(docker ps -q -f name=$CONTAINER)"
    log "訪問地址: http://localhost:3000"
else
    rollback "容器未正常運行"
fi

log "等待 /healthz 回應..."
if ! wait_healthy; then
    rollback "新容器 ${HEALTH_TRIES} 秒內沒有通過健康檢查"
fi
log "健康檢查通過"

log "Docker重構完成!"

# Docker may write non-fatal warnings to stderr. Only flag actionable errors.
if tail -n +2 "$ERROR_LOG" | grep -Eiq '(error|failed|cannot|denied|fatal)'; then
    echo "注意：在重構過程中發生錯誤，請查看 $ERROR_LOG 了解詳情"
fi
finish 0
