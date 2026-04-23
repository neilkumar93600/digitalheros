import React from "react";
import Navbar from "@/components/public/Navbar";
import HowItWorksComponent from "@/components/public/HowItWorks";
import Link from "next/link";
import { ArrowRight, Trophy, Heart, Coins } from "lucide-react";

export const metadata = {
  title: "How It Works | Digital Heroes",
  description: "Learn how the Digital Heroes platform works: play golf, enter scores, support charities, and win monthly prizes.",
};

export default function HowItWorksPage() {
  return (
    <main className="bg-[#050507] text-[#f2f2f2] min-h-screen font-system-ui selection:bg-[#00d992]/30 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              How It <span className="text-[#00d992]">Works</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8b949e] max-w-2xl mx-auto">
              A simple, transparent process that turns your everyday golf rounds into charitable contributions and exciting prize opportunities.
            </p>
          </div>

          <HowItWorksComponent />

          <div className="mt-24 space-y-24">
            <section className="bg-[#101010] border border-[#3d3a39] rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#00d992]/10 text-[#00d992] mb-4">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">The Score Entry System</h2>
                  <p className="text-[#8b949e] leading-relaxed text-lg">
                    We use a rolling 5-score system. You enter your Stableford scores (1-45) from your recent rounds. 
                    Your active entries in the monthly draw are directly tied to these 5 scores. When you play a new round and enter a 6th score, 
                    your oldest score is automatically replaced.
                  </p>
                </div>
                <div className="flex-1 w-full bg-[#0a0a0c] rounded-2xl border border-[#3d3a39] p-6">
                  <div className="space-y-4">
                    {[38, 42, 35, 40, 39].map((score, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#1a1a1c] border border-[#3d3a39]">
                        <span className="text-[#8b949e] font-medium">Round {i + 1}</span>
                        <span className="text-2xl font-bold text-[#00d992]">{score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#101010] border border-[#3d3a39] rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#00d992]/10 text-[#00d992] mb-4">
                    <Coins className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Prize Pool Distribution</h2>
                  <p className="text-[#8b949e] leading-relaxed text-lg">
                    Every month, 50% of all subscription revenue goes directly into the prize pool. The pool is then split across three winning tiers based on how many of your score entries match the drawn numbers.
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#1a1a1c] border border-[#3d3a39] flex items-center justify-center font-bold text-[#00d992]">5</div>
                      <div>
                        <div className="font-bold text-[#f2f2f2]">Matches (Jackpot)</div>
                        <div className="text-sm text-[#8b949e]">40% of the prize pool. Rolls over if not won.</div>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#1a1a1c] border border-[#3d3a39] flex items-center justify-center font-bold text-[#f2f2f2]">4</div>
                      <div>
                        <div className="font-bold text-[#f2f2f2]">Matches</div>
                        <div className="text-sm text-[#8b949e]">35% of the prize pool, shared among winners.</div>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#1a1a1c] border border-[#3d3a39] flex items-center justify-center font-bold text-[#8b949e]">3</div>
                      <div>
                        <div className="font-bold text-[#f2f2f2]">Matches</div>
                        <div className="text-sm text-[#8b949e]">25% of the prize pool, shared among winners.</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to become a Digital Hero?</h2>
              <Link 
                href="/signup"
                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-[#00d992] text-[#050507] text-lg font-bold hover:bg-[#00ffaa] hover:scale-105 transition-all duration-200"
              >
                Join Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-[#3d3a39] bg-[#0a0a0c] py-12 md:py-16 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="border-t border-[#3d3a39] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#8b949e] text-sm">
              &copy; {new Date().getFullYear()} Digital Heroes. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#8b949e]">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-[#fb565b] fill-current" />
              <span>for golfers and charities</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
