import { projects } from "../data/projects";
import { absoluteStudioUrl, indexableStudioRoutes } from "@data/seo";

export function GET() {
  const existingRoutes = [
    {
      loc: "https://kjyang0114.dev/",
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      loc: "https://kjyang0114.dev/web-highlighter-pro/",
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: "https://kjyang0114.dev/web-highlighter-pro/terms",
      changefreq: "monthly",
      priority: "0.4",
    },
  ];
  const studioRoutes = indexableStudioRoutes.map((route) => ({
    loc: absoluteStudioUrl(route.path),
    changefreq: route.changefreq,
    priority: route.priority,
  }));
  const personalRoutes = [
    "/about",
    "/resume",
    "/en/resume",
    "/now",
    "/play",
    "/projects",
    "/ai",
    "/contact",
    ...projects.map((project) => `/projects/${project.slug}`),
  ].map((path) => ({
    loc: absoluteStudioUrl(path),
    changefreq: "monthly",
    priority: "0.7",
  }));
  const urls = [...existingRoutes, ...personalRoutes, ...studioRoutes]
    .map(
      (route) => `  <url>
    <loc>${route.loc}</loc>
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
