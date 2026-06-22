import React, { useEffect } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { ContactCTA } from "../components/ContactCTA";
import { SectionHeader } from "../components/SectionHeader";

export const Journey: React.FC = () => {
  // Unconditional IntersectionObserver scroll reveals
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
      {/* Timeline Page Header */}
      <section className="section" style={{ paddingBottom: "20px" }}>
        <div className="container">
          <SectionHeader
            tagText="Detailed Timeline"
            title="Building growth systems, not just managing customers."
            description="A professional journey spanning leadership, engineering, customer success, and automation - focused on helping SaaS companies increase retention, expansion, and operational scale."
            isMainHeader={true}
          />
        </div>
      </section>

      {/* Timeline Grid */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container">
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {PORTFOLIO_DATA.journeyItems.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div 
                  key={idx}
                  className={`timeline-item ${isLeft ? "timeline-item-left" : "timeline-item-right"} reveal`}
                >
                  <span className="timeline-date-badge">{item.date}</span>
                  <div className="glass-card timeline-card">
                    <span className="timeline-meta">{item.location}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="journey-quote-box reveal">
            <p>
              “Great customer outcomes don’t come from solving requests - they come from understanding the problems behind them. My approach has always been to dive deep, connect the dots across customers, teams, and technology, and turn complex challenges into scalable systems that drive business growth.”
            </p>
            <span>- UTKARSH KALA</span>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTA />
    </main>
  );
};
