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
  const organizationId = `${absoluteStudioUrl("/studio")}#organization`;
  const websiteId = `${absoluteStudioUrl("/studio")}#website`;
  const serviceId = `${absoluteStudioUrl("/studio/services")}#service`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: "KJyang Studio",
      url: absoluteStudioUrl("/studio"),
      logo: absoluteStudioUrl("/brand/kjyang-mark.svg"),
      image: absoluteStudioUrl("/brand/kjyang-cover.svg"),
      description:
        "楊凱捷一人經營的網站接案品牌：幫北部小店、工作室做網站、線上預約系統，負責設計、程式、上線與之後的維護。",
      founder: founderPerson,
      email: studioContact.email,
      areaServed: studioFacts.areaServed,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: studioContact.phoneIntl,
          availableLanguage: ["zh-Hant", "en"]
        }
      ],
      sameAs: [studioContact.lineUrl, ...person.sameAs, person.url]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteStudioUrl("/studio"),
      name: "KJyang Studio",
      publisher: {
        "@id": organizationId
      },
      inLanguage: ["zh-Hant", "en"]
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": serviceId,
      name: "KJyang Studio 小店網站與預約系統製作",
      url: absoluteStudioUrl("/studio/services"),
      image: absoluteStudioUrl("/brand/kjyang-cover.svg"),
      provider: {
        "@id": organizationId
      },
      areaServed: studioFacts.areaServed,
      serviceType: studioServices.map((service) => service.title),
      description:
        "小店網站設計與製作、線上預約與後台、網域與主機設定、上線後維護。一頁式網站 NT$18,000 起。",
      offers: {
        "@type": "OfferCatalog",
        name: "Website build and maintenance price ranges",
        itemListElement: [
          ...studioPlans.map((plan) => ({
            "@type": "Offer",
            name: plan.title,
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TWD",
              description: plan.price
            },
            description: plan.text
          })),
          ...maintenancePlans.map(([title, price, text]) => ({
            "@type": "Offer",
            name: title,
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TWD",
              description: price
            },
            description: text
          }))
        ]
      }
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
