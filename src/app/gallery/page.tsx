"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Squares from "@/components/Squares";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecruitmentBadge from "@/components/RecruitmentBadge";

import clubStart from "@/assets/club_start.jpeg";
import codathon from "@/assets/codathon.jpeg";
import techtalk from "@/assets/techtalk.jpeg";
import techformers from "@/assets/techformers.jpeg";
import launchEvent from "@/assets/launchevent.jpeg";
import infinityHacks from "@/assets/Infinity Hacks.jpeg";
import dominion from "@/assets/Domainion.jpeg";
import centreOfExcellence from "@/assets/centre-of-excellence.png";

type Photo = { src: StaticImageData; caption: string };

// Add new photos here — drop the file in src/assets, import it above, and
// add a { src, caption } entry. No other wiring needed.
const PHOTOS: Photo[] = [
  { src: clubStart, caption: "Club Launch — Sept 2025" },
  { src: codathon, caption: "Overclocked Codeathon" },
  { src: techtalk, caption: "Tech Talk" },
  { src: techformers, caption: "Techformers 1.0" },
  { src: launchEvent, caption: "Launch Event" },
  { src: infinityHacks, caption: "Infinity Hacks 2026" },
  { src: dominion, caption: "Dominion 2026" },
  { src: centreOfExcellence, caption: "Centre of Excellence" },
];

export default function GalleryPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen text-white">
      <SmoothScroll>
        {/* Squares animated background — matches homepage */}
        <div className="fixed inset-0 z-0">
          <Squares
            speed={0.1}
            squareSize={40}
            direction="diagonal"
            borderColor="#5b5760"
            hoverFillColor="#05C770"
          />
        </div>

        <Navbar />
        <RecruitmentBadge />

        <section className="relative z-10 w-full px-4 pt-36 pb-24 md:px-6 md:pt-40">
          <div className="mx-auto max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center"
            >
              <div className="mb-3 flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#05C770]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#05C770] md:text-xs">
                  Moments
                </span>
              </div>
              <h1 className="font-black text-4xl uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
                Gallery
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
                Snapshots from launches, hackathons, and everything in between.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {PHOTOS.map((photo, i) => (
                <motion.button
                  key={photo.caption}
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5"
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute bottom-2 left-2 right-2 truncate text-left text-[11px] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {photo.caption}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </SmoothScroll>

      {/* Lightbox */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[85vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={PHOTOS[openIndex].src}
                  alt={PHOTOS[openIndex].caption}
                  fill
                  className="bg-black object-contain"
                  sizes="100vw"
                />
              </div>
              <p className="mt-3 text-center text-sm text-white/60">{PHOTOS[openIndex].caption}</p>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black text-white/70 transition-colors hover:border-[#05C770] hover:text-[#05C770]"
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
