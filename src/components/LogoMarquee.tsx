import React from "react";
 
interface LogoMarqueeProps {
  logos: string[];
  title?: string;
  animationDurationSeconds?: number;
}

/** Hide a broken logo item + its adjacent separator from the marquee */
const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  const item = img.closest(".marquee-item") as HTMLElement | null;
  if (item) {
    item.style.display = "none";
    // Also hide the adjacent separator (next sibling)
    const sep = item.nextElementSibling as HTMLElement | null;
    if (sep?.classList.contains("marquee-separator")) {
      sep.style.display = "none";
    }
  }
};
 
export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ logos, title, animationDurationSeconds = 60 }) => {
  // Duplicate logos array to guarantee width for smooth continuous animation
  const repeatedLogos = [...logos, ...logos];
 
  return (
    <section className="section" style={{ paddingTop: "0px", paddingBottom: "30px" }}>
      {title && (
        <div className="container">
          <p className="section-tag" style={{ textAlign: "center", display: "block", width: "max-content", margin: "0 auto 24px", fontSize: "0.8rem" }}>
            {title}
          </p>
        </div>
      )}
      <div className="marquee-container reveal active">
        <div
          className="marquee-track"
          style={{ animationDuration: `${animationDurationSeconds}s` }}
        >
          {repeatedLogos.map((logo, idx) => (
            <React.Fragment key={`m1-${idx}`}>
              <div className="marquee-item">
                <img
                  src={logo}
                  alt="Partner logo"
                  className="marquee-logo-img"
                  onError={handleLogoError}
                />
              </div>
              <div className="marquee-separator">|</div>
            </React.Fragment>
          ))}
          {repeatedLogos.map((logo, idx) => (
            <React.Fragment key={`m2-${idx}`}>
              <div className="marquee-item">
                <img
                  src={logo}
                  alt="Partner logo"
                  className="marquee-logo-img"
                  onError={handleLogoError}
                />
              </div>
              <div className="marquee-separator">|</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
