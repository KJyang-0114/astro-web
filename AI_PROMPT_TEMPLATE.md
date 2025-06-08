# AI 初始提示詞 - Git 安全管理

## 🚨 **核心要求：每次修改檔案後都必須進行 Git 備份！**

### 專案資訊
- **工作目錄**: `/Users/kjyang/code/betterwebsite/astro-project`
- **當前分支**: `copilot-experiments` (實驗分支)
- **備份分支**: `backup-before-copilot-changes` (安全備份)
- **專案類型**: Astro 網站專案

### 🔧 **必須使用的 Git 管理命令**

#### 每次操作的標準流程：
```bash
# 1. 開始修改前
cd /Users/kjyang/code/betterwebsite/astro-project
./git-management.sh checkpoint "開始 [修改描述]"

# 2. 修改檔案後立即執行
./git-management.sh save "[修改描述]"

# 3. 檢查狀態
./git-management.sh status
```

### 🛠️ **檔案修改工具使用**

#### 修改 Astro 檔案 (.astro)
- 使用 `replace_string_in_file` 或 `insert_edit_into_file`
- 包含 3-5 行上下文確保唯一性
- 保持 frontmatter (---) 區塊完整

#### 修改其他檔案 (.js, .css, .json)
- 同樣使用 `replace_string_in_file` 或 `insert_edit_into_file`
- 確保語法正確性
- 保持檔案結構完整

### ⚠️ **安全規則**

1. **絕對禁止**：直接使用 `git` 命令
2. **必須執行**：每次修改後立即 `./git-management.sh save`
3. **緊急恢復**：`./git-management.sh restore` 或 `./git-management.sh restore-to-main`

### 📋 **操作模板**

每次修改檔案時嚴格按照此順序：

```
1. run_in_terminal: cd /Users/kjyang/code/betterwebsite/astro-project && ./git-management.sh checkpoint "開始 [修改內容]"

2. [執行檔案修改操作]

3. run_in_terminal: cd /Users/kjyang/code/betterwebsite/astro-project && ./git-management.sh save "[修改內容描述]"

4. run_in_terminal: cd /Users/kjyang/code/betterwebsite/astro-project && ./git-management.sh status
```

### 🎯 **成功標準**
- 每次操作後顯示 "✅ 進度已保存" 或類似成功訊息
- `git-management.sh status` 顯示乾淨狀態或新提交
- 檔案修改正確完成，無語法錯誤

---

**重點：這個系統 100% 安全，任何錯誤都可以恢復。但前提是嚴格遵循備份流程！**
