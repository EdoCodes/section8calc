/**
 * Astro integration that generates sitemap XML files for all SSR city/state
 * pages so search engines can discover them even though they aren't pre-rendered.
 *
 * Produces:
 *   dist/sitemap-cities-0.xml … sitemap-cities-N.xml  (max 50 000 URLs each)
 *   and patches the existing sitemap-index.xml to include them.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const MAX_URLS_PER_FILE = 50_000;
const SITE = 'https://section8calculator.com';

function buildCityUrls(dataDir) {
  const statesFile = join(dataDir, 'states.json');
  const states = JSON.parse(readFileSync(statesFile, 'utf-8'));
  const placesDir = join(dataDir, 'places');
  const urls = [];

  for (const state of states) {
    urls.push(`${SITE}/section-8/${state.slug}/`);
    urls.push(`${SITE}/es/section-8/${state.slug}/`);

    const file = join(placesDir, `${state.abbr}.json`);
    let places;
    try {
      places = JSON.parse(readFileSync(file, 'utf-8'));
    } catch {
      continue;
    }

    for (const place of places) {
      urls.push(`${SITE}/section-8/${state.slug}/${place.slug}/`);
      urls.push(`${SITE}/es/section-8/${state.slug}/${place.slug}/`);
    }
  }

  return urls;
}

function toSitemapXml(urls) {
  const entries = urls
    .map((u) => `<url><loc>${u}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`)
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
}

function patchIndex(distDir, newFiles) {
  const indexPath = join(distDir, 'sitemap-index.xml');
  let xml;
  try {
    xml = readFileSync(indexPath, 'utf-8');
  } catch {
    const sitemaps = newFiles
      .map((f) => `<sitemap><loc>${SITE}/${f}</loc></sitemap>`)
      .join('');
    xml = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}</sitemapindex>`;
    writeFileSync(indexPath, xml, 'utf-8');
    return;
  }

  const extra = newFiles
    .map((f) => `<sitemap><loc>${SITE}/${f}</loc></sitemap>`)
    .join('');
  xml = xml.replace('</sitemapindex>', `${extra}</sitemapindex>`);
  writeFileSync(indexPath, xml, 'utf-8');
}

export default function citySitemap() {
  let srcDataDir;
  let distDir;

  return {
    name: 'city-sitemap',
    hooks: {
      'astro:config:done': ({ config }) => {
        const root = config.root?.pathname?.replace(/\/$/, '') ?? process.cwd();
        const cleanRoot = root.replace(/^\/([A-Z]:)/, '$1');
        srcDataDir = join(cleanRoot, 'src', 'data');
        distDir = config.outDir?.pathname?.replace(/\/$/, '') ?? join(cleanRoot, 'dist');
        distDir = distDir.replace(/^\/([A-Z]:)/, '$1');
      },
      'astro:build:done': () => {
        console.log('[city-sitemap] Generating city sitemaps…');
        const urls = buildCityUrls(srcDataDir);
        console.log(`[city-sitemap] ${urls.length.toLocaleString()} city/state URLs found.`);

        const chunks = [];
        for (let i = 0; i < urls.length; i += MAX_URLS_PER_FILE) {
          chunks.push(urls.slice(i, i + MAX_URLS_PER_FILE));
        }

        const fileNames = [];
        for (let i = 0; i < chunks.length; i++) {
          const name = `sitemap-cities-${i}.xml`;
          writeFileSync(join(distDir, name), toSitemapXml(chunks[i]), 'utf-8');
          fileNames.push(name);
          console.log(`[city-sitemap] Wrote ${name} (${chunks[i].length.toLocaleString()} URLs)`);
        }

        patchIndex(distDir, fileNames);
        console.log('[city-sitemap] Patched sitemap-index.xml ✓');
      },
    },
  };
}
