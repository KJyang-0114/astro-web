// 檢查建置後 dist/ 的 SEO 規則。先跑 npm run build。
// 規則說明見 docs/seo-notes.md。
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const origin = "https://kjyang0114.dev";
const personId = `${origin}/#person`;
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]
  );

// dist/studio/pricing/index.html → /studio/pricing；dist/web-highlighter-pro/a.html → /web-highlighter-pro/a.html
const pathOf = (file) => {
  const rel = file.slice(dist.length).replace(/\\/g, "/");
  if (rel === "/index.html") return "/";
  if (rel.endsWith("/index.html")) return rel.slice(0, -"/index.html".length);
  return rel;
};
const norm = (url) => {
  const u = new URL(url, origin);
  return u.pathname === "/" ? "/" : u.pathname.replace(/\/$/, "");
};
const attr = (html, re) => html.match(re)?.[1];
const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const visibleText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<head[\s\S]*?<\/head>/g, " ")
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ");
// 標題寬度：中日韓全形字算 1，其他算 0.5。約 30 以內不會在搜尋結果被截斷。
// 台灣時間的今天（lastmod 不能是未來的日期）
const today = new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
// 半形：U+0000–U+00FF，加上 – 和 —。
const isHalfWidth = (ch) => {
  const cp = ch.codePointAt(0);
  return cp <= 0xff || cp === 0x2013 || cp === 0x2014;
};
const width = (text) => [...text].reduce((sum, ch) => sum + (isHalfWidth(ch) ? 0.5 : 1), 0);

const pages = walk(dist)
  .filter((file) => file.endsWith(".html"))
  .map((file) => {
    const html = readFileSync(file, "utf8");
    const robots = attr(html, /<meta name="robots" content="([^"]+)"/i) ?? "";
    const redirect = /<meta http-equiv="refresh"/i.test(html) && !/<main(?:\s|>)/.test(html);
    return { file, path: pathOf(file), html, robots, redirect, noindex: /noindex/i.test(robots) };
  });
const byPath = new Map(pages.map((page) => [page.path, page]));
const indexable = pages.filter((page) => !page.redirect && !page.noindex);

// 1. 標題、說明、h1、canonical、lang、og:image
const titles = new Map();
const descriptions = new Map();
for (const page of indexable) {
  const { html, path } = page;
  const title = decode(attr(html, /<title>([\s\S]*?)<\/title>/)?.trim() ?? "");
  const description = decode(attr(html, /<meta name="description" content="([^"]*)"/) ?? "");
  check(title, `${path}: missing <title>`);
  check(width(title) <= 36, `${path}: title too long (${width(title)}): ${title}`);
  check(description.length >= 40, `${path}: description too short (${description.length})`);
  // 例外：SYNK ATELIER 英文頁的說明照文案原文（190 字元），不截短。
  if (path !== "/en/projects/synk-atelier") check(description.length <= 170, `${path}: description too long (${description.length})`);
  if (titles.has(title)) failures.push(`${path}: duplicate title with ${titles.get(title)}: ${title}`);
  titles.set(title, path);
  if (descriptions.has(description)) failures.push(`${path}: duplicate description with ${descriptions.get(description)}`);
  descriptions.set(description, path);

  check((html.match(/<h1(?:\s|>)/g) || []).length === 1, `${path}: needs exactly one <h1>`);
  const lang = attr(html, /<html[^>]*\slang="([^"]+)"/);
  check(lang === "zh-Hant" || lang === "en", `${path}: html lang is ${lang}`);

  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  check(canonical?.startsWith(`${origin}/`), `${path}: canonical missing or not absolute (${canonical})`);
  if (canonical) check(norm(canonical) === norm(path), `${path}: canonical points elsewhere (${canonical})`);

  const ogImage = attr(html, /<meta property="og:image" content="([^"]+)"/);
  check(ogImage, `${path}: missing og:image`);
  if (ogImage) {
    check(/\.(png|jpe?g)$/i.test(ogImage), `${path}: og:image is not PNG/JPEG (${ogImage})`);
    check(ogImage.startsWith(origin) && existsSync(join(dist, new URL(ogImage).pathname)), `${path}: og:image file not in dist (${ogImage})`);
  }
  check(/<meta name="twitter:image" content="[^"]+"/.test(html), `${path}: missing twitter:image`);
  const locale = attr(html, /<meta property="og:locale" content="([^"]+)"/);
  if (locale) check(locale === (lang === "en" ? "en_US" : "zh_TW"), `${path}: og:locale ${locale} does not match lang ${lang}`);

  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) {
    if (img.includes("${")) continue;
    check(/\salt="/.test(img), `${path}: <img> without alt: ${img.slice(0, 80)}`);
    check(/\swidth="\d+"/.test(img) && /\sheight="\d+"/.test(img), `${path}: <img> without width/height: ${img.slice(0, 80)}`);
  }
}

// 2. JSON-LD
const graphOf = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, source]) => {
    const data = JSON.parse(source);
    return Array.isArray(data) ? data : data["@graph"] ?? [data];
  });
