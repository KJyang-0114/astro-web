import { maintenancePlans, studioContact, studioFacts, studioPlans, studioServices } from "./studio";
import { realCases } from "./cases";
import { person } from "./person";
import { insightPosts } from "./insights";
import { servicePages } from "./trust";
import { workCases } from "./work";

export const studioOrigin = "https://kjyang0114.dev";

export const indexableStudioRoutes = [
  {
    path: "/studio",
    priority: "1.0",
    changefreq: "weekly",
    title: "KJyang Studio"
  },
  {
    path: "/studio/services",
    priority: "0.8",
    changefreq: "monthly",
    title: "Services"
  },
  ...servicePages.map((service) => ({
    path: `/studio/services/${service.slug}`,
    priority: "0.75",
    changefreq: "monthly",
    title: service.title
  })),
  {
    path: "/studio/work",
    priority: "0.85",
    changefreq: "monthly",
    title: "Works"
  },
  ...realCases.map((item) => ({
    path: `/studio/work/${item.slug}`,
    priority: "0.85",
    changefreq: "monthly",
    title: item.name
  })),
  ...workCases.map((work) => ({
    path: `/studio/work/${work.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    title: work.title
  })),
  {
    path: "/studio/about",
    priority: "0.8",
    changefreq: "monthly",
    title: "About"
  },
  {
    path: "/studio/pricing",
    priority: "0.8",
    changefreq: "monthly",
    title: "Pricing"
  },
  {
    path: "/studio/process",
    priority: "0.7",
    changefreq: "monthly",
    title: "Process"
  },
  {
    path: "/studio/contact",
    priority: "0.9",
    changefreq: "monthly",
    title: "Contact"
  },
  {
    path: "/studio/en",
    priority: "0.7",
    changefreq: "monthly",
    title: "English"
  },
  {
    path: "/studio/en/services",
    priority: "0.65",
    changefreq: "monthly",
    title: "English Services"
  },
  {
    path: "/studio/en/pricing",
    priority: "0.65",
    changefreq: "monthly",
    title: "English Pricing"
  },
  {
    path: "/studio/en/contact",
    priority: "0.65",
    changefreq: "monthly",
    title: "English Contact"
  },
  {
    path: "/studio/insights",
    priority: "0.7",
    changefreq: "monthly",
    title: "Insights"
  },
  ...insightPosts.map((post) => ({
    path: `/studio/insights/${post.slug}`,
    priority: "0.7",
    changefreq: "monthly",
    title: post.title
  }))
];

// 核心頁的標題與說明。頁面、llms.txt、studio.md 都從這裡讀，避免各寫各的。
export const studioPageMeta: Record<string, { title: string; description: string }> = {
  "/studio": {
    title: "北部小店網站與預約系統製作｜NT$18,000 起 — KJyang Studio",
    description: "楊凱捷一人接案，幫北部小店、工作室、美容 SPA 做網站和線上預約系統。設計、程式、上線、之後的修改都自己處理。一頁式 NT$18,000 起，約 2 到 3 週上線。"
  },
  "/studio/services": {
    title: "服務項目｜小店網站製作、改版、維護、預約系統 — KJyang Studio",
    description: "我幫小店做網站、改舊網站、處理上線和主機，也做過線上預約和排班後台。設計和程式都是我自己來，一頁式 NT$18,000 起，約 2 到 3 週。"
  },
  "/studio/work": {
    title: "作品｜Weilspa 預約系統與 SYNK ATELIER — KJyang Studio",
    description: "我做過的 3 個真實作品：Weilspa（雙門市美容 SPA）的預約與排班系統、自己經營的粉絲資訊站與網頁遊戲、這個自動部署的網站。另外有 4 個虛構品牌的設計範例。"
  },
  "/studio/about": {
    title: "關於我｜楊凱捷，一人接案做小店網站 — KJyang Studio",
    description: "我是楊凱捷，鶯歌工商資訊科高三，一人接案幫北部小店做網站和預約系統。做過 Weilspa 的預約與排班系統、自己經營的粉絲資訊站，也做過完全遠端的軟體開發。這頁說明我能做什麼、不能做什麼。"
  },
  "/studio/pricing": {
    title: "小店網站製作價格｜一頁式 NT$18,000 起 — KJyang Studio",
    description: "一頁式網站 NT$18,000 - 28,000、多頁網站 NT$35,000 - 58,000、預約系統另外報價。逐項列出包含、不包含、幾週完成、你要準備什麼，以及維護月費。"
  },
  "/studio/process": {
    title: "網站製作流程｜從傳 LINE 到上線要幾天 — KJyang Studio",
    description: "找我做網站會經過 5 步：免費看一次、報價、設計、製作測試、上線交接。一頁式大約 2 到 3 週，多頁網站 4 到 6 週。每一步大約幾天、你要給我什麼、我會給你什麼。"
  },
  "/studio/contact": {
    title: "聯絡我｜LINE 傳店名，免費看一次 — KJyang Studio",
    description: "用 LINE、電話或 Email 找楊凱捷。傳店名、現在的網站或 IG，我免費看一次，回你 3 個可以馬上改的地方。每天 10:00 到 22:00 看 LINE，北部可約見面，其他地區線上進行。"
  },
  "/studio/insights": {
    title: "文章｜小店網站的價格、預約、手機版與維護 — KJyang Studio",
    description: "小店網站多少錢、要不要做網站、LINE 預約和預約系統差在哪、手機第一屏放什麼、上線之後怎麼維護。楊凱捷用自己做過的案子寫的 6 篇文章。"
  },
  "/studio/en": {
    title: "Websites & Booking Systems in Taiwan | KJyang Studio",
    description: "Kai-Jie Yang in New Taipei designs, codes, launches and maintains websites and booking systems for small businesses in Taiwan. One-page sites from NT$18,000."
  },
  "/studio/en/services": {
    title: "Website, Booking & Hosting Services | KJyang Studio",
    description: "Kai-Jie Yang designs, codes, launches and maintains websites and booking systems for small businesses in Taiwan. Based in northern Taiwan, works online."
  },
  "/studio/en/pricing": {
    title: "Website Pricing in Taiwan, from NT$18,000 | KJyang Studio",
    description: "Website prices by Kai-Jie Yang: one-page sites NT$18,000–28,000, multi-page sites NT$35,000–58,000, booking systems quoted per project."
  },
  "/studio/en/contact": {
    title: "Contact Kai-Jie Yang | KJyang Studio",
    description: "Contact Kai-Jie Yang on LINE or by email about a website or booking system for your small business. LINE is checked daily from 10:00 to 22:00."
  },
};

export const founderPerson = {
  "@type": "Person",
  "@id": person["@id"],
  name: person.name,
  alternateName: person.alternateName,
  url: person.url,
  sameAs: person.sameAs
};

export function absoluteStudioUrl(path: string) {
  return new URL(path, studioOrigin).toString();
}

// 社群分享圖：LINE、Facebook、Threads、X、iMessage 都不顯示 SVG。
// 由 scripts/generate-og-images.mjs 產生。
export const studioOgImage = {
  zh: { url: absoluteStudioUrl("/brand/kjyang-studio-og.png"), alt: "小店網站與預約系統製作｜KJyang Studio。一頁式 NT$18,000 起，北部可約見面，全台線上。" },
  en: { url: absoluteStudioUrl("/brand/kjyang-studio-og-en.png"), alt: "KJyang Studio: websites and booking systems for small businesses in Taiwan. One-page sites from NT$18,000." },
  width: 1200,
  height: 630
};
export const studioLogoUrl = absoluteStudioUrl("/brand/kjyang-mark-512.png");

export const studioOrganizationId = `${absoluteStudioUrl("/studio")}#organization`;
export const studioOrganizationRef = { "@type": "ProfessionalService", "@id": studioOrganizationId, name: "KJyang Studio" };

// 中英文對應頁。x-default 一律指向中文頁（主要客群在台灣）。
export const studioLanguagePairs: Array<{ zh: string; en: string }> = [
  { zh: "/studio", en: "/studio/en" },
  { zh: "/studio/services", en: "/studio/en/services" },
  { zh: "/studio/pricing", en: "/studio/en/pricing" },
  { zh: "/studio/contact", en: "/studio/en/contact" }
];

export function studioAlternatesFor(path: string) {
  const clean = path.replace(/\/$/, "") || "/";
  const pair = studioLanguagePairs.find((item) => item.zh === clean || item.en === clean);
  if (!pair) return [];
  return [
    { hrefLang: "zh-Hant", href: pair.zh },
    { hrefLang: "en", href: pair.en },
    { hrefLang: "x-default", href: pair.zh }
  ];
}

export function breadcrumbSchema(items: Array<[string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteStudioUrl(path)
    }))
  };
}

// "NT$18,000 - 28,000" → { min: 18000, max: 28000 }；"NT$1,200 / month" → { min: 1200 }
function parseTwd(text: string) {
  const numbers = [...text.matchAll(/\d[\d,]*/g)].map(([n]) => Number(n.replace(/,/g, "")));
  return numbers.length ? { min: numbers[0], max: numbers[1] } : undefined;
}

function planOffer(name: string, price: string, description: string, monthly = false) {
  const parsed = parseTwd(price);
  return {
    "@type": "Offer",
    name,
    description,
    url: absoluteStudioUrl("/studio/pricing"),
    seller: { "@id": studioOrganizationId },
    ...(parsed
      ? {
          priceCurrency: "TWD",
          priceSpecification: monthly
            ? { "@type": "UnitPriceSpecification", priceCurrency: "TWD", price: parsed.min, unitCode: "MON", unitText: "月" }
            : {
                "@type": "PriceSpecification",
                priceCurrency: "TWD",
                minPrice: parsed.min,
                ...(parsed.max ? { maxPrice: parsed.max } : {})
              }
        }
      : {})
  };
}

/** 價格頁和服務頁用的 Service＋Offer。價格一律從 studio.ts 讀。 */
export function buildStudioServiceSchema(pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteStudioUrl(pagePath)}#service`,
    name: "小店網站與預約系統製作",
    serviceType: studioServices.map((service) => service.title),
    description: `楊凱捷一人接案：網站設計、前端製作、網域與主機設定、線上預約與後台、上線後維護。一頁式網站 ${studioFacts.startPrice} 起。`,
    url: absoluteStudioUrl(pagePath),
    provider: { "@id": studioOrganizationId },
    areaServed: studioFacts.areaServed,
    availableLanguage: ["zh-Hant", "en"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "網站製作與維護價格",
      itemListElement: [
        ...studioPlans.map((plan) => planOffer(plan.nameZh, plan.price, plan.text)),
        ...maintenancePlans.map(([title, price, text]) => planOffer(`維護月費 ${title}`, price, text, true))
      ]
    }
  };
}

