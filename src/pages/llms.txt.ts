import { absoluteStudioUrl, indexableStudioRoutes } from "@data/seo";
import { insightPosts } from "@data/insights";
import { studioContact } from "@data/studio";
import { workCases } from "@data/work";

function describeRoute(path: string) {
  const insight = insightPosts.find((post) => path === `/studio/insights/${post.slug}`);
  if (insight) return insight.summary;

  const work = workCases.find((item) => path === `/studio/work/${item.slug}`);
  if (work) return work.description;

  if (path.startsWith("/studio/services/")) {
    return "Detailed KJyang Studio service page explaining website design, redesign, maintenance, or deployment support.";
  }
  if (
    path.startsWith("/studio/website") ||
    path.startsWith("/studio/line") ||
    path.startsWith("/studio/vps") ||
    path.startsWith("/studio/demo-process")
  ) {
    return "Educational service page explaining KJyang Studio website strategy, delivery, pricing, and contact flow.";
  }
  if (path === "/studio/insights") return "Dated KJyang Studio article library for website design, LINE contact flow, deployment, maintenance, SEO, and GEO basics.";
  if (path === "/studio/work") return "KJyang Studio case-study index showing design strategy behind sample website directions.";
  if (path === "/studio/en") return "English KJyang Studio entry page for international website design, frontend coding, deployment, and maintenance inquiries.";
  if (path.startsWith("/studio/en/")) return "English KJyang Studio page for international services, pricing, demos, or contact.";
  if (path === "/studio") return "Main KJyang Studio homepage for website design, frontend coding, deployment, hosting setup, maintenance, and basic SEO/GEO foundations.";
  return "Core KJyang Studio page for service scope, pricing, process, trust, contact, or business context.";
}

export function GET() {
  const keyPages = indexableStudioRoutes
    .map((route) => `- [${route.title}](${absoluteStudioUrl(route.path)}): ${describeRoute(route.path)}`)
    .join("\n");
  const insightPages = insightPosts
    .slice(0, 7)
    .map((post) => `- [${post.title}](${absoluteStudioUrl(`/studio/insights/${post.slug}`)}): ${post.summary}`)
    .join("\n");
  const workPages = workCases
    .map((work) => `- [${work.title}](${absoluteStudioUrl(`/studio/work/${work.slug}`)}): ${work.description}`)
    .join("\n");

  return new Response(
    `# kjyang0114.dev

> Personal site for KJyang plus KJyang Studio website services and Web Highlighter Pro product information.

## Products

- [Web Highlighter Pro](https://kjyang0114.dev/web-highlighter-pro/): Local-first Chrome extension for webpage highlighting, local notes, search, and TXT / Markdown export.
- [Web Highlighter Pro Terms](https://kjyang0114.dev/web-highlighter-pro/terms): Terms and usage rules for Web Highlighter Pro.

## Services

${keyPages}

## Insights

${insightPages}

## Work Case Studies

${workPages}

## Key Facts

- Business: KJyang Studio
- Product: Web Highlighter Pro
- Website: ${absoluteStudioUrl("/studio")}
- Primary services: website design, frontend coding, deployment, hosting setup, SSL, backups, monitoring, maintenance, basic SEO/GEO setup
- Trust pages: About, Why KJyang Studio, Works, case studies, services, pricing, process, contact
- Primary market: Taiwan small businesses, with English website support for international clients
- Pricing: one-page websites NT$18,000-28,000; five-page websites NT$35,000-58,000; maintenance starts around NT$1,200/month
- Contact path: LINE-first inquiry flow, LINE ID / phone label ${studioContact.lineId}
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
