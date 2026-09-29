"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import Squares from "@/components/Squares";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DomainsSection from "@/components/DomainsSection";
import CentreOfExcellence from "@/components/CentreOfExcellence";
import MeetTheCrew from "@/components/MeetTheCrew";
import UpcomingEvents from "@/components/UpcomingEvents";
import OurWork from "@/components/OurWork";
import Footer from "@/components/Footer";
import RecruitmentBadge from "@/components/RecruitmentBadge";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen text-white">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <SmoothScroll>
          {/* Squares animated background */}
          <div className="fixed inset-0 z-0">
            <Squares
              speed={0.1}
              squareSize={40}
              direction="diagonal"
              borderColor="#5b5760"
              hoverFillColor="#05C770"
            />
          </div>

          {/* Navbar */}
          <Navbar />

          {/* Persistent recruitment CTA */}
          <RecruitmentBadge />

          {/* Hero Section */}
          <HeroSection />

          {/* Domains Section */}
          <DomainsSection />

          {/* Centre of Excellence */}
          <CentreOfExcellence />

          {/* Meet the Crew */}
          <MeetTheCrew />

          {/* Upcoming Events */}
          <UpcomingEvents />

          {/* Our Work Section */}
          <OurWork />

          {/* Spacer before Footer */}
          <div className="h-32"></div>

          {/* Footer */}
          <Footer />
        </SmoothScroll>
      )}
    </main>
  );
}
