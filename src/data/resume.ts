export const resumeProjects = [
  {
    name: "Sift",
    href: "/projects/sift",
    category: "Developer Tooling · Security · Go",
    description: "針對程式碼分析與安全檢查設計的開發者工具。",
    points: [
      "使用 deterministic analysis 優先處理可明確判斷的問題",
      "整合 Semgrep 進行靜態分析",
      "支援 SARIF 結果輸出",
      "使用 SQLite 保存分析資料",
      "可選擇性加入 LLM 分析，而非完全依賴生成式模型",
      "著重可驗證、可追蹤的分析流程",
    ],
    tech: "Go · Semgrep · SARIF · SQLite · LLM Integration",
  },
  {
    name: "Discord Problem-Solving Bot",
    href: "/projects/discord",
    category: "Backend · AI Integration · Automation",
    description: "以 Discord 作為主要操作介面的 AI 問題處理系統。",
    points: [
      "Discord 訊息與互動流程處理",
      "Mathpix OCR 整合",
      "LLM API 串接",
      "對話內容管理",
      "長訊息分段處理",
      "SQLite 資料保存",
      "多階段 processing pipeline",
    ],
    note: "此專案主要用於驗證 AI、OCR、Backend 與實際使用者互動之間的系統整合能力。",
  },
  {
    name: "Character Studio",
    href: "/projects/character",
    category: "Backend · Data Processing · FastAPI",
    description: "針對角色／對話資料處理設計的工具。",
    points: [
      "FastAPI API architecture",
      "Pydantic data validation",
      "Conversation format detection",
      "Structured data normalization",
      "Python backend development",
      "資料格式轉換與驗證流程",
    ],
    tech: "Python · FastAPI · Pydantic",
  },
  {
    name: "Personal Portfolio",
    href: "/projects/website",
    category: "Frontend · Web Engineering",
    description: "目前個人網站本身也是持續維護的工程專案。",
    points: [
      "Responsive layout",
      "Component-based architecture",
      "UI / UX implementation",
      "Animation and interaction",
      "Performance",
      "Maintainability",
      "SEO",
      "Accessibility",
      "Deployment readiness",
    ],
    note: "網站亦作為個人作品、技術能力、開源參與與工作經歷的集中展示平台。",
  },
];
export const skills = [
  {
    name: "Web",
    items: [
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Astro",
      "Responsive Web Design",
      "Component-based UI development",
      "API Integration",
    ],
  },
  {
    name: "Backend",
    items: [
      "Python",
      "FastAPI",
      "Node.js",
      "REST API",
      "SQLite",
      "Authentication / Token-based systems",
      "Data validation",
      "Backend integration",
    ],
  },
  {
    name: "Developer Tooling / Infrastructure",
    items: [
      "Go",
      "Linux",
      "Docker",
      "Git",
      "GitHub",
      "GitHub Actions",
      "CI/CD concepts",
      "Codebase refactoring",
      "Debugging",
      "Repository analysis",
    ],
  },
  {
    name: "AI / Machine Learning",
    items: [
      "LLM API integration",
      "AI-assisted development",
      "OCR pipelines",
      "PyTorch",
      "YOLO",
      "TensorRT",
      "Prompt / tool workflow integration",
    ],
  },
  {
    name: "Security",
    items: [
      "Static analysis",
      "Semgrep",
      "SARIF",
      "Authentication systems",
      "Security-oriented developer tooling",
      "AI agent security concepts",
    ],
  },
];
// Primary reflects recurring work; specialist tools remain Experience With.
// Keep the full original inventory and do not imply proficiency percentages.
const primarySkills = new Set([
  "JavaScript", "TypeScript", "HTML", "CSS", "Astro",
  "Responsive Web Design", "Component-based UI development", "API Integration",
  "Python", "FastAPI", "REST API", "SQLite", "Data validation", "Backend integration",
  "Git", "GitHub", "Codebase refactoring", "Debugging", "Repository analysis",
  "LLM API integration", "AI-assisted development", "OCR pipelines",
]);
export const skillLevels = [
  { name: "Primary", description: "目前主要投入、反覆用於專案開發與整合的技術。", primary: true },
  { name: "Experience With", description: "曾於特定專案、工具整合或研究中使用與接觸的技術。", primary: false },
].map(level => ({
  name: level.name,
  description: level.description,
  groups: skills.map(group => ({
    name: group.name,
    items: group.items.filter(item => primarySkills.has(item) === level.primary),
  })).filter(group => group.items.length > 0),
}));

export const experience = [
  "參與實際商業產品／專案開發，而非單純個人練習專案",
  "在完全遠端環境下進行軟體開發與協作",
  "根據實際需求進行功能實作、修改與問題排查",
  "處理需求變更、除錯、測試與交付",
  "在時程與實際使用需求限制下完成開發工作",
  "接觸商業專案中的保密、成本、需求與交付責任",
  "適應非同步溝通與遠端開發流程",
];
export const workflow = [
  "需求理解",
  "建立可執行版本",
  "檢查錯誤、資料與 UI 行為",
  "定位問題",
  "修改實作",
  "測試",
  "回歸驗證",
  "重構與整理",
];
export const aiUses = [
  "快速理解陌生 codebase",
  "搜尋可能的實作方式",
  "比較不同 architecture",
  "初始 implementation",
  "大型重構輔助",
  "文件與 codebase 分析",
];
export const evidence = [
  "Runtime behavior",
  "Tests",
  "Logs",
  "API responses",
  "UI behavior",
  "Source code review",
];
export const remote = [
  "Remote-first development",
  "Asynchronous communication",
  "Independent task execution",
  "Requirement-driven development",
  "Working without continuous supervision",
  "Code delivery under deadlines",
  "Remote debugging and iteration",
];
export const collaboration = [
  "Taiwan UTC+8",
  "Remote-first teams",
  "Async collaboration",
  "Scheduled online meetings",
  "Project-based delivery",
];
export const availability = [
  "Remote Software Engineering",
  "Part-time",
  "Contract",
  "Project-based work",
  "Internship",
  "Short-term development projects",
];
export const interests = [
  "Frontend Engineering",
  "Backend Engineering",
  "Full-stack Development",
  "Developer Tooling",
  "Internal Tools",
  "AI Integration",
  "Automation",
  "Codebase Refactoring",
  "Technical Prototyping",
  "Security-related Development",
];
