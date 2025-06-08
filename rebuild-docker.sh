#!/bin/bash

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

if docker rm kjyang-wbs-astro-container >/dev/null 2>&1; then
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

# 運行新容器
log "啟動新容器..."
if docker run -d -p 3000:3000 --name kjyang-wbs-astro-container kjyang-wbs-astro >> "$LOG_FILE" 2>> "$ERROR_LOG"; then
    log "新容器啟動成功"
else
    log_error "新容器啟動失敗"
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

# 如果有錯誤，提示查看錯誤日誌
if [ -s "$ERROR_LOG" ]; then
    echo "注意：在重構過程中發生了一些錯誤，請查看 $ERROR_LOG 了解詳情"
fi 