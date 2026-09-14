// Current enrollment is an affiliation, not an alumni credential.
export const person = {
  "@type": "Person",
  "@id": "https://kjyang0114.dev/#person",
  name: "楊凱捷",
  alternateName: ["KJyang", "KJyang-0114", "imw1nt0r"],
  url: "https://kjyang0114.dev/",
  description: "鶯歌工商資訊科學生，開發 Web、Backend 與 AI 整合應用，具備完全遠端軟體開發任職經驗。",
  affiliation: {
    "@type": "EducationalOrganization",
    name: "新北市立鶯歌高級工商職業學校",
    alternateName: "鶯歌工商",
    url: "https://www.ykvs.ntpc.edu.tw/",
  },
  sameAs: [
    "https://github.com/KJyang-0114",
    "https://www.linkedin.com/in/kjyang0114/",
    "https://www.instagram.com/imw1nt0r/",
  ],
};
