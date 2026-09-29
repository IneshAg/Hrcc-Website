"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent, type ReactElement } from "react";
import Image from "next/image";
import TechnicalPanel from "@/components/domains/TechnicalPanel";
import CreativePanel from "@/components/domains/CreativePanel";
import CorporatePanel from "@/components/domains/CorporatePanel";
import technicalBg from "@/assets/technical-bg.png";
import creativeBg from "@/assets/creative-bg.png";
import corporateBg from "@/assets/corporate-bg.png";
import { RECRUITMENT_FORM_URL } from "@/lib/links";

type Domain = {
  title: string;
  kicker: string;
  desc: string;
  tags: string[];
  glyph: string;
  image: typeof technicalBg;
  renderPanel: (active: boolean) => ReactElement;
};

const DOMAINS: Domain[] = [
  {
    title: "TECHNICAL",
    kicker: "Build & Ship",
    desc: "Dedicated to advancing technical skills in coding, AI, and hardware through innovation and collaboration.",
    tags: ["Web Dev", "AI / ML", "Hardware", "CP"],
    glyph: "</>",
    image: technicalBg,
    renderPanel: (active) => <TechnicalPanel active={active} />,
  },
  {
    title: "CREATIVE",
    kicker: "Design & Story",
    desc: "Where imagination meets design, producing visuals, content, and media that inspire, engage, and connect audiences.",
    tags: ["Graphics", "Video", "Content", "Social"],
    glyph: "✎",
    image: creativeBg,
    renderPanel: (active) => <CreativePanel active={active} />,
  },
  {
    title: "CORPORATE",
    kicker: "Partner & Operate",
    desc: "Building partnerships, managing events, and ensuring smooth operations through leadership, strategy, and collaboration.",
    tags: ["Sponsorship", "Events", "Outreach", "Ops"],
    glyph: "◈",
    image: corporateBg,
    renderPanel: (active) => <CorporatePanel active={active} />,
  },
];

const FAN_ROT = [-7, 2, 8];
const FAN_SIGN = [-1, 0, 1];
const FAN_Y_FACTOR = [1, -0.45, 1];

type Dims = {
  closedW: number;
  closedH: number;
  openW: number;
  openH: number;
  panelH: number;
  fanX: number;
  fanY: number;
};

function dimsFor(width: number): Dims {
  if (width < 480) {
    return { closedW: 132, closedH: 176, openW: Math.min(width - 56, 320), openH: 505, panelH: 215, fanX: 78, fanY: 18 };
  }
  if (width < 768) {
    return { closedW: 190, closedH: 250, openW: 340, openH: 545, panelH: 240, fanX: 128, fanY: 22 };
  }
  if (width < 1024) {
    return { closedW: 222, closedH: 294, openW: 360, openH: 575, panelH: 253, fanX: 168, fanY: 26 };
  }
  return { closedW: 250, closedH: 330, openW: 380, openH: 595, panelH: 265, fanX: 210, fanY: 30 };
}

/* ── Section header ────────────────────────────────────────────── */
function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="mb-6 text-center sm:mb-0 sm:text-left"
    >
      <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">
        <span className="h-1.5 w-1.5 rounded-full bg-[#05C770]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#05C770] md:text-xs">
          Areas of Expertise
        </span>
      </div>
      <h2 className="font-black text-3xl uppercase tracking-tight text-white sm:text-4xl md:text-5xl">Our Domains</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/50 sm:mx-0 sm:max-w-2xl md:text-base">
        Three domains, one mission. Explore the different wings of the HackerRank Campus Crew and discover where you can make the biggest impact.
      </p>
    </motion.div>
  );
}

