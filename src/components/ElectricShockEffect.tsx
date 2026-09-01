"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ElectricShockEffectProps {
  active: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onComplete?: () => void;
}

interface BoltData {
  id: number;
  path: string;
  branchPath?: string;
  strokeWidth: number;
  color: string;
  delayMs: number;
  durationMs: number;
  glowSize: number;
}

interface SparkData {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  delayMs: number;
  durationMs: number;
}

// Generate irregular zig-zag path points
function createZigzagPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  segments: number = 6,
  maxOffset: number = 22
): { path: string; points: { x: number; y: number }[] } {
  const points: { x: number; y: number }[] = [{ x: x1, y: y1 }];
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);

  if (len < 5) return { path: `M ${x1} ${y1} L ${x2} ${y2}`, points };

  // Perpendicular unit vector
  const nx = -dy / len;
  const ny = dx / len;

  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const bx = x1 + dx * t;
    const by = y1 + dy * t;
    // Envelope to taper displacement near endpoints
    const factor = Math.sin(t * Math.PI);
    const offset = (Math.random() * 2 - 1) * maxOffset * factor;

    points.push({
      x: bx + nx * offset,
      y: by + ny * offset,
    });
  }

  points.push({ x: x2, y: y2 });

  const path = points.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`),
    ""
  );

  return { path, points };
}

export default function ElectricShockEffect({
  active,
  cardRef,
  containerRef,
  onComplete,
}: ElectricShockEffectProps) {
  const [origin, setOrigin] = useState<{ x: number; y: number; width: number; height: number }>({
    x: 300,
    y: 120,
    width: 200,
    height: 200,
  });

  const [containerDimensions, setContainerDimensions] = useState<{ w: number; h: number }>({
    w: 800,
    h: 300,
  });

  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Calculate coordinates of the card relative to section container
  useEffect(() => {
    if (!active) return;

    if (containerRef.current && cardRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();

      const w = containerRect.width || 800;
      const h = containerRect.height || 300;
      setContainerDimensions({ w, h });

      const cx = cardRect.left - containerRect.left + cardRect.width / 2;
      const cy = cardRect.top - containerRect.top + cardRect.height / 2;

      setOrigin({
        x: cx,
        y: cy,
        width: cardRect.width,
        height: cardRect.height,
      });
    }

    // Auto complete timer ~1700ms
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1700);

    return () => clearTimeout(timer);
  }, [active, cardRef, containerRef, onComplete]);

  // Generate dynamic lightning bolts and sparks when activated
  const { bolts, sparks } = useMemo(() => {
    if (!active || isReducedMotion) return { bolts: [], sparks: [] };

    const { x: cx, y: cy, width: cw, height: ch } = origin;
    const { w: sw, h: sh } = containerDimensions;

    const colors = ["#00EA8D", "#00FF99", "#05C770", "#00C878"];
    const generatedBolts: BoltData[] = [];
    const generatedSparks: SparkData[] = [];

    // Phase 1: Small initial arcs around card (150ms - 350ms)
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + (Math.random() - 0.5) * 0.6;
      const rInner = Math.min(cw, ch) * 0.3;
      const rOuter = Math.min(cw, ch) * 0.75 + Math.random() * 30;

      const x1 = cx + Math.cos(angle) * rInner;
      const y1 = cy + Math.sin(angle) * rInner;
      const x2 = cx + Math.cos(angle + (Math.random() - 0.5) * 0.4) * rOuter;
      const y2 = cy + Math.sin(angle + (Math.random() - 0.5) * 0.4) * rOuter;

      const { path } = createZigzagPath(x1, y1, x2, y2, 4, 12);
      generatedBolts.push({
        id: i,
        path,
        strokeWidth: 1.8 + Math.random() * 1.2,
        color: colors[i % colors.length],
        delayMs: 120 + i * 40,
        durationMs: 140,
        glowSize: 10,
      });
    }

    // Phase 2: Major explosive lightning bolts (280ms - 1100ms)
    const numMajorBolts = 16;
    for (let i = 0; i < numMajorBolts; i++) {
      // Radiate outward across full page / section bounds
      const angle = (i / numMajorBolts) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const maxDist = Math.max(sw, sh, 800) * (0.45 + Math.random() * 0.65);

      const x1 = cx + (Math.random() - 0.5) * (cw * 0.5);
      const y1 = cy + (Math.random() - 0.5) * (ch * 0.5);
      let x2 = cx + Math.cos(angle) * maxDist;
      let y2 = cy + Math.sin(angle) * maxDist;

      // Clamp target within section bounds with small margin
      x2 = Math.max(10, Math.min(sw - 10, x2));
      y2 = Math.max(10, Math.min(sh - 10, y2));

      const { path, points } = createZigzagPath(x1, y1, x2, y2, 8, 30);

      // Create optional branch path extending further
      let branchPath: string | undefined;
      if (points.length > 3 && Math.random() > 0.25) {
        const branchPt = points[Math.floor(points.length * (0.3 + Math.random() * 0.4))];
        const bAngle = angle + (Math.random() > 0.5 ? 0.7 : -0.7);
        const bLen = 50 + Math.random() * 120;
        const bx2 = Math.max(5, Math.min(sw - 5, branchPt.x + Math.cos(bAngle) * bLen));
        const by2 = Math.max(5, Math.min(sh - 5, branchPt.y + Math.sin(bAngle) * bLen));
        branchPath = createZigzagPath(branchPt.x, branchPt.y, bx2, by2, 5, 20).path;
      }

      generatedBolts.push({
        id: 10 + i,
        path,
        branchPath,
        strokeWidth: 2.2 + Math.random() * 2.5,
        color: colors[i % colors.length],
        delayMs: 250 + i * 45,
        durationMs: 200 + Math.random() * 150,
        glowSize: 18 + Math.random() * 12,
      });
    }

    // Phase 3: Fading remaining arcs (950ms - 1500ms)
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 100 + Math.random() * 250;
      const x1 = cx + (Math.random() - 0.5) * (cw * 0.5);
      const y1 = cy + (Math.random() - 0.5) * (ch * 0.5);
      const x2 = Math.max(10, Math.min(sw - 10, x1 + Math.cos(angle) * dist));
      const y2 = Math.max(10, Math.min(sh - 10, y1 + Math.sin(angle) * dist));

      const { path } = createZigzagPath(x1, y1, x2, y2, 6, 20);
      generatedBolts.push({
        id: 40 + i,
        path,
        strokeWidth: 1.6 + Math.random() * 1.6,
        color: colors[i % colors.length],
        delayMs: 900 + i * 75,
        durationMs: 160,
        glowSize: 14,
      });
    }

    // Generate 36 tiny electric particles/sparks
    for (let i = 0; i < 36; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 320;
      const startX = cx + (Math.random() - 0.5) * (cw * 0.8);
      const startY = cy + (Math.random() - 0.5) * (ch * 0.8);
      const endX = Math.max(5, Math.min(sw - 5, startX + Math.cos(angle) * dist));
      const endY = Math.max(5, Math.min(sh - 5, startY + Math.sin(angle) * dist));

      generatedSparks.push({
        id: i,
        startX,
        startY,
        endX,
        endY,
        size: 1.8 + Math.random() * 3,
        delayMs: 220 + Math.random() * 700,
        durationMs: 300 + Math.random() * 300,
      });
    }

    return { bolts: generatedBolts, sparks: generatedSparks };
  }, [active, origin, containerDimensions, isReducedMotion]);

  if (!active) return null;

  // Reduced motion fallback: simple green radial flash + card glow pulse
  if (isReducedMotion) {
    return (
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.2 }}
        style={{
          background: `radial-gradient(circle at ${origin.x}px ${origin.y}px, rgba(0,234,141,0.25), transparent 70%)`,
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* ─── Section Background Radial Light Flash (300ms - 1200ms) ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.15, 0.85, 0.3, 0.9, 0.2, 0.7, 0.1, 0],
        }}
        transition={{
          duration: 1.3,
          times: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.8, 0.9, 1],
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle at ${origin.x}px ${origin.y}px, rgba(0, 234, 141, 0.24), rgba(0, 234, 141, 0.05) 45%, transparent 70%)`,
        }}
      />

      {/* ─── SVG Lightning Bolts Overlay ─── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="emeraldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00EA8D" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#00FF99" floodOpacity="0.7" />
            <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="rgba(0,234,141,0.4)" />
          </filter>
        </defs>

        <AnimatePresence>
          {bolts.map((bolt) => (
            <g key={bolt.id}>
              {/* Main Bolt */}
              <motion.path
                d={bolt.path}
                fill="none"
                stroke={bolt.color}
                strokeWidth={bolt.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#emeraldGlow)"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{
                  opacity: [0, 1, 0.4, 1, 0.2, 0],
                  pathLength: [0, 1, 1, 1, 1, 1],
                }}
                transition={{
                  delay: bolt.delayMs / 1000,
                  duration: bolt.durationMs / 1000,
                  ease: "easeInOut",
                }}
              />
              {/* Optional Branch Bolt */}
              {bolt.branchPath && (
                <motion.path
                  d={bolt.branchPath}
                  fill="none"
                  stroke={bolt.color}
                  strokeWidth={bolt.strokeWidth * 0.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#emeraldGlow)"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{
                    opacity: [0, 0.9, 0.3, 0.9, 0],
                    pathLength: [0, 1, 1, 1, 1],
                  }}
                  transition={{
                    delay: (bolt.delayMs + 30) / 1000,
                    duration: (bolt.durationMs * 0.8) / 1000,
                    ease: "easeInOut",
                  }}
                />
              )}
            </g>
          ))}
        </AnimatePresence>
      </svg>

      {/* ─── Particles / Electric Sparks ─── */}
      {sparks.map((spark) => (
        <motion.span
          key={spark.id}
          className="absolute rounded-full bg-[#00FF99] pointer-events-none"
          style={{
            width: spark.size,
            height: spark.size,
            boxShadow: `0 0 ${spark.size * 3}px #00EA8D, 0 0 ${spark.size * 6}px rgba(0,234,141,0.8)`,
          }}
          initial={{
            x: spark.startX,
            y: spark.startY,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: spark.endX,
            y: spark.endY,
            opacity: [0, 1, 0.8, 0],
            scale: [0.5, 1.4, 0.8, 0.2],
          }}
          transition={{
            delay: spark.delayMs / 1000,
            duration: spark.durationMs / 1000,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
