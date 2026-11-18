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
  // 以下是選填的「長版作品頁」欄位：有 sections 才會用新版區塊渲染（目前只有 synk-atelier）。
  // 標題區 category / genre / status 之間的第二個標籤，例如「Game」。
  genre?: string;
  // 標題區的按鈕，依序排列，第一顆是主要按鈕。有填就取代 github／caseStudy／demo 自動產生的按鈕。
  ctas?: { label: string; href: string }[];
  sections?: ProjectSection[];
  // 選填的截圖區（目前只有 synk-atelier）：接在 titleEn 等於 after 的主欄區塊後面。
  gallery?: ProjectGallery;
  // 取代模板自動產生的 CreativeWork；author 由模板補上全站的 #person。
  schema?: Record<string, unknown>[];
  // llms.txt 個人專案清單用的標題與說明；沒填就用 title／lead／status。
  discovery?: { title: string; text: string };
  // 選填的英文作品頁 /en/projects/<slug>（目前只有 synk-atelier）。不另外加一筆 projects，免得出現在 /projects 和 llms 清單。
  en?: ProjectEnglish;
}
// 英文頁的 sections 只用 titleEn 當標題（不顯示中英雙標題）；gallery.after 一樣對 titleEn。
export interface ProjectEnglish {
  searchTitle: string;
  metaDescription: string;
  label: string;
  tags: string[];
  ctas: { label: string; href: string }[];
  sections: ProjectSection[];
  gallery: ProjectGallery;
}
export type ProjectBlock =
  | { p: string }
  | { list: string[]; heading?: string }
  // 粗體標題＋說明的清單
  | { notes: Array<[string, string]> }
  // 一個決定：標題＋問題／選項／取捨／結果
  | { decision: { title: string; steps: Array<[string, string]> } };
