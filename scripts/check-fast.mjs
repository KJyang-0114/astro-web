// 只檢查這次改到的檔案（以 git diff HEAD 加上未追蹤檔案為準）。完整檢查用 npm run check。
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const started = Date.now();
const bin = (name) => `node_modules/.bin/${name}`;
const git = (args) =>
  spawnSync("git", args, { encoding: "utf8" }).stdout.split("\n").filter(Boolean);

// 含刪除的檔案：刪掉一個元件也要觸發 build 和驗證。只有交給 ESLint 的清單要排除已刪除的檔案。
const changed = [
  ...new Set([
    ...git(["diff", "--name-only", "HEAD"]),
    ...git(["ls-files", "--others", "--exclude-standard"]),
  ]),
];

if (changed.length === 0) {
  console.log("check:fast：沒有改動的檔案，結束。");
  process.exit(0);
}

const VERIFY = {
  site: "scripts/verify-site.mjs",
  resume: "scripts/verify-resume-language.mjs",
  discovery: "scripts/verify-discovery.mjs",
  studio: "scripts/verify-studio.mjs",
  seo: "scripts/verify-seo.mjs",
  motion: "scripts/verify-wire-art.mjs",
};
const ALL_STATIC = Object.values(VERIFY);

// 動到這些檔案，影響範圍是整個專案：lint 全部、型別檢查、build、所有驗證。
const projectWide = new Set([
  "package.json",
  "package-lock.json",
  "eslint.config.js",
  "tsconfig.json",
  "astro.config.mjs",
]);
const full = changed.some((file) => projectWide.has(file));

const lintable = changed.filter(
  (file) => /\.(?:m?js|cjs|ts|astro)$/.test(file) && !file.startsWith("public/") && existsSync(file),
);
const needsTypes = full || changed.some((file) => /\.(?:ts|astro)$/.test(file));

const verifies = new Set();
let needsBuild = full;
for (const file of changed) {
  if (/^src\/scripts\/wire-[\w-]+\.ts$/.test(file)) verifies.add(VERIFY.motion);
  else if (file === "src/scripts/resume-language.js") verifies.add(VERIFY.resume);
  else if (file.startsWith("src/") || file.startsWith("public/")) needsBuild = true;
  else if (ALL_STATIC.includes(file)) verifies.add(file);
}
if (needsBuild) ALL_STATIC.forEach((script) => verifies.add(script));
// verify-wire-art 和 verify-resume-language 讀原始碼；其他驗證讀 dist/，沒有 dist 時要先 build。
const readsDist = [...verifies].some((s) => s !== VERIFY.motion && s !== VERIFY.resume);
if (readsDist && !existsSync("dist")) needsBuild = true;

const steps = [];
if (full) steps.push(["lint（全部）", bin("eslint"), [".", "--cache", "--cache-location", "node_modules/.cache/eslint/", "--max-warnings", "0"]]);
else if (lintable.length)
  steps.push([
    `lint（${lintable.length} 個檔案）`,
    bin("eslint"),
    ["--cache", "--cache-location", "node_modules/.cache/eslint/", "--max-warnings", "0", "--no-warn-ignored", ...lintable],
  ]);
if (needsTypes) steps.push(["型別檢查（astro check）", bin("astro"), ["check", "--minimumFailingSeverity", "warning"]]);
if (needsBuild) steps.push(["build", bin("astro"), ["build"]]);
for (const script of ALL_STATIC.filter((s) => verifies.has(s))) steps.push([script, "node", [script]]);
if (changed.some((file) => file === "rebuild-docker.sh" || file === "scripts/test-rebuild-docker.sh"))
  steps.push(["rebuild-docker.sh 假指令測試", "bash", ["scripts/test-rebuild-docker.sh"]]);

console.log(`check:fast：${changed.length} 個改動的檔案${full ? "，含專案設定，跑完整範圍" : ""}。`);
for (const [label, cmd, args] of steps) {
  const t = Date.now();
  console.log(`\n▶ ${label}`);
  const result = spawnSync(cmd, args, { stdio: "inherit" });
  const secs = ((Date.now() - t) / 1000).toFixed(1);
  if (result.status !== 0) {
    console.error(`\n✗ ${label} 失敗（${secs} 秒）。總計 ${((Date.now() - started) / 1000).toFixed(1)} 秒。`);
    process.exit(result.status ?? 1);
  }
  console.log(`✓ ${label}（${secs} 秒）`);
}
if (steps.length === 0) console.log("改動的檔案不需要檢查（例如只改了文件）。");
console.log(`\ncheck:fast 通過，總計 ${((Date.now() - started) / 1000).toFixed(1)} 秒。`);
