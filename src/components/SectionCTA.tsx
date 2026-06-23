import React from "react";
import { Link } from "react-router-dom";
import { trackCTAClick } from "../analytics/analytics";

interface SectionCTAProps {
  to?: string;
  onClick?: () => void;
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SectionCTA: React.FC<SectionCTAProps> = ({
  to,
  onClick,
  text,
  className = "",
  style,
}) => {
  const btnClass = `btn btn-green ${className}`.trim();
  
  const handleClick = () => {
    trackCTAClick(text, "Section CTA Link");
    if (onClick) onClick();
  };
  
  return (
    <div style={{ textAlign: "center", ...style }} className="reveal">
      {to ? (
        <Link to={to} className={btnClass} onClick={handleClick}>
          {text}
        </Link>
      ) : (
        <button onClick={handleClick} className={btnClass}>
          {text}
        </button>
      )}
    </div>
  );
};
