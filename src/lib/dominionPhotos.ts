import type { StaticImageData } from "next/image";

import dsc0467 from "@/assets/DSC_0467.jpg";
import dsc0473 from "@/assets/DSC_0473.jpg";
import dsc0505 from "@/assets/DSC_0505.jpg";
import dsc0507 from "@/assets/DSC_0507.jpg";
import dsc0511 from "@/assets/DSC_0511.jpg";
import dsc0532 from "@/assets/DSC_0532.jpg";
import dsc0534 from "@/assets/DSC_0534.jpg";
import dsc0536 from "@/assets/DSC_0536.jpg";
import dsc0537 from "@/assets/DSC_0537.jpg";
import dsc0552 from "@/assets/DSC_0552.jpg";
import dsc0555 from "@/assets/DSC_0555.jpg";
import dsc0556 from "@/assets/DSC_0556.jpg";
import dsc0558 from "@/assets/DSC_0558.jpg";
import dsc0564 from "@/assets/DSC_0564.jpg";
import dsc0596 from "@/assets/DSC_0596.jpg";
import dsc0597 from "@/assets/DSC_0597.jpg";
import dsc0613 from "@/assets/DSC_0613.jpg";
import dsc0713 from "@/assets/DSC_0713.jpg";

export type GalleryPhoto = {
  src: StaticImageData;
  caption: string;
  category: "dominion" | "highlights";
};

export const dominionPhotos: GalleryPhoto[] = [
  { src: dsc0467, caption: "Dominion 2026 — Opening & Welcome", category: "dominion" },
  { src: dsc0473, caption: "Dominion 2026 — Hackers In Action", category: "dominion" },
  { src: dsc0505, caption: "Dominion 2026 — Architecture & Brainstorming", category: "dominion" },
  { src: dsc0507, caption: "Dominion 2026 — Team Collaboration", category: "dominion" },
  { src: dsc0511, caption: "Dominion 2026 — Focused Building", category: "dominion" },
  { src: dsc0532, caption: "Dominion 2026 — Late Night Sprints", category: "dominion" },
  { src: dsc0534, caption: "Dominion 2026 — Mentorship & Code Review", category: "dominion" },
  { src: dsc0536, caption: "Dominion 2026 — Deep Work Session", category: "dominion" },
  { src: dsc0537, caption: "Dominion 2026 — Problem Solving", category: "dominion" },
  { src: dsc0552, caption: "Dominion 2026 — Presentation Preparation", category: "dominion" },
  { src: dsc0555, caption: "Dominion 2026 — Project Pitching", category: "dominion" },
  { src: dsc0556, caption: "Dominion 2026 — Judging Round", category: "dominion" },
  { src: dsc0558, caption: "Dominion 2026 — Live Demo Showcase", category: "dominion" },
  { src: dsc0564, caption: "Dominion 2026 — Audience & Participants", category: "dominion" },
  { src: dsc0596, caption: "Dominion 2026 — Celebrations & Awards", category: "dominion" },
  { src: dsc0597, caption: "Dominion 2026 — Winners On Stage", category: "dominion" },
  { src: dsc0613, caption: "Dominion 2026 — Team Spirit & Smiles", category: "dominion" },
  { src: dsc0713, caption: "Dominion 2026 — The HRCC Crew", category: "dominion" },
];

export const dominionImagesOnly: StaticImageData[] = dominionPhotos.map((p) => p.src);
