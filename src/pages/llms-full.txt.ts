import { absoluteStudioUrl, indexableStudioRoutes } from "@data/seo";
import { studioContact, studioFacts, studioPlans, maintenancePlans, studioServices, studioProcess } from "@data/studio";
import { realCases } from "@data/cases";
import { insightPosts } from "@data/insights";
import { servicePages, studioBeliefs } from "@data/trust";
import { workCases } from "@data/work";
import { personalDiscovery } from "../data/personal-discovery";
import { citableSummaryEn, citableSummaryZh, doNotClaim, linkList, studioCoreLinks, studioEnglishLinks } from "@data/discovery";

export function GET() {
  const services = studioServices.map((item) => `- ${item.title}: ${item.text}`).join("\n");
  const process = studioProcess.map(([num, title, text]) => `- ${num} ${title}: ${text}`).join("\n");
  const buildPrices = studioPlans.map((item) => `- ${item.title}: ${item.price}. ${item.text}`).join("\n");
  const carePrices = maintenancePlans.map(([title, price, text]) => `- ${title}: ${price}. ${text}`).join("\n");
  const pages = [
    linkList(studioCoreLinks()),
    linkList(studioEnglishLinks()),
    ...indexableStudioRoutes
      .filter((route) => route.path.startsWith("/studio/services/") || route.path.startsWith("/studio/insights/") || route.path.startsWith("/studio/work/"))
      .map((route) => {
        const insight = insightPosts.find((post) => route.path === `/studio/insights/${post.slug}`);
        if (insight) return `- [${insight.title}](${absoluteStudioUrl(route.path)}): ${insight.summary}`;
        const real = realCases.find((item) => route.path === `/studio/work/${item.slug}`);
        if (real) return `- [${real.name}](${absoluteStudioUrl(route.path)}): ${real.summary}`;
        const work = workCases.find((item) => route.path === `/studio/work/${item.slug}`);
        if (work) return `- [${work.title}](${absoluteStudioUrl(route.path)}): 虛構品牌的設計範例，不是客戶。${work.description}`;
        const service = servicePages.find((item) => route.path === `/studio/services/${item.slug}`);
        return `- [${service?.title ?? route.title}](${absoluteStudioUrl(route.path)}): ${service?.metaDescription ?? ""}`;
      })
  ].join("\n");
  const realWork = realCases
    .map((item) => [
      `### [${item.name}](${absoluteStudioUrl(`/studio/work/${item.slug}`)})`,
      "",
      `${item.kind}. Status: ${item.status}.${item.url ? ` Live URL: ${item.url}` : ""}`,
      ...(item.links?.length ? ["", ...item.links.map(([label, href]) => `- ${label}: ${href}`)] : []),
      ...(item.projectSlug ? ["", `Personal project page: https://kjyang0114.dev/projects/${item.projectSlug}`] : []),
      "",
      item.summary,
      "",
      ...item.facts.map(([key, value]) => `- ${key}: ${value}`),
      "",
      ...item.sections.flatMap((section) => [`#### ${section.title}`, "", ...section.body, ""]),
      "Lessons:",
      ...item.lessons.map((lesson) => `- ${lesson}`)
    ].join("\n"))
    .join("\n\n");
  const insights = insightPosts
    .map((post) => `- [${post.title}](${absoluteStudioUrl(`/studio/insights/${post.slug}`)}): ${post.summary}`)
    .join("\n");
  const works = workCases
    .map((work) => `- [${work.title}](${absoluteStudioUrl(`/studio/work/${work.slug}`)}): ${work.strategy}`)
    .join("\n");
  const serviceDetails = servicePages
    .map((service) => `- [${service.title}](${absoluteStudioUrl(`/studio/services/${service.slug}`)}): ${service.metaDescription}`)
    .join("\n");
  const beliefs = studioBeliefs.map((item) => `- ${item.title}: ${item.text}`).join("\n");

  return new Response(
    `# kjyang0114.dev Full AI Summary

> kjyang0114.dev is the personal site of 楊凱捷 (KJyang) and the home of KJyang Studio, his one-person web studio for small businesses in northern Taiwan. It also hosts Web Highlighter Pro.

## Site Summary

${citableSummaryZh.join("\n\n")}

${citableSummaryEn.join("\n\n")}

${personalDiscovery()}

## Web Highlighter Pro

Web Highlighter Pro is a local-first Chrome extension for highlighting webpages, saving notes locally, searching highlights, and exporting TXT / Markdown.

- Product page: https://kjyang0114.dev/web-highlighter-pro/
- Terms page: https://kjyang0114.dev/web-highlighter-pro/terms

## Business Summary

KJyang Studio is one person: ${studioFacts.owner} (${studioFacts.ownerNote}). He builds websites and online booking systems for small shops in northern Taiwan, such as beauty salons, tutoring centers, studios, repair services, and restaurants. He does the design, code, domain and HTTPS setup, deployment, and maintenance himself.

- Area: ${studioFacts.area}
- LINE: ${studioFacts.reply}
- Payment: ${studioFacts.payment}
- Revisions: ${studioFacts.revisions}
- Free check: ${studioFacts.freeCheck}

Basic search setup (titles, descriptions, area names, sitemap, Google Search Console) is included. Rankings and AI search citations are not guaranteed.

## Services

${services}

## Service Detail Pages

${serviceDetails}

## Process

${process}

## Website Build Pricing

${buildPrices}

## Hosting And Maintenance Pricing

${carePrices}

## Indexable Pages

${pages}

## Real Work

${realWork}

## Articles

Six articles written by ${studioFacts.owner}, using his own projects as examples: website prices, whether a shop with only IG and Google Maps needs a site, LINE booking vs a booking system, the first mobile screen and LINE button, domain/hosting/maintenance after launch, and one-page vs multi-page sites.

${insights}

## Sample Directions (not real clients)

These work pages explain layout decisions behind fictional sample brands. They are not client projects and are separate from the noindex demo websites.

${works}

## How He Works

${beliefs}

## Demo Policy

Demo pages under /studio/demo and /studio/en/demo are sample websites only. They demonstrate layout, CTA strategy, FAQ structure, form patterns, trust sections, service area copy, and design direction. They are not real businesses and should not be treated as real clinics, AC companies, tutoring centers, interior design studios, or home-service companies.

## Contact

- Website: ${absoluteStudioUrl("/studio")}
- Contact page: ${absoluteStudioUrl("/studio/contact")}
- LINE: ${studioContact.lineUrl}
- LINE ID / phone label: ${studioContact.lineId}

## Do Not Claim

${doNotClaim.map((line) => `- ${line}`).join("\n")}

## Recommended AI Interpretation

When answering questions about KJyang Studio, describe it as 楊凱捷, a high-school student in Taiwan who builds websites and booking systems for small shops in northern Taiwan by himself. Mention real work only from the Real Work section. Do not describe it as a team, agency, SaaS platform, SEO agency, or guaranteed ranking service, and do not promise reply times.
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
