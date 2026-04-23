import React from "react";
import Navbar from "@/components/public/Navbar";
import Link from "next/link";
import { ArrowRight, Target, Users, Shield, Heart } from "lucide-react";

export const metadata = {
  title: "About Us | Digital Heroes",
  description: "Learn about the mission behind Digital Heroes and how we are changing charitable giving through golf.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#050507] text-[#f2f2f2] min-h-screen font-system-ui selection:bg-[#00d992]/30 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Our <span className="text-[#00d992]">Mission</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8b949e] max-w-2xl mx-auto">
              We believe in combining the passion for golf with the power of giving back. Digital Heroes was built to make charitable contributions engaging, transparent, and rewarding.
            </p>
          </div>

          <div className="space-y-24">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Why We Started</h2>
                <p className="text-[#8b949e] leading-relaxed text-lg">
                  Traditional charity models often struggle with continuous engagement. We realized that by tying contributions to something people already love doing—playing golf—we could create a sustainable ecosystem of giving.
                </p>
                <p className="text-[#8b949e] leading-relaxed text-lg">
                  Digital Heroes transforms every round into an opportunity to support meaningful causes, while adding an exciting competitive element through our monthly prize draws.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#101010] border border-[#3d3a39] p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#00d992]/10 flex items-center justify-center text-[#00d992]">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">Mission Driven</div>
                    <div className="text-sm text-[#8b949e]">Focused on impact</div>
                  </div>
                </div>
                <div className="bg-[#101010] border border-[#3d3a39] p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 mt-8">
                  <div className="w-12 h-12 rounded-full bg-[#00d992]/10 flex items-center justify-center text-[#00d992]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">Community</div>
                    <div className="text-sm text-[#8b949e]">Built for golfers</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#101010] border border-[#3d3a39] rounded-3xl p-8 md:p-12 text-center">
              <Shield className="w-12 h-12 text-[#00d992] mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">Transparency First</h2>
              <p className="text-[#8b949e] text-lg max-w-2xl mx-auto mb-8">
                We are committed to absolute transparency. Every subscription, every charity contribution, and every prize pool distribution is clear and visible. You always know exactly where your money is going.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-[#0a0a0c] border border-[#3d3a39] p-6 rounded-2xl">
                  <div className="text-2xl font-bold text-[#f2f2f2] mb-2">Min. 10%</div>
                  <div className="text-[#8b949e]">Guaranteed to charity from every subscription</div>
                </div>
                <div className="bg-[#0a0a0c] border border-[#3d3a39] p-6 rounded-2xl">
                  <div className="text-2xl font-bold text-[#f2f2f2] mb-2">50%</div>
                  <div className="text-[#8b949e]">Allocated to the monthly prize pool</div>
                </div>
                <div className="bg-[#0a0a0c] border border-[#3d3a39] p-6 rounded-2xl">
                  <div className="text-2xl font-bold text-[#f2f2f2] mb-2">100%</div>
                  <div className="text-[#8b949e]">Commitment to verified winners and causes</div>
                </div>
              </div>
            </section>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Be Part of the Story</h2>
              <Link 
                href="/signup"
                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-[#00d992] text-[#050507] text-lg font-bold hover:bg-[#00ffaa] hover:scale-105 transition-all duration-200"
              >
                Become a Hero
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
