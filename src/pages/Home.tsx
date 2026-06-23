import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContactModal } from "../context/ContactModalContext";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { Flowchart } from "../components/Flowchart";
import { MetricCard } from "../components/MetricCard";
import { ContactCTA } from "../components/ContactCTA";
import { LogoMarquee } from "../components/LogoMarquee";
import { SectionHeader } from "../components/SectionHeader";
import { SectionCTA } from "../components/SectionCTA";
import { trackCTAClick, trackContactOpen } from "../analytics/analytics";
import {
  customerBannerDurationSeconds,
  customerBannerLogos,
  techStackBannerLogos,
  techStackBannerDurationSeconds,
} from "../data/logoBanners";

const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const Home: React.FC = () => {
  const { openModal } = useContactModal();

  // Unconditional scroll reveal triggers
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
    <main>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                Bridging Customer Success + Product + Engineering + Revenue
              </h1>

              <p className="hero-subtitle">
                I help SaaS businesses reduce churn, scale operations, and turn integrations into revenue by diagnosing problems deeply, automating what repeats, and owning outcomes end-to-end.
              </p>

              <div className="hero-ctas">
                <button
                  onClick={() => {
                    openModal('connect');
                    trackContactOpen('connect', 'Hero CTA');
                  }}
                  className="btn btn-primary"
                >
                  Let's Connect
                </button>
                <Link
                  to="/why-me"
                  className="btn btn-secondary"
                  onClick={() => trackCTAClick("View My Work", "Hero CTA")}
                >
                  View My Work
                </Link>
                <button
                  onClick={() => {
                    openModal('whatsapp');
                    trackContactOpen('whatsapp', 'Hero CTA');
                  }}
                  className="btn btn-whatsapp"
                  aria-label="WhatsApp me"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  WhatsApp me
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <Flowchart />
            </div>
          </div>

          {/* Hero metric cards */}
          <div className="hero-metrics-grid reveal">
            <MetricCard target="$2.5M+" label="ARR Managed" />
            <MetricCard target="220%" label="Peak NRR" />
            <MetricCard target="<2%" label="Gross Churn" className="green-theme" />
            <MetricCard target="$50K+" label="MRR Generated" className="green-theme" />
          </div>
        </div>
      </section>

      {/* Methodology & The Kala Jaadu Effect */}
      <section id="kala-jaadu" className="section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container">
          <SectionHeader
            tagText="Methodology"
            title="The &ldquo;Kala Jaadu&rdquo; Effect"
            description={
              <>
                Somewhere along the journey, my teammates started calling me <strong>&ldquo;Kala Jaadugar&rdquo; (The Black Magician)</strong> - not because problems disappeared magically, but because complex customer, integration, and operational challenges had a pattern: they would eventually turn into scalable systems, automated workflows, and measurable business outcomes.
              </>
            }
          />

          <div className="kj-container">
            {/* Left Card: Impact Visual */}
            <div className="kj-visual reveal" style={{ padding: "40px 32px" }}>
              <div className="kj-circle kj-photo-logo" style={{ transform: "none", border: "4px solid var(--ink)", margin: "0 auto 16px" }}>
                <img src="/assets/profile/home-display.png" alt="Utkarsh Kala" />
              </div>
              <p style={{ color: "var(--accent-blue)", fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.05em", marginBottom: "20px" }}>
                The nickname stayed — and so did the approach!
              </p>

              <div style={{ borderTop: "2px dashed rgba(15, 23, 42, 0.1)", paddingTop: "20px", textAlign: "left" }}>
                <h4 style={{ color: "var(--text-bright)", fontSize: "1rem", fontWeight: "700", marginBottom: "16px" }}>Impact Delivered</h4>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "var(--text-main)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="var(--accent-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>$50K+ MRR</strong> Generated Through Integration-Led Expansion</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "var(--text-main)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="var(--accent-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>&lt;2%</strong> Gross Revenue Churn Through Predictive Customer Health Scoring</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "var(--text-main)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="var(--accent-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>40%</strong> Increase in Support Operations Efficiency</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "var(--text-main)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="var(--accent-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>900+</strong> Accounts Managed Through Automated Recovery Workflows</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Methodology Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} className="reveal">
              <div className="glass-card">
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px", color: "var(--ink)" }}>1. Diagnose Before Designing</h3>
                <p style={{ color: "var(--text-main)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  Every problem starts with understanding the bigger picture - customer workflows, APIs, integrations, data movement, adoption patterns, and operational gaps. The goal is never to fix symptoms; it's to uncover the root cause.
                </p>
              </div>
              <div className="glass-card">
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px", color: "var(--ink)" }}>2. Automate What Doesn't Scale</h3>
                <p style={{ color: "var(--text-main)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  If a problem keeps repeating, it's a signal to build a system. From health scoring and churn prediction to CRM workflows and onboarding automation, the focus is on creating repeatable processes that create leverage.
                </p>
              </div>
              <div className="glass-card">
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px", color: "var(--ink)" }}>3. Own the Outcome End-to-End</h3>
                <p style={{ color: "var(--text-main)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  The best solutions happen at the intersection of teams. I work as the bridge between Customers, Customer Success, Product, Engineering, and Revenue teams - taking challenges from discovery to implementation to measurable impact.
                </p>
              </div>
            </div>
          </div>

          <p className="portfolio-note reveal active" style={{ marginTop: "40px", textAlign: "center" }}>
            That became the "Kala Jaadu Effect" - diving deep into complexity, finding clarity, and turning problems into scalable systems.
          </p>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container">
          <SectionHeader
            tagText="Case Studies"
            title="Peek into Automations"
            description="A brief preview of automated solutions built to streamline customer operations and proactively prevent churn."
          />

          <div className="automation-grid reveal" style={{ marginBottom: "40px" }}>
            {[
              PORTFOLIO_DATA.automations[0], // Integration-led expansion -> $50K+ MRR
              PORTFOLIO_DATA.automations[1], // Predictive health scoring -> <2% churn
            ].map((item, idx) => (
              <div key={idx} className="glass-card automation-card">
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

          <SectionCTA to="/why-me" text="View All Case Studies" />
        </div>
      </section>

      {/* Journey Preview */}
      <section className="section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container">
          <SectionHeader
            tagText="Journey Summary"
            title="A path built on technical excellence."
            description="Evolving from a Computer Science Engineering graduate to Business Analyst, Technical Analyst, and now scaling Customer Success leadership."
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px", margin: "0 auto 40px" }} className="reveal">
            <div className="glass-card" style={{ padding: "20px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span className="timeline-meta">QuickReply.ai • 2023–Present</span>
                <h3 style={{ fontSize: "1.25rem", margin: "4px 0" }}>Head of Customer Success</h3>
              </div>
              <span className="timeline-date-badge" style={{ margin: 0 }}>Active Role</span>
            </div>

            <div className="glass-card" style={{ padding: "20px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span className="timeline-meta">QuickReply.ai • 2022–2023</span>
                <h3 style={{ fontSize: "1.25rem", margin: "4px 0" }}>Technical Business Analyst</h3>
              </div>
              <span className="timeline-date-badge" style={{ margin: 0 }}>Key Milestone</span>
            </div>
          </div>

          <SectionCTA to="/journey" text="View Full Timeline" />
        </div>
      </section>

      {/* SaaS Toolkit Preview */}
      <section className="section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container">
          <SectionHeader
            tagText="Operations Stack"
            title="Integrated systems running in harmony."
            description="Operating at the core of CRM platforms, marketing tools, communication protocols, checkout workflows, and analytics layers."
          />

          <LogoMarquee logos={techStackBannerLogos} animationDurationSeconds={techStackBannerDurationSeconds} />

          <SectionCTA to="/stack" text="Explore Complete SaaS Toolkit" style={{ marginBottom: "40px" }} />

          <div className="stack-highlights reveal" style={{ marginBottom: "40px" }}>
            {PORTFOLIO_DATA.coreStrengths.slice(0, 4).map((str, idx) => (
              <div key={idx} className={`highlight-badge ${idx % 2 === 0 ? "blue-theme" : "green-theme"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                <div>
                  <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 700 }}>{str.name}</span>
                  <span style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{str.category}</span>
                </div>
              </div>
            ))}
          </div>

          <SectionHeader
            tagText="Trusted by Teams That Scale"
            style={{ marginTop: "56px", marginBottom: "24px" }}
          />

          <LogoMarquee
            logos={customerBannerLogos}
            animationDurationSeconds={customerBannerDurationSeconds}
          />

          <SectionCTA to="/customers" text="View All Customers" />
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTA />
    </main>
  );
};
