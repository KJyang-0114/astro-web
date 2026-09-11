import { ribbonPath, wireVertices } from "./wire-geometry";
import { bindArtControls, settleArtView, type ArtView } from "./wire-controls";
import type * as Three from "three";

/** Art is optional: content remains usable without WebGL, JavaScript, or motion. */
document.querySelectorAll<HTMLElement>("[data-wire-art]").forEach((host) => {
  const canvas = host.querySelector<HTMLCanvasElement>("canvas");
  const control = host.querySelector<HTMLButtonElement>(".motion-toggle");
  if (!canvas || !control) return;
  const view = bindArtControls(host);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let stopped = reduced.matches;
  const update = () => {
    if (control.disabled) return;
    host.classList.toggle("paused", stopped);
    control.setAttribute("aria-pressed", String(stopped));
    control.textContent = stopped ? "播放動效 ▷" : "暫停動效 Ⅱ";
    host.dispatchEvent(new Event("motionchange"));
  };
  control.addEventListener("click", () => {
    stopped = !stopped;
    update();
  });
  reduced.addEventListener("change", (event) => {
    stopped = event.matches;
    update();
  });
  update();
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        void initArt(host, canvas, view);
      }
    },
    { rootMargin: "150px" },
  );
  observer.observe(host);
});

async function initArt(host: HTMLElement, canvas: HTMLCanvasElement, view: ArtView) {
  let renderer: Three.WebGLRenderer;
  let THREE: typeof import("three");
  try {
    THREE = await import("three");
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    initSvgArt(host, canvas, view);
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    -1.85,
    1.85,
    1.85,
    -1.85,
    0.1,
    20,
  );
  camera.position.z = 5;
  const group = new THREE.Group();
  scene.add(group);
  const material = new THREE.LineBasicMaterial({
    transparent: true,
    opacity: 0.85,
  });
  let geometry = new THREE.BufferGeometry();
  const vertices = wireVertices(view.shape);
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  const sculpture = new THREE.LineSegments(geometry, material);
  group.add(sculpture);
  group.rotation.set(0.7, 0.25, 0.15);
  let frame = 0,
    last = 0,
    elapsed = 0,
    visible = true,
    disposed = false,
    contextLost = false,
    targetX = 0,
    targetY = 0;
  const paused = () => host.classList.contains("paused");
  const draw = () => {
    if (!disposed && !contextLost) renderer.render(scene, camera);
  };
  const colors = () => {
    material.color.set(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--art")
        .trim(),
    );
    draw();
  };
  const resize = () => {
    const width = canvas.clientWidth,
      height = canvas.clientHeight;
    if (width < 1 || height < 1) return;
    renderer.setSize(width, height, false);
    camera.left = (-1.85 * width) / height;
    camera.right = (1.85 * width) / height;
    camera.updateProjectionMatrix();
    draw();
  };
  function tick(time: number) {
    frame = 0;
    if (disposed || contextLost || paused() || document.hidden || !visible)
      return;
    if (time - last >= 40) {
      const dt = Math.min((time - last) / 1000, 0.05);
      last = time;
      elapsed += dt;
      settleArtView(view, dt);
      group.rotation.y = .25 + elapsed * .16 + view.yaw;
      group.scale.setScalar(1 + Math.sin((elapsed * Math.PI) / 5) * 0.045);
      group.rotation.x +=
        (0.7 + targetY + view.pitch + Math.sin(elapsed * 0.25) * 0.12 - group.rotation.x) *
        0.025;
      group.rotation.z += (0.15 + targetX - group.rotation.z) * 0.025;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function resume() {
    if (
      !frame &&
      !disposed &&
      !contextLost &&
      !paused() &&
      !document.hidden &&
      visible
    ) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersection = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    resume();
  });
  intersection.observe(canvas);
  host.addEventListener("motionchange", resume);
  let currentShape = view.shape;
  const changeView = () => {
    if (currentShape !== view.shape) {
      geometry.dispose();
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(wireVertices(view.shape), 3));
      geometry.computeBoundingSphere();
      sculpture.geometry = geometry;
      currentShape = view.shape;
    }
    group.rotation.y = .25 + elapsed * .16 + view.yaw;
    group.rotation.x = .7 + view.pitch + Math.sin(elapsed * .25) * .12;
    draw();
  };
  host.addEventListener("artchange", changeView);
  const appearance = matchMedia("(prefers-color-scheme: dark)");
  appearance.addEventListener("change", colors);
  document.addEventListener("visibilitychange", resume);
  window.addEventListener("pageshow", resume);
  canvas.addEventListener(
    "pointermove",
    (event) => {
      if (paused() || host.hasAttribute("data-interactive")) return;
      const rect = canvas.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width) * 0.2 - 0.1;
      targetY = ((event.clientY - rect.top) / rect.height) * 0.2 - 0.1;
    },
    { passive: true },
  );
  canvas.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    cancelAnimationFrame(frame);
    frame = 0;
    contextLost = true;
  });
  canvas.addEventListener("webglcontextrestored", () => {
    contextLost = false;
    colors();
    resize();
    resume();
  });
  window.addEventListener("pagehide", (event) => {
    cancelAnimationFrame(frame);
    frame = 0;
    if (event.persisted) return;
    disposed = true;
    resizeObserver.disconnect();
    intersection.disconnect();
    host.removeEventListener("motionchange", resume);
    host.removeEventListener("artchange", changeView);
    appearance.removeEventListener("change", colors);
    document.removeEventListener("visibilitychange", resume);
    window.removeEventListener("pageshow", resume);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  });
  canvas.dataset.renderer = "three-webgl";
  colors();
  resize();
  resume();
}

