import React from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { ContactCTA } from "../components/ContactCTA";
import { FilteredHub, type HubCategory } from "../components/FilteredHub";
import { LazyLogoImage } from "../components/LazyLogoImage";

import {
  techStackLogoBasePath,
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

  const logoFile = PORTFOLIO_DATA.techStackLogos[name];
  if (logoFile) {
    return `${techStackLogoBasePath}/${logoFile}`;
  }

  const slug = PORTFOLIO_DATA.simpleIconMappings[name];
  if (slug) {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`;
  }
  return null;
};

export const SaaSToolkit: React.FC = () => {
  // Map stack categories to HubCategory array
  const categories: HubCategory[] = PORTFOLIO_DATA.stackCategories.map((c) => ({
    id: c.id,
    name: c.name,
    items: c.items,
  }));

  const renderCard = (item: string) => {
    const iconUrl = getStackIcon(item);

    return (
      <div className="brand-card">
        <div className="brand-logo-wrap">
          {iconUrl ? (
            <LazyLogoImage
              src={iconUrl}
              alt={item}
              className="brand-logo-img"
              fallback={<LayersIcon />}
            />
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
        description="Every system and technology I've operated and integrated across SaaS, commerce, CRM, messaging, analytics, AI workflows, and automation."
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



      <ContactCTA />
    </>
  );
};