const walkJson = (node, visit) => {
  if (Array.isArray(node)) return node.forEach((item) => walkJson(item, visit));
  if (node && typeof node === "object") {
    visit(node);
    Object.values(node).forEach((value) => walkJson(value, visit));
  }
};
let articleCount = 0;
for (const page of pages.filter((p) => !p.redirect)) {
  let graph;
  try {
    graph = graphOf(page.html);
  } catch (error) {
    failures.push(`${page.path}: JSON-LD does not parse (${error.message})`);
    continue;
  }
  const text = visibleText(page.html);
  walkJson(graph, (node) => {
    const types = [].concat(node["@type"] ?? []);
    check(!types.some((t) => /Review|AggregateRating/.test(t)), `${page.path}: Review/AggregateRating is not allowed`);
    if (types.includes("Person") && node["@id"]) check(node["@id"] === personId, `${page.path}: Person @id ${node["@id"]}`);
  });
  for (const node of graph) {
    const types = [].concat(node["@type"] ?? []);
    // Web Highlighter Pro 的說明頁是另一個產品的靜態頁，不套用這條（見 docs/seo-notes.md）。
    if (types.some((t) => t === "Article" || t === "BlogPosting") && !page.path.startsWith("/web-highlighter-pro")) {
      articleCount++;
      for (const key of ["headline", "datePublished", "dateModified", "author", "image", "mainEntityOfPage", "publisher"])
        check(node[key], `${page.path}: Article missing ${key}`);
      check(node.author?.["@id"] === personId, `${page.path}: Article author is not ${personId}`);
      check(/^\d{4}-\d{2}-\d{2}/.test(node.datePublished ?? ""), `${page.path}: datePublished format`);
      check(/<meta property="og:type" content="article"/.test(page.html), `${page.path}: article page should use og:type article`);
    }
    if (types.includes("FAQPage")) {
      for (const question of node.mainEntity ?? [])
        check(text.includes(question.name), `${page.path}: FAQ question not visible on page: ${question.name}`);
    }
    if (types.includes("BreadcrumbList")) {
      const items = node.itemListElement ?? [];
      items.forEach((item, index) => {
        check(item.position === index + 1, `${page.path}: breadcrumb positions`);
        check(item.item && byPath.has(norm(item.item)), `${page.path}: breadcrumb target missing ${item.item}`);
      });
      if (!page.noindex) check(norm(items.at(-1)?.item ?? "") === norm(page.path), `${page.path}: last breadcrumb is not this page`);
    }
  }
  // 巢狀頁面要有麵包屑（Studio 子頁、作品頁）
  if (!page.noindex && page.path !== "/studio/en" && /^\/(?:studio\/.+|projects\/.+)/.test(page.path))
    check(graph.some((node) => node["@type"] === "BreadcrumbList"), `${page.path}: nested page without BreadcrumbList`);
}
check(articleCount >= 6, `expected at least 6 article pages, found ${articleCount}`);

// 3. 網站地圖：robots.txt 列的那幾個，合起來每個可索引頁剛好出現一次
const robots = readFileSync(join(dist, "robots.txt"), "utf8");
const sitemapUrls = [...robots.matchAll(/^Sitemap:\s*(\S+)/gm)].map(([, url]) => url);
check(sitemapUrls.length >= 2, "robots.txt lists sitemaps");
const seen = new Map();
for (const sitemapUrl of sitemapUrls) {
  const file = join(dist, new URL(sitemapUrl).pathname);
  check(existsSync(file), `robots.txt sitemap missing in dist: ${sitemapUrl}`);
  if (!existsSync(file)) continue;
  const xml = readFileSync(file, "utf8");
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = attr(block, /<loc>(.*?)<\/loc>/);
    const lastmod = attr(block, /<lastmod>(.*?)<\/lastmod>/);
    const path = norm(loc);
    if (seen.has(path)) failures.push(`sitemap: ${loc} listed twice (${seen.get(path)} and ${sitemapUrl})`);
    seen.set(path, sitemapUrl);
    const page = byPath.get(path) ?? byPath.get(`${path}/`);
    check(page, `sitemap: ${loc} has no page in dist`);
    if (page) {
      check(!page.redirect, `sitemap: ${loc} is a redirect`);
      check(!page.noindex, `sitemap: ${loc} is noindex`);
    }
    if (lastmod) check(/^\d{4}-\d{2}-\d{2}$/.test(lastmod) && lastmod <= today, `sitemap: bad lastmod ${lastmod} for ${loc}`);
    if (sitemapUrl.endsWith("/sitemap.xml") && !sitemapUrl.includes("web-highlighter-pro")) check(lastmod, `sitemap: ${loc} has no lastmod`);
  }
}
for (const page of indexable) check(seen.has(page.path), `${page.path}: indexable page missing from sitemaps in robots.txt`);
// @astrojs/sitemap 的輸出（不在 robots.txt，但不能列 noindex 或轉址頁）
if (existsSync(join(dist, "sitemap-0.xml"))) {
  for (const [, loc] of readFileSync(join(dist, "sitemap-0.xml"), "utf8").matchAll(/<loc>(.*?)<\/loc>/g)) {
    const page = byPath.get(norm(loc));
    check(page && !page.redirect && !page.noindex, `sitemap-0.xml: ${loc} is missing, a redirect or noindex`);
  }
}

