// 導入GSAP和Lenis
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from '@studio-freight/lenis';

// 註冊GSAP插件
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 全局Lenis實例
let lenisInstance = null;

// 初始化Lenis平滑滾動
const initLenis = () => {
  // 如果已經有實例，先銷毀
  if (lenisInstance) {
    lenisInstance.destroy();
  }

  // 創建新實例，使用更絲滑的設置
  const lenis = new Lenis({
    duration: 0.8, // 減少過渡時間
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: true, // 在觸控設備上啟用平滑滾動
    touchMultiplier: 2,
    infinite: false,
    lerp: 0.1, // 降低 lerp 值以增加平滑度
  });

  // 將Lenis與GSAP的ScrollTrigger集成
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 讓ScrollTrigger使用Lenis的滾動位置
  lenis.on('scroll', ScrollTrigger.update);

  // 移除多餘的 GSAP ticker 調用，requestAnimationFrame 已處理
  // 儲存實例
  lenisInstance = lenis;
  
  return lenis;
};

// 頁面加載動畫 - 完全簡化版本
const initPageTransitions = () => {
  // 確保所有元素在開始時可見
  gsap.set('body', { visibility: 'visible', opacity: 1 });
  gsap.set(['nav', 'main'], { opacity: 1, y: 0, x: 0 });
  
  // 停止所有先前可能正在運行的動畫
  gsap.killTweensOf('*');
  
  // 返回一個不執行任何操作的timeline，讓其他代碼保持兼容性
  return gsap.timeline();
};

// 通用滾動動畫設置 - 極簡版
const initScrollAnimations = () => {
  // 使用GSAP的ScrollTrigger處理滾動動畫
  const animateElements = document.querySelectorAll('.fade-in, h1, h2, .section-title, .animate-on-scroll');
  
  // 清除任何現有觸發器，防止重複
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // 預設所有元素為可見狀態
  gsap.set([...animateElements, '.projects-grid > *', '.contact-container > *', '.hero-specialties > *'], { 
    opacity: 1, 
    y: 0,
    x: 0,
    clearProps: 'all'
  });
};

