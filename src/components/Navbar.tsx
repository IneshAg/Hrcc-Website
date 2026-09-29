"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/nobglogo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Domains", href: "#domains" },
  { label: "Team", href: "#team" },
  { label: "Events", href: "#events" },
  { label: "Work", href: "#our-work" },
  { label: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastY.current || currentY < 60);
      lastY.current = currentY;

      if (!isHome) return;

      const ids = navLinks
        .filter((l) => l.href.startsWith("#"))
        .map((l) => l.href.replace("#", ""));
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
  }, [isHome]);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -90, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex fixed top-5 left-6 right-6 max-w-6xl mx-auto z-50 pointer-events-auto"
      >
        <nav
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-full"
          style={{
            background: "rgba(14, 14, 14, 0.88)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Brand Left */}
          <Link href={isHome ? "#home" : "/"} className="flex items-center gap-3 pl-2 group">
            <div className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center p-1 shrink-0 group-hover:border-[#05C770] transition-colors">
              <Image src={logo} alt="HRCC Logo" width={22} height={22} className="object-contain" />
            </div>
            <span className="font-extrabold text-white text-base tracking-wider group-hover:text-[#05C770] transition-colors">
              HRCC
            </span>
          </Link>

          {/* Center Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const destination = isHome || link.href.startsWith("/") ? link.href : `/${link.href}`;
              const isRoute = destination.startsWith("/");
              const id = link.href.startsWith("/") ? link.href : link.href.replace("#", "");
              const isActive = link.href.startsWith("/") ? false : active === id;
              const isHovered = hovered === id;

              let bg = "transparent";
              let color = "rgba(255,255,255,0.55)";
              if (isActive) { bg = "rgba(255,255,255,0.97)"; color = "#0a0a12"; }
              else if (isHovered) { bg = "rgba(255,255,255,0.10)"; color = "#fff"; }

              const linkStyle = {
                background: bg,
                color,
                fontWeight: isActive ? 600 : 400,
                boxShadow: isActive ? "0 1px 12px rgba(255,255,255,0.10)" : "none",
              } as const;
              const linkClassName =
                "inline-flex items-center px-4 py-2 rounded-full text-[13px] tracking-wide transition-all duration-200";

              if (isRoute) {
                return (
                  <Link
                    key={id}
                    href={destination}
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                    className={linkClassName}
                    style={linkStyle}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <a
                  key={id}
                  href={link.href}
                  onClick={() => setActive(id)}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  className={linkClassName}
                  style={linkStyle}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right CTA */}
          <div className="pr-1">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hrccsrm@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered("contact")}
              onMouseLeave={() => setHovered(null)}
              className="inline-flex items-center px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-200"
              style={{
                background: "#05C770",
                color: "#fff",
                opacity: hovered === "contact" ? 0.9 : 1,
                boxShadow:
                  hovered === "contact"
                    ? "0 0 0 1px rgba(5,199,112,0.6), 0 4px 18px rgba(5,199,112,0.4)"
                    : "0 0 0 1px rgba(5,199,112,0.35), 0 2px 10px rgba(5,199,112,0.2)",
              }}
            >
              Contact Us
            </a>
          </div>
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
          className="flex items-center justify-between px-4 py-2.5 rounded-full"
          style={{
            background: "rgba(14, 14, 14, 0.88)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Brand Left */}
          <Link href={isHome ? "#home" : "/"} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center p-1 shrink-0">
              <Image src={logo} alt="HRCC Logo" width={20} height={20} className="object-contain" />
            </div>
            <span className="font-extrabold text-white text-base tracking-wider">
              HRCC
            </span>
          </Link>

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
                const destination = isHome || link.href.startsWith("/") ? link.href : `/${link.href}`;
                const isRoute = destination.startsWith("/");
                const id = link.href.startsWith("/") ? link.href : link.href.replace("#", "");
                const isActive = link.href.startsWith("/") ? false : active === id;

                const itemStyle = {
                  background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                  fontWeight: isActive ? 500 : 400,
                } as const;
                const itemClassName = "block px-4 py-3 rounded-xl text-white transition-all duration-200";

                if (isRoute) {
                  return (
                    <Link
                      key={id}
                      href={destination}
                      onClick={() => setMobileMenuOpen(false)}
                      className={itemClassName}
                      style={itemStyle}
                    >
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <a
                    key={id}
                    href={link.href}
                    onClick={() => {
                      setActive(id);
                      setMobileMenuOpen(false);
                    }}
                    className={itemClassName}
                    style={itemStyle}
                  >
                    {link.label}
                  </a>
                );
              })}
              
              {/* Mobile CTA */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hrccsrm@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
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
