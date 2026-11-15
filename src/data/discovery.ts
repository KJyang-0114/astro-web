// 給 AI 搜尋與 llms.txt 讀的摘要。每一句都要能在網站其他地方查得到。
// 數字一律從 studio.ts、cases.ts 讀，不在這裡另外寫死。
import { maintenancePlans, studioContact, studioFacts, studioPlans } from "./studio";
import { realCases } from "./cases";
import { insightPosts } from "./insights";
import { servicePages } from "./trust";
import { workCases } from "./work";
import { absoluteStudioUrl, studioPageMeta } from "./seo";

const [onePage, multiPage, custom] = studioPlans;
const careFrom = maintenancePlans[0][1].replace(" / month", "");

/** 放在 llms.txt 最上面、可以直接被引用的幾句話（繁體中文）。 */
export const citableSummaryZh = [
  `楊凱捷（KJyang）是新北市鶯歌工商資訊科的高三學生，自學 Web、後端與 AI 整合，做過完全遠端的軟體開發工作。kjyang0114.dev 是他的個人網站。`,
  `KJyang Studio 是楊凱捷一個人經營的網站接案，網址 ${absoluteStudioUrl("/studio")}：幫小店、工作室做網站和線上預約系統，設計、程式、上線和之後的維護都是他自己做。${studioFacts.area}。`,
  `價格：${onePage.nameZh} ${onePage.price}（大約 ${onePage.weeks}）；${multiPage.nameZh} ${multiPage.price}（大約 ${multiPage.weeks}）；${custom.nameZh}${custom.price}；維護月費 ${careFrom} 起，可以不買。付款方式：${studioFacts.payment}。`,
  `真實作品：Weilspa（兩間門市的美容 SPA）的預約與排班系統、自己經營的 aespa 粉絲資訊站 SYNK ATELIER 和它的網頁遊戲 /game，以及這個自動部署的網站本身。`,
  `聯絡方式以 LINE 為主（${studioContact.lineUrl}），他每天 ${studioFacts.replyShort} 會看 LINE。也可以寫信到 ${studioContact.email}。`
];

/** 英文版的同一段摘要。 */
export const citableSummaryEn = [
  `Kai-Jie Yang (楊凱捷, "KJyang") is a vocational high-school senior (information technology program, 鶯歌工商資訊科) in New Taipei, Taiwan. He taught himself web, backend and AI integration work and has fully remote software development experience. kjyang0114.dev is his personal site.`,
  `KJyang Studio (${absoluteStudioUrl("/studio")}) is his one-person web studio. He builds websites and online booking systems for small businesses and does the design, code, launch and maintenance himself. In-person meetings are possible in northern Taiwan (Taipei, New Taipei, Taoyuan); other areas work online.`,
  `Prices: one-page sites ${onePage.price} (about 2 to 3 weeks); multi-page sites ${multiPage.price} (about 4 to 6 weeks); booking systems and custom features are quoted per project; optional maintenance from ${careFrom} per month. Payment is 50% before work starts and 50% before launch.`,
  `Real work: a booking and staff scheduling system for Weilspa (a beauty spa with two branches), SYNK ATELIER (his own aespa fan information site with a web card game at /game), and this auto-deployed website.`,
  `Contact is LINE-first (${studioContact.lineUrl}); LINE is checked daily from 10:00 to 22:00. Email: ${studioContact.email}.`
];

/** 不該被說成事實的事。 */
export const doNotClaim = [
  "KJyang Studio 是一個人，不是團隊、公司或 SEO 代操。",
  "不保證 Google 排名、AI 引用或詢問數量。",
  "/studio/demo 和 /studio/en/demo 底下的店名都是虛構的設計範例，不是客戶。",
  "Weilspa 的前台還沒公開；網站上沒有放真實療程、價格或顧客資料。"
];

export type DiscoveryLink = { title: string; url: string; text: string };

export function studioCoreLinks(): DiscoveryLink[] {
  return [
    "/studio",
    "/studio/pricing",
    "/studio/services",
    "/studio/work",
    "/studio/process",
    "/studio/about",
    "/studio/contact",
    "/studio/insights"
  ].map((path) => ({
    title: studioPageMeta[path].title.replace(/\s*[—|｜]\s*KJyang Studio$/, ""),
    url: absoluteStudioUrl(path),
    text: studioPageMeta[path].description
  }));
}

export function studioEnglishLinks(): DiscoveryLink[] {
  return ["/studio/en", "/studio/en/services", "/studio/en/pricing", "/studio/en/contact"].map((path) => ({
    title: studioPageMeta[path].title.replace(/\s*\|\s*KJyang Studio$/, ""),
    url: absoluteStudioUrl(path),
    text: studioPageMeta[path].description
  }));
}

export function serviceLinks(): DiscoveryLink[] {
  return servicePages.map((service) => ({
    title: service.title,
    url: absoluteStudioUrl(`/studio/services/${service.slug}`),
    text: service.metaDescription
  }));
}

export function realCaseLinks(): DiscoveryLink[] {
  return realCases.map((item) => ({
    title: item.name,
    url: absoluteStudioUrl(`/studio/work/${item.slug}`),
    text: `${item.kind}。狀態：${item.status}。${item.summary}${item.url ? ` 網站：${item.url}` : ""}${
      item.links?.length ? ` ${item.links.map(([label, href]) => `${label}：${href}`).join("；")}` : ""
    }`
  }));
}

export function articleLinks(): DiscoveryLink[] {
  return insightPosts.map((post) => ({
    title: post.title,
    url: absoluteStudioUrl(`/studio/insights/${post.slug}`),
    text: post.summary
  }));
}

export function sampleLinks(): DiscoveryLink[] {
  return workCases.map((work) => ({
    title: work.title,
    url: absoluteStudioUrl(`/studio/work/${work.slug}`),
    text: `虛構品牌的設計範例，不是客戶。${work.strategy}`
  }));
}

export const linkList = (links: DiscoveryLink[]) => links.map((link) => `- [${link.title}](${link.url}): ${link.text}`).join("\n");
