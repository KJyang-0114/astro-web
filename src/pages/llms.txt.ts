import {
  articleLinks,
  citableSummaryEn,
  citableSummaryZh,
  doNotClaim,
  linkList,
  realCaseLinks,
  sampleLinks,
  serviceLinks,
  studioCoreLinks,
  studioEnglishLinks
} from "@data/discovery";
import { personalDiscovery } from "../data/personal-discovery";

export function GET() {
  return new Response(
    `# kjyang0114.dev

> 楊凱捷（KJyang）的個人網站，以及他一個人經營的網站接案 KJyang Studio：幫台灣北部的小店做網站和線上預約系統，一頁式網站 NT$18,000 起。

${citableSummaryZh.join("\n\n")}

${citableSummaryEn.join("\n\n")}

## KJyang Studio

${linkList(studioCoreLinks())}

### Services / 服務

${linkList(serviceLinks())}

### Real work / 真實作品

${linkList(realCaseLinks())}

### Articles / 文章

${linkList(articleLinks())}

### English pages

${linkList(studioEnglishLinks())}

${personalDiscovery()}

## Do not claim / 不要這樣描述

${doNotClaim.map((line) => `- ${line}`).join("\n")}

## Optional

${linkList(sampleLinks())}
- [Web Highlighter Pro](https://kjyang0114.dev/web-highlighter-pro/): Local-first Chrome extension for webpage highlighting, local notes, search, and TXT / Markdown export.
- [Web Highlighter Pro Terms](https://kjyang0114.dev/web-highlighter-pro/terms): Terms and usage rules for Web Highlighter Pro.
- [Full summary](https://kjyang0114.dev/llms-full.txt): Longer version with every price, process step and page.
- [Studio summary](https://kjyang0114.dev/studio/llms.txt): KJyang Studio only.
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
