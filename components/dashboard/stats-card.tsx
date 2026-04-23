"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Trophy, Activity, Heart, Sparkles } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/contexts/auth-context";

interface StatsCardProps {
  refreshTrigger?: number;
}

export function StatsCard({ refreshTrigger = 0 }: StatsCardProps) {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    avgScore: 0,
    totalRounds: 0,
    bestScore: 0,
    drawEntries: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const supabase = getSupabaseClient();
      
      const { data: scores } = await supabase
        .from("scores")
        .select("score_value")
        .eq("user_id", user.id);

      const totalRounds = scores?.length || 0;
      const avgScore = totalRounds > 0 
        ? Math.round(scores.reduce((acc, curr) => acc + curr.score_value, 0) / totalRounds) 
        : 0;
      const bestScore = totalRounds > 0 
        ? Math.min(...scores.map(s => s.score_value))
        : 0;

      const { count: entriesCount } = await supabase
        .from("draw_entries")
        .select("*", { count: 'exact', head: true })
        .eq("user_id", user.id);

      setStats({
        avgScore,
        totalRounds,
        bestScore,
        drawEntries: entriesCount || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats, refreshTrigger]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00d992]/20 to-[#00ffaa]/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
      
      <Card className="bg-[#101010]/40 backdrop-blur-2xl border-[#3d3a39]/50 rounded-[2.5rem] overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <TrendingUp size={120} className="text-[#00d992]" />
        </div>

        <CardHeader className="pb-2 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00d992]/10 border border-[#00d992]/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#00d992]" />
              </div>
              <CardTitle className="text-xl font-instrument-serif text-[#f2f2f2]">Performance Matrix</CardTitle>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#00d992]/10 border border-[#00d992]/20">
               <span className="w-1.5 h-1.5 rounded-full bg-[#00d992] animate-pulse" />
               <span className="text-[10px] font-black text-[#00d992] uppercase tracking-tighter">Live Sync</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 relative z-10">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-48"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-[#00d992]/20 border-t-[#00d992] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity size={12} className="text-[#00d992] animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-10"
              >
                {/* Main Stat */}
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-[#8b949e] uppercase font-black tracking-[0.2em]">Average Score</p>
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-7xl font-bold text-[#f2f2f2] tracking-tighter">
                        {stats.avgScore > 0 ? stats.avgScore : '--'}
                      </h2>
                      {stats.avgScore > 0 && (
                        <div className="flex items-center text-[#00d992] text-sm font-bold bg-[#00d992]/10 px-2 py-0.5 rounded-lg border border-[#00d992]/20">
                          <TrendingUp size={14} className="mr-1" />
                          Top 15%
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Micro Sparkline */}
                  <div className="h-16 w-32 pb-2">
                    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d="M0 35 Q 25 35, 50 20 T 100 5"
                        fill="none"
                        stroke="#00d992"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(0,217,146,0.5)]"
                      />
                      <motion.circle 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        cx="100" cy="5" r="4" fill="#00d992" className="animate-pulse" 
                      />
                    </svg>
                  </div>
                </div>

                {/* Secondary Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-5 rounded-3xl bg-[#050507]/60 border border-[#3d3a39]/50 group/item hover:border-[#00d992]/30 transition-all">
                    <p className="text-[10px] text-[#8b949e] uppercase font-black tracking-widest mb-2">Total Rounds</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-[#f2f2f2]">{stats.totalRounds}</span>
                      <Activity size={20} className="text-[#8b949e] group-hover/item:text-[#00d992] transition-colors" />
                    </div>
                  </div>
                  <div className="p-5 rounded-3xl bg-[#050507]/60 border border-[#3d3a39]/50 group/item hover:border-[#00d992]/30 transition-all">
                    <p className="text-[10px] text-[#8b949e] uppercase font-black tracking-widest mb-2">Best Round</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-[#f2f2f2]">
                        {stats.bestScore > 0 ? stats.bestScore : '--'}
                      </span>
                      <Sparkles size={20} className="text-[#8b949e] group-hover/item:text-[#00d992] transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Impact Footer */}
                <div className="pt-6 border-t border-[#3d3a39]/30">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#00d992]/10 to-transparent border-l-4 border-[#00d992]">
                    <div>
                      <p className="text-[10px] text-[#00d992] uppercase font-black tracking-widest">Charity Impact</p>
                      <p className="text-sm text-[#f2f2f2] font-medium mt-1">
                        You've contributed to <span className="text-[#00d992] font-bold">128 meals</span> this month
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#00d992]/20 flex items-center justify-center">
                      <Heart size={14} className="text-[#00d992]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
