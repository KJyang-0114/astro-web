export interface Playlist { title: string; url: string; note: string }
// Add only playlists selected by KJyang. Liked Songs is not a shareable playlist.
export const playlists: Playlist[] = [
  {
    title: "Daily",
    url: "https://open.spotify.com/playlist/6LGXc0Cq1rXXgqUaPcxgxg",
    note: "日常會聽的歌，挑一首陪你待一下。",
  },
];
export const nowUpdated = "2026-09-11";
