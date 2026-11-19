// ESLint 設定。規則的錯誤訊息寫成修復指引：看到訊息就知道在這個專案要改用什麼。
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import globals from "globals";

const RAF_HINT =
  "requestAnimationFrame 的回傳值要存起來，元件暫停、離開畫面或卸載時才能用 cancelAnimationFrame 停掉，否則迴圈會一直跑。寫法參考 src/scripts/wire-art.ts：`frame = requestAnimationFrame(tick)`，搭配 IntersectionObserver 在離開畫面時取消。";

// 時序相關的禁用寫法集中在同一個陣列：no-restricted-syntax 在多個設定物件裡不會合併，後面的會蓋掉前面的。
const timingRules = [
  {
    selector: "CallExpression[callee.name='setInterval'], CallExpression[callee.property.name='setInterval']",
    message:
      "禁用 setInterval：它不會跟畫面更新同步，分頁切走或元件移除後也會繼續跑。逐格動畫用 requestAnimationFrame 並保存回傳值（參考 src/scripts/wire-art.ts）；捲動觸發的動畫用 src/scripts/motion.ts 的 GSAP + ScrollTrigger；元素進出畫面用 IntersectionObserver。",
  },
  {
    selector:
      "CallExpression[callee.name='setTimeout'][arguments.length<2], CallExpression[callee.property.name='setTimeout'][arguments.length<2]",
    message:
      "setTimeout 沒寫延遲，等於用 0 毫秒硬湊執行順序。要等 CSS 轉場結束就聽 transitionend；要等下一個畫面就用 requestAnimationFrame（保存回傳值）；要等元素出現在畫面用 IntersectionObserver。真的需要延遲時，寫出明確的毫秒數。",
  },
  {
    selector:
      "CallExpression[callee.name='setTimeout'][arguments.1.type='Literal'][arguments.1.value=0], CallExpression[callee.property.name='setTimeout'][arguments.1.type='Literal'][arguments.1.value=0]",
    message:
      "禁用 setTimeout(fn, 0)：用 0 毫秒延遲硬湊執行順序，在慢的裝置上會失準。要等 CSS 轉場結束就聽 transitionend；要等下一個畫面就用 requestAnimationFrame（保存回傳值）；要等元素出現在畫面用 IntersectionObserver。",
  },
  {
    selector:
      "ExpressionStatement > CallExpression[callee.name='requestAnimationFrame'], ExpressionStatement > CallExpression[callee.property.name='requestAnimationFrame']",
    message: RAF_HINT,
  },
  {
    selector:
      "UnaryExpression[operator='void'] > CallExpression[callee.name='requestAnimationFrame'], UnaryExpression[operator='void'] > CallExpression[callee.property.name='requestAnimationFrame']",
    message: RAF_HINT,
  },
];

export default defineConfig(
  {
    // public/ 是直接複製到網站的靜態成品，不是原始碼。
    ignores: ["dist/", ".astro/", "public/", "node_modules/"],
  },
  {
    linterOptions: {
      // 禁止用註解關掉檢查（eslint-disable 等）。要例外，改這個檔案並寫明理由。
      noInlineConfig: true,
      reportUnusedDisableDirectives: "error",
    },
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    files: ["scripts/**", "*.config.{js,mjs}", "src/data/**", "src/pages/**/*.ts"],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    // src 裡的程式大多跑在瀏覽器；.astro 抽出的 <script> 虛擬檔名是 *.astro/*.ts，也在這個範圍。
    files: ["src/**"],
    languageOptions: { globals: { ...globals.browser } },
  },
  {
    // 不限定 files：.ts、.mjs、.astro，以及 .astro 裡抽出來的 <script>（虛擬檔名 *.astro/*.ts）都要套用。
    rules: {
      "@typescript-eslint/ban-ts-comment": [
        "error",
        { "ts-ignore": true, "ts-expect-error": true, "ts-nocheck": true, "ts-check": false },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "no-implied-eval": "error",
      "no-restricted-syntax": ["error", ...timingRules],
    },
  },
);
