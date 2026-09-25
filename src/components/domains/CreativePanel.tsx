"use client";

import { motion } from "framer-motion";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

const LAYERS = [
  { name: "poster.psd", swatch: "#05C770" },
  { name: "reel-cut.mp4", swatch: "#FFC46B" },
  { name: "type-scale", swatch: "#6EE7F9" },
  { name: "brand-grid", swatch: "#FF7A6B" },
];

const SWATCHES = ["#05C770", "#7EE3B8", "#FFC46B", "#6EE7F9", "#FF7A6B", "#F4F4F5"];

const CURVE = "M10 92 C 44 14, 88 106, 124 46 S 172 18, 194 58";

export default function CreativePanel({ active }: { active: boolean }) {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10"
      style={{
        background: "linear-gradient(160deg, rgba(18,16,20,0.95), rgba(6,7,7,0.95))",
        boxShadow: "0 24px 60px -30px rgba(0,0,0,0.9)",
      }}
    >
      {/* Title bar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-white/8 bg-black/40 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-[11px] text-white/40" style={{ fontFamily: MONO }}>
          brand-kit.canvas
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-[#05C770]">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#05C770]"
            animate={active ? { opacity: [1, 0.3, 1] } : undefined}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          editing
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Layers rail */}
        <div className="hidden w-[34%] max-w-[150px] shrink-0 flex-col gap-1.5 border-r border-white/8 p-3 sm:flex">
          <span
            className="mb-1 text-[9px] uppercase tracking-[0.2em] text-white/25"
            style={{ fontFamily: MONO }}
          >
            Layers
          </span>
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.name}
              className="flex items-center gap-2 rounded-md px-2 py-1.5"
              animate={
                active
                  ? { backgroundColor: ["rgba(255,255,255,0)", "rgba(5,199,112,0.12)", "rgba(255,255,255,0)"] }
                  : undefined
              }
              transition={{
                duration: 1.1,
                repeat: Infinity,
                repeatDelay: LAYERS.length * 1.1 - 1.1,
                delay: i * 1.1,
                ease: "easeInOut",
              }}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                style={{ background: layer.swatch }}
              />
              <span className="truncate text-[10px] text-white/55" style={{ fontFamily: MONO }}>
                {layer.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Canvas */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {/* Drifting gradient blob */}
          <motion.div
            className="absolute left-[18%] top-[14%] h-32 w-32 rounded-full blur-2xl"
            style={{
              background:
                "conic-gradient(from 0deg, #05C770, #6EE7F9, #FFC46B, #FF7A6B, #05C770)",
              opacity: 0.35,
            }}
            animate={active ? { rotate: 360, scale: [1, 1.18, 1] } : undefined}
            transition={{
              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Artboard grid */}
          <div
            className="absolute inset-0 opacity-[0.13]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Pen-tool curve */}
          <svg
            viewBox="0 0 204 120"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.path
              d={CURVE}
              fill="none"
              stroke="#05C770"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={active ? { pathLength: [0, 1, 1, 0] } : { pathLength: 0.4 }}
              transition={{ duration: 5, times: [0, 0.45, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 6px rgba(5,199,112,0.6))" }}
            />
            {[
              [10, 92],
              [124, 46],
              [194, 58],
            ].map(([x, y], i) => (
              <motion.rect
                key={i}
                x={x - 3}
                y={y - 3}
                width="6"
                height="6"
                fill="#0a0a0a"
                stroke="#05C770"
                strokeWidth="1.4"
                animate={active ? { opacity: [0.2, 1, 0.2] } : undefined}
                transition={{ duration: 5, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </svg>

          {/* Type specimen */}
          <motion.div
            className="absolute bottom-4 right-4 leading-none text-white"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            animate={active ? { fontWeight: [300, 900, 300], opacity: [0.5, 1, 0.5] } : undefined}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Aa
          </motion.div>

          {/* Selection marquee */}
          <motion.div
            className="absolute left-[10%] top-[16%] rounded-sm border border-dashed border-[#05C770]/70"
            style={{ width: "44%", height: "46%" }}
            animate={active ? { opacity: [0, 0.9, 0.9, 0] } : { opacity: 0 }}
            transition={{ duration: 5, times: [0, 0.2, 0.75, 1], repeat: Infinity }}
          >
            <span className="absolute -top-4 left-0 text-[8px] tracking-wider text-[#05C770]">
              44 × 46
            </span>
          </motion.div>
        </div>
      </div>

      {/* Swatch bar */}
      <div className="flex shrink-0 items-center gap-2 border-t border-white/8 bg-black/50 px-4 py-2.5">
        {SWATCHES.map((color, i) => (
          <motion.span
            key={color}
            className="h-4 w-4 rounded-full ring-1 ring-white/15"
            style={{ background: color }}
            animate={active ? { scale: [1, 1.35, 1] } : undefined}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              repeatDelay: SWATCHES.length * 0.35,
              delay: i * 0.35,
              ease: "easeInOut",
            }}
          />
        ))}
        <span
          className="ml-auto text-[10px] text-white/30"
          style={{ fontFamily: MONO }}
        >
          #05C770
        </span>
      </div>
    </div>
  );
}
