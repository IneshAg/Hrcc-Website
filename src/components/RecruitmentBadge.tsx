"use client";

import { motion, useReducedMotion } from "framer-motion";

import { RECRUITMENT_FORM_URL } from "@/lib/links";

/**
 * Always-on-screen "we're recruiting" badge, pinned bottom-right.
 * Clicking it opens the recruitment application form.
 */
export default function RecruitmentBadge() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50 md:bottom-7 md:right-7"
      // globals.css has `main > div { width: 100% }`, which is unlayered and so
      // beats Tailwind utilities — this keeps the pill hugging its content.
      style={{ width: "auto" }}
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative">
        {/* Halo pulse */}
        {!reduceMotion && (
          <motion.span
            className="absolute inset-0 rounded-full bg-[#05C770]/35 blur-xl"
            animate={{ opacity: [0.35, 0.8, 0.35], scale: [0.95, 1.12, 0.95] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <a
          href={RECRUITMENT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Recruitments are open — apply now"
          className="group relative flex items-center gap-3 rounded-full border border-[#05C770]/60 bg-[#0a0a0a]/92 py-2.5 pl-3.5 pr-3 backdrop-blur-md transition-all duration-300 hover:border-[#05C770] hover:bg-[#05C770] md:py-3 md:pl-4 md:pr-4"
          style={{ boxShadow: "0 12px 40px -12px rgba(5,199,112,0.55)" }}
        >
          {/* Live dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            {!reduceMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#05C770] opacity-80 group-hover:bg-black" />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#05C770] group-hover:bg-black" />
          </span>

          <span className="flex flex-col items-start leading-none">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#05C770] transition-colors group-hover:text-black/70">
              Recruiting live
            </span>
            <span className="mt-1 text-[13px] font-bold text-white transition-colors group-hover:text-black md:text-sm">
              Join the crew
            </span>
          </span>

          <svg
            className="h-4 w-4 shrink-0 text-[#05C770] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-black"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12h13M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
