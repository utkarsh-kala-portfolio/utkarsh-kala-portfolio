import React, { useEffect } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { ContactCTA } from "../components/ContactCTA";
import { SectionHeader } from "../components/SectionHeader";

const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const WhyMe: React.FC = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ paddingTop: "calc(var(--header-height) + 40px)" }}>
      <section className="section" style={{ paddingBottom: "20px" }}>
        <div className="container">
          <div className="why-hero-grid">
            <SectionHeader
              tagText="Proof & Systems"
              title="Why Me?"
              description="A practical record of retention systems, automation workflows, and customer outcomes built across SaaS, commerce, support, and revenue operations."
              isMainHeader={true}
              className="why-hero-copy"
            />

            <div className="why-hero-visual reveal">
              <div className="display-photo-frame why-photo-frame">
                <img
                  src="/assets/profile/why-me-display.png"
                  alt="Utkarsh Kala speaking at Founder's Day"
                  className="display-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container">
          <SectionHeader
            tagText="Systems & Workflows"
            title="Automation that protects revenue."
            description="Detailed breakdown of software solutions, tracking triggers, and workflow automations engineered to increase retention, recovery rates, and efficiency."
          />

          <div className="automation-grid">
            {PORTFOLIO_DATA.automations.map((item, idx) => (
              <div key={idx} className="glass-card automation-card reveal">
                <h3 className="automation-title">{item.title}</h3>

                <div className="automation-detail">
                  <span className="automation-lbl">Challenge:</span>
                  <span className="automation-val">{item.problem}</span>
                </div>

                <div className="automation-detail">
                  <span className="automation-lbl">Solution:</span>
                  <span className="automation-val">{item.system}</span>
                </div>

                <div className="automation-detail">
                  <span className="automation-lbl">Impact:</span>
                  <ul className="automation-impact-list">
                    {item.impact.map((bullet, bIdx) => (
                      <li key={bIdx} className="automation-val">
                        {renderFormattedText(bullet)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="automation-tags">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="automation-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container">
          <SectionHeader
            tagText="What People Say"
            title="Don't take my word for it."
            description="Direct recommendations and reviews from e-commerce merchants, founders, and operations leaders."
          />

          <div className="testimonials-grid">
            {PORTFOLIO_DATA.testimonials.map((item, idx) => (
              <div key={idx} className="glass-card testimonial-card reveal">
                <div className="testimonial-topline">
                  <div className="testimonial-rating" aria-label={`Rating: ${item.rating} stars`}>
                    {Array.from({ length: item.rating }).map((_, rIdx) => (
                      <span key={rIdx}>★</span>
                    ))}
                  </div>
                  <div className="shopify-stamp" aria-label="Shopify review">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shopify.svg" alt="" />
                    <span>Shopify</span>
                  </div>
                </div>
                <p
                  className="testimonial-quote"
                  dangerouslySetInnerHTML={{ __html: item.quote }}
                />
                <div className="testimonial-client">{item.client}</div>
                <div className="testimonial-meta">{item.country} • {item.duration} • {item.date}</div>
              </div>
            ))}

            {/* <div className="glass-card testimonial-card testimonial-placeholder reveal">
              <div className="testimonial-placeholder-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </div>
              <h3 className="testimonial-placeholder-title">Are you a founder?</h3>
              <p className="testimonial-placeholder-desc">Let's connect on WhatsApp and talk about scaling your customer support channels.</p>
              <a
                href="http://wa.me/+919634687270?text=Caught%20this%20from%20your%20portfolio"
                className="btn btn-whatsapp btn-sm"
                style={{ marginTop: "16px", padding: "8px 16px", fontSize: "0.85rem" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Send WhatsApp Msg
              </a>
            </div>

            <div className="glass-card testimonial-card testimonial-placeholder reveal">
              <div className="testimonial-placeholder-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <h3 className="testimonial-placeholder-title">LinkedIn Connection</h3>
              <p className="testimonial-placeholder-desc">Connect with me on LinkedIn to review recommendations or share insights.</p>
              <a
                href="https://www.linkedin.com/in/utkarshkala/"
                className="btn btn-secondary btn-sm"
                style={{ marginTop: "16px", padding: "8px 16px", fontSize: "0.85rem" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
            </div> */}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};
