"use client";

import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { RECRUITMENT_FORM_URL } from "@/lib/links";

/** Divider position is a percentage of card width: 100 = name fully covers the card. */
const MIN_POS = 0;
const MAX_POS = 100;
const RESTING_POS = 89;
const TEASE_POS = 52;
const KEY_STEP = 6;
/** Released inside these bands, the divider settles flush instead of clipping the copy. */
const SNAP_OPEN = 22;
const SNAP_CLOSED = 82;

export interface DomainRevealCardProps {
  index: number;
  title: string;
  kicker: string;
  description: string;
  tags: string[];
  image: StaticImageData;
  renderPanel: (active: boolean) => ReactNode;
}

export default function DomainRevealCard({
  index,
  title,
  kicker,
  description,
  tags,
  image,
  renderPanel,
}: DomainRevealCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: false, amount: 0.35 });
  const reduceMotion = useReducedMotion();

  const pos = useMotionValue(MAX_POS);
  const smoothPos = useSpring(pos, { stiffness: 320, damping: 42, mass: 0.7 });
  const clipRight = useTransform(smoothPos, (v) => 100 - v);
  const coverClip = useMotionTemplate`inset(0 ${clipRight}% 0 0)`;
  const dividerLeft = useMotionTemplate`${smoothPos}%`;
  const dividerOpacity = useTransform(smoothPos, [MAX_POS, 80], [0, 1]);
  // The copy column only fades in once the wipe is about to clear it, so partly
  // covered sentences never show as fragments.
  const copyOpacity = useTransform(smoothPos, [54, 38], [0, 1]);

  const [dragging, setDragging] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [touched, setTouched] = useState(false);

  useMotionValueEvent(smoothPos, "change", (v) => setRevealed(v < 94));

  const introRef = useRef<AnimationPlaybackControls | null>(null);
  const hasTeased = useRef(false);
  const gesture = useRef<{ startX: number; moved: boolean; fromHandle: boolean } | null>(null);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      pos.set(Math.min(MAX_POS, Math.max(MIN_POS, pct)));
    },
    [pos],
  );

  // Peek the hidden side once on first view so the drag affordance is discoverable.
  useEffect(() => {
    if (!inView || hasTeased.current) return;
    hasTeased.current = true;

    if (reduceMotion) {
      pos.set(RESTING_POS);
      return;
    }

    introRef.current = animate(pos, [MAX_POS, TEASE_POS, RESTING_POS], {
      duration: 2.2,
      times: [0, 0.5, 1],
      ease: [0.22, 1, 0.36, 1],
      delay: 0.4 + index * 0.18,
    });

    return () => introRef.current?.stop();
  }, [inView, index, pos, reduceMotion]);

  const beginDrag = useCallback(
    (clientX: number, fromHandle: boolean) => {
      introRef.current?.stop();
      gesture.current = { startX: clientX, moved: false, fromHandle };
      setDragging(true);
      setTouched(true);
      if (!fromHandle) setFromClientX(clientX);
    },
    [setFromClientX],
  );

  useEffect(() => {
    if (!dragging) return;

    const onMove = (event: PointerEvent) => {
      event.preventDefault();
      const g = gesture.current;
      if (g && Math.abs(event.clientX - g.startX) > 3) g.moved = true;
      setFromClientX(event.clientX);
    };

    const onUp = () => {
      const g = gesture.current;
      const current = pos.get();
      let settle: number | null = null;

      if (g?.fromHandle && !g.moved) {
        // A tap on the handle toggles the card fully open or closed.
        settle = current > 50 ? MIN_POS : RESTING_POS;
      } else if (current < SNAP_OPEN) {
        settle = MIN_POS;
      } else if (current > SNAP_CLOSED) {
        settle = RESTING_POS;
      }

      if (settle !== null) {
        animate(pos, settle, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
      }

      gesture.current = null;
      setDragging(false);
    };

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const prevUserSelect = document.body.style.userSelect;
    document.body.style.userSelect = "none";

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.body.style.userSelect = prevUserSelect;
    };
  }, [dragging, pos, setFromClientX]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const current = pos.get();
    let next: number | null = null;

    if (event.key === "ArrowLeft") next = current - KEY_STEP;
    else if (event.key === "ArrowRight") next = current + KEY_STEP;
    else if (event.key === "Home") next = MIN_POS;
    else if (event.key === "End") next = MAX_POS;
    else if (event.key === "Enter" || event.key === " ") next = current > 50 ? MIN_POS : RESTING_POS;

    if (next === null) return;
    event.preventDefault();
    introRef.current?.stop();
    setTouched(true);
    pos.set(Math.min(MAX_POS, Math.max(MIN_POS, next)));
  };

  return (
    <motion.div
      ref={cardRef}
      className="group/card relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070707] select-none pointer-events-auto"
      style={{
        height: "clamp(400px, 46vw, 540px)",
        cursor: dragging ? "ew-resize" : "default",
        boxShadow: "0 30px 80px -40px rgba(0,0,0,0.9)",
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={(event) => {
        // Touch drags must start on the handle, otherwise vertical page scroll breaks.
        if (event.pointerType === "touch") return;
        beginDrag(event.clientX, false);
      }}
    >
      {/* ---------- Revealed layer: description + live panel ---------- */}
      <div className="absolute inset-0 z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 88% 0%, rgba(5,199,112,0.16) 0%, rgba(5,199,112,0.04) 38%, transparent 70%), linear-gradient(140deg, #080808 0%, #0b0d0c 55%, #050706 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,199,112,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(5,199,112,0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(90% 80% at 70% 40%, black, transparent 75%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col gap-4 p-6 md:flex-row md:items-center md:gap-8 md:p-10">
          {/* Left: copy */}
          <motion.div
            className="flex shrink-0 flex-col justify-center md:w-[38%]"
            style={{ opacity: copyOpacity }}
          >
            <span
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#05C770]"
              style={{ letterSpacing: "0.32em" }}
            >
              {kicker}
            </span>
            <h3
              className="font-black tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)", lineHeight: 1 }}
            >
              {title}
            </h3>
            <p
              className="mt-3 leading-relaxed text-white/60"
              style={{ fontSize: "clamp(0.8rem, 1.05vw, 0.95rem)" }}
            >
              {description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#05C770]/25 bg-[#05C770]/8 px-3 py-1 text-[11px] font-medium text-[#05C770]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={RECRUITMENT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              // Keep a click on the CTA from starting a divider drag.
              onPointerDown={(event) => event.stopPropagation()}
              className="group/btn mt-6 hidden w-fit items-center gap-2 rounded-full border border-[#05C770]/60 bg-black/50 px-5 py-2.5 text-sm font-semibold text-[#05C770] transition-all duration-300 hover:bg-[#05C770] hover:text-black md:flex"
            >
              <svg
                className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 6h8M7 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              APPLY NOW
            </a>
          </motion.div>

          {/* Right: the animated domain panel */}
          {/* min-w-0 stops wide panel content (marquees, code) inflating the flex item */}
          <div className="min-h-0 min-w-0 flex-1 self-stretch">{renderPanel(inView && revealed)}</div>
        </div>
      </div>

      {/* ---------- Cover layer: the domain name ---------- */}
      <motion.div className="absolute inset-0 z-20" style={{ clipPath: coverClip }}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1400px"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(5,199,112,0.5) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold tracking-[0.3em] text-[#05C770]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-10 bg-[#05C770]/40" />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
              {kicker}
            </span>
          </div>

          <div>
            <h3
              className="font-black tracking-tight text-white"
              style={{
                fontSize: "clamp(2.4rem, 7.5vw, 6rem)",
                lineHeight: 0.9,
                textShadow: "2px 4px 24px rgba(0,0,0,0.8)",
              }}
            >
              {title}
            </h3>

            <motion.div
              className="mt-5 flex items-center gap-3 text-white/55"
              animate={touched ? { opacity: 0.35 } : { opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.svg
                className="h-4 w-4 text-[#05C770]"
                viewBox="0 0 24 24"
                fill="none"
                animate={reduceMotion ? undefined : { x: [0, -5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M11 6l-6 6 6 6M19 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em]">
                Drag to explore
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ---------- Divider + handle ---------- */}
      <motion.div className="absolute inset-y-0 z-30 w-0" style={{ left: dividerLeft }}>
        <motion.div
          className="absolute inset-y-0 -left-px w-0.5"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(5,199,112,0.9) 12%, rgba(5,199,112,0.9) 88%, transparent)",
            boxShadow: "0 0 18px rgba(5,199,112,0.55)",
            opacity: dividerOpacity,
          }}
        />

        <div
          role="slider"
          tabIndex={0}
          aria-label={`Reveal details for the ${title} domain`}
          aria-valuemin={MIN_POS}
          aria-valuemax={MAX_POS}
          aria-valuenow={Math.round(smoothPos.get())}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          onPointerDown={(event) => {
            event.stopPropagation();
            beginDrag(event.clientX, true);
          }}
          className="absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-[#05C770]/70 bg-[#0a0a0a] text-[#05C770] outline-none transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#05C770] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95"
          style={{
            touchAction: "none",
            boxShadow: "0 0 24px rgba(5,199,112,0.45), inset 0 0 12px rgba(5,199,112,0.12)",
          }}
        >
          {!touched && !reduceMotion && (
            <motion.span
              className="absolute inset-0 rounded-full border border-[#05C770]"
              animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M10 7l-4 5 4 5M14 7l4 5-4 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
