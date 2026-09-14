export type WorkCase = {
  slug: string;
  demoSlug: string;
  industry: string;
  title: string;
  eyebrow: string;
  description: string;
  problem: string;
  strategy: string;
  visualTone: string;
  ctaPlan: string;
  mobilePlan: string;
  seoPlan: string;
  demoUrl: string;
  stats: Array<[string, string]>;
  sections: Array<{
    title: string;
    body: string;
  }>;
  decisions: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const workCases: WorkCase[] = [
  {
    "slug": "interior-design",
    "demoSlug": "interior-design",
    "industry": "室內設計",
    "title": "岩序室內設計：讓空間成為敘事",
    "eyebrow": "CONCEPT STUDY / 2026",
    "description": "大幅空間照片、留白與宋體標題，先讓訪客感受氛圍，再閱讀服務與合作方式。此為虛構品牌的設計探索，並非實際客戶專案。",
    "problem": "空間圖片容易搶走所有注意力，需要讓服務與下一步同樣清楚。",
    "strategy": "以橫向大圖呈現空間，接續服務、流程與常見問題。",
    "visualTone": "大幅空間照片、留白與宋體標題，先讓訪客感受氛圍，再閱讀服務與合作方式。",
    "ctaPlan": "以頁內連結引導閱讀，需求表單只在本機產生摘要；委託網站設計另連到 Studio。",
    "mobilePlan": "手機改為單欄，保留完整標題、服務與表單；照片依容器調整比例。",
    "seoPlan": "範例設定 noindex，避免被誤認為真實店家；設計案例頁可被搜尋，說明設計思考與範圍。",
    "demoUrl": "/studio/demo/interior-design",
    "stats": [
      [
        "01",
        "概念網站"
      ],
      [
        "04",
        "閱讀段落"
      ],
      [
        "↗",
        "完整體驗"
      ]
    ],
    "sections": [
      {
        "title": "從訪客需要開始",
        "body": "空間圖片容易搶走所有注意力，需要讓服務與下一步同樣清楚。"
      },
      {
        "title": "畫面與內容一起安排",
        "body": "以橫向大圖呈現空間，接續服務、流程與常見問題。"
      },
      {
        "title": "把展示與真實委託分清楚",
        "body": "沒有放入虛構評價、實際營業地址或預約承諾。範例表單不傳送資料，網站委託由 Studio 聯絡頁承接。"
      }
    ],
    "decisions": [
      "大幅空間照片、留白與宋體標題，先讓訪客感受氛圍，再閱讀服務與合作方式。",
      "服務、流程、問答與需求整理都有獨立位置。",
      "照片為概念素材，不作為實際店家或施工紀錄。"
    ],
    "faq": [
      {
        "question": "這是真實客戶的網站嗎？",
        "answer": "不是。這是虛構品牌的完整設計範例，用來展示版面、內容安排與互動。"
      },
      {
        "question": "正式委託會直接套用這個版面嗎？",
        "answer": "先確認你的受眾、內容與功能，再討論適合的設計方向、範圍與費用。"
      }
    ]
  },
  {
    "slug": "dental-clinic",
    "demoSlug": "dental-clinic",
    "industry": "診所網站",
    "title": "晴禾牙醫：讓初診多一點安心",
    "eyebrow": "CONCEPT STUDY / 2026",
    "description": "柔和草木色、拱形空間照片與分段指引，讓閱讀節奏平靜而清楚。此為虛構品牌的設計探索，並非實際客戶專案。",
    "problem": "初次到訪的人需要先理解環境、服務與流程。",
    "strategy": "首屏說明初診感受，主入口直接帶到流程；診療項目和常見問題分開呈現。",
    "visualTone": "柔和草木色、拱形空間照片與分段指引，讓閱讀節奏平靜而清楚。",
    "ctaPlan": "以頁內連結引導閱讀，需求表單只在本機產生摘要；委託網站設計另連到 Studio。",
    "mobilePlan": "手機改為單欄，保留完整標題、服務與表單；照片依容器調整比例。",
    "seoPlan": "範例設定 noindex，避免被誤認為真實店家；設計案例頁可被搜尋，說明設計思考與範圍。",
    "demoUrl": "/studio/demo/dental-clinic",
    "stats": [
      [
        "01",
        "概念網站"
      ],
      [
        "04",
        "閱讀段落"
      ],
      [
        "↗",
        "完整體驗"
      ]
    ],
    "sections": [
      {
        "title": "從訪客需要開始",
        "body": "初次到訪的人需要先理解環境、服務與流程。"
      },
      {
        "title": "畫面與內容一起安排",
        "body": "首屏說明初診感受，主入口直接帶到流程；診療項目和常見問題分開呈現。"
      },
      {
        "title": "把展示與真實委託分清楚",
        "body": "沒有放入虛構評價、實際營業地址或預約承諾。範例表單不傳送資料，網站委託由 Studio 聯絡頁承接。"
      }
    ],
    "decisions": [
      "柔和草木色、拱形空間照片與分段指引，讓閱讀節奏平靜而清楚。",
      "服務、流程、問答與需求整理都有獨立位置。",
      "照片為概念素材，不作為實際店家或施工紀錄。"
    ],
    "faq": [
      {
        "question": "這是真實客戶的網站嗎？",
        "answer": "不是。這是虛構品牌的完整設計範例，用來展示版面、內容安排與互動。"
      },
      {
        "question": "正式委託會直接套用這個版面嗎？",
        "answer": "先確認你的受眾、內容與功能，再討論適合的設計方向、範圍與費用。"
      }
    ]
  },
  {
    "slug": "ac-service",
    "demoSlug": "ac-service",
    "industry": "冷氣服務",
    "title": "安峰冷氣：把舒適放回生活裡",
    "eyebrow": "CONCEPT STUDY / 2026",
    "description": "暖白、橄欖色與居家照片，搭配清楚的編號服務，兼顧生活感與資訊效率。此為虛構品牌的設計探索，並非實際客戶專案。",
    "problem": "安裝、清洗與維修的需求不同，訪客需要知道要準備哪些資料。",
    "strategy": "先展示居家場景，再整理服務與現場確認流程；需求表單提供本地摘要預覽。",
    "visualTone": "暖白、橄欖色與居家照片，搭配清楚的編號服務，兼顧生活感與資訊效率。",
    "ctaPlan": "以頁內連結引導閱讀，需求表單只在本機產生摘要；委託網站設計另連到 Studio。",
    "mobilePlan": "手機改為單欄，保留完整標題、服務與表單；照片依容器調整比例。",
    "seoPlan": "範例設定 noindex，避免被誤認為真實店家；設計案例頁可被搜尋，說明設計思考與範圍。",
    "demoUrl": "/studio/demo/ac-service",
    "stats": [
      [
        "01",
        "概念網站"
      ],
      [
        "04",
        "閱讀段落"
      ],
      [
        "↗",
        "完整體驗"
      ]
    ],
    "sections": [
      {
        "title": "從訪客需要開始",
        "body": "安裝、清洗與維修的需求不同，訪客需要知道要準備哪些資料。"
      },
      {
        "title": "畫面與內容一起安排",
        "body": "先展示居家場景，再整理服務與現場確認流程；需求表單提供本地摘要預覽。"
      },
      {
        "title": "把展示與真實委託分清楚",
        "body": "沒有放入虛構評價、實際營業地址或預約承諾。範例表單不傳送資料，網站委託由 Studio 聯絡頁承接。"
      }
    ],
    "decisions": [
      "暖白、橄欖色與居家照片，搭配清楚的編號服務，兼顧生活感與資訊效率。",
      "服務、流程、問答與需求整理都有獨立位置。",
      "照片為概念素材，不作為實際店家或施工紀錄。"
    ],
    "faq": [
      {
        "question": "這是真實客戶的網站嗎？",
        "answer": "不是。這是虛構品牌的完整設計範例，用來展示版面、內容安排與互動。"
      },
      {
        "question": "正式委託會直接套用這個版面嗎？",
        "answer": "先確認你的受眾、內容與功能，再討論適合的設計方向、範圍與費用。"
      }
    ]
  },
  {
    "slug": "tutoring-center",
    "demoSlug": "tutoring-center",
    "industry": "教育網站",
    "title": "學習空間：找到自己的節奏",
    "eyebrow": "CONCEPT STUDY / 2026",
    "description": "紙張色、輕微傾斜的照片與閱讀式段落，讓課程資訊少一點壓迫感。此為虛構品牌的設計探索，並非實際客戶專案。",
    "problem": "家長與學生需要先認識課程安排，再決定想詢問的方向。",
    "strategy": "將課程、了解需求的流程與問答依閱讀順序排列。",
    "visualTone": "紙張色、輕微傾斜的照片與閱讀式段落，讓課程資訊少一點壓迫感。",
    "ctaPlan": "以頁內連結引導閱讀，需求表單只在本機產生摘要；委託網站設計另連到 Studio。",
    "mobilePlan": "手機改為單欄，保留完整標題、服務與表單；照片依容器調整比例。",
    "seoPlan": "範例設定 noindex，避免被誤認為真實店家；設計案例頁可被搜尋，說明設計思考與範圍。",
    "demoUrl": "/studio/demo/tutoring-center",
    "stats": [
      [
        "01",
        "概念網站"
      ],
      [
        "04",
        "閱讀段落"
      ],
      [
        "↗",
        "完整體驗"
      ]
    ],
    "sections": [
      {
        "title": "從訪客需要開始",
        "body": "家長與學生需要先認識課程安排，再決定想詢問的方向。"
      },
      {
        "title": "畫面與內容一起安排",
        "body": "將課程、了解需求的流程與問答依閱讀順序排列。"
      },
      {
        "title": "把展示與真實委託分清楚",
        "body": "沒有放入虛構評價、實際營業地址或預約承諾。範例表單不傳送資料，網站委託由 Studio 聯絡頁承接。"
      }
    ],
    "decisions": [
      "紙張色、輕微傾斜的照片與閱讀式段落，讓課程資訊少一點壓迫感。",
      "服務、流程、問答與需求整理都有獨立位置。",
      "照片為概念素材，不作為實際店家或施工紀錄。"
    ],
    "faq": [
      {
        "question": "這是真實客戶的網站嗎？",
        "answer": "不是。這是虛構品牌的完整設計範例，用來展示版面、內容安排與互動。"
      },
      {
        "question": "正式委託會直接套用這個版面嗎？",
        "answer": "先確認你的受眾、內容與功能，再討論適合的設計方向、範圍與費用。"
      }
    ]
  }
];

export function getWorkCase(slug: string): WorkCase {
  const item = workCases.find(work => work.slug === slug);
  if (!item) throw new Error(`Unknown work case: ${slug}`);
  return item;
}