// 4. robots.txt
for (const bot of ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot", "Googlebot"])
  check(new RegExp(`^User-agent: ${bot}$`, "m").test(robots), `robots.txt: no group for ${bot}`);
const groups = robots.split(/\n\s*\n/).filter((group) => /^User-agent:/m.test(group));
for (const group of groups) {
  check(group.includes("Content-Signal: search=yes, ai-input=yes, ai-train=no"), `robots.txt: group without Content-Signal: ${group.split("\n")[0]}`);
  check(!/^Disallow:\s*\/\s*$/m.test(group), `robots.txt: ${group.split("\n")[0]} disallows everything`);
}

// 5. hreflang：互相指向、包含自己、x-default 一致
for (const page of indexable) {
  const alternates = [...page.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, norm(href)]);
  if (!alternates.length) continue;
  const set = JSON.stringify(alternates.slice().sort());
  check(alternates.some(([, href]) => href === page.path), `${page.path}: hreflang set does not include itself`);
  check(alternates.some(([lang]) => lang === "x-default"), `${page.path}: hreflang without x-default`);
  for (const [lang, href] of alternates) {
    const target = byPath.get(href);
    check(target && !target.noindex && !target.redirect, `${page.path}: hreflang ${lang} target ${href} is not an indexable page`);
    if (!target) continue;
    const back = [...target.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, l, h]) => [l, norm(h)]);
    check(JSON.stringify(back.sort()) === set, `${page.path}: hreflang not reciprocal with ${href}`);
    if (lang !== "x-default") {
      const targetLang = attr(target.html, /<html[^>]*\slang="([^"]+)"/);
      check(targetLang === lang, `${page.path}: hreflang ${lang} points to page with lang ${targetLang}`);
    }
  }
}

// 6. 沒有孤兒頁：從 / 和 /studio 點 3 次以內到得了每個可索引頁
const linksOf = (page) =>
  [...page.html.matchAll(/<a\b[^>]*\shref="([^"#]+)/g)]
    .map(([, href]) => {
      if (/^(?:mailto:|tel:|javascript:)/.test(href)) return null;
      const url = new URL(decode(href), `${origin}${page.path.endsWith(".html") ? page.path : `${page.path}/`}`);
      return url.origin === origin ? norm(url.href) : null;
    })
    .filter(Boolean);
const depth = new Map([["/", 0], ["/studio", 0]]);
let frontier = ["/", "/studio"];
for (let level = 1; level <= 3; level++) {
  const next = [];
  for (const path of frontier) {
    const page = byPath.get(path);
    if (!page) continue;
    for (const link of linksOf(page)) {
      if (!depth.has(link)) {
        depth.set(link, level);
        next.push(link);
      }
    }
  }
  frontier = next;
}
for (const page of indexable) check(depth.has(page.path), `${page.path}: not reachable within 3 clicks of / or /studio`);

// 7. 分享圖、IndexNow 金鑰
for (const image of ["brand/kjyang-studio-og.png", "brand/kjyang-studio-og-en.png", "brand/kjyang-mark-512.png", "og-portfolio.png"])
  check(existsSync(join(dist, image)), `missing ${image}`);
const keyFiles = readdirSync(dist).filter((name) => /^[0-9a-f]{32}\.txt$/.test(name));
check(keyFiles.length === 1, "exactly one IndexNow key file at the site root");
if (keyFiles[0]) check(readFileSync(join(dist, keyFiles[0]), "utf8").trim() === keyFiles[0].slice(0, 32), "IndexNow key file content matches its name");

// 8. llms.txt 寫到真實作品和價格
const llms = readFileSync(join(dist, "llms.txt"), "utf8");
for (const needle of ["Weilspa", "SYNK ATELIER", "/game", "NT$18,000", "楊凱捷", "/studio/work/kjyang-website"])
  check(llms.includes(needle), `llms.txt does not mention ${needle}`);

if (failures.length) {
  console.error(`FAIL: ${failures.length} SEO problem(s)`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
assert.ok(true);
console.log(
  `PASS: ${indexable.length} indexable pages (unique titles/descriptions, one h1, self canonical, PNG og:image, img alt/size), ` +
    `${articleCount} articles, ${seen.size} sitemap URLs from ${sitemapUrls.length} sitemaps, hreflang reciprocity, ` +
    `robots/Content-Signal, no orphans within 3 clicks, ${pages.filter((p) => p.redirect).length} redirects and ${pages.filter((p) => p.noindex && !p.redirect).length} noindex pages kept out of sitemaps.`
);
