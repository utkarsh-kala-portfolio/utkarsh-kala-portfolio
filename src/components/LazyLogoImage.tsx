import React, { useEffect, useState } from "react";

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
  const [queuedSrc, setQueuedSrc] = useState<string | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const loaded = loadedSrc === src;
  const failed = failedSrc === src;

  useEffect(() => {
    const queueImage = () => setQueuedSrc(src);
    let timeoutId: number | undefined;
    let idleId: number | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(queueImage, { timeout: 900 });
    } else {
      timeoutId = window.setTimeout(queueImage, 250);
    }

    return () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [src]);

  return (
    <span className={`async-logo-shell ${loaded ? "loaded" : ""}`}>
      {(!loaded || failed) && fallback ? (
        <span className="async-logo-fallback" aria-hidden="true">
          {fallback}
        </span>
      ) : null}
      {queuedSrc && !failed ? (
        <img
          src={queuedSrc}
          alt={alt}
          className={className}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setLoadedSrc(queuedSrc)}
          onError={() => setFailedSrc(queuedSrc)}
        />
      ) : null}
    </span>
  );
};