export interface ProjectGallery {
  after: string;
  title: string;
  titleEn: string;
  note?: string;
  // src 是 public/ 底下的路徑；width / height 是圖檔的實際像素。
  items: Array<{ src: string; alt: string; caption: string; width: number; height: number }>;
}
export interface ProjectSection {
  title: string;
  titleEn: string;
  // intro：標題區；aside：CURRENT STATE 欄；outro：結尾聯絡；沒填：主欄
  place?: "intro" | "aside" | "outro";
  blocks: ProjectBlock[];
  cta?: { label: string; href: string };
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
    searchTitle: "SYNK ATELIER｜一個人做的 aespa 粉絲站與網頁卡牌遊戲",
    slug: "synk-atelier",
    description:
      "SYNK ATELIER 是我一個人做、一個人經營的 aespa 粉絲資訊站（非官方），裡面有一款網頁卡牌遊戲《KWANGYA 探索》。從規劃、程式、上線到每天看回饋改版都是我自己來，我帶著幾個 AI 代理分工施工，驗收一律用正式站的真實資料。",
    metaDescription:
      "楊凱捷（KJyang）一個人做、持續經營的非官方 aespa 粉絲資訊站與網頁卡牌遊戲《KWANGYA 探索》：伺服器驗證戰鬥、規則版本化、玩家回饋閉環，以及和 AI 代理分工的開發方式。",
    tags: ["React", "TypeScript", "Vite", "Node.js", "SQLite", "Firebase 登入", "PWA", "Cloudflare", "Mac mini 自架"],
    category: "Web",
    genre: "Game",
    tech: "React",
    status: "上線中、持續更新",
    lead: "一個人把一個粉絲的念頭，做成每天有人回來玩、每天都在更新的網站和遊戲。",
    flow: ["內容進後台待審", "核准後公開", "網頁遊戲《KWANGYA 探索》", "伺服器重算每一場戰鬥", "讀回饋、修好再上線"],
    build: [
      "資訊站：專輯與歌曲、應援練習、演唱會準備、行程月曆，時間一律換成台灣時間。所有內容先進後台待審，我核准了才公開；每一筆修改都有紀錄，可以還原。",
      "遊戲《KWANGYA 探索》：轉珠戰鬥、卡片收集、故事關、困難模式、每週重置的深淵塔與限時活動。每一場戰鬥都由伺服器重算，規則有版本號。",
      "遊戲裡有回饋按鈕。我會讀每一則，能重現的就修，修完再上線。",
      "我是產品負責人；主代理負責規劃與審核，子代理負責實作。",
    ],
    limits: [
      "非官方粉絲作品。",
      "新模式「訊號異常」即將推出。",
      "不儲值、不放廣告。",
    ],
    demo: "https://synk-atelier.kjyang0114.dev",
    caseStudy: "/studio/work/synk-atelier",
    image: null,
    ctas: [
      { label: "開啟網站", href: "https://synk-atelier.kjyang0114.dev" },
      { label: "玩 KWANGYA 探索", href: "https://synk-atelier.kjyang0114.dev/game" },
      { label: "完整案例", href: "/studio/work/synk-atelier" },
    ],
    gallery: {
      after: "What I built",
      title: "畫面",
      titleEn: "Screens",
      note: "手機直式畫面，2026 年 11 月拍攝；遊戲畫面用的是測試帳號。",
      items: [
        {
          src: "/projects/synk-atelier/site-home.webp",
          alt: "SYNK ATELIER 資訊站的手機首頁：上方是網站名稱與搜尋，中間是作品精選的專輯封面，最下面是首頁、行程、一起玩、歌曲、我的導覽列。",
          caption: "資訊站首頁：一打開就是作品精選。",
          width: 780,
          height: 1688,
        },
        {
          src: "/projects/synk-atelier/site-calendar.webp",
          alt: "行程頁的手機畫面：標題下寫著行程一律以台灣時間顯示，下面是依日期排列的行程卡片，每張有日期、星期與開始時間。",
          caption: "行程：時間一律換成台灣時間。",
          width: 780,
          height: 1688,
        },
        {
          src: "/projects/synk-atelier/game-lobby.webp",
          alt: "遊戲《KWANGYA 探索》的大廳：上方是資源與目前區域，右側是抽卡、隊伍、卡片、任務、圖鑑入口，中間是隊伍的四張卡，下方是地圖、困難模式、進化試煉與深淵塔。",
          caption: "遊戲大廳：隊伍、活動和挑戰入口都在這一頁。",
          width: 780,
          height: 1688,
        },
        {
          src: "/projects/synk-atelier/game-battle.webp",
          alt: "戰鬥畫面：上方是區域魔王和血條，中間是四張出戰的卡，下方 6×5 的珠盤上，一條粉紅色的線正連起六顆同色的珠。",
          caption: "轉珠戰鬥：拖曳連起同色珠，連到誰的顏色就由那張卡出手。",
          width: 780,
          height: 1688,
        },
        {
          src: "/projects/synk-atelier/game-zone-map.webp",
          alt: "區域地圖：第 6 區的 10 個關卡節點用虛線串起來，第 10 關是魔王，下方是關卡說明、星星條件與出發按鈕。",
          caption: "區域地圖：一張專輯一個區域，一區 10 關。",
          width: 780,
          height: 1688,
        },
        {
          src: "/projects/synk-atelier/game-card-pull.webp",
          alt: "抽卡結果：剛翻開一張標著 NEW 的 NINGNING 卡，下方是收下、再抽一次與去卡片看三個按鈕。",
          caption: "抽卡：撕開卡包，翻開卡面。",
          width: 780,
          height: 1688,
        },
        {
          src: "/projects/synk-atelier/game-card-growth.webp",
          alt: "卡片詳細頁：戰力、等級、星級三格，下面是升級按鈕、重置等級連結、進化試煉的進度條和升星。",
          caption: "卡片養成：升級、升星、進化試煉；升錯了可以重置。",
          width: 780,
          height: 1688,
        },
        {
          src: "/projects/synk-atelier/game-anniversary.webp",
          alt: "出道 6 週年活動頁：最上方是一張四人合照的橫版週年紀念卡，下面是活動期間每天登入領抽卡券的六天進度。",
          caption: "6 週年活動：四人合照做成 7:5 橫版卡，不切到人。",
          width: 780,
          height: 1688,
        },
      ],
    },
    sections: [
      {
        title: "一句話",
        titleEn: "In one line",
        place: "intro",
        blocks: [
          { p: "一個人把一個粉絲的念頭，做成每天有人回來玩、每天都在更新的網站和遊戲。" },
          { p: "SYNK ATELIER 是我自己做、自己經營的 aespa 粉絲資訊站，非官方粉絲作品。裡面有一款網頁卡牌遊戲《KWANGYA 探索》。" },
        ],
      },
      {
        title: "從什麼問題開始",
        titleEn: "Where it started",
        blocks: [
          { p: "aespa 的資訊散在 Threads、X 和各種網站，時間有韓國時間也有台灣時間。我想要一個打開就看得懂、不用登入、演唱會現場網路很差也打得開的地方。" },
          { p: "做完之後我發現，資訊站是「有事才來」。所以我又做了一款遊戲，給大家每天回來的理由。" },
        ],
      },
      {
        title: "我做了什麼",
        titleEn: "What I built",
        blocks: [
          {
            heading: "資訊站",
            list: [
              "專輯與歌曲、應援練習、演唱會準備、行程月曆，時間一律換成台灣時間。",
              "所有內容先進後台待審，我核准了才公開；每一筆修改都有紀錄，可以還原。",
              "用過一次之後可以離線看。",
              "2026 年 10 月，我把第一版前端整個刪掉，從零重建。舊的能跑，但改一個地方就會壞別的地方。",
            ],
          },
          {
            heading: "遊戲《KWANGYA 探索》",
            list: [
              "轉珠戰鬥：在 6×5 的盤面上拖曳連線，連到誰的顏色就由那張卡出手；四位成員的顏色都連過，就能放出四人一起的 SYNK。",
              "卡片收集：抽卡、升級、升星、進化試煉；升錯了可以「重置」，退回大部分花掉的資源。",
              "故事關：地圖就是作品年表，一張專輯一個區域，一區 10 關。區域照時間由伺服器自動開放，目前開到第 6 區。",
              "打完的人也有事做：困難模式、每週重置的深淵塔。",
              "活動：出道 6 週年活動、週年限定卡池，以及一張橫版週年紀念卡。照片有一條規則：裁切不能切到人。四人合照放進直式卡一定會切到兩側的人，所以我把它做成 7:5 的橫版卡；放不下橫版的小格子，改用四人頭像排成 2×2。",
              "新模式「訊號異常」即將推出。",
              "不儲值、不放廣告。",
            ],
          },
        ],
      },
      {
        title: "我怎麼做決定",
        titleEn: "How I decide",
        blocks: [
          {
            decision: {
              title: "1. 一關突然變太難：回退，但不改寫過去",
              steps: [
                ["問題", "我把第 3 區整體調難一點之後，3-10 這一關的勝率從大約一半掉到 15%。"],
                ["選項", "整區退回去；或只修這一關。"],
                ["取捨", "整區退回會讓其他剛調好的關又變太簡單。所以只給 3-10 一個抵銷係數，讓它回到改版前。"],
                ["結果", "每一場戰鬥都由伺服器重算，規則有版本號。新規則只用在新開始的戰鬥；舊規則下打的戰鬥照舊規則驗證。我把改版前錄下的 36 場和正式站最近 400 場舊版戰鬥拿到新引擎重播，結果完全一樣。"],
              ],
            },
          },
          {
            decision: {
              title: "2. 反作弊：寧可漏抓，不要冤枉",
              steps: [
                ["問題", "遊戲公開前我做了反作弊，但只是「記錄＋標記」，不自動處罰。公開之後，被標記的幾乎都是很認真玩的人。"],
                ["選項", "維持嚴格門檻；或照真實玩法重新校正。"],
                ["取捨", "「玩很多場」本身不是作弊。我改成只標可能真的作弊的情況：重播對不上、重複領獎、伺服器沒發過的資源、人做不到的速度。"],
                ["結果", "門檻依正式站的真實紀錄重訂，後台多了「批次標記誤判」。上線前我也用 6 個模擬玩家的 bot 透過真的 API 玩了 30 天，誤判是 0。"],
              ],
            },
          },
          {
            decision: {
              title: "3. Threads 裡打開的人，存檔帶不出去",
              steps: [
                ["問題", "不少玩家是在 Threads 的內建瀏覽器裡點開遊戲。在那裡登入很難，跳到 Safari 時試玩紀錄又帶不過去，整局白玩。"],
                ["選項", "把憑證放在網址裡；讓伺服器自動配對同一支手機；給一組接續碼。"],
                ["取捨", "網址帶不過去（實測）；自動配對遇到 iCloud 私密轉送就對不上，而我不想放寬條件——寧可接不上，也不能接錯人。"],
                ["結果", "三種做法都保留，各管一種情況。接續碼變成主要路線之一：4 位數、20 分鐘有效、用一次就刪。"],
              ],
            },
          },
        ],
      },
      {
        title: "玩家回饋怎麼變成更新",
        titleEn: "From feedback to update",
        blocks: [
          { p: "遊戲裡有回饋按鈕。我會讀每一則，能重現的就修，修完再上線。" },
          {
            notes: [
              ["深淵塔打完回不去上一頁", "有玩家回報打完塔按返回沒反應，重新整理也一樣。原因是每打一場就多留一筆歷史紀錄。修好後補了一個測試，舊程式會失敗、新程式會過。"],
              ["標錯成員的雙人照", "有玩家發現某張個人卡的照片其實是另外兩位成員。我把規則寫死：看得到兩個人以上的照片，不能當個人卡。一共撤下 12 張，持有的人換成同成員、同稀有度的卡（先在正式站複本上模擬過，確認沒有人被換成較低稀有度）。"],
              ["盤面看起來沒得連", "有玩家回報打到一半沒有珠可以連。我把那一局在本機重播，發現其實還剩一組，只是很難看到。所以做了兩件事：盤面很緊的時候提示提早出現；重洗時保證新盤面一定有能連的組合。"],
            ],
          },
          { p: "不只看回饋，也看數據。例如我發現「光能夠了，可以去升級卡片」這個提示，幾乎所有新玩家都是在還沒辦法打開卡片頁的選陣營畫面看到的，等於沒看到。修正會在下一次更新推出：提示等新存檔建好、真的能去升級時才出現。" },
        ],
      },
      {
        title: "我怎麼跟 AI 代理一起工作",
        titleEn: "Working with AI agents",
        blocks: [
          { p: "我是產品負責人：決定做什麼、不做什麼，最後由我試玩、點頭。" },
          {
            list: [
              "主代理負責規劃、拆任務、寫清楚的施工說明，最後審核結果。",
              "子代理負責實作，同時最多 3 個，各自只動自己的檔案。",
              "大方向的規劃另外交給更強的模型，計畫再請另一個模型審一次。",
              "遊戲照片由一個專門的代理照我訂的挑選標準審核。",
              "每個決定都寫回規劃文件，下一個代理從文件接手，不靠聊天記憶。",
            ],
          },
          { p: "驗收靠真實環境，不靠假資料。本機測試用的是正式站資料庫的唯讀複本加上真的卡面照片，不用示範資料。更新不打擾正在玩的人：非緊急的更新留到凌晨一次推上去。" },
        ],
      },
      {
        title: "目前狀態",
        titleEn: "Now",
        place: "aside",
        blocks: [
          {
            list: [
              "資訊站：上線中。",
              "遊戲：2026-11-14 公開，之後幾乎每天更新；目前開放 6 個區域，規劃共 16 個。",
              "即將推出：新模式「訊號異常」。",
            ],
          },
        ],
      },
      {
        title: "一起做點什麼",
        titleEn: "Let's talk",
        place: "outro",
        blocks: [
          { p: "如果你在做社群、粉絲或需要「每天有人回來」的產品，想找人一起想、一起做，來找我聊聊。" },
        ],
        cta: { label: "聯絡我", href: "/contact" },
      },
    ],
    schema: [
      {
        "@type": "CreativeWork",
        "@id": "https://kjyang0114.dev/projects/synk-atelier#work",
        name: "SYNK ATELIER",
        url: "https://kjyang0114.dev/projects/synk-atelier",
        description: "楊凱捷一個人做、持續經營的非官方 aespa 粉絲資訊站與網頁卡牌遊戲。",
        inLanguage: "zh-Hant-TW",
        dateCreated: "2026-09-30",
        creativeWorkStatus: "Published",
        keywords: "粉絲網站, 網頁遊戲, 轉珠, 卡牌收集, React, Node.js, SQLite, PWA",
        hasPart: { "@id": "https://synk-atelier.kjyang0114.dev/game#app" },
        sameAs: "https://synk-atelier.kjyang0114.dev",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://synk-atelier.kjyang0114.dev/game#app",
        name: "KWANGYA 探索",
        url: "https://synk-atelier.kjyang0114.dev/game",
        applicationCategory: "GameApplication",
        applicationSubCategory: "Puzzle, Card collecting",
        operatingSystem: "Web browser (iOS, Android, desktop)",
        inLanguage: "zh-Hant-TW",
        datePublished: "2026-11-14",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
        description: "非官方粉絲製作的網頁卡牌遊戲：轉珠戰鬥、卡片收集與進化、故事區域、深淵塔與限時活動。不儲值、不放廣告。",
      },
    ],
    discovery: {
      title: "SYNK ATELIER｜一個人做的 aespa 粉絲站與網頁卡牌遊戲",
      text: "楊凱捷自己做、自己經營的非官方 aespa 粉絲資訊站，與網頁卡牌遊戲《KWANGYA 探索》（轉珠戰鬥、卡片收集、深淵塔、限時活動，2026-11 公開、持續更新）。寫了伺服器驗證戰鬥與規則版本化、反作弊怎麼避免誤判、玩家回饋怎麼變成更新，以及他怎麼和 AI 代理分工開發。",
    },
    en: {
      searchTitle: "SYNK ATELIER — fan site and web card game by KJyang",
      metaDescription:
        "An unofficial aespa fan site and web card game built and run solo by Kai-Jie Yang (KJyang): server-verified battles, versioned rules, a daily feedback loop and AI-agent-assisted development.",
      label: "Web / Game",
      tags: ["React", "TypeScript", "Node.js", "SQLite", "Firebase Auth", "PWA", "self-hosted"],
      ctas: [
        { label: "Open the site", href: "https://synk-atelier.kjyang0114.dev" },
        { label: "Play KWANGYA 探索", href: "https://synk-atelier.kjyang0114.dev/game" },
        { label: "Full case study (in Chinese)", href: "/studio/work/synk-atelier" },
      ],
      gallery: {
        after: "What I built",
        title: "Screens",
        titleEn: "Screens",
        note: "Portrait phone screens, captured in November 2026; the game screens use a test account.",
        items: [
          {
            src: "/projects/synk-atelier/site-home.webp",
            alt: "The SYNK ATELIER fan site's home page on a phone: the site name and search at the top, featured album covers in the middle, and a bottom navigation bar with Home, Schedule, Play, Songs and Me.",
            caption: "Site home: featured releases as soon as it opens.",
            width: 780,
            height: 1688,
          },
          {
            src: "/projects/synk-atelier/site-calendar.webp",
            alt: "The schedule page on a phone: a note under the title says all times are shown in Taiwan time, followed by event cards listed by date, each with the date, weekday and start time.",
            caption: "Schedule: every time converted to Taiwan time.",
            width: 780,
            height: 1688,
          },
          {
            src: "/projects/synk-atelier/game-lobby.webp",
            alt: "The lobby of the game KWANGYA 探索: resources and the current zone at the top, entries for card pulls, team, cards, missions and collection on the right, the team's four cards in the middle, and the map, hard mode, evolution trial and tower below.",
            caption: "Game lobby: team, events and challenges all on one screen.",
            width: 780,
            height: 1688,
          },
          {
            src: "/projects/synk-atelier/game-battle.webp",
            alt: "A battle screen: the zone boss and its health bar at the top, four battle cards in the middle, and below them a bead board where a pink line is linking beads of the same colour.",
            caption: "Match-and-link battle: drag to link same-colour beads; the card whose colour you link attacks.",
            width: 780,
            height: 1688,
          },
          {
            src: "/projects/synk-atelier/game-zone-map.webp",
            alt: "A zone map: the zone's stage nodes joined by a dotted line, with the boss on the last stage, and the stage details, star conditions and a start button below.",
            caption: "Zone map: one album per zone.",
            width: 780,
            height: 1688,
          },
          {
            src: "/projects/synk-atelier/game-card-pull.webp",
            alt: "A card pull result: a NINGNING card marked NEW has just been revealed, with buttons below to keep it, pull again or go to cards.",
            caption: "Card pull: tear open the pack, reveal the card.",
            width: 780,
            height: 1688,
          },
          {
            src: "/projects/synk-atelier/game-card-growth.webp",
            alt: "A card detail page: power, level and star rank in three boxes, with a level-up button, a reset-level link, an evolution trial progress bar and star-up below.",
            caption: "Card growth: level up, star up, evolution trial; a wrong upgrade can be reset.",
            width: 780,
            height: 1688,
          },
          {
            src: "/projects/synk-atelier/game-anniversary.webp",
            alt: "The 6th-anniversary event page: a landscape anniversary card with a group photo of all four members at the top, and below it the day-by-day progress for claiming a card-pull ticket by logging in during the event.",
            caption: "6th-anniversary event: the four-member group photo as a 7:5 landscape card, so no one is cropped.",
            width: 780,
            height: 1688,
          },
        ],
      },
      sections: [
        {
          title: "SYNK ATELIER",
          titleEn: "",
          place: "intro",
          blocks: [
            { p: "A fan site and a web card game, built and run by one person." },
            { p: "Unofficial fan project for aespa." },
          ],
        },
        {
          title: "Where it started",
          titleEn: "Where it started",
          blocks: [
            { p: "aespa news was scattered across apps and time zones. I wanted one place that opens fast, needs no login, and still works offline at a concert. A news site is something you visit when you need it, so I added a game to give people a reason to come back every day." },
          ],
        },
        {
          title: "What I built",
          titleEn: "What I built",
          blocks: [
            {
              notes: [
                ["The site", "albums, cheer practice, concert prep and a calendar in Taiwan time. Every entry goes through review before it is public, and every edit can be rolled back. In October 2026 I deleted the first frontend and rebuilt it from scratch."],
                ["The game, KWANGYA 探索 (KWANGYA)", "a match-and-link puzzle battle, card collecting with levels, evolution and a card reset, story zones that open on a server clock, hard mode, a weekly tower, and a 6th-anniversary event with a landscape card and a limited pool. A new mode, 訊號異常, is coming soon. Card photos follow one rule: a crop never cuts a person, which is why the four-member anniversary card is a 7:5 landscape card. No payments, no ads."],
              ],
            },
          ],
        },
        {
          title: "How I decide",
          titleEn: "How I decide",
          blocks: [
            {
              notes: [
                ["One stage got too hard", "After a zone-wide tune, stage 3-10's win rate fell from about half to 15%. I gave that stage its own counter-factor. Rules are versioned: old battles still verify under old rules. I replayed 36 recorded battles and 400 live battles on the new engine, and the results matched."],
                ["Anti-cheat that doesn't punish dedication", "Flags only mark accounts, never punish them. After launch the flags mostly hit heavy players, so I re-tuned on real play to catch only what looks like real cheating, and added a bulk \"false positive\" action. A month of bot play before launch produced zero flags."],
                ["Saves lost in in-app browsers", "Opening the game from the Threads in-app browser and moving to Safari lost the trial save. URL tokens didn't survive and automatic matching failed behind iCloud Private Relay. I added a short one-time continue code rather than loosen matching. I would rather miss a match than hand a save to the wrong person."],
              ],
            },
          ],
        },
        {
          title: "Feedback loop",
          titleEn: "Feedback loop",
          blocks: [
            { p: "Every report from the in-game feedback button gets read; what I can reproduce, I fix. Examples: a back-button trap after tower battles, a solo card whose photo actually showed two other members (12 multi-person solo cards removed and replaced), and a \"no moves left\" report that led to an earlier hint and a smarter reshuffle." },
          ],
        },
        {
          title: "Working with AI agents",
          titleEn: "Working with AI agents",
          blocks: [
            { p: "I act as product owner. A main agent plans, writes briefs and reviews; sub-agents implement (three at most at a time); a stronger model drafts big plans and another reviews them. Every decision is written back to the planning doc. Testing runs on a read-only copy of production data, never demo data, and non-urgent updates ship in one batch overnight so players aren't interrupted." },
          ],
        },
        {
          title: "Contact",
          titleEn: "Contact",
          place: "outro",
          blocks: [],
          cta: { label: "Building a community or fan product? Let's talk.", href: "/contact" },
        },
      ],
    },
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
