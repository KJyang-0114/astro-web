export type DemoSlug =
  | "ac-service"
  | "dental-clinic"
  | "tutoring-center"
  | "interior-design";

type Item = {
  title: string;
  text: string;
};

export type Demo = {
  slug: DemoSlug;
  theme: "ac" | "dental" | "tutor" | "interior";
  businessName: string;
  industry: string;
  city: string;
  serviceArea: string;
  seoTitle: string;
  metaDescription: string;
  headline: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  phone: string;
  lineLabel: string;
  address: string;
  hours: string;
  mapLabel: string;
  heroImage: string;
  supportImage: string;
  trust: string[];
  services: Item[];
  process: Item[];
  proofTitle: string;
  proof: Item[];
  pricingTitle: string;
  pricing: Item[];
  faq: Item[];
  schemaType: string;
};

export const demos: Demo[] = [
  {
    slug: "ac-service",
    theme: "ac",
    businessName: "安峰冷氣工程",
    industry: "冷氣安裝與清洗",
    city: "台北",
    serviceArea: "台北市、新北市板橋與中和",
    seoTitle: "台北冷氣安裝清洗與維修 | 安峰冷氣工程",
    metaDescription:
      "安峰冷氣工程提供台北與新北冷氣安裝、分離式冷氣清洗、維修檢查與快速 LINE 報價。",
    headline: "台北冷氣服務，今天快速報價",
    subhead: "拍照傳 LINE，師傅確認機型、現場條件與最快可施工時間。",
    primaryCta: "今天用 LINE 取得報價",
    secondaryCta: "查看聯絡方式",
    phone: "02-2788-4521",
    lineLabel: "@anfeng-ac",
    address: "台北市松山區八德路四段 312 號",
    hours: "週一至週六 09:00-20:00",
    mapLabel: "查看服務範圍",
    heroImage: "/studio-assets/ac-living.webp",
    supportImage: "/studio-assets/ac-living.webp",
    trust: ["到府前先確認費用區間", "支援大金、日立、國際、三菱", "安裝後保固條件寫清楚"],
    services: [
      { title: "分離式冷氣安裝", text: "評估室內外機位置、排水、銅管與電源，減少後續漏水與噪音問題。" },
      { title: "冷氣深層清洗", text: "拆洗濾網、風鼓與排水盤，適合有霉味、風量變小或長期未保養的機器。" },
      { title: "冷氣維修檢查", text: "檢查不冷、漏水、異音、跳電與遙控異常，先報價再施工。" },
      { title: "搬家移機與汰換", text: "協助拆機、移機、新機汰換與舊機處理，讓施工排程一次完成。" }
    ],
    process: [
      { title: "傳照片", text: "用 LINE 傳室內機、室外機、管線與電源位置照片。" },
      { title: "估價確認", text: "回覆施工方式、價格區間、可預約時段與需要注意的現場條件。" },
      { title: "到府施工", text: "師傅依約到場，施工前再次確認費用與保固內容。" },
      { title: "完工測試", text: "測試冷房、排水、固定與噪音，並說明保養建議。" }
    ],
    proofTitle: "適合急著排施工的人",
    proof: [
      { title: "快速排程", text: "旺季保留部分短期時段給安裝與漏水維修案件。" },
      { title: "透明加價", text: "高樓、特殊架台、拉長管線等加價項目會先說明。" },
      { title: "清楚保固", text: "安裝與材料保固依項目列出，避免完工後才產生爭議。" }
    ],
    pricingTitle: "常見價格參考",
    pricing: [
      { title: "冷氣清洗", text: "分離式室內機 NT$1,800 起，依髒污與機型調整。" },
      { title: "標準安裝", text: "依坪數、銅管長度、架台與排水位置現場確認。" },
      { title: "維修檢查", text: "基本檢測費可折抵部分維修工資，特殊零件另報價。" }
    ],
    faq: [
      { title: "LINE 報價需要拍哪些照片？", text: "請拍室內機、室外機、電源、排水位置與室外施工空間，越完整越能先抓價格。" },
      { title: "冷氣清洗大約多久？", text: "一般分離式室內機約 60 到 90 分鐘，髒污嚴重或特殊機型會更久。" },
      { title: "安裝有保固嗎？", text: "安裝工資與材料依項目保固，完工前會說明範圍與期間。" },
      { title: "可以當天維修嗎？", text: "可先用 LINE 傳狀況，若當天有空檔會協助安排急件。" }
    ],
    schemaType: "HVACBusiness"
  },
  {
    slug: "dental-clinic",
    theme: "dental",
    businessName: "晴禾牙醫診所",
    industry: "家庭牙科與美學治療",
    city: "台中",
    serviceArea: "台中西區、南屯、北區",
    seoTitle: "台中西區牙醫預約 | 晴禾牙醫診所",
    metaDescription:
      "晴禾牙醫診所提供台中西區家庭牙科、洗牙、補牙、植牙諮詢與美學治療，線上預約初診。",
    headline: "台中西區溫和牙科，讓初診更安心",
    subhead: "看診前先了解流程、費用方向與醫師建議，降低不確定感。",
    primaryCta: "預約看診",
    secondaryCta: "查看診療項目",
    phone: "04-2320-9176",
    lineLabel: "@qinghe-dental",
    address: "台中市西區公益路 128 號 2 樓",
    hours: "週一至週六 10:00-21:00",
    mapLabel: "Google 地圖導航",
    heroImage: "/studio-assets/clinic-daylight.webp",
    supportImage: "/studio-assets/clinic-daylight.webp",
    trust: ["初診先檢查與說明", "清楚列出治療選項", "預約制降低候診時間"],
    services: [
      { title: "一般牙科", text: "洗牙、補牙、蛀牙檢查、牙周評估與日常口腔照護建議。" },
      { title: "假牙與植牙諮詢", text: "依口腔狀況、預算與使用需求討論合適治療方式。" },
      { title: "牙齒美白", text: "評估齒色、敏感狀況與期待效果，提供安全的美白規劃。" },
      { title: "兒童牙科", text: "用清楚步驟與溫和節奏協助孩子建立看牙習慣。" }
    ],
    process: [
      { title: "填寫初診資料", text: "預約時留下症狀、希望時段與是否有過敏或慢性病史。" },
      { title: "口腔檢查", text: "醫師檢查牙齒、牙周與咬合，必要時安排 X 光。" },
      { title: "說明治療選項", text: "依急迫性、費用與療程長度討論優先順序。" },
      { title: "安排下次療程", text: "櫃台協助確認時間、注意事項與付款方式。" }
    ],
    proofTitle: "診所環境與團隊",
    proof: [
      { title: "明亮診間", text: "診療區保留清楚動線，讓陪同家人也能安心等待。" },
      { title: "固定醫師追蹤", text: "複診盡量由同一位醫師掌握治療進度。" },
      { title: "治療前說明", text: "先說明可選方案、常見風險與術後照護。" }
    ],
    pricingTitle: "初診可先討論",
    pricing: [
      { title: "健保項目", text: "洗牙、補牙等依健保規範與現場檢查判定。" },
      { title: "自費治療", text: "植牙、假牙、美白等項目會提供完整估價單。" },
      { title: "分段安排", text: "可依急迫程度和預算分階段治療。" }
    ],
    faq: [
      { title: "第一次看診需要多久？", text: "初診通常需 40 到 60 分鐘，包含資料填寫、檢查與醫師說明。" },
      { title: "可以直接預約洗牙嗎？", text: "可以，櫃台會先確認可預約時段，現場仍由醫師評估口腔狀況。" },
      { title: "植牙諮詢需要帶資料嗎？", text: "若有過往 X 光或治療資料可一起帶來，方便醫師判斷。" },
      { title: "診所有停車嗎？", text: "附近有收費停車場，預約確認時可請櫃台提供建議路線。" }
    ],
    schemaType: "Dentist"
  },
  {
    slug: "tutoring-center",
    theme: "tutor",
    businessName: "啟衡文理補習班",
    industry: "國中高中升學輔導",
    city: "新竹",
    serviceArea: "新竹東區、竹北、香山",
    seoTitle: "新竹國高中補習班試聽 | 啟衡文理補習班",
    metaDescription:
      "啟衡文理補習班提供新竹國中高中數學、英文、自然與會考學測輔導，可預約免費試聽課。",
    headline: "新竹國高中補習，先試聽再決定",
    subhead: "依年級、段考狀況與目標校系安排班型和讀書節奏。",
    primaryCta: "預約免費試聽",
    secondaryCta: "查看課程",
    phone: "03-572-8819",
    lineLabel: "@qiheng-study",
    address: "新竹市東區光復路二段 86 號",
    hours: "週一至週五 14:00-22:00，週六 09:00-18:00",
    mapLabel: "查看交通位置",
    heroImage: "/demo-assets/tutor-hero.png",
    supportImage: "/demo-assets/tutor-hero.png",
    trust: ["小班制追蹤", "段考前加強", "家長定期回報"],
    services: [
      { title: "國中會考班", text: "數學、英文、自然分科加強，搭配段考與會考複習進度。" },
      { title: "高中學測班", text: "依學校進度與目標科系安排題型訓練和模考檢討。" },
      { title: "英文文法閱讀", text: "從句型、閱讀到作文架構，補足長期弱點。" },
      { title: "一對一補強", text: "針對單科落差、轉學銜接或短期衝刺安排客製課。" }
    ],
    process: [
      { title: "學習診斷", text: "了解年級、學校、最近成績與孩子遇到的卡點。" },
      { title: "試聽安排", text: "依程度安排適合班級，讓孩子感受老師講法和節奏。" },
      { title: "課程建議", text: "試聽後回報觀察，建議班型、頻率與補強優先順序。" },
      { title: "追蹤回報", text: "段考前後整理學習狀況，讓家長掌握進度。" }
    ],
    proofTitle: "讓家長看得見進度",
    proof: [
      { title: "弱點整理", text: "每次考後標記題型弱點，下一輪課程優先補強。" },
      { title: "固定回報", text: "家長可收到出席、作業與測驗狀況，不只看段考結果。" },
      { title: "讀書節奏", text: "協助學生規劃平日複習與考前衝刺，不把壓力都堆到考前。" }
    ],
    pricingTitle: "課程安排",
    pricing: [
      { title: "國中小班", text: "依科目和年級安排，每班保留提問時間。" },
      { title: "高中分科", text: "數學、英文、自然可單科報名，也可組合排課。" },
      { title: "短期衝刺", text: "段考、會考、學測前提供重點題型複習。" }
    ],
    faq: [
      { title: "試聽需要費用嗎？", text: "第一次試聽免費，會依孩子程度安排合適班級。" },
      { title: "可以只補一科嗎？", text: "可以，建議先針對目前最影響成績或信心的科目開始。" },
      { title: "家長會收到回報嗎？", text: "會，老師會整理出席、作業、測驗與需要配合的地方。" },
      { title: "班級人數多少？", text: "多數班級採小班制，實際人數依年級與科目不同。" }
    ],
    schemaType: "EducationalOrganization"
  },
  {
    slug: "interior-design",
    theme: "interior",
    businessName: "岩序室內設計",
    industry: "住宅與商空設計",
    city: "高雄",
    serviceArea: "高雄、台南、屏東",
    seoTitle: "高雄室內設計諮詢 | 岩序室內設計",
    metaDescription:
      "岩序室內設計提供高雄住宅、老屋翻新、商空規劃與預算評估，可預約設計諮詢。",
    headline: "高雄室內設計，先談預算再動工",
    subhead: "從格局、收納、材質到工程順序，讓設計落地不是只看效果圖。",
    primaryCta: "預約設計諮詢",
    secondaryCta: "瀏覽作品方向",
    phone: "07-552-1938",
    lineLabel: "@rockline-space",
    address: "高雄市鼓山區美術東二路 221 號",
    hours: "週二至週六 10:00-19:00",
    mapLabel: "預約工作室洽談",
    heroImage: "/demo-assets/interior-hero.png",
    supportImage: "/demo-assets/interior-hero.png",
    trust: ["預算先行", "工程節點透明", "住宅與商空皆可規劃"],
    services: [
      { title: "新成屋規劃", text: "整合格局、收納、燈光與家具尺寸，讓新家入住節奏更順。" },
      { title: "老屋翻新", text: "先處理水電、結構與潮濕問題，再規劃風格與材質。" },
      { title: "商業空間", text: "依品牌動線、客席、展示與收銀需求安排坪效。" },
      { title: "局部改造", text: "針對廚房、玄關、收納或工作區做小範圍升級。" }
    ],
    process: [
      { title: "需求訪談", text: "了解家庭成員、生活習慣、收納需求、預算與時程。" },
      { title: "現場丈量", text: "確認格局限制、管線、採光、樑柱與可調整範圍。" },
      { title: "提案估算", text: "提供平面配置、風格方向、工程範圍與預算級距。" },
      { title: "工程管理", text: "依工種順序排程，協助追蹤現場進度與驗收。" }
    ],
    proofTitle: "作品方向",
    proof: [
      { title: "小宅收納", text: "用櫃體深度、門片比例與動線減少壓迫感。" },
      { title: "親子住宅", text: "把安全、清潔、收納和成長彈性放進設計。" },
      { title: "品牌商空", text: "讓門面、展示和動線服務同一個銷售目標。" }
    ],
    pricingTitle: "預算級距",
    pricing: [
      { title: "局部改造", text: "適合已有明確問題的空間，先聚焦一到兩個區域。" },
      { title: "全室設計", text: "依坪數、材質、櫃體量與工程複雜度估算。" },
      { title: "商空規劃", text: "依營業需求、品牌視覺、機電與法規條件報價。" }
    ],
    faq: [
      { title: "第一次諮詢要準備什麼？", text: "建議準備平面圖、現場照片、喜歡的風格參考和預算範圍。" },
      { title: "可以先估大概預算嗎？", text: "可以先依坪數和需求抓級距，精準報價需丈量和確認材料。" },
      { title: "老屋翻新最需要注意什麼？", text: "水電、漏水、結構和牆地狀況要先處理，再談風格和收納。" },
      { title: "可以只做設計不施工嗎？", text: "可依專案討論，若需要也能提供工程管理或施工協作建議。" }
    ],
    schemaType: "HomeAndConstructionBusiness"
  }
];

export function getDemo(slug: DemoSlug) {
  const demo = demos.find((item) => item.slug === slug);
  if (!demo) {
    throw new Error(`Missing demo: ${slug}`);
  }
  return demo;
}

export function buildSchemas(demo: Demo) {
  const url = `https://kjyang0114.dev/studio/demo/${demo.slug}`;
  const image = new URL(demo.heroImage, "https://kjyang0114.dev").toString();
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${demo.businessName} website design sample`,
      url,
      image,
      isPartOf: {
        "@type": "WebSite",
        name: "KJyang Studio",
        url: "https://kjyang0114.dev/studio"
      },
      about: {
        "@type": "CreativeWork",
        name: `${demo.industry} demo website`,
        description:
          "This page is a KJyang Studio website design sample only. It is not a real business website."
      },
      inLanguage: "zh-Hant",
      description: `${demo.metaDescription} This is demo content only and not a real business listing.`
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: demo.faq.map((item) => ({
        "@type": "Question",
        name: item.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.text
        }
      }))
    }
  ];
}
