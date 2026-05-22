# Section 8 Calculator (Astro)

SEO-focused Section 8 Housing Choice Voucher calculator and guides.

## Features

- **Nationwide city directory**: ~31,900 SEO pages at `/section-8/[state]/[city]/` — program/voucher copy, guides grid, FAQ, calculator CTAs
- **ZIP-first location**: Enter ZIP → city & county dropdowns populated for confirmation
- **HUD API**: Income limits + Fair Market Rents (requires token)
- **Guides**: MDX content collection for long-tail SEO articles
- **Sitemap**: `@astrojs/sitemap` for discovery

## Setup

```bash
cd section8
npm install
npm run generate:places   # Downloads Census data → src/data/places/*.json (runs automatically before build)
cp .env.example .env
# Add HUD_API_TOKEN from https://www.huduser.gov/hudapi/public/register
npm run dev
```

City data is regenerated on every `npm run build` via the `prebuild` script.

## Deploy

Configured for **Netlify** (`@astrojs/netlify`). Set `HUD_API_TOKEN` in Netlify environment variables.

Update `site` in `astro.config.mjs` to your production domain before launch.

## SEO roadmap

1. Publish 20–50 guides (application, waiting list, porting, inspections, state/city pages)
2. Expand guides; city pages already live at `/section-8/`
3. Internal links: every guide → calculator; calculator → top guides
4. JSON-LD on calculator (`WebApplication`) and guides (`Article`)
5. Submit sitemap in Google Search Console

## Data notes

- ZIP → city via [Zippopotam](https://zippopotam.us); county via [FCC Census API](https://geo.fcc.gov/api/census/)
- County-level HUD `entityId` format: `{stateFips}{countyFips}99999`
- Metro/Small Area FMR areas may need ZIP-level HUD crosswalk in a later phase
