/**
 * React hook — Tracks SPA page views on every route change.
 *
 * Pushes to both GTM dataLayer and Mixpanel on each navigation.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./analytics";

/** Page titles mapped by pathname */
const PAGE_TITLES: Record<string, string> = {
  "/": "Home",
  "/journey": "Journey",
  "/customers": "Customers",
  "/stack": "SaaS Toolkit",
  "/why-me": "Why Me",
};

export function usePageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    const title =
      PAGE_TITLES[location.pathname] || document.title || "Unknown";
    trackPageView(location.pathname, title);
  }, [location.pathname]);
}