// 頁面切換處理器 - 完全無縫版本
const handlePageTransition = () => {
  // 創建頁面容器
  let pageCache = new Map(); // 用於緩存頁面內容
  let isTransitioning = false; // 防止重複點擊
  
  // 取消綁定之前的事件處理器
  document.querySelectorAll('nav a').forEach(link => {
    link.removeEventListener('click', handleLinkClick);
  });
  
  // 獲取所有導航連結並綁定事件
  document.querySelectorAll('nav a').forEach(link => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener('click', handleLinkClick);
    }
  });
  
  // 處理點擊事件
  async function handleLinkClick(e) {
    // 確保是網站內部連結且不是當前頁面
    const href = this.getAttribute('href');
    const currentUrl = window.location.pathname;
    
    // 如果點擊當前頁面或正在轉場中，則不執行動作
    if (href === currentUrl || isTransitioning || href.startsWith('#')) {
      return;
    }
    
    // 防止默認行為
    e.preventDefault();
    isTransitioning = true;
    
    // 確定滑動方向
    let direction;
    if (href.includes('/about')) {
      direction = 'right'; // 從右側滑入
    } else if (href.includes('/projects')) {
      direction = 'left'; // 從左側滑入
    } else if (href.includes('/contact')) {
      direction = 'bottom'; // 從底部滑入
    } else {
      direction = 'fade'; // 默認淡入淡出
    }
    
    // 主元素和容器
    const mainContent = document.querySelector('main');
    
    // 停止當前進行中的動畫
    gsap.killTweensOf(mainContent);
    
    try {
      // 預先載入新頁面內容
      const newContent = await getPageContent(href);
      
      // 創建包裝容器
      const wrapperContainer = document.createElement('div');
      wrapperContainer.style.position = 'fixed';
      wrapperContainer.style.top = '0';
      wrapperContainer.style.left = '0';
      wrapperContainer.style.width = '100%';
      wrapperContainer.style.height = '100%';
      wrapperContainer.style.zIndex = '999';
      wrapperContainer.style.pointerEvents = 'none';
      wrapperContainer.style.overflow = 'hidden';
      document.body.appendChild(wrapperContainer);
      
      // 克隆當前main內容作為離開的元素
      const exitingContent = mainContent.cloneNode(true);
      exitingContent.style.position = 'absolute';
      exitingContent.style.top = '0';
      exitingContent.style.left = '0';
      exitingContent.style.width = '100%';
      exitingContent.style.margin = '0';
      exitingContent.style.padding = mainContent.style.padding;
      exitingContent.style.background = 'transparent';
      wrapperContainer.appendChild(exitingContent);
      
      // 創建新的內容元素
      const enteringContent = document.createElement('main');
      enteringContent.innerHTML = newContent;
      enteringContent.style.position = 'absolute';
      enteringContent.style.top = '0';
      enteringContent.style.left = '0';
      enteringContent.style.width = '100%';
      enteringContent.style.margin = '0';
      enteringContent.style.padding = mainContent.style.padding;
      enteringContent.style.background = 'transparent';
      wrapperContainer.appendChild(enteringContent);
      
      // 設置起始位置 (新頁面開始在視口外)
      if (direction === 'right') {
        gsap.set(enteringContent, { x: '100%' });
      } else if (direction === 'left') {
        gsap.set(enteringContent, { x: '-100%' });
      } else if (direction === 'bottom') {
        gsap.set(enteringContent, { y: '100%' });
      } else {
        gsap.set(enteringContent, { opacity: 0 });
      }
      
      // 隱藏原始內容
      mainContent.style.opacity = '0';
      
      // 創建單一時間線動畫，同步執行
      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: 'power2.inOut' },
        onComplete: () => {
          // 更新原始內容
          mainContent.innerHTML = newContent;
          mainContent.style.opacity = '1';
          
          // 移除臨時容器
          document.body.removeChild(wrapperContainer);
          
          // 更新URL
          window.history.pushState({ path: href }, '', href);
          
          // 重置狀態
          isTransitioning = false;
          
          // 觸發內容更新事件
          window.dispatchEvent(new CustomEvent('content-updated'));
          
          // 後台預加載
          setTimeout(preloadNearbyPages, 500);
        }
      });
      
      // 執行同步滑動動畫
      if (direction === 'right') {
        tl.to(exitingContent, { x: '-70%', duration: 0.6 }, 0)
          .to(enteringContent, { x: '0%', duration: 0.6 }, 0);
      } else if (direction === 'left') {
        tl.to(exitingContent, { x: '70%', duration: 0.6 }, 0)
          .to(enteringContent, { x: '0%', duration: 0.6 }, 0);
      } else if (direction === 'bottom') {
        tl.to(exitingContent, { y: '-30%', duration: 0.6 }, 0)
          .to(enteringContent, { y: '0%', duration: 0.6 }, 0);
      } else {
        tl.to(exitingContent, { opacity: 0, duration: 0.3 }, 0)
          .to(enteringContent, { opacity: 1, duration: 0.3 }, 0.15);
      }
    } catch (error) {
      console.error('頁面加載失敗:', error);
      isTransitioning = false;
      window.location.href = href;
    }
  }
  
  // 獲取頁面內容（從緩存或網絡）
  async function getPageContent(url) {
    if (pageCache.has(url)) {
      console.log('從緩存讀取頁面:', url);
      return pageCache.get(url);
    } else {
      console.log('正在加載頁面:', url);
      const response = await fetch(url);
      const text = await response.text();
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text;
      
      const mainContent = tempDiv.querySelector('main').innerHTML;
      pageCache.set(url, mainContent);
      return mainContent;
    }
  }
  
  // 預加載相鄰頁面
  function preloadNearbyPages() {
    const pages = ['/about', '/projects', '/contact', '/'];
    const currentPath = window.location.pathname;
    
    // 過濾掉當前頁面
    const pagesToLoad = pages.filter(page => {
      return page !== currentPath && 
             (page === '/' ? currentPath !== '/index' && currentPath !== '/index.html' : true);
    });
    
    // 對每個相鄰頁面，如果尚未緩存，則預加載
    pagesToLoad.forEach(async (page) => {
      if (!pageCache.has(page)) {
        try {
          const response = await fetch(page);
          const text = await response.text();
          
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = text;
          
          const mainContent = tempDiv.querySelector('main').innerHTML;
          pageCache.set(page, mainContent);
          console.log('預加載頁面完成:', page);
        } catch (e) {
          console.error('預加載頁面失敗:', page, e);
        }
      }
    });
  }
  
  // 處理瀏覽器的前進/後退按鈕
  window.addEventListener('popstate', async (e) => {
    const currentUrl = window.location.pathname;
    const mainContent = document.querySelector('main');
    
    // 避免在轉場中處理popstate
    if (isTransitioning) return;
    isTransitioning = true;
    
    try {
      // 停止進行中的動畫
      gsap.killTweensOf(mainContent);
      
      // 獲取頁面內容
      const newContent = await getPageContent(currentUrl);
      
      // 創建包裝容器
      const wrapperContainer = document.createElement('div');
      wrapperContainer.style.position = 'fixed';
      wrapperContainer.style.top = '0';
      wrapperContainer.style.left = '0';
      wrapperContainer.style.width = '100%';
      wrapperContainer.style.height = '100%';
      wrapperContainer.style.zIndex = '999';
      wrapperContainer.style.pointerEvents = 'none';
      wrapperContainer.style.overflow = 'hidden';
      document.body.appendChild(wrapperContainer);
      
      // 克隆當前main內容作為離開的元素
      const exitingContent = mainContent.cloneNode(true);
      exitingContent.style.position = 'absolute';
      exitingContent.style.top = '0';
      exitingContent.style.left = '0';
      exitingContent.style.width = '100%';
      exitingContent.style.margin = '0';
      exitingContent.style.padding = mainContent.style.padding;
      exitingContent.style.background = 'transparent';
      wrapperContainer.appendChild(exitingContent);
      
      // 創建新的內容元素
      const enteringContent = document.createElement('main');
      enteringContent.innerHTML = newContent;
      enteringContent.style.position = 'absolute';
      enteringContent.style.top = '0';
      enteringContent.style.left = '0';
      enteringContent.style.width = '100%';
      enteringContent.style.margin = '0';
      enteringContent.style.padding = mainContent.style.padding;
      enteringContent.style.background = 'transparent';
      
      // 設置起始位置
      gsap.set(enteringContent, { x: '100%' });
      wrapperContainer.appendChild(enteringContent);
      
      // 隱藏原始內容
      mainContent.style.opacity = '0';
      
      // 創建滑動動畫
      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: 'power2.inOut' },
        onComplete: () => {
          // 更新原始內容
          mainContent.innerHTML = newContent;
          mainContent.style.opacity = '1';
          
          // 移除臨時容器
          document.body.removeChild(wrapperContainer);
          
          // 重置狀態
          isTransitioning = false;
          
          // 觸發內容更新事件
          window.dispatchEvent(new CustomEvent('content-updated'));
        }
      });
      
      // 執行滑動動畫
      tl.to(exitingContent, { x: '-70%', duration: 0.6 }, 0)
        .to(enteringContent, { x: '0%', duration: 0.6 }, 0);
      
    } catch (error) {
      console.error('處理popstate時出錯:', error);
      isTransitioning = false;
      window.location.reload();
    }
  });
  
  // 初始加載時的動畫
  const mainContent = document.querySelector('main');
  if (mainContent) {
    const currentPath = window.location.pathname;
    
    // 將當前頁面加入緩存
    pageCache.set(currentPath, mainContent.innerHTML);
    
    // 根據當前頁面路徑決定動畫
    if (currentPath.includes('/about')) {
      gsap.fromTo(mainContent, 
        { x: '-20%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power1.inOut' }
      );
    } else if (currentPath.includes('/projects')) {
      gsap.fromTo(mainContent, 
        { x: '20%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power1.inOut' }
      );
    } else if (currentPath.includes('/contact')) {
      gsap.fromTo(mainContent, 
        { y: '20%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, ease: 'power1.inOut' }
      );
    } else {
      gsap.fromTo(mainContent, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power1.inOut' }
      );
    }
    
    // 預加載其他頁面
    setTimeout(preloadNearbyPages, 1000);
  }
};

// 初始化新頁面上的互動元素
function initNewPageElements() {
  // 重新綁定事件監聽器
  const scrollHint = document.getElementById('scroll-hint');
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        scrollHint.classList.add('hidden');
      } else {
        scrollHint.classList.remove('hidden');
      }
    });
  }
  
  // 重新初始化任何需要的組件
  initScrollAnimations();
  
  // 觸發自定義事件，以便其他腳本可以響應頁面更新
  window.dispatchEvent(new Event('page-content-loaded'));
}

// 滾動到頁面特定部分 - 調整滾動速度
const scrollTo = (target, offset = 0) => {
  const element = document.querySelector(target);
  if (element) {
    gsap.to(window, {
      duration: 1, // 更平滑的滾動
      ease: 'power2.inOut',
      scrollTo: {
        y: element,
        offsetY: offset
      }
    });
  }
};

export { initLenis, initPageTransitions, initScrollAnimations, scrollTo, handlePageTransition }; 