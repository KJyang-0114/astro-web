import { projects } from "../data/projects";
import { lastmodFor } from "../data/lastmod.mjs";

// 個人網站的網址。Studio 在 /studio/sitemap.xml，Web Highlighter Pro 在
// /web-highlighter-pro/sitemap.xml，三個都列在 robots.txt，每個網址只出現一次。
const personalSitemapPaths = [
  "/",
  "/about",
  "/resume",
  "/en/resume",
  "/now",
  "/play",
  "/projects",
  "/ai",
  "/contact",
  ...projects.map((project) => `/projects/${project.slug}`),
  ...projects.filter((project) => project.en).map((project) => `/en/projects/${project.slug}`),
];

export function GET() {
  const urls = personalSitemapPaths
    .map((path) => {
      const lastmod = lastmodFor(path);
      return `  <url>
    <loc>https://kjyang0114.dev${path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "0.8" : "0.7"}</priority>
  </url>`;
    })
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
