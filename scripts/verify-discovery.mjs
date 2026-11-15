import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const html = path => readFileSync(join("dist", path, "index.html"), "utf8");
const schemas = content => [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .flatMap(([, source]) => { const data = JSON.parse(source); return data["@graph"] || [data]; });
// synk-atelier、weilspa：2026-11-16 從 Studio 真實作品加入，沒有公開原始碼，用 CreativeWork。
const projectSlugs = ["discord", "sift", "rl", "website", "clipboard", "element-remover", "character", "nyx", "synk-atelier", "weilspa"];
const titleSet = new Set();
for (const slug of projectSlugs) {
  const content = html(`projects/${slug}`);
  const title = content.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titleSet.has(title), `unique project title: ${slug}`);
  titleSet.add(title);
  assert.ok(content.includes(`rel="canonical" href="https://kjyang0114.dev/projects/${slug}"`));
  const data = schemas(content);
  assert.equal(data.find(x => x["@type"] === "SoftwareSourceCode" || x["@type"] === "CreativeWork").author["@id"], "https://kjyang0114.dev/#person");
  const crumbs = data.find(x => x["@type"] === "BreadcrumbList").itemListElement;
  assert.equal(crumbs.length, 3);
  assert.equal(crumbs[2].item, `https://kjyang0114.dev/projects/${slug}`);
}
const home = schemas(html(""));
assert.ok(home.some(x => x["@type"] === "WebSite" && x.name === "KJyang"));
assert.ok(home.some(x => x["@type"] === "Person" && x.name === "楊凱捷"));
assert.equal(schemas(html("projects"))[0].mainEntity.numberOfItems, projectSlugs.length);
assert.equal(schemas(html("about"))[0]["@type"], "ProfilePage");
assert.ok(!html("about").includes('id="learning-projects"'));

for (const file of ["sitemap.xml", "sitemap-0.xml", "studio/sitemap.xml"]) {
  const xml = readFileSync(join("dist", file), "utf8");
  // lastmod 來自 src/data/lastmod.mjs（git commit 日期），不能用建置當下的時間。
  for (const [, date] of xml.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) {
    assert.match(date, /^\d{4}-\d{2}-\d{2}(?:T00:00:00\.000Z)?$/, `lastmod is a plain date: ${date}`);
    assert.ok(date.slice(0, 10) <= new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10) && date.slice(0, 10) >= "2025-01-01", `lastmod not in the future: ${date}`);
  }
  for (const [, loc] of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const path = new URL(loc).pathname;
    assert.doesNotMatch(path, /^\/studio\/(?:en\/)?demo(?:\/|$)/, "noindex demos excluded");
    if (path.startsWith("/projects/") || path === "/about/") assert.ok(!path.endsWith("/"));
    assert.ok(existsSync(join("dist", path, "index.html")), `sitemap target exists: ${path}`);
  }
}
for (const file of ["llms.txt", "llms-full.txt"]) {
  const text = readFileSync(join("dist", file), "utf8");
  assert.ok(text.includes("鶯歌工商資訊科學生"));
  for (const slug of projectSlugs) assert.ok(text.includes(`/projects/${slug}`));
  assert.doesNotMatch(text, /特殊選才|特殊選材|輔仁|42,694|42694|離職|匯款/);
}
console.log("PASS: project discovery metadata, shared identity, breadcrumbs, canonical sitemaps, and public-only AI summaries.");
