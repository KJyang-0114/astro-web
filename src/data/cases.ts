// 真實作品。文案規範：docs/studio-writing-guide.md
// 已確認可以公開店名（2026-11-16）。療程、價格、顧客資料一律不放。
export const SPA_NAMED = true;

export type RealCase = {
  slug: string;
  name: string;
  kind: string;
  status: string;
  url?: string;
  links?: Array<[string, string]>;
  summary: string;
  stack: string[];
  facts: Array<[string, string]>;
  // items：選填，粗體標題＋說明的編號清單（目前只有 synk-atelier 用）。
  sections: Array<{ title: string; body: string[]; items?: Array<[string, string]> }>;
  lessons: string[];
  // 頁尾 LINE 區塊的標題與說明；沒寫就用通用的「你的店也有類似的麻煩？」。
  cta?: { title: string; text: string };
  // 搜尋結果用的標題（不含「— KJyang Studio」）與說明，頁面上不顯示。沒寫就用 name／summary。
  seoTitle?: string;
  seoDescription?: string;
  // 個人網站 /projects 裡對應的作品頁
  projectSlug?: string;
};

const spaName = SPA_NAMED ? "Weilspa" : "北部雙門市美容 SPA";

export const realCases: RealCase[] = [
  {
    slug: "spa-booking-system",
    seoTitle: "Weilspa 美容 SPA 預約與排班系統｜真實作品",
    projectSlug: "weilspa",
    name: SPA_NAMED ? "Weilspa 預約與排班系統" : "雙門市美容 SPA 預約與排班系統",
    kind: "官網＋線上預約＋員工排班後台",
    status: "系統完成，前台等療程價目確定後公開",
    url: SPA_NAMED ? "https://weilspa.com" : undefined,
    summary: `${spaName} 有兩間門市、兩位美容師兼老闆。熟客原本都在 LINE 問「這個時段有空嗎」，預約記在手機行事曆裡。我做了一套讓客人自己看時段、送出申請，店家確認後才成立的預約系統，加上給兩位老闆用的手機後台。`,
    stack: ["Next.js", "PostgreSQL", "LINE 登入", "簡訊驗證", "手機 PWA", "Docker"],
    facts: [
      ["門市", "2 間"],
      ["使用者", "顧客＋2 位美容師"],
      ["自動測試", "83 個測試檔"],
      ["版本紀錄", "100 多次 commit"]
    ],
    sections: [
      {
        title: "原本的問題",
        body: [
          "客人大多從官方 LINE 的選單點進來，用的是 LINE 內建瀏覽器。以前想約時間只能傳訊息問，老闆在幫客人做臉的時候沒辦法回，一來一回常常要等好幾個小時。",
          "預約記在手機行事曆裡，標題寫成只有自己看得懂的縮寫（客人稱呼加上美容師代號和療程）。行事曆不會告訴你「這個時段兩位都滿了」，重複約到同一時段要靠記憶。"
        ]
      },
      {
        title: "我怎麼做",
        body: [
          "預約做成「申請制」：客人選門市、療程、美容師、日期和時段後送出，畫面上清楚寫「這是申請，店家確認後才算數」。這是老闆自己要求的，因為有些療程要看客人狀況才能排。",
          "時段只顯示「可以申請」「已滿」「班表還沒排」三種。客人看不到別人的預約，也看不到美容師為什麼休假。",
          "兩位老闆用的是加到手機主畫面的後台，一打開就是今天的預約和要處理的申請。每天早上 8 點收到一則摘要。",
          "舊行事曆的資料我寫了匯入工具搬過來。搬的時候發現大部分預約只有開始時間、沒有結束時間，只好先統一抓 90 分鐘，標成「待確認」讓老闆一筆一筆核對。"
        ]
      },
      {
        title: "目前狀態",
        body: [
          "預約、排班、後台、通知都做完，也測過了。前台還沒公開，因為療程價目還沒定案，現在打開網址會看到「網站整理中」。這一頁不放任何真實的療程、價格和顧客資料，上面的畫面是用示範資料重畫的。"
        ]
      }
    ],
    lessons: [
      "LINE 內建瀏覽器跟 Safari 行為不一樣，登入、彈窗、字體大小都要另外測。",
      "店家真正在意的是「少回幾次訊息」，不是網站漂不漂亮。",
      "長輩熟客多，字要大、按鈕要寬，不能靠滑過去才出現的選單。"
    ]
  },
  {
    slug: "synk-atelier",
    projectSlug: "synk-atelier",
    name: "SYNK ATELIER 粉絲資訊站與網頁遊戲",
    kind: "內容網站＋後台＋網頁遊戲（個人作品，非官方粉絲作品）",
    status: "網站上線中；遊戲 2026 年 11 月公開，持續更新中",
    url: "https://synk-atelier.kjyang0114.dev",
    links: [
      ["遊戲 KWANGYA 探索", "https://synk-atelier.kjyang0114.dev/game"],
      ["我在 Threads 介紹資訊站的貼文", "https://www.threads.com/share/H90KfUB8u"],
      ["我在 Threads 介紹遊戲的貼文", "https://www.threads.com/share/Eq2EEy9MH"]
    ],
    seoDescription: "我自己做、自己經營的非官方 aespa 粉絲資訊站和網頁卡牌遊戲：內容審核後台、離線瀏覽、伺服器算分、每天讀回饋改版。想做社群產品，可以找我聊。",
    summary: "我自己做、自己經營的 aespa 粉絲資訊站，加上一款網頁卡牌遊戲。不是接案作品，所以每個決定、每個錯誤都是我自己承擔。這也是我最能說清楚「上線之後要做什麼」的一個案子。",
    stack: ["React", "TypeScript", "Vite", "Node.js", "SQLite", "Firebase 登入", "PWA 離線", "Cloudflare", "nginx", "自架 Mac mini", "GitHub Actions 自動部署"],
    facts: [
      ["Threads 介紹貼文", "1.6 萬次瀏覽"],
      ["同一則貼文", "1,400 多個讚"],
      ["版本紀錄（到 2026-11-18）", "475 個 commit"],
      ["自動測試", "100 個單元測試檔＋47 個瀏覽器測試檔"]
    ],
    sections: [
      {
        title: "如果你也想做社群產品，我能幫你什麼",
        body: [],
        items: [
          ["讓內容不會一改就壞", "所有內容先進後台待審，核准才公開，改錯了可以還原。你的小編不用懂程式，也不怕手滑。"],
          ["讓人有理由每天回來", "資訊站是「有事才來」。我在同一個網站裡加了每日任務、每週排行、限時活動，讓人每天都有一件小事可以做。"],
          ["數字算在伺服器，不讓人亂改", "抽卡機率、戰鬥結果、獎勵都由伺服器決定，規則有版本。改規則不會讓之前的紀錄失效，玩家也不會因為你改版而吃虧。"],
          ["把回饋變成更新", "網站裡就有回饋按鈕。我會把問題在本機重現、修好、補一個測試，再找不打擾使用者的時間上線。"],
          ["用真實環境驗收", "我不用假資料驗收：本機測試跑在正式資料的唯讀複本上。手機版在 9 組尺寸與瀏覽器引擎上逐頁截圖檢查，連 LINE、Threads 內建瀏覽器那種很矮的畫面都測。"]
        ]
      },
      {
        title: "一次手機版大修",
        body: [
          "公開前同學試玩說手機很難用，最後回家改用電腦玩。我把每個畫面放到 Chromium 6 種、Safari 引擎 3 種尺寸逐頁截圖，列出 24 項，修掉 18 項；其餘一項確認正常、一項要實機確認，四項寫下原因先不改。最嚴重的是：在最矮的畫面上，新手教學的按鈕掉到畫面外，整個流程卡死。"
        ]
      },
      {
        title: "Threads 上的介紹貼文",
        body: [
          "2026 年 10 月我在 Threads 發了一則介紹貼文，沒有下廣告，累積 1.6 萬次瀏覽、1,400 多個讚、200 多次轉發。留言裡有人直接指出哪些歌缺應援影片，我當天就補上並標註來源。"
        ]
      }
    ],
    lessons: [
      "上線只是開始。真正的工作是每天讀回饋、看數據、決定改什麼、不改什麼。",
      "「寧可不做，也不要做錯」：自動配對存檔、反作弊，我都選了保守的那一邊。",
      "內建瀏覽器的可視高度比你想的小很多，要用真實尺寸測。"
    ],
    cta: {
      title: "你也想做一個會有人每天回來的網站？",
      text: "傳 LINE 給我，先聊聊你想做的東西。"
    }
  },
  {
    slug: "kjyang-website",
    seoTitle: "這個網站本身：Astro、Docker 自架與自動部署",
    seoDescription: "你現在看的網站是我自己設計、自己寫、自己架主機的：用 Astro 寫，放在一台 Mac mini 上用 Docker 跑。推到 GitHub 後幾分鐘內自動上線，上線前會自動檢查連結和文字。",
    projectSlug: "website",
    name: "這個網站本身",
    kind: "個人網站＋接案頁＋自動部署",
    status: "上線中",
    url: "https://kjyang0114.dev",
    summary: "你現在看的網站是我自己設計、自己寫、自己架主機的。每次我改完內容推到 GitHub，幾分鐘內就會自動更新到正式網站。",
    stack: ["Astro", "Docker", "GitHub Actions", "Cloudflare", "Mac mini"],
    facts: [
      ["部署", "推到 GitHub 自動上線"],
      ["主機", "Mac mini＋Docker"],
      ["檢查", "每次上線前自動跑檢查"],
      ["語言", "中文＋英文"]
    ],
    sections: [
      {
        title: "為什麼放這個",
        body: [
          "很多人找網站設計時擔心「做完之後要改東西找不到人」或「主機出事沒人處理」。這個網站就是我怎麼維護網站的實際例子。",
          "連這一頁的文字都有自動檢查：如果我寫出太空泛的句子，網站根本不會上線。"
        ]
      }
    ],
    lessons: [
      "自動部署讓改一個字也能當天上線。",
      "上線前的自動檢查會擋掉壞掉的連結和缺少的圖片。"
    ]
  }
];

export function getRealCase(slug: string) {
  const item = realCases.find((c) => c.slug === slug);
  if (!item) throw new Error(`Missing real case: ${slug}`);
  return item;
}
