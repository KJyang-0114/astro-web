import { absoluteStudioUrl } from "@data/seo";
import { articleLinks, citableSummaryZh, doNotClaim, linkList, realCaseLinks, serviceLinks } from "@data/discovery";
import { maintenancePlans, studioContact, studioFacts, studioPlans } from "@data/studio";

export function GET() {
  return new Response(
    `---
title: KJyang Studio
---

# KJyang Studio

${citableSummaryZh.slice(1).join("\n\n")}

## 價格

${studioPlans.map((plan) => `- ${plan.nameZh}：${plan.price}，大約 ${plan.weeks}。${plan.text}`).join("\n")}
${maintenancePlans.map(([title, price, text]) => `- 維護月費 ${title}：${price}。${text}`).join("\n")}

- 付款：${studioFacts.payment}
- 修改：${studioFacts.revisions}

## 服務

${linkList(serviceLinks())}

## 真實作品

${linkList(realCaseLinks())}

## 文章

${linkList(articleLinks())}

## 不要這樣描述

${doNotClaim.map((line) => `- ${line}`).join("\n")}

## 聯絡

- 聯絡頁：${absoluteStudioUrl("/studio/contact")}
- LINE：${studioContact.lineUrl}
- LINE ID：${studioContact.lineId}
- 電話：${studioContact.phone}
- Email：${studioContact.email}
`,
    {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}
