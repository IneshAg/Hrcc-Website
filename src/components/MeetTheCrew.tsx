"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Arnav from "@/assets/Arnav.png";
import Ayush from "@/assets/Ayush.png";
import Vishesh from "@/assets/Vishesh.jpeg";
import Aryan from "@/assets/Aryan.jpeg";
import Anish from "@/assets/Anish.png";
import Aashi from "@/assets/Aashi.png";
import Saii from "@/assets/Saii.png";
import Purva from "@/assets/Purva.png";
import Nischay from "@/assets/Nischay.png";
import Ranvir from "@/assets/Ranvir.png";
import Shlok from "@/assets/Shlok.jpeg";
import Jushiya from "@/assets/Jushiya.jpeg";
import Avinash from "@/assets/Avinash.jpeg";
import ShanayaImage from "@/assets/Shanaya.jpeg";
import Nikhil from "@/assets/Nikhil.jpeg";
import Abhay from "@/assets/Abhay.jpeg";
import Arya from "@/assets/Arya.jpeg";
import Naisha from "@/assets/Naisha.jpeg";

/**
 * To finish a member: drop their photo in src/assets, import it and set `image`,
 * then replace the "#" placeholders with their real profile URLs. Anything left
 * as "#" renders as a dimmed, non-clickable icon.
 */
interface CrewMember {
  name: string;
  role: string;
  image?: StaticImageData;
  imagePosition?: string;
  github: string;
  linkedin: string;
  isSecret?: boolean;
}

const TBD = "#";

