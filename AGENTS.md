# AGENTS.md

kjyang0114.dev 的原始碼：Astro 靜態網站，個人作品集加上 `/studio` 接案頁。

## 指令

- `npm run check:fast`：只檢查這次改到的檔案（`git diff HEAD` 加未追蹤檔）。改完先跑這個。
- `npm run check`：完整檢查，CI 用。lint → `astro check` → build → 六支 `scripts/verify-*.mjs` → `rebuild-docker.sh` 的假指令測試（`npm run test:rebuild`）。
- `npm run verify:runtime`：用 Dockerfile 在本機起測試容器，打 `/healthz`、sitemap 路由、轉址、404、Content-Type、快取標頭。要先開 Docker。只連 127.0.0.1。

## 目錄

- `src/pages/`：路由。`*.md.ts`、`*.txt.ts`、`sitemap.xml.ts` 是給搜尋引擎和 AI 讀的端點。
- `src/data/*.ts`：頁面內容（作品、Studio 服務、案例、文章、履歷、SEO）。改內容改這裡，不要寫死在 template。
- `src/data/lastmod.mjs`：sitemap 的 `<lastmod>`，手動維護。改了某頁的主要內容就更新日期。
- `src/components/`、`src/layouts/`：共用元件與版型。`src/scripts/`：瀏覽器端程式（動畫、wire art）。
- `public/`：原樣複製到網站的靜態檔，不經過 lint 和 build。
- `scripts/`：驗證與工具腳本（Node 直接跑）。
- `docker/nginx-site.conf`、`Dockerfile`：正式環境是 nginx 送 `dist/`。`/healthz` 是看門狗在打的網址，不要拿掉。
- `dist/`、`.astro/`：build 產物，不要手改。

## 不會被 lint 擋、但要遵守的事

- `.gitignore` 是白名單（`/*` 忽略根目錄每一項）。根目錄新增檔案或資料夾要加 `!/名稱`，否則不會進 git，也不會部署。新增檔案後用 `git status` 確認。
- push `main` 就是正式部署：GitHub Actions 先跑 `ci-gate`（`npm run check`、`docker build`、`verify:runtime`），通過後用 `rsync --delete` 同步到主機，再由 `rebuild-docker.sh` 重建容器（結束碼的意思寫在腳本開頭）。PR 只跑 `ci-gate`，不部署。主機上沒進 repo 的檔案下次部署會被刪掉，所以不要直接改主機上的檔案。
- 這是公開 repo。不要把電話號碼、token、推播頻道名稱寫進檔案或 commit 訊息。聯絡方式只有 LINE ID 和 Email。
- 新增頁面要同時處理：`src/data/lastmod.mjs` 的日期、`scripts/verify-site.mjs` 或 `verify-seo.mjs` 的檢查、需要的話 sitemap 與 llms 清單（由 `src/data/discovery.ts` 等資料檔產生，不要改輸出）。
- 舊網址轉到新網址寫在 `astro.config.mjs` 的 `redirects`，sitemap 會自動排除。
- `/studio` 的文字照 `docs/studio-writing-guide.md` 寫，`verify:studio` 只擋得到一部分。SEO 規則見 `docs/seo-notes.md`。
- 動畫要能暫停，並尊重 `prefers-reduced-motion`；沒有 WebGL 或 JavaScript 時內容照樣能讀（參考 `src/scripts/wire-art.ts`）。
