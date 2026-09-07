#!/bin/bash

export PATH="/Applications/Docker.app/Contents/Resources/bin:/Users/kjyang/.nvm/versions/node/v22.22.0/bin:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
export DOCKER_CONFIG="$PWD/.docker-build-config"
mkdir -p "$DOCKER_CONFIG"
printf '{}\n' > "$DOCKER_CONFIG/config.json"

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

# 確保日誌目錄存在
mkdir -p logs

# 清理舊的日誌文件
echo "=== Docker Rebuild Log $(timestamp) ===" > "$LOG_FILE"
echo "=== Docker Error Log $(timestamp) ===" > "$ERROR_LOG"

log "開始Docker重構流程..."

# 停止並移除現有容器
log "停止並移除現有容器..."
if docker stop kjyang-wbs-astro-container >/dev/null 2>&1; then
    log "成功停止容器"
else
    log "容器未運行或已停止"
fi

if docker rm -f kjyang-wbs-astro-container >/dev/null 2>&1; then
    log "成功移除容器"
else
    log "容器不存在或已移除"
fi

# 重新構建鏡像
log "開始重新構建Docker鏡像..."
if docker build --no-cache -t kjyang-wbs-astro . >> "$LOG_FILE" 2>> "$ERROR_LOG"; then
    log "Docker鏡像構建成功"
else
    log_error "Docker鏡像構建失敗"
    exit 1
fi

# 釋放3000埠，避免容器啟動時發生port衝突
PORT_CONTAINERS=$(docker ps -q --filter publish=3000)
if [ -n "$PORT_CONTAINERS" ]; then
    log "偵測到3000埠被占用，開始清理佔用容器..."
    for container_id in $PORT_CONTAINERS; do
        container_name=$(docker inspect --format '{{.Name}}' "$container_id" 2>/dev/null | sed 's#^/##')
        if [ "$container_name" != "kjyang-wbs-astro-container" ]; then
            log "停止容器: $container_name"
            docker stop "$container_id" >> "$LOG_FILE" 2>> "$ERROR_LOG"
            log "移除容器: $container_name"
            docker rm "$container_id" >> "$LOG_FILE" 2>> "$ERROR_LOG"
        fi
    done
fi

# 運行新容器
log "啟動新容器..."
RUN_STATUS=1
for attempt in 1 2 3; do
    docker rm -f kjyang-wbs-astro-container >/dev/null 2>&1 || true
    RUN_OUTPUT=$(docker run -d -p 3000:3000 --name kjyang-wbs-astro-container kjyang-wbs-astro 2>&1)
    RUN_STATUS=$?
    printf '%s\n' "$RUN_OUTPUT" >> "$LOG_FILE"
    if [ "$RUN_STATUS" -eq 0 ]; then
        log "新容器啟動成功"
        break
    fi
    printf '%s\n' "$RUN_OUTPUT" >> "$ERROR_LOG"
    log_error "第 $attempt 次啟動失敗: $RUN_OUTPUT"
    if command -v lsof >/dev/null 2>&1; then
        log "3000 埠目前的監聽程序:"
        lsof -nP -iTCP:3000 -sTCP:LISTEN 2>&1 | tee -a "$LOG_FILE" || true
    fi
    sleep 5
done

if [ "$RUN_STATUS" -ne 0 ]; then
    log_error "重試三次後仍無法啟動新容器"
    exit 1
fi

# 檢查容器狀態
log "檢查容器狀態..."
if docker ps | grep kjyang-wbs-astro-container >> "$LOG_FILE" 2>> "$ERROR_LOG"; then
    log "容器運行正常"
    log "容器ID: $(docker ps -q -f name=kjyang-wbs-astro-container)"
    log "訪問地址: http://localhost:3000"
else
    log_error "容器未正常運行"
    exit 1
fi

log "Docker重構完成!"

# Docker may write non-fatal warnings to stderr. Only flag actionable errors.
if tail -n +2 "$ERROR_LOG" | grep -Eiq '(error|failed|cannot|denied|fatal)'; then
    echo "注意：在重構過程中發生錯誤，請查看 $ERROR_LOG 了解詳情"
fi
