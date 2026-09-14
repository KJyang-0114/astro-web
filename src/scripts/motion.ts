import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  const revealItems = gsap.utils.toArray<HTMLElement>(
    ".section-title, .section-copy, .ac-card, .treatment, .course-card, .portfolio-tile, .budget-card, .studio-list article, .signature-grid article, .case-panel, .material, .delivery-grid article, .budget-path-grid article, .pro-strip-grid article, .pro-project, .system-panel, .pro-proof blockquote, .studio-orbit a, .studio-showcase-card, .studio-delivery-grid article, .hvac-service-board article, .dispatch-stack article, .hvac-price-grid article, .hvac-studio-grid article, .clinic-trust article, .clinic-treatment-grid article, .journey-chapters article, .clinic-process article, .clinic-studio-grid article, .clinic-proof-grid article, .academy-transform-grid article, .academy-course-grid article, .academy-proof-grid article, .academy-process-grid article, .academy-studio-grid article, details"
  );

  revealItems.forEach((item) => {
    gsap.fromTo(
      item,
      { y: 24 },
      {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 86%"
        }
      }
    );
  });

  gsap.utils.toArray<HTMLElement>(".ac-photo, .clinic-frame img, .study-photo, .interior-photo, .hvac-console img, .clinic-visual img, .academy-board img, .studio-showcase-card img").forEach((image) => {
    gsap.fromTo(
      image,
      { scale: 0.94, autoAlpha: 0.82 },
      {
        scale: 1,
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: {
          trigger: image,
          start: "top 92%",
          end: "bottom 20%",
          scrub: true
        }
      }
    );
  });
}

const defaultLineUrl = "https://line.me/ti/p/pl05m2MikN";

function formLabelText(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  const label = input.closest("label");
  if (!label) return input.name || "field";
  return Array.from(label.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent?.trim())
    .filter(Boolean)
    .join(" ")
    .trim() || input.name || "field";
}

function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopyText(text));
  }

  return fallbackCopyText(text);
}

function fallbackCopyText(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied ? Promise.resolve() : Promise.reject(new Error("copy failed"));
}

document.querySelectorAll<HTMLFormElement>(".contact-form").forEach((form) => {
  const button = form.querySelector<HTMLButtonElement>("button");
  const status = document.createElement("p");
  status.className = "form-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  button?.insertAdjacentElement("afterend", status);

  const send = async (event: Event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select"))
      .map((input) => [formLabelText(input), input.value.trim()])
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`);

    const title = document.querySelector("h1")?.textContent?.trim() || document.title;
    const message = [`KJyang Studio 網站需求`, `頁面: ${title}`, ...fields].join("\n");

    try {
      await copyText(message);
      status.textContent = "需求已複製。點下方連結開啟 LINE，再貼上傳送。";
    } catch {
      status.textContent = "瀏覽器無法複製。請手動複製欄位內容，再點下方連結開啟 LINE。";
    }
    const link = document.createElement("a");
    link.href = form.dataset.lineUrl || defaultLineUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "開啟 LINE ↗";
    link.style.display = "block";
    status.append(link);
  };

  form.addEventListener("submit", send);
  button?.addEventListener("click", send);
});
