/**
 * First-Party Behavioral Activity Tracker
 *
 * Captures user engagement, scroll depth, page duration, section views,
 * and element clicks, saving them anonymously to MongoDB. Supports identity
 * merging when a visitor connects via LinkedIn.
 */

const ANON_ID_KEY = "uk_li_anon_id";
const SESSION_ID_KEY = "uk_li_session_id";
const LAST_ACTIVITY_KEY = "uk_li_last_activity";
const IDENTIFIED_SESSION_KEY = "uk_li_identified_this_session";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

let isInitialized = false;
let currentPath = window.location.pathname;
let pageEntryTime = Date.now();
let sectionEntryTimes: Record<string, number> = {};
let trackedScrollDepths: Record<number, boolean> = {};

// Helper: Generate UUID
function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Helper: Check if tracking is disabled
function isTrackingDisabled(): boolean {
  try {
    return localStorage.getItem("uk_disable_tracking") === "true";
  } catch {
    return false;
  }
}

// ─── ID & Session Management ────────────────────────────────────

export function getAnonymousUserId(): string {
  try {
    let anonId = localStorage.getItem(ANON_ID_KEY);
    if (!anonId) {
      anonId = generateUUID();
      localStorage.setItem(ANON_ID_KEY, anonId);
    }
    return anonId;
  } catch {
    return "anon_fallback_" + Date.now();
  }
}

export function getSessionId(): string {
  try {
    const now = Date.now();
    let sessionId = localStorage.getItem(SESSION_ID_KEY);
    const lastActivity = Number(localStorage.getItem(LAST_ACTIVITY_KEY) || "0");

    if (!sessionId || now - lastActivity > SESSION_TIMEOUT_MS) {
      sessionId = generateUUID();
      localStorage.setItem(SESSION_ID_KEY, sessionId);
      localStorage.removeItem(IDENTIFIED_SESSION_KEY); // Reset identify check for new session
      
      // Track session start event
      setTimeout(() => {
        trackActivityEvent("Engagement Events", "session_start");
      }, 50);
    }

    localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
    return sessionId;
  } catch {
    return "session_fallback_" + Date.now();
  }
}

function updateActivityTimestamp(): void {
  try {
    localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
  } catch {
    // Ignore
  }
}

// ─── Unified Event Dispatcher ───────────────────────────────────

export async function trackActivityEvent(
  eventType: string,
  eventName: string,
  eventPayload: Record<string, any> = {}
): Promise<void> {
  if (isTrackingDisabled()) return;

  try {
    const anonId = getAnonymousUserId();
    const sessId = getSessionId();

    // Parse browser & OS from User Agent
    const ua = navigator.userAgent;
    let browser = "Other";
    if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("MSIE") || ua.includes("Trident")) browser = "IE";

    let os = "Other";
    if (ua.includes("Windows")) os = "Windows";
    else if (ua.includes("Macintosh") || ua.includes("Mac OS")) os = "macOS";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("Linux")) os = "Linux";

    // Get viewport metrics
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Parse UTM Parameters
    const utm: Record<string, string> = {};
    const urlParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((param) => {
      const val = urlParams.get(param);
      if (val) utm[param] = val;
    });

    const eventData = {
      eventId: generateUUID(),
      anonymousUserId: anonId,
      sessionId: sessId,
      eventType,
      eventName,
      route: window.location.pathname,
      path: window.location.pathname + window.location.search,
      title: document.title,
      timestamp: Date.now(),
      eventPayload,
      utm,
      referrer: document.referrer || "",
      device: /Mobi|Android|iPhone/i.test(ua) ? "mobile" : "desktop",
      browser,
      os,
      viewport,
      host: window.location.host,
    };

    // Send payload using keepalive fetch for high delivery odds during page leaves
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
      keepalive: true,
    }).catch((err) => console.warn("Failed to dispatch first-party analytics event:", err));

  } catch (err) {
    console.warn("Analytics activity tracker error:", err);
  }
}

