"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

const STATS = [
  { label: "Partners", value: 24, suffix: "+" },
  { label: "Events", value: 18, suffix: "" },
  { label: "Reach", value: 12, suffix: "K" },
];

const BARS = [0.38, 0.55, 0.42, 0.7, 0.58, 0.86, 0.72, 1];
const PARTNERS = ["HackerRank", "SRMIST", "Devfolio", "GitHub", "Polygon", "Unstop"];

function useCountUp(target: number, active: boolean, delay = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const controls = animate(0, target, {
      duration: 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, target, delay]);

  return value;
}

function Stat({ label, value, suffix, active, index }: (typeof STATS)[number] & { active: boolean; index: number }) {
  const count = useCountUp(value, active, index * 0.12);

  return (
    <div className="flex-1 rounded-lg border border-white/8 bg-white/3 px-3 py-2.5">
      <div className="font-black leading-none text-white" style={{ fontSize: "clamp(15px, 1.7vw, 24px)" }}>
        {count}
        <span className="text-[#05C770]">{suffix}</span>
      </div>
      <div
        className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/35"
        style={{ fontFamily: MONO }}
      >
        {label}
      </div>
    </div>
  );
}

export default function CorporatePanel({ active }: { active: boolean }) {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10"
      style={{
        background: "linear-gradient(160deg, rgba(15,18,17,0.95), rgba(6,8,7,0.95))",
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
          outreach.dashboard
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-[#05C770]">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#05C770]"
            animate={active ? { opacity: [1, 0.3, 1] } : undefined}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          this term
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 p-3">
        {/* Stat tiles */}
        <div className="flex shrink-0 gap-2">
          {STATS.map((stat, i) => (
            <Stat key={stat.label} {...stat} active={active} index={i} />
          ))}
        </div>

        {/* Growth chart */}
        <div className="relative flex min-h-0 flex-1 flex-col rounded-lg border border-white/8 bg-white/3 p-3">
          <div className="flex shrink-0 items-center justify-between">
            <span
              className="text-[9px] uppercase tracking-[0.2em] text-white/30"
              style={{ fontFamily: MONO }}
            >
              Sponsorships
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-[#05C770]">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 15l6-6 4 4 5-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              +38%
            </span>
          </div>

          <div className="mt-2 flex min-h-0 flex-1 items-end gap-[6px]">
            {BARS.map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-[3px]"
                style={{
                  height: `${height * 100}%`,
                  transformOrigin: "bottom",
                  background:
                    i === BARS.length - 1
                      ? "linear-gradient(to top, #05C770, #7EE3B8)"
                      : "linear-gradient(to top, rgba(5,199,112,0.45), rgba(5,199,112,0.12))",
                }}
                initial={{ scaleY: 0.05 }}
                animate={active ? { scaleY: 1 } : { scaleY: 0.05 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>
        </div>

        {/* Partner marquee */}
        <div className="shrink-0 overflow-hidden rounded-lg border border-white/8 bg-black/30 py-2">
          <div className="marquee-track">
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <span
                key={i}
                className="mr-2 shrink-0 rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/45"
                style={{ fontFamily: MONO }}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
