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
  "/clients": "Clients",
  "/customers": "Clients",
  "/saas-toolkit": "SaaS Toolkit",
  "/stack": "SaaS Toolkit",
  "/why-me": "Systems",
  "/systems": "Systems",
};

export function usePageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    const title =
      PAGE_TITLES[location.pathname] || document.title || "Unknown";
    trackPageView(location.pathname, title);
  }, [location.pathname]);
}
