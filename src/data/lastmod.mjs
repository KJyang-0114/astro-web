// 網站地圖的 <lastmod>：每一頁「主要內容」最後一次修改的日期。
// 日期取自 git log（該頁的頁面檔和資料檔裡最新的 commit 日期），
// 只改 <head>、頁尾連結這類不算內容修改。改了某頁的內容就要更新這裡。
// 這個檔案是純 JS，astro.config.mjs 也會讀。

/** 2026-11-16：Studio 全面改寫（ad4babf），以及這次 SEO 整理新增的作品頁內容。 */
const exact = {
  "/": "2026-11-16",
  "/about": "2026-09-14",
  "/ai": "2026-09-14",
  "/contact": "2026-09-07",
  "/now": "2026-09-11",
  "/play": "2026-09-11",
  "/projects": "2026-11-16",
  "/projects/synk-atelier": "2026-11-16",
  "/projects/weilspa": "2026-11-16",
  "/resume": "2026-09-14",
  "/en/resume": "2026-09-14",
};

const prefixes = [
  ["/studio", "2026-11-16"],
  ["/projects/", "2026-09-14"],
];

/** @param {string} path 不含網域、結尾不加斜線的路徑，例如 "/studio/pricing" */
export function lastmodFor(path) {
  const clean = path.replace(/\/$/, "") || "/";
  if (exact[clean]) return exact[clean];
  for (const [prefix, date] of prefixes) {
    if (clean === prefix || clean.startsWith(prefix.endsWith("/") ? prefix : `${prefix}/`)) return date;
  }
  return undefined;
}

// 不該出現在任何網站地圖的路徑（noindex 或舊網址）。
export const nonIndexablePatterns = [
  /^\/studio\/(?:en\/)?demo(?:\/|$)/,
  /^\/(?:secret-game|gomoku-game|question-bank)(?:\/|$)/,
  /^\/404(?:\/|$)/,
];
