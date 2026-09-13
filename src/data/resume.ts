const experience = [
  "參與教育與學習相關 Web 應用開發，串接前端介面、後端 API 與資料處理流程。",
  "依內部使用需求實作 Web 工具與操作流程，包含 AI 輔助簡報製作等應用。",
  "參與機器人教學相關工具開發，涵蓋模擬操作與程式碼生成流程。",
  "整合 AI 服務與應用功能，處理使用者輸入、資料傳遞與結果呈現。",
  "在完全遠端協作中完成新增功能、既有程式修改、問題排查與交付。",
];

export type ResumeLanguage = "zh-Hant" | "en";
type Project = { name: string; href: string; category: string; description: string; points: string[]; tech: string };
type Copy = {
  title: string; description: string; intro: string; open: string; available: string;
  print: string; noScript: string; index: string; language: string; tech: string;
  headings: string[]; employment: string; dates: string; role: string; nda: string;
  experience: string[]; projects: Project[]; openSource: string[];
  skills: { name: string; items: string[] }[];
  approach: string; workflow: string[]; remote: string; availability: string;
  formatsTitle: string; formats: string[]; interestsTitle: string; interests: string[];
  education: string; educationNote: string;
};
const projectBase = [
  { name: "Discord Problem-Solving Bot", href: "/projects/discord", category: "Backend · AI Integration · Automation", tech: "Python · discord.py · Mathpix · LLM APIs · SQLite" },
  { name: "Sift", href: "/projects/sift", category: "Developer Tooling · Security", tech: "Go · Semgrep · SARIF · SQLite · LLM Integration" },
  { name: "Character Studio", href: "/projects/character", category: "Backend · Data Processing", tech: "Python · FastAPI · Pydantic" },
  { name: "Personal Portfolio", href: "/projects/website", category: "Web Engineering · Deployment", tech: "Astro · TypeScript · Three.js · GitHub Actions · Docker" },
];
const skills = [
  { name: "Web", items: ["JavaScript / TypeScript", "React · Astro", "HTML / CSS · Tailwind CSS", "Responsive UI · API Integration"] },
  { name: "Backend & Data", items: ["Python · FastAPI · Pydantic", "Node.js · REST APIs", "SQL · PostgreSQL · SQLite", "Authentication · Data validation"] },
  { name: "Tooling & Deployment", items: ["Go · Git · GitHub", "Linux · Docker", "GitHub Actions", "Semgrep · SARIF · Static analysis"] },
  { name: "AI Integration", items: ["LLM APIs · OCR pipelines", "Context persistence · Workflow integration", "PyTorch · YOLO · TensorRT"] },
];
export const resumeCopy: Record<ResumeLanguage, Copy> = {
  "zh-Hant": {
    title: "KJyang — Software Engineer | 履歷",
    description: "KJyang 的軟體工程履歷：正式完全遠端任職經驗，教育科技與內部 Web 應用的全端開發、Backend 與 AI 整合。Taiwan UTC+8，尋找遠端合作，工時與合作形式可討論。",
    intro: "具備正式完全遠端任職經驗的軟體開發者。曾於雲書苑教育科技有限公司參與教育、學習與內部 Web 應用的全端開發，涵蓋前端介面、後端功能與 AI 服務整合；另持續開發開源工具與個人專案。",
    open: "以遠端為必要條件；工時、協作時段與合作形式可討論。",
    available: "開放合作", print: "列印／另存 PDF ↓", noScript: "可使用瀏覽器的列印功能，列印或另存 PDF。",
    index: "本頁內容", language: "履歷語言", tech: "核心技術",
    headings: ["工作經歷", "精選專案", "開源參與", "技術能力", "工程方法", "遠端協作", "合作形式", "教育背景", "聯絡連結"],
    employment: "正式任職 · Fully Remote", dates: "2026 年初",
    role: "主要負責教育科技與內部 Web 應用的全端開發，將需求轉為前端操作流程、後端功能與服務整合。",
    nda: "受 NDA 約束，僅列工作範圍，不公開內部產品名稱、架構與實作細節。", experience,
    projects: projectBase.map((base, i) => ({ ...base, ...[
      { description: "以 Discord 提供題目圖片辨識、解題回覆與追問功能，曾供數十名同學使用，運行約一年。", points: ["串接 Mathpix OCR 與 LLM API，將題目圖片轉為解題回覆。", "以 SQLite 保存對話上下文，支援後續追問；將長回覆分段以符合訊息限制。", "長期服務已結束，目前保留 Demo。"] },
      { description: "針對程式碼分析與安全檢查設計的開發者工具。", points: ["以確定性分析優先處理可明確判斷的問題，整合 Semgrep 靜態分析。", "輸出 SARIF 報告，使用 SQLite 保存掃描資料。", "提供選用的 LLM 分析，補充可追蹤的檢查流程。"] },
      { description: "處理角色與對話資料的後端原型。", points: ["以 FastAPI 提供 API，使用 Pydantic 驗證輸入資料。", "辨識對話格式、轉換並正規化結構化資料。"] },
      { description: "持續維護的個人網站，集中展示作品、工作經歷與工程筆記。", points: ["以 Astro 與 TypeScript 建構響應式介面，整合 Three.js 線稿互動與系統明暗模式。", "維護中英文履歷、列印版面、SEO 與可存取性。", "透過 GitHub Actions 同步至 Mac mini，執行 Docker 重建與重啟流程。"] },
    ][i] })),
    openSource: ["針對既有程式行為與文件一致性進行修改與 contribution。", "曾參與 highlight.js 相關開源 contribution。", "曾參與 AI Agent Security / EDR 相關開源專案。"],
    skills,
    approach: "以實際執行結果檢查實作，依問題使用日誌、API 回應、UI 行為與程式碼檢查定位錯誤。AI 用於理解程式、比較實作方式與輔助重構；驗證方式依專案而定。",
    workflow: ["理解需求", "建立可執行版本", "檢查行為與資料", "修正並回歸驗證"],
    remote: "曾在完全遠端環境中開發與交付，熟悉非同步溝通、需求釐清、獨立執行與遠端除錯。位於 Taiwan UTC+8，可事先安排線上會議。",
    availability: "目前在學，可安排時間進行遠端開發。合作前確認每週投入時數、固定會議時段與交付安排。",
    formatsTitle: "合作方式", formats: ["遠端軟體開發（必要條件）", "Part-time / Contract", "專案制／短期開發"],
    interestsTitle: "工作方向", interests: ["Full-stack / Backend", "AI Integration / Automation", "Developer Tooling / Internal Tools"],
    education: "鶯歌工商 — 資訊科", educationNote: "目前在學，預計 2027 年畢業。持續投入軟體工程、個人專案與開源參與。",
  },
  en: {
    title: "KJyang — Software Engineer | Resume",
    description: "Software engineer with fully remote employment experience in education technology, full-stack web applications, backend development, and AI integration. Based in Taiwan, UTC+8. Open to remote opportunities with hours and engagement terms to be discussed.",
    intro: "Software developer with fully remote employment experience. Worked on education, learning, and internal web applications at 雲書苑教育科技有限公司, spanning frontend interfaces, backend functionality, and AI service integration. Also builds open-source tools and personal projects.",
    open: "Remote work required. Hours, collaboration windows, and engagement terms are open for discussion.",
    available: "Open to opportunities", print: "Print / Save PDF ↓", noScript: "Use your browser’s Print command to print this resume or save it as a PDF.",
    index: "ON THIS PAGE", language: "Resume language", tech: "Core technologies",
    headings: ["Professional experience", "Selected projects", "Open source", "Technical skills", "Engineering approach", "Remote collaboration", "Availability", "Education", "Links"],
    employment: "Employment · Fully Remote", dates: "Early 2026",
    role: "Worked primarily on full-stack development for education technology and internal web applications, translating requirements into frontend workflows, backend functionality, and service integrations.",
    nda: "Work scope only. Internal product names, architecture, and implementation details are confidential under NDA.",
    experience: [
      "Developed education and learning web applications, connecting frontend interfaces with backend APIs and data processing workflows.",
      "Built web tools and workflows for internal requirements, including AI-assisted presentation tools.",
      "Contributed to robotics education tools covering simulation interfaces and code generation workflows.",
      "Integrated AI services into application workflows, handling user inputs, data transfer, and result presentation.",
      "Delivered new features, changes to existing code, and issue fixes through fully remote collaboration.",
    ],
    projects: projectBase.map((base, i) => ({ ...base, ...[
      { description: "A Discord interface for extracting questions from images, generating explanations, and handling follow-up questions. Used by dozens of students and operated for approximately one year.", points: ["Connected Mathpix OCR with LLM APIs to turn question images into responses.", "Stored conversation context in SQLite for follow-up questions and split long responses to fit message limits.", "The long-running service has ended; a demo remains available."] },
      { description: "A developer tool for code analysis and security checks.", points: ["Prioritizes deterministic checks and integrates Semgrep static analysis.", "Produces SARIF reports and stores scan data in SQLite.", "Offers optional LLM analysis alongside a traceable checking workflow."] },
      { description: "A backend prototype for processing character and conversation data.", points: ["Provides FastAPI endpoints with Pydantic input validation.", "Detects conversation formats and converts them into normalized structured data."] },
      { description: "An actively maintained portfolio bringing together projects, work experience, and engineering notes.", points: ["Built responsive interfaces with Astro and TypeScript, including Three.js wireframe interactions and system-based color themes.", "Maintains Chinese and English resumes, print layouts, SEO, and accessibility.", "Uses GitHub Actions to sync to a Mac mini and run the Docker rebuild and restart workflow."] },
    ][i] })),
    openSource: ["Contributed changes addressing consistency between existing code behavior and documentation.", "Participated in highlight.js open-source contributions.", "Participated in an open-source project related to AI agent security / EDR."],
    skills,
    approach: "Checks implementations against runtime behavior, using logs, API responses, UI behavior, and source review to investigate issues. Uses AI to understand code, compare approaches, and assist refactoring. Validation methods depend on the project.",
    workflow: ["Understand requirements", "Build a runnable version", "Inspect behavior and data", "Fix and verify regressions"],
    remote: "Experience developing and delivering in a fully remote environment, with asynchronous communication, requirement clarification, independent execution, and remote debugging. Based in Taiwan, UTC+8; online meetings can be arranged in advance.",
    availability: "Currently enrolled in school and able to schedule time for remote development. Weekly hours, recurring meetings, and delivery arrangements are agreed before an engagement.",
    formatsTitle: "Engagements", formats: ["Remote software development required", "Part-time / Contract", "Project-based / Short-term development"],
    interestsTitle: "Areas of work", interests: ["Full-stack / Backend", "AI Integration / Automation", "Developer Tooling / Internal Tools"],
    education: "鶯歌工商 — 資訊科", educationNote: "Vocational high school, information technology program. Currently enrolled; expected graduation in 2027. Ongoing work in software engineering, personal projects, and open source.",
  },
};
