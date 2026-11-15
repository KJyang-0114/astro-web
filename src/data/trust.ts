// 文案規範：docs/studio-writing-guide.md

// 「為什麼可以找我」：寫的是做法，每一條都要能被檢查。
export const studioBeliefs = [
  {
    title: "網域登記在你名下",
    text: "我幫你買、幫你設定，但帳號是你的。哪天不找我了，網站也帶得走。"
  },
  {
    title: "價格先公開",
    text: "方案和價格都寫在網站上。報價單會寫清楚做哪些頁、幾週完成、哪些不包含。"
  },
  {
    title: "從頭到尾都是我",
    text: "設計、寫程式、上線、之後的修改都是我做。你傳 LINE 找的就是做網站的人，不用透過業務轉達。"
  },
  {
    title: "程式碼交接得出去",
    text: "用常見的工具寫（Astro、Next.js），附上說明文件。之後換別的工程師接手也看得懂。"
  }
];

export const fitChecks = [
  ["適合找我", "小店、工作室、補習班、美容或在地服務；預算在一頁式 NT$18,000 以上；希望有人可以一直用 LINE 問。"],
  ["不太適合", "需要隔天就上線、要一次做電商加會員加金流，或希望有一整個團隊開會提案。"],
  ["不確定的話", "傳你的店名或 IG 給我，我先免費看一次，再告訴你適不適合。"]
] as const;

// 舊 why-us 頁已併入 /studio/about，保留給 llms-full.txt 使用。
export const whyUsBlocks = studioBeliefs;

export const servicePages = [
  {
    slug: "local-business-website",
    title: "小店網站製作",
    description: "給美容、補習班、工作室、修繕、餐飲等在地小店的網站。手機優先，看完就能加 LINE 或打電話。",
    // 只用在搜尋結果的說明（meta description），頁面上不顯示。
    metaDescription: "給美容、補習班、工作室、修繕、餐飲等在地小店的網站，手機優先，看完就能加 LINE 或打電話。一頁式 NT$18,000 起，大約 2 到 3 週上線。楊凱捷一人接案，北部可約見面。",
    promise: "客人在手機上 10 秒內看懂：你做什麼、在哪裡、多少錢、怎麼聯絡。",
    scenario: "常見情況：客人在 Google 地圖看到你的店，點進 IG 只看到一堆貼文，找不到價格和營業時間，就去問別家了。網站要做的，就是把這些資訊放在同一頁，讓客人一次看完。",
    includes: ["手機版首頁", "服務與價格", "地點、營業時間、地圖", "常見問題", "LINE、電話按鈕", "網域與上線"]
  },
  {
    slug: "website-redesign",
    title: "舊網站改版",
    description: "已經有網站，但手機版很難用、資訊舊了、或是客人看完不知道怎麼聯絡。",
    metaDescription: "已經有網站，但手機版難用、資訊舊了，或客人看完不知道怎麼聯絡。我先用手機從頭點一次，列出卡住的地方，再決定局部修改還是整個重做。北部可約見面，其他地區線上進行。",
    promise: "保留還有用的內容，重新整理順序，讓手機上看得清楚。",
    scenario: "我會先用手機把你的網站從頭點一次，列出卡住的地方（例如按鈕太小、價格藏在第三層、表單送不出去），再決定是局部修改還是整個重做。只需要局部修改的話，我會直接跟你說，不用整個重做。",
    includes: ["現況檢查清單", "手機版重排", "聯絡按鈕重新安排", "內容整理", "視覺更新", "舊網址轉址"]
  },
  {
    slug: "website-maintenance",
    title: "網站維護與內容更新",
    description: "網站做好了，但每次要改價格、換照片都不知道找誰。",
    metaDescription: "網站做好了，但改價格、換照片不知道找誰。維護月費 NT$1,200 起，包含主機、HTTPS、備份和每月 2 次小修改；不買月費也可以，要改的時候再單次報價。",
    promise: "改內容傳 LINE 給我，主機和 HTTPS 我會盯著。",
    scenario: "我自己的網站放在一台我自己管的 Mac mini 上，用 Docker 跑，每次更新都由 GitHub Actions 自動部署。你的網站我也用同一套方式管，所以改一個價格，我處理完幾分鐘內就會上線。",
    includes: ["文字、圖片小修改", "HTTPS 憑證到期處理", "備份", "網站掛掉時處理", "每月流量報告（Standard 以上）", "改版建議"]
  },
  {
    slug: "deployment-hosting",
    title: "部署上線與主機設定",
    description: "已經有網站檔案或別人做好的程式，需要有人幫忙放上網、接網域、設 HTTPS。",
    metaDescription: "已經有網站檔案或別人寫好的程式，需要放上網、接網域、設 HTTPS。我依情況選 Cloudflare、VPS 或自架主機，設好自動部署，最後把帳號和設定文件交給你。",
    promise: "把放在電腦裡的網站變成任何人都打得開的網址。",
    scenario: "常見狀況是網站在自己電腦上跑得沒問題，一上線就壞：圖片路徑錯、HTTPS 沒設、網域指錯地方。我會照你的情況選主機（Cloudflare、VPS 或自架），設定好自動部署，最後把帳號和設定文件交給你。",
    includes: ["主機選擇與設定", "Docker", "Nginx／Caddy", "Cloudflare DNS", "HTTPS", "自動部署"]
  }
];

export function getServicePage(slug: string) {
  const item = servicePages.find((service) => service.slug === slug);
  if (!item) {
    throw new Error(`Missing service page: ${slug}`);
  }
  return item;
}
