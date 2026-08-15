"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image, { StaticImageData } from "next/image";

import clubStart from "@/assets/club_start.jpeg";
import codathon from "@/assets/codathon.jpeg";
import techtalk from "@/assets/techtalk.jpeg";
import aprilhackathon from "@/assets/techformers.jpeg";
import infinityHacks from "@/assets/Infinity Hacks.jpeg";
import dominion from "@/assets/Domainion.jpeg";

interface EventItem {
  id: string;
  title: string;
  /** Short name used by the timeline selector. */
  label: string;
  year: string;
  description: React.ReactNode;
  /** Empty until the poster art is ready — the card shows a placeholder instead. */
  images: StaticImageData[];
  /** Portrait posters are never cropped, only letterboxed. */
  portrait?: boolean;
  titleColor: string;
  yearColor: string;
  /** Draws the pinging dot on the timeline for the event that is open now. */
  live?: boolean;
}

const events: EventItem[] = [
  {
    id: "club-launch",
    title: "Club\nLaunch",
    label: "Club Launch",
    year: "2025",
    description: "In September 2025, we officially kicked things off! The event featured Aadil Bankukwala, the CMO of HackerRank, who shared valuable insights about the tech industry. Our inaugural launch brought together passionate minds and set the stage for everything our club aims to achieve. It was an incredible session filled with networking, roadmap reveals, and our vision for the future of technology and collaboration on campus.",
    images: [clubStart],
    portrait: true,
    titleColor: "#E8706A",
    yearColor: "#05C770",
  },
  {
    id: "online-codethon",
    title: "Online\nCodethon",
    label: "Online Codethon",
    year: "2025",
    description: "Overclocked was our flagship campus-wide codeathon that pushed students beyond their limits. This multi-round competition challenged participants across Object-Oriented Programming, Data Structures & Algorithms, Web Development, and React. Starting with online qualifiers, the event filtered top talent through intense elimination rounds, culminating in a high-stakes offline finale. With 4,000–5,000 participants, Overclocked tested problem-solving, code efficiency, and practical implementation.",
    images: [codathon],
    portrait: true,
    titleColor: "#4A90D9",
    yearColor: "#F5A623",
  },
  {
    id: "tech-talk",
    title: "Tech\nTalk",
    label: "Tech Talk",
    year: "2026",
    description: "Join us for an enlightening Tech Talk featuring Dr. Paul T Sheeba and Dr. Gopiranjan PV, distinguished experts in the field of technology and innovation. This engaging session will dive deep into cutting-edge industry trends, research insights, and practical applications. Whether you're a beginner seeking guidance or an experienced professional looking to expand your knowledge, this talk offers valuable perspectives, interactive Q&A opportunities, and networking with peers and industry leaders.",
    images: [techtalk],
    portrait: true,
    titleColor: "#F5A623",
    yearColor: "#E8706A",
  },
  {
    id: "april-hackathon",
    title: "Techformers\n1.0",
    label: "Techformers",
    year: "2026",
    description: (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-gray-700">
          Step into <strong>Techformers 1.0</strong>, a 2-day hackathon organized by HackerRank Campus Crew SRMIST in collaboration with HackerRank! Whether you're a beginner or an experienced developer, this event is designed to challenge your skills, spark innovation, and build impactful solutions for real-world problems. Join us on 7th–8th April 2026 at SRMIST for 2 days of intense hands-on building, team collaboration, and a chance to win from a prize pool of ₹30,000. Registration is live - no matter your level, there's a problem waiting for you!
        </p>
        <div className="mt-2 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
        
        </div>
      </div>
    ),
    images: [aprilhackathon],
    portrait: true,
    titleColor: "#05C770",
    yearColor: "#4A90D9",
  },
  {
    id: "infinity-hacks",
    title: "Infinity\nHacks",
    label: "Infinity Hacks",
    year: "2026",
    live: true,
    // Slightly tighter type on phones — this card carries the most copy.
    description: (
      <div className="flex flex-col gap-2.5 text-left text-xs sm:gap-3 sm:text-sm md:text-base">
        <p className="text-gray-700">
          <strong>HackerRank Infinity Hacks 2026</strong> brings developers, designers, AI
          enthusiasts, and problem-solvers from around the world together for two days of building,
          experimenting, and solving challenges that matter — online on{" "}
          <strong>15th–16th August 2026</strong>.
        </p>
        <p className="text-gray-700">
          It pushes you past conventional projects into real-world problems across multiple domains,
          turning ambitious ideas into meaningful solutions. And the momentum has already begun — with{" "}
          <strong>2,000+ registrations</strong> within hours of launch.
        </p>
        <p className="font-bold text-gray-900">Think bigger. Build smarter. Create impact.</p>
        <div className="mt-0.5 flex justify-center lg:justify-start">
          <a
            href="https://hrcc-infinityhacks.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group/reg inline-flex items-center gap-2.5 rounded-xl bg-[#05C770] px-6 py-3 text-sm font-extrabold tracking-wide text-black shadow-lg shadow-[#05C770]/25 transition-all duration-300 hover:bg-[#04b264] hover:shadow-xl hover:shadow-[#05C770]/40 hover:scale-[1.04] active:scale-[0.98] sm:px-7 sm:py-3.5 sm:text-base"
          >
            Register Now
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover/reg:translate-x-1 sm:h-5 sm:w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12h13M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    ),
    images: [infinityHacks],
    portrait: true,
    titleColor: "#4A90D9",
    yearColor: "#05C770",
  },
  {
    id: "dominion",
    title: "Dominion\n2026",
    label: "Dominion",
    year: "2026",
    live: true,
    description: (
      <div className="flex flex-col gap-2.5 text-left text-xs sm:gap-3 sm:text-sm md:text-base">
        <p className="font-semibold italic text-gray-900">
          Where ideas compete. Where builders take over.
        </p>
        <p className="text-gray-700">
          Gear up for <strong>DOMINION 2026</strong>, a hybrid buildathon by HackerRank Campus Crew
          SRMIST × IEEE Computer Society.
        </p>
        <p className="text-gray-700">
          On <strong>2nd–3rd September 2026</strong> it pairs an offline buildathon at SRMIST,
          Kattankulathur with an online track — turn your ideas into working solutions and compete
          for rewards and goodies.
        </p>
        <p className="font-bold text-gray-900">
          Bring the idea. Build the solution. Own the challenge.
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <a
            href="https://luma.com/rr8pcs58"
            target="_blank"
            rel="noopener noreferrer"
            className="group/reg inline-flex items-center gap-2.5 rounded-xl bg-[#05C770] px-6 py-3 text-sm font-extrabold tracking-wide text-black shadow-lg shadow-[#05C770]/25 transition-all duration-300 hover:bg-[#04b264] hover:shadow-xl hover:shadow-[#05C770]/40 hover:scale-[1.04] active:scale-[0.98] sm:px-7 sm:py-3.5 sm:text-base"
          >
            Register Now
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover/reg:translate-x-1 sm:h-5 sm:w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12h13M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
            Build • Innovate • Dominate
          </span>
        </div>
      </div>
    ),
    images: [dominion],
    portrait: true,
    titleColor: "#E8706A",
    yearColor: "#4A90D9",
  },
];