// ─── Identity Integration ────────────────────────────────────────

export async function identifyLinkedInProfile(profileData: any): Promise<void> {
  if (isTrackingDisabled()) return;

  try {
    const anonId = getAnonymousUserId();
    const sessId = getSessionId();

    const response = await fetch("/api/analytics/identify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profileData,
        anonymousUserId: anonId,
        sessionId: sessId,
      }),
    });

    if (response.ok) {
      try {
        localStorage.setItem(IDENTIFIED_SESSION_KEY, "true");
      } catch {
        // Ignore
      }
    }
  } catch (err) {
    console.warn("Failed to submit identity to analytics endpoint:", err);
  }
}

// Check on load if the user is already authenticated in localStorage
function checkExistingLinkedInSession(): void {
  try {
    const authorized = localStorage.getItem("uk_li_authorized") === "true";
    const sub = localStorage.getItem("uk_li_sub");
    const identifiedThisSession = localStorage.getItem(IDENTIFIED_SESSION_KEY) === "true";

    if (authorized && sub && !identifiedThisSession) {
      const profileData = {
        sub,
        name: localStorage.getItem("uk_li_name") || "",
        given_name: localStorage.getItem("uk_li_given_name") || "",
        family_name: localStorage.getItem("uk_li_family_name") || "",
        email: localStorage.getItem("uk_li_email") || "",
        picture: localStorage.getItem("uk_li_picture") || "",
        linkedin_url: localStorage.getItem("uk_li_linkedin_url") || "",
      };

      identifyLinkedInProfile(profileData);
    }
  } catch {
    // Ignore
  }
}

// ─── Instrumented Tracking Methods ────────────────────────────────

export function trackActivityPageView(route: string): void {
  const now = Date.now();
  // If moving away from a page, track previous page's duration
  if (currentPath !== route) {
    const duration = now - pageEntryTime;
    trackActivityEvent("Page Events", "page_exit", {
      path: currentPath,
      durationMs: duration,
    });
    trackActivityEvent("Page Events", "page_duration", {
      path: currentPath,
      durationMs: duration,
    });

    currentPath = route;
    pageEntryTime = now;
    trackedScrollDepths = {}; // Reset scroll depths for new page
  }

  trackActivityEvent("Page Events", "page_view", { path: route });
}

// Throttled Scroll Tracking
function setupScrollDepthTracking(): void {
  let scrollTimeout: any = null;

  const handleScroll = () => {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach((depth) => {
        if (scrollPercent >= depth && !trackedScrollDepths[depth]) {
          trackedScrollDepths[depth] = true;
          trackActivityEvent("Engagement Events", "scroll_depth", { depthPercent: depth });
        }
      });
    }, 200);
  };

  window.addEventListener("scroll", handleScroll);
}

// Section View Tracking (Intersection Observer)
function setupSectionTracking(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (!id) return;

        if (entry.isIntersecting) {
          // Section entered viewport
          sectionEntryTimes[id] = Date.now();
          trackActivityEvent("Engagement Events", "section_view", { sectionId: id });
        } else if (sectionEntryTimes[id]) {
          // Section exited viewport
          const timeOnSection = Date.now() - sectionEntryTimes[id];
          if (timeOnSection > 1000) { // Only track if spent > 1s
            trackActivityEvent("Engagement Events", "time_on_section", {
              sectionId: id,
              durationMs: timeOnSection,
            });
          }
          delete sectionEntryTimes[id];
        }
      });
    },
    { threshold: 0.3 } // 30% visibility threshold
  );

  // Monitor tags and sections
  document.querySelectorAll("section[id], main[id], div[id^='section-']").forEach((el) => {
    observer.observe(el);
  });
}

