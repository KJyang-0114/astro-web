import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { lastmodFor, nonIndexablePatterns } from './src/data/lastmod.mjs';

// 舊網址轉到新頁面。sitemap 不列這些網址。
const redirects = {
  '/studio/why-us': '/studio/about',
  '/studio/website-design-for-local-business': '/studio/services/local-business-website',
  '/studio/line-website-cta': '/studio/insights/small-business-hero-section-checklist',
  '/studio/vps-hosting-maintenance': '/studio/insights/website-care-after-launch',
  '/studio/demo-process': '/studio/work',
  '/studio/website-price-guide': '/studio/insights/why-website-prices-are-different',
  '/studio/insights/ai-website-vs-professional-build': '/studio/insights/do-i-need-a-website-with-ig-and-google-maps',
  '/studio/insights/mobile-line-cta-for-local-business': '/studio/insights/small-business-hero-section-checklist',
  '/studio/insights/domain-ownership-matters': '/studio/insights/website-care-after-launch',
  '/studio/insights/service-area-seo-basics': '/studio/insights/small-business-hero-section-checklist',
  '/studio/insights/demo-is-not-template': '/studio/work',
};
const redirectPaths = new Set(Object.keys(redirects));

export default defineConfig({
  site: 'https://kjyang0114.dev',
  base: '/',
  trailingSlash: 'ignore',
  compressHTML: true,
  redirects,

  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  },

  server: {
    host: true,
    port: 3000,
    open: false,
    allowedHosts: ['kjyang0114.dev', 'localhost', '127.0.0.1'],
  },

  preview: {
    host: true,
    port: 3000,
    open: false,
    allowedHosts: ['kjyang0114.dev', 'localhost', '127.0.0.1'],
  },

  vite: {
    build: {
      cssCodeSplit: true,
    },
    css: {
      devSourcemap: true,
    },
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        if (redirectPaths.has(path.replace(/\/$/, ''))) return false;
        return !nonIndexablePatterns.some((pattern) => pattern.test(path))
          && !/\.(?:txt|xml|json|md)$/.test(path)
          && !path.startsWith('/.well-known/');
      },
      serialize: (item) => {
        const url = new URL(item.url);
        if (url.pathname !== '/web-highlighter-pro/') {
          url.pathname = url.pathname.replace(/\/$/, '') || '/';
        }
        item.url = url.href;
        const lastmod = lastmodFor(url.pathname);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
});
