"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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

import { dominionPhotos, type GalleryPhoto } from "@/lib/dominionPhotos";

type FilterCategory = "all" | "dominion" | "highlights";

const ALL_PHOTOS: GalleryPhoto[] = [
  { src: dominion, caption: "Dominion 2026 — Official Poster", category: "dominion" },
  ...dominionPhotos,
  { src: clubStart, caption: "Club Launch — Sept 2025", category: "highlights" },
  { src: codathon, caption: "Overclocked Codeathon", category: "highlights" },
  { src: techtalk, caption: "Tech Talk", category: "highlights" },
  { src: techformers, caption: "Techformers 1.0", category: "highlights" },
  { src: launchEvent, caption: "Launch Event", category: "highlights" },
  { src: infinityHacks, caption: "Infinity Hacks 2026", category: "highlights" },
  { src: centreOfExcellence, caption: "Centre of Excellence", category: "highlights" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? ALL_PHOTOS
      : ALL_PHOTOS.filter((photo) => photo.category === activeCategory);

  const handlePrev = useCallback(() => {
    if (openIndex === null) return;
    setOpenIndex((prev) => (prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null));
  }, [openIndex, filteredPhotos.length]);

  const handleNext = useCallback(() => {
    if (openIndex === null) return;
    setOpenIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : null));
  }, [openIndex, filteredPhotos.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, handlePrev, handleNext]);

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
              className="mb-8 text-center"
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

              {/* Category Filter Tabs */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: "all", label: "All Photos", count: ALL_PHOTOS.length },
                  {
                    id: "dominion",
                    label: "Dominion 2026",
                    count: ALL_PHOTOS.filter((p) => p.category === "dominion").length,
                  },
                  {
                    id: "highlights",
                    label: "Club Highlights",
                    count: ALL_PHOTOS.filter((p) => p.category === "highlights").length,
                  },
                ].map((tab) => {
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(tab.id as FilterCategory);
                        setOpenIndex(null);
                      }}
                      className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                        isActive
                          ? "bg-[#05C770] text-black border-[#05C770] shadow-[0_0_20px_rgba(5,199,112,0.35)]"
                          : "bg-white/5 text-white/70 border-white/10 hover:border-white/20 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                          isActive ? "bg-black/20 text-black font-bold" : "bg-white/10 text-white/50"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              layout
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            >
              <AnimatePresence>
                {filteredPhotos.map((photo, i) => (
                  <motion.button
                    key={`${photo.caption}-${i}`}
                    layout
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: (i % 6) * 0.03 }}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#05C770]/50"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    {photo.category === "dominion" && (
                      <span className="pointer-events-none absolute top-2 right-2 rounded-md bg-[#05C770]/20 border border-[#05C770]/40 px-1.5 py-0.5 text-[9px] font-semibold text-[#05C770] backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Dominion
                      </span>
                    )}

                    <span className="pointer-events-none absolute bottom-2 left-2 right-2 truncate text-left text-[11px] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {photo.caption}
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <Footer />
      </SmoothScroll>

      {/* Lightbox Modal with Prev/Next Navigation */}
      <AnimatePresence>
        {openIndex !== null && filteredPhotos[openIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
          >
            {/* Prev button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 md:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-2xl text-white/80 transition-all hover:scale-110 hover:border-[#05C770] hover:bg-black hover:text-[#05C770] cursor-pointer"
              aria-label="Previous photo"
            >
              ‹
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 md:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-2xl text-white/80 transition-all hover:scale-110 hover:border-[#05C770] hover:bg-black hover:text-[#05C770] cursor-pointer"
              aria-label="Next photo"
            >
              ›
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/70">
                <Image
                  src={filteredPhotos[openIndex].src}
                  alt={filteredPhotos[openIndex].caption}
                  fill
                  className="bg-black object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Lightbox Footer Info */}
              <div className="mt-3 flex items-center justify-between px-2 text-sm text-white/70">
                <p className="font-medium text-white">{filteredPhotos[openIndex].caption}</p>
                <span className="font-mono text-xs text-white/50">
                  {openIndex + 1} / {filteredPhotos.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black text-white/70 transition-colors hover:border-[#05C770] hover:text-[#05C770] cursor-pointer"
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
