import { absoluteStudioUrl, indexableStudioRoutes } from "@data/seo";
import { realCases } from "@data/cases";
import { insightPosts } from "@data/insights";
import { maintenancePlans, studioContact, studioFacts, studioPlans, studioServices } from "@data/studio";
import { servicePages } from "@data/trust";
import { workCases } from "@data/work";

export function GET() {
  const pages = indexableStudioRoutes.map((route) => `- ${route.title}: ${absoluteStudioUrl(route.path)}`).join("\n");
  const services = studioServices.map((service) => `- ${service.title}: ${service.text}`).join("\n");
  const buildPrices = studioPlans.map((plan) => `- ${plan.title}: ${plan.price}. ${plan.text}`).join("\n");
  const maintenancePrices = maintenancePlans.map(([title, price, text]) => `- ${title}: ${price}. ${text}`).join("\n");
  const real = realCases.map((item) => `- ${item.name}（${item.kind}）: ${absoluteStudioUrl(`/studio/work/${item.slug}`)}`).join("\n");
  const insights = insightPosts.map((post) => `- ${post.title}: ${absoluteStudioUrl(`/studio/insights/${post.slug}`)}`).join("\n");
  const works = workCases.map((work) => `- ${work.title}: ${absoluteStudioUrl(`/studio/work/${work.slug}`)}`).join("\n");
  const serviceDetails = servicePages.map((service) => `- ${service.title}: ${absoluteStudioUrl(`/studio/services/${service.slug}`)}`).join("\n");

  return new Response(
    `# KJyang Studio

KJyang Studio is one person, ${studioFacts.owner} (${studioFacts.ownerNote}). He builds websites and online booking systems for small shops in northern Taiwan and does the design, code, deployment, and maintenance himself.

## Primary Offer

Small-shop websites (one-page or multi-page), online booking and staff scheduling systems, domain and HTTPS setup, deployment, and maintenance.

- Area: ${studioFacts.area}
- LINE: ${studioFacts.reply}
- Payment: ${studioFacts.payment}
- Revisions: ${studioFacts.revisions}

Basic search setup (titles, descriptions, area names, sitemap, Google Search Console) is included. Google rankings and AI search citations are not guaranteed.

## Contact

- LINE: ${studioContact.lineUrl}
- LINE ID / phone label: ${studioContact.lineId}
- Website: ${absoluteStudioUrl("/studio")}

## Services

${services}

## Service Detail Pages

${serviceDetails}

## Website Build Pricing

${buildPrices}

## Hosting and Maintenance Pricing

${maintenancePrices}

## Important Pages

${pages}

## Real Work

${real}

## Articles

Six articles by ${studioFacts.owner} for small-shop owners, using his own projects as examples.

${insights}

## Sample Directions (not real clients)

These pages explain layout decisions behind fictional sample brands.

${works}

## Trust Pages

- About: ${absoluteStudioUrl("/studio/about")}
- Work: ${absoluteStudioUrl("/studio/work")}

## Demo Pages

Demo pages under /studio/demo and /studio/en/demo are sample websites only. They are not real businesses and should not be treated as client locations, clinics, tutoring centers, AC companies, or home-service companies.
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