interface DomainGroup {
  domain: string;
  members: CrewMember[];
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const founder: CrewMember[] = [
  {
    name: "Arnav Puggal",
    role: "Founder & Ex-Chairperson",
    image: Arnav,
    github: "https://github.com/12asascoder",
    linkedin: "https://www.linkedin.com/in/arnav-puggal/",
  },
];

const president: CrewMember[] = [
  {
    name: "Jushiya Grover",
    role: "President & Campus Ambassador",
    image: Jushiya,
    isSecret: true,
    github: TBD,
    linkedin: TBD,
  },
];


const vicePresidents: CrewMember[] = [
  {
    name: "Ayush Sharma",
    role: "Vice President",
    image: Ayush,
    github: "https://github.com/itzayush18",
    linkedin: "https://www.linkedin.com/in/itsayush18/",
  },
  {
    name: "Vishesh Jhabak",
    role: "Vice President",
    image: Vishesh,
    github: TBD,
    linkedin: "https://www.linkedin.com/in/vishesh-jhabak-a7b000327",
  },
  {
    name: "Aryan Gupta",
    role: "Vice President",
    image: Aryan,
    github: "https://github.com/Aryan27-max",
    linkedin: "https://www.linkedin.com/in/aryan-gupta-1058aa209/",
  },
];

const secretaries: CrewMember[] = [
  { name: "Sumantha Dash", role: "Secretary", github: TBD, linkedin: TBD },
  {
    name: "Purva Jain",
    role: "Joint Secretary",
    image: Purva,
    imagePosition: "center top",
    github: "https://github.com/purvajain-git",
    linkedin: "https://www.linkedin.com/in/purva-jain17",
  },
];

const domainHeads: DomainGroup[] = [
  {
    domain: "Technical",
    members: [
      {
        name: "Anish Mall",
        role: "Technical Head",
        image: Anish,
        github: "https://github.com/anish-9387",
        linkedin: "https://www.linkedin.com/in/anish-mall/",
      },
      {
        name: "Shlok Agarwal",
        role: "Technical Head",
        image: Shlok,
        github: "https://github.com/Shlok-2006",
        linkedin: "https://www.linkedin.com/in/shlok0606/"
      },
    ],
  },
  {
    domain: "Creative",
    members: [
      {
        name: "Sai",
        role: "Creative Head",
        image: Saii,
        github: TBD,
        linkedin: "https://www.linkedin.com/in/sai-shraavya-badrinath-48aa48323",
      },
      {
        name: "Nikhil",
        role: "Creative Head",
        image: Nikhil,
        imagePosition: "center top",
        github: TBD,
        linkedin: TBD,
      },
    ],
  },
  {
    domain: "Corporate",
    members: [
      {
        name: "Ranvir Singh",
        role: "Corporate Head",
        image: Ranvir,
        github: "https://github.com/rs7185-lab",
        linkedin: "https://www.linkedin.com/in/ranvir-singh-268222383",
      },
      {
        name: "Avinash K",
        role: "Corporate Head",
        image: Avinash,
        github: TBD,
        linkedin: TBD,
      },
    ],
  },
];

const domainLeads: DomainGroup[] = [
  {
    domain: "Technical",
    members: [
      {
        name: "Aashi Soni",
        role: "Technical Lead",
        image: Aashi,
        github: "https://github.com/aashisoni000",
        linkedin: "https://www.linkedin.com/in/aashisoni/",
      },
      {
        name: "Shanaya",
        role: "Technical Lead",
        image: ShanayaImage,
        github: "https://github.com/shanayaray",
        linkedin: "https://www.linkedin.com/in/shanaya-ray-5843443a6?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      },
    ],
  },
  {
    domain: "Creative",
    members: [
      {
        name: "Naisha Sharma",
        role: "Creative Lead",
        image: Naisha,
        imagePosition: "center top",
        github: TBD,
        linkedin: TBD,
      },
      {
        name: "Abhay Singh Chouhan",
        role: "Creative Lead",
        image: Abhay,
        github: "https://github.com/abhaycore",
        linkedin: "https://www.linkedin.com/in/abhay-singh-chouhan-2b52aa353",
      },
    ],
  },
  {
    domain: "Corporate",
    members: [
      {
        name: "Arya Phanase",
        role: "Corporate Lead",
        image: Arya,
        github: TBD,
        linkedin: TBD,
      },
      {
        name: "Nischay Naman",
        role: "Corporate Lead",
        image: Nischay,
        github: "https://github.com/NischayNN",
        linkedin: "https://www.linkedin.com/in/nischaynaman-303938379",
      },
    ],
  },
];

// ─── Icons ─────────────────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Renders a live link, or a dimmed non-clickable icon while the URL is still "#". */
function SocialLink({
  href,
  label,
  hoverClass,
  children,
}: {
  href: string;
  label: string;
  hoverClass: string;
  children: React.ReactNode;
}) {
  if (!href || href === TBD) {
    return (
      <span className="p-1 text-white/12" title={`${label} — coming soon`} aria-hidden="true">
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-white/35 transition-colors duration-200 p-1 ${hoverClass}`}
      aria-label={label}
    >
      {children}
    </a>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────
function CrewCard({ member, width }: { member: CrewMember; width: string }) {
  return (
    <motion.div
      className="relative flex flex-col shrink-0 rounded-[10px] overflow-hidden"
      style={{
        width,
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.07)",
        pointerEvents: "auto",
      }}
      whileHover={{
        scale: 1.04,
        borderColor: "#05C770",
        transition: { duration: 0.18 },
      }}
    >
      <div
        className="flex items-center gap-1 px-2 py-2"
        style={{ background: "#0d0d0d", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F56", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFBD2E", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#27C93F", display: "inline-block" }} />
      </div>

      <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
        {member.isSecret ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none"
            style={{
              background:
                "radial-gradient(100% 100% at 50% 20%, rgba(5,199,112,0.12), transparent 75%), #0c0c0c",
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#05C770]/10 border border-[#05C770]/25 flex items-center justify-center text-[#05C770]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <span
                className="font-bold tracking-[0.2em] uppercase text-[#05C770]"
                style={{ fontSize: "clamp(10px, 2.2vw, 12px)" }}
              >
                Coming Soon
              </span>
            </div>
          </div>
        ) : member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            style={{ objectPosition: member.imagePosition || "center" }}
            sizes="(max-width: 640px) 160px, 240px"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                "radial-gradient(80% 80% at 50% 0%, rgba(5,199,112,0.16), transparent 70%), #0b0b0b",
            }}
          >
            <span
              className="font-black tracking-tight text-white/25"
              style={{ fontSize: "clamp(24px, 5vw, 46px)" }}
            >
              {initialsOf(member.name)}
            </span>
          </div>
        )}
      </div>

      {/* Fixed height so a long name never makes one card taller than its row */}
      <div
        className="flex items-center justify-between px-2 py-2 gap-1"
        style={{ background: "#0f0f0f", height: 50 }}
      >
        <div className="min-w-0 flex-1">
          {!member.isSecret && (
            <p
              className="font-bold leading-tight text-white truncate"
              style={{ fontSize: "clamp(10px, 2.2vw, 13px)" }}
            >
              {member.name}
            </p>
          )}
          <p
            className={`truncate ${member.isSecret ? "font-bold text-white text-center sm:text-left" : "mt-0.5 text-white/40"}`}
            style={{ fontSize: member.isSecret ? "clamp(10px, 2.2vw, 12px)" : "clamp(8px, 2vw, 11px)" }}
            title={member.role}
          >
            {member.role}
          </p>
        </div>
        {!member.isSecret && (
          <div className="flex gap-1.5 shrink-0">
            <SocialLink
              href={member.github}
              label={`${member.name} GitHub`}
              hoverClass="hover:text-white"
            >
              <GithubIcon />
            </SocialLink>
            <SocialLink
              href={member.linkedin}
              label={`${member.name} LinkedIn`}
              hoverClass="hover:text-[#0A66C2]"
            >
              <LinkedinIcon />
            </SocialLink>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Layout helpers ────────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 } as const,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-black text-center mb-4"
      style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)", lineHeight: 1, color: "#05C770" }}
    >
      {children}
    </h3>
  );
}

function CrewRow({ title, members }: { title: string; members: CrewMember[] }) {
  return (
    <motion.div className="w-full flex flex-col items-center mt-10 pointer-events-none" {...fadeUp}>
      <GroupHeading>{title}</GroupHeading>
      <div className="flex flex-wrap justify-center gap-3 md:gap-5 items-start">
        {members.map((member) => (
          <CrewCard key={member.name} member={member} width="clamp(150px, 38vw, 230px)" />
        ))}
      </div>
    </motion.div>
  );
}

function DomainRow({ title, groups }: { title: string; groups: DomainGroup[] }) {
  return (
    <motion.div className="w-full flex flex-col items-center mt-12 pointer-events-none" {...fadeUp}>
      <GroupHeading>{title}</GroupHeading>
      <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 md:gap-6">
        {groups.map((group) => (
          <div key={group.domain} className="flex flex-col items-center">
            <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
              {group.domain}
            </span>
            <div className="flex flex-wrap justify-center gap-3 items-start">
              {group.members.map((member) => (
                <CrewCard key={member.name} member={member} width="clamp(135px, 33vw, 158px)" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function MeetTheCrew() {
  return (
    <section
      id="team"
      className="relative z-10 py-20 px-4 md:px-8 overflow-hidden pointer-events-none"
      style={{ background: "transparent" }}
    >
      <div className="max-w-275 w-full mx-auto pointer-events-none">
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-black text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}
          >
            MEET THE <span style={{ color: "#05C770" }}>CREW</span>
          </h2>
        </motion.div>

        <CrewRow title="Founder" members={founder} />
        <CrewRow title="President & Campus Ambassador" members={president} />
        <CrewRow title="Vice Presidents" members={vicePresidents} />
        <CrewRow title="Secretary & Joint Secretary" members={secretaries} />
        <DomainRow title="Domain Heads" groups={domainHeads} />
        <DomainRow title="Domain Leads" groups={domainLeads} />
      </div>
    </section>
  );
}
