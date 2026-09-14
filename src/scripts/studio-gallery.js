const concepts = [
  {id:'interior',brand:'岩序',english:'YAN XU',image:'/demo-assets/interior-hero.png',alt:'室內設計概念素材：住宅與材質',category:'RESIDENTIAL / INTERIOR',eyebrow:'空間裡，留下生活。',title:'日常，自有風景。',copy:['一道光、一種材質。','慢慢靠近，喜歡的生活。'],name:'岩序室內設計',type:'空間 · 品牌形象',menu:'作品　 關於　 聯絡 ↗',bottom:'品牌網站概念',end:'SCROLL TO EXPLORE ↓'},
  {id:'clinic',brand:'晴禾牙醫',english:'QINGHE DENTAL',image:'/studio-assets/clinic-daylight.webp',alt:'AI 生成診所概念空間：自然採光、木質櫃體與牙科診療椅',category:'A LITTLE MORE AT EASE',eyebrow:'YOUR FIRST VISIT',title:'好好說明，\n安心看牙。',copy:['從第一次諮詢開始，','讓每一步照顧都清楚。'],name:'晴禾牙醫診所',type:'診所 · 初診體驗',menu:'診療項目　 初診指引 ↗',bottom:'一般牙科　／　家庭照護　／　初診指引',end:'認識晴禾 ↗'},
  {id:'ac',brand:'安峰',english:'AIR & LIVING',image:'/studio-assets/ac-living.webp',alt:'AI 生成冷氣概念情境：住宅內的壁掛式冷氣與自然採光',category:'COMFORT, INSTALLED WITH CARE.',eyebrow:'居家冷氣 · 安裝與保養',title:'家的舒適，\n從細節開始。',copy:['安裝前看懂空間，','完工後照顧日常。'],name:'安峰冷氣工程',type:'在地服務 · 詢價流程',menu:'服務項目　 施工流程　 詢價 ↗',bottom:'01 安裝規劃　　02 清洗保養　　03 維修檢查',end:'了解服務 ↗'}
];
const byId = id => document.getElementById(id);
const tabs = [...document.querySelectorAll('[data-select]')];
function selectConcept(index) {
  const item = concepts[index];
  if (!item) return;
  byId('concept-link').href = '/studio/demo/' + ['interior-design','dental-clinic','ac-service'][index];
  document.querySelector('.artboard').dataset.project = item.id;
  const brand = byId('sample-brand');
  const english = document.createElement('span');
  english.className = 'sample-english'; english.textContent = item.english;
  brand.replaceChildren(document.createTextNode(item.brand), english);
  byId('sample-image').src = item.image;
  byId('sample-image').alt = item.alt;
  byId('sample-category').textContent = item.category;
  byId('sample-eyebrow').textContent = item.eyebrow;
  byId('sample-title').textContent = item.title;
  byId('sample-copy').replaceChildren(document.createTextNode(item.copy[0]), document.createElement('br'), document.createTextNode(item.copy[1]));
  byId('caption-index').textContent = String(index+1).padStart(2,'0');
  document.querySelector('.image-index').textContent = String(index+1).padStart(2,'0');
  byId('caption-title').textContent = item.name;
  byId('caption-type').textContent = item.type;
  byId('sample-menu').textContent = item.menu;
  byId('sample-bottom').textContent = item.bottom;
  byId('sample-bottom-end').textContent = item.end;
  byId('gallery-status').textContent = `第 ${index+1} 件，共 3 件：${item.name}`;
  tabs.forEach((tab,i) => tab.setAttribute('aria-pressed',String(i===index)));
}
tabs.forEach(tab => tab.addEventListener('click', () => selectConcept(Number(tab.dataset.select))));
const requestedProject = new URLSearchParams(location.search).get('project');
const initialIndex = concepts.findIndex(item => item.id === requestedProject);
selectConcept(initialIndex >= 0 ? initialIndex : 0);
