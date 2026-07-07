import React, { useState, useEffect } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { trackEvent, identifyUser } from "../analytics/analytics";

interface LinkedInProfile {
  id: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
  access_token: string;
}

export const LinkedInAuth: React.FC = () => {
  // Page mode: checks if we are running inside an OAuth popup window
  const isPopup = window.opener !== null;

  // Opener/Dashboard state
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [profile, setProfile] = useState<LinkedInProfile | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Popup-specific states
  const [params, setParams] = useState<URLSearchParams | null>(null);
  const [simulatedProfile, setSimulatedProfile] = useState<LinkedInProfile | null>(null);

  // ----------------------------------------------------
  // Main Effect
  // ----------------------------------------------------
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setParams(urlParams);

    // --- POPUP WINDOW LOGIC ---
    if (isPopup) {
      const code = urlParams.get("code");
      const error = urlParams.get("error");
      const errorDescription = urlParams.get("error_description");
      const loginMode = urlParams.get("login");

      // Handle LinkedIn redirect error in popup
      if (error) {
        window.opener.postMessage(
          { type: "linkedin-auth-error", message: errorDescription || `OAuth Error: ${error}` },
          window.location.origin
        );
        window.close();
        return;
      }

      // Handle real code exchange in popup
      if (code) {
        handlePopupCodeExchange(code);
        return;
      }

      // Handle real login redirect inside popup
      if (loginMode === "real") {
        handlePopupRealRedirect();
        return;
      }

      // Handle simulate screen preparation in popup
      if (loginMode === "simulate") {
        preparePopupSimulation();
        return;
      }
      return;
    }

    // --- MAIN OPENEER LOGIC ---
    // Listen for postMessage from the popup
    const handlePopupMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "linkedin-auth-success") {
        const authData = event.data.data;
        setProfile(authData);
        setStatus("success");
        setErrorMsg(null);
        // Identify in Mixpanel
        identifyUser(authData.id);
        // Dispatch storage event to trigger Header render updates instantly
        window.dispatchEvent(new Event("storage"));
      } else if (event.data?.type === "linkedin-auth-error") {
        setStatus("error");
        setErrorMsg(event.data.message);
      }
    };

    window.addEventListener("message", handlePopupMessage);

    // Initial check if we already have local storage credentials
    const isAuthorized = localStorage.getItem("uk_li_authorized") === "true";
    if (isAuthorized) {
      setProfile({
        id: localStorage.getItem("uk_li_id") || "",
        name: localStorage.getItem("uk_li_name") || "",
        given_name: localStorage.getItem("uk_li_given_name") || "",
        family_name: localStorage.getItem("uk_li_family_name") || "",
        email: localStorage.getItem("uk_li_email") || "",
        picture: localStorage.getItem("uk_li_picture") || "",
        access_token: localStorage.getItem("uk_li_access_token") || "",
      });
      setStatus("success");
    }

    return () => {
      window.removeEventListener("message", handlePopupMessage);
    };
  }, [isPopup]);

  // ----------------------------------------------------
  // Popup Action Helpers
  // ----------------------------------------------------
  const handlePopupRealRedirect = () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID || "86tabl99wgmifm";
    if (!clientId) {
      window.opener.postMessage(
        {
          type: "linkedin-auth-error",
          message: "VITE_LINKEDIN_CLIENT_ID is not configured in your frontend .env file. Real login is unavailable.",
        },
        window.location.origin
      );
      window.close();
      return;
    }

    const redirectUri = encodeURIComponent(window.location.origin + "/linked-in-auth");
    const state = Math.random().toString(36).substring(2, 15);
    const scope = encodeURIComponent("openid profile email");

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
    window.location.href = authUrl;
  };

  const handlePopupCodeExchange = async (code: string) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/linkedin-exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          redirectUri: window.location.origin + "/linked-in-auth",
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Vite development server does not host serverless functions locally (received HTML instead of JSON). To test real logins locally, run 'npx vercel dev', or use Simulation Mode."
        );
      }

      const result = await response.json();

      if (response.ok && result.success) {
        const data = result.data;
        // Save to localStorage inside popup scope (shared origin)
        localStorage.setItem("uk_li_id", data.id);
        localStorage.setItem("uk_li_name", data.name);
        localStorage.setItem("uk_li_given_name", data.given_name);
        localStorage.setItem("uk_li_family_name", data.family_name);
        localStorage.setItem("uk_li_email", data.email);
        localStorage.setItem("uk_li_picture", data.picture);
        localStorage.setItem("uk_li_access_token", data.access_token);
        localStorage.setItem("uk_li_authorized", "true");

        // Message parent window success
        window.opener.postMessage({ type: "linkedin-auth-success", data }, window.location.origin);
      } else {
        const errorText =
          result.error === "CREDENTIALS_MISSING"
            ? "Vercel serverless credentials are not configured. Exchange failed."
            : result.message || "Failed to exchange code.";
        window.opener.postMessage({ type: "linkedin-auth-error", message: errorText }, window.location.origin);
      }
    } catch (err) {
      console.error(err);
      let message = err instanceof Error ? err.message : "Server connection failed in popup.";
      if (message.toLowerCase().includes("failed to fetch")) {
        message = "Failed to connect to backend API. Vite's dev server (npm run dev) does not run serverless functions locally. Please run 'npx vercel dev' to test real logins locally, or use Simulation Mode instead.";
      }
      window.opener.postMessage(
        { type: "linkedin-auth-error", message },
        window.location.origin
      );
    } finally {
      window.close();
    }
  };

  const preparePopupSimulation = () => {
    // Generate a mock profile for simulation
    const mockId = "li_sim_" + Math.random().toString(36).substring(2, 9);
    setSimulatedProfile({
      id: mockId,
      name: "Jane Doe (Simulated)",
      given_name: "Jane",
      family_name: "Doe",
      email: "jane.doe.simulated@linkedin.com",
      picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      access_token: "simulated_token_" + Math.random().toString(36).substring(2, 15),
    });
  };

  const handleSimulateAuthorize = () => {
    if (!simulatedProfile) return;

    // Save to localStorage inside popup scope (shared origin)
    localStorage.setItem("uk_li_id", simulatedProfile.id);
    localStorage.setItem("uk_li_name", simulatedProfile.name);
    localStorage.setItem("uk_li_given_name", simulatedProfile.given_name);
    localStorage.setItem("uk_li_family_name", simulatedProfile.family_name);
    localStorage.setItem("uk_li_email", simulatedProfile.email);
    localStorage.setItem("uk_li_picture", simulatedProfile.picture);
    localStorage.setItem("uk_li_access_token", simulatedProfile.access_token);
    localStorage.setItem("uk_li_authorized", "true");

    // Message parent
    window.opener.postMessage(
      { type: "linkedin-auth-success", data: simulatedProfile },
      window.location.origin
    );

    // Track Mixpanel success
    // Wait, in popup mode, we don't track completed directly; opener mode does it.
    window.close();
  };

  const handleSimulateCancel = () => {
    window.opener.postMessage(
      { type: "linkedin-auth-error", message: "User cancelled simulated LinkedIn connection." },
      window.location.origin
    );
    window.close();
  };

  // ----------------------------------------------------
  // Main Opener Window Action Helpers
  // ----------------------------------------------------
  const openLoginPopup = (mode: "real" | "simulate") => {
    // Track started event in main window
    trackEvent("linkedin_login_started", {
      login_type: mode,
      page_path: window.location.pathname,
    });

    setStatus("loading");
    setErrorMsg(null);

    const width = 550;
    const height = 650;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popupUrl = `${window.location.origin}/linked-in-auth?login=${mode}`;
    const popupWindow = window.open(
      popupUrl,
      "LinkedInLoginPopup",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );

    // Fallback: Check if popup was blocked
    if (!popupWindow || popupWindow.closed || typeof popupWindow.closed === "undefined") {
      setStatus("error");
      setErrorMsg("Popup blocker detected. Please allow popups for this site to log in with LinkedIn.");
      return;
    }

    // Set a timer to check if popup closed without returning a result
    const checkClosedInterval = setInterval(() => {
      if (popupWindow.closed) {
        clearInterval(checkClosedInterval);
        setStatus((prevStatus) => {
          if (prevStatus === "loading") {
            // User closed the window before oauth completed
            setErrorMsg("Authentication window was closed before completing.");
            return "error";
          }
          return prevStatus;
        });
      }
    }, 1000);
  };

  const handleLogout = () => {
    trackEvent("linkedin_logout_completed", {
      page_path: window.location.pathname,
    });

    // Remove all uk_li_* fields
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("uk_li_")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    setProfile(null);
    setStatus("idle");
    setErrorMsg(null);

    // Dispatch storage event to trigger Header render updates instantly
    window.dispatchEvent(new Event("storage"));
  };

  const copyToClipboard = (key: string, value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    });
  };

  const getLocalStorageFields = () => {
    const fields: { key: string; value: string }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("uk_li_")) {
        fields.push({ key, value: localStorage.getItem(key) || "" });
      }
    }
    return fields.sort((a, b) => a.key.localeCompare(b.key));
  };

  const storageFields = getLocalStorageFields();

  // ----------------------------------------------------
  // Render Logic
  // ----------------------------------------------------

  // --- RENDER POPUP VIEW ---
  if (isPopup) {
    const isSimulating = params?.get("login") === "simulate";

    return (
      <div className="linkedin-popup-container">
        {isSimulating && simulatedProfile ? (
          <div className="glass-card linkedin-popup-card">
            <div className="linkedin-popup-header">
              <svg className="linkedin-popup-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <h2 className="linkedin-popup-title">LinkedIn Sign-In</h2>
            </div>

            <div className="linkedin-popup-desc-box">
              <p className="linkedin-popup-desc">
                <strong>Utkarsh Kala's Portfolio</strong> is requesting permission to access your profile information:
              </p>
              <ul className="linkedin-scope-list">
                <li>
                  <svg className="scope-check" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Use your name and profile picture</span>
                </li>
                <li>
                  <svg className="scope-check" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Use your primary email address (<code>{simulatedProfile.email}</code>)</span>
                </li>
              </ul>
            </div>

            <div className="linkedin-simulation-profile-preview">
              <img src={simulatedProfile.picture} alt="Profile" className="preview-avatar" />
              <div className="preview-info">
                <span className="preview-name">{simulatedProfile.name}</span>
                <span className="preview-meta">Simulated Account Credentials</span>
              </div>
            </div>

            <div className="linkedin-popup-actions">
              <button onClick={handleSimulateCancel} className="btn btn-secondary" style={{ flex: 1, minHeight: "48px" }}>
                Cancel
              </button>
              <button onClick={handleSimulateAuthorize} className="btn btn-primary linkedin-btn-real" style={{ flex: 1, minHeight: "48px" }}>
                Authorize
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card text-center" style={{ width: "90%", maxWidth: "450px", padding: "48px 32px" }}>
            <div className="linkedin-spinner-container">
              <div className="linkedin-spinner"></div>
            </div>
            <h3 style={{ fontFamily: "var(--font-family-display)", fontSize: "1.3rem", fontWeight: "700", marginTop: "20px" }}>
              Authorizing with LinkedIn
            </h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Exchanging secure credentials...
            </p>
          </div>
        )}
      </div>
    );
  }

  // --- RENDER MAIN DASHBOARD VIEW ---
  return (
    <main style={{ paddingTop: "calc(var(--header-height) + 40px)" }}>
      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>
          <SectionHeader
            tagText="Integrations"
            title="LinkedIn Authentication"
            description="Explore LinkedIn integration using secure OAuth 2.0 / OpenID Connect popups, with support for simulated logins."
            isMainHeader={true}
          />

          <div style={{ marginTop: "30px" }}>
            {status === "loading" && (
              <div className="glass-card text-center" style={{ padding: "48px 32px" }}>
                <div className="linkedin-spinner-container">
                  <div className="linkedin-spinner"></div>
                </div>
                <h3 style={{ fontFamily: "var(--font-family-display)", fontSize: "1.3rem", fontWeight: "700", marginTop: "20px" }}>
                  Awaiting Connection
                </h3>
                <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                  Please complete authorization in the popup window...
                </p>
              </div>
            )}

            {status !== "loading" && !profile && (
              <div className="glass-card linkedin-card">
                <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "24px" }}>
                  <div className="linkedin-icon-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-family-display)", fontSize: "1.4rem", fontWeight: "800", color: "var(--ink)" }}>
                      LinkedIn Sign-In Popup
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                      Authenticate using a secure popup window.
                    </p>
                  </div>
                </div>

                {errorMsg && (
                  <div className="linkedin-error-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="linkedin-action-grid">
                  <button
                    onClick={() => openLoginPopup("real")}
                    className="btn btn-primary linkedin-btn-real"
                    style={{ minHeight: "48px" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    Sign In with LinkedIn
                  </button>

                  <button
                    onClick={() => openLoginPopup("simulate")}
                    className="btn btn-secondary linkedin-btn-simulate"
                    style={{ minHeight: "48px" }}
                  >
                    Simulate LinkedIn Login
                  </button>
                </div>

                <div style={{ marginTop: "24px", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  <strong>Note:</strong> Opening this flow opens a standard secure dialog window. If real environment secrets are missing, you will be alerted in the popup, but the simulator mode allows easy full-flow testing.
                </div>
              </div>
            )}

            {status !== "loading" && profile && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="glass-card linkedin-card">
                  <div className="linkedin-profile-card">
                    <div className="linkedin-avatar-wrapper">
                      {profile.picture ? (
                        <img src={profile.picture} alt={profile.name} className="linkedin-avatar-img" />
                      ) : (
                        <div className="linkedin-avatar-placeholder">
                          {profile.given_name[0] || "U"}
                        </div>
                      )}
                      <div className="linkedin-avatar-badge" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </div>
                    </div>

                    <div className="linkedin-profile-info">
                      <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                        <h3 style={{ fontFamily: "var(--font-family-display)", fontSize: "1.5rem", fontWeight: "800", color: "var(--ink)", margin: 0 }}>
                          {profile.name}
                        </h3>
                        <span className="linkedin-badge-success">Authorized</span>
                      </div>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "4px" }}>
                        {profile.email || "No email retrieved"}
                      </p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "4px" }}>
                        ID: <code>{profile.id}</code>
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="btn btn-secondary linkedin-btn-disconnect"
                      style={{ minHeight: "48px" }}
                    >
                      Disconnect Account
                    </button>
                  </div>
                </div>

                <div className="glass-card linkedin-card">
                  <h3 style={{ fontFamily: "var(--font-family-display)", fontSize: "1.2rem", fontWeight: "800", color: "var(--ink)", marginBottom: "16px" }}>
                    LocalStorage Visualizer
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "20px" }}>
                    The following fields have been stored in <code>localStorage</code> under the <code>uk_li_*</code> namespace. Click on any row to copy its value.
                  </p>

                  <div className="linkedin-storage-table-wrapper">
                    <table className="linkedin-storage-table">
                      <thead>
                        <tr>
                          <th>Key Name</th>
                          <th>Value</th>
                          <th style={{ width: "80px", textAlign: "center" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {storageFields.map((field) => (
                          <tr key={field.key} onClick={() => copyToClipboard(field.key, field.value)}>
                            <td className="linkedin-table-key">
                              <code>{field.key}</code>
                            </td>
                            <td className="linkedin-table-value">
                              <span title={field.value}>{field.value}</span>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <button
                                className="linkedin-table-copy-btn"
                                aria-label={`Copy value for ${field.key}`}
                              >
                                {copiedKey === field.key ? "Copied" : "Copy"}
                              </button>
                            </td>
                          </tr>
                        ))}
                        {storageFields.length === 0 && (
                          <tr>
                            <td colSpan={3} style={{ textAlign: "center", color: "var(--text-muted)", padding: "20px 0" }}>
                              No local storage fields found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
