import React, { useEffect, useMemo, useState } from "react";
import { LazyLogoImage } from "./LazyLogoImage";
 
interface LogoMarqueeProps {
  logos: string[];
  title?: string;
  animationDurationSeconds?: number;
}

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ logos, title, animationDurationSeconds = 60 }) => {
  const [loadedLogos, setLoadedLogos] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    const seenLoaded = new Set<string>();

    logos.forEach((logo) => {
      const image = new Image();

      image.onload = () => {
        if (!active || seenLoaded.has(logo)) {
          return;
        }

        seenLoaded.add(logo);
        setLoadedLogos((currentLogos) =>
          currentLogos.includes(logo) ? currentLogos : [...currentLogos, logo]
        );
      };

      image.onerror = () => {
        seenLoaded.delete(logo);
      };

      image.src = logo;
    });

    return () => {
      active = false;
    };
  }, [logos]);

  const visibleLogos = useMemo(() => {
    const loadedSet = new Set(loadedLogos);
    return logos.filter((logo) => loadedSet.has(logo));
  }, [loadedLogos, logos]);

  // Duplicate logos array to guarantee width for smooth continuous animation
  const repeatedLogos = [...visibleLogos, ...visibleLogos];

  if (visibleLogos.length === 0) {
    return null;
  }
 
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
                <LazyLogoImage
                  src={logo}
                  alt="Partner logo"
                  className="marquee-logo-img"
                />
              </div>
              <div className="marquee-separator">|</div>
            </React.Fragment>
          ))}
          {repeatedLogos.map((logo, idx) => (
            <React.Fragment key={`m2-${idx}`}>
              <div className="marquee-item">
                <LazyLogoImage
                  src={logo}
                  alt="Partner logo"
                  className="marquee-logo-img"
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
