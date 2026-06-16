import { agentLinkHeader, siteOrigin } from "@data/agentDiscovery";

export function GET() {
  return new Response(
    JSON.stringify(
      {
        linkset: [
          {
            anchor: `${siteOrigin}/.well-known/openapi.json`,
            "service-desc": [
              {
                href: `${siteOrigin}/.well-known/openapi.json`,
                type: "application/openapi+json",
                title: "KJyang Studio public discovery OpenAPI description"
              }
            ],
            "service-doc": [
              {
                href: `${siteOrigin}/llms.txt`,
                type: "text/plain",
                title: "Short AI-readable site summary"
              },
              {
                href: `${siteOrigin}/llms-full.txt`,
                type: "text/plain",
                title: "Full AI-readable site summary"
              },
              {
                href: `${siteOrigin}/.well-known/agent-skills/index.json`,
                type: "application/json",
                title: "Agent skills discovery index"
              }
            ],
            status: [
              {
                href: `${siteOrigin}/.well-known/site-status`,
                type: "application/json",
                title: "Public site status metadata"
              }
            ]
          }
        ]
      },
      null,
      2
    ),
    {
      headers: {
        "Content-Type": "application/linkset+json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        Link: agentLinkHeader
      }
    }
  );
}
