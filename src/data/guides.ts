export type GuideSlug =
  | "website-design-for-local-business"
  | "line-website-cta"
  | "vps-hosting-maintenance"
  | "demo-process"
  | "website-price-guide";

type GuideSection = {
  title: string;
  text: string;
};

type GuideFaq = {
  question: string;
  answer: string;
};

export type StudioGuide = {
  slug: GuideSlug;
  kicker: string;
  title: string;
  description: string;
  summary: string;
  sections: GuideSection[];
  faq: GuideFaq[];
};

const studioOrigin = "https://kjyang0114.dev";

function absoluteStudioUrl(path: string) {
  return new URL(path, studioOrigin).toString();
}

export const studioGuides: StudioGuide[] = [
  {
    slug: "website-design-for-local-business",
    kicker: "Local Business Website",
    title: "小商家網站製作，重點不是漂亮而已",
    description:
      "KJyang Studio 說明小商家網站製作應包含的首屏、服務內容、LINE CTA、FAQ、表單、部署、SSL、備份與維護重點。",
    summary:
      "小商家網站要先讓手機訪客知道你服務什麼地區、能解決什麼問題、怎麼聯絡、價格大概怎麼判斷。設計感重要，但成交路徑更重要。",
    sections: [
      {
        title: "第一屏先回答三件事",
        text: "訪客一進站要看到行業、服務區域、主要服務和下一步 CTA。不要把電話、LINE、表單藏在頁尾。"
      },
      {
        title: "內容要照客戶疑慮排序",
        text: "服務項目、價格形成方式、流程、案例或評價、FAQ 要照購買決策排列，不是照公司自我介紹排列。"
      },
      {
        title: "交付要包含上線能力",
        text: "網站完成後還需要網域、DNS、SSL、主機、備份、監控和後續內容修改，否則業主很快會卡住。"
      }
    ],
    faq: [
      {
        question: "小商家適合一頁式還是五頁式網站？",
        answer: "服務單純、預算有限可先做一頁式；有多項服務、案例、關於我們和 SEO 需求，建議五頁式。"
      },
      {
        question: "網站製作會包含 SEO 嗎？",
        answer: "包含基礎 SEO/GEO 設定，例如 title、description、schema、FAQ、sitemap 和語意內容，但不保證排名或 AI 引用。"
      },
      {
        question: "KJyang Studio 主打什麼？",
        answer: "主打網站設計、前端代碼編寫、部署上線和後續維護，讓網站真的能交付、能聯絡、能持續使用。"
      }
    ]
  },
  {
    slug: "line-website-cta",
    kicker: "LINE CTA",
    title: "台灣商家網站，要讓 LINE 聯絡變很順",
    description:
      "KJyang Studio 說明台灣小商家網站如何安排 LINE CTA、QR code、手機固定按鈕、表單轉 LINE 和詢價內容。",
    summary:
      "很多台灣商家的成交入口不是電子郵件，而是 LINE。網站要讓客戶在手機上可以直接加 LINE、傳照片、說明需求和留下預算範圍。",
    sections: [
      {
        title: "LINE 按鈕要在決策點出現",
        text: "首屏、價格區、FAQ 後、表單區、手機底部都可以安排 LINE 入口，但要避免整頁到處亂貼造成廉價感。"
      },
      {
        title: "QR code 給桌機訪客",
        text: "桌機訪客看到 QR code 可以用手機掃描，手機訪客則用直接連結。兩種情境都要被照顧。"
      },
      {
        title: "表單可以變成 LINE 訊息草稿",
        text: "先讓客戶填店名、行業、需求、預算，再複製成可貼到 LINE 的訊息，降低來回問資料的時間。"
      }
    ],
    faq: [
      {
        question: "要放電話還是 LINE？",
        answer: "台灣服務型商家通常兩個都放，但主 CTA 可以優先給 LINE，電話作為輔助或示意按鈕。"
      },
      {
        question: "LINE QR code 放哪裡？",
        answer: "適合放在聯絡區、頁尾和諮詢卡片。手機版可縮小或改成直接加 LINE 按鈕。"
      },
      {
        question: "表單不能直接寄信怎麼辦？",
        answer: "第一版可先做成複製訊息並開 LINE，後續再串 Resend、CRM 或資料庫。"
      }
    ]
  },
  {
    slug: "vps-hosting-maintenance",
    kicker: "Hosting & Care",
    title: "網站做好後，主機、SSL、備份和監控也要有人處理",
    description:
      "KJyang Studio 說明網站部署、VPS 主機、SSL、Cloudflare DNS、備份、監控與後續維護方案。",
    summary:
      "網站不是做完畫面就結束。商家需要有人協助上線、設定 SSL、處理 DNS、備份、監控和小修改，避免網站交付後沒人管。",
    sections: [
      {
        title: "部署不是丟檔案",
        text: "正式上線通常會碰到網域、DNS、HTTPS、伺服器設定、快取和錯誤頁處理。這些會直接影響客戶是否能正常打開網站。"
      },
      {
        title: "維護是降低營運風險",
        text: "SSL 過期、主機異常、內容需要小改、表單失效，都會讓商家錯失詢問。維護方案就是處理這些日常問題。"
      },
      {
        title: "客戶持有網域",
        text: "網域費另計，客戶自己持有。KJyang Studio 可協助購買和設定 DNS，但不把客戶綁死在網域所有權上。"
      }
    ],
    faq: [
      {
        question: "月費包含什麼？",
        answer: "依方案包含主機、SSL、備份、基本監控、小修改、定期檢查和諮詢。"
      },
      {
        question: "可以用客戶自己的網域嗎？",
        answer: "可以。建議客戶自己持有網域，KJyang Studio 協助設定 DNS 和上線。"
      },
      {
        question: "網站交付後能改內容嗎？",
        answer: "可以依維護方案處理小修改；大幅改版、新頁面或功能開發另行估價。"
      }
    ]
  },
  {
    slug: "demo-process",
    kicker: "Demo To Delivery",
    title: "Demo 不是模板，是成交邏輯的樣本",
    description:
      "KJyang Studio 說明如何把冷氣、牙醫、補習班、室內設計等 demo 轉成真實商家網站。",
    summary:
      "Demo 的目的不是讓每個商家套同一版，而是讓客戶看到某個行業的資訊架構、視覺方向、CTA 和信任內容可以怎麼設計。",
    sections: [
      {
        title: "先用 demo 對齊審美和方向",
        text: "客戶可以指出喜歡哪個 demo 的首屏、卡片、表單、FAQ 或整體感覺，再轉成自己的品牌內容。"
      },
      {
        title: "再換成真實內容",
        text: "店名、服務區域、價格、案例、照片、FAQ、LINE、地圖和營業時間都會換成客戶自己的資料。"
      },
      {
        title: "最後處理部署和維護",
        text: "完成後進行手機檢查、build、上線、SSL、DNS、備份和監控。"
      }
    ],
    faq: [
      {
        question: "Demo 裡的店家是真的嗎？",
        answer: "不是。Demo 是 KJyang Studio 的網站設計樣本，不是真實店家，不接受 demo 預約。"
      },
      {
        question: "可以不要跟 demo 一樣嗎？",
        answer: "可以。Demo 用來確認方向，正式網站會依品牌、素材、預算和行業調整。"
      },
      {
        question: "可以做英文網站嗎？",
        answer: "可以。KJyang Studio 有英文 demo，可用於海外服務商、英文形象頁或雙語入口。"
      }
    ]
  },
  {
    slug: "website-price-guide",
    kicker: "Price Guide",
    title: "網站製作價格怎麼抓：一頁式、多頁式、客製功能",
    description:
      "KJyang Studio 公開網站製作價格區間，說明一頁式、五頁式、客製功能、主機維護月費和網域費用。",
    summary:
      "一頁式網站適合單一服務和快速上線，多頁式適合需要服務頁、案例、關於我們、FAQ 和聯絡頁的商家。客製功能需依需求估價。",
    sections: [
      {
        title: "一頁式網站",
        text: "價格區間 NT$18,000 - NT$28,000，適合服務單純、內容集中、主要目標是讓客戶 LINE 或表單詢問。"
      },
      {
        title: "五頁式網站",
        text: "價格區間 NT$35,000 - NT$58,000，適合需要首頁、服務頁、案例頁、關於頁、聯絡頁或更多 SEO 內容的商家。"
      },
      {
        title: "主機維護",
        text: "維護月費 NT$1,200 起，依主機、SSL、備份、監控、小修改、內容維護和諮詢需求調整。"
      }
    ],
    faq: [
      {
        question: "為什麼不直接給固定價？",
        answer: "因為頁面數、素材狀態、設計複雜度、功能、部署方式都會影響成本。先給區間可快速判斷預算是否適合。"
      },
      {
        question: "網域費包含嗎？",
        answer: "不包含。網域費另計，建議客戶自己持有網域，KJyang Studio 協助設定。"
      },
      {
        question: "預約、會員、付款可以做嗎？",
        answer: "可以討論，但屬於客製功能，需先確認流程、資料、後台和第三方服務後報價。"
      }
    ]
  }
];

export function getStudioGuide(slug: string) {
  const guide = studioGuides.find((item) => item.slug === slug);
  if (!guide) {
    throw new Error(`Missing studio guide: ${slug}`);
  }
  return guide;
}

export function buildGuideSchemas(guide: StudioGuide) {
  const url = absoluteStudioUrl(`/studio/${guide.slug}`);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      url,
      image: absoluteStudioUrl("/brand/kjyang-cover.svg"),
      author: {
        "@type": "Organization",
        name: "KJyang Studio",
        url: absoluteStudioUrl("/studio")
      },
      publisher: {
        "@type": "Organization",
        name: "KJyang Studio",
        logo: {
          "@type": "ImageObject",
          url: absoluteStudioUrl("/brand/kjyang-mark.svg")
        }
      },
      mainEntityOfPage: url,
      inLanguage: "zh-Hant",
      datePublished: "2026-06-14",
      dateModified: "2026-06-14"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "KJyang Studio",
          item: absoluteStudioUrl("/studio")
        },
        {
          "@type": "ListItem",
          position: 2,
          name: guide.title,
          item: url
        }
      ]
    }
  ];
}
