import React from "react";

interface LetterHopProps {
  text: string;
  className?: string;
}

export const LetterHop: React.FC<LetterHopProps> = ({ text, className = "" }) => {
  return (
    <span className={className}>
      {[...text].map((char, index) => (
        <span
          key={index}
          className="ch"
          style={{ "--i": index } as React.CSSProperties}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};
