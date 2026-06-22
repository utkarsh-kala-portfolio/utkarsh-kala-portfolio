import { PORTFOLIO_DATA } from "./portfolioData";

export const customerLogoBasePath = "/assets/customer-logos";

export const customerBannerDurationSeconds = 300;
export const techStackBannerDurationSeconds = 150;

export const customerBannerLogos = Object.values(PORTFOLIO_DATA.brandLogoMap).map(
  (file) => `${customerLogoBasePath}/${file}`
);

export const techStackBannerLogos = Object.values(PORTFOLIO_DATA.techStackLogos);
