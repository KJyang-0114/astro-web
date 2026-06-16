export const studioBeliefs = [
  {
    title: "網站不是只做漂亮",
    text: "漂亮是基本，但商家網站還要讓訪客知道你做什麼、服務哪裡、怎麼聯絡、為什麼可以信任。"
  },
  {
    title: "代碼和部署要一起想",
    text: "只交設計圖或一包檔案不夠。網站要能穩定上線、能維護、能備份、能被搜尋和 AI 理解。"
  },
  {
    title: "不假裝保證排名",
    text: "SEO/GEO 可以做基礎結構，但不保證 Google 排名或 AI 引用。這樣講比較誠實，也比較適合長期合作。"
  },
  {
    title: "客戶要握住自己的資產",
    text: "網域應由客戶持有。我可以協助 DNS、SSL、主機與 Cloudflare 設定，但不應用網域綁住客戶。"
  }
];

export const fitChecks = [
  ["適合", "有真實服務、願意整理內容、重視手機版體驗、想把網站當長期門面。"],
  ["不適合", "只想找最低價、完全不願提供資料、要求保證排名、想把網站做成誇大廣告。"],
  ["合作方式", "先看 demo 和價格區間，再確認需求、內容、功能、預算與上線方式。"]
];

export const whyUsBlocks = [
  {
    title: "不是便宜模板",
    text: "模板可以快，但常常無法回答某個行業真正的客戶問題。我會先拆服務、CTA、FAQ 和信任訊號，再進設計。"
  },
  {
    title: "不是只有 AI 生成",
    text: "AI 可以幫忙產出草稿，但網站要能用，仍要有人判斷資訊架構、手機版、表單流程、部署和後續維護。"
  },
  {
    title: "不是只會做首頁",
    text: "首頁只是入口。服務頁、作品、價格、流程、FAQ、schema、sitemap、llms.txt 都會影響網站能不能被理解。"
  },
  {
    title: "不是交付後消失",
    text: "網站上線後還會有 SSL、主機、備份、內容修改和監控問題。維護範圍先說清楚，後續才不混亂。"
  }
];

export const servicePages = [
  {
    slug: "local-business-website",
    title: "小商家網站製作",
    description: "適合冷氣、水電、診所、補習班、美業、清潔、搬家、室內設計等服務型商家。",
    promise: "把服務、地區、信任和聯絡動線整理成能上線的網站。",
    includes: ["首頁資訊架構", "手機版 CTA", "服務內容", "FAQ", "基礎 schema", "部署上線"]
  },
  {
    slug: "website-redesign",
    title: "舊網站重新設計",
    description: "適合已有網站，但手機版不好用、設計老舊、內容混亂或詢問入口不清楚的商家。",
    promise: "保留有用內容，重新規劃視覺、資訊順序和聯絡流程。",
    includes: ["現況盤點", "手機版重整", "CTA 重設", "內容重排", "視覺升級", "上線替換"]
  },
  {
    slug: "website-maintenance",
    title: "網站維護與內容更新",
    description: "適合希望有人協助內容小修改、主機狀態、SSL、備份和基本監控的商家。",
    promise: "讓網站上線後有人處理日常問題，不用每次都重新找工程師。",
    includes: ["內容小修改", "SSL 狀態", "備份檢查", "主機監控", "錯誤排查", "更新建議"]
  },
  {
    slug: "deployment-hosting",
    title: "部署上線與主機設定",
    description: "適合已有設計或前端，但需要協助 VPS、Docker、Nginx/Caddy、Cloudflare 和 SSL 的專案。",
    promise: "把網站從本機作品變成可公開訪問、可維護的線上服務。",
    includes: ["VPS 設定", "Docker", "Nginx/Caddy", "Cloudflare DNS", "SSL", "部署腳本"]
  }
];

export function getServicePage(slug: string) {
  const item = servicePages.find((service) => service.slug === slug);
  if (!item) {
    throw new Error(`Missing service page: ${slug}`);
  }
  return item;
}
