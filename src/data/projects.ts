export interface Project {
  title: string;
  searchTitle: string;
  slug: string;
  description: string;
  tags: string[];
  category: string;
  tech: string;
  status: string;
  lead: string;
  flow: string[];
  build: string[];
  limits: string[];
  // 沒有公開原始碼的專案不填。
  github?: string;
  demo?: string;
  // KJyang Studio 裡對應的完整案例頁
  caseStudy?: string;
  // 只用在搜尋結果的說明；沒填就用 description。
  metaDescription?: string;
  image: string | null;
}
export const projects: Project[] = [
  {
    title: "Discord 解題機器人",
    searchTitle: "Discord 解題機器人｜Python、Mathpix OCR 與 AI 問答",
    description:
      "同學上傳老師題目圖片；Mathpix OCR 後交給 LLM 生成步驟，切分長回覆，並以 SQLite 保存追問上下文。數十名同學、約運行一年；不宣稱未量測答對率。",
    tags: ["Python", "discord.py", "LLM API", "圖片 OCR"],
    category: "AI",
    github: "https://github.com/KJyang-0114/discord-problem-solving-bot",
    slug: "discord",
    tech: "Python",
    status: "長期服務已結束，保留 Demo",
    lead: "讓同學從題目圖片開始，也能接續追問。",
    flow: ["題目圖片", "Mathpix OCR", "LLM 解題", "訊息切分", "SQLite 上下文"],
    build: [
      "串起 Discord、OCR 與模型回覆，處理長訊息切分與多輪上下文。",
      "曾提供數十名同學使用，運行約一年。",
    ],
    limits: [
      "沒有標準化評測集，無法用單一答對率代表品質。",
      "模型解答仍需要使用者核對；目前不提供長期服務。",
    ],
    image: "discord-problem-solving-bot-architecture.png",
  },
  {
    title: "Sift",
    searchTitle: "Sift｜Go 程式碼分析工具・Semgrep 與 SARIF",
    description:
      "Go 寫的 AI code scanner。以 Semgrep rules、package verification、選擇性 LLM 分析與 SARIF 把錯誤變成可重跑檢查。",
    tags: ["Go", "Semgrep", "SARIF", "SQLite"],
    category: "工具",
    github: "https://github.com/KJyang-0114/sift",
    slug: "sift",
    tech: "Go",
    status: "開源工具",
    lead: "把「可能有錯」變成可重跑的檢查。",
    flow: [
      "Semgrep 規則",
      "套件驗證",
      "可選 LLM 分析",
      "SARIF / JSON",
      "SQLite 歷史",
    ],
    build: [
      "以確定性規則先行，再用語意分析補充線索。",
      "整合並行檢查、終端輸出、機器可讀報告與歷史紀錄。",
    ],
    limits: [
      "LLM 分析需要額外設定 API key，並非所有流程都需要模型。",
      "規則與模型都可能誤判；報告是核對依據，不是正確性的保證。",
    ],
    image: "sift-architecture.png",
  },
  {
    title: "Simple-2048-RL",
    searchTitle: "Simple-2048-RL｜Python DQN 強化學習實驗",
    description:
      "DQN 強化學習訓練 AI 玩 2048。環境建置、神經網路、訓練 pipeline 全部從頭刻。想驗證強化學習在策略遊戲上到底能走多遠。",
    tags: ["Python", "DQN", "強化學習", "AI"],
    category: "AI",
    github: "https://github.com/KJyang-0114/Simple-2048-RL",
    slug: "rl",
    tech: "Python",
    status: "學習實驗",
    lead: "從遊戲狀態到策略，練習理解強化學習。",
    flow: ["16 維狀態", "4 種動作", "獎勵回饋", "Replay buffer", "DQN 更新"],
    build: [
      "實作 2048 環境、神經網路與訓練流程，使用 Pygame 呈現棋盤。",
      "以 log2 編碼、epsilon-greedy、MSE 與 Adam 理解訓練的各個環節。",
    ],
    limits: [
      "目前沒有 target network 或 Double DQN。",
      "尚未完成多個隨機種子的收斂曲線與基準比較，不以畫面代替訓練成效。",
    ],
    image: "Simple-2048-RL-learning-loop.png",
  },
  {
    title: "Website & Studio",
    searchTitle: "個人網站與 Studio｜Astro、TypeScript 與 Docker 部署",
    slug: "website",
    description:
      "個人作品、網站服務與內容整理，從 Astro 前端一路到部署與維護。",
    tags: ["Astro", "TypeScript", "Docker"],
    category: "Web",
    tech: "TypeScript",
    status: "個人網站",
    lead: "讓作品被理解，也讓服務更容易找到。",
    flow: ["內容與架構", "Astro / TypeScript", "響應式介面", "Docker / Mac mini"],
    build: [
      "以個人網站累積作品、分享學習與開發紀錄。",
      "將網站設計服務獨立成 Studio，整理價格、流程、Demo 與聯絡方式。",
    ],
    limits: ["Studio 示範網站屬於設計 Demo，不代表客戶實績。"],
    github: "https://github.com/KJyang-0114/astro-web",
    demo: "/studio",
    caseStudy: "/studio/work/kjyang-website",
    metaDescription:
      "楊凱捷（KJyang）的個人網站與接案頁 KJyang Studio：用 Astro 和 TypeScript 寫，Docker 部署在 Mac mini，推到 GitHub 後自動上線。放作品、履歷、AI 筆記，以及小店網站服務的價格與流程。",
    image: null,
  },
  {
    title: "SYNK ATELIER",
    searchTitle: "SYNK ATELIER｜aespa 粉絲資訊站與網頁卡牌遊戲",
    slug: "synk-atelier",
    description:
      "自己做、自己經營的 aespa 粉絲資訊站：專輯與歌曲、應援練習、演唱會準備、行程月曆。後來加了網頁卡牌遊戲 /game，有帳號、排行榜和後台數據報表。",
    tags: ["React", "Vite", "Node.js", "SQLite", "PWA"],
    category: "Web",
    tech: "React",
    status: "上線中",
    lead: "把散在各處的資訊整理在一起，再用遊戲給大家每天回來的理由。",
    flow: ["內容進後台待審", "核准後公開", "離線也能看", "網頁遊戲 /game", "每日數據報表"],
    build: [
      "所有內容先進後台的待審區，核准了才公開；每一筆修改都有紀錄，可以還原。",
      "用過一次之後可以離線看，演唱會現場網路差也打得開必帶清單。",
      "遊戲分數由伺服器計算，後台有每天的人數、留存和每一關的通過率，個資只留代碼。",
      "公開前用 6 種手機尺寸逐頁截圖檢查，找到並修掉 10 個問題。",
    ],
    limits: [
      "粉絲自己做的資訊站，不是官方網站。",
      "流量不大：上線後一天大約 8 到 20 個人，新訪客幾乎都從 Threads 來。",
    ],
    demo: "https://synk-atelier.kjyang0114.dev",
    caseStudy: "/studio/work/synk-atelier",
    image: null,
  },
  {
    title: "Weilspa 預約與排班系統",
    searchTitle: "Weilspa 預約與排班系統｜Next.js 與 PostgreSQL",
    slug: "weilspa",
    description:
      "Weilspa 有兩間門市、兩位美容師兼老闆，熟客原本都在 LINE 問時段，預約記在手機行事曆。我做了讓客人自己看時段、送出申請，店家確認後才成立的預約系統，加上給老闆用的手機後台。",
    tags: ["Next.js", "PostgreSQL", "LINE 登入", "PWA", "Docker"],
    category: "Web",
    tech: "Next.js",
    status: "系統完成，前台尚未公開",
    lead: "讓熟客自己看時段送出申請，老闆少回幾則 LINE。",
    flow: ["選門市、療程、美容師", "看可申請的時段", "送出申請", "店家確認", "老闆手機後台"],
    build: [
      "預約做成申請制：客人送出的是申請，店家確認後才算數，這是老闆自己要求的。",
      "兩位老闆用加到手機主畫面的後台處理申請，每天早上 8 點收到一則摘要。",
      "寫了匯入工具把舊行事曆搬進來；沒有結束時間的預約先抓 90 分鐘，標成待確認讓老闆核對。",
      "83 個自動測試檔，100 多次 commit。",
    ],
    limits: [
      "前台還沒公開：療程價目還沒定案，網址目前顯示「網站整理中」。",
      "頁面上不放真實的療程、價格與顧客資料。",
    ],
    caseStudy: "/studio/work/spa-booking-system",
    image: null,
  },
  {
    title: "Online Clipboard",
    searchTitle: "Online Clipboard｜React 與 Firebase 跨裝置剪貼簿",
    description:
      "跨裝置即時同步剪貼簿。不用登入，24 小時自動過期，支援三種語言（中/英/日）。A 手機複製，B 電腦貼上。",
    tags: ["React", "TypeScript", "Firebase", "i18n"],
    category: "工具",
    github: "https://github.com/KJyang-0114/online-clipboard",
    demo: "https://kjyang-0114.github.io/online-clipboard/",
    slug: "clipboard",
    tech: "TypeScript",
    status: "開源工具",
    lead: "讓手機與電腦之間的文字傳遞更直接。",
    flow: ["輸入文字", "即時同步", "跨裝置使用", "24 小時過期"],
    build: [
      "React、TypeScript 與 Firebase 的跨裝置剪貼簿。",
      "不需登入，支援中文、英文與日文。",
    ],
    limits: ["內容會在 24 小時後自動過期。請勿將它當作永久儲存空間。"],
    image: null,
  },
  {
    title: "Element Remover Pro",
    searchTitle: "Element Remover Pro｜移除網頁元素的 Chrome 擴充套件",
    description:
      "Chrome 擴充套件，點一下就能把網頁上不想看的元素刪掉。支援三種模式（單選/多選/相似），可撤銷重做，多語言介面。",
    tags: ["JavaScript", "CSS", "Chrome Extension", "多語言"],
    category: "工具",
    github: "https://github.com/KJyang-0114/element-remover-pro",
    slug: "element-remover",
    tech: "JavaScript",
    status: "瀏覽器擴充",
    lead: "讓網頁留下你想看的部分。",
    flow: ["單選 / 多選", "相似元素", "移除", "撤銷 / 重做"],
    build: ["提供三種元素選取模式。", "可撤銷重做，支援多語言介面。"],
    limits: ["修改作用於瀏覽中的頁面，不會改寫網站伺服器內容。"],
    image: null,
  },
  {
    title: "Character Studio",
    searchTitle: "Character Studio｜FastAPI 對話資料解析與格式轉換",
    description:
      "FastAPI 後端原型：偵測 LINE、Discord、JSON 與純文字對話，拆出 sender、role、timestamp 與統計。",
    tags: ["FastAPI", "Pydantic", "Parser", "Structured Data"],
    category: "AI",
    github: "https://github.com/KJyang-0114/character-studio",
    slug: "character",
    tech: "Python",
    status: "後端原型",
    lead: "把不同來源的對話整理成一致結構。",
    flow: ["LINE / Discord / JSON", "格式偵測", "解析對話", "欄位與統計"],
    build: [
      "使用 FastAPI 與 Pydantic 建立後端原型。",
      "整理 sender、role、timestamp 與對話統計。",
    ],
    limits: ["目前是後端原型，不是完成的角色對話產品。"],
    image: null,
  },
  {
    title: "Nyx-Core",
    searchTitle: "Nyx-Core｜YOLO 即時視覺衍生研究",
    description:
      "保留上游 commit history 的 YOLO 即時視覺衍生研究。README 明確列出 Passer1072/RookieAI_yolov8 來源與本人有限 diff。",
    tags: ["Python", "YOLO", "TensorRT", "AI"],
    category: "AI",
    github: "https://github.com/KJyang-0114/Nyx-Core",
    slug: "nyx",
    tech: "Python",
    status: "衍生研究",
    lead: "理解即時視覺，也記錄程式碼的來源。",
    flow: ["YOLO", "即時視覺", "衍生調整", "來源紀錄"],
    build: [
      "保留上游 commit history。",
      "README 列出 Passer1072/RookieAI_yolov8 來源與個人有限修改。",
    ],
    limits: ["屬於上游專案的衍生研究；既有能力與個人修改需分開閱讀。"],
    image: null,
  },
];
