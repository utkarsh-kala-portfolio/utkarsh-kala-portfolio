import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { LetterHop } from "./LetterHop";
import { useContactModal } from "../context/ContactModalContext";
import { trackNavClick, trackContactOpen } from "../analytics/analytics";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { openModal } = useContactModal();

  // Scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNav = () => setNavOpen(!navOpen);

  const [liUser, setLiUser] = useState<{ name: string; picture: string } | null>(null);

  useEffect(() => {
    const checkLiAuth = () => {
      const isAuth = localStorage.getItem("uk_li_authorized") === "true";
      if (isAuth) {
        setLiUser({
          name: localStorage.getItem("uk_li_given_name") || localStorage.getItem("uk_li_name")?.split(" ")[0] || "User",
          picture: localStorage.getItem("uk_li_picture") || ""
        });
      } else {
        setLiUser(null);
      }
    };

    checkLiAuth();

    window.addEventListener("storage", checkLiAuth);
    return () => window.removeEventListener("storage", checkLiAuth);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-logo-wrapper">
          <Link
            to="/"
            className="logo-link"
            aria-label="Utkarsh Kala Home"
            onClick={() => {
              setNavOpen(false);
              trackNavClick("Logo Home Link");
            }}
          >
            <div className="logo-symbol" aria-hidden="true" style={{ overflow: "hidden", padding: 0 }}>
              <img
                src="/assets/profile/header-logo.png"
                alt="Utkarsh Kala"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            </div>
            <span className="logo-text">Utkarsh Kala</span>
          </Link>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openModal('cv');
              trackContactOpen('cv', 'Header Logo CV Button');
            }}
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              fontSize: "0.75rem",
              fontWeight: "600",
              minHeight: "28px"
            }}
            aria-label="Request CV"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download CV
          </button>
        </div>

        <button
          className={`nav-toggle ${navOpen ? "open" : ""}`}
          id="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={toggleNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${navOpen ? "open" : ""}`} id="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => {
              setNavOpen(false);
              trackNavClick("Home Page Link");
            }}
          >
            <LetterHop text="Home" />
          </NavLink>
          <NavLink
            to="/stack"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => {
              setNavOpen(false);
              trackNavClick("SaaS Toolkit Link");
            }}
          >
            <LetterHop text="SaaS Toolkit" />
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => {
              setNavOpen(false);
              trackNavClick("Customers Link");
            }}
          >
            <LetterHop text="Customers" />
          </NavLink>
          <NavLink
            to="/journey"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => {
              setNavOpen(false);
              trackNavClick("Journey Link");
            }}
          >
            <LetterHop text="Journey" />
          </NavLink>
          <NavLink
            to="/why-me"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => {
              setNavOpen(false);
              trackNavClick("Why Me Link");
            }}
          >
            <LetterHop text="Why Me?" />
          </NavLink>

          {liUser && (
            <NavLink
              to="/linked-in-auth"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => {
                setNavOpen(false);
                trackNavClick("Header LinkedIn Profile Link");
              }}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              {liUser.picture ? (
                <div style={{ position: "relative", width: "24px", height: "24px", display: "inline-block" }}>
                  <img
                    src={liUser.picture}
                    alt={liUser.name}
                    style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid var(--ink)", objectFit: "cover", display: "block" }}
                  />
                  <span style={{ position: "absolute", bottom: "-1px", right: "-1px", width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-green)", border: "1px solid var(--ink)", display: "block" }} />
                </div>
              ) : (
                <span style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "var(--accent-indigo)",
                  color: "var(--paper)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  border: "1.5px solid var(--ink)"
                }}>
                  {liUser.name[0]}
                </span>
              )}
              <span>{liUser.name}</span>
            </NavLink>
          )}

          <button
            className="btn btn-secondary nav-cta"
            onClick={() => {
              setNavOpen(false);
              openModal('connect');
              trackContactOpen('connect', 'Header CTA');
            }}
          >
            Let's Connect
          </button>
        </nav>
      </div>
    </header>
  );
};