const CARD_HEIGHT = "clamp(400px, 64vh, 520px)";
/** Head room above the stack so cards behind the front one stay visible. */
const STACK_SLACK = 56;
/** Cards behind the front one stop shrinking after this many steps. */
const MAX_STACK_DEPTH = 3;

function EventCard({
  event,
  index,
  total,
  progress,
}: {
  event: EventItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // step < 0 → card is still queued below; step > 0 → card has been covered.
  const step = useTransform(progress, (p) => p * (total - 1) - index);

  // Queued cards sit fully below the (clipped) stack box, so they slide in solid
  // instead of fading through the card in front.
  const y = useTransform(step, (s) =>
    s <= 0 ? `${-s * 108}%` : `${-Math.min(s, MAX_STACK_DEPTH) * 5}%`,
  );
  const scale = useTransform(step, (s) =>
    s <= 0 ? 1 : 1 - Math.min(s, MAX_STACK_DEPTH) * 0.05,
  );
  const opacity = useTransform(step, (s) =>
    Math.max(0, 1 - Math.max(0, s - MAX_STACK_DEPTH)),
  );

  return (
    <motion.div
      className="absolute inset-0 bg-white rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
      style={{ y, scale, opacity, zIndex: index }}
    >
      <div className="flex h-full flex-col lg:flex-row items-stretch justify-between gap-0">
        {/* Event photo — banner on mobile, right column on desktop */}
        <div className="order-1 lg:order-2 shrink-0 flex justify-center items-center px-5 pt-5 lg:p-12">
          {/* object-contain on small screens so event posters stay readable
              instead of being cropped by the wide banner */}
          <div
            className={`relative w-full overflow-hidden rounded-xl lg:shadow-lg ${
              event.portrait ? "h-40 sm:h-44 lg:h-96 lg:w-72" : "h-28 sm:h-36 lg:h-60 lg:w-80"
            }`}
          >
            {event.images[0] ? (
              <Image
                src={event.images[0]}
                alt={`${event.id} photo`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 border-2 border-dashed border-black/15 bg-black/4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                  Poster
                </span>
                <span className="text-xs font-semibold text-black/50">Coming soon</span>
              </div>
            )}
          </div>
        </div>

        {/* Event description */}
        <div className="order-2 lg:order-1 flex-1 min-h-0 overflow-hidden px-5 pb-5 pt-4 lg:p-12 flex flex-col justify-center lg:items-start items-center text-center lg:text-left">
          <div className="text-gray-700 text-[13px] sm:text-sm md:text-base leading-relaxed max-w-lg w-full">
            {event.description}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function UpcomingEvents() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActiveIndex(Math.round(p * (events.length - 1)));
  });

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + (scrollable * i) / (events.length - 1);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id="events"
      className="px-4 md:px-8 w-full pointer-events-none"
      style={{ background: "transparent" }}
    >
      {/* Tall track — its height is the scroll budget for the card stack */}
      <div
        ref={trackRef}
        className="relative w-full"
        style={{ height: `${events.length * 85}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center gap-8">
          {/* Title */}
          <motion.h2
            className="text-center font-black tracking-tight w-full"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "#ffffff",
              fontFamily: "'Outfit', sans-serif",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            EVENTS
          </motion.h2>

          {/* Card stack — the top slack keeps the cards behind visible while the
              bottom edge clips the card that is still sliding in. */}
          <div
            className="relative w-full max-w-[1032px] px-4 overflow-hidden"
            style={{ paddingTop: STACK_SLACK }}
          >
            <div className="relative w-full" style={{ height: CARD_HEIGHT }}>
              {events.map((event, i) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={i}
                  total={events.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          {/* Timeline Selector */}
          <div className="w-full max-w-[800px] pointer-events-auto">
            <div className="relative flex items-center justify-between">
              {/* Horizontal line */}
              <div className="absolute top-3 left-0 right-0 h-[2px] bg-white/20" />

              {events.map((event, i) => (
                <button
                  key={event.id}
                  onClick={() => goTo(i)}
                  className="relative flex flex-col items-center gap-3 group z-10"
                >
                  {/* Dot indicator */}
                  <div className="relative">
                    {event.live && (
                      <div className="absolute inset-0 bg-[#05C770] rounded-md animate-ping opacity-75" />
                    )}
                    <div
                      className="relative w-6 h-6 rounded-md border-2 transition-all duration-300"
                      style={{
                        borderColor: activeIndex === i ? "#05C770" : "rgba(255,255,255,0.25)",
                        background: activeIndex === i ? "#05C770" : "transparent",
                      }}
                    />
                  </div>
                  {/* Label — wraps and shrinks on phones so six of them still fit */}
                  <span
                    className="max-w-14 text-center text-[9px] font-semibold leading-tight transition-colors duration-300 sm:max-w-none sm:whitespace-nowrap sm:text-xs md:text-base"
                    style={{
                      color: activeIndex === i ? "#ffffff" : "rgba(255,255,255,0.45)",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {event.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
