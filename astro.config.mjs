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
      i18n: {
        defaultLocale: 'zh-TW',
        locales: { 'zh-TW': 'zh-TW' },
      },
    }),
  ],
});