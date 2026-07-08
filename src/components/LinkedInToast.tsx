import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent, identifyUser } from "../analytics/analytics";

export const LinkedInToast: React.FC = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [successName, setSuccessName] = useState<string | null>(null);
  const [loginStarted, setLoginStarted] = useState(false);

  useEffect(() => {
    let cleanupTimer: (() => void) | undefined;

    // Check if we should display the prompt
    const checkVisibility = () => {
      const isAuthorized = localStorage.getItem("uk_li_authorized") === "true";
      const isDismissed = localStorage.getItem("uk_li_prompt_dismissed") === "true";
      const isAuthPage = location.pathname === "/linked-in-auth";

      if (isAuthorized) {
        setVisible(false);
        // Only trigger success banner if this tab started the login
        if (loginStarted) {
          setLoginStarted(false);
          const givenName =
            localStorage.getItem("uk_li_given_name") ||
            localStorage.getItem("uk_li_name")?.split(" ")[0] ||
            "User";
          setSuccessName(givenName);
          const t = setTimeout(() => {
            setSuccessName(null);
          }, 3000);
          cleanupTimer = () => clearTimeout(t);
        }
      } else if (!isDismissed && !isAuthPage) {
        // Show after a small delay to feel less intrusive
        const t = setTimeout(() => setVisible(true), 2000);
        cleanupTimer = () => clearTimeout(t);
      } else {
        setVisible(false);
      }
    };

    checkVisibility();

    // Listen for storage changes (e.g. if logged in/out elsewhere)
    window.addEventListener("storage", checkVisibility);
    return () => {
      window.removeEventListener("storage", checkVisibility);
      if (cleanupTimer) cleanupTimer();
    };
  }, [location.pathname, loginStarted]);

  useEffect(() => {
    // Setup message listener for the popup OAuth callback as a backup channel
    const handlePopupMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "linkedin-auth-success") {
        const authData = event.data.data;

        // Save to localStorage
        localStorage.setItem("uk_li_sub", authData.sub);
        localStorage.setItem("uk_li_name", authData.name);
        localStorage.setItem("uk_li_given_name", authData.given_name);
        localStorage.setItem("uk_li_family_name", authData.family_name);
        localStorage.setItem("uk_li_email", authData.email);
        localStorage.setItem("uk_li_picture", authData.picture);
        if (authData.linkedin_url) {
          localStorage.setItem("uk_li_linkedin_url", authData.linkedin_url);
        }
        localStorage.setItem("uk_li_authorized", "true");

        // Identify in Mixpanel and first-party database
        identifyUser(authData.sub, authData);

        // Track completed event
        trackEvent("linkedin_login_completed", {
          login_type: authData.sub.startsWith("li_sim_") ? "simulated" : "real",
          page_path: window.location.pathname,
        });

        // Trigger header update and checkVisibility
        window.dispatchEvent(new Event("storage"));
      }
    };

    window.addEventListener("message", handlePopupMessage);
    return () => {
      window.removeEventListener("message", handlePopupMessage);
    };
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("uk_li_prompt_dismissed", "true");
    setVisible(false);
  };

  const openLoginPopup = (mode: "real" | "simulate") => {
    setLoginStarted(true);
    // Track started event
    trackEvent("linkedin_login_started", {
      login_type: mode,
      page_path: window.location.pathname,
    });

    const width = 550;
    const height = 650;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popupUrl = `${window.location.origin}/linked-in-auth?login=${mode}`;
    window.open(
      popupUrl,
      "LinkedInLoginPopup",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
  };

  if (!visible && !successName) return null;

  return (
    <div className={`linkedin-toast ${visible || successName ? "show" : ""}`}>
      {successName ? (
        <div className="linkedin-toast-success-content">
          <div className="linkedin-success-checkmark">✓</div>
          <div>
            <h4 style={{ margin: 0, fontFamily: "var(--font-family-display)", fontWeight: "800", fontSize: "1rem" }}>
              Welcome, {successName}!
            </h4>
            <p style={{ margin: "2px 0 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Successfully connected your LinkedIn profile.
            </p>
          </div>
        </div>
      ) : (
        <div className="linkedin-toast-content">
          <button
            className="linkedin-toast-close-btn"
            onClick={handleDismiss}
            aria-label="Dismiss LinkedIn prompt"
          >
            ×
          </button>

          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div className="linkedin-toast-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </div>

            <div style={{ flex: 1, paddingRight: "16px" }}>
              <h4 style={{ margin: 0, fontFamily: "var(--font-family-display)", fontWeight: "800", fontSize: "1rem", color: "var(--ink)" }}>
                Connect LinkedIn
              </h4>
              <p style={{ margin: "4px 0 12px 0", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                to personalize your browsing experience.
              </p>

              <div className="linkedin-toast-actions">
                <button
                  onClick={() => openLoginPopup("real")}
                  className="btn btn-primary linkedin-toast-btn-connect"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
