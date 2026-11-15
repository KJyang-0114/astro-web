// 產生社群分享圖（LINE、Facebook、Threads、X、iMessage 不顯示 SVG）。
// 用法：node scripts/generate-og-images.mjs
// 需要 macOS 內建字型 PingFang TC / LiSong Pro；在別的系統上中文可能變成方框，
// 產生後請打開 PNG 確認。輸出的 PNG 會 commit 進 public/brand/，建置時不會重跑。
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const out = resolve("public/brand");
mkdirSync(out, { recursive: true });

const paper = "#f3eee5";
const ink = "#382b35";
const accent = "#7f4358";
const muted = "#7a6b72";
const serifCjk = "'LiSong Pro', 'Songti TC', 'Apple LiSung', serif";
const sansCjk = "'PingFang TC', 'Heiti TC', sans-serif";
const serifLatin = "Georgia, 'Times New Roman', serif";

const mark = (x, y, size) => `
  <g transform="translate(${x} ${y}) scale(${size / 64})">
    <rect width="64" height="64" rx="12" fill="${ink}"/>
    <path d="M16 16h8v32h-8V16Zm13 16 14-16h10L38 32l15 16H43L29 32Z" fill="${paper}"/>
  </g>`;

const studioCover = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${paper}"/>
  <rect x="0" y="0" width="1200" height="10" fill="${accent}"/>
  ${mark(72, 64, 72)}
  <text x="164" y="112" fill="${ink}" font-family="${serifLatin}" font-size="38">KJyang <tspan fill="${accent}" font-style="italic">studio</tspan></text>
  <text x="72" y="282" fill="${ink}" font-family="${serifCjk}" font-size="80" font-weight="500">小店網站與預約系統製作</text>
  <text x="72" y="356" fill="${accent}" font-family="${serifLatin}" font-size="40" font-style="italic">KJyang Studio</text>
  <line x1="72" y1="404" x2="1128" y2="404" stroke="${ink}" stroke-opacity="0.18" stroke-width="2"/>
  <text x="72" y="470" fill="${ink}" font-family="${sansCjk}" font-size="38" font-weight="600">一頁式 NT$18,000 起・北部可約見面・全台線上</text>
  <text x="72" y="556" fill="${muted}" font-family="${sansCjk}" font-size="26">楊凱捷一人接案・設計、程式、上線、維護</text>
  <text x="1128" y="556" fill="${muted}" font-family="${sansCjk}" font-size="26" text-anchor="end">kjyang0114.dev/studio</text>
</svg>`;

const studioCoverEn = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${paper}"/>
  <rect x="0" y="0" width="1200" height="10" fill="${accent}"/>
  ${mark(72, 64, 72)}
  <text x="164" y="112" fill="${ink}" font-family="${serifLatin}" font-size="38">KJyang <tspan fill="${accent}" font-style="italic">studio</tspan></text>
  <text x="72" y="252" fill="${ink}" font-family="${serifLatin}" font-size="64">Websites and booking systems</text>
  <text x="72" y="330" fill="${ink}" font-family="${serifLatin}" font-size="64">for small businesses in Taiwan</text>
  <line x1="72" y1="404" x2="1128" y2="404" stroke="${ink}" stroke-opacity="0.18" stroke-width="2"/>
  <text x="72" y="470" fill="${ink}" font-family="${sansCjk}" font-size="36" font-weight="600">One-page sites from NT$18,000 · Northern Taiwan · Online</text>
  <text x="72" y="556" fill="${muted}" font-family="${sansCjk}" font-size="26">Kai-Jie Yang (楊凱捷) · design, code, launch, care</text>
  <text x="1128" y="556" fill="${muted}" font-family="${sansCjk}" font-size="26" text-anchor="end">kjyang0114.dev/studio/en</text>
</svg>`;

const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${ink}"/>
  <path d="M16 16h8v32h-8V16Zm13 16 14-16h10L38 32l15 16H43L29 32Z" fill="${paper}"/>
</svg>`;

async function render(svg, file) {
  const path = resolve(out, file);
  await sharp(Buffer.from(svg), { density: 72 }).png({ compressionLevel: 9 }).toFile(path);
  const meta = await sharp(path).metadata();
  console.log(`${file}: ${meta.width}x${meta.height}`);
}

await render(studioCover, "kjyang-studio-og.png");
await render(studioCoverEn, "kjyang-studio-og-en.png");
await render(logo, "kjyang-mark-512.png");
