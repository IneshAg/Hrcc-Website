"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { StaticImageData } from "next/image";

import technicalBg from "@/assets/technical-bg.png";
import creativeBg from "@/assets/creative-bg.png";
import corporateBg from "@/assets/corporate-bg.png";
import { RECRUITMENT_FORM_URL } from "@/lib/links";

import DomainRevealCard from "./domains/DomainRevealCard";
import TechnicalPanel from "./domains/TechnicalPanel";
import CreativePanel from "./domains/CreativePanel";
import CorporatePanel from "./domains/CorporatePanel";
import { RevealSection, RevealItem } from "./RevealComponents";


interface Domain {
  title: string;
  kicker: string;
  description: string;
  tags: string[];
  image: StaticImageData;
  renderPanel: (active: boolean) => ReactNode;
}

const domains: Domain[] = [
  {
    title: "TECHNICAL",
    kicker: "Build & Ship",
    description:
      "Dedicated to advancing technical skills in coding, AI, and hardware through innovation and collaboration.",
    tags: ["Web Dev", "AI / ML", "Hardware", "CP"],
    image: technicalBg,
    renderPanel: (active) => <TechnicalPanel active={active} />,
  },
  {
    title: "CREATIVE",
    kicker: "Design & Story",
    description:
      "Where imagination meets design, producing visuals, content, and media that inspire, engage, and connect audiences.",
    tags: ["Graphics", "Video", "Content", "Social"],
    image: creativeBg,
    renderPanel: (active) => <CreativePanel active={active} />,
  },
  {
    title: "CORPORATE",
    kicker: "Partner & Operate",
    description:
      "Building partnerships, managing events, and ensuring smooth operations through leadership, strategy, and collaboration.",
    tags: ["Sponsorship", "Events", "Outreach", "Ops"],
    image: corporateBg,
    renderPanel: (active) => <CorporatePanel active={active} />,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function DomainsSection() {
  const ref = useRef(null);

  return (
    <section
      id="domains"
      className="relative z-10 py-16 px-4 md:px-6 w-full flex flex-col items-center justify-center pointer-events-none"
      style={{ background: "transparent" }}
    >
      <div className="max-w-350 w-full pointer-events-none" ref={ref}>
        {/* Section heading */}
        <RevealSection className="mb-8">
          <RevealItem>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#05C770]">
                What we do
              </span>
              <h2
                className="font-black text-white leading-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Our <span className="text-[#05C770]">Domains</span>
              </h2>
            </div>
          </RevealItem>
        </RevealSection>

        {/* Domain Cards — drag-to-reveal sliders */}
        <RevealSection className="flex flex-col gap-3">
          {domains.map((domain, i) => (
            <RevealItem key={domain.title} delay={i * 80}>
              <DomainRevealCard
                index={i}
                title={domain.title}
                kicker={domain.kicker}
                description={domain.description}
                tags={domain.tags}
                image={domain.image}
                renderPanel={domain.renderPanel}
              />
            </RevealItem>
          ))}
        </RevealSection>

        {/* Recruitments Block */}
        <motion.div
          className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={3}
        >
          {/* Left — Recruitments CTA */}
          <div
            id="recruitments"
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-xl bg-[#05C770] p-6 md:p-10 pointer-events-auto"
            style={{ boxShadow: "0 30px 70px -35px rgba(5,199,112,0.65)" }}
          >
            {/* Depth: soft highlight top-left, shade bottom-right */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 80% at 8% 0%, rgba(255,255,255,0.32), transparent 60%), radial-gradient(80% 90% at 100% 100%, rgba(0,0,0,0.22), transparent 62%)",
              }}
            />
            {/* Fine grid */}
            <div
              className="absolute inset-0 opacity-[0.13]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
            {/* Sheen sweep on hover */}
            <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-12 bg-white/25 blur-2xl transition-transform duration-[900ms] ease-out group-hover:translate-x-[420%]" />
            {/* Decorative rings */}
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-black/10" />
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full border border-black/10" />

            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/85 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#05C770] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#05C770]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white md:text-xs">
                  Live · Now Hiring
                </span>
              </div>

              <h3
                className="font-black leading-[0.88] tracking-tight text-black"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3.8rem)" }}
              >
                RECRUITMENTS
                <br />
                OPEN<span className="text-black/45">.</span>
              </h3>

              <p className="mt-3 max-w-sm text-xs font-medium text-black/70 md:text-sm">
                Three domains, one crew. Pick where you want to build and send in your
                application.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {domains.map((domain) => (
                  <span
                    key={domain.title}
                    className="rounded-full bg-black/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black/75"
                  >
                    {domain.title}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={RECRUITMENT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/apply relative z-10 mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-black px-6 py-3 text-sm font-bold tracking-wide text-[#05C770] transition-transform duration-300 hover:scale-[1.04]"
            >
              APPLY NOW
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover/apply:translate-x-1"
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

          {/* Right — Video embed */}
          <div
            className="relative min-h-64 overflow-hidden rounded-xl border border-[#05C770]/20 bg-black pointer-events-auto"
            style={{ boxShadow: "0 30px 70px -40px rgba(0,0,0,0.9)" }}
          >
            <iframe
              src="https://player.vimeo.com/video/1115531421?badge=0&autopause=0&player_id=0&app_id=58479"
              className="absolute inset-0 h-full w-full"
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
