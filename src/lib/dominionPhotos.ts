import type { StaticImageData } from "next/image";

import dsc0121 from "@/assets/DSC_0121.jpg";
import dsc0398 from "@/assets/DSC_0398.jpg";
import dsc0410 from "@/assets/DSC_0410.jpg";
import dsc0435 from "@/assets/DSC_0435.jpg";
import dsc0447 from "@/assets/DSC_0447.jpg";
import dsc0449 from "@/assets/DSC_0449.jpg";
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
import dsc0734 from "@/assets/DSC_0734.jpg";
import dsc0753 from "@/assets/DSC_0753.jpg";

export type GalleryPhoto = {
  src: StaticImageData;
  caption: string;
  category: "dominion" | "highlights";
};

export const dominionPhotos: GalleryPhoto[] = [
  { src: dsc0121, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0398, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0410, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0435, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0447, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0449, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0467, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0473, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0505, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0507, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0511, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0532, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0534, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0536, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0537, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0552, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0555, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0556, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0558, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0564, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0596, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0597, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0613, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0713, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0734, caption: "Dominion 2026", category: "dominion" },
  { src: dsc0753, caption: "Dominion 2026", category: "dominion" },
];

export const dominionImagesOnly: StaticImageData[] = dominionPhotos.map((p) => p.src);
