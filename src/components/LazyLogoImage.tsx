import React, { useState } from "react";

interface LazyLogoImageProps {
  src: string;
  alt: string;
  className: string;
  fallback?: React.ReactNode;
}

export const LazyLogoImage: React.FC<LazyLogoImageProps> = ({
  src,
  alt,
  className,
  fallback,
}) => {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const loaded = loadedSrc === src;
  const failed = failedSrc === src;

  return (
    <span className={`async-logo-shell ${loaded ? "loaded" : ""}`}>
      {(!loaded || failed) && fallback ? (
        <span className="async-logo-fallback" aria-hidden="true">
          {fallback}
        </span>
      ) : null}
      {!failed ? (
        <img
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
        />
      ) : null}
    </span>
  );
};
