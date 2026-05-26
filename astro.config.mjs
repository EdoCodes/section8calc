// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import citySitemap from './src/integrations/city-sitemap.mjs';

export default defineConfig({
  site: 'https://section8calculator.com',
  output: 'static',
  adapter: netlify(),
  integrations: [sitemap(), mdx(), citySitemap()],
  build: {
    concurrency: 20,
  },
});
