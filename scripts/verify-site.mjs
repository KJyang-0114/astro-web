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
];
const routes = [
  "/",
  "/about",
  "/resume",
  "/projects",
  "/ai",
  "/contact",
  ...slugs.map((s) => `/projects/${s}`),
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
  assert.match(html, /<html[^>]*lang="zh-Hant"/, `${route}: language`);
  assert.match(
    html,
    /name="description" content="[^"]+"/,
    `${route}: description`,
  );
  assert.match(html, /rel="canonical"/, `${route}: canonical`);
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
assert.ok(home.includes("AI 讓我開始做；錯誤讓我學會驗證；"));
assert.ok(
  home.includes("Builds with Logic &amp; Magic.") ||
    home.includes("Builds with Logic & Magic."),
);
const projects = readFileSync(fileFor("/projects"), "utf8");
assert.equal((projects.match(/class="work-row"/g) || []).length, 8);
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
  `PASS: ${routes.length} personal routes, internal links/assets, metadata, content coverage, 8 project pages, sitemap, and no public drafts.`,
);

const resume = readFileSync(fileFor("/resume"), "utf8");
for (const text of [
  "雲書苑教育科技有限公司",
  "2025.09 / 2025.10",
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
console.log(
  "PASS: resume sections, supplied experience dates, contact details, and sitemap.",
);
