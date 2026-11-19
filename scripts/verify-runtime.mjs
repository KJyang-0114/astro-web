// 冒煙測試：用 repo 的 Dockerfile 建映像，在本機起一個測試容器，打 nginx 實際送出的網址。
// 只連 127.0.0.1，不會連正式站。結束時（含失敗、Ctrl-C）一定刪掉測試容器。
//
//   npm run verify:runtime                         建映像 → 起容器 → 檢查 → 刪容器
//   npm run verify:runtime -- --no-build           不 build，直接用已經建好的 kjyang-wbs-astro:verify（CI 先單獨 docker build）
//   npm run verify:runtime -- --url=http://127.0.0.1:4321   改打一個已經在跑的本機伺服器（不用 Docker）
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const IMAGE = "kjyang-wbs-astro:verify";
const CONTAINER = "kjyang-wbs-astro-verify";
const SITE = "https://kjyang0114.dev";
const LOOPBACK = new Set(["127.0.0.1", "localhost", "[::1]"]);

const docker = (args, opts = {}) => spawnSync("docker", args, { encoding: "utf8", ...opts });
let containerStarted = false;
const cleanup = () => {
  if (!containerStarted) return;
  containerStarted = false;
  docker(["rm", "-f", CONTAINER]);
  console.log(`已刪除測試容器 ${CONTAINER}`);
};
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    cleanup();
    process.exit(130);
  });
}

const fail = (message) => {
  console.error(`✗ ${message}`);
  cleanup();
  process.exit(1);
};

async function startContainer() {
  if (docker(["info"]).status !== 0) {
    fail("連不到 Docker daemon。請先啟動 Docker（Docker Desktop 或 colima），verify:runtime 沒有跑。");
  }
  if (process.argv.includes("--no-build")) {
    if (docker(["image", "inspect", IMAGE]).status !== 0) fail(`--no-build 但找不到映像 ${IMAGE}，先跑 docker build -t ${IMAGE} .`);
    console.log(`▶ 使用已建好的 ${IMAGE}（--no-build）`);
  } else {
    console.log(`▶ docker build -t ${IMAGE} .`);
    if (docker(["build", "-t", IMAGE, "."], { stdio: "inherit" }).status !== 0) fail("docker build 失敗");
  }
  docker(["rm", "-f", CONTAINER]); // 上次中斷留下的同名測試容器
  // 127.0.0.1::3000 讓 Docker 自己挑一個空閒的本機埠，只綁 127.0.0.1。
  containerStarted = true; // 先標記：docker run 途中被 Ctrl-C 也會清掉容器
  const run = docker(["run", "-d", "--name", CONTAINER, "-p", "127.0.0.1::3000", IMAGE]);
  if (run.status !== 0) fail(`docker run 失敗：${run.stderr.trim()}`);
  const port = docker(["port", CONTAINER, "3000/tcp"]).stdout.match(/127\.0\.0\.1:(\d+)/)?.[1];
  if (!port) fail("讀不到測試容器對應的本機埠");
  return `http://127.0.0.1:${port}`;
}

const urlArg = process.argv.find((arg) => arg.startsWith("--url="))?.slice("--url=".length);
let base;
if (urlArg) {
  base = new URL(urlArg).origin;
  if (!LOOPBACK.has(new URL(base).hostname)) {
    console.error(`✗ --url 只能是本機位址（127.0.0.1、localhost），收到 ${base}`);
    process.exit(1);
  }
} else {
  base = await startContainer();
}

// 所有請求都經過這裡：只打 base，不跟著轉址走。
async function get(path) {
  const url = new URL(path, base);
  if (url.origin !== base || !LOOPBACK.has(url.hostname)) throw new Error(`拒絕連線到非本機網址：${url.href}`);
  const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(10_000) });
  return { status: res.status, headers: res.headers, body: await res.text() };
}
// 網站內的絕對網址（https://kjyang0114.dev/...）換成測試伺服器上的路徑。
const localPath = (loc) => {
  const url = new URL(loc, SITE);
  if (url.origin !== SITE) throw new Error(`不是本站網址：${loc}`);
  return url.pathname + url.search;
};

let passed = 0;
let failed = 0;
async function check(label, fn) {
  try {
    await fn();
    passed++;
    console.log(`✓ ${label}`);
  } catch (error) {
    failed++;
    console.log(`✗ ${label}：${error.message}`);
  }
}
const expect = (condition, message) => {
  if (!condition) throw new Error(message);
};
const expectStatus = (res, status) => expect(res.status === status, `狀態碼 ${res.status}，預期 ${status}`);
const expectType = (res, type) => {
  const actual = res.headers.get("content-type") ?? "(無)";
  expect(actual.split(";")[0].trim() === type, `Content-Type 是 ${actual}，預期 ${type}`);
};

