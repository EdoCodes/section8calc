# City articles (high-traffic enrichment)

Add **optional** long-form content for specific city pages. Cities **without** a file here keep the default template only.

Files live in:

- English: `src/content/city-articles/`
- Spanish: `src/content/city-articles-es/`

## URL slugs

Match the city directory URLs:

| Page URL | `stateSlug` | `citySlug` |
|----------|-------------|------------|
| `/section-8/ca/torrance/` | `ca` | `torrance` |
| `/section-8/ny/new-york/` | `ny` | `new-york` |

Find slugs on any state page or in `src/data/places/{STATE}.json`.

## Add an article

1. Copy `_example-torrance.mdx` to a new file, e.g. `ca-los-angeles.mdx` (filename is for your reference only).
2. Set frontmatter `stateSlug`, `citySlug`, `title`, and body in MDX.
3. Set `draft: false` when ready to publish.
4. Run `npm run dev` and open `/section-8/{state}/{city}/`.

Spanish: same slugs under `src/content/city-articles-es/`.

## Multiple articles per city

Use several files with the **same** `stateSlug` + `citySlug`. Set `order: 0`, `order: 1`, etc. (lower = higher on page).

## SEO fields (optional)

On the **primary** article (`order: 0`):

- `seoTitle` — custom `<title>` for the city page
- `seoDescription` — custom meta description
- `description` — used as meta description if `seoDescription` is omitted

## Extra FAQ

Add city-specific Q&A in frontmatter `extraFaq` (appended to the template FAQ + JSON-LD).

## What you send us

Plain text or Google Doc is fine. We paste into MDX using this template. Include:

- PHA name(s) and links if known
- Waiting list status (open/closed, last opened)
- Local payment standard notes (if you have them)
- Anything renters in that city search for
