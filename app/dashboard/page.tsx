"use client"

import { useEffect, useState } from "react"
import { ScoreEntryForm } from "@/components/dashboard/score-entry-form"
import { ScoreHistory } from "@/components/dashboard/score-history"
import { CharityManager } from "@/components/dashboard/charity-manager"
import { StatsCard } from "@/components/dashboard/stats-card"
import { SubscriptionManager } from "@/components/dashboard/subscription-manager"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Trophy, Target } from "lucide-react"

export default function DashboardPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const [activeHeroes, setActiveHeroes] = useState<number>(0)
  const [prizePool, setPrizePool] = useState<number>(0)

  const handleScoreAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        const { getSupabaseClient } = await import("@/lib/supabase/client");
        const supabase = getSupabaseClient();
        const { count } = await supabase
          .from("subscriptions")
          .select("*", { count: "exact", head: true })
          .eq("status", "active");

        const heroesCount = count || 0;
        setActiveHeroes(heroesCount);
        setPrizePool(heroesCount * 5); // $5 per active subscriber goes to pool
      } catch (error) {
        console.error("Error fetching global stats:", error);
      }
    };
    fetchGlobalStats();
  }, []);

  return (
    <main className="flex-1 p-6 md:p-10 lg:p-16">
      <div className="mx-auto max-w-[1400px] space-y-16">
        {/* Cinematic Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group relative"
        >
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00d992]/20 bg-[#00d992]/10 px-3 py-1 backdrop-blur-md">
                <Sparkles size={14} className="text-[#00d992]" />
                <span className="text-[10px] font-black tracking-[0.25em] text-[#00d992] uppercase">
                  Hero Protocol Active
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="font-instrument-serif text-6xl leading-[0.9] tracking-tight text-[#f2f2f2] md:text-7xl lg:text-8xl">
                  Keep{" "}
                  <span className="text-[#00d992] italic">Pushing</span>
                  , <br />
                  Hero.
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed font-light text-[#8b949e] md:text-xl">
                  Your journey to the{" "}
                  <span className="font-medium text-[#f2f2f2]">
                    Weekly Master's Draw
                  </span>{" "}
                  is evolving. Track your progress, impact lives, and
                  claim your legend.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#050507] bg-[#1a1a1a]"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`}
                        alt="User"
                      />
                    </div>
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#050507] bg-[#00d992] text-xs font-bold text-[#050507]">
                    +{activeHeroes > 4 ? activeHeroes - 4 : 0}
                  </div>
                </div>
                <p className="text-sm text-[#8b949e]">
                  <span className="font-bold text-[#f2f2f2]">
                    {activeHeroes.toLocaleString()} Heroes
                  </span>{" "}
                  active this week
                </p>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative shrink-0"
            >
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-[#00d992]/20 to-[#00ffaa]/20 opacity-50 blur-2xl transition duration-700 group-hover:opacity-100" />
              <div className="relative min-w-[320px] rounded-[2rem] border border-[#3d3a39]/50 bg-[#101010]/80 p-8 shadow-2xl backdrop-blur-2xl">
                <div className="mb-8 flex items-center justify-between">
                  <div className="rounded-2xl border border-[#00d992]/20 bg-[#00d992]/10 p-3">
                    <Trophy className="text-[#00d992]" size={28} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black tracking-widest text-[#8b949e] uppercase">
                      Prize Pool
                    </p>
                    <p className="text-3xl font-bold tracking-tighter text-[#f2f2f2]">
                      ${prizePool.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-end justify-between text-sm">
                    <p className="font-medium text-[#8b949e]">
                      Draw Status
                    </p>
                    <p className="font-mono font-bold text-[#f2f2f2]">
                      Active
                    </p>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full border border-[#3d3a39]/20 bg-[#3d3a39]/30 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#00d992] to-[#00ffaa] shadow-[0_0_10px_rgba(0,217,146,0.5)]"
                    />
                  </div>
                  <button className="w-full rounded-xl bg-[#00d992] py-4 text-[11px] font-black tracking-widest text-[#050507] uppercase transition-all duration-300 hover:bg-[#00ffaa] hover:shadow-[0_0_20px_rgba(0,217,146,0.3)]">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Column: Input & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10 lg:col-span-5"
          >
            <ScoreEntryForm onScoreAdded={handleScoreAdded} />
            <StatsCard refreshTrigger={refreshTrigger} />
          </motion.div>

          {/* Right Column: History & Charity */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-10 lg:col-span-7"
          >
            <ScoreHistory refreshTrigger={refreshTrigger} />

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <SubscriptionManager />
              <CharityManager />
            </div>
          </motion.div>
        </div>

        {/* Bottom Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center justify-between gap-8 border-t border-[#3d3a39]/20 pt-16 text-[10px] font-black tracking-[0.3em] text-[#8b949e]/40 uppercase md:flex-row"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 md:justify-start">
            <span className="group flex cursor-help items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00d992] shadow-[0_0_8px_#00d992]" />
              <span className="transition-colors group-hover:text-[#00d992]">
                Neural Sync Online
              </span>
            </span>
            <span className="transition-colors hover:text-[#f2f2f2]">
              Nodes: 12 Active
            </span>
            <span className="transition-colors hover:text-[#f2f2f2]">
              Latency: 14ms
            </span>
          </div>
          <div className="flex items-center gap-10">
            <span className="cursor-pointer tracking-[0.4em] transition-colors hover:text-[#f2f2f2]">
              Protocol
            </span>
            <span className="cursor-pointer tracking-[0.4em] transition-colors hover:text-[#f2f2f2]">
              Safety
            </span>
            <span className="text-[#8b949e]/20">
              © 2024 Digital Heroes
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
