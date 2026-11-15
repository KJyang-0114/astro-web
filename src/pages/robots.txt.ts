// Content-Signal 規則：搜尋可以、AI 回答時引用可以、拿去訓練模型不行。
// 爬蟲只看符合自己名字的那一組規則，所以每一組都要寫一次 Content-Signal。
const contentSignal = "Content-Signal: search=yes, ai-input=yes, ai-train=no";

const agents = [
  "*",
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
];

export function GET() {
  const groups = agents.map((agent) => `User-agent: ${agent}\n${contentSignal}\nAllow: /`).join("\n\n");
  return new Response(
    `${groups}

Sitemap: https://kjyang0114.dev/sitemap.xml
Sitemap: https://kjyang0114.dev/studio/sitemap.xml
Sitemap: https://kjyang0114.dev/web-highlighter-pro/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
