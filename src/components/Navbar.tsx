"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/nobglogo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Domains", href: "#domains" },
  { label: "Team", href: "#team" },
  { label: "Events", href: "#events" },
  { label: "Work", href: "#our-work" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastY.current || currentY < 60);
      lastY.current = currentY;

      const ids = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -90, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto whitespace-nowrap"
      >
        <nav
          className="flex items-center gap-1 px-2 py-2 rounded-full"
          style={{
            background: "rgba(14, 14, 14, 0.88)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            const isHovered = hovered === id;

            let bg = "transparent";
            let color = "rgba(255,255,255,0.45)";
            if (isActive) { bg = "rgba(255,255,255,0.97)"; color = "#0a0a12"; }
            else if (isHovered) { bg = "rgba(255,255,255,0.08)"; color = "rgba(255,255,255,0.85)"; }

            return (
              <a
                key={id}
                href={link.href}
                onClick={() => setActive(id)}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                className="inline-flex items-center px-5 py-2 rounded-full text-[13px] tracking-wide transition-all duration-200"
                style={{
                  background: bg,
                  color,
                  fontWeight: isActive ? 500 : 400,
                  boxShadow: isActive ? "0 1px 12px rgba(255,255,255,0.10)" : "none",
                }}
              >
                {link.label}
              </a>
            );
          })}

          {/* Divider */}
          <div className="w-px h-5 mx-1.5 shrink-0 bg-white/10" />

          {/* CTA */}
          <a
            href="mailto:hrccsrm@gmail.com"
            onMouseEnter={() => setHovered("contact")}
            onMouseLeave={() => setHovered(null)}
            className="inline-flex items-center px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-200"
            style={{
              background: "#05C770",
              color: "#fff",
              opacity: hovered === "contact" ? 0.85 : 1,
              boxShadow:
                hovered === "contact"
                  ? "0 0 0 1px rgba(5,199,112,0.6), 0 4px 18px rgba(5,199,112,0.4)"
                  : "0 0 0 1px rgba(5,199,112,0.35), 0 2px 10px rgba(5,199,112,0.2)",
            }}
          >
            Contact Us
          </a>
        </nav>
      </motion.header>

      {/* Mobile Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -90, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="lg:hidden fixed top-4 left-4 right-4 z-50 pointer-events-auto"
      >
        <nav
          className="flex items-center justify-between px-4 py-3 rounded-full"
          style={{
            background: "rgba(14, 14, 14, 0.88)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Logo/Brand */}
          <div className="relative w-12 h-12">
            <Image
              src={logo}
              alt="HRCC Logo"
              fill
              className="object-contain"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <span className={`block h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(14, 14, 14, 0.95)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.55)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="p-2">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;

                return (
                  <a
                    key={id}
                    href={link.href}
                    onClick={() => {
                      setActive(id);
                      setMobileMenuOpen(false);
                    }}
                    className="block px-4 py-3 rounded-xl text-white transition-all duration-200"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
              
              {/* Mobile CTA */}
              <a
                href="mailto:hrccsrm@gmail.com"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-4 py-3 rounded-xl text-center font-semibold transition-all duration-200 mt-2"
                style={{
                  background: "#05C770",
                  color: "#fff",
                }}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}