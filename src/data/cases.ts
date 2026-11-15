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
  sections: Array<{ title: string; body: string[] }>;
  lessons: string[];
};

const spaName = SPA_NAMED ? "Weilspa" : "北部雙門市美容 SPA";

export const realCases: RealCase[] = [
  {
    slug: "spa-booking-system",
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
    name: "SYNK ATELIER 粉絲資訊站與網頁遊戲",
    kind: "內容網站＋後台＋網頁遊戲（個人作品）",
    status: "上線中，遊戲於 2026 年 11 月公開",
    url: "https://synk-atelier.kjyang0114.dev",
    links: [
      ["遊戲 KWANGYA 探索", "https://synk-atelier.kjyang0114.dev/game"],
      ["我在 Threads 介紹資訊站的貼文", "https://www.threads.com/share/H90KfUB8u"],
      ["我在 Threads 介紹遊戲的貼文", "https://www.threads.com/share/Eq2EEy9MH"]
    ],
    summary: "我自己做、自己經營的 aespa 粉絲資訊站：專輯與歌曲、應援練習、演唱會準備、行程月曆。後來加了一個在網頁上就能玩的卡牌遊戲 /game，有帳號、排行榜和後台數據報表。",
    stack: ["React", "Vite", "Node.js", "SQLite", "Firebase 登入", "PWA 離線", "Caddy"],
    facts: [
      ["Threads 介紹貼文", "1.6 萬次瀏覽"],
      ["同一則貼文", "1,400 多個讚"],
      ["版本紀錄", "400 多次 commit"],
      ["自動測試", "130 多個測試檔"]
    ],
    sections: [
      {
        title: "為什麼做",
        body: [
          "一開始只是想把散在 Threads、X、官方網站的資訊整理在一起，時間一律換成台灣時間，不用登入就能用。上線後看數據，一天大概 8 到 20 個人，回訪的人比新來的多，新訪客幾乎都是從 Threads 來的。",
          "2026 年 10 月我在 Threads 發了一則介紹貼文，沒有下廣告，累積 1.6 萬次瀏覽、1,400 多個讚、200 多次轉發。留言裡有人直接指出哪些歌缺應援影片，我當天就補上並標註來源。",
          "所以我做了遊戲：給大家每天回來的理由，抽到稀有卡也會想截圖分享到 Threads。"
        ]
      },
      {
        title: "我怎麼做",
        body: [
          "所有內容都先進後台的「待審」區，我核准了才會公開。每一筆修改都有紀錄，可以還原。",
          "網站用過一次之後可以離線看，演唱會現場網路很差的時候也能打開必帶清單。",
          "遊戲的分數由伺服器計算，不能從瀏覽器改數字作弊。後台有每天的人數、留存和每一關的通過率，個資只留代碼。"
        ]
      },
      {
        title: "一次手機版大修",
        body: [
          "公開前我請同學試玩，他說手機很難用，最後回家改用電腦玩。我把畫面拿到 360×640、375×553 等 6 種尺寸逐頁截圖檢查。375×553 大約是 iPhone SE 在 LINE、Threads 內建瀏覽器裡實際看得到的高度。",
          "結果找到 10 個問題，最嚴重的是新手教學的按鈕掉到畫面外、按不到，整個流程卡死。全部修完後再截一次圖，把前後對照留下來。"
        ]
      }
    ],
    lessons: [
      "網站做好只是開始，要有人看到得自己去對的地方講。對這個站來說那個地方是 Threads。",
      "沒有數據就不知道問題在哪，我現在做的每個網站都會先裝流量統計。",
      "內建瀏覽器的可視高度比你想的小很多，要用真實尺寸測。",
      "自己經營一個網站，才知道上線之後的事比上線前多。"
    ]
  },
  {
    slug: "kjyang-website",
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
