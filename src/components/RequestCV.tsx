import React, { useState } from "react";
import { trackContactSubmit } from "../analytics/analytics";

interface RequestCVProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestCV: React.FC<RequestCVProps> = ({ isOpen, onClose }) => {
  const [cvEmail, setCvEmail] = useState("");
  const [isCvSubmitted, setIsCvSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCvEmail("");
      setIsCvSubmitted(false);
      setIsSending(false);
    }, 300);
  };

  const handleCvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    trackContactSubmit("cv", "CV Request");
    setIsSending(true);

    try {
      await fetch("/api/send-cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cvEmail }),
      });
    } catch (err) {
      console.error("Failed to trigger automated CV email:", err);
    } finally {
      setIsSending(false);
      setIsCvSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`contact-modal-overlay ${isOpen ? "open" : ""}`} onClick={handleClose}>
      <div
        className={`glass-card contact-modal-card ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {!isCvSubmitted ? (
          <>
            <span className="section-tag" style={{ marginBottom: "12px" }}>Download CV</span>
            <h3 className="modal-title">Hello! Glad you're interested in my background.</h3>
            <p className="modal-subtitle">
              Enter your email address below, and I'll send you a copy of my CV right away.
            </p>

            <form onSubmit={handleCvSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="cv-email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="cv-email"
                  value={cvEmail}
                  onChange={(e) => setCvEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="form-control"
                  style={{ width: "100%" }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={isSending}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ marginRight: "8px", display: "inline" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                {isSending ? "Sending..." : "Get CV"}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <span className="section-tag" style={{ marginBottom: "12px", display: "inline-block", background: "rgba(16, 185, 129, 0.15)", color: "var(--accent-green)" }}>Sent Successfully</span>
            <h3 className="modal-title" style={{ marginBottom: "10px" }}>CV is on the Way!</h3>
            <p className="modal-subtitle" style={{ marginBottom: "24px" }}>
              An automated email has been sent to <strong>{cvEmail}</strong> containing the link to download my CV. Please check your inbox (and spam folder) in a few moments.
            </p>
            <button onClick={handleClose} className="btn btn-primary">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
