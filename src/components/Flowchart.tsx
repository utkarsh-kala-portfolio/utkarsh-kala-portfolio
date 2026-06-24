import React, { useEffect, useRef } from "react";

export const Flowchart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous renders if any
    container.innerHTML = "";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 460 460");
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
      cs: { x: 60, y: 50, label: "Customer Success", color: "#3b82f6" },
      prod: { x: 145, y: 95, label: "Product Strategy", color: "#3b82f6" },
      eng: { x: 230, y: 50, label: "Engineering", color: "#3b82f6" },
      auto: { x: 315, y: 95, label: "Automation", color: "#3b82f6" },
      rev: { x: 400, y: 50, label: "Revenue Operations", color: "#3b82f6" },
      hub: { x: 230, y: 230, label: "Growth Engine", color: "#84cc16", isHub: true },
      nrr: { x: 60, y: 365, label: "↑ NRR Growth", color: "#10b981" },
      churn: { x: 230, y: 365, label: "↓ Churn Reduction", color: "#10b981" },
      adopt: { x: 145, y: 410, label: "↑ Product Adoption", color: "#10b981" },
      exp: { x: 315, y: 410, label: "↑ Expansion Revenue", color: "#10b981" },
      eff: { x: 400, y: 365, label: "↑ Team Efficiency", color: "#10b981" },
    };

    const drawLine = (from: FlowNode, to: FlowNode, index: number) => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const d = `M ${from.x} ${from.y} C ${from.x} ${(from.y + to.y) / 2}, ${to.x} ${(from.y + to.y) / 2}, ${to.x} ${to.y}`;
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
    drawLine(nodes.hub, nodes.adopt, 3);
    drawLine(nodes.hub, nodes.exp, 4);
    drawLine(nodes.hub, nodes.eff, 5);

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
        // Center the Growth Engine label inside a sleek glowing badge
        // Center the Growth Engine label inside a sleek glowing badge
        const rectW = 130;
        const rectH = 32;

        // Soft lime-green glow effect for the hub badge
        const pillGlow = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        pillGlow.setAttribute("x", (node.x - rectW / 2).toString());
        pillGlow.setAttribute("y", (node.y - rectH / 2).toString());
        pillGlow.setAttribute("width", rectW.toString());
        pillGlow.setAttribute("height", rectH.toString());
        pillGlow.setAttribute("fill", node.color);
        pillGlow.setAttribute("opacity", "0.25");
        pillGlow.setAttribute("filter", "url(#glow-green)");
        pillGlow.setAttribute("rx", "16");
        pillGlow.setAttribute("ry", "16");
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
        pill.setAttribute("rx", "16");
        pill.setAttribute("ry", "16");
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
        text.setAttribute("y", (node.y + 5).toString()); // Center text vertically in the 32px tall pill
        text.setAttribute("fill", "var(--accent-indigo)");
        text.setAttribute("font-size", "15px");
        text.setAttribute("text-anchor", "middle");
      } else {
        text.setAttribute("x", node.x.toString());
        text.setAttribute("y", (node.y < 200 ? node.y - 16 : node.y + 24).toString());
        text.setAttribute("fill", "var(--ink)");
        text.setAttribute("font-size", "13px");
        text.setAttribute("text-anchor", "middle");
      }

      text.setAttribute("font-family", "var(--font-family-display)");
      text.setAttribute("font-weight", "700");
      if (node.label.startsWith("↑")) {
        const arrowSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        arrowSpan.textContent = "↑ ";
        arrowSpan.setAttribute("fill", "#10b981"); // Green
        arrowSpan.setAttribute("font-size", "16px"); // Slightly bigger
        text.appendChild(arrowSpan);

        const textSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        textSpan.textContent = node.label.substring(2);
        text.appendChild(textSpan);
      } else if (node.label.startsWith("↓")) {
        const arrowSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        arrowSpan.textContent = "↓ ";
        arrowSpan.setAttribute("fill", "#ef4444"); // Red
        arrowSpan.setAttribute("font-size", "16px"); // Slightly bigger
        text.appendChild(arrowSpan);

        const textSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        textSpan.textContent = node.label.substring(2);
        text.appendChild(textSpan);
      } else {
        text.textContent = node.label;
      }
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
