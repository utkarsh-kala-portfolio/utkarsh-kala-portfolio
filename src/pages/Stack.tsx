import React from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { ContactCTA } from "../components/ContactCTA";
import { FilteredHub, type HubCategory } from "../components/FilteredHub";
import { LogoMarquee } from "../components/LogoMarquee";
import { SectionCTA } from "../components/SectionCTA";
import {
  customerBannerDurationSeconds,
  customerBannerLogos,
} from "../data/logoBanners";

const LayersIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "var(--accent-green)" }}
  >
    <path d="m12 3-10 5 10 5 10-5-10-5Z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>
);

const getStackIcon = (itemName: string): string | null => {
  const name = itemName.toLowerCase().trim();

  if (PORTFOLIO_DATA.techStackLogos[name]) {
    return PORTFOLIO_DATA.techStackLogos[name];
  }

  const slug = PORTFOLIO_DATA.simpleIconMappings[name];
  if (slug) {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`;
  }
  return null;
};

export const Stack: React.FC = () => {
  // Map stack categories to HubCategory array
  const categories: HubCategory[] = PORTFOLIO_DATA.stackCategories.map((c) => ({
    id: c.id,
    name: c.name,
    items: c.items,
  }));

  const renderCard = (item: string) => {
    const iconUrl = getStackIcon(item);

    /** On image load failure, swap to the fallback icon */
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      const wrap = img.closest(".brand-logo-wrap") as HTMLElement | null;
      if (wrap) {
        img.style.display = "none";
        // Only inject fallback once
        if (!wrap.querySelector("svg")) {
          const ns = "http://www.w3.org/2000/svg";
          const svg = document.createElementNS(ns, "svg");
          svg.setAttribute("width", "20");
          svg.setAttribute("height", "20");
          svg.setAttribute("viewBox", "0 0 24 24");
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          svg.setAttribute("stroke-width", "2.5");
          svg.setAttribute("stroke-linecap", "round");
          svg.setAttribute("stroke-linejoin", "round");
          svg.style.color = "var(--accent-green)";
          svg.innerHTML = '<path d="m12 3-10 5 10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>';
          wrap.appendChild(svg);
        }
      }
    };

    return (
      <div className="brand-card">
        <div className="brand-logo-wrap">
          {iconUrl ? (
            <img src={iconUrl} alt={item} className="brand-logo-img" onError={handleImgError} />
          ) : (
            <LayersIcon />
          )}
        </div>
        <span className="brand-name-txt">{item}</span>
      </div>
    );
  };

  return (
    <>
      <FilteredHub
        tagText="Integrations & Tools"
        title="The Complete SaaS Toolkit"
        description="Every system and technology I have operated and integrated across SaaS, billing, reviews, analytics, messaging, and commerce systems."
        searchPlaceholder="Search tool name..."
        categories={categories}
        renderCard={renderCard}
      >
        {/* Core highlight badges above the filtered list */}
        <section className="section" style={{ paddingBottom: "10px", paddingTop: "0px" }}>
          <div className="container">
            <div className="stack-highlights reveal active" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "30px" }}>
              {PORTFOLIO_DATA.coreStrengths.map((str, idx) => (
                <div key={idx} className={`highlight-badge ${idx % 2 === 0 ? "blue-theme" : "green-theme"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  <div>
                    <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 700 }}>{str.name}</span>
                    <span style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{str.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </FilteredHub>

      {/* Customer Logo Banner below the filtered list */}
      <LogoMarquee
        logos={customerBannerLogos}
        title="Trusted by Growth Brands"
        animationDurationSeconds={customerBannerDurationSeconds}
      />

      {/* CTA to view complete customers */}
      <SectionCTA
        to="/customers"
        text="View All Customers"
        style={{ marginTop: "-10px", marginBottom: "60px" }}
        className="active"
      />

      <ContactCTA />
    </>
  );
};
