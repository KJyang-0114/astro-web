import { absoluteStudioUrl } from "@data/seo";
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
import { maintenancePlans, studioContact, studioFacts, studioPlans, studioServices } from "@data/studio";

export function GET() {
  const buildPrices = studioPlans.map((plan) => `- ${plan.nameZh}（${plan.title}）：${plan.price}，大約 ${plan.weeks}。${plan.text}`).join("\n");
  const carePrices = maintenancePlans.map(([title, price, text]) => `- ${title}：${price}。${text}`).join("\n");

  return new Response(
    `# KJyang Studio

> 楊凱捷（KJyang）一個人經營的網站接案：幫台灣北部的小店、工作室做網站和線上預約系統，一頁式網站 ${studioFacts.startPrice} 起。

${citableSummaryZh.slice(1).join("\n\n")}

${citableSummaryEn.slice(1).join("\n\n")}

## Facts / 基本資料

- 負責人：${studioFacts.owner}（${studioFacts.ownerNote}）
- 地區：${studioFacts.area}
- 回覆：${studioFacts.reply}
- 付款：${studioFacts.payment}
- 修改：${studioFacts.revisions}
- 免費看一次：${studioFacts.freeCheck}
- 搜尋基本設定（標題、說明、地區、網站地圖、Google Search Console）包含在方案裡；不保證排名。

## Pricing / 價格

${buildPrices}

維護月費（可以不買）：

${carePrices}

## What he does / 做的事

${studioServices.map((service) => `- ${service.title}：${service.text}`).join("\n")}

## Pages

${linkList(studioCoreLinks())}

## Services

${linkList(serviceLinks())}

## Real work

${linkList(realCaseLinks())}

## Articles

${linkList(articleLinks())}

## English

${linkList(studioEnglishLinks())}

## Contact

- LINE：${studioContact.lineUrl}（LINE ID ${studioContact.lineId}・電話 ${studioContact.phone}）
- Email：${studioContact.email}
- 聯絡頁：${absoluteStudioUrl("/studio/contact")}

## Do not claim

${doNotClaim.map((line) => `- ${line}`).join("\n")}

## Optional

${linkList(sampleLinks())}
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
