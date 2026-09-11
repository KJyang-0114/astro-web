import type { WireShape } from "./wire-geometry";
export interface ArtView { shape: WireShape; yaw: number; pitch: number; dragging: boolean }
export function bindArtControls(host: HTMLElement): ArtView {
  const view: ArtView = { shape: "ribbon", yaw: 0, pitch: 0, dragging: false };
  if (!host.hasAttribute("data-interactive")) return view;
  const announce = () => host.dispatchEvent(new Event("artchange"));
  let pointer: number | null = null, x = 0, y = 0;
  const stop = () => { pointer = null; view.dragging = false; host.classList.remove("dragging"); };
  host.addEventListener("pointerdown", event => {
    if (!(event.target instanceof Element) || !event.target.closest(".wire-art") || event.button !== 0 || pointer !== null) return;
    pointer = event.pointerId; x = event.clientX; y = event.clientY;
    view.dragging = true; host.classList.add("dragging");
    host.setPointerCapture(pointer);
  });
  host.addEventListener("pointermove", event => {
    if (event.pointerId !== pointer) return;
    view.yaw += (event.clientX - x) * .008;
    view.pitch = Math.max(-1, Math.min(1, view.pitch + (event.clientY - y) * .006));
    x = event.clientX; y = event.clientY; announce();
  });
  host.addEventListener("pointerup", stop);
  host.addEventListener("pointercancel", stop);
  host.addEventListener("lostpointercapture", stop);
  host.addEventListener("keydown", event => {
    if (!(event.target instanceof Element) || !event.target.closest(".wire-art")) return;
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") view.yaw = view.pitch = 0;
    if (event.key === "ArrowLeft") view.yaw -= .15;
    if (event.key === "ArrowRight") view.yaw += .15;
    if (event.key === "ArrowUp") view.pitch = Math.max(-1, view.pitch - .1);
    if (event.key === "ArrowDown") view.pitch = Math.min(1, view.pitch + .1);
    announce();
  });
  host.querySelectorAll<HTMLButtonElement>("[data-art-shape]").forEach(button => button.addEventListener("click", () => {
    const shape = button.dataset.artShape;
    if (shape !== "ribbon" && shape !== "orbit" && shape !== "wave") return;
    view.shape = shape;
    host.querySelectorAll("[data-art-shape]").forEach(el => el.setAttribute("aria-pressed", String(el === button)));
    announce();
  }));
  host.querySelector("[data-art-reset]")?.addEventListener("click", () => { view.yaw = view.pitch = 0; announce(); });
  return view;
}
export function settleArtView(view: ArtView, dt: number) {
  if (view.dragging) return;
  const decay = Math.exp(-dt * .65);
  view.yaw *= decay; view.pitch *= decay;
}
