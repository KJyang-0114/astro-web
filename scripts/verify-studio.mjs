import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const files = dir => readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(join(dir,x.name)):[join(dir,x.name)]);
const pages=files('dist/studio').filter(x=>x.endsWith('.html'));
const isRedirect = html => /<meta http-equiv="refresh"/i.test(html) && !/<main(?:\s|>)/.test(html);
const visibleText = html => html
  .replace(/<script[\s\S]*?<\/script>/g,' ')
  .replace(/<style[\s\S]*?<\/style>/g,' ')
  .replace(/<head[\s\S]*?<\/head>/g,' ')
  .replace(/<[^>]+>/g,' ')
  .replace(/&[a-z#0-9]+;/g,' ')
  .replace(/\s+/g,' ');

// Writing rules from docs/studio-writing-guide.md. Demo pages and English pages are exempt.
const banned = [
  [/不是[^，。？！、「」\s]{1,18}[，、]\s?(?:而)?是/, '「不是 X，是 Y」句型'],
  [/用心|打造|賦能|質感|溫度|一站式|量身訂做|每一步|好好/, '空泛形容詞'],
  [/結構化資料|讓\s?AI\s?更容易|讓搜尋和\s?AI/, '對讀者講後台的話'],
  [/SELECTED DIRECTIONS|LET’S MAKE IT YOURS|LET'S MAKE IT YOURS|FORM \/ FUNCTION/, '裝飾英文標籤'],
];
let redirects=0, checked=0;
for(const file of pages){
 const html=readFileSync(file,'utf8');
 if(isRedirect(html)){redirects++;continue;}
 assert.equal((html.match(/<main(?:\s|>)/g)||[]).length,1,`${file}: main`);
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: h1`);
 assert.doesNotMatch(html,/design-review|localhost|127\.0\.0\.1|尚未發布/);
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(!url.startsWith('/')||url.startsWith('//'))continue;
  const parsed=new URL(url,'https://kjyang0114.dev');
  const path=join('dist',decodeURIComponent(parsed.pathname));
  assert.ok(existsSync(path)||existsSync(join(path,'index.html')),`${file}: missing ${url}`);
 }
 for(const [,json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
  const data=JSON.parse(json);
  if(data['@type']==='FAQPage')for(const q of data.mainEntity)assert.doesNotMatch(q.acceptedAnswer.text,/KJyang Studio/,`${file}: FAQ answer speaks in third person: ${q.name}`);
 }
 if(/dist\/studio\/(en|demo)(\/|$)/.test(file))continue;
 const text=visibleText(html);
 for(const [re,label] of banned){
  const hit=text.match(re);
  assert.ok(!hit,`${file}: ${label} → 「${hit && text.slice(Math.max(0,hit.index-20),hit.index+40)}」`);
 }
 checked++;
}
for(const slug of ['ac-service','dental-clinic','interior-design','tutoring-center']){
 const html=readFileSync(`dist/studio/demo/${slug}/index.html`,'utf8');
 assert.match(html,/noindex/);assert.match(html,/data-concept-form/);
 assert.doesNotMatch(html,/fake-phone|tel:|HVACBusiness|Dentist/);
 for(const id of ['services','journey','questions','inquiry'])assert.ok(html.includes(`id="${id}"`));
}

// Homepage: first screen must say what, where, how much, and how to reach me.
const home=readFileSync('dist/studio/index.html','utf8');
const hero=home.match(/<section class="s-hero"[\s\S]*?<\/section>/)?.[0];
assert.ok(hero,'homepage hero');
const heroText=visibleText(hero);
for(const needle of ['網站','北部','NT$','LINE'])assert.ok(heroText.includes(needle),`homepage hero mentions ${needle}`);
assert.match(hero,/data-cta="hero-line"/);
assert.match(home,/href="\/studio\/work\/spa-booking-system"/,'homepage links the real case');

// Retired URLs must still resolve (as redirects).
for(const old of ['why-us','line-website-cta','demo-process','website-price-guide','vps-hosting-maintenance','insights/mobile-line-cta-for-local-business','insights/demo-is-not-template']){
 const p=`dist/studio/${old}/index.html`;
 assert.ok(existsSync(p),`redirect exists for /studio/${old}`);
 assert.ok(isRedirect(readFileSync(p,'utf8')),`/studio/${old} is a redirect`);
}
console.log(`PASS: ${pages.length-redirects} Studio pages (${checked} tone-checked), ${redirects} redirects, demo safeguards, homepage first screen.`);
