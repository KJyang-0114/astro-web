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
    slug: "ac-service",
    demoSlug: "ac-service",
    industry: "冷氣服務",
    title: "冷氣服務網站：把急件詢價整理成清楚動線",
    eyebrow: "Service Dispatch / LINE Quote",
    description:
      "冷氣服務客戶通常想快速確認價格、品牌、區域和預約方式。這個 demo 把 LINE 照片詢價、服務類型、價格帶和流程放到容易決策的位置。",
    problem:
      "冷氣行網站常見問題是資訊散、手機版找不到 LINE、價格說明模糊，客戶要問之前還要自己判斷該提供什麼資料。",
    strategy:
      "首屏先放服務區域、LINE 報價、電話假按鈕和快速信任訊號，再用價格 guide、服務品牌、安裝流程和 FAQ 降低來回詢問。",
    visualTone: "高對比橘色行動感，像派工與報價系統，不做泛用家電模板。",
    ctaPlan: "首屏、價格、流程、FAQ 後都安排 LINE 詢價入口，桌機可掃 QR，手機走連結。",
    mobilePlan: "手機版保留 sticky CTA，服務、價格和 FAQ 改成單欄，避免客戶滑很久還找不到聯絡方式。",
    seoPlan: "title、description、服務區域、服務類型、FAQ 和 LocalBusiness schema 都圍繞冷氣安裝、清洗、維修與地區意圖。",
    demoUrl: "/studio/demo/ac-service",
    stats: [
      ["01", "LINE quote first"],
      ["04", "service intents"],
      ["08", "FAQ objections"]
    ],
    sections: [
      {
        title: "客戶意圖先拆開",
        body:
          "冷氣客戶不是只想看漂亮照片。安裝、清洗、維修、報價四種意圖要分清楚，首頁要直接讓訪客知道自己該點哪裡。"
      },
      {
        title: "報價前資料先提示",
        body:
          "LINE 詢價不只放按鈕，也要提醒可傳坪數、品牌、室內外機位置、照片和希望時間。這能減少商家來回問基本資料。"
      },
      {
        title: "價格不硬報死",
        body:
          "服務業價格常受現場狀況影響，所以 demo 用價格 guide 和影響因素呈現，不做不負責任的最低價承諾。"
      }
    ],
    decisions: [
      "把 LINE quote 放成主動線。",
      "價格區用範圍和影響因素，不用單一低價。",
      "服務區域放在首屏和 schema。",
      "FAQ 聚焦保固、清洗、安裝時間和現場狀況。"
    ],
    faq: [
      {
        question: "正式冷氣網站會直接套這個 demo 嗎？",
        answer: "不會。demo 用來展示資訊架構，正式網站會換成真實店名、服務區域、照片、品牌和價格規則。"
      },
      {
        question: "冷氣網站最重要的是什麼？",
        answer: "手機版 LINE 詢價、服務範圍、價格說明、施工流程和信任訊號。"
      }
    ]
  },
  {
    slug: "dental-clinic",
    demoSlug: "dental-clinic",
    industry: "牙醫診所",
    title: "牙醫診所網站：先建立安心感，再引導預約",
    eyebrow: "Clinic Trust / Appointment Flow",
    description:
      "牙醫網站不該像通用醫療模板。重點是醫師信任、療程理解、初診流程、營業時間、位置與預約入口。",
    problem:
      "診所網站如果只列療程名稱，病人很難判斷適不適合預約。缺醫師介紹、初診流程、環境與常見問題時，信任建立會不足。",
    strategy:
      "用乾淨明亮的版面呈現醫師、療程、初診流程、環境和位置，讓病人能快速理解預約前會發生什麼。",
    visualTone: "白色、藍綠、柔和留白，像可信任醫療空間，不做過度銷售感。",
    ctaPlan: "以預約為主 CTA，搭配電話與位置資訊；重點區塊後方都能回到預約。",
    mobilePlan: "手機版讓營業時間、預約、療程和地址優先，避免病人找不到實用資訊。",
    seoPlan: "治療項目、地區、診所資訊、FAQ、MedicalClinic / Dentist schema 共同支撐搜尋理解。",
    demoUrl: "/studio/demo/dental-clinic",
    stats: [
      ["01", "booking path"],
      ["06", "treatments"],
      ["03", "trust layers"]
    ],
    sections: [
      {
        title: "病人先看信任，不是只看療程",
        body:
          "牙醫網站要說明醫師、環境、流程和位置。療程名稱重要，但沒有信任感就很難讓新病人預約。"
      },
      {
        title: "初診流程降低不確定感",
        body:
          "第一次到診所的人通常會在意檢查、諮詢、治療安排和費用討論。流程寫清楚，可以降低預約前的不安。"
      },
      {
        title: "位置與時間必須好找",
        body:
          "診所是高度在地服務。地址、地圖、營業時間、停車或交通提示都應該比裝飾性內容更優先。"
      }
    ],
    decisions: [
      "療程卡片搭配簡短解釋。",
      "醫師與環境放在信任區。",
      "預約 CTA 不用過度強迫。",
      "FAQ 處理初診、保險、療程時間和預約。"
    ],
    faq: [
      {
        question: "牙醫 demo 可以改成其他診所嗎？",
        answer: "可以。架構可延伸到皮膚科、眼科、復健診所，但內容、法規和療程說法要另外確認。"
      },
      {
        question: "診所網站需要案例照嗎？",
        answer: "若使用真實案例，必須取得授權並注意醫療廣告限制。也可以用環境、醫師和流程建立信任。"
      }
    ]
  },
  {
    slug: "tutoring-center",
    demoSlug: "tutoring-center",
    industry: "補習班",
    title: "補習班網站：讓家長快速理解課程和試聽",
    eyebrow: "Education Funnel / Trial Class",
    description:
      "補習班網站要讓家長看到課程分級、老師信任、學生成果、時段與試聽流程，而不是只貼一張招生海報。",
    problem:
      "許多補習班只有 Facebook 或招生圖，家長很難系統化比較課程、年級、老師和試聽方式。",
    strategy:
      "用成果導向和清楚課程分類建立信任，再以試聽 CTA 收斂。內容重點放在家長會問的問題，而不是只喊口號。",
    visualTone: "明亮、有節奏、帶教育品牌感，避免幼稚或廉價補習傳單感。",
    ctaPlan: "主 CTA 是預約免費試聽，課程、老師、成果、FAQ 之後都回到試聽。",
    mobilePlan: "手機版優先顯示年級/科目、時段、試聽和 LINE，讓家長可直接轉傳或詢問。",
    seoPlan: "年級、科目、地區、試聽、家長 FAQ 和 EducationalOrganization schema 建立內容主題。",
    demoUrl: "/studio/demo/tutoring-center",
    stats: [
      ["01", "trial CTA"],
      ["05", "course groups"],
      ["07", "parent FAQ"]
    ],
    sections: [
      {
        title: "家長需要比較，而不是只被廣告推",
        body:
          "補習班網站要把課程、年級、師資、成果和時段整理好。家長能快速判斷適不適合，詢問品質也會更好。"
      },
      {
        title: "試聽動線要清楚",
        body:
          "試聽不是只放一句免費體驗。要說明適合對象、流程、需要準備什麼、如何確認時段，家長才願意留下資訊。"
      },
      {
        title: "成果要可信",
        body:
          "成果區不要亂造保證。可以呈現學習流程、家長回饋、學生進步方式和教學系統，但避免不負責任的升學承諾。"
      }
    ],
    decisions: [
      "以家長決策順序排版。",
      "課程按年級和科目拆分。",
      "試聽 CTA 做成主行動。",
      "FAQ 處理程度、時段、作業、家長溝通。"
    ],
    faq: [
      {
        question: "補習班網站一定要有成績榜單嗎？",
        answer: "不一定。若沒有完整授權或不想走榜單風格，可以用課程系統、試聽流程和家長 FAQ 建立信任。"
      },
      {
        question: "招生頁和正式網站差在哪？",
        answer: "招生頁偏短期活動，正式網站能長期整理課程、師資、成果、FAQ、地區搜尋和聯絡方式。"
      }
    ]
  },
  {
    slug: "interior-design",
    demoSlug: "interior-design",
    industry: "室內設計",
    title: "室內設計網站：作品、預算和諮詢流程要同時成立",
    eyebrow: "Portfolio / Consultation",
    description:
      "室內設計網站的價值不只在圖片。客戶需要看作品風格、理解預算、知道諮詢流程和交付方式，才敢開始聯絡。",
    problem:
      "室內設計網站容易只像作品牆。沒有預算說明、流程、服務邊界和初談準備，客戶看完好看照片仍不知道怎麼開始。",
    strategy:
      "用強視覺作品建立設計感，再用預算 guide、流程、FAQ 和表單把欣賞轉成諮詢。",
    visualTone: "高級編輯式排版、深色與米白對比、大片留白和作品視覺，展示設計能力。",
    ctaPlan: "主 CTA 是預約設計諮詢，表單要求平面圖、預算、空間類型和時程。",
    mobilePlan: "手機版作品與表單分段，避免大圖壓縮文字；預算與流程保持清楚可掃描。",
    seoPlan: "作品類型、服務地區、預算 FAQ、InteriorDesignService schema 和 case study 內容一起建立主題。",
    demoUrl: "/studio/demo/interior-design",
    stats: [
      ["01", "portfolio first"],
      ["03", "budget signals"],
      ["04", "consult steps"]
    ],
    sections: [
      {
        title: "美感只是入口，不是全部",
        body:
          "室內設計客戶會先看作品，但真正聯絡前還會在意預算、流程、工期、設計與施工範圍。網站要把這些疑慮接住。"
      },
      {
        title: "預算說明是篩選工具",
        body:
          "不需要把所有價格寫死，但要讓客戶知道初步預算怎麼談、哪些因素會影響估價，避免大量不適合的詢問。"
      },
      {
        title: "諮詢表單要有價值",
        body:
          "室內設計表單不應只問姓名電話。空間類型、坪數、預算、時程和平面圖都能幫助設計方快速判斷需求。"
      }
    ],
    decisions: [
      "用 portfolio 做第一視覺。",
      "預算和流程放在轉換前。",
      "FAQ 處理設計費、施工、老屋、平面圖。",
      "表單引導客戶先整理資料。"
    ],
    faq: [
      {
        question: "室內設計網站最需要真實照片嗎？",
        answer: "正式網站最好使用真實作品或授權圖。demo 可用樣本視覺展示方向，但不能假裝是真實案例。"
      },
      {
        question: "只做作品集夠嗎？",
        answer: "若目標是接案，作品集不夠。還需要服務範圍、預算說明、流程、FAQ 和諮詢 CTA。"
      }
    ]
  }
];

export function getWorkCase(slug: string) {
  const item = workCases.find((work) => work.slug === slug);
  if (!item) {
    throw new Error(`Missing work case: ${slug}`);
  }
  return item;
}
