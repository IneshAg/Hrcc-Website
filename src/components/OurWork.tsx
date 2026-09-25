"use client";

import { motion } from "framer-motion";

export default function OurWork() {
  return (
    <section
      id="our-work"
      className="relative z-10 py-20 px-4 md:px-8 w-full flex flex-col items-center justify-center pointer-events-none"
      style={{ background: "transparent" }}
    >
      <div className="max-w-[1032px] w-full mx-auto pointer-events-none">
        {/* Section Header */}
        <motion.div
          className="relative z-10 text-center px-4 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-black text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}
          >
            OUR <span style={{ color: "#05C770" }}>WORK</span>
          </h2>
          <p className="mt-3 text-center text-white/50 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Step inside the HackerRank Campus Crew SRMIST experience. Watch our official introduction video.
          </p>
        </motion.div>

        {/* Video Player Card */}
        <motion.div
          className="relative w-full rounded-2xl overflow-hidden pointer-events-auto border border-white/10 shadow-2xl"
          style={{
            background: "#0c0c0c",
            boxShadow: "0 30px 90px -30px rgba(5,199,112,0.25), 0 20px 60px -20px rgba(0,0,0,0.8)",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* macOS Title Bar */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-white/10"
            style={{ background: "#111111" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#05C770] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#05C770]" />
              </span>
              <span className="text-[11px] font-mono font-medium text-white/60 tracking-wider">
                hrcc_introduction.mp4
              </span>
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>

          {/* Video Container */}
          <div className="relative w-full bg-black aspect-video flex items-center justify-center overflow-hidden">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain bg-black"
            >
              <source src="/videos/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Footer Bar / Tags */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-white/8"
            style={{ background: "#0d0d0d" }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#05C770]/10 text-[#05C770] border border-[#05C770]/20">
                Official HRCC Intro
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-white/70 border border-white/10">
                SRMIST KTR
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-white/70 border border-white/10">
                Campus Culture
              </span>
            </div>
            <span className="text-xs text-white/40 font-mono">
              HackerRank Campus Crew
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
