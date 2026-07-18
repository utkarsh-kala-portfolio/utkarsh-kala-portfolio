import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ContactCTA } from "../components/ContactCTA";

export const NotFound: React.FC = () => {
  useEffect(() => {
    // Automatically activate reveal animation for NotFound content
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => el.classList.add("active"));
  }, []);

  const topContent = (
    <>
      <div className="notfound-top">
        <h1 className="notfound-title">Don’t worry, I’m not long gone.</h1>
        <p className="notfound-desc">
          Just taking a sip, connecting the dots, and working on making things a little smoother.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-secondary">
            Back home
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <main style={{ paddingTop: "calc(var(--header-height) + 40px)" }}>
      <ContactCTA topContent={topContent} />
    </main>
  );
};

export default NotFound;
