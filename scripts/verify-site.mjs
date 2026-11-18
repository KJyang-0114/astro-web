import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

const root = resolve("dist");
const slugs = [
  "discord",
  "sift",
  "rl",
  "website",
  "clipboard",
  "element-remover",
  "character",
  "nyx",
  // 2026-11-16 加入：Studio 的兩個真實作品（cases.ts）也放進個人作品集。
  "synk-atelier",
  "weilspa",
];
const routes = [
  "/",
  "/about",
  "/resume",
  "/en/resume",
  "/now",
  "/play",
  "/projects",
  "/ai",
  "/contact",
  ...slugs.map((s) => `/projects/${s}`),
  // 2026-11-19 加入：SYNK ATELIER 英文作品頁。
  "/en/projects/synk-atelier",
];
const fileFor = (path) =>
  path === "/" ? join(root, "index.html") : join(root, path, "index.html");
const resolveLocal = (url, route) => {
  const resolved = new URL(
    url,
    `https://kjyang0114.dev${route.endsWith("/") ? route : route + "/"}`,
  );
  if (resolved.origin !== "https://kjyang0114.dev") return null;
  return decodeURIComponent(resolved.pathname);
};
for (const route of routes) {
  const html = readFileSync(fileFor(route), "utf8");
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${route}: single H1`,
  );
  assert.equal(
    (html.match(/<main(?:\s|>)/g) || []).length,
    1,
    `${route}: single main`,
  );
  assert.match(html, route.startsWith("/en/") ? /<html[^>]*lang="en"/ : /<html[^>]*lang="zh-Hant"/, `${route}: language`);
  assert.match(
    html,
    /name="description" content="[^"]+"/,
    `${route}: description`,
  );
  assert.match(html, /rel="canonical"/, `${route}: canonical`);
  assert.ok(html.includes('/favicon-portfolio.svg'), `${route}: portfolio favicon`);
  assert.doesNotMatch(
    html,
    /design-review|localhost|127\.0\.0\.1|比較提案|返回設計|先篩掉/,
    `${route}: no draft copy`,
  );
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:mailto:|tel:|data:|#)/.test(url)) continue;
    const path = resolveLocal(url, route);
    if (!path) continue;
    assert.ok(
      existsSync(join(root, path)) ||
        existsSync(join(root, path, "index.html")),
      `${route}: missing local asset/link ${url}`,
    );
  }
  for (const [, json] of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(json);
}
const home = readFileSync(fileFor("/"), "utf8");
const now = readFileSync(fileFor("/now"), "utf8");
assert.ok(now.includes("https://open.spotify.com/embed/playlist/6LGXc0Cq1rXXgqUaPcxgxg"));
assert.ok(now.includes("Daily"));
assert.ok(now.includes('height="352"'));
assert.doesNotMatch(now, /歌單整理中|user-read-currently-playing/);
for (const slug of ["discord", "sift", "rl"]) {
  const detail = readFileSync(fileFor(`/projects/${slug}`), "utf8");
  assert.ok(detail.includes("data-project-flow"), `${slug}: interactive flow`);
  assert.equal((detail.match(new RegExp(`name="flow-${slug}"`, "g")) || []).length, 5);
  assert.ok(detail.includes("需要留意"));
}
const play = readFileSync(fileFor("/play"), "utf8");
for (const shape of ["ribbon", "orbit", "wave"]) assert.ok(play.includes(`data-art-shape="${shape}"`));
assert.ok(play.includes('data-interactive="true"'));
assert.ok(home.includes("AI 讓我開始做；錯誤讓我學會驗證；"));
assert.match(home, /class="hero-role">Software Engineer<\/p>/);
assert.ok(
  home.includes("Builds with Logic &amp; Magic.") ||
    home.includes("Builds with Logic & Magic."),
);
const projects = readFileSync(fileFor("/projects"), "utf8");
assert.equal((projects.match(/class="work-row"/g) || []).length, slugs.length);
for (const name of [
  "Online Clipboard",
  "Element Remover Pro",
  "Character Studio",
  "Nyx-Core",
])
  assert.ok(projects.includes(name), `retained ${name}`);
const about = readFileSync(fileFor("/about"), "utf8");
for (const text of [
  "Dirty Work",
  "Winter",
  "Drama",
  "NDA",
  "Python",
  "TypeScript",
  "Java",
])
  assert.ok(about.includes(text), `about retained ${text}`);
const ai = readFileSync(fileFor("/ai"), "utf8");
for (let i = 1; i <= 7; i++)
  assert.ok(ai.includes(`id="chapter-${i}"`), `AI chapter ${i}`);
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
for (const slug of slugs)
  assert.ok(sitemap.includes(`/projects/${slug}`), `sitemap ${slug}`);
assert.ok(existsSync(join(root, "og-portfolio.png")), "share image");
assert.ok(
  !existsSync(join(root, "design-review")),
  "draft previews excluded from release",
);
console.log(
  `PASS: ${routes.length} personal routes, internal links/assets, metadata, content coverage, ${slugs.length} project pages, sitemap, and no public drafts.`,
);

const resume = readFileSync(fileFor("/resume"), "utf8");
for (const text of [
  "雲書苑教育科技有限公司",
  "2025/10",
  "正式任職",
  "Fully Remote",
  "Open to Remote Opportunities",
  "以遠端為必要條件",
  "目前在學",
  "PostgreSQL",
  "React",
  "2026 年初",
  "NDA",
  "Sift",
  "Discord Problem-Solving Bot",
  "Character Studio",
  "Personal Portfolio",
  "lodash",
  "highlight.js",
  "Aegis",
  "TensorRT",
  "Expected Graduation: 2027",
  "hi@kjyang0114.dev",
  "https://www.linkedin.com/in/kjyang0114/",
])
  assert.ok(resume.includes(text), `resume retains ${text}`);
for (const section of [
  "experience",
  "selected-projects",
  "open-source",
  "skills",
  "approach",
  "remote",
  "availability",
  "education",
  "links",
])
  assert.ok(resume.includes(`id="${section}"`), `resume section ${section}`);
assert.ok(sitemap.includes("/resume"));
assert.doesNotMatch(resume, /2025\.09 \/ 2025\.10/);
console.log(
  "PASS: resume sections, supplied experience dates, contact details, and sitemap.",
);

const englishResume = readFileSync(fileFor("/en/resume"), "utf8");
for (const [path, html] of [["/resume", resume], ["/en/resume", englishResume]]) {
  assert.ok(html.includes(`rel="canonical" href="https://kjyang0114.dev${path}"`));
  for (const language of ["zh-Hant", "en", "x-default"])
    assert.ok(html.includes(`hreflang="${language}"`));
  assert.ok(html.includes('href="/resume?lang=zh-Hant"'));
  assert.ok(html.includes('href="/en/resume?lang=en"'));
  for (const section of ["experience", "selected-projects", "open-source", "skills", "approach", "remote", "availability", "education", "links"])
    assert.ok(html.includes(`id="${section}"`));
  assert.doesNotMatch(html, /scratch-v222|aippt|helloai|light-point-plan|Full-time|full-time/);
}
for (const text of ["Oct 2025", "Early 2026", "NDA", "Currently enrolled", "Remote work required", "dozens of students", "Mac mini", "Print / Save PDF", "Expected Graduation: 2027"])
  assert.ok(englishResume.includes(text), `English resume retains ${text}`);
assert.ok(sitemap.includes("/en/resume"));
console.log("PASS: bilingual resume content, canonical URLs, language links, and confidentiality exclusions.");

// 英文作品頁：lang、canonical、標題、和中文頁互相的 hreflang、語言切換連結、網站地圖。
const synkZh = readFileSync(fileFor("/projects/synk-atelier"), "utf8");
const synkEn = readFileSync(fileFor("/en/projects/synk-atelier"), "utf8");
assert.match(synkEn, /<html[^>]*lang="en"/);
assert.ok(synkEn.includes('rel="canonical" href="https://kjyang0114.dev/en/projects/synk-atelier"'));
assert.equal(synkEn.match(/<title>(.*?)<\/title>/s)?.[1].trim(), "SYNK ATELIER — fan site and web card game by KJyang");
for (const html of [synkZh, synkEn]) {
  assert.ok(html.includes('<link rel="alternate" hreflang="zh-Hant" href="https://kjyang0114.dev/projects/synk-atelier">'));
  assert.ok(html.includes('<link rel="alternate" hreflang="en" href="https://kjyang0114.dev/en/projects/synk-atelier">'));
  assert.ok(html.includes('<link rel="alternate" hreflang="x-default" href="https://kjyang0114.dev/projects/synk-atelier">'));
}
assert.ok(synkZh.includes('class="project-lang-link" href="/en/projects/synk-atelier"'));
assert.ok(synkEn.includes('class="project-lang-link" href="/projects/synk-atelier"'));
assert.ok(!synkEn.includes("<aside"), "English project page has no empty aside");
assert.doesNotMatch(synkEn.replace(/unofficial/gi, ""), /official/i);
assert.ok(sitemap.includes("<loc>https://kjyang0114.dev/en/projects/synk-atelier</loc>"));
console.log("PASS: English SYNK ATELIER page language, canonical, title, reciprocal hreflang, language links and sitemap.");
