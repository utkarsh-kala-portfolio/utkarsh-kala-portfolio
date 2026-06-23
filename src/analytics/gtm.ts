/**
 * Google Tag Manager — Data Layer utilities
 *
 * GTM is the single orchestrator for GA4, Microsoft Clarity,
 * and any future marketing pixels. All custom events are pushed
 * to `window.dataLayer` so GTM triggers can fire the right tags.
 */

// Extend Window to include dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/** Ensure dataLayer exists (GTM snippet also initialises it, but belt-and-suspenders) */
export function initDataLayer(): void {
  window.dataLayer = window.dataLayer || [];
}

/**
 * Push a custom event into the GTM dataLayer.
 * GA4 tags inside GTM should be configured to fire on these event names.
 */
export function pushToDataLayer(
  event: string,
  params: Record<string, unknown> = {}
): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
