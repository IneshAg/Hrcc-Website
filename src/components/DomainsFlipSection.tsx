"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import TechnicalPanel from "@/components/domains/TechnicalPanel";
import CreativePanel from "@/components/domains/CreativePanel";
import CorporatePanel from "@/components/domains/CorporatePanel";
import heroImage from "@/assets/domains-hero.jpg";
import { RECRUITMENT_FORM_URL } from "@/lib/links";

// ─── Domain card data ────────────────────────────────────────────────────────
// All three cards share ONE image (heroImage, below) — each card shows a third
// of it via background-position, so the picture only reads as "whole" when the
// cards are still together, then reveals its own identity once flipped. This
// mirrors the reference "one image splits into three panels" scroll effect.
const CARDS = [
  {
    id: "technical",
    label: "Technical",
    number: "01",
    kicker: "Build & Ship",
    desc: "Dedicated to advancing technical skills in coding, AI, and hardware through innovation and collaboration.",
    tags: ["Web Dev", "AI / ML", "Hardware", "CP"],
    renderPanel: (active: boolean) => <TechnicalPanel active={active} />,
  },
  {
    id: "creative",
    label: "Creative",
    number: "02",
    kicker: "Design & Story",
    desc: "Where imagination meets design — producing visuals, content, and media that inspire, engage, and connect audiences.",
    tags: ["Graphics", "Video", "Content", "Social"],
    renderPanel: (active: boolean) => <CreativePanel active={active} />,
  },
  {
    id: "corporate",
    label: "Corporate",
    number: "03",
    kicker: "Partner & Operate",
    desc: "Building partnerships, managing events, and ensuring smooth operations through leadership, strategy, and collaboration.",
    tags: ["Sponsorship", "Events", "Outreach", "Ops"],
    renderPanel: (active: boolean) => <CorporatePanel active={active} />,
  },
];

