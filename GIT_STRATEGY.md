# Git 管理策略 - Copilot 實驗期間

## 🎯 目標
為使用 VS Code Insider 的測試版 Copilot 進行安全的代碼修改提供完善的版本控制。

## 📋 分支策略

### 分支結構
- **main** - 主分支，穩定版本
- **backup-before-copilot-changes** - 備份分支，實驗前的完整備份
- **copilot-experiments** - 實驗分支，所有 Copilot 修改都在此進行

### 當前狀態
```
main (穩定)
├── backup-before-copilot-changes (備份)
└── copilot-experiments (當前工作分支)
```

## 🛠️ 工具使用

### Git 管理腳本 (`./git-management.sh`)

#### 常用命令
```bash
# 保存當前進度
./git-management.sh save "修改了導航組件"

# 創建重要檢查點
./git-management.sh checkpoint "完成首頁重構"

# 查看當前狀態
./git-management.sh status

# 恢復到上一個提交
./git-management.sh restore

# 備份到遠端
./git-management.sh backup-to-remote
```

#### 緊急恢復
```bash
# 完全恢復到主分支狀態
./git-management.sh restore-to-main

# 恢復到特定檢查點
./git-management.sh list-checkpoints
./git-management.sh restore-checkpoint checkpoint-20250608_143838
```

## 🚨 安全措施

### 1. 多層備份
- ✅ 遠端備份分支已創建
- ✅ 本地檢查點系統已設置
- ✅ 標籤式快照功能已啟用

### 2. 實驗流程
1. **開始修改前**: 創建檢查點
2. **重要修改後**: 保存進度
3. **完成功能**: 創建檢查點
4. **定期備份**: 推送到遠端

### 3. 恢復策略
- **小問題**: 使用 `restore` 回到上一提交
- **大問題**: 使用 `restore-checkpoint` 回到特定檢查點  
- **災難恢復**: 使用 `restore-to-main` 完全重置

## 📈 建議工作流程

### Copilot 實驗工作流程
1. 確認在 `copilot-experiments` 分支
2. 創建檢查點: `./git-management.sh checkpoint "開始 XXX 功能"`
3. 使用 Copilot 進行修改
4. 測試修改結果
5. 如果滿意: `./git-management.sh save "完成 XXX 功能"`
6. 如果不滿意: `./git-management.sh restore`
7. 重要里程碑: `./git-management.sh checkpoint "XXX 功能完成"`
8. 定期備份: `./git-management.sh backup-to-remote`

### 完成實驗後
1. 測試完整功能
2. 合併到主分支: `git checkout main && git merge copilot-experiments`
3. 推送更新: `git push origin main`
4. 清理實驗分支 (可選)

## 🎮 檢查點系統

### 自動標籤
- 格式: `checkpoint-YYYYMMDD_HHMMSS`
- 包含時間戳和描述
- 可隨時恢復到任意檢查點

### 查看檢查點
```bash
./git-management.sh list-checkpoints
```

### 恢復檢查點
```bash
./git-management.sh restore-checkpoint checkpoint-20250608_143838
```

## ✅ 已完成設置

- [x] 創建備份分支並推送到遠端
- [x] 創建實驗分支
- [x] 設置 Git 管理腳本
- [x] 創建初始檢查點
- [x] 刪除 test 資料夾
- [x] 驗證 .gitignore 配置

## 🎯 下一步

您現在可以安全地使用 VS Code Insider 的 Copilot 進行修改！

記住：
- 定期保存進度
- 重要修改前先創建檢查點
- 有任何問題隨時可以恢復
