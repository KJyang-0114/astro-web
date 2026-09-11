import { absoluteStudioUrl } from "@data/seo";

export function GET() {
  return new Response(
    `---
title: kjyang0114.dev
---

# kjyang0114.dev

KJyang personal site, Web Highlighter Pro product pages, and KJyang Studio website services.

## Personal site

- [Now](https://kjyang0114.dev/now): Personal updates and selected playlists.
- [A small pause](https://kjyang0114.dev/play): Interactive geometric linework with motion controls.

- [Resume](https://kjyang0114.dev/resume): Software engineering experience, skills, availability, and contact details.

- [About KJyang](https://kjyang0114.dev/about): Learning, development approach, and personal background.
- [Projects](https://kjyang0114.dev/projects): Eight projects with scope, implementation notes, and source code.
- [AI notes](https://kjyang0114.dev/ai): Introductory concepts, capabilities, limitations, and responsible use.
- [Contact](https://kjyang0114.dev/contact): GitHub, Discord, and Instagram.

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
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
