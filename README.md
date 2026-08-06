# KJyang Website / Studio

以 Astro 建立的個人網站，整合作品導覽、學習紀錄、網站服務頁與互動 Demo。

- Website：[kjyang0114.dev](https://kjyang0114.dev/)
- Studio：[kjyang0114.dev/studio](https://kjyang0114.dev/studio/)

| 個人首頁 | Studio |
|---|---|
| ![Personal website](assets/personal-home.png) | ![Studio](assets/studio-home.png) |

## 主要功能

- 多頁作品集與專案內容。
- 中英文內容與 SEO metadata。
- Studio 服務頁、流程說明、FAQ 與 Demo library。
- Astro 靜態建置與 responsive layout。
- GitHub Actions、Docker 與自架主機部署流程。

## 專案結構

```text
src/pages/           網站路由
src/pages/studio/    Studio 頁面與 Demo
src/data/            服務、案例與 SEO 結構化內容
src/components/      Navigation、layout、footer 與共用元件
public/              品牌、圖片與靜態產品檔案
.github/workflows/   Build 與部署流程
```

## 核心程式

| 結構化內容 | Build 與部署檢查 |
|---|---|
| ![Structured service data](assets/services-code.png) | ![Deployment workflow](assets/deploy-code.png) |

## 實作重點

### 內容資料化

服務、流程、FAQ 與頁面 metadata 放在 `src/data`，避免相同資訊散落在多個 template，也讓不同頁面共用一致資料。

### 元件與版型

Navigation、shell、section、card 與 footer 使用共用 components。頁面保留自己的內容結構，不重複處理基礎 layout。

### 部署流程

GitHub Actions 先安裝依賴並執行 build，再檢查部署環境變數，透過 SSH 同步輸出並重建 Docker container。

## 本機執行

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Docker：

```bash
docker compose up --build
```

## 限制

- 部署需要主機、DNS、TLS 與 SSH secrets。
- Demo library 用於展示介面與操作流程，不連接正式客戶資料。
- SEO 與流量成效需要另外接上分析工具後量測。

