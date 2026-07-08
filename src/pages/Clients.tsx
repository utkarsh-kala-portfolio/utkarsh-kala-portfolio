import React from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { ContactCTA } from "../components/ContactCTA";
import { FilteredHub, type HubCategory } from "../components/FilteredHub";
import { LazyLogoImage } from "../components/LazyLogoImage";
import { LogoMarquee } from "../components/LogoMarquee";
import { SectionCTA } from "../components/SectionCTA";
import {
  customerLogoBasePath,
  techStackBannerLogos,
  techStackBannerDurationSeconds,
} from "../data/logoBanners";

const BriefcaseIcon: React.FC = () => (
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
    style={{ color: "var(--accent-indigo)" }}
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const getBrandLogo = (brandName: string): string | null => {
  const logoFile = PORTFOLIO_DATA.brandLogoMap[brandName.toLowerCase()];
  return logoFile ? `${customerLogoBasePath}/${logoFile}` : null;
};

export const Clients: React.FC = () => {
  // Map client portfolio to HubCategory array
  const categories: HubCategory[] = PORTFOLIO_DATA.clientPortfolio.map((c) => ({
    id: c.industry.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: c.industry,
    items: c.brands,
  }));

  const renderCard = (brand: string) => {
    const logoSrc = getBrandLogo(brand);

    return (
      <div className="brand-card">
        <div className="brand-logo-wrap">
          {logoSrc ? (
            <LazyLogoImage
              src={logoSrc}
              alt={brand}
              className="brand-logo-img"
              fallback={<BriefcaseIcon />}
            />
          ) : (
            <BriefcaseIcon />
          )}
        </div>
        <span className="brand-name-txt">{brand}</span>
      </div>
    );
  };

  return (
    <>
      <FilteredHub
        tagText="Client Portfolio"
        title="Brands and institutions across industries."
        description="Supported enterprise and high-growth accounts across D2C, education, healthcare, sports, lifestyle, FMCG, spirituality, technology, real estate, and international commerce."
        searchPlaceholder="Search brand name..."
        categories={categories}
        renderCard={renderCard}
        noteText="Note: Selected names shown for portfolio representation. Some work may have been delivered as part of QuickReply.ai’s customer success, implementation, support, and automation ecosystem."
      />

      {/* Integration Logo Banner below the filtered list */}
      <LogoMarquee
        logos={techStackBannerLogos}
        title="Operated & Integrated Systems"
        animationDurationSeconds={techStackBannerDurationSeconds}
      />

      {/* CTA to view complete integration stack */}
      <SectionCTA
        to="/saas-toolkit"
        text="View Complete Integration Stack"
        style={{ marginTop: "-10px", marginBottom: "60px" }}
        className="active"
      />

      <ContactCTA />
    </>
  );
};
