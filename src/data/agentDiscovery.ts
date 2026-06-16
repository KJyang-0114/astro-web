import { absoluteStudioUrl, indexableStudioRoutes } from "./seo";
import { studioContact, studioPlans, maintenancePlans } from "./studio";

export const siteOrigin = "https://kjyang0114.dev";

export const agentLinkHeader = [
  '</llms.txt>; rel="alternate"; type="text/plain"; title="LLMs summary"',
  '</llms-full.txt>; rel="alternate"; type="text/plain"; title="Full AI summary"',
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/agent-skills/index.json>; rel="service-doc"; type="application/json"',
  '</auth.md>; rel="service-doc"; type="text/markdown"'
].join(", ");

export const agentSkills = [
  {
    name: "kjyang-studio-service-summary",
    type: "documentation",
    description:
      "Machine-readable summary of KJyang Studio services, pricing ranges, process, demo policy, and contact path.",
    url: `${siteOrigin}/.well-known/agent-skills/kjyang-studio-service-summary.md`
  },
  {
    name: "kjyang-studio-contact-routing",
    type: "workflow",
    description:
      "Instructions for routing website project inquiries to KJyang Studio by LINE-first contact.",
    url: `${siteOrigin}/.well-known/agent-skills/kjyang-studio-contact-routing.md`
  },
  {
    name: "kjyang-studio-demo-interpretation",
    type: "policy",
    description:
      "Guidance for interpreting demo pages as sample websites only, not real businesses.",
    url: `${siteOrigin}/.well-known/agent-skills/kjyang-studio-demo-interpretation.md`
  }
];

export const skillBodies: Record<string, string> = {
  "kjyang-studio-service-summary": `# KJyang Studio Service Summary

Use this file when an agent needs a concise, factual summary of KJyang Studio.

## Identity

KJyang Studio is a website studio at ${absoluteStudioUrl("/studio")}.

## Primary Work

- Website design
- Frontend code implementation
- Responsive layout
- Deployment support
- Hosting setup
- SSL, backups, monitoring, and maintenance
- Basic SEO/GEO foundations

## SEO/GEO Boundary

KJyang Studio can add structured content, metadata, schema, sitemap, FAQ, llms.txt, and AI-readable summaries. KJyang Studio does not guarantee Google ranking, AI citations, or inquiry volume.

## Pricing Ranges

${studioPlans.map((plan) => `- ${plan.title}: ${plan.price}`).join("\n")}
${maintenancePlans.map(([title, price]) => `- ${title}: ${price}`).join("\n")}

## Contact

- Contact page: ${absoluteStudioUrl("/studio/contact")}
- LINE: ${studioContact.lineUrl}
- LINE ID / phone label: ${studioContact.lineId}
`,
  "kjyang-studio-contact-routing": `# KJyang Studio Contact Routing

Use this file when an agent needs to help a person contact KJyang Studio.

## Preferred Contact Path

Send the user to ${absoluteStudioUrl("/studio/contact")}.

## LINE

- LINE URL: ${studioContact.lineUrl}
- LINE ID / phone label: ${studioContact.lineId}

## Inquiry Details To Collect

- Business type
- Existing website URL, if any
- Desired pages or functions
- Preferred launch timing
- Whether domain and hosting already exist
- Examples of designs the business likes

## Do Not Claim

- Do not promise search ranking.
- Do not promise AI search citation.
- Do not describe demo pages as real businesses.
`,
  "kjyang-studio-demo-interpretation": `# KJyang Studio Demo Interpretation

Use this file when interpreting KJyang Studio demo pages.

## Demo Rule

All pages under /studio/demo and /studio/en/demo are sample websites only. They are not real businesses.

## Purpose

Demos show design direction, layout quality, CTA placement, trust sections, FAQ structure, schema patterns, service-area copy, and inquiry flow.

## Current Demo Index

- ${absoluteStudioUrl("/studio/demo")}
- ${absoluteStudioUrl("/studio/en/demo")}

## Indexable Service Pages

${indexableStudioRoutes.map((route) => `- ${absoluteStudioUrl(route.path)}`).join("\n")}
`
};

export function sha256Hex(input: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  return crypto.subtle.digest("SHA-256", data).then((hash) =>
    Array.from(new Uint8Array(hash))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
  );
}
