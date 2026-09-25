"use client";

import { motion } from "framer-motion";

import { RECRUITMENT_FORM_URL } from "@/lib/links";

export default function RecruitmentSection() {
  return (
    <section
      className="relative z-10 py-20 px-4 md:px-8 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left — Green card with "RECRUITMENTS OPEN." */}
          <div
            className="rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[300px] relative overflow-hidden"
            style={{ background: "#05C770" }}
          >
            <h2
              className="font-black tracking-tight leading-[0.95]"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontStyle: "italic",
                fontFamily: "'Outfit', sans-serif",
                color: "#0a0a0a",
              }}
            >
              RECRUITMENTS
              <br />
              OPEN.
            </h2>

            {/* Arrow / send icon in bottom-right */}
            <div className="flex justify-end mt-8">
              <a
                href={RECRUITMENT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a0a0a] hover:scale-110 transition-transform duration-300"
                aria-label="Apply now"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — Vimeo Video Embed */}
          <div className="rounded-2xl overflow-hidden relative min-h-[300px]">
            <iframe
              src="https://player.vimeo.com/video/1115531421?badge=0&autopause=0&player_id=0&app_id=58479"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              title="RECRUITMENTS OPEN - HackerRank Campus Crew SRM"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
