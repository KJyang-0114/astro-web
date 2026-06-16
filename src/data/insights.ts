export type InsightPost = {
  slug: string;
  date: string;
  category: string;
  title: string;
  description: string;
  summary: string;
  takeaways: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

const studioOrigin = "https://kjyang0114.dev";

function absoluteStudioUrl(path: string) {
  return new URL(path, studioOrigin).toString();
}

export const insightPosts: InsightPost[] = [
  {
    slug: "ai-website-vs-professional-build",
    date: "2026-06-15",
    category: "網站製作",
    title: "AI 可以做網站，小商家為什麼還需要專業製作？",
    description:
      "AI 工具可以快速產生網站草稿，但小商家正式網站仍需要資訊架構、品牌視覺、手機體驗、聯絡流程、部署和後續維護。",
    summary:
      "AI 很適合拿來發想文案和初稿，但正式商家網站不能只停在好看的截圖。真正影響詢問的是內容順序、信任感、CTA、手機版穩定度和上線後有人處理問題。",
    takeaways: [
      "AI 可以幫忙產生初稿，但不等於完整交付。",
      "商家網站重點是詢問流程、信任感和手機體驗。",
      "專業製作價值在設計判斷、前端實作、部署和維護。"
    ],
    sections: [
      {
        title: "AI 很快，但常停在表面",
        body:
          "現在用 AI 產生一個網站畫面不難。難的是判斷第一屏應該放什麼、哪個資訊先出現、客戶看完之後要點 LINE 還是表單、手機版會不會擠在一起，以及正式上線後要怎麼維護。"
      },
      {
        title: "小商家網站不是作品集而已",
        body:
          "冷氣、牙醫、補習班、室內設計、清潔、搬家或美業網站，都有不同客戶意圖。有人想快速詢價，有人想看案例，有人想確認地點和營業時間。網站要先處理這些決策問題，而不是只做一個漂亮區塊。"
      },
      {
        title: "專業製作要把看不到的部分一起做好",
        body:
          "正式交付通常包含 meta title、description、FAQ、結構化資料、sitemap、表單或 LINE 聯絡流程、DNS、SSL、主機部署、備份和監控。這些項目不一定會讓畫面更華麗，但會影響網站能不能穩定使用。"
      },
      {
        title: "最好的做法是把 AI 當工具，不是把交付丟給 AI",
        body:
          "AI 可以幫忙整理初稿、產生方向和檢查缺漏，但最後仍需要人來做取捨。哪些內容要保留、哪些文案會太像廣告、哪些 CTA 會打擾使用者、哪些功能現在不該做，這些都是網站製作的核心判斷。"
      }
    ],
    faq: [
      {
        question: "商家可以先用 AI 自己做網站嗎？",
        answer: "可以。如果只是驗證想法或臨時頁面，AI 很有幫助。但正式商家網站仍建議檢查手機版、SEO 基礎、聯絡流程、部署和維護責任。"
      },
      {
        question: "專業網站製作比 AI 多了什麼？",
        answer: "主要差在設計判斷、資訊架構、前端實作、正式部署、SEO/GEO 基礎、表單或 LINE 流程，以及上線後的維護處理。"
      },
      {
        question: "KJyang Studio 會使用 AI 嗎？",
        answer: "會把 AI 當輔助工具，用來整理方向、檢查內容和加速製作，但正式網站仍會依商家需求重新設計、編寫前端代碼並處理部署。"
      }
    ]
  },
  {
    slug: "mobile-line-cta-for-local-business",
    date: "2026-06-14",
    category: "LINE 詢問",
    title: "小商家網站，手機版 LINE 按鈕不是裝飾",
    description:
      "小商家網站在手機版要讓訪客快速找到 LINE、電話、表單和服務資訊，否則評價再好也可能流失詢問。",
    summary:
      "很多在地服務商家的客戶是在手機上臨時搜尋。網站第一屏如果看不到服務、地區和 LINE 入口，訪客很容易先跳去問別家。",
    takeaways: [
      "手機第一屏要看到服務、地區和主要 CTA。",
      "LINE 按鈕要出現在決策點，不是只放頁尾。",
      "桌機可放 QR code，手機要用直接連結。"
    ],
    sections: [
      {
        title: "訪客通常不是慢慢研究網站",
        body:
          "冷氣、水電、搬家、清潔、美業、診所和補習班的訪客，很多時候只是想確認能不能服務、價格大概怎麼算、怎麼聯絡。網站如果先放一大段公司理念，反而會讓人找不到下一步。"
      },
      {
        title: "LINE CTA 要放在客戶剛好想問的地方",
        body:
          "首屏、服務區塊、價格區、FAQ 後方和聯絡區都可以安排 LINE 入口。重點不是把按鈕塞滿整頁，而是讓客戶看完關鍵資訊後，下一個動作剛好就是詢問。"
      },
      {
        title: "不要只照顧桌機訪客",
        body:
          "桌機版可以放 LINE QR code，手機版則應該提供直接加 LINE 或開啟聯絡頁的按鈕。兩種情境都處理好，詢問流程才不會卡住。"
      }
    ],
    faq: [
      {
        question: "LINE 按鈕一定要放在首頁第一屏嗎？",
        answer: "建議要有至少一個明顯入口。第一屏先讓訪客知道你做什麼、服務哪裡，再提供 LINE 或表單 CTA。"
      },
      {
        question: "電話和 LINE 哪個比較重要？",
        answer: "台灣多數服務型商家可以兩個都放。LINE 適合傳照片和需求，電話適合急件，但主流程要依實際客戶習慣決定。"
      }
    ]
  },
  {
    slug: "one-page-vs-five-page-website",
    date: "2026-06-13",
    category: "網站規劃",
    title: "一頁式網站和五頁式網站，差別不是頁數而已",
    description:
      "說明一頁式網站與五頁式網站的適用情境，幫助小商家判斷網站製作預算和內容架構。",
    summary:
      "一頁式適合服務單純、需要快速上線的商家；五頁式適合多服務、多案例、需要更完整搜尋內容的商家。",
    takeaways: [
      "一頁式適合單一服務和快速驗證。",
      "五頁式適合服務分類、案例、FAQ 和關於我們。",
      "不是頁數越多越好，而是內容是否能回答客戶疑慮。"
    ],
    sections: [
      {
        title: "一頁式的重點是集中",
        body:
          "如果商家只有一個主要服務，例如單一課程、單一諮詢服務或明確的一種到府服務，一頁式可以把首屏、服務、流程、價格範圍、FAQ 和聯絡集中在同一條動線。"
      },
      {
        title: "五頁式的重點是分類",
        body:
          "如果商家有多項服務、案例、團隊介紹、環境照片、專門的聯絡流程，就不適合全部塞進一頁。分頁能讓訪客更容易找資料，也讓搜尋引擎更清楚每頁主題。"
      },
      {
        title: "先看內容，再談頁數",
        body:
          "網站報價不該只用頁數判斷。素材是否完整、文案是否要整理、設計複雜度、表單流程、部署維護，都會影響實際成本。"
      }
    ],
    faq: [
      {
        question: "新商家先做一頁式可以嗎？",
        answer: "可以。只要服務單純、主要目標是先建立可信任入口，一頁式通常比較適合起步。"
      },
      {
        question: "之後可以從一頁式擴充成多頁式嗎？",
        answer: "可以。前期先把定位和詢問流程做好，後續再加服務頁、案例頁和文章內容。"
      }
    ]
  },
  {
    slug: "why-website-prices-are-different",
    date: "2026-06-12",
    category: "價格透明",
    title: "網站製作價格為什麼差很多？",
    description:
      "網站設計報價差異通常來自設計深度、前端實作、內容整理、部署維護和客製功能，而不只是頁面數量。",
    summary:
      "同樣叫網站製作，實際可能是套模板、設計稿、前端開發、完整部署或後續維護。價格差異通常來自交付範圍不同。",
    takeaways: [
      "價格差異常來自交付範圍，而不是單純貴或便宜。",
      "要問清楚是否包含設計、文案整理、部署、SSL 和維護。",
      "低價方案通常需要客戶自己處理更多技術細節。"
    ],
    sections: [
      {
        title: "模板網站和客製設計不是同一件事",
        body:
          "有些方案主要是套現成版型，有些會依產業、內容和品牌重新規劃資訊架構。兩者都可以有價值，但客戶要知道自己買到的是哪一種交付。"
      },
      {
        title: "部署和維護也算成本",
        body:
          "網站不是做好畫面就結束。DNS、SSL、主機、備份、監控、小修改和錯誤排查都需要時間。若報價沒有包含這些，客戶後面可能還是要自己處理。"
      },
      {
        title: "便宜不一定錯，但要知道取捨",
        body:
          "如果只是臨時活動頁，低價快速方案可能夠用。如果是商家長期門面，就要考慮設計質感、內容完整度、手機體驗和後續維護。"
      }
    ],
    faq: [
      {
        question: "KJyang Studio 的價格怎麼抓？",
        answer: "一頁式網站約 NT$18,000 - 28,000，五頁式網站約 NT$35,000 - 58,000，客製功能依需求估價。"
      },
      {
        question: "價格可以先粗估嗎？",
        answer: "可以先看頁數、功能、素材狀態和上線需求，再判斷適合一頁式、多頁式或客製方案。"
      }
    ]
  },
  {
    slug: "domain-ownership-matters",
    date: "2026-06-11",
    category: "網域與部署",
    title: "商家網站的網域，最好由客戶自己持有",
    description:
      "說明為什麼小商家的網域應由客戶自己持有，網站公司可協助設定 DNS、SSL 和部署，但不應把網域綁住。",
    summary:
      "網域是商家的長期資產。客戶自己持有網域，未來換主機、換網站公司或調整服務時，比較不會被卡住。",
    takeaways: [
      "網域是商家資產，不只是技術設定。",
      "網站公司可以協助設定，但所有權應清楚。",
      "DNS、SSL 和主機可由維護方協助管理。"
    ],
    sections: [
      {
        title: "網域不是網站公司的附屬品",
        body:
          "店名、品牌和搜尋紀錄都會跟網域累積在一起。如果網域由第三方持有，未來要搬家或換合作方時，可能會增加不必要風險。"
      },
      {
        title: "協助管理不等於持有所有權",
        body:
          "實務上，網站製作方可以協助購買、設定 DNS、串 Cloudflare、開 SSL 和部署，但帳號和所有權最好讓客戶掌握。"
      },
      {
        title: "交付時要說清楚",
        body:
          "一開始就確認網域、主機、維護和備份責任，比事後才爭議更省時間。這也是網站服務看起來專業的一部分。"
      }
    ],
    faq: [
      {
        question: "客戶不懂技術，也要自己買網域嗎？",
        answer: "可以由服務方協助購買和設定，但帳號和所有權建議由客戶掌握。"
      },
      {
        question: "網域費應該包含在網站報價裡嗎？",
        answer: "通常建議另計，因為網域是客戶自己的長期資產。"
      }
    ]
  },
  {
    slug: "service-area-seo-basics",
    date: "2026-06-10",
    category: "SEO 基礎",
    title: "在地服務業網站，服務區域要寫清楚",
    description:
      "在地服務業網站應清楚呈現服務區域、主要服務、地址或範圍，協助訪客、Google 和 AI 理解商家能服務哪些地區。",
    summary:
      "很多商家網站只寫服務項目，卻沒有清楚說明服務區域。對在地搜尋和訪客判斷來說，這是一個常見缺口。",
    takeaways: [
      "title 和首頁文案應包含服務與地區。",
      "服務區域要讓訪客不用猜。",
      "FAQ 可補充到府、外縣市、預約等範圍問題。"
    ],
    sections: [
      {
        title: "訪客先問：你有服務我這裡嗎？",
        body:
          "到府服務、診所、補習班、裝修、美業和清潔服務，都有地理範圍。網站如果沒有清楚寫，訪客可能不會特地打電話確認。"
      },
      {
        title: "搜尋引擎也需要地區線索",
        body:
          "title、meta description、首頁段落、服務頁和 FAQ 都可以自然放入服務地區。這不是保證排名，但能讓網站主題更清楚。"
      },
      {
        title: "不要亂塞地名",
        body:
          "服務區域應該真實。若只是為了 SEO 塞很多地名，但實際不服務，反而會造成客戶失望。"
      }
    ],
    faq: [
      {
        question: "服務區域要寫在首頁嗎？",
        answer: "建議要。首頁第一屏或服務區塊最好能讓訪客快速知道主要服務地區。"
      },
      {
        question: "沒有實體地址可以做在地 SEO 嗎？",
        answer: "可以用服務範圍、案例地區和 FAQ 說明，但不要假裝有不存在的店面。"
      }
    ]
  },
  {
    slug: "website-care-after-launch",
    date: "2026-06-09",
    category: "維護",
    title: "網站上線後，最常被忽略的是維護",
    description:
      "網站上線後仍需要 SSL、備份、監控、內容更新、小修改和問題排查，否則可能影響商家詢問和可信度。",
    summary:
      "很多人把網站上線當成結束，但對商家來說，上線後才是真正開始使用。維護是為了讓網站穩定、可更新、出問題有人處理。",
    takeaways: [
      "SSL、備份和監控是基本安全感。",
      "內容小修改會長期發生。",
      "維護方案要講清楚範圍。"
    ],
    sections: [
      {
        title: "網站會遇到日常問題",
        body:
          "營業時間變更、服務價格調整、照片更新、表單異常、主機通知、SSL 狀態，這些都不是一次性設計能完全處理的事。"
      },
      {
        title: "維護不是單純收月費",
        body:
          "好的維護方案應該說清楚包含哪些小修改、檢查頻率、備份方式、監控範圍和不包含的客製開發。"
      },
      {
        title: "商家不用自己變工程師",
        body:
          "小商家本來就應該專注服務客戶。網站技術細節由維護方處理，能降低很多營運摩擦。"
      }
    ],
    faq: [
      {
        question: "網站一定要月費維護嗎？",
        answer: "不一定，但如果商家希望有人處理主機、SSL、備份、監控和小修改，維護方案會比較省事。"
      },
      {
        question: "大改版算維護嗎？",
        answer: "通常不算。大幅改版、新頁面或新功能應另外估價。"
      }
    ]
  },
  {
    slug: "demo-is-not-template",
    date: "2026-06-08",
    category: "設計樣本",
    title: "Demo 不是模板，而是網站成交邏輯的樣本",
    description:
      "KJyang Studio 的 demo 用來展示不同產業的資訊架構、CTA、FAQ、服務內容和視覺方向，不是讓所有商家套同一個版。",
    summary:
      "真正有用的 demo 不只是看起來好看，而是讓客戶看到某個產業的網站可以怎麼安排內容、信任感和聯絡流程。",
    takeaways: [
      "Demo 用來對齊方向，不是直接套版。",
      "每個產業需要不同的資訊排序。",
      "正式網站應換成真實內容、品牌和服務資料。"
    ],
    sections: [
      {
        title: "不同產業的第一屏不該一樣",
        body:
          "冷氣服務要強調快速詢價和服務區域；牙醫診所要強調預約和信任；補習班要強調試聽和成果；室內設計要強調作品和諮詢流程。"
      },
      {
        title: "Demo 幫助客戶看懂設計能力",
        body:
          "很多客戶不會用抽象形容詞描述想要的風格。Demo 可以讓他指出喜歡哪種首屏、卡片、表單、FAQ 或整體氛圍。"
      },
      {
        title: "正式網站仍要重新整理內容",
        body:
          "店名、服務地區、價格、案例、照片、FAQ、LINE、地圖和營業時間都應該使用商家自己的真實資料。"
      }
    ],
    faq: [
      {
        question: "Demo 裡的店家是真的嗎？",
        answer: "不是。Demo 是網站設計樣本，不是真實營業店家。"
      },
      {
        question: "正式網站可以和 demo 不同嗎？",
        answer: "可以。Demo 只是對齊方向，正式網站會依商家品牌、素材和需求重新調整。"
      }
    ]
  }
];

export function getInsightPost(slug: string) {
  const post = insightPosts.find((item) => item.slug === slug);
  if (!post) {
    throw new Error(`Missing insight post: ${slug}`);
  }
  return post;
}

export function buildInsightSchemas(post: InsightPost) {
  const url = absoluteStudioUrl(`/studio/insights/${post.slug}`);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
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
      datePublished: post.date,
      dateModified: post.date
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
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
          name: "Insights",
          item: absoluteStudioUrl("/studio/insights")
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: url
        }
      ]
    }
  ];
}
