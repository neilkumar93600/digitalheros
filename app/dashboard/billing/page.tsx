"use client";

import { motion } from "framer-motion";
import { CreditCard, Shield, Zap, Receipt, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-[#f2f2f2] font-instrument-serif italic">Billing & Subscription</h2>
        <p className="text-[#8b949e]">Manage your payment methods and subscription plan.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl">
          <CardHeader>
            <div className="flex justify-between items-start">
               <div>
                  <CardTitle className="text-[#f2f2f2] text-xl">Current Plan</CardTitle>
                  <CardDescription className="text-[#8b949e]">You are currently on the Pro Member plan.</CardDescription>
               </div>
               <Badge className="bg-[#00d992]/10 text-[#00d992] border-[#00d992]/20 px-4 py-1.5 rounded-full font-black tracking-widest text-[10px] uppercase">
                 ACTIVE
               </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end gap-2">
              <span className="text-5xl font-black text-[#f2f2f2]">£19.99</span>
              <span className="text-[#8b949e] mb-2">/ month</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
               {[
                 "Unlimited Score Submissions",
                 "2.5x Draw Multiplier",
                 "Priority Charity Selection",
                 "Exclusive Pro Draw Access",
                 "Detailed Performance Insights",
                 "Zero Commission on Wins"
               ].map((feature) => (
                 <div key={feature} className="flex items-center gap-3 text-sm text-[#f2f2f2]">
                    <CheckCircle2 size={16} className="text-[#00d992] shrink-0" />
                    {feature}
                 </div>
               ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#3d3a39]/20 pt-6 flex gap-4">
            <Button className="bg-[#1a1a1a] text-[#f2f2f2] border border-[#3d3a39] hover:bg-[#252525] rounded-full px-6">
              Change Plan
            </Button>
            <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-400/5">
              Cancel Subscription
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-[#f2f2f2]">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="p-4 rounded-xl bg-[#050507]/50 border border-[#3d3a39]/20 flex items-center justify-between group cursor-pointer hover:border-[#00d992]/30 transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-8 bg-[#1a1a1a] rounded border border-[#3d3a39] flex items-center justify-center">
                      <CreditCard size={16} className="text-[#8b949e]" />
                   </div>
                   <div>
                      <p className="text-sm font-bold text-[#f2f2f2]">•••• 4242</p>
                      <p className="text-xs text-[#8b949e]">Expires 12/28</p>
                   </div>
                </div>
                <ArrowUpRight size={16} className="text-[#3d3a39] group-hover:text-[#00d992] transition-colors" />
             </div>
             
             <Button variant="outline" className="w-full border-[#3d3a39] text-[#8b949e] hover:text-[#f2f2f2] hover:border-[#00d992] rounded-full">
               Update Method
             </Button>
             
             <div className="pt-6 border-t border-[#3d3a39]/20">
                <h4 className="text-sm font-bold text-[#f2f2f2] mb-4">Recent Invoices</h4>
                <div className="space-y-3">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between text-sm group cursor-pointer">
                         <span className="text-[#8b949e] group-hover:text-[#f2f2f2] transition-colors">April {20 - i * 30}, 2026</span>
                         <span className="text-[#f2f2f2] font-mono">£19.99</span>
                         <Receipt size={14} className="text-[#3d3a39] group-hover:text-[#00d992]" />
                      </div>
                   ))}
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
