// Resolve the generic resume entry before rendering. Explicit English URLs
// remain shareable regardless of browser or stored preferences.
(() => {
  const url = new URL(window.location.href);
  const path = url.pathname.replace(/\/$/, "");
  if (path !== "/resume" && path !== "/en/resume") return;
  const key = "kjyang-resume-language";
  const explicit = url.searchParams.get("lang");
  let saved;
  try {
    saved = localStorage.getItem(key);
    if (explicit === "zh-Hant" || explicit === "en") localStorage.setItem(key, explicit);
  } catch { /* Links remain usable when storage is unavailable. */ }
  let language = explicit === "zh-Hant" || explicit === "en" ? explicit : null;
  if (!language && path === "/en/resume") return;
  if (!language && (saved === "zh-Hant" || saved === "en")) language = saved;
  if (!language) {
    const preferred = navigator.languages?.[0] || navigator.language || "zh";
    language = /^zh(?:-|$)/i.test(preferred) ? "zh-Hant" : "en";
  }
  const target = language === "en" ? "/en/resume" : "/resume";
  if (target !== path) { url.pathname = target; window.location.replace(url.href); }
})();
