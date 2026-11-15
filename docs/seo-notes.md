# SEO／AI 搜尋整理紀錄（2026-11-16）

這次只動「搜尋引擎和 AI 怎麼讀網站」的部分，Studio 的內文沒有改寫。新增的中文都照 `docs/studio-writing-guide.md`。

改完要跑：`npm run build`，再跑 `node scripts/verify-seo.mjs`（或 `npm run verify:seo`）。

## 這次改了什麼

### 分享圖
- LINE、Facebook、Threads、X、iMessage 都不顯示 SVG，所以 Studio 改用 PNG：
  - `public/brand/kjyang-studio-og.png`（中文頁）
  - `public/brand/kjyang-studio-og-en.png`（英文頁）
  - `public/brand/kjyang-mark-512.png`（結構化資料的 logo、手機加到主畫面的圖示）
- 產生方式：`npm run og-images`（`scripts/generate-og-images.mjs`，用 macOS 內建的 PingFang TC、LiSong Pro）。改價格或文字之後要重跑，再打開 PNG 看中文有沒有變方框。
- 每頁都有 og:image 的寬高、替代文字、twitter:image、og:locale（中文 zh_TW、英文 en_US）。文章頁的 og:type 是 article，並附上發布與修改日期。
- 個人網站原本就有 `og-portfolio.png`（1200×630），沒換。

### 標題與說明
- 每個可被搜尋的頁面標題、說明都不重複，標題控制在搜尋結果不會被截斷的長度。
- Studio 核心頁的標題、說明集中在 `src/data/seo.ts` 的 `studioPageMeta`，llms.txt 也從這裡讀。
- 服務頁、作品頁原本的說明太短，在 `trust.ts` 加了 `metaDescription`、在 `cases.ts` 加了 `seoTitle`／`seoDescription`，只用在搜尋結果，頁面上看不到。
- 個人網站的頁面標題都帶「楊凱捷 KJyang」。

### 網址、語言、索引
- 中英文對應頁（Studio 首頁、服務、價格、聯絡）互相指向，x-default 一律指中文頁。之前英文頁的 x-default 指自己，跟中文頁對不起來。
- 不給搜尋的頁面：設計範例（`/studio/demo`、`/studio/en/demo`）、404，以及三個沒有放連結的舊頁面 `/secret-game`、`/gomoku-game`、`/question-bank`（加了 noindex，也從網站地圖拿掉）。如果想讓這三頁被搜到，把 noindex 拿掉、從 `src/data/lastmod.mjs` 的排除清單刪掉，並在網站上放連結。
- 舊網址轉址頁（`astro.config.mjs` 的 redirects）本來就是 noindex 加 canonical 指向新網址，沒動。
- 404 頁加了兩邊的常用連結。

### 結構化資料（JSON-LD）
- 只有一個人：`https://kjyang0114.dev/#person`，所有頁面都引用同一個。
- Studio 是一個 `ProfessionalService`（`/studio#organization`）：founder 是上面那個人、服務地區、`priceRange: NT$18,000 起`、中英文、LINE 回覆時段、地址只寫到新北市。原本另外一個重複的 ProfessionalService 和 Studio 自己的 WebSite 拿掉了；Organization 的 sameAs 不再放個人的 GitHub、IG。
- 價格頁、服務頁有 Service＋Offer，價格直接從 `studio.ts` 讀。
- 文章改成 BlogPosting，有發布日、修改日、作者、PNG 圖、mainEntityOfPage。
- 所有 Studio 子頁和作品頁都有麵包屑。FAQ 只放在頁面上看得到問答的地方。沒有評價、星等。
- 個人作品：有公開原始碼的用 SoftwareSourceCode，沒有的用 CreativeWork。

### 網站地圖
- robots.txt 列三個：`/sitemap.xml`（個人網站）、`/studio/sitemap.xml`、`/web-highlighter-pro/sitemap.xml`。每個網址只出現一次，沒有轉址頁和 noindex 頁。
- `<lastmod>` 寫在 `src/data/lastmod.mjs`，日期取自 git commit。**改了某頁的內容，就要更新這個檔案的日期。** 只改 head 或頁尾不算。
- `@astrojs/sitemap` 產生的 `sitemap-index.xml` 留著（如果曾經送過 Search Console 才不會報錯），排除規則和上面一致。

