import { absoluteStudioUrl, indexableStudioRoutes } from "@data/seo";
import { studioGuides } from "@data/guides";
import { insightPosts } from "@data/insights";
import { maintenancePlans, studioContact, studioPlans, studioServices } from "@data/studio";
import { servicePages } from "@data/trust";
import { workCases } from "@data/work";

export function GET() {
  const pages = indexableStudioRoutes.map((route) => `- ${route.title}: ${absoluteStudioUrl(route.path)}`).join("\n");
  const services = studioServices.map((service) => `- ${service.title}: ${service.text}`).join("\n");
  const buildPrices = studioPlans.map((plan) => `- ${plan.title}: ${plan.price}. ${plan.text}`).join("\n");
  const maintenancePrices = maintenancePlans.map(([title, price, text]) => `- ${title}: ${price}. ${text}`).join("\n");
  const guides = studioGuides.map((guide) => `- ${guide.title}: ${absoluteStudioUrl(`/studio/${guide.slug}`)}`).join("\n");
  const insights = insightPosts.map((post) => `- ${post.title}: ${absoluteStudioUrl(`/studio/insights/${post.slug}`)}`).join("\n");
  const works = workCases.map((work) => `- ${work.title}: ${absoluteStudioUrl(`/studio/work/${work.slug}`)}`).join("\n");
  const serviceDetails = servicePages.map((service) => `- ${service.title}: ${absoluteStudioUrl(`/studio/services/${service.slug}`)}`).join("\n");

  return new Response(
    `# KJyang Studio

KJyang Studio designs, codes, deploys, and maintains websites for small businesses and service providers.

## Primary Offer

Website design, frontend implementation, deployment support, hosting setup, SSL, backups, uptime monitoring, maintenance, and basic SEO/GEO setup.

SEO/GEO work includes page titles, meta descriptions, structured content, JSON-LD schema, FAQ content, sitemap, and AI-readable service summaries. KJyang Studio does not guarantee Google rankings or AI search citations.

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

## Educational Pages

${guides}

## Insights Library

KJyang Studio publishes practical articles for small businesses about website design, mobile conversion, LINE contact flows, pricing, deployment, maintenance, and basic SEO/GEO foundations.

${insights}

## Work Case Studies

Case study pages explain design strategy, mobile CTA planning, FAQ structure, trust signals, and basic SEO/GEO foundations behind each demo.

${works}

## Trust Pages

- About: ${absoluteStudioUrl("/studio/about")}
- Why KJyang Studio: ${absoluteStudioUrl("/studio/why-us")}

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
