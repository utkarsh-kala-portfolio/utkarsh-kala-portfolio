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
  "/saas-toolkit": "SaaS Toolkit",
  "/stack": "SaaS Toolkit",
  "/why-me": "Systems",
  "/systems": "Systems",
  "/404": "Page Not Found",
};

export function usePageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] || "Page Not Found";
    if (location.pathname === "/") {
      document.title = "Utkarsh Kala — Business Systems Architect | Product Adoption | AI Workflows | Revenue Strategy";
    } else {
      document.title = `Utkarsh Kala — ${title}`;
    }
    trackPageView(location.pathname, title);
  }, [location.pathname]);
}
