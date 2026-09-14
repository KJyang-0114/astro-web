import { projects } from "./projects";

// This index mirrors public pages. Keep application documents and private
// biographical material out of machine-readable discovery endpoints.
export function personalDiscovery() {
  const projectLinks = projects.map(project =>
    `- [${project.title}](https://kjyang0114.dev/projects/${project.slug}): ${project.lead} 狀態：${project.status}。原始碼：${project.github}`,
  ).join("\n");
  return `## Personal website / 個人網站

楊凱捷（KJyang）是鶯歌工商資訊科學生。個人網站記錄 Web、AI 與自動化專案，以及開發筆記。這是個人網站，不是學校官方網站。

- [首頁](https://kjyang0114.dev/): 楊凱捷 / KJyang 的個人網站。
- [關於](https://kjyang0114.dev/about): 個人介紹與學習經歷。
- [作品](https://kjyang0114.dev/projects): 公開專案的用途、實作、目前狀態與原始碼。
- [AI 筆記](https://kjyang0114.dev/ai): AI 入門與開發筆記。
- [GitHub](https://github.com/KJyang-0114): 公開 repository 與 contribution。

### Personal projects / 個人專案

${projectLinks}

個人專案與 KJyang Studio 的網站設計範例是不同內容；各專案的可用狀態以對應作品頁為準。`;
}
