import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kjyang0114.dev',
  base: '/',
  trailingSlash: 'ignore',
  compressHTML: true,

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
        return !/^\/studio\/(?:en\/)?demo(?:\/|$)/.test(path)
          && !/\.(?:txt|xml|json|md)$/.test(path)
          && !path.startsWith('/.well-known/');
      },
      serialize: (item) => {
        const url = new URL(item.url);
        if (url.pathname !== '/web-highlighter-pro/') {
          url.pathname = url.pathname.replace(/\/$/, '') || '/';
        }
        item.url = url.href;
        return item;
      },
    }),
  ],
});