export const studioFaq = [
  {
    question: "你還是學生，網站做完之後找得到你嗎？",
    answer: "找得到。我每天上午 10 點到晚上 10 點會看 LINE。網域和主機帳號登記在你名下，程式碼也會交給你，就算哪天我真的沒辦法接，換別的工程師也接得起來。"
  },
  {
    question: "我只有 IG 和 Google 地圖，還需要網站嗎？",
    answer: "不一定。如果客人都是熟客、靠 LINE 就接得完，先把 Google 商家資料補齊就好。如果常被問價格、營業時間、怎麼預約，或想讓沒追蹤你的人也搜得到，網站就有用。免費看一次的時候我會直接跟你說要不要做。"
  },
  {
    question: "多久可以上線？",
    answer: "一頁式大約 2 到 3 週，多頁網站 4 到 6 週，從資料給齊那天開始算。最常拖到時間的是照片和價目，所以我會先給你一份要準備的清單。"
  },
  {
    question: "線上預約系統跟用 LINE 預約差在哪？",
    answer: "LINE 預約要一則一則回，忙的時候客人要等。預約系統讓客人自己看哪些時段可以約、送出申請，你有空再一次確認。我幫一間兩家門市的美容 SPA 做過一套，主要就是讓老闆少回訊息。"
  },
  {
    question: "會保證 Google 排名嗎？",
    answer: "不會，誰保證都不要信。我會做好基本設定（標題、說明、地區、網站地圖），送到 Google Search Console，並教你怎麼看有多少人搜到你。"
  }
];

export function buildStudioSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": studioOrganizationId,
      name: "KJyang Studio",
      url: absoluteStudioUrl("/studio"),
      logo: { "@type": "ImageObject", url: studioLogoUrl, width: 512, height: 512 },
      image: studioOgImage.zh.url,
      description:
        `楊凱捷一人經營的網站接案：幫北部小店、工作室做網站和線上預約系統，設計、程式、上線與之後的維護都自己來。一頁式網站 ${studioFacts.startPrice} 起。`,
      founder: founderPerson,
      email: studioContact.email,
      telephone: studioContact.phoneIntl,
      priceRange: `${studioFacts.startPrice} 起`,
      currenciesAccepted: "TWD",
      address: { "@type": "PostalAddress", addressRegion: "新北市", addressCountry: "TW" },
      areaServed: studioFacts.areaServed,
      knowsLanguage: ["zh-Hant", "en"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: studioContact.phoneIntl,
          email: studioContact.email,
          url: studioContact.lineUrl,
          availableLanguage: ["zh-Hant", "en"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "10:00",
            closes: "22:00"
          }
        }
      ],
      sameAs: [studioContact.lineUrl]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: studioFaq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer }
      }))
    }
  ];
}
