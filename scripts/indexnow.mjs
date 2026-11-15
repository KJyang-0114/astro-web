// 把網站地圖裡的網址送到 IndexNow（Bing、Yandex、Naver、Seznam 等會共用）。
// 用法：npm run build && npm run indexnow
//       npm run indexnow -- --dry-run   只列出要送的網址，不送出
// 只在網站已經部署完、線上內容和 dist/ 一致之後再跑。
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const host = "kjyang0114.dev";
const key = "1a15de0646f0b73e67feb14cefca1646";
const keyLocation = `https://${host}/${key}.txt`;
const dist = "dist";
// robots.txt 列出的三個網站地圖。
const sitemaps = ["sitemap.xml", "studio/sitemap.xml", "web-highlighter-pro/sitemap.xml"];

if (!existsSync(join(dist, `${key}.txt`))) {
  console.error(`dist/${key}.txt 不存在。先跑 npm run build。`);
  process.exit(1);
}

const urls = [
  ...new Set(
    sitemaps.flatMap((file) => {
      const path = join(dist, file);
      if (!existsSync(path)) throw new Error(`找不到 ${path}，先跑 npm run build。`);
      return [...readFileSync(path, "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map(([, loc]) => loc.trim());
    })
  )
].filter((url) => new URL(url).host === host);

console.log(`${urls.length} 個網址：`);
for (const url of urls) console.log(`  ${url}`);

if (process.argv.includes("--dry-run")) process.exit(0);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList: urls })
});
console.log(`IndexNow 回應：${response.status} ${response.statusText}`);
// 200 = 收到；202 = 收到、金鑰還在驗證；403 = 金鑰檔讀不到；422 = 網址和 host 不符；429 = 送太多次。
if (response.status >= 300) {
  console.log(await response.text());
  process.exit(1);
}
