/**
 * Mixpanel — Direct SDK integration
 *
 * Mixpanel is loaded directly in the website code (not via GTM)
 * for richer user-level analytics, funnels, and cohort analysis.
 */

import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = "2c5c3053f1418586942a39e40221f937";

let isInitialised = false;

export function initMixpanel(): void {
  if (isInitialised) return;

  mixpanel.init(MIXPANEL_TOKEN, {
    // Send data to EU servers if needed; default is US
    track_pageview: false, // We handle page views manually for SPA routing
    persistence: "localStorage",
    ignore_dnt: false, // Respect Do Not Track
  });

  isInitialised = true;
}

/**
 * Track a named event in Mixpanel with optional properties.
 */
export function trackMixpanel(
  event: string,
  properties: Record<string, unknown> = {}
): void {
  if (!isInitialised) return;
  mixpanel.track(event, properties);
}

/**
 * Identify a user (optional — call if you ever add auth).
 */
export function identifyMixpanel(userId: string): void {
  if (!isInitialised) return;
  mixpanel.identify(userId);
}

/**
 * Set super-properties that attach to every future event.
 */
export function setSuperProperties(
  props: Record<string, unknown>
): void {
  if (!isInitialised) return;
  mixpanel.register(props);
}