try {
  // 1. 等 /healthz（docker/nginx-site.conf，看門狗也在打這個網址）
  const deadline = Date.now() + 30_000;
  let healthy = false;
  while (!healthy && Date.now() < deadline) {
    healthy = await get("/healthz").then((r) => r.status === 200, () => false);
    if (!healthy) await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (!healthy) fail(`/healthz 30 秒內沒有回 200（${base}）`);
  console.log(`測試伺服器：${base}\n`);

  await check("/healthz 回 200、text/plain、內容只有 ok", async () => {
    const res = await get("/healthz");
    expectStatus(res, 200);
    expectType(res, "text/plain");
    expect(res.body === "ok\n", `內容是 ${JSON.stringify(res.body)}`);
  });

  await check("回應標頭不帶 nginx 版本（server_tokens off）", async () => {
    const server = (await get("/")).headers.get("server") ?? "";
    expect(!/\d/.test(server), `Server 標頭是 ${server}`);
  });

  // 2. sitemap 裡的每個路由都回 200
  const robots = await get("/robots.txt");
  const sitemapQueue = [
    "/sitemap-index.xml",
    ...[...robots.body.matchAll(/^Sitemap:\s*(\S+)/gim)].map(([, loc]) => localPath(loc)),
  ];
  const seenSitemaps = new Set();
  const routes = new Set();
  while (sitemapQueue.length) {
    const path = sitemapQueue.shift();
    if (seenSitemaps.has(path)) continue;
    seenSitemaps.add(path);
    await check(`sitemap ${path} 回 200、text/xml`, async () => {
      const res = await get(path);
      expectStatus(res, 200);
      expectType(res, "text/xml");
      const locs = [...res.body.matchAll(/<loc>\s*(.*?)\s*<\/loc>/g)].map(([, loc]) => localPath(loc));
      expect(locs.length > 0, "沒有任何 <loc>");
      if (res.body.includes("<sitemapindex")) sitemapQueue.push(...locs);
      else locs.forEach((loc) => routes.add(loc));
    });
  }
  const routeFailures = [];
  for (const route of routes) {
    const res = await get(route);
    if (res.status !== 200) routeFailures.push(`${route} → ${res.status}`);
  }
  await check(`sitemap 列出的 ${routes.size} 個路由都回 200`, () => {
    expect(routes.size > 0, "sitemap 裡沒有路由");
    expect(routeFailures.length === 0, routeFailures.join("、"));
  });

  // 3. astro.config.mjs 的轉址：Astro 靜態輸出是 meta refresh 頁（200），目標頁也要回 200
  const config = readFileSync(new URL("../astro.config.mjs", import.meta.url), "utf8");
  const redirectBlock = config.match(/const redirects = \{([\s\S]*?)\};/)?.[1] ?? "";
  const redirects = [...redirectBlock.matchAll(/'([^']+)'\s*:\s*'([^']+)'/g)];
  await check(`astro.config.mjs 的 ${redirects.length} 條轉址`, async () => {
    expect(redirects.length > 0, "在 astro.config.mjs 找不到 redirects");
    const problems = [];
    for (const [, from, to] of redirects) {
      const res = await get(from);
      const refresh = res.body.match(/http-equiv="refresh" content="0;url=([^"]+)"/)?.[1];
      if (res.status !== 200) problems.push(`${from} → ${res.status}`);
      else if (!refresh || localPath(refresh) !== to) problems.push(`${from} 轉到 ${refresh ?? "(沒有 meta refresh)"}，預期 ${to}`);
      else if ((await get(to)).status !== 200) problems.push(`${from} 的目標 ${to} 不是 200`);
    }
    expect(problems.length === 0, problems.join("、"));
  });

  // 4. 不存在的路徑回 404，內容是 404.html
  await check("不存在的頁面回 404 並送 404.html", async () => {
    const res = await get("/__verify-runtime-missing__");
    expectStatus(res, 404);
    expect(res.body.includes("頁面不存在"), "內容不是 404.html");
  });
  await check("不存在的 /_assets/ 檔案回 404", async () => {
    expectStatus(await get("/_assets/__verify-runtime-missing__.js"), 404);
  });

  // 5. 各種端點的 Content-Type（.md 由 Dockerfile 加的 text/markdown；.well-known 由 nginx-site.conf 指定）
  const types = [
    ["/index.md", "text/markdown"],
    ["/studio.md", "text/markdown"],
    ["/studio/index.md", "text/markdown"],
    ["/auth.md", "text/markdown"],
    ["/.well-known/agent-skills/kjyang-studio-service-summary.md", "text/markdown"],
    ["/llms.txt", "text/plain"],
    ["/llms-full.txt", "text/plain"],
    ["/robots.txt", "text/plain"],
    ["/.well-known/api-catalog", "application/linkset+json"],
    ["/.well-known/site-status", "application/json"],
    ["/.well-known/openapi.json", "application/json"],
    ["/", "text/html"],
  ];
  for (const [path, type] of types) {
    await check(`${path} 回 200、${type}`, async () => {
      const res = await get(path);
      expectStatus(res, 200);
      expectType(res, type);
    });
  }

  // 6. /_assets/ 的長效快取標頭；HTML 不能帶 immutable
  await check("/_assets/ 檔案帶 Cache-Control: public, max-age=31536000, immutable", async () => {
    const home = await get("/");
    const asset = home.body.match(/["'(](\/_assets\/[^"')]+)/)?.[1];
    expect(asset, "首頁沒有引用 /_assets/ 的檔案");
    const res = await get(asset);
    expectStatus(res, 200);
    const cache = res.headers.get("cache-control");
    expect(cache === "public, max-age=31536000, immutable", `${asset} 的 Cache-Control 是 ${cache}`);
  });
  await check("HTML 頁面沒有 immutable 快取", async () => {
    const cache = (await get("/about")).headers.get("cache-control") ?? "";
    expect(!cache.includes("immutable"), `Cache-Control 是 ${cache}`);
  });
} finally {
  cleanup();
}

console.log(`\nverify:runtime：${passed} 項通過，${failed} 項失敗。`);
process.exit(failed ? 1 : 0);
