import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const LOADING_MESSAGES = [
  "Loading customer obsession...",
  "Loading problem-solving mode...",
  "Loading systems thinking...",
  "Loading growth mindset...",
  "Loading something meaningful...",
];

export const Loader: React.FC = () => {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const pathRef = useRef<SVGPathElement>(null);
  const [dotPos, setDotPos] = useState({ x: 10, y: 140 });

  // Select random loading message on page change
  const [loadingMessage, setLoadingMessage] = useState("Loading systems...");

  useEffect(() => {
    // Reset loader state for the new cycle
    setProgress(0);
    setIsDone(false);
    setShouldRender(true);
    document.documentElement.classList.remove("ready");

    // Select random loading message that stays static for this cycle
    const randomIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
    setLoadingMessage(LOADING_MESSAGES[randomIndex]);

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setProgress(100);
      setIsDone(true);
      setShouldRender(false);
      document.documentElement.classList.add("ready");
      return;
    }

    const duration = 1200; // ms to animate
    const startTime = performance.now();
    let frameId: number;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const p = Math.min(elapsed / duration, 1);

      // Easing out cubic: 1 - (1 - p)^3
      const easedProgress = Math.round(100 * (1 - Math.pow(1 - p, 3)));
      setProgress(easedProgress);

      if (p < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsDone(true);
          document.documentElement.classList.add("ready");
          // Give CSS slide-up transition time to complete
          setTimeout(() => {
            setShouldRender(false);
          }, 800);
        }, 150);
      }
    };

    frameId = requestAnimationFrame(animate);

    // Safety timeout to never trap the user
    const safetyTimeout = setTimeout(() => {
      setIsDone(true);
      document.documentElement.classList.add("ready");
      setTimeout(() => {
        setShouldRender(false);
      }, 800);
    }, 2800);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(safetyTimeout);
    };
  }, [pathname]);

  // Update dot coordinates on path
  useEffect(() => {
    if (pathRef.current) {
      try {
        const totalLength = pathRef.current.getTotalLength();
        const currentLength = (progress / 100) * totalLength;
        const pt = pathRef.current.getPointAtLength(currentLength);
        setDotPos({ x: pt.x, y: pt.y });
      } catch (e) {
        // Fallback calculations if getPointAtLength throws or is unavailable
        setDotPos({
          x: 10 + (progress / 100) * 280,
          y: 140 - (progress / 100) * 130
        });
      }
    }
  }, [progress]);

  if (!shouldRender) return null;

  const pathLength = 300;
  const strokeDashoffset = pathLength - (progress / 100) * pathLength;

  return (
    <div className={`loader-overlay ${isDone ? "done" : ""}`} aria-hidden="true">
      <div className="loader-container">
        {/* Upscaling Graph SVG */}
        <div className="loader-graph-container">
          <svg viewBox="0 0 300 150" className="loader-svg">
            <defs>
              <linearGradient id="grid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
              </linearGradient>
            </defs>

            {/* Subtle Grid Background */}
            <rect width="300" height="150" fill="url(#grid-grad)" />
            <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <line x1="0" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <line x1="0" y1="120" x2="300" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

            <line x1="60" y1="0" x2="60" y2="150" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <line x1="120" y1="0" x2="120" y2="150" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <line x1="180" y1="0" x2="180" y2="150" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <line x1="240" y1="0" x2="240" y2="150" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

            {/* Glowing trend line */}
            <path
              ref={pathRef}
              d="M 10 140 Q 60 130 90 90 T 170 70 T 230 40 T 290 15"
              fill="none"
              stroke="var(--accent-green)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={pathLength}
              strokeDashoffset={strokeDashoffset}
              className="loader-path"
            />

            {/* Pulsing leading indicator dot */}
            {progress > 0 && (
              <circle
                cx={dotPos.x}
                cy={dotPos.y}
                r="6"
                fill="var(--accent-green)"
                className="loader-dot"
              />
            )}
          </svg>
        </div>

        {/* Counter and Labels */}
        <div className="loader-info">
          <div className="loader-num-wrapper">
            <span className="loader-num">{progress}</span>
            <span className="loader-percent">%</span>
          </div>
          <div className="loader-label">{loadingMessage}</div>
        </div>
      </div>
    </div>
  );
};
