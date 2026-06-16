import { siteOrigin } from "@data/agentDiscovery";

export function GET() {
  return new Response(
    JSON.stringify(
      {
        status: "ok",
        service: "kjyang0114.dev",
        owner: "KJyang Studio",
        homepage: siteOrigin,
        studio: `${siteOrigin}/studio`,
        generated_at: new Date().toISOString(),
        notes: [
          "Public website metadata only.",
          "No protected API is advertised.",
          "Demo pages are sample websites only."
        ]
      },
      null,
      2
    ),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache"
      }
    }
  );
}
