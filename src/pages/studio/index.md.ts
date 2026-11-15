import { absoluteStudioUrl } from "@data/seo";
import { studioContact, studioFacts, studioPlans, maintenancePlans, studioServices } from "@data/studio";
import { realCases } from "@data/cases";
import { insightPosts } from "@data/insights";

export function GET() {
  return new Response(
    `---
title: KJyang Studio
---

# KJyang Studio

KJyang Studio is one person, ${studioFacts.owner} (${studioFacts.ownerNote}). He builds websites and online booking systems for small shops in northern Taiwan and does the design, code, deployment, and maintenance himself.

- Area: ${studioFacts.area}
- LINE: ${studioFacts.reply}

## Services

${studioServices.map((service) => `- ${service.title}: ${service.text}`).join("\n")}

## Pricing Ranges

${studioPlans.map((plan) => `- ${plan.title}: ${plan.price}. ${plan.text}`).join("\n")}
${maintenancePlans.map(([title, price, text]) => `- ${title}: ${price}. ${text}`).join("\n")}

- Payment: ${studioFacts.payment}
- Revisions: ${studioFacts.revisions}

## Real Work

${realCases.map((item) => `- [${item.name}](${absoluteStudioUrl(`/studio/work/${item.slug}`)}): ${item.kind}. ${item.status}.`).join("\n")}

## Articles

${insightPosts.map((post) => `- [${post.title}](${absoluteStudioUrl(`/studio/insights/${post.slug}`)})`).join("\n")}

## Scope

Design, frontend code, booking and admin features, domain and HTTPS setup, deployment, hosting, backups, and maintenance. Basic search setup (titles, descriptions, area names, sitemap, Google Search Console) is included.

Google ranking, AI citation, and inquiry volume are not guaranteed.

## Contact

- Contact page: ${absoluteStudioUrl("/studio/contact")}
- LINE: ${studioContact.lineUrl}
- LINE ID / phone label: ${studioContact.lineId}
`,
    {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}
