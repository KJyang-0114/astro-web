import { agentSkills, sha256Hex, skillBodies } from "@data/agentDiscovery";

export async function GET() {
  const skills = await Promise.all(
    agentSkills.map(async (skill) => ({
      ...skill,
      sha256: await sha256Hex(skillBodies[skill.name] ?? "")
    }))
  );

  return new Response(
    JSON.stringify(
      {
        $schema: "https://agentskills.io/schemas/agent-skills-index-v0.2.json",
        name: "KJyang Studio Agent Skills",
        description:
          "Discovery index for KJyang Studio service summary, contact routing, and demo interpretation.",
        skills
      },
      null,
      2
    ),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}
