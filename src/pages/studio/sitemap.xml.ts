import { absoluteStudioUrl, indexableStudioRoutes } from "@data/seo";

export function GET() {
  const urls = indexableStudioRoutes
    .map(
      (route) => `  <url>
    <loc>${absoluteStudioUrl(route.path)}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