/** Equivalent living linework when WebGL is unavailable. No GPU required. */
function initSvgArt(host: HTMLElement, canvas: HTMLCanvasElement, view: ArtView) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 400 400");
  svg.setAttribute("class", "wire-art");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "緩慢呼吸與旋轉的幾何線稿");
  if (host.hasAttribute("data-interactive")) {
    svg.setAttribute("tabindex", "0");
    svg.setAttribute("aria-label", "幾何線稿。拖曳或使用方向鍵旋轉，Home 鍵回正。");
  }
  svg.dataset.renderer = "animated-svg";
  const path = document.createElementNS(ns, "path");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "var(--art)");
  path.setAttribute("stroke-width", "0.8");
  path.setAttribute("opacity", "0.85");
  svg.append(path);
  canvas.replaceWith(svg);
  let elapsed = 0,
    last = 0,
    frame = 0,
    visible = true,
    disposed = false;
  let targetX = 0,
    targetY = 0,
    tiltX = 0,
    tiltY = 0;
  const paused = () => host.classList.contains("paused");
  const draw = () => path.setAttribute("d", ribbonPath(elapsed, tiltX, tiltY + view.pitch, view.shape, view.yaw));
  function tick(now: number) {
    frame = 0;
    if (disposed || paused() || document.hidden || !visible) return;
    if (now - last >= 40) {
      const dt = Math.min((now - last) / 1000, 0.05);
      elapsed += dt;
      settleArtView(view, dt);
      last = now;
      tiltX += (targetX - tiltX) * 0.06;
      tiltY += (targetY - tiltY) * 0.06;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function resume() {
    if (!frame && !disposed && !paused() && !document.hidden && visible) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }
  const intersection = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    resume();
  });
  intersection.observe(svg);
  svg.addEventListener(
    "pointermove",
    (event) => {
      if (paused() || host.hasAttribute("data-interactive")) return;
      const rect = svg.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.35;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.35;
    },
    { passive: true },
  );
  svg.addEventListener("pointerleave", () => {
    targetX = targetY = 0;
  });
  host.addEventListener("motionchange", resume);
  host.addEventListener("artchange", draw);
  document.addEventListener("visibilitychange", resume);
  window.addEventListener("pageshow", resume);
  window.addEventListener("pagehide", (event) => {
    cancelAnimationFrame(frame);
    frame = 0;
    if (event.persisted) return;
    disposed = true;
    intersection.disconnect();
    host.removeEventListener("motionchange", resume);
    host.removeEventListener("artchange", draw);
    document.removeEventListener("visibilitychange", resume);
    window.removeEventListener("pageshow", resume);
  });
  draw();
  resume();
}
