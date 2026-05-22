# Test calculator analytics (local + GA4)

## Events tracked

| Event | When |
|-------|------|
| `calculator_view` | Calculator form loads |
| `zip_lookup_started` | User enters 5-digit ZIP |
| `zip_lookup_success` | City/county loaded |
| `zip_lookup_error` | ZIP API failed |
| `calculate_click` | User submits the form |
| `calculate_success` | HUD estimate returned |
| `calculate_error` | Calculate failed |
| `calculate_blocked` | Submit without ZIP lookup |
| `cta_calculator_*` | Clicks from home, nav, city, guide pages |

## Option A — Test now without Google (console only)

1. Restart dev server: `npm run dev`
2. Open http://localhost:4321/calculator/
3. Open browser **DevTools** → **Console** (F12)
4. Run through the funnel:
   - Enter ZIP `80204`
   - Wait for city/county
   - Income `28000`, household `3`, click **Calculate**
5. You should see lines like:

   ```
   [analytics] calculator_view { page_path: "/calculator/" }
   [analytics] zip_lookup_started { zip: "80204" }
   [analytics] zip_lookup_success { zip: "80204", state: "CO", ... }
   [analytics] calculate_click { ... }
   [analytics] calculate_success { ... }
   ```

6. Open a city page, click **Calculate for …** — see `cta_calculator_city` in console.

## Option B — Test with Google Analytics 4 (DebugView)

1. Create a GA4 property: https://analytics.google.com/
2. **Admin → Data streams → Web** → copy **Measurement ID** (`G-XXXXXXXX`)
3. Add to `.env`:

   ```env
   PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
   PUBLIC_GA_DEBUG=true
   ```

4. Restart `npm run dev`
5. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) (Chrome) or use GA4 **Admin → DebugView**
6. Use the calculator on localhost — events appear in **DebugView** within ~30 seconds

## Funnel math (after 2+ weeks live)

In GA4: **Explore → Funnel exploration**

Steps:

1. `calculator_view`
2. `zip_lookup_success`
3. `calculate_click`
4. `calculate_success`

Compare drop-off at each step to the estimates in your strategy doc.

## Production

Set `PUBLIC_GA_MEASUREMENT_ID` in Netlify environment variables. Set `PUBLIC_GA_DEBUG=false` for production.
