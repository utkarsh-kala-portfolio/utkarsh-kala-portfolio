import React from "react";
import { Link } from "react-router-dom";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { ContactCTA } from "../components/ContactCTA";
import { FilteredHub, type HubCategory } from "../components/FilteredHub";
import { LogoMarquee } from "../components/LogoMarquee";
import {
  customerLogoBasePath,
  techStackBannerLogos,
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

const brandLogoMap: Record<string, string> = {
  "aaft university": "5.png",
  "advanced hair studio": "45.png",
  "agaro lifestyle": "48.png",
  "alaanpay": "6.png",
  "amama jewels": "29.png",
  "astro arun pandit": "52.png",
  "aurelia diamonds": "43.png",
  "beeaar group": "24.png",
  "bizgurukul": "53.png",
  "carinfo": "41.png",
  "christ university": "42.png",
  "cornitos": "46.png",
  "corvi led": "51.png",
  "cp goenka international school": "39.png",
  "dabur 1884": "40.png",
  "dermawear": "38.png",
  "distacart / dista usa": "50.png",
  "expenseondemand": "47.png",
  "farmley": "36.png",
  "gemsmantra": "34.png",
  "gk hair / ph lab": "37.png",
  "goodveda": "28.png",
  "gujarat titans": "33.png",
  "hero homes": "4.png",
  "idp india": "32.png",
  "indus valley": "22.png",
  "jiva ayurveda": "21.png",
  "lal sweets india": "20.png",
  "manav rachna edu": "15.png",
  "menoveda": "14.png",
  "myfrido": "30.png",
  "nasacademy": "19.png",
  "nestroots": "49.png",
  "prime style.com": "26.png",
  "primestyle.com": "26.png",
  "priyagold": "12.png",
  "project serotonin": "23.png",
  "renee cosmetics": "10.png",
  "shree ashtech": "8.png",
  "shivam autozone": "25.png",
  "sploot - dog grooming": "1.png",
  "suwasthi": "7.png",
  "tdf diamonds": "16.png",
  "the akshaya patra foundation": "44.png",
  "the next decor": "54.png",
  "the pillow company": "17.png",
  "vehiclecare": "2.png",
};

const getBrandLogo = (brandName: string): string | null => {
  const logoFile = brandLogoMap[brandName.toLowerCase()];
  return logoFile ? `${customerLogoBasePath}/${logoFile}` : null;
};

export const Customers: React.FC = () => {
  // Map customer portfolio to HubCategory array
  const categories: HubCategory[] = PORTFOLIO_DATA.customerPortfolio.map((c) => ({
    id: c.industry.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: c.industry,
    items: c.brands,
  }));

  const renderCard = (brand: string) => {
    const logoSrc = getBrandLogo(brand);

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
          {logoSrc ? (
            <img src={logoSrc} alt={brand} className="brand-logo-img" onError={handleImgError} />
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
        description="A cross-industry customer portfolio spanning D2C, education, healthcare, real estate, sports, wellness, food, finance, and enterprise services."
        searchPlaceholder="Search brand name..."
        categories={categories}
        renderCard={renderCard}
        noteText="Note: Selected names shown for portfolio representation. Some work may have been delivered as part of QuickReply.ai’s customer success, implementation, support, and automation ecosystem."
      />

      {/* Integration Logo Banner below the filtered list */}
      <LogoMarquee logos={techStackBannerLogos} title="Operated & Integrated Systems" />

      {/* CTA to view complete integration stack */}
      <div style={{ textAlign: "center", marginTop: "-10px", marginBottom: "60px" }} className="reveal active">
        <Link to="/stack" className="btn btn-secondary">
          View Complete Integration Stack
        </Link>
      </div>

      <ContactCTA />
    </>
  );
};
