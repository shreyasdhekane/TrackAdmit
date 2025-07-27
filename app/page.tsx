"use client";

import HeroSection from "@/components/hero-section";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function page() {
  return (
    <div className="relative h-screen ">
      <ParticlesBackground />
      <HeroSection />
    </div>
  );
}
