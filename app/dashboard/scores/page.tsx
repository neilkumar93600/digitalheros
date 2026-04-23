"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Target, Plus, Search, Filter, ArrowUpRight, ArrowDownRight, MoreHorizontal, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/contexts/auth-context";
import { getSupabaseClient } from "@/lib/supabase/client";

interface Score {
  id: string;
  score_value: number;
  score_date: string;
}

export default function ScoresPage() {
  const { user } = useAuth();
  const [scores, setScores] = useState<Score[]>([]);
  const [stats, setStats] = useState({
    bestScore: 0,
    average: 0,
    totalRounds: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchScores = useCallback(async () => {
    if (!user) return;
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("scores")
        .select("id, score_value, score_date")
        .eq("user_id", user.id)
        .order("score_date", { ascending: false });

      if (error) throw error;
      
      const loadedScores = data || [];
      setScores(loadedScores);

      if (loadedScores.length > 0) {
        const total = loadedScores.length;
        const best = Math.min(...loadedScores.map(s => s.score_value));
        const avg = loadedScores.reduce((acc, curr) => acc + curr.score_value, 0) / total;
        
        setStats({
          bestScore: best,
          average: Number(avg.toFixed(1)),
          totalRounds: total
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  const statCards = [
    { title: "Best Score", value: stats.bestScore > 0 ? stats.bestScore : "--", sub: "All time", icon: Target, trend: "up" },
    { title: "Average", value: stats.average > 0 ? stats.average : "--", sub: "Rolling", icon: Filter, trend: "up" },
    { title: "Total Rounds", value: stats.totalRounds, sub: "All time", icon: Search, trend: "stable" },
    { title: "Handicap", value: "Pending", sub: "Official index", icon: ArrowUpRight, trend: "down" },
  ];

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#f2f2f2] font-instrument-serif italic">My Scores</h2>
          <p className="text-[#8b949e]">Manage your golf performance and track your rolling average.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-[#00d992] text-[#050507] hover:bg-[#00ffaa] rounded-full px-6 font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,217,146,0.2)]">
            <Plus className="mr-2 h-4 w-4" /> Add New Score
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl group hover:border-[#00d992]/30 transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#8b949e] uppercase tracking-wider">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-[#00d992] group-hover:scale-110 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#f2f2f2]">{stat.value}</div>
                <p className="text-xs text-[#8b949e] flex items-center gap-1 mt-1">
                  {stat.trend === "up" && <ArrowUpRight className="w-3 h-3 text-[#00d992]" />}
                  {stat.trend === "down" && <ArrowDownRight className="w-3 h-3 text-red-400" />}
                  {stat.sub}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-[#f2f2f2]">Recent Scores</CardTitle>
          <CardDescription className="text-[#8b949e]">Your rounds used for upcoming draws.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Activity className="animate-spin text-[#00d992] h-8 w-8" />
            </div>
          ) : scores.length === 0 ? (
            <div className="text-center py-10 text-[#8b949e]">
              No scores recorded yet. Time to hit the course!
            </div>
          ) : (
            <div className="space-y-4">
              {scores.map((score, i) => (
                <div key={score.id} className="flex items-center justify-between p-4 rounded-xl bg-[#050507]/50 border border-[#3d3a39]/20 hover:border-[#00d992]/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#00d992] font-bold text-lg group-hover:bg-[#00d992] group-hover:text-[#050507] transition-all">
                      {score.score_value}
                    </div>
                    <div>
                      <p className="font-semibold text-[#f2f2f2]">Round {scores.length - i}</p>
                      <p className="text-sm text-[#8b949e]">
                        {new Date(score.score_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="border-[#00d992]/30 text-[#00d992] bg-[#00d992]/5">
                      Verified
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-[#8b949e] hover:text-[#f2f2f2]">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