// Click Capture Tracking
function setupClickTracking(): void {
  document.body.addEventListener("click", (e) => {
    updateActivityTimestamp();

    const target = (e.target as HTMLElement).closest("a, button, [role='button'], input[type='submit']");
    if (!target) return;

    const el = target as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const id = el.id || "";
    const classes = el.className || "";
    const text = el.innerText?.trim().substring(0, 50) || el.getAttribute("aria-label") || "";
    const href = el.getAttribute("href") || "";
    const trackId = el.getAttribute("data-track-id") || "";
    const trackLabel = el.getAttribute("data-track-label") || "";

    const payload = {
      tag,
      id,
      classes,
      text,
      href,
      trackId,
      trackLabel,
    };

    let eventName = "button_click";
    let eventType = "Click Events";

    // 1. Check for CV download/Resume
    if (href.endsWith(".pdf") || trackId.includes("download") || trackId.includes("resume")) {
      eventName = "resume_download_click";
      trackActivityEvent(eventType, eventName, payload);
      // Track custom activity tag
      trackActivityEvent("Portfolio-Specific Events", "resume_download", payload);
      return;
    }

    // 2. Check for contact links
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.includes("wa.me") || trackId.includes("contact")) {
      eventName = "contact_click";
      trackActivityEvent(eventType, eventName, payload);
      trackActivityEvent("Portfolio-Specific Events", "contact_intent", payload);
      return;
    }

    // 3. Check for LinkedIn Oauth triggers
    if (trackId.includes("linkedin") || classes.includes("linkedin") || text.toLowerCase().includes("linkedin")) {
      eventName = "linkedin_oauth_click";
      trackActivityEvent(eventType, eventName, payload);
      return;
    }

    // 4. Check for external links
    if (href && !href.startsWith("#") && !href.startsWith("/") && !href.includes(window.location.host)) {
      eventName = "external_link_click";
      trackActivityEvent(eventType, eventName, payload);
      return;
    }

    // 5. Check for nav bar link clicks
    if (classes.includes("nav-link") || classes.includes("nav-cta")) {
      eventName = "nav_click";
      trackActivityEvent(eventType, eventName, payload);
      return;
    }

    // 6. Generic CTA
    if (classes.includes("btn-primary") || trackId.includes("cta")) {
      eventName = "cta_click";
    }

    trackActivityEvent(eventType, eventName, payload);
  });
}

// Handle session shutdown on unload
function setupUnloadTracking(): void {
  const endSessionBeacon = () => {
    if (isTrackingDisabled()) return;

    const now = Date.now();
    const duration = now - pageEntryTime;
    const sessId = localStorage.getItem(SESSION_ID_KEY);

    if (sessId) {
      // 1. Send final page exit
      const exitEventData = {
        eventId: generateUUID(),
        anonymousUserId: getAnonymousUserId(),
        sessionId: sessId,
        eventType: "Page Events",
        eventName: "page_exit",
        route: window.location.pathname,
        path: window.location.pathname + window.location.search,
        title: document.title,
        timestamp: now,
        eventPayload: { path: window.location.pathname, durationMs: duration },
        referrer: document.referrer || "",
        device: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
        host: window.location.host,
      };

      fetch("/api/analytics/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exitEventData),
        keepalive: true,
      });

      // 2. Terminate session
      const sessEndData = {
        sessionId: sessId,
        exitRoute: window.location.pathname,
        timestamp: now,
      };

      fetch("/api/analytics/session/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessEndData),
        keepalive: true,
      });
    }
  };

  window.addEventListener("pagehide", endSessionBeacon);
  window.addEventListener("beforeunload", endSessionBeacon);
}

// ─── Initialization ─────────────────────────────────────────────

export function initActivityTracker(): void {
  if (isInitialized || isTrackingDisabled()) return;

  // Initialize Anonymous ID & Session ID
  getAnonymousUserId();
  getSessionId();

  // Setup Event Listeners
  setupScrollDepthTracking();
  setupClickTracking();
  setupUnloadTracking();

  // Defer observer setup slightly to avoid blocking rendering paint
  setTimeout(() => {
    setupSectionTracking();
    checkExistingLinkedInSession();
  }, 100);

  isInitialized = true;
}
