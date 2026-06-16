export function GET() {
  return new Response(
    `Content-Signal: search=yes, ai-input=yes, ai-train=no

User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

User-agent: bingbot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://kjyang0114.dev/sitemap.xml
Sitemap: https://kjyang0114.dev/studio/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
