import { absoluteStudioUrl, indexableStudioRoutes } from "@data/seo";
import { insightPosts } from "@data/insights";
import { studioContact, studioFacts } from "@data/studio";
import { realCases } from "@data/cases";
import { workCases } from "@data/work";
import { personalDiscovery } from "../data/personal-discovery";

function describeRoute(path: string) {
  const insight = insightPosts.find((post) => path === `/studio/insights/${post.slug}`);
  if (insight) return insight.summary;

  const real = realCases.find((item) => path === `/studio/work/${item.slug}`);
  if (real) return `Real project by 楊凱捷 (${real.kind}). Status: ${real.status}.`;

  const work = workCases.find((item) => path === `/studio/work/${item.slug}`);
  if (work) return work.description;

  if (path.startsWith("/studio/services/")) {
    return "Service detail page: small-shop websites, redesigns, maintenance, or deployment and hosting.";
  }
  if (path === "/studio/insights") return "Six articles by 楊凱捷 on website prices, whether a shop with IG and Google Maps needs a site, LINE booking vs a booking system, the first mobile screen, care after launch, and one-page vs multi-page sites.";
  if (path === "/studio/work") return "Real projects (a two-location beauty SPA booking system, a fan info site with a web game, this site) plus clearly labeled sample demos.";
  if (path === "/studio/en") return "English KJyang Studio entry page for international website design, frontend coding, deployment, and maintenance inquiries.";
  if (path.startsWith("/studio/en/")) return "English KJyang Studio page for international services, pricing, demos, or contact.";
  if (path === "/studio") return "KJyang Studio homepage: 楊凱捷 builds websites and booking systems for small shops in northern Taiwan.";
  return "Core KJyang Studio page: about, pricing, process, or contact.";
}

export function GET() {
  const keyPages = indexableStudioRoutes
    .map((route) => `- [${route.title}](${absoluteStudioUrl(route.path)}): ${describeRoute(route.path)}`)
    .join("\n");
  const insightPages = insightPosts
    .map((post) => `- [${post.title}](${absoluteStudioUrl(`/studio/insights/${post.slug}`)}): ${post.summary}`)
    .join("\n");
  const realPages = realCases
    .map((item) => `- [${item.name}](${absoluteStudioUrl(`/studio/work/${item.slug}`)}): ${item.kind}. Status: ${item.status}.`)
    .join("\n");
  const workPages = workCases
    .map((work) => `- [${work.title}](${absoluteStudioUrl(`/studio/work/${work.slug}`)}): Sample direction, not a real client. ${work.description}`)
    .join("\n");

  return new Response(
    `# kjyang0114.dev

> Personal site for KJyang plus KJyang Studio website services and Web Highlighter Pro product information.

${personalDiscovery()}

## Products

- [Web Highlighter Pro](https://kjyang0114.dev/web-highlighter-pro/): Local-first Chrome extension for webpage highlighting, local notes, search, and TXT / Markdown export.
- [Web Highlighter Pro Terms](https://kjyang0114.dev/web-highlighter-pro/terms): Terms and usage rules for Web Highlighter Pro.

## Services

${keyPages}

## Articles

${insightPages}

## Real Work

${realPages}

## Sample Directions (not real clients)

${workPages}

## Key Facts

- Business: KJyang Studio, run by one person, ${studioFacts.owner} (${studioFacts.ownerNote})
- Product: Web Highlighter Pro
- Website: ${absoluteStudioUrl("/studio")}
- Primary services: websites and online booking systems for small shops; design, code, domain/HTTPS setup, deployment, and maintenance done by the same person
- Area: ${studioFacts.area}
- Trust pages: About, Work (real projects), services, pricing, process, contact
- Primary market: small shops in northern Taiwan (beauty, tutoring, studios, repair, food), with English support for international clients
- Pricing: one-page websites NT$18,000-28,000; five-page websites NT$35,000-58,000; maintenance starts around NT$1,200/month
- Contact path: LINE-first inquiry flow, LINE ID / phone label ${studioContact.lineId}. ${studioFacts.reply}.
- SEO/GEO scope: titles, descriptions, schema, sitemap, FAQ, semantic content, AI-readable summaries; no ranking or AI-citation guarantee
- Demo pages are samples only and not real businesses

## Contact

- [KJyang Studio Contact](${absoluteStudioUrl("/studio/contact")}): LINE QR code, LINE link, phone label, and website inquiry form.
- LINE: ${studioContact.lineUrl}
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
