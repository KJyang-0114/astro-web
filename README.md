# 🚀 KJyang 個人網站 - Astro 版本

使用 Astro 框架建立的現代化個人網站，具有高效能、輕量級和響應式設計特點。

## ✨ 功能特點

- 🌙 **深色主題設計** - 現代化的視覺體驗
- 📱 **響應式布局** - 完美適配所有設備
- 💼 **作品集展示** - 專業的專案展示
- 🤖 **AI 探索頁面** - 跨星際高鐵主題的 AI 知識介紹
- 🎮 **互動功能** - 五子棋遊戲和隱藏彩蛋
- 📧 **聯絡方式** - 多種聯絡管道
- ⚡ **高效能載入** - Astro 靜態生成優化

## 🛠️ 技術棧

- **框架**: Astro 4.x
- **樣式**: CSS3 + CSS 變數
- **互動**: JavaScript + GSAP 動畫
- **圖示**: Font Awesome 6.x
- **部署**: Docker + Nginx
- **開發工具**: TypeScript, ESLint

## 📁 專案結構

```
astro-project/
├── src/
│   ├── components/       # 可重用組件
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   └── ProjectCard.astro
│   ├── layouts/          # 頁面佈局
│   │   └── Layout.astro
│   ├── pages/            # 頁面路由
│   │   ├── index.astro   # 首頁
│   │   ├── about.astro   # 關於我
│   │   ├── projects.astro # 作品集
│   │   ├── ai.astro      # AI 探索 🌟
│   │   ├── contact.astro # 聯絡我
│   │   └── ...
│   ├── scripts/          # JavaScript 腳本
│   └── styles/           # 全域樣式
├── public/               # 靜態資源
└── docker/               # Docker 配置
```

## 🚀 開始使用

### 方法一：本地開發

#### 安裝依賴

```bash
npm install
```

#### 開發伺服器

```bash
npm run dev
```

伺服器將在 `http://localhost:4321` 啟動

#### 建置生產版本

```bash
npm run build
```

### 方法二：Docker 部署 🐳

#### 快速部署

```bash
# 重新構建並部署
./rebuild-docker.sh
```

#### 手動 Docker 操作

```bash
# 構建鏡像
docker build -t kjyang-wbs-astro .

# 運行容器
docker run -d -p 3000:3000 --name kjyang-wbs-astro-container kjyang-wbs-astro
```

網站將在 `http://localhost:3000` 可用

## 🌟 特色頁面介紹

### 🤖 AI 探索頁面 (`/ai`)

採用"跨星際高鐵"主題設計的 AI 知識介紹頁面：

- **英雄區**: 高鐵駕駛艙風格，星空動畫背景
- **知識站點**: 6個主要學習站點
  - 01 站：AI 基礎概念
  - 02 站：AI 超能力展示
  - 03 站：AI 邊界說明
  - 04 站：迷思破解
  - 05 站：時空軌跡（發展歷程）
  - ∞ 站：未來展望
- **設計特色**: 雜誌風格佈局，高對比配色，豐富的動畫效果

### 🎮 隱藏功能

- 點擊首頁頭像 5 次解鎖秘密遊戲
- 五子棋遊戲 (`/gomoku-game`)
- 滾動觸發的 GSAP 動畫

## 🔧 開發指令

```bash
# 開發伺服器
npm run dev

# 建置專案
npm run build

# 預覽建置結果
npm run preview

# 檢查語法
npm run astro check

# Docker 重新部署
./rebuild-docker.sh

# Git 安全管理
./git-management.sh [command]
```

## 🌐 線上訪問

- **主網站**: [kjyang0114.site](https://kjyang0114.site)
- **AI 探索**: [kjyang0114.site/ai](https://kjyang0114.site/ai)

## 📄 授權

MIT License - 詳見 LICENSE 文件

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

---

⚡ **由 Astro 強力驅動** | 🎨 **設計靈感來自未來科技** | 🚀 **持續改進中**
