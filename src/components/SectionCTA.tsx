import React from "react";
import { Link } from "react-router-dom";

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
  
  return (
    <div style={{ textAlign: "center", ...style }} className="reveal">
      {to ? (
        <Link to={to} className={btnClass}>
          {text}
        </Link>
      ) : (
        <button onClick={onClick} className={btnClass}>
          {text}
        </button>
      )}
    </div>
  );
};
