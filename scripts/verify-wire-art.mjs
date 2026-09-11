import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const compile = (path) =>
  ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
const geometry = { exports: {} };
vm.runInNewContext(compile("src/scripts/wire-geometry.ts"), geometry);
const { ribbonPath } = geometry.exports;
for (const shape of ["ribbon", "orbit", "wave"]) for (let t = 0; t < 60; t += 0.5) {
  const path = ribbonPath(t, 0, 0, shape);
  assert.equal((path.match(/M/g) || []).length, 32);
  assert.doesNotMatch(path, /NaN|Infinity/);
  const coords = path.match(/-?\d+\.\d+/g).map(Number);
  assert.ok(
    coords.every((n) => n > 0 && n < 400),
    "sculpture stays within viewBox",
  );
}
assert.notEqual(ribbonPath(0), ribbonPath(1), "movement over time");
assert.notEqual(
  ribbonPath(0),
  ribbonPath(0, 0.1, 0.1),
  "pointer changes projection",
);

async function checkFallback(reducedMotion, interactive = false) {
  class Element {
    constructor() {
      this.listeners = {};
      this.attributes = {};
      this.dataset = {};
      this.children = [];
      this.classes = new Set();
      this.classList = {
        add: k => this.classes.add(k),
        remove: k => this.classes.delete(k),
        contains: (k) => this.classes.has(k),
        toggle: (k, on) => (on ? this.classes.add(k) : this.classes.delete(k)),
      };
    }
    addEventListener(k, fn) {
      (this.listeners[k] ??= []).push(fn);
    }
    removeEventListener(k, fn) {
      this.listeners[k] = (this.listeners[k] || []).filter((f) => f !== fn);
    }
    dispatchEvent(e) {
      for (const fn of this.listeners[e.type] || []) fn(e);
    }
    setAttribute(k, v) {
      this.attributes[k] = v;
    }
    hasAttribute(k) { return k in this.attributes; }
    closest(selector) { return selector === ".wire-art" && this.attributes.class === "wire-art" ? this : null; }
    setPointerCapture(id) { this.captured = id; }
    append(e) {
      this.children.push(e);
    }
    replaceWith(e) {
      this.replacement = e;
    }
    getBoundingClientRect() {
      return { left: 0, top: 0, width: 400, height: 400 };
    }
  }
  const host = new Element(),
    canvas = new Element(),
    control = new Element();
  const reset = new Element();
  const shapes = ["ribbon", "orbit", "wave"].map(shape => {const el = new Element();el.dataset.artShape=shape;return el});
  host.querySelector = s => s === "canvas" ? canvas : s === "[data-art-reset]" ? reset : control;
  host.querySelectorAll = () => shapes;
  if (interactive) host.setAttribute("data-interactive", "true");
  const document = new Element();
  document.querySelectorAll = () => [host];
  document.createElementNS = () => new Element();
  document.hidden = false;
  const window = new Element();
  let frames = new Map(),
    serial = 0,
    now = 0;
  const observers = [];
  class IntersectionObserver {
    constructor(fn) {
      this.fn = fn;
      observers.push(this);
    }
    observe() {
      this.fn([{ isIntersecting: true }]);
    }
    disconnect() {}
  }
  const context = {
    exports: {},
    require: (name) => {
      if (name === "three") throw Error("WebGL unavailable");
      if (name === "./wire-controls") return controls;
      return geometry.exports;
    },
    document,
    window,
    Element,
    matchMedia: () => ({ matches: reducedMotion, addEventListener() {} }),
    IntersectionObserver,
    Event: class {
      constructor(type) {
        this.type = type;
      }
    },
    performance: { now: () => now },
    requestAnimationFrame: (fn) => {
      frames.set(++serial, fn);
      return serial;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
  };
  vm.runInNewContext(compile("src/scripts/wire-controls.ts"), context);
  const controls = context.exports;
  context.exports = {};
  vm.runInNewContext(compile("src/scripts/wire-art.ts"), context);
  await new Promise((resolve) => setImmediate(resolve));
  const svg = canvas.replacement;
  assert.equal(svg.dataset.renderer, "animated-svg");
  assert.ok(!control.disabled, "fallback remains playable");
  const path = svg.children[0];
  const initial = path.attributes.d;
  function advance() {
    now += 50;
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((fn) => fn(now));
  }
  advance();
  if (reducedMotion) {
    assert.equal(path.attributes.d, initial, "reduced motion starts still");
    control.dispatchEvent({ type: "click" });
    advance();
  }
  assert.notEqual(path.attributes.d, initial, "fallback animates");
  control.dispatchEvent({ type: "click" });
  const paused = path.attributes.d;
  advance();
  assert.equal(path.attributes.d, paused, "pause freezes shape");
  if (interactive) {
    assert.equal(svg.attributes.tabindex, "0", "SVG is keyboard reachable");
    shapes[1].dispatchEvent({type:"click"});
    assert.notEqual(path.attributes.d, paused, "shape switches even while paused");
    assert.equal(shapes[1].attributes["aria-pressed"], "true");
    assert.equal(shapes[0].attributes["aria-pressed"], "false");
    const orbit = path.attributes.d;
    host.dispatchEvent({type:"pointerdown",target:svg,button:0,pointerId:1,clientX:100,clientY:100});
    host.dispatchEvent({type:"pointermove",target:host,pointerId:1,clientX:150,clientY:125});
    assert.notEqual(path.attributes.d, orbit, "drag rotates paused view");
    host.dispatchEvent({type:"pointerup"});
    reset.dispatchEvent({type:"click"});
    assert.equal(path.attributes.d, orbit, "reset restores initial angle");
    host.dispatchEvent({type:"keydown",target:svg,key:"ArrowRight",preventDefault(){}});
    assert.notEqual(path.attributes.d, orbit, "keyboard rotates");
    host.dispatchEvent({type:"keydown",target:svg,key:"Home",preventDefault(){}});
    assert.equal(path.attributes.d, orbit, "Home resets");
    shapes[2].dispatchEvent({type:"click"});
    assert.notEqual(path.attributes.d, orbit, "wave differs from orbit");
  }
  control.dispatchEvent({ type: "click" });
  advance();
  assert.notEqual(path.attributes.d, paused, "play resumes");
  document.hidden = true;
  advance();
  assert.equal(frames.size, 0, "hidden tab stops frames");
  document.hidden = false;
  document.dispatchEvent({ type: "visibilitychange" });
  advance();
  assert.equal(frames.size, 1);
  observers.at(-1).fn([{ isIntersecting: false }]);
  advance();
  assert.equal(frames.size, 0, "offscreen stops frames");
  observers.at(-1).fn([{ isIntersecting: true }]);
  advance();
  assert.equal(frames.size, 1);
  window.dispatchEvent({ type: "pagehide", persisted: true });
  assert.equal(frames.size, 0);
  window.dispatchEvent({ type: "pageshow" });
  advance();
  assert.equal(frames.size, 1, "back navigation resumes");
  window.dispatchEvent({ type: "pagehide", persisted: false });
  assert.equal(frames.size, 0, "teardown stops frames");
}
await checkFallback(false);
await checkFallback(true);
await checkFallback(false, true);
await checkFallback(true, true);
console.log(
  "PASS: SVG fallback animates without WebGL; pause, reduced motion, visibility, offscreen, back navigation, teardown, and geometry bounds.",
);
