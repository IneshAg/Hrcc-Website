# HackerRank Campus Crew (HRCC) - Website Upgrade

## Overview of Upgrades
This repository has been upgraded with:
1. **Interactive 3D HRCC Hero Logo**:
   - Built with **Three.js**, **@react-three/fiber**, and **@react-three/drei**.
   - Extruded 3D bevel text (`Text3D`) styled in metallic emerald (`#05C770`, `metalness: 0.85`, `roughness: 0.12`).
   - Interactive pointer tilt tracking (lerped mouse/touch response up to ±20°).
   - Idle floating animation with gentle sine oscillation.
   - Dynamic SSR-safe import with instant fallback in `HeroSection.tsx`.
   - Scroll-driven transforms (scale, fade, translate) via Framer Motion springs (`useScroll`, `useTransform`, `useSpring`).
   - Adaptive performance scaling (DPR clamping and mobile power optimization).

2. **Scroll-Driven Animation Architecture**:
   - Reusable scroll reveal primitives in `src/components/RevealComponents.tsx` (`RevealSection`, `RevealItem`, `RevealCard`).
   - Smooth scrolling powered by **Lenis** (`src/components/SmoothScroll.tsx`).
   - Section reveal animations integrated across `DomainsSection`, `CentreOfExcellence`, and `OurWork`.
   - Modern CSS scroll-reveal utility classes in `src/app/globals.css`.

---

## File Structure & Key Additions

- [`src/components/HRCCLogo3D.tsx`](./src/components/HRCCLogo3D.tsx) - 3D Three.js/R3F Canvas component with pointer tracking, float dynamics, and scroll scaling.
- [`src/components/RevealComponents.tsx`](./src/components/RevealComponents.tsx) - Reusable Framer Motion components for staggered scroll-triggered reveals.
- [`src/components/HeroSection.tsx`](./src/components/HeroSection.tsx) - Updated Hero with 3D canvas integration, radial background glow, word stagger, and social links.
- [`src/components/DomainsSection.tsx`](./src/components/DomainsSection.tsx) - Updated domains showcase wrapped with `RevealSection` and `RevealItem`.
- [`src/app/globals.css`](./src/app/globals.css) - Scroll reveal utilities and 3D canvas styling.
- [`public/fonts/hrcc_bold.json`](./public/fonts/hrcc_bold.json) - 3D typeface font file used for extruding the logo mesh.

---

## How to Run

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live site.

### Build for Production
```bash
npm run build
```
Production build compiles without errors or warnings.
