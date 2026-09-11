import { projects } from "../data/projects";
import { absoluteStudioUrl, indexableStudioRoutes } from "@data/seo";

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const existingRoutes = [
    {
      loc: "https://kjyang0114.dev/",
      lastmod,
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      loc: "https://kjyang0114.dev/web-highlighter-pro/",
      lastmod,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: "https://kjyang0114.dev/web-highlighter-pro/terms",
      lastmod,
      changefreq: "monthly",
      priority: "0.4",
    },
  ];
  const studioRoutes = indexableStudioRoutes.map((route) => ({
    loc: absoluteStudioUrl(route.path),
    lastmod,
    changefreq: route.changefreq,
    priority: route.priority,
  }));
  const personalRoutes = [
    "/about",
    "/resume",
    "/now",
    "/play",
    "/projects",
    "/ai",
    "/contact",
    ...projects.map((project) => `/projects/${project.slug}`),
  ].map((path) => ({
    loc: absoluteStudioUrl(path),
    lastmod,
    changefreq: "monthly",
    priority: "0.7",
  }));
  const urls = [...existingRoutes, ...personalRoutes, ...studioRoutes]
    .map(
      (route) => `  <url>
    <loc>${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
}
