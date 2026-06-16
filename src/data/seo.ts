import { maintenancePlans, studioContact, studioPlans, studioProcess, studioServices } from "./studio";
import { studioGuides } from "./guides";
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
    path: "/studio/why-us",
    priority: "0.75",
    changefreq: "monthly",
    title: "Why KJyang Studio"
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
    priority: "0.8",
    changefreq: "daily",
    title: "Insights"
  },
  ...studioGuides.map((guide) => ({
    path: `/studio/${guide.slug}`,
    priority: guide.slug === "website-design-for-local-business" ? "0.8" : "0.7",
    changefreq: "monthly",
    title: guide.title
  })),
  ...insightPosts.map((post) => ({
    path: `/studio/insights/${post.slug}`,
    priority: "0.7",
    changefreq: "weekly",
    title: post.title
  }))
];

export function absoluteStudioUrl(path: string) {
  return new URL(path, studioOrigin).toString();
}

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
        "KJyang Studio designs, codes, deploys, and maintains conversion-focused websites for small businesses.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: studioContact.phone,
          availableLanguage: ["zh-Hant", "en"]
        }
      ],
      sameAs: [studioContact.lineUrl]
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
      name: "KJyang Studio website design and deployment",
      url: absoluteStudioUrl("/studio/services"),
      image: absoluteStudioUrl("/brand/kjyang-cover.svg"),
      provider: {
        "@id": organizationId
      },
      areaServed: ["Taiwan", "International"],
      serviceType: studioServices.map((service) => service.title),
      description:
        "Website design, frontend coding, deployment support, hosting setup, SSL, backups, monitoring, maintenance, and basic SEO/GEO setup without ranking guarantees.",
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
      mainEntity: [
        {
          "@type": "Question",
          name: "KJyang Studio 主要做什麼？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "KJyang Studio 主要提供網站設計、前端代碼編寫、部署上線、主機設定、SSL、備份、監控與後續維護。"
          }
        },
        {
          "@type": "Question",
          name: "SEO 和 GEO 會保證排名嗎？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "不保證排名或 AI 引用結果。服務包含基礎 SEO/GEO 設定，例如 title、description、schema、FAQ、語意內容與 sitemap。"
          }
        },
        {
          "@type": "Question",
          name: "合作流程是什麼？",
          acceptedAnswer: {
            "@type": "Answer",
            text: studioProcess.map(([num, title]) => `${num} ${title}`).join("、")
          }
        }
      ]
    }
  ];
}
