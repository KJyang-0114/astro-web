import { absoluteStudioUrl } from "@data/seo";
import { studioContact } from "@data/studio";

export function GET() {
  return new Response(
    `# KJyang Studio Agent Authentication

KJyang Studio does not currently provide protected APIs, OAuth app registration, OIDC login, or automated agent registration.

## Public Resources

- Website: ${absoluteStudioUrl("/studio")}
- AI summary: https://kjyang0114.dev/llms.txt
- Full AI summary: https://kjyang0114.dev/llms-full.txt
- Agent skills index: https://kjyang0114.dev/.well-known/agent-skills/index.json
- API catalog: https://kjyang0114.dev/.well-known/api-catalog

## Contact

For website project inquiries, use the public contact page or LINE.

- Contact page: ${absoluteStudioUrl("/studio/contact")}
- LINE: ${studioContact.lineUrl}
- LINE ID / phone label: ${studioContact.lineId}

## Security Boundary

Do not infer that hidden APIs, customer accounts, OAuth flows, MCP transports, or private data access exist. This public website exposes only marketing, demo, documentation, and contact information.
`,
    {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}
