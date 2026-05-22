# Deploy Section 8 Calculator — GitHub + Netlify

## 1. Push to GitHub

From PowerShell:

```powershell
cd c:\Users\domai\tintshoproject\section8
```

If this is the first push, create a **new empty repository** on GitHub (no README/license — we already have files). Example name: `section8-calculator`.

Then:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub details.

## 2. Connect Netlify

1. Log in at [https://app.netlify.com](https://app.netlify.com)
2. **Add new site → Import an existing project → GitHub**
3. Authorize GitHub and select your `section8` repository
4. Build settings (should match `netlify.toml`):

   | Setting | Value |
   |---------|--------|
   | Build command | `npm run build` |
   | Publish directory | `dist` |
   | Node version | **22** (Site settings → Environment → `NODE_VERSION=22`) |

5. **Environment variables** (Site settings → Environment variables):

   | Key | Required | Notes |
   |-----|----------|--------|
   | `HUD_API_TOKEN` | Yes | From [HUD USER API](https://www.huduser.gov/hudapi/public/register) |
   | `PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics `G-XXXXXXXX` |
   | `PUBLIC_GA_DEBUG` | No | Set `false` in production |

6. **Deploy site**

The `prebuild` script downloads Census city data during each build, so the first deploy may take **3–5 minutes**.

## 3. Custom domain (optional)

Netlify → **Domain management** → add your domain → update DNS at your registrar.

Update `site` in `astro.config.mjs` to your real domain, then commit and push.

## 4. After deploy

- Open `https://YOUR-SITE.netlify.app/calculator/` and test ZIP `80204`
- [Google Search Console](https://search.google.com/search-console) → add property → submit `sitemap-index.xml`
- Apply for AdSense when you have privacy/about pages and steady content

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build runs out of memory | `NODE_OPTIONS=--max-old-space-size=6144` is in `netlify.toml` |
| Calculator API fails | Set `HUD_API_TOKEN` on Netlify and redeploy |
| Census download fails on build | Retry deploy; build needs outbound HTTPS to census.gov |
