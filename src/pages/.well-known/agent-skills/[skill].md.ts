import { skillBodies } from "@data/agentDiscovery";

export function getStaticPaths() {
  return Object.keys(skillBodies).map((skill) => ({
    params: { skill }
  }));
}

export function GET({ params }: { params: { skill: string } }) {
  const body = skillBodies[params.skill];

  if (!body) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
