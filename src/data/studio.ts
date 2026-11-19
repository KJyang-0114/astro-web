// 文案規範：docs/studio-writing-guide.md

export const studioContact = {
  phone: "0900000000",
  phoneIntl: "+886-900-000-000",
  lineId: "kjyang0114",
  lineUrl: "https://line.me/ti/p/pl05m2MikN",
  lineQr: "/brand/kjyang-line-qr.jpeg",
  email: "hi@kjyang0114.dev",
  domain: "kjyang0114.dev"
};

// 回覆時間、訂金、修改次數已由楊凱捷確認（2026-11-16）。
export const studioFacts = {
  owner: "楊凱捷",
  ownerNote: "高三，資訊科，自學前端與伺服器",
  area: "北部（雙北、桃園）可以約見面，其他地區線上進行",
  areaShort: "北部可約見面・全台線上",
  areaServed: ["新北市", "臺北市", "桃園市", "Taiwan"],
  reply: "每天上午 10 點到晚上 10 點會看 LINE，回覆快慢要看我當下有沒有空",
  replyShort: "10:00 - 22:00",
  startPrice: "NT$18,000",
  onePageWeeks: "2 到 3 週",
  multiPageWeeks: "4 到 6 週",
  payment: "開工前付 50%，上線前付 50%",
  revisions: "設計階段可以大改 1 輪、小改 3 輪；改文字、換圖片不限次數",
  freeCheck: "傳你的店名、網站或 IG 給我，我免費看一次，回你 3 個可以馬上改的地方。看完不用付錢，也不會一直追問。"
};

export const studioServices = [
  {
    title: "網站設計",
    text: "先問清楚客人最常問你什麼，再決定首頁先放什麼、LINE 按鈕放哪裡。"
  },
  {
    title: "前端製作",
    text: "我自己寫程式，不套 Wix 或 WordPress 版型。手機、LINE 內建瀏覽器都會實際測過。"
  },
  {
    title: "網域、主機與上線",
    text: "幫你買網域、設定 DNS 和 HTTPS。網域登記在你名下。"
  },
  {
    title: "預約與後台功能",
    text: "線上預約、排班、內容後台這類功能，我做過一套給兩間門市用的。"
  },
  {
    title: "上線後維護",
    text: "改價格、換照片、加公告、主機出狀況，傳 LINE 給我就好。"
  }
];

export type StudioPlan = {
  title: string;
  nameZh: string;
  price: string;
  text: string;
  weeks: string;
  includes: string[];
  excludes: string[];
  prepare: string[];
};

export const studioPlans: StudioPlan[] = [
  {
    title: "One-page Site",
    nameZh: "一頁式網站",
    price: "NT$18,000 - 28,000",
    text: "服務項目不多，主要目的是讓客人看完就加 LINE 或打電話。工作室、個人品牌、剛開的小店最常選。",
    weeks: "2 到 3 週",
    includes: ["一頁手機優先的網站", "服務、價格、地點、營業時間、常見問題", "LINE、電話、Google 地圖按鈕", "網域與 HTTPS 設定", "Google 搜尋基本設定與送出網址", "上線後 1 個月小修改"],
    excludes: ["網域年費（約 NT$500 - 1,000，登記在你名下）", "拍照、文案代寫", "預約、會員、金流功能"],
    prepare: ["店名、Logo（沒有也可以）", "服務項目與價格", "5 到 10 張照片", "你喜歡的 1 到 2 個網站"]
  },
  {
    title: "5-page Site",
    nameZh: "多頁網站",
    price: "NT$35,000 - 58,000",
    text: "服務比較多、想放案例或作品、希望每項服務都能被 Google 搜到的店。",
    weeks: "4 到 6 週",
    includes: ["首頁加 4 個以上內頁（服務、作品、關於、聯絡等）", "每個服務一頁，方便被搜尋", "簡單的內容後台或交接文件", "網域、HTTPS、搜尋基本設定", "上線後 1 個月小修改"],
    excludes: ["網域年費", "拍照、大量文案代寫", "預約、會員、金流功能"],
    prepare: ["每項服務的說明與價格", "作品或案例照片", "店家介紹", "常被客人問的問題"]
  },
  {
    title: "Custom Function",
    nameZh: "預約系統與客製功能",
    price: "另行報價",
    text: "線上預約、排班、會員資料、內容後台、串接 LINE 登入。先聊流程，我再估時間和費用。",
    weeks: "依功能，先估再做",
    includes: ["需求訪談與流程整理", "書面報價與時程", "測試帳號，讓你先試用", "上線與操作教學"],
    excludes: ["第三方服務月費（簡訊、LINE 官方帳號方案等）", "金流手續費"],
    prepare: ["你現在怎麼接預約、記客人", "最常出錯或最花時間的步驟"]
  }
];

export const maintenancePlans = [
  ["Basic", "NT$1,200 / month", "主機、HTTPS、備份、網站掛掉時處理，每月 2 次小修改（換文字、換圖）。"],
  ["Standard", "NT$2,000 / month", "Basic 全部，加上每月一次檢查與報告：多少人看、從哪裡來、哪個按鈕被點。"],
  ["Managed Growth", "NT$3,500 / month", "每月幫你更新內容或活動頁，適合常有新課程、新療程、季節活動的店。"]
] as const;

export const studioProcess = [
  ["01", "免費看一次（1 到 2 天）", "你傳店名、現在的網站或 IG。我回你 3 個可以馬上改的地方，以及適合哪種方案、大概多少錢。"],
  ["02", "報價與確認（約 3 天）", "寫清楚做哪些頁、多少錢、幾週完成、你要準備什麼。你同意、付 50% 訂金後開始。"],
  ["03", "設計（約 1 週）", "先給你看手機版的首頁設計。可以大改 1 輪、小改 3 輪，改文字和換圖片不限次數，確定了才開始寫程式。"],
  ["04", "製作與測試（1 到 3 週）", "我做出可以點的測試網址給你。iPhone、Android、LINE 內建瀏覽器都會實際測過。"],
  ["05", "上線與交接", "付清尾款、接上你的網域。你會拿到網域帳號、程式碼位置和一份說明怎麼改內容的文件。"]
] as const;
