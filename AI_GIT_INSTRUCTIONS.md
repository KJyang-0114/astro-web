# AI Git 管理指令 - 完整操作指南

## 🎯 重要提醒
這是一個 Astro 專案，已設置完善的 Git 安全管理系統。**每次修改檔案後都必須進行 Git 備份操作**，確保代碼安全。

## 📁 專案基本資訊

### 專案結構
```
/Users/kjyang/code/betterwebsite/astro-project/
├── src/
│   ├── components/       # Astro 組件
│   ├── layouts/         # 佈局檔案
│   ├── pages/           # 頁面檔案
│   ├── scripts/         # JavaScript 檔案
│   └── styles/          # CSS 樣式檔案
├── public/              # 靜態資源
├── git-management.sh    # Git 管理腳本（重要！）
├── GIT_STRATEGY.md      # Git 策略文檔
└── AI_GIT_INSTRUCTIONS.md # 本檔案
```

### 分支狀態
- **當前工作分支**: `copilot-experiments`
- **備份分支**: `backup-before-copilot-changes` (已推送到遠端)
- **主分支**: `main` (穩定版本)

## 🔧 Git 管理腳本使用

### 工作目錄
所有命令都在此目錄執行：
```bash
cd /Users/kjyang/code/betterwebsite/astro-project
```

### 核心命令

#### 1. 檢查當前狀態（任何操作前都要執行）
```bash
./git-management.sh status
```

#### 2. 創建檢查點（重要修改前）
```bash
./git-management.sh checkpoint "描述性信息"
# 例如：./git-management.sh checkpoint "開始修改導航組件"
```

#### 3. 保存進度（完成修改後）
```bash
./git-management.sh save "修改描述"
# 例如：./git-management.sh save "完成導航組件樣式調整"
```

#### 4. 緊急恢復操作
```bash
# 恢復到上一個提交
./git-management.sh restore

# 查看所有檢查點
./git-management.sh list-checkpoints

# 恢復到特定檢查點
./git-management.sh restore-checkpoint checkpoint-標籤名

# 完全重置到主分支狀態（災難恢復）
./git-management.sh restore-to-main
```

#### 5. 備份到遠端
```bash
./git-management.sh backup-to-remote
```

## 📋 **必須遵循的操作流程**

### 標準工作流程（每次都要遵循）

1. **開始修改前**
   ```bash
   cd /Users/kjyang/code/betterwebsite/astro-project
   ./git-management.sh status
   ./git-management.sh checkpoint "開始 [修改內容描述]"
   ```

2. **進行檔案修改**
   - 使用適當的工具修改檔案
   - 確保修改正確完成

3. **修改完成後立即備份**
   ```bash
   ./git-management.sh save "[修改內容描述]"
   ```

4. **重要里程碑**
   ```bash
   ./git-management.sh checkpoint "完成 [功能描述]"
   ```

5. **定期遠端備份**
   ```bash
   ./git-management.sh backup-to-remote
   ```

## 🛠️ 檔案修改操作指南

### 1. Astro 頁面檔案 (.astro)
- **位置**: `src/pages/`, `src/layouts/`, `src/components/`
- **修改工具**: 使用 `replace_string_in_file` 或 `insert_edit_into_file`
- **注意事項**: 
  - 保持 frontmatter (---之間的部分) 完整
  - 確保 HTML 結構正確
  - 檢查組件導入路徑

### 2. JavaScript 檔案 (.js)
- **位置**: `src/scripts/`
- **修改工具**: 使用 `replace_string_in_file` 或 `insert_edit_into_file`
- **注意事項**: 
  - 保持語法正確
  - 確保函數完整性

### 3. CSS 檔案 (.css)
- **位置**: `src/styles/`
- **修改工具**: 使用 `replace_string_in_file` 或 `insert_edit_into_file`
- **注意事項**: 
  - 保持選擇器正確
  - 確保樣式語法正確

### 4. 配置檔案
- **astro.config.mjs**, **package.json** 等
- **特別小心**: 這些檔案影響整個專案
- **修改前**: 必須創建檢查點
- **修改後**: 立即測試並備份

## ⚠️ 安全檢查清單

### 每次修改後必須檢查
1. ✅ 檔案修改是否成功
2. ✅ 語法是否正確
3. ✅ 執行 `./git-management.sh save "描述"`
4. ✅ 確認備份成功

### 重要修改前必須執行
1. ✅ 執行 `./git-management.sh status`
2. ✅ 執行 `./git-management.sh checkpoint "描述"`
3. ✅ 確認檢查點創建成功

### 出現錯誤時的恢復步驟
1. **輕微錯誤**: `./git-management.sh restore`
2. **嚴重錯誤**: `./git-management.sh restore-checkpoint [標籤名]`
3. **災難情況**: `./git-management.sh restore-to-main`

## 🚨 **絕對禁止的操作**

1. **禁止直接使用 git 命令** - 只能使用 `git-management.sh` 腳本
2. **禁止修改 `.git` 資料夾**
3. **禁止刪除備份分支**
4. **禁止在沒有備份的情況下進行大量修改**
5. **禁止跳過檢查點創建步驟**

## 📝 **AI 操作模板**

### 每次修改檔案時使用此模板：

```
1. 檢查狀態：
   run_in_terminal: cd /Users/kjyang/code/betterwebsite/astro-project && ./git-management.sh status

2. 創建檢查點：
   run_in_terminal: cd /Users/kjyang/code/betterwebsite/astro-project && ./git-management.sh checkpoint "開始 [具體修改內容]"

3. 進行檔案修改：
   [使用適當工具修改檔案]

4. 立即備份：
   run_in_terminal: cd /Users/kjyang/code/betterwebsite/astro-project && ./git-management.sh save "[具體修改內容描述]"

5. 驗證操作：
   run_in_terminal: cd /Users/kjyang/code/betterwebsite/astro-project && ./git-management.sh status
```

## 🎯 **成功標準**

每次操作後確認：
1. Git 狀態顯示 "working tree clean" 或有新的提交
2. 檢查點或保存操作顯示 "✅" 成功標記
3. 檔案修改達到預期效果
4. 沒有語法錯誤或構建錯誤

## 📞 **緊急聯絡資訊**

如果遇到無法解決的問題：
1. 執行 `./git-management.sh status` 查看當前狀態
2. 執行 `./git-management.sh list-checkpoints` 查看可用恢復點
3. 如有疑問，寧可保守操作，使用恢復功能

---

**重要提醒**: 這個系統的設計目標是 100% 安全，任何時候都可以恢復。請嚴格遵循流程，每次修改都要備份！
