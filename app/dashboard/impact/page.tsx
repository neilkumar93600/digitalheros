"use client";

import { motion } from "framer-motion";
import { History, TrendingUp, Heart, Trophy, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ImpactPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-[#f2f2f2] font-instrument-serif italic">Impact History</h2>
        <p className="text-[#8b949e]">See the difference your play has made for your chosen causes.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e] uppercase tracking-wider">Total Donated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00d992]">£1,450.20</div>
            <p className="text-xs text-[#8b949e] mt-1 flex items-center gap-1">
              <TrendingUp size={12} className="text-[#00d992]" /> +£120.50 this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e] uppercase tracking-wider">Draw Wins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#f2f2f2]">3 Wins</div>
            <p className="text-xs text-[#8b949e] mt-1">Across 42 entries</p>
          </CardContent>
        </Card>

        <Card className="bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e] uppercase tracking-wider">Lives Affected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#f2f2f2]">12</div>
            <p className="text-xs text-[#8b949e] mt-1">Estimated direct impact</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[#f2f2f2]">Contribution Timeline</CardTitle>
            <CardDescription className="text-[#8b949e]">Detailed breakdown of your charitable contributions from draw winnings.</CardDescription>
          </div>
          <Button variant="outline" className="border-[#3d3a39] text-[#8b949e] hover:text-[#f2f2f2] rounded-full">
            <Download size={16} className="mr-2" /> Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#3d3a39]/30">
            {[
              { date: "April 15, 2026", event: "Weekly Draw #42 Contribution", amount: "£45.00", charity: "Junior Golf Development", type: "win" },
              { date: "April 08, 2026", event: "Weekly Draw #41 Contribution", amount: "£32.00", charity: "Junior Golf Development", type: "win" },
              { date: "April 01, 2026", event: "Monthly Member Donation", amount: "£10.00", charity: "Junior Golf Development", type: "direct" },
              { date: "March 25, 2026", event: "Weekly Draw #39 Contribution", amount: "£120.00", charity: "Green Courses Initiative", type: "win" },
            ].map((item, i) => (
              <div key={i} className="relative pl-10 group">
                <div className={`absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center border-4 border-[#050507] transition-all duration-300 ${item.type === 'win' ? 'bg-[#00d992] text-[#050507]' : 'bg-[#3d3a39] text-[#f2f2f2]'}`}>
                  {item.type === 'win' ? <Trophy size={14} /> : <Heart size={14} />}
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 rounded-2xl bg-[#050507]/30 border border-[#3d3a39]/20 group-hover:border-[#00d992]/20 transition-all">
                  <div>
                    <p className="text-xs text-[#8b949e] font-mono uppercase tracking-widest">{item.date}</p>
                    <h4 className="text-lg font-bold text-[#f2f2f2] mt-1">{item.event}</h4>
                    <p className="text-sm text-[#8b949e] mt-1 flex items-center gap-2">
                       Supporting: <span className="text-[#00d992] font-medium">{item.charity}</span>
                    </p>
                  </div>
                  <div className="text-2xl font-black text-[#f2f2f2]">
                    {item.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
