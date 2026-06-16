import { absoluteStudioUrl } from "@data/seo";
import { studioContact, studioPlans, maintenancePlans, studioServices } from "@data/studio";

export function GET() {
  return new Response(
    `---
title: KJyang Studio
---

# KJyang Studio

KJyang Studio designs, codes, deploys, and maintains websites for small businesses.

## Services

${studioServices.map((service) => `- ${service.title}: ${service.text}`).join("\n")}

## Pricing Ranges

${studioPlans.map((plan) => `- ${plan.title}: ${plan.price}. ${plan.text}`).join("\n")}
${maintenancePlans.map(([title, price, text]) => `- ${title}: ${price}. ${text}`).join("\n")}

## Scope

KJyang Studio can include responsive design, frontend implementation, deployment support, hosting setup, SSL, backups, monitoring, maintenance, metadata, schema, sitemap, FAQ, and AI-readable summaries.

SEO/GEO foundations are included, but Google ranking, AI citation, and inquiry volume are not guaranteed.

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
