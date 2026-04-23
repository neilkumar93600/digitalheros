"use client";

import { motion } from "framer-motion";
import { Heart, Globe, Award, Sparkles, CheckCircle2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function CharityPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#f2f2f2] font-instrument-serif italic">Choose Your Charity</h2>
          <p className="text-[#8b949e]">Select the cause you want to support with your winnings and contributions.</p>
        </div>
        <div className="relative w-full md:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
           <Input 
             placeholder="Search charities..." 
             className="pl-9 bg-[#101010] border-[#3d3a39] rounded-full focus-visible:ring-[#00d992]"
           />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "Junior Golf Development", description: "Supporting young talents with equipment and training facilities across the UK.", category: "Education", img: "bg-blue-500/20", active: true },
          { name: "Green Courses Initiative", description: "Promoting environmental sustainability and biodiversity in golf course management.", category: "Environment", img: "bg-green-500/20", active: false },
          { name: "Golf for Heroes", description: "Providing rehabilitation and support for veterans through the game of golf.", category: "Support", img: "bg-red-500/20", active: false },
          { name: "Global Water Foundation", description: "Bringing clean water to communities in need around the world through sport.", category: "Global", img: "bg-cyan-500/20", active: false },
          { name: "Mental Health Greens", description: "Using golf as a therapy tool for mental well-being and community connection.", category: "Health", img: "bg-purple-500/20", active: false },
        ].map((charity, i) => (
          <motion.div
            key={charity.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`h-full bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl relative overflow-hidden group hover:border-[#00d992]/50 transition-all duration-500 ${charity.active ? 'border-[#00d992]/50 ring-1 ring-[#00d992]/20' : ''}`}>
              {charity.active && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-[#00d992] text-[#050507] hover:bg-[#00d992] rounded-full px-2 py-0">
                    <CheckCircle2 size={12} className="mr-1" /> SELECTED
                  </Badge>
                </div>
              )}
              <div className={`h-32 w-full ${charity.img} relative flex items-center justify-center`}>
                <Heart size={48} className={`${charity.active ? 'text-[#00d992]' : 'text-[#8b949e]/30'} group-hover:scale-110 transition-transform`} />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="text-[10px] uppercase border-[#3d3a39] text-[#8b949e]">
                    {charity.category}
                  </Badge>
                </div>
                <CardTitle className="text-[#f2f2f2] mt-2 group-hover:text-[#00d992] transition-colors">{charity.name}</CardTitle>
                <CardDescription className="text-[#8b949e] line-clamp-2">
                  {charity.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  variant={charity.active ? "secondary" : "outline"} 
                  className={`w-full rounded-full ${charity.active ? 'bg-[#00d992]/10 text-[#00d992] border-[#00d992]/20 hover:bg-[#00d992]/20' : 'border-[#3d3a39] text-[#8b949e] hover:text-[#f2f2f2] hover:border-[#00d992]'}`}
                >
                  {charity.active ? 'Currently Supporting' : 'Support this Cause'}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