### 給 AI 讀的檔案
- `/llms.txt`、`/llms-full.txt`、`/studio/llms.txt`、`/index.md`、`/studio.md` 改成同一份資料來源（`src/data/discovery.ts`）：最上面先用幾句完整的話講是誰、做什麼、在哪裡、多少錢、做過什麼（Weilspa、SYNK ATELIER 和 /game、這個網站），再列頁面。
- 拿掉過時的說法（例如「five-page websites」、把產品寫進 Studio 基本資料）。
- 價格頁第一屏加了一排價格摘要（從 `studio.ts` 讀）。
- robots.txt：Content-Signal（search=yes, ai-input=yes, ai-train=no）原本只寫在最上面，不屬於任何一組，爬蟲可能讀不到。現在每一組都寫一次，政策沒變。允許的爬蟲加上 OAI-SearchBot、ChatGPT-User、Claude-SearchBot、Claude-User、Perplexity-User、Applebot、Applebot-Extended。

### 站內連結
- 個人作品集加了兩個真實作品：SYNK ATELIER（`/projects/synk-atelier`）和 Weilspa 預約系統（`/projects/weilspa`），內容只取自 `cases.ts`。作品從 8 個變 10 個，`verify-site.mjs`、`verify-discovery.mjs` 的數量跟著改成讀清單長度。首頁「08 / SELECTED WORK」改成依實際數量顯示。
- Studio 作品頁連到個人網站的作品頁，反過來也有。
- 每篇文章側欄加「相關頁面」，連到對應的價格、服務、作品頁。
- 個人網站頁尾加了 Web Highlighter Pro 的連結（它原本沒有任何站內連結）。
- `verify-seo.mjs` 會檢查每個可搜尋的頁面，從 `/` 或 `/studio` 點 3 次以內都到得了。

### IndexNow
- 金鑰檔：`public/1a15de0646f0b73e67feb14cefca1646.txt`。
- 部署完成後跑 `npm run build && npm run indexnow`。先用 `npm run indexnow -- --dry-run` 看要送哪些網址。這次沒有送出。

### 速度
- 補上圖片寬高（作品架構圖、LINE QR code、Web Highlighter Pro 截圖），避免載入時版面跳動。
- 字型本來就有 `font-display: swap`，圖片大多已經是 lazy。

## 還沒做、建議之後處理
- Studio 每一頁都載入同一個約 570 KB 的 CSS（壓縮前），裡面有範例網站才用到的字型（Baloo 2、Cinzel、Josefin Sans、Lexend）和大量樣式。把範例網站的 CSS 拆出去，Studio 頁面會快很多。這次不動 CSS 結構。
- Studio 頁面都會載入約 120 KB 的動畫腳本（GSAP），但主要是範例網站在用。可以改成只在範例頁載入。
- 個人網站首頁的 three.js（約 700 KB）建議確認是否只在需要時才載入。
- Web Highlighter Pro 的四篇說明頁沒有發布日期和作者，結構化資料不完整。要補的話請用真實日期。
- `/studio/en` 底下的頁面沒有 Service 結構化資料；英文頁內容較少，之後可以補。

## 只有你能做的事（站外）
1. **Google Search Console**：驗證 `kjyang0114.dev`，送出 robots.txt 裡的三個網站地圖，用「網址檢查」要求索引 `/studio`、`/studio/pricing`、三個作品頁。
2. **Bing Webmaster Tools**：一樣送網站地圖（ChatGPT 搜尋、Copilot 都用 Bing 的索引）。之後每次部署可以跑 `npm run indexnow`。
3. **Google 商家檔案**：如果願意，以「服務範圍型商家」建立（不公開地址），服務地區填雙北、桃園，網站填 `/studio`。這是在地搜尋最有用的一步。
4. **個人檔案互相連結**：GitHub、LinkedIn、Instagram、Threads 的個人簡介放 `https://kjyang0114.dev/`；LINE 官方帳號或個人簡介放 `/studio`。
5. **請 Weilspa 前台上線後，在頁尾放一個「網站製作：KJyang Studio」連到 `/studio/work/spa-booking-system`**（店家同意才放）。SYNK ATELIER 也可以在頁尾放同樣的連結。
6. 在 Threads 介紹作品時，貼文附上作品頁網址（不是只放首頁）。
7. Cloudflare：確認沒有開啟會擋 AI 爬蟲的「Block AI bots」，或至少讓搜尋用的爬蟲（OAI-SearchBot、Claude-SearchBot、PerplexityBot）通過；也確認 Cloudflare 的「Managed robots.txt」沒有覆蓋網站自己的 robots.txt。
