import React from "react";

interface SectionHeaderProps {
  tagText: string;
  title?: string;
  subtitle?: string;
  description?: React.ReactNode;
  isMainHeader?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tagText,
  title,
  subtitle,
  description,
  isMainHeader = false,
  className = "",
  style,
}) => {
  return (
    <div className={`section-header reveal ${className}`.trim()} style={style}>
      <span className="section-tag">{tagText}</span>
      {title && (isMainHeader ? (
        <h1 className="section-title">{title}</h1>
      ) : (
        <h2 className="section-title">{title}</h2>
      ))}
      {subtitle && (
        <p className="section-subtitle" style={{ fontSize: "1.25rem", fontWeight: 700, margin: "-12px 0 16px", color: "var(--ink)" }}>
          {subtitle}
        </p>
      )}
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
};
