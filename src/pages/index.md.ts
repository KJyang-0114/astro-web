import { absoluteStudioUrl } from "@data/seo";

export function GET() {
  return new Response(
    `---
title: kjyang0114.dev
---

# kjyang0114.dev

KJyang personal site, Web Highlighter Pro product pages, and KJyang Studio website services.

## Main Sections

- [KJyang Studio](${absoluteStudioUrl("/studio")}): Website design, frontend coding, deployment, hosting setup, maintenance, and basic SEO/GEO foundations.
- [Web Highlighter Pro](https://kjyang0114.dev/web-highlighter-pro/): Local-first Chrome extension for webpage highlighting, notes, search, and export.
- [AI-readable summary](https://kjyang0114.dev/llms.txt): Short machine-readable summary.
- [Full AI-readable summary](https://kjyang0114.dev/llms-full.txt): Detailed machine-readable summary.

## Agent Discovery

- [API catalog](https://kjyang0114.dev/.well-known/api-catalog)
- [Agent skills](https://kjyang0114.dev/.well-known/agent-skills/index.json)
- [Auth metadata](https://kjyang0114.dev/auth.md)
`,
    {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}
