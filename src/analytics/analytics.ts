/**
 * Unified Analytics Layer
 *
 * Architecture:
 *   Website → GTM (manages GA4 + Clarity + Marketing Pixels)
 *   Website → Mixpanel SDK (direct)
 *
 * Every `trackEvent` call pushes to BOTH:
 *   1. GTM dataLayer → picked up by GA4 tags + any future tags
 *   2. Mixpanel SDK → direct event tracking
 *
 * This ensures a single call site in component code covers all platforms.
 *
 * ─── Owner Opt-Out ──────────────────────────────────────────────
 * To exclude your own devices from tracking, open the browser console
 * on each device/browser and run:
 *
 *   localStorage.setItem('uk_disable_tracking', 'true')
 *
 * Or simply visit any page with ?disable_tracking=true in the URL.
 * To re-enable tracking later:
 *
 *   localStorage.removeItem('uk_disable_tracking')
 */

import { initDataLayer, pushToDataLayer } from "./gtm";
import { initMixpanel, trackMixpanel } from "./mixpanel";

const OPT_OUT_KEY = "uk_disable_tracking";

/** Check URL params and persist opt-out flag if present */
function processOptOutParam(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("disable_tracking") === "true") {
      localStorage.setItem(OPT_OUT_KEY, "true");
    } else if (params.get("disable_tracking") === "false") {
      localStorage.removeItem(OPT_OUT_KEY);
    }
  } catch {
    // Private browsing or localStorage unavailable — ignore
  }
}

/** Returns true when the current visitor is the site owner (opted out) */
function isOwnerOptedOut(): boolean {
  try {
    return localStorage.getItem(OPT_OUT_KEY) === "true";
  } catch {
    return false;
  }
}

// ─── Initialisation ─────────────────────────────────────────────
export function initAnalytics(): void {
  // Always check URL params first (lets you set the flag via link)
  processOptOutParam();

  // Skip all analytics init for opted-out users
  if (isOwnerOptedOut()) return;

  initDataLayer();
  initMixpanel();
}

// ─── Unified Event Tracking ─────────────────────────────────────
export function trackEvent(
  eventName: string,
  properties: Record<string, unknown> = {}
): void {
  // Silently suppress all tracking for opted-out users
  if (isOwnerOptedOut()) return;

  // 1. Push to GTM dataLayer (→ GA4 + Clarity + Pixels)
  pushToDataLayer(eventName, properties);

  // 2. Push to Mixpanel directly
  trackMixpanel(eventName, properties);
}

// ─── Pre-defined Event Helpers ──────────────────────────────────

/** Fired on every React Router navigation */
export function trackPageView(path: string, title: string): void {
  trackEvent("page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

/** Contact modal opened */
export function trackContactOpen(
  contactType: string,
  source: string
): void {
  trackEvent("contact_open", {
    contact_type: contactType,
    source,
    page_path: window.location.pathname,
  });
}

/** Contact form submitted (WhatsApp / Email) */
export function trackContactSubmit(
  contactType: string,
  topic: string
): void {
  trackEvent("contact_submit", {
    contact_type: contactType,
    topic,
    page_path: window.location.pathname,
  });
}

/** Outbound link click (LinkedIn, phone, external) */
export function trackOutboundClick(
  label: string,
  url: string,
  source: string
): void {
  trackEvent("outbound_click", {
    link_label: label,
    link_url: url,
    source,
    page_path: window.location.pathname,
  });
}

/** Navigation link click */
export function trackNavClick(destination: string): void {
  trackEvent("nav_click", {
    destination,
    page_path: window.location.pathname,
  });
}

/** CTA button click (hero CTA, section CTAs) */
export function trackCTAClick(
  ctaLabel: string,
  section: string
): void {
  trackEvent("cta_click", {
    cta_label: ctaLabel,
    section,
    page_path: window.location.pathname,
  });
}
