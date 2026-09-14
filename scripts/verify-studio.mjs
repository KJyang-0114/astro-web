import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
const files = dir => readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(join(dir,x.name)):[join(dir,x.name)]);
const pages=files('dist/studio').filter(x=>x.endsWith('.html'));
for(const file of pages){
 const html=readFileSync(file,'utf8');
 assert.equal((html.match(/<main(?:\s|>)/g)||[]).length,1,`${file}: main`);
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: h1`);
 assert.doesNotMatch(html,/design-review|localhost|127\.0\.0\.1|尚未發布/);
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(!url.startsWith('/')||url.startsWith('//'))continue;
  const parsed=new URL(url,'https://kjyang0114.dev');
  const path=join('dist',decodeURIComponent(parsed.pathname));
  assert.ok(existsSync(path)||existsSync(join(path,'index.html')),`${file}: missing ${url}`);
 }
 for(const [,json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(json);
}
for(const slug of ['ac-service','dental-clinic','interior-design','tutoring-center']){
 const html=readFileSync(`dist/studio/demo/${slug}/index.html`,'utf8');
 assert.match(html,/noindex/);assert.match(html,/data-concept-form/);
 assert.doesNotMatch(html,/fake-phone|tel:|HVACBusiness|Dentist/);
 for(const id of ['services','journey','questions','inquiry'])assert.ok(html.includes(`id="${id}"`));
}
// Exercise the actual gallery script without a browser.
const nodes=new Map();
const node=()=>({dataset:{},attrs:{},listeners:{},setAttribute(k,v){this.attrs[k]=v},replaceChildren(...children){this.children=children},addEventListener(k,fn){this.listeners[k]=fn}});
const get=id=>{if(!nodes.has(id))nodes.set(id,node());return nodes.get(id)};
const tabs=[0,1,2].map(i=>Object.assign(node(),{dataset:{select:String(i)}}));
const context={document:{getElementById:get,querySelector:get,querySelectorAll:()=>tabs,createElement:node,createTextNode:text=>({text})},location:{search:''},URLSearchParams};
vm.runInNewContext(readFileSync('src/scripts/studio-gallery.js','utf8'),context);
for(let i=0;i<3;i++){
 tabs[i].listeners.click();
 assert.equal(get('concept-link').href,`/studio/demo/${['interior-design','dental-clinic','ac-service'][i]}`);
 assert.ok(existsSync(join('public',get('sample-image').src)));
 assert.equal(tabs.filter(t=>t.attrs['aria-pressed']==='true').length,1);
 assert.equal(tabs[i].attrs['aria-pressed'],'true');
}
console.log(`PASS: ${pages.length} Studio pages, assets, concept safeguards, and all gallery selections.`);
