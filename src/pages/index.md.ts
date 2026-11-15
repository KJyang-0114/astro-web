import { absoluteStudioUrl } from "@data/seo";
import { citableSummaryZh, linkList, realCaseLinks } from "@data/discovery";
import { projects } from "../data/projects";

export function GET() {
  return new Response(
    `---
title: kjyang0114.dev
---

# kjyang0114.dev

${citableSummaryZh.join("\n\n")}

## Personal site / 個人網站

- [首頁](https://kjyang0114.dev/): 楊凱捷 / KJyang 的個人網站。
- [關於](https://kjyang0114.dev/about): 學習方式、開發方式與經歷。
- [作品](https://kjyang0114.dev/projects): ${projects.length} 個專案，每個都寫了做法、限制與目前狀態。
- [履歷](https://kjyang0114.dev/resume): 軟體工程履歷（[English](https://kjyang0114.dev/en/resume)）。
- [AI 筆記](https://kjyang0114.dev/ai): AI 的基礎概念、能做什麼、限制與常見迷思。
- [Now](https://kjyang0114.dev/now): 近況與歌單。
- [歇一下](https://kjyang0114.dev/play): 可以拖曳的幾何線稿。
- [聯絡](https://kjyang0114.dev/contact): Discord、GitHub、Instagram。

## Projects / 作品

${projects.map((project) => `- [${project.title}](https://kjyang0114.dev/projects/${project.slug}): ${project.lead}（${project.status}）`).join("\n")}

## KJyang Studio

- [KJyang Studio](${absoluteStudioUrl("/studio")}): 小店網站與預約系統製作，一頁式 NT$18,000 起。
- [價格](${absoluteStudioUrl("/studio/pricing")})
- [作品](${absoluteStudioUrl("/studio/work")})

${linkList(realCaseLinks())}

## Machine-readable

- [llms.txt](https://kjyang0114.dev/llms.txt)
- [llms-full.txt](https://kjyang0114.dev/llms-full.txt)
- [Studio llms.txt](https://kjyang0114.dev/studio/llms.txt)
- [Web Highlighter Pro](https://kjyang0114.dev/web-highlighter-pro/): Local-first Chrome extension for webpage highlighting, notes, search, and export.
- [API catalog](https://kjyang0114.dev/.well-known/api-catalog)
- [Agent skills](https://kjyang0114.dev/.well-known/agent-skills/index.json)
`,
    {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
