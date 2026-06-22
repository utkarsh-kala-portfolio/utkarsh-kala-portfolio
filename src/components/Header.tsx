import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { LetterHop } from "./LetterHop";
import { useContactModal } from "../context/ContactModalContext";

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

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link to="/" className="logo-link" aria-label="Utkarsh Kala Home" onClick={() => setNavOpen(false)}>
          <div className="logo-symbol" aria-hidden="true">UK</div>
          <span className="logo-text">Utkarsh Kala</span>
        </Link>

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
            onClick={() => setNavOpen(false)}
          >
            <LetterHop text="Home" />
          </NavLink>
          <NavLink
            to="/stack"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setNavOpen(false)}
          >
            <LetterHop text="SaaS Toolkit" />
          </NavLink>
          <NavLink
            to="/journey"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setNavOpen(false)}
          >
            <LetterHop text="Journey" />
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setNavOpen(false)}
          >
            <LetterHop text="Customers" />
          </NavLink>
          <NavLink
            to="/why-me"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setNavOpen(false)}
          >
            <LetterHop text="Why Me?" />
          </NavLink>
          <button
            className="btn btn-secondary nav-cta"
            onClick={() => { setNavOpen(false); openModal('connect'); }}
          >
            Let's Connect
          </button>
        </nav>
      </div>
    </header>
  );
};
