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
for (let t = 0; t < 60; t += 0.5) {
  const path = ribbonPath(t);
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

async function checkFallback(reducedMotion) {
  class Element {
    constructor() {
      this.listeners = {};
      this.attributes = {};
      this.dataset = {};
      this.children = [];
      this.classes = new Set();
      this.classList = {
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
  host.querySelector = (s) => (s === "canvas" ? canvas : control);
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
      return geometry.exports;
    },
    document,
    window,
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
console.log(
  "PASS: SVG fallback animates without WebGL; pause, reduced motion, visibility, offscreen, back navigation, teardown, and geometry bounds.",
);
