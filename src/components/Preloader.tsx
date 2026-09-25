"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimate } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [scope, animate] = useAnimate();
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runAnimation = async () => {
      // Make visible immediately
      animate(scope.current, { opacity: 1 }, { duration: 0 });

      // ── Phase 1: Logo ──────────────────────────────────────
      // H slides in from TOP, green rect slides in from BOTTOM
      await Promise.all([
        animate(".logo-h", { y: "0%" }, { duration: 1.05, ease: [0.22, 1, 0.36, 1] }),
        animate(".logo-rect", { y: "0%" }, { duration: 1.05, ease: [0.22, 1, 0.36, 1] }),
      ]);

      // Hold logo
      await new Promise((r) => setTimeout(r, 780));

      // ── Phase 2: Crossfade logo → setup (only text visible, no monitor chrome yet) ──
      const logoOut = animate(".logo-wrapper", { opacity: 0, scale: 0.9 }, { duration: 0.5, ease: "easeIn" });
      const setupIn = animate(".setup-wrapper", { opacity: 1 }, { duration: 0.55, ease: "easeOut" });
      await Promise.all([logoOut, setupIn]);

      // ── Phase 3: Type "HackerRank" ────────────────────────
      await animate(".cursor1", { opacity: 1 }, { duration: 0.15 });
      if (line1Ref.current) {
        await animate(
          line1Ref.current,
          { width: line1Ref.current.scrollWidth },
          { duration: 1.25, ease: "linear" }
        );
      }

      // ── Phase 4: Type "CampusCrew" ────────────────────────
      await animate(".cursor1", { opacity: 0 }, { duration: 0.12 });
      await new Promise((r) => setTimeout(r, 60));
      await animate(".cursor2", { opacity: 1 }, { duration: 0.12 });
      if (line2Ref.current) {
        await animate(
          line2Ref.current,
          { width: line2Ref.current.scrollWidth },
          { duration: 1.25, ease: "linear" }
        );
      }

      // Breathe
      await new Promise((r) => setTimeout(r, 720));
      await animate(".cursor2", { opacity: 0 }, { duration: 0.2 });

      // ── Phase 5: Reveal monitor chrome + keyboard, then zoom out ──
      // Fade in monitor frame, stand, and peripherals simultaneously with zoom out
      await Promise.all([
        animate(".screen-outline", { pathLength: 1, opacity: 1 }, { duration: 0.6, ease: "easeOut" }),
        animate(".stand-base", { opacity: 1 }, { duration: 0.6, ease: "easeOut" }),
        animate(".peripherals", { opacity: 1 }, { duration: 0.6, ease: "easeOut" }),
        animate(".setup-wrapper", { scale: 0.7 }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] }),
      ]);

      // Hold to admire the setup
      await new Promise((r) => setTimeout(r, 600));

      // ── Exit: cinematic green wipe from the rectangle ─────
      await animate(
        ".transition-box",
        { scale: 300, backgroundColor: "#05C770" },
        { duration: 1.4, ease: [0.76, 0, 0.24, 1] }
      );
      onComplete();
    };

    runAnimation();
  }, [animate, onComplete, scope]);

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black overflow-hidden opacity-0"
    >
      {/* ────────────────────────────────────────────────────
          PHASE 1 — HackerRank Logo
          H slides from TOP + green rect slides from BOTTOM
      ──────────────────────────────────────────────────── */}
      <div className="logo-wrapper absolute inset-0 z-10 flex items-center justify-center">
        <div
          className="relative flex items-center gap-8"
          style={{ width: "clamp(160px, 48vw, 280px)" }}
        >
          {/* Left half — black bg + white H sliding from TOP */}
          <div className="flex-1 aspect-square overflow-hidden bg-black">
            <motion.div
              className="logo-h w-full h-full"
              initial={{ y: "-115%" }}
            >
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <path d="M0,0 H30 V40 H70 V0 H100 V100 H70 V60 H30 V100 H0 Z" fill="white" />
                </svg>
            </motion.div>
          </div>

          {/* Right half — HackerRank green sliding from BOTTOM */}
          <div className="flex-1 aspect-square overflow-hidden">
            <motion.div
              className="logo-rect w-full h-full bg-[#1ba94c]"
              initial={{ y: "115%" }}
            />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────
          PHASES 2-6 — Full Desk Setup (Monitor + Keyboard + Mouse)
      ──────────────────────────────────────────────────── */}
      <div className="setup-wrapper opacity-0 flex flex-col items-center" style={{ transformOrigin: "center center" }}>
        <div
          className="relative"
          style={{ width: "clamp(300px, 80vw, 800px)" }}
        >
          {/* Monitor + Stand SVG */}
          <svg viewBox="0 0 700 520" className="w-full" fill="none">
            {/* Screen outline — drawn via pathLength */}
            <motion.rect
              className="screen-outline"
              x="26" y="14"
              width="648" height="362"
              rx="22"
              stroke="white"
              strokeWidth="10"
              initial={{ pathLength: 0, opacity: 0 }}
            />
            {/* Stand neck */}
            <motion.rect
              className="stand-base"
              x="322" y="376"
              width="56" height="72"
              fill="white"
              initial={{ opacity: 0 }}
            />
            {/* Base */}
            <motion.rect
              className="stand-base"
              x="238" y="444"
              width="224" height="20"
              rx="10"
              fill="white"
              initial={{ opacity: 0 }}
            />
          </svg>

          {/* Text — centred at screen centre */}
          <div
            className="absolute select-none"
            style={{
              top: "37.5%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "85%",
            }}
          >
            <div className="flex flex-col items-center font-bold tracking-normal leading-tight">
              {/* Line 1 — HackerRank */}
              <div
                className="flex items-center justify-center"
                style={{ height: "clamp(36px, 9.5vw, 100px)" }}
              >
                <div
                  ref={line1Ref}
                  className="overflow-hidden whitespace-nowrap w-0 h-full flex items-center"
                >
                  <span
                    className="text-white"
                    style={{ fontSize: "clamp(28px, 7.5vw, 82px)" }}
                  >
                    HackerRank
                  </span>
                </div>
                <div className="cursor1 bg-[#05C770] ml-1.5 opacity-0 shrink-0" style={{ width: "clamp(17px, 4.5vw, 50px)", height: "clamp(28px, 7.5vw, 82px)" }} />
              </div>

              {/* Line 2 — CampusCrew */}
              <div
                className="flex items-center justify-center"
                style={{
                  height: "clamp(36px, 9.5vw, 100px)",
                  marginTop: "clamp(6px, 0.8vw, 14px)",
                }}
              >
                <div
                  ref={line2Ref}
                  className="overflow-hidden whitespace-nowrap w-0 h-full flex items-center"
                >
                  <span
                    className="text-[#05C770]"
                    style={{ fontSize: "clamp(28px, 7.5vw, 82px)" }}
                  >
                    CampusCrew
                  </span>
                </div>
                <div className="cursor2 bg-[#05C770] ml-1.5 opacity-0 shrink-0" style={{ width: "clamp(17px, 4.5vw, 50px)", height: "clamp(28px, 7.5vw, 82px)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Keyboard + Mouse (peripherals) ─────────────── */}
        <motion.div
          className="peripherals flex items-start justify-center gap-8 mt-4"
          initial={{ opacity: 0 }}
          style={{ width: "clamp(280px, 70vw, 700px)" }}
        >
          {/* Keyboard SVG */}
          <svg viewBox="0 0 400 120" className="w-3/4" fill="none">
            {/* Keyboard body */}
            <rect x="10" y="10" width="380" height="100" rx="12" stroke="white" strokeWidth="4" fill="none" />
            {/* Row 1 */}
            <rect x="24" y="22" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="58" y="22" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="92" y="22" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="126" y="22" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="160" y="22" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="194" y="22" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="228" y="22" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="262" y="22" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="296" y="22" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="330" y="22" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="364" y="22" width="24" height="18" rx="3" stroke="white" strokeWidth="2" />
            {/* Row 2 */}
            <rect x="30" y="46" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="64" y="46" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="98" y="46" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="132" y="46" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="166" y="46" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="200" y="46" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="234" y="46" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="268" y="46" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="302" y="46" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="336" y="46" width="50" height="18" rx="3" stroke="white" strokeWidth="2" />
            {/* Row 3 */}
            <rect x="40" y="70" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="74" y="70" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="108" y="70" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="142" y="70" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="176" y="70" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="210" y="70" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="244" y="70" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="278" y="70" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="312" y="70" width="28" height="18" rx="3" stroke="white" strokeWidth="2" />
            <rect x="346" y="70" width="40" height="18" rx="3" stroke="white" strokeWidth="2" />
            {/* Spacebar */}
            <rect x="100" y="94" width="200" height="14" rx="5" stroke="white" strokeWidth="2" />
          </svg>

          {/* Mouse SVG */}
          <svg viewBox="0 0 60 100" className="w-[12%] mt-1" fill="none">
            <rect x="5" y="5" width="50" height="90" rx="25" stroke="white" strokeWidth="4" />
            <line x1="30" y1="5" x2="30" y2="40" stroke="white" strokeWidth="2" />
            <rect x="26" y="15" width="8" height="16" rx="4" stroke="white" strokeWidth="2" />
          </svg>
        </motion.div>
      </div>

      {/* Screen-wipe burst origin */}
      <div className="transition-box fixed top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 bg-[#05C770] rounded-full scale-0 z-50 pointer-events-none" />
    </div>
  );
}