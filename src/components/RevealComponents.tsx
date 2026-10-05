"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

// ─── Shared variants ───────────────────────────────────────────────────────────
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const FADE_LEFT: Variants = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const FADE_RIGHT: Variants = {
  hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

// ─── RevealSection ─────────────────────────────────────────────────────────────
// Stagger-container for child RevealItem components.
export function RevealSection({
  children,
  className = "",
  threshold = 0.15,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -80px 0px",
    amount: threshold,
  });

  return (
    <motion.div
      ref={ref}
      variants={STAGGER_CONTAINER}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  direction = "up",
  delay,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}) {
  const baseVariants =
    direction === "left" ? FADE_LEFT : direction === "right" ? FADE_RIGHT : FADE_UP;

  const variants: Variants =
    delay !== undefined
      ? {
          hidden: baseVariants.hidden,
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.75, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] as const },
          },
        }
      : baseVariants;

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

// ─── RevealCard ────────────────────────────────────────────────────────────────
// Standalone card with its own IntersectionObserver.
export function RevealCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={FADE_UP}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── RevealHeading ─────────────────────────────────────────────────────────────
export function RevealHeading({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={FADE_UP}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}
