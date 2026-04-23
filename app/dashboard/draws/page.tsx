"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, Users, Zap, Clock, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/contexts/auth-context";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function DrawsPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    prizePool: 0,
    participants: 0,
    avgScore: 0,
    tier: "NONE",
    isQualified: false,
    isLoading: true
  });

  const fetchDrawData = useCallback(async () => {
    if (!user) return;
    try {
      const supabase = getSupabaseClient();
      
      const { count } = await supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");
        
      const participants = count || 0;
      const prizePool = participants * 5;
      
      const { data: scores } = await supabase
        .from("scores")
        .select("score_value")
        .eq("user_id", user.id)
        .order("score_date", { ascending: false })
        .limit(5);
        
      let avgScore = 0;
      if (scores && scores.length > 0) {
        avgScore = scores.reduce((acc: number, curr: any) => acc + curr.score_value, 0) / scores.length;
      }
      
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle();
        
      const tier = sub ? "PRO" : "NONE";
      const isQualified = !!sub && scores && scores.length >= 1;
      
      setStats({
        prizePool,
        participants,
        avgScore: Number(avgScore.toFixed(1)),
        tier,
        isQualified,
        isLoading: false
      });
      
    } catch (error) {
      console.error(error);
      setStats(prev => ({ ...prev, isLoading: false }));
    }
  }, [user]);

  useEffect(() => {
    fetchDrawData();
  }, [fetchDrawData]);

  // Next Friday draw date
  const nextDrawDate = new Date();
  nextDrawDate.setDate(nextDrawDate.getDate() + ((5 + 7 - nextDrawDate.getDay()) % 7 || 7));
  const drawDateString = nextDrawDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#f2f2f2] font-instrument-serif italic">Weekly Draws</h2>
          <p className="text-[#8b949e]">Check your eligibility and view upcoming prize announcements.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-[#00d992]/10 text-[#00d992] border-[#00d992]/20 px-3 py-1 rounded-full font-bold">
            <Zap className="w-3 h-3 mr-2 animate-pulse" /> Next Draw: Active
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 bg-gradient-to-br from-[#101010] to-[#050507] border-[#3d3a39]/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy size={160} className="text-[#00d992]" />
          </div>
          <CardHeader>
            <CardTitle className="text-[#f2f2f2] text-2xl flex items-center gap-2">
              <Trophy className="text-[#00d992]" /> Grand Prize Pool
            </CardTitle>
            <CardDescription className="text-[#8b949e]">The current accumulated prize for this week's winners.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-6xl font-black text-[#f2f2f2] tracking-tighter">
              ${stats.prizePool.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00d992]/5 border border-[#00d992]/20">
                  <Users size={16} className="text-[#00d992]" />
                  <span className="text-sm font-medium text-[#f2f2f2]">{stats.participants.toLocaleString()} Participants</span>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3d3a39]/10 border border-[#3d3a39]/20">
                  <Calendar size={16} className="text-[#8b949e]" />
                  <span className="text-sm font-medium text-[#f2f2f2]">Draw Date: {drawDateString}</span>
               </div>
            </div>
            <Button className="w-full md:w-auto bg-[#00d992] text-[#050507] hover:bg-[#00ffaa] rounded-full px-8 h-12 font-bold transition-all">
              View Eligibility Details
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-[#f2f2f2]">Your Entry Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`p-4 rounded-xl border flex items-center justify-between ${stats.isQualified ? 'bg-[#00d992]/10 border-[#00d992]/20' : 'bg-orange-500/10 border-orange-500/20'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[#050507] ${stats.isQualified ? 'bg-[#00d992]' : 'bg-orange-500'}`}>
                  {stats.isQualified ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                </div>
                <span className={`text-sm font-bold ${stats.isQualified ? 'text-[#00d992]' : 'text-orange-500'}`}>
                  {stats.isQualified ? 'QUALIFIED' : 'PENDING'}
                </span>
              </div>
              <span className="text-xs text-[#8b949e]">
                {stats.isQualified ? 'Scores Verified' : 'Needs Verification'}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#8b949e]">Recent Avg Score</span>
                <span className="text-[#f2f2f2] font-bold">{stats.avgScore > 0 ? stats.avgScore : '--'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#8b949e]">Subscription Tier</span>
                <span className={stats.tier === 'PRO' ? "text-[#00d992] font-bold" : "text-[#f2f2f2] font-bold"}>{stats.tier}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#8b949e]">Draw Multiplier</span>
                <span className="text-[#f2f2f2] font-bold">{stats.tier === 'PRO' ? '2.5x' : '1.0x'}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-[#3d3a39]/30">
               <p className="text-[10px] text-[#8b949e] leading-relaxed">
                  You are automatically entered into the draw based on your active PRO subscription and recent score submissions.
               </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
