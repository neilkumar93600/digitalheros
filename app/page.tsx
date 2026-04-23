'use client';

import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { StartSection } from '@/components/landing/StartSection';
import { FeaturesChess } from '@/components/landing/FeaturesChess';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { Stats } from '@/components/landing/Stats';
import { Testimonials } from '@/components/landing/Testimonials';
import { CtaFooter } from '@/components/landing/CtaFooter';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-black text-foreground selection:bg-white selection:text-black">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none noise-overlay opacity-[0.03] z-[60]" />
      
      <Navbar />
      
      <div className="relative z-10">
        <div id="home">
          <Hero />
        </div>

        <div id="process">
          <StartSection />
        </div>

        <div id="services">
          <FeaturesChess />
          <FeaturesGrid />
        </div>

        <div id="leaderboard">
          <Stats />
        </div>

        <div id="work">
          <Testimonials />
        </div>

        <div id="charities">
          <CtaFooter />
        </div>
      </div>
      
      {/* Background radial glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </main>
  );
}
