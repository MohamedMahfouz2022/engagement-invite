"use client";

import { useEffect, useRef } from "react";

const PETAL_CONFIGS = [
  { x: 5,  size: 12, dur: 18, delay: 0,   opacity: 0.35, type: 0 },
  { x: 15, size: 9,  dur: 22, delay: 4,   opacity: 0.25, type: 1 },
  { x: 25, size: 14, dur: 16, delay: 8,   opacity: 0.30, type: 2 },
  { x: 38, size: 8,  dur: 20, delay: 2,   opacity: 0.22, type: 0 },
  { x: 50, size: 11, dur: 25, delay: 6,   opacity: 0.28, type: 1 },
  { x: 62, size: 10, dur: 19, delay: 12,  opacity: 0.32, type: 2 },
  { x: 72, size: 13, dur: 23, delay: 3,   opacity: 0.20, type: 0 },
  { x: 82, size: 9,  dur: 17, delay: 9,   opacity: 0.27, type: 1 },
  { x: 90, size: 11, dur: 21, delay: 15,  opacity: 0.33, type: 2 },
  { x: 45, size: 8,  dur: 24, delay: 7,   opacity: 0.24, type: 0 },
  { x: 55, size: 12, dur: 18, delay: 11,  opacity: 0.29, type: 1 },
  { x: 30, size: 10, dur: 26, delay: 1,   opacity: 0.26, type: 2 },
];

const PETAL_COLORS = [
  ["#C4788A", "#E8B4BC"],
  ["#6B1B2A", "#8B2A3A"],
  ["#C9A96E", "#D4AF5A"],
] as const;

export default function FloatingPetals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    PETAL_CONFIGS.forEach((p, idx) => {
      const el = document.createElement("div");
      const [c1, c2] = PETAL_COLORS[p.type];
      el.style.cssText = [
        `position:fixed`,
        `left:${p.x}%`,
        `top:-60px`,
        `width:${p.size}px`,
        `height:${Math.round(p.size * 1.4)}px`,
        `border-radius:50% 0 50% 0`,
        `background:radial-gradient(ellipse, ${c1}88, ${c2}44)`,
        `opacity:${p.opacity}`,
        `pointer-events:none`,
        `z-index:1`,
        `animation:floatPetal${p.type} ${p.dur}s ${p.delay}s infinite linear`,
        `filter:blur(0.5px)`,
        `transform:rotate(${idx * 30}deg)`,
      ].join(";");
      container.appendChild(el);
    });

    const style = document.createElement("style");
    style.textContent = `
      @keyframes floatPetal0 {
        0%   { transform: translateY(-60px) translateX(0)    rotate(0deg);   opacity:0; }
        8%   { opacity: 0.5; }
        92%  { opacity: 0.2; }
        100% { transform: translateY(110vh) translateX(-25px) rotate(360deg); opacity:0; }
      }
      @keyframes floatPetal1 {
        0%   { transform: translateY(-60px) translateX(0)   rotate(45deg);  opacity:0; }
        8%   { opacity: 0.45; }
        92%  { opacity: 0.15; }
        100% { transform: translateY(110vh) translateX(30px) rotate(-270deg);opacity:0; }
      }
      @keyframes floatPetal2 {
        0%   { transform: translateY(-60px) translateX(0)    rotate(90deg);  opacity:0; }
        8%   { opacity: 0.55; }
        92%  { opacity: 0.18; }
        100% { transform: translateY(110vh) translateX(-15px) rotate(540deg); opacity:0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      container.innerHTML = "";
      style.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
