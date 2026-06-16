import { siteOrigin } from "@data/agentDiscovery";

export function GET() {
  return new Response(
    JSON.stringify(
      {
        openapi: "3.1.0",
        info: {
          title: "KJyang Studio Public Discovery Metadata",
          version: "1.0.0",
          description:
            "Read-only metadata endpoints for agents and search systems. This is not a protected customer API."
        },
        servers: [{ url: siteOrigin }],
        paths: {
          "/llms.txt": {
            get: {
              summary: "Short AI-readable summary",
              responses: {
                "200": {
                  description: "Plain-text summary for AI systems",
                  content: { "text/plain": { schema: { type: "string" } } }
                }
              }
            }
          },
          "/llms-full.txt": {
            get: {
              summary: "Full AI-readable summary",
              responses: {
                "200": {
                  description: "Detailed plain-text summary for AI systems",
                  content: { "text/plain": { schema: { type: "string" } } }
                }
              }
            }
          },
          "/.well-known/agent-skills/index.json": {
            get: {
              summary: "Agent skills discovery index",
              responses: {
                "200": {
                  description: "Agent skills index",
                  content: { "application/json": { schema: { type: "object" } } }
                }
              }
            }
          },
          "/.well-known/api-catalog": {
            get: {
              summary: "API catalog linkset",
              responses: {
                "200": {
                  description: "RFC 9727 linkset catalog",
                  content: { "application/linkset+json": { schema: { type: "object" } } }
                }
              }
            }
          },
          "/.well-known/site-status": {
            get: {
              summary: "Public site status metadata",
              responses: {
                "200": {
                  description: "Public status metadata",
                  content: { "application/json": { schema: { type: "object" } } }
                }
              }
            }
          }
        }
      },
      null,
      2
    ),
    {
      headers: {
        "Content-Type": "application/openapi+json; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}