/* ── Deck card: fanned/closed, lifts + holo-tilts when open ─────── */
function DomainCard({
  d,
  index,
  activeIndex,
  dims,
}: {
  d: Domain;
  index: number;
  activeIndex: number;
  dims: Dims;
}) {
  const isOpen = activeIndex === index;
  const someOpen = activeIndex !== -1;
  const fan = {
    rot: FAN_ROT[index],
    x: FAN_SIGN[index] * dims.fanX,
    y: FAN_Y_FACTOR[index] * dims.fanY,
  };

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glare = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { damping: 22, stiffness: 220 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { damping: 22, stiffness: 220 });
  const px = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const py = useTransform(my, [-0.5, 0.5], [0, 100]);
  const glareSpring = useSpring(glare, { damping: 20, stiffness: 300 });
  const sheenBg = useMotionTemplate`radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.14), transparent 50%), linear-gradient(115deg, transparent 30%, rgba(5,199,112,0.1) ${px}%, transparent 70%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!isOpen) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    glare.set(1);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
    glare.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={false}
      animate={{
        x: isOpen ? 0 : fan.x,
        y: isOpen ? 0 : fan.y,
        rotate: isOpen ? 0 : fan.rot,
        scale: someOpen && !isOpen ? 0.88 : 1,
        opacity: someOpen && !isOpen ? 0.4 : 1,
        width: isOpen ? dims.openW : dims.closedW,
        height: isOpen ? dims.openH : dims.closedH,
        zIndex: isOpen ? 30 : 10 + index,
      }}
      transition={{ type: "spring", stiffness: 210, damping: 28, mass: 0.9 }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1000,
      }}
      className="relative rounded-2xl border border-white/10 bg-[#080808] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-25">
        <Image src={d.image} alt={d.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black" />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl mix-blend-screen"
        style={{ opacity: glareSpring, background: sheenBg }}
      />

      <div className="relative z-20 flex h-full flex-col overflow-hidden p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-[#05C770]">0{index + 1}</span>
          <span className="h-px w-5 bg-[#05C770]/40" />
          {isOpen && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">{d.kicker}</span>
          )}
        </div>

        {!isOpen ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center sm:gap-3">
            <span className="font-mono text-xl text-[#05C770] sm:text-2xl">{d.glyph}</span>
            <h3 className="font-black text-base tracking-tight text-white sm:text-lg">{d.title}</h3>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <h3 className="mb-2 font-black text-xl leading-none tracking-tight text-white sm:mb-3 sm:text-2xl">{d.title}</h3>
            <p className="mb-3 text-[11px] leading-relaxed text-white/55 sm:mb-4 sm:text-xs">{d.desc}</p>
            <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4">
              {d.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#05C770]/30 bg-[#05C770]/10 px-2 py-0.5 text-[8px] uppercase text-[#05C770] sm:px-2.5 sm:py-1 sm:text-[9px]"
                >
                  {t}
                </span>
              ))}
            </div>
            <div
              className="mb-3 shrink-0 overflow-hidden rounded-xl border border-white/8 bg-black/40 sm:mb-4"
              style={{ height: dims.panelH }}
            >
              {d.renderPanel(true)}
            </div>
            <a
              href={RECRUITMENT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-[#05C770]/60 bg-black/40 py-2 text-[11px] font-bold text-[#05C770] transition-colors hover:bg-[#05C770] hover:text-black sm:py-2.5 sm:text-xs"
            >
              APPLY NOW
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Main section ──────────────────────────────────────────────── */
export default function DomainsSection() {
  const [deckActive, setDeckActive] = useState(-1);
  const [dims, setDims] = useState<Dims>(() => dimsFor(1024));
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setDims(dimsFor(window.innerWidth));
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.12) setDeckActive(-1);
    else if (v < 0.4) setDeckActive(0);
    else if (v < 0.68) setDeckActive(1);
    else if (v < 0.94) setDeckActive(2);
    else setDeckActive(-1);
  });

  return (
    <section id="domains" className="relative z-10 w-full px-4 py-24 md:px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 85% 6%, rgba(5,199,112,0.12), transparent 60%), radial-gradient(40% 35% at 8% 90%, rgba(5,199,112,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <div ref={sceneRef} style={{ height: "260vh" }} className="relative">
          <div className="sticky top-[5vh] flex h-[90vh] max-h-[760px] flex-col sm:top-[8vh] sm:h-[84vh]">
            <div
              className="relative z-50 shrink-0 pb-6"
              style={{ background: "linear-gradient(to bottom, #050505 78%, transparent)" }}
            >
              <SectionHeader />
            </div>

            <div className="relative" style={{ flex: 1 }}>
              {DOMAINS.map((d, i) => (
                <div key={d.title} className="absolute inset-0 flex items-center justify-center">
                  <DomainCard d={d} index={i} activeIndex={deckActive} dims={dims} />
                </div>
              ))}
            </div>

            <div className="relative z-50 shrink-0 pt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              {deckActive === -1 ? "Scroll to explore" : "Keep scrolling to explore"}
            </div>
          </div>
        </div>

        {/* Recruitments block */}
        <motion.div
          className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:mt-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div
            id="recruitments"
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-xl bg-[#05C770] p-6 md:p-10"
            style={{ boxShadow: "0 30px 70px -35px rgba(5,199,112,0.65)" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 80% at 8% 0%, rgba(255,255,255,0.32), transparent 60%), radial-gradient(80% 90% at 100% 100%, rgba(0,0,0,0.22), transparent 62%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.13]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
            <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-12 bg-white/25 blur-2xl transition-transform duration-[900ms] ease-out group-hover:translate-x-[420%]" />
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-black/10" />
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full border border-black/10" />

            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/85 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#05C770] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#05C770]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white md:text-xs">
                  Live - Now Hiring
                </span>
              </div>
              <h3
                className="font-black leading-[0.88] tracking-tight text-black"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3.8rem)" }}
              >
                RECRUITMENTS<br />OPEN<span className="text-black/45">.</span>
              </h3>
              <p className="mt-3 max-w-sm text-xs font-medium text-black/70 md:text-sm">
                Three domains, one crew. Pick where you want to build and send in your application.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {DOMAINS.map((d) => (
                  <span
                    key={d.title}
                    className="rounded-full bg-black/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black/75"
                  >
                    {d.title}
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
                <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div
            className="relative min-h-64 overflow-hidden rounded-xl border border-[#05C770]/20 bg-black"
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
