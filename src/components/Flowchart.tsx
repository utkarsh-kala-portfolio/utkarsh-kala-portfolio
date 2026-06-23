import React, { useEffect, useRef } from "react";

export const Flowchart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous renders if any
    container.innerHTML = "";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 460 420");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.overflow = "visible";

    svg.innerHTML = `
      <defs>
        <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="blue-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
    `;

    interface FlowNode {
      x: number;
      y: number;
      label: string;
      color: string;
      isHub?: boolean;
    }

    const nodes: Record<string, FlowNode> = {
      cs: { x: 140, y: 60, label: "Customer Success", color: "#3b82f6" },
      prod: { x: 140, y: 130, label: "Product Scoping", color: "#3b82f6" },
      eng: { x: 140, y: 200, label: "Engineering", color: "#3b82f6" },
      auto: { x: 140, y: 270, label: "CS Automation", color: "#3b82f6" },
      rev: { x: 140, y: 340, label: "Rev Operations", color: "#3b82f6" },
      hub: { x: 240, y: 200, label: "Retention Engine", color: "#84cc16", isHub: true },
      nrr: { x: 340, y: 80, label: "NRR Growth", color: "#10b981" },
      churn: { x: 340, y: 160, label: "Churn Reduction", color: "#10b981" },
      eff: { x: 340, y: 240, label: "Team Efficiency", color: "#10b981" },
      stick: { x: 340, y: 320, label: "Product Stickiness", color: "#10b981" },
    };

    const drawLine = (from: FlowNode, to: FlowNode, index: number) => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const d = `M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}`;
      p.setAttribute("d", d);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", "rgba(15, 23, 42, 0.15)");
      p.setAttribute("stroke-width", "2");
      svg.appendChild(p);

      const overlay = document.createElementNS("http://www.w3.org/2000/svg", "path");
      overlay.setAttribute("d", d);
      overlay.setAttribute("fill", "none");
      overlay.setAttribute("stroke-width", "2");

      const strokeColor = from.isHub ? "url(#blue-green)" : "var(--accent-blue)";
      overlay.setAttribute("stroke", strokeColor);
      overlay.setAttribute("stroke-dasharray", "10, 50");
      overlay.setAttribute("stroke-dashoffset", "0");

      overlay.style.animation = `flow-particle ${3 + index}s linear infinite`;
      overlay.classList.add("flow-line");
      svg.appendChild(overlay);
    };

    // Input lines (from pillars to Hub)
    drawLine(nodes.cs, nodes.hub, 1);
    drawLine(nodes.prod, nodes.hub, 2);
    drawLine(nodes.eng, nodes.hub, 3);
    drawLine(nodes.auto, nodes.hub, 4);
    drawLine(nodes.rev, nodes.hub, 5);

    // Output lines (from Hub to outcomes)
    drawLine(nodes.hub, nodes.nrr, 1);
    drawLine(nodes.hub, nodes.churn, 2);
    drawLine(nodes.hub, nodes.eff, 3);
    drawLine(nodes.hub, nodes.stick, 4);

    // Inject SVG animation style locally
    const style = document.createElement("style");
    style.textContent = `
      @keyframes flow-particle {
        0% { stroke-dashoffset: 120; }
        100% { stroke-dashoffset: 0; }
      }
      .flow-node {
        cursor: pointer;
        transition: r 0.2s ease, filter 0.2s ease;
      }
      .flow-node:hover {
        r: 10px;
      }
    `;
    svg.appendChild(style);

    // Render nodes
    Object.keys(nodes).forEach(key => {
      const node = nodes[key];
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

      if (node.isHub) {
        // Center the Retention Engine label inside a sleek glowing badge
        const rectW = 120;
        const rectH = 28;

        // Soft lime-green glow effect for the hub badge
        const pillGlow = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        pillGlow.setAttribute("x", (node.x - rectW / 2).toString());
        pillGlow.setAttribute("y", (node.y - rectH / 2).toString());
        pillGlow.setAttribute("width", rectW.toString());
        pillGlow.setAttribute("height", rectH.toString());
        pillGlow.setAttribute("fill", node.color);
        pillGlow.setAttribute("opacity", "0.25");
        pillGlow.setAttribute("filter", "url(#glow-green)");
        pillGlow.setAttribute("rx", "14");
        pillGlow.setAttribute("ry", "14");
        group.appendChild(pillGlow);

        // Solid background pill matching container background with lime-green border
        const pill = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        pill.setAttribute("x", (node.x - rectW / 2).toString());
        pill.setAttribute("y", (node.y - rectH / 2).toString());
        pill.setAttribute("width", rectW.toString());
        pill.setAttribute("height", rectH.toString());
        pill.setAttribute("fill", "var(--paper)");
        pill.setAttribute("stroke", node.color);
        pill.setAttribute("stroke-width", "2");
        pill.setAttribute("rx", "14");
        pill.setAttribute("ry", "14");
        pill.classList.add("flow-node");
        group.appendChild(pill);
      } else {
        const glow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        glow.setAttribute("cx", node.x.toString());
        glow.setAttribute("cy", node.y.toString());
        glow.setAttribute("r", "10");
        glow.setAttribute("fill", node.color);
        glow.setAttribute("opacity", "0.2");
        glow.setAttribute("filter", "url(#glow-blue)");
        group.appendChild(glow);

        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", node.x.toString());
        dot.setAttribute("cy", node.y.toString());
        dot.setAttribute("r", "5");
        dot.setAttribute("fill", node.color);
        dot.classList.add("flow-node");
        group.appendChild(dot);
      }

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

      if (node.isHub) {
        text.setAttribute("x", node.x.toString());
        text.setAttribute("y", (node.y + 4.5).toString()); // Center text vertically in the 28px tall pill
        text.setAttribute("fill", "var(--accent-indigo)");
        text.setAttribute("font-size", "11px");
        text.setAttribute("text-anchor", "middle");
      } else {
        text.setAttribute("x", (node.x + (node.x > 200 ? 15 : -15)).toString());
        text.setAttribute("y", (node.y + 4).toString());
        text.setAttribute("fill", "var(--ink)");
        text.setAttribute("font-size", "10px");
        text.setAttribute("text-anchor", node.x > 200 ? "start" : "end");
      }

      text.setAttribute("font-family", "var(--font-family-display)");
      text.setAttribute("font-weight", "700");
      text.textContent = node.label;
      group.appendChild(text);
      svg.appendChild(group);
    });

    container.appendChild(svg);
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-flowchart"
      className="node-flowchart"
      aria-label="Interactive SaaS automation flowchart."
    />
  );
};
