"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { RECRUITMENT_FORM_URL } from "@/lib/links";

// Dynamically import 3D canvas — SSR disabled for WebGL
const HRCCLogo3D = dynamic(() => import("./HRCCLogo3D"), {
  ssr: false,
  loading: () => (
    // Fallback: static HRCC text while canvas loads
    <div className="flex items-center justify-center w-full h-full">
      <span
        className="font-black text-[#05C770] select-none"
        style={{ fontSize: "clamp(3rem, 12vw, 6rem)", letterSpacing: "-0.02em" }}
      >
        HRCC
      </span>
    </div>
  ),
});

/* Social link data */
const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/hrcc.srm/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/hrccsrm",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hackerrank-campus-crew-srmist-4b84273b6/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/HRCC-SRM",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
];

// ─── Framer Motion variants ────────────────────────────────────────────────────
const wordVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden pointer-events-none"
    >
      {/* ── Background glow blobs (parallax via CSS) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        {/* Primary green radial glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(5,199,112,0.14) 0%, transparent 68%)",
            filter: "blur(48px)",
          }}
          animate={{ scale: [1, 1.07, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Cyan accent */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.09, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── 3D Logo Canvas ── */}
      <motion.div
        className="relative z-10 w-full max-w-2xl pointer-events-auto"
        style={{ height: "clamp(180px, 28vw, 280px)" }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-label="HRCC 3D interactive logo"
      >
        <HRCCLogo3D />
      </motion.div>

      {/* ── Centered content below 3D logo ── */}
      <div
        className="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-6 max-w-4xl mx-auto pointer-events-none"
        style={{ transform: "translateY(1vh)" }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-medium tracking-widest uppercase"
            style={{
              borderColor: "rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.65)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span className="hidden sm:inline">HackerRank Campus Crew · SRMIST KTR</span>
            <span className="sm:hidden">HRCC · SRMIST</span>
          </span>
        </motion.div>

        {/* Headline — stagger word by word */}
        <h1
          className="font-black leading-tight tracking-tight text-white pointer-events-none"
          style={{ fontSize: "clamp(2.5rem, 10vw, 6rem)", lineHeight: 0.92 }}
        >
          #1
          <br />
          <span className="inline-flex items-center gap-[0.12em]">
            {["HackerRank"].map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                style={{ color: "#05C770" }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              className="inline-block bg-[#05C770] rounded-none shrink-0"
              style={{ width: "0.72em", height: "0.92em" }}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.55, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
          <br />
          <motion.span
            custom={1}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
          >
            Campus Crew
          </motion.span>
        </h1>

        {/* Sub-text */}
        <motion.p
          className="text-white/55 text-xs sm:text-sm leading-relaxed max-w-lg px-4 sm:px-0 hidden sm:block pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Coding competitions, technical workshops, collaborative hackathons —
          and a community that thinks slightly out of the box at SRMIST KTR.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2 mb-4 sm:mb-6 px-4 sm:px-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          <a
            href="#domains"
            className="pointer-events-auto px-4 sm:px-7 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 w-full sm:w-auto text-center"
            style={{ background: "#fff", color: "#0a0a0a" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#05C770";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
              (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a";
            }}
          >
            Explore
          </a>
          <a
            href={RECRUITMENT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto px-4 sm:px-7 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 w-full sm:w-auto text-center border"
            style={{
              borderColor: "rgba(5,199,112,0.4)",
              color: "#05C770",
              background: "rgba(5,199,112,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#05C770";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(5,199,112,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#05C770";
            }}
          >
            Join HRCC
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-5 mt-4 sm:mt-8 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {socials.slice(0, 4).map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto text-white/35 hover:text-[#05C770] transition-colors duration-300 p-1"
              aria-label={social.name}
              whileHover={{ scale: 1.18 }}
              whileTap={{ scale: 0.92 }}
            >
              <div className="w-4 h-4 sm:w-7 sm:h-7">{social.icon}</div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 flex flex-col items-center gap-1.5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <span className="text-white/30 text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-6 sm:h-8 bg-white/20"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
