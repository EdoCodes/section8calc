/** Calculator funnel + CTA events (GA4 via gtag when configured). */

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  const clean: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) clean[key] = value;
  }

  if (import.meta.env.DEV) {
    console.info('[analytics]', eventName, clean);
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, clean);
  }
}
