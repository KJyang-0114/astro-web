import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const script = readFileSync(new URL("../src/scripts/resume-language.js", import.meta.url), "utf8");
function resolve(path, languages, saved, blocked = false) {
  let redirected = null;
  let preference = saved;
  runInNewContext(script, {
    URL,
    window: { location: { href: `https://kjyang0114.dev${path}`, replace: url => { redirected = new URL(url).pathname + new URL(url).search + new URL(url).hash; } } },
    navigator: { languages, language: languages?.[0] },
    localStorage: {
      getItem: () => { if (blocked) throw Error("Storage blocked"); return preference; },
      setItem: (_, value) => { if (blocked) throw Error("Storage blocked"); preference = value; },
    },
  });
  return { redirected, preference };
}
assert.equal(resolve("/resume", ["en-US"]).redirected, "/en/resume");
assert.equal(resolve("/resume/", ["zh-TW", "en-US"]).redirected, null);
assert.equal(resolve("/resume", ["zh-CN"]).redirected, null);
assert.equal(resolve("/resume", ["ja-JP"]).redirected, "/en/resume");
assert.equal(resolve("/resume", ["en-US"], "zh-Hant").redirected, null);
assert.equal(resolve("/resume?lang=zh-Hant", ["en-US"], "en").preference, "zh-Hant");
assert.equal(resolve("/resume?lang=zh-Hant", ["en-US"], "en", true).redirected, null);
assert.equal(resolve("/en/resume?lang=en", ["zh-TW"], "zh-Hant").preference, "en");
assert.equal(resolve("/en/resume", ["zh-TW"], "zh-Hant").redirected, null);
assert.equal(resolve("/resume?ref=email#experience", ["en-US"], null, true).redirected, "/en/resume?ref=email#experience");
assert.equal(resolve("/resume", [], "invalid").redirected, null);
assert.equal(resolve("/about", ["en-US"]).redirected, null);
console.log("PASS: resume language detection, explicit links, saved choices, blocked storage, and query/hash preservation.");
