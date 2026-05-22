// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Update `site` to your production domain before launch.
export default defineConfig({
  site: 'https://section8calculator.com',
  output: 'static',
  adapter: netlify(),
  integrations: [sitemap(), mdx()],
});
