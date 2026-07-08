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
              <h1 className="hero-title" style={{ lineHeight: "1.25" }}>
                Building Systems <br />
                <span style={{ color: "var(--text-muted)", fontSize: "0.8em", fontWeight: "500", display: "inline-block", margin: "4px 0" }}>That Convert</span> <br />
                <span style={{
                  background: "linear-gradient(to right, #ef4444, var(--accent-coral))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "800"
                }}>Customer Problems</span> <br />
                <span style={{ color: "var(--text-muted)", fontSize: "0.8em", fontWeight: "500", display: "inline-block", margin: "4px 0" }}>into</span> <br />
                <span style={{ display: "block", marginTop: "10px" }}>
                  <span style={{ display: "block", marginBottom: "6px" }}>
                    <span style={{ color: "var(--accent-green)", marginRight: "8px", fontWeight: "800" }}>✓</span>
                    <span style={{
                      background: "linear-gradient(to right, var(--accent-indigo), var(--accent-blue))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: "800"
                    }}>
                      Product Adoption
                    </span>
                  </span>
                  <span style={{ display: "block", marginBottom: "6px" }}>
                    <span style={{ color: "var(--accent-green)", marginRight: "8px", fontWeight: "800" }}>✓</span>
                    <span style={{
                      background: "linear-gradient(to right, var(--accent-indigo), var(--accent-blue))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: "800"
                    }}>
                      Revenue Retention
                    </span>
                  </span>
                  <span style={{ display: "block" }}>
                    <span style={{ color: "var(--accent-green)", marginRight: "8px", fontWeight: "800" }}>✓</span>
                    <span style={{
                      background: "linear-gradient(to right, var(--accent-indigo), var(--accent-blue))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: "800"
                    }}>
                      Scalable Growth
                    </span>
                  </span>
                </span>
              </h1>

              <p className="hero-subtitle">
                I help SaaS companies convert customer signals into workflows, integrations, AI systems, and measurable revenue outcomes — by bridging business strategy, product thinking, technical execution, and customer intelligence.
              </p>
            </div>

            <div className="hero-visual" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <Flowchart />
              <div className="hero-ctas" style={{ width: "100%", maxWidth: "480px", justifyContent: "center" }}>
                <Link
                  to="/systems"
                  className="btn btn-primary"
                  onClick={() => trackCTAClick("Explore Systems", "Hero CTA")}
                  data-track-id="hero-primary-cta"
                >
                  Explore Systems I've Built
                </Link>
                <button
                  onClick={() => {
                    openModal('connect');
                    trackContactOpen('connect', 'Hero CTA');
                  }}
                  className="btn btn-secondary"
                  data-track-id="hero-connect-cta"
                >
                  Let's Connect
                </button>
              </div>
            </div>
          </div>

          {/* Hero metric cards */}
          <div className="hero-metrics-grid reveal">
            <MetricCard target="$2.5M+" label="ARR Influenced" />
            <MetricCard target="120%" label="Avg NRR" />
            <MetricCard target="<2%" label="Gross Churn" className="green-theme" />
            <MetricCard target="$50K+" label="MRR Expansion" className="green-theme" />
            {/* <MetricCard target="900+" label="Accounts Overseen" /> */}
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
                Somewhere along the journey, my teammates started calling me <strong>&ldquo;Kala Jaadugar&rdquo; (The Black Magician)</strong> — not because problems disappeared magically, but because complex business, integration, and operational challenges had a pattern: they would turn into scalable systems, automated workflows, and measurable revenue outcomes.
                <br />
                <strong style={{ display: "block", marginTop: "12px", color: "var(--accent-indigo)" }}>Diagnose → Design → Automate → Scale</strong>
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
                The nickname stayed - and so did the approach!
              </p>

              <div style={{ borderTop: "2px dashed rgba(15, 23, 42, 0.1)", paddingTop: "20px", textAlign: "left" }}>
                <h4 style={{ color: "var(--text-bright)", fontSize: "1rem", fontWeight: "700", marginBottom: "16px" }}>Impact Delivered</h4>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "var(--text-main)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="var(--accent-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>$50K+ MRR</strong> Generated Through Integration-Led Revenue Engine</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "var(--text-main)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="var(--accent-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>&lt;2%</strong> Gross Revenue Churn Through Predictive Health Scoring</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "var(--text-main)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="var(--accent-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>40%</strong> Support Operations Efficiency Improvement</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "var(--text-main)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="var(--accent-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>900+</strong> Accounts Managed Through Customer Intelligence Platform</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Methodology Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} className="reveal">
              <div className="glass-card">
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px", color: "var(--ink)" }}>1. Diagnose Before Designing</h3>
                <p style={{ color: "var(--text-main)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  Understand the business problem, broken workflow, stakeholder pain, APIs, data movement, ownership gaps, and measurable outcome before building.
                </p>
              </div>
              <div className="glass-card">
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px", color: "var(--ink)" }}>2. Translate Business Into Workflows</h3>
                <p style={{ color: "var(--text-main)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  Convert customer requirements into product opportunities, technical workflows, integration logic, adoption journeys, or operating models.
                </p>
              </div>
              <div className="glass-card">
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px", color: "var(--ink)" }}>3. Automate What Doesn't Scale</h3>
                <p style={{ color: "var(--text-main)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  Build repeatable triggers, dashboards, health scores, recovery workflows, SLA systems, playbooks, and AI-assisted processes.
                </p>
              </div>
              <div className="glass-card">
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px", color: "var(--ink)" }}>4. Own Outcomes End-to-End</h3>
                <p style={{ color: "var(--text-main)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  Operate across Product, Engineering, Revenue, CS, Support, and enterprise stakeholders until the solution creates measurable business impact.
                </p>
              </div>
              <div className="glass-card">
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px", color: "var(--ink)" }}>5. Scale the System</h3>
                <p style={{ color: "var(--text-main)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  Turn one-off fixes into reusable frameworks, product feedback loops, onboarding models, customer intelligence systems, and revenue workflows.
                </p>
              </div>
            </div>
          </div>

          <p className="portfolio-note reveal active" style={{ marginTop: "40px", textAlign: "center" }}>
            That became the "Kala Jaadu Effect" — <strong>Signal → Insight → Workflow → Revenue.</strong>
          </p>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container">
          <SectionHeader
            tagText="Systems Preview"
            title="Systems That Protect Revenue"
            description="A preview of workflow, revenue, and operational systems designed to turn customer problems into measurable business outcomes."
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

          <SectionCTA to="/systems" text="View All Systems" />
        </div>
      </section>

      {/* Journey Preview */}
      <section className="section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container">
          <SectionHeader
            tagText="Journey Summary"
            title="A path built on technical excellence."
            description="From Computer Science Engineering to Business Analyst, Technical Analyst, and now scaling business strategy and post-sale systems leadership."
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

          <SectionCTA to="/saas-toolkit" text="Explore Complete SaaS Toolkit" style={{ marginBottom: "40px" }} />

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

          <SectionCTA to="/clients" text="View All Clients" />
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTA />
    </main>
  );
};
