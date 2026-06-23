import React, { useState, useEffect } from "react";
import { useContactModal } from "../context/ContactModalContext";
import { trackContactSubmit, trackContactOpen, trackOutboundClick } from "../analytics/analytics";

const TOPICS = [
  "Hiring",
  "CS Leadership",
  "Customer Success",
  "RevOps",
  "Automation",
  "Integrations",
  "Consulting",
  "Advisory",
  "Fractional CS",
  "Growth Strategy",
  "Retention",
  "Partnerships",
];

export const ContactModal: React.FC = () => {
  const { isOpen, closeModal, contactType, openModal } = useContactModal();
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !contactType) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentUrl = window.location.href;

    if (contactType === "whatsapp") {
      trackContactSubmit("whatsapp", topic);
      const formattedMessage = `Hey Utkarsh,\n\nI came across your portfolio via ${currentUrl}\n\n*Inquiring for :* ${topic}\n\n> ${message}`;
      const waUrl = `https://wa.me/+919634687270?text=${encodeURIComponent(formattedMessage)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else if (contactType === "email") {
      trackContactSubmit("email", topic);
      const subject = `Portfolio Inquiry: ${topic}`;
      const emailBody = `Hey Utkarsh,\n\nI came across your portfolio via ${currentUrl}\n\n${message}`;

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      if (isMobile) {
        const mailtoUrl = `mailto:utkarsh.kala.9@gmail.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoUrl;
      } else {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          "utkarsh.kala.9@gmail.com"
        )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(gmailUrl, "_blank", "noopener,noreferrer");
      }
    }

    closeModal();
    setMessage(""); // reset message
    setTopic(TOPICS[0]);
  };

  // "Connect" hub view — shows all contact options
  if (contactType === "connect") {
    return (
      <div className={`contact-modal-overlay ${isOpen ? "open" : ""}`} onClick={closeModal}>
        <div
          className={`glass-card contact-modal-card ${isOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <span className="section-tag" style={{ marginBottom: "12px" }}>Get in Touch</span>
          <h3 className="modal-title">Let's build customer systems that compound.</h3>
          <p className="modal-subtitle">
            Whether you are hiring for leadership, exploring consulting, discussing SaaS growth, or building a customer success engine that scales — I'm open to conversations.
          </p>

          <div className="contact-links-grid" style={{ marginTop: "8px" }}>
            <a
              href="tel:+919634687270"
              className="btn btn-primary"
              onClick={() => trackOutboundClick("Phone", "tel:+919634687270", "Contact Modal Link Grid")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call me
            </a>
            <button
              onClick={() => {
                openModal('whatsapp');
                trackContactOpen('whatsapp', 'Contact Modal Link Grid');
              }}
              className="btn btn-whatsapp"
              aria-label="WhatsApp me"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp me
            </button>
            <a
              href="https://www.linkedin.com/in/utkarshkala/"
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutboundClick("LinkedIn", "https://www.linkedin.com/in/utkarshkala/", "Contact Modal Link Grid")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
            <button
              onClick={() => {
                openModal('email');
                trackContactOpen('email', 'Contact Modal Link Grid');
              }}
              className="btn btn-secondary"
              aria-label="Email me"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Email me
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const subject = `Portfolio Inquiry: ${topic}`;
  const emailBody = `Hey Utkarsh,\n\nI came across your portfolio via ${currentUrl}\n\n${message}`;
  const mailtoUrl = `mailto:utkarsh.kala.9@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(emailBody)}`;

  // WhatsApp / Email form view
  return (
    <div className={`contact-modal-overlay ${isOpen ? "open" : ""}`} onClick={closeModal}>
      <div
        className={`glass-card contact-modal-card ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h3 className="modal-title">
          {contactType === "whatsapp" ? "Send a WhatsApp" : "Send an Email"}
        </h3>
        <p className="modal-subtitle">Let me know what you'd like to discuss.</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="topic" className="form-label">
              Topic of message
            </label>
            <div className="custom-select-wrapper">
              <select
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="form-control form-select"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message body
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Utkarsh, I'd love to chat about..."
              required
              rows={4}
              className="form-control form-textarea"
            />
          </div>

          <button
            type="submit"
            className={`btn ${contactType === "whatsapp" ? "btn-whatsapp" : "btn-primary"} w-full mt-4`}
          >
            {contactType === "whatsapp" ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Continue to WhatsApp
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Continue to Email
              </>
            )}
          </button>

          {contactType === "email" && (
            <p className="modal-form-fallback">
              Not using Gmail?{" "}
              <a
                href={mailtoUrl}
                onClick={(e) => {
                  if (!message.trim()) {
                    e.preventDefault();
                    const textarea = document.getElementById("message");
                    if (textarea) {
                      textarea.focus();
                      (textarea as HTMLTextAreaElement).reportValidity();
                    }
                    return;
                  }
                  trackContactSubmit("email", topic);
                  setTimeout(() => {
                    closeModal();
                    setMessage("");
                    setTopic(TOPICS[0]);
                  }, 100);
                }}
                className="fallback-link"
              >
                Open default email client
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
