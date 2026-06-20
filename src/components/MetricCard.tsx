import React, { useEffect, useRef, useState } from "react";

interface MetricCardProps {
  target: string;
  label: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ target, label, className = "" }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const elementRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          startAnimation();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target]);

  const startAnimation = () => {
    const numMatch = target.match(/[\d.]+/);
    if (!numMatch) {
      setDisplayValue(target);
      return;
    }

    const targetNum = parseFloat(numMatch[0]);
    const isDecimal = target.includes(".");
    const prefix = target.split(numMatch[0])[0] || "";
    const suffix = target.split(numMatch[0])[1] || "";

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const update = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const current = easeProgress * targetNum;

      if (isDecimal) {
        setDisplayValue(`${prefix}${current.toFixed(1)}${suffix}`);
      } else {
        setDisplayValue(`${prefix}${Math.floor(current)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(target);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <div ref={elementRef} className={`glass-card metric-mini-card ${className}`}>
      <div className="metric-val">{displayValue}</div>
      <div className="metric-lbl">{label}</div>
    </div>
  );
};