// ─── Individual flip card ─────────────────────────────────────────────────────
function FlipCard({
  card,
  progress,
  index,
}: {
  card: (typeof CARDS)[number];
  progress: ReturnType<typeof useSpring>;
  index: number;
}) {
  // --- Phase 1 (0→0.35): scale-in single image (handled by parent wrapper) ---
  // --- Phase 2 (0.35→0.6): gap/split (handled by parent) ---
  // --- Phase 3 (0.6→1): flip each card with a small stagger, then grow slightly
  //     so the revealed content reads like the original Domains card "opening" ---

  const flipStart = 0.6 + index * 0.04;
  const flipEnd = flipStart + 0.2;

  // rotateY: 0° (front) → 180° (back)
  const rotateY = useTransform(progress, [flipStart, flipEnd], [0, 180]);

  // Outer cards tilt on Z for the cinematic lean
  const rotateZ = useTransform(
    progress,
    [flipStart, flipEnd],
    index === 0 ? [0, -6] : index === 2 ? [0, 6] : [0, 0]
  );
  const translateY = useTransform(
    progress,
    [flipStart, flipEnd],
    index === 1 ? [0, 0] : [0, 18]
  );

  // Grow the whole card a bit once flipped — the original Domains section's
  // cards visibly expand when opened; this echoes that instead of just
  // rotating in place at a fixed, cramped size.
  const cardScale = useTransform(progress, [flipStart, flipEnd], [1, 1.16]);

  return (
    <motion.div
      className="relative shrink-0 [perspective:1200px]"
      style={{
        // 5:7 card ratio, responsive
        width: "clamp(160px, 22vw, 320px)",
        height: "clamp(224px, 30.8vw, 448px)",
        scale: cardScale,
      }}
    >
      {/* The card that rotates */}
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ rotateY, rotateZ, y: translateY }}
      >
        {/* ── FRONT — one shared image, cropped to this card's third ──
            backface-visibility must live on an element with NO overflow/border-radius
            of its own — Chrome silently ignores backface-visibility on a rotated node
            that also clips its own overflow, which is what let the back face show
            through immediately instead of staying hidden until the flip. */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${heroImage.src})`,
                backgroundSize: "300% 100%",
                backgroundPosition: `${index * 50}% center`,
              }}
            />
            {/* subtle vignette for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />
          </div>
        </div>

        {/* ── BACK — styled to match the original Domains section's open card ── */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-[#080808] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)]">
            <div className="flex h-full flex-col overflow-hidden p-4 sm:p-5">
              {/* Header row — index + divider + kicker, same as the original card */}
              <div className="mb-2.5 flex shrink-0 items-center gap-2 sm:mb-3">
                <span className="font-mono text-[10px] tracking-widest text-[#05C770]">
                  {card.number}
                </span>
                <span className="h-px w-5 bg-[#05C770]/40" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                  {card.kicker}
                </span>
              </div>

              <h3 className="mb-1.5 font-black text-lg leading-none tracking-tight text-white sm:mb-2 sm:text-xl">
                {card.label}
              </h3>
              <p className="mb-2.5 text-[10.5px] leading-relaxed text-white/55 sm:mb-3 sm:text-[11px]">
                {card.desc}
              </p>

              <div className="mb-2.5 flex shrink-0 flex-wrap gap-1.5 sm:mb-3">
                {card.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#05C770]/30 bg-[#05C770]/10 px-2 py-0.5 text-[8px] uppercase text-[#05C770]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mb-2.5 min-h-0 flex-1 overflow-hidden rounded-xl border border-white/8 bg-black/40 sm:mb-3">
                {card.renderPanel(true)}
              </div>

              <a
                href={RECRUITMENT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#05C770]/60 bg-black/40 py-1.5 text-[10px] font-bold text-[#05C770] transition-colors hover:bg-[#05C770] hover:text-black sm:py-2 sm:text-[11px]"
              >
                APPLY NOW
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main exported section ────────────────────────────────────────────────────
export default function DomainsFlipSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll value
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  // ── Phase 1 (0→0.35): single image scales in from center ──
  const imageScale = useTransform(progress, [0, 0.25], [0.55, 1]);
  const imageOpacity = useTransform(progress, [0, 0.15], [0, 1]);

  // ── Heading slides up ──
  const headingY = useTransform(progress, [0.08, 0.28], ["40px", "0px"]);
  const headingOpacity = useTransform(progress, [0.08, 0.28], [0, 1]);

  // ── Phase 2 (0.35→0.6): container widens (gap is CSS on the flex container) ──
  const containerWidth = useTransform(
    progress,
    [0, 0.35, 0.6],
    ["clamp(160px,22vw,320px)", "clamp(160px,22vw,320px)", "min(92vw,980px)"]
  );

  // gap between cards: 0 → 28px as cards split
  const cardGap = useTransform(progress, [0.3, 0.6], [0, 28]);

  // Border radius: tight rectangular → rounder card corners
  const borderRadius = useTransform(progress, [0.3, 0.58], [8, 20]);

  // Show outer cards only when splitting starts
  const outerOpacity = useTransform(progress, [0.3, 0.5], [0, 1]);

  return (
    <section className="relative w-full bg-black" id="domains-flip">
      {/* ── Scroll track — tall so the pin has room ── */}
      <div ref={trackRef} className="relative h-[500vh]">
        {/* ── Sticky viewport ── */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

          {/* Heading */}
          <motion.div
            className="relative z-10 mb-8 text-center"
            style={{ y: headingY, opacity: headingOpacity }}
          >
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#05C770]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#05C770]">
                Our Domains
              </span>
            </div>
            <h2
              className="font-black uppercase tracking-tight text-white"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
            >
              HackerRank Campus Crew
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/40">
              Three teams. One mission. Scroll to explore each domain.
            </p>
          </motion.div>

          {/* Card cluster */}
          <motion.div
            className="relative z-10 flex items-center justify-center"
            style={{ width: containerWidth, gap: cardGap }}
          >
            {CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                style={{
                  // middle card always visible; outer fade in during split
                  opacity: i === 1 ? 1 : outerOpacity,
                  // all cards share the same animated border-radius during split
                  borderRadius,
                  // single-image scale in on the whole cluster (middle card drives it)
                  scale: i === 1 ? imageScale : 1,
                }}
              >
                <FlipCard card={card} progress={progress} index={i} />
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-mono uppercase tracking-[0.22em] text-white/25"
            style={{
              opacity: useTransform(progress, [0, 0.15], [1, 0]),
            }}
          >
            Scroll to explore
          </motion.p>
        </div>
      </div>
    </section>
  );
}
