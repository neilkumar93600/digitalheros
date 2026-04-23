import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00d992]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101010] border border-[#3d3a39] text-sm text-[#8b949e] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00d992] animate-pulse" />
          Join the next draw on {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString('en-US', { month: 'long' })} 1st
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-system-ui text-[#f2f2f2] tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Win the Jackpot.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d992] to-emerald-400">
            Fund the Future.
          </span>
        </h1>
        
        <p className="text-xl text-[#8b949e] max-w-2xl mx-auto mb-10 leading-relaxed">
          Digital Heroes is the monthly lottery where 50% of your subscription goes to a charity of your choice, and the other 50% goes into the community prize pool. 
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="h-14 px-8 text-lg bg-[#00d992] text-[#050507] hover:bg-[#00d992]/90 w-full sm:w-auto">
              Become a Hero
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-[#3d3a39] text-[#f2f2f2] hover:bg-[#101010] w-full sm:w-auto">
              How It Works
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 pt-10 border-t border-[#3d3a39]/50">
          <div>
            <div className="text-3xl font-bold text-[#f2f2f2] mb-1">$500K+</div>
            <div className="text-sm text-[#8b949e]">Donated to Charity</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#f2f2f2] mb-1">10,000+</div>
            <div className="text-sm text-[#8b949e]">Active Heroes</div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-3xl font-bold text-[#00d992] mb-1">$2M+</div>
            <div className="text-sm text-[#8b949e]">Given in Prizes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
