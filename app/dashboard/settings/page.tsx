"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Eye, Smartphone, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-[#f2f2f2] font-instrument-serif italic">Settings</h2>
        <p className="text-[#8b949e]">Configure your profile and preferences.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1 space-y-2">
           {[
             { name: "Profile", icon: User, active: true },
             { name: "Notifications", icon: Bell, active: false },
             { name: "Security", icon: Shield, active: false },
             { name: "Privacy", icon: Eye, active: false },
             { name: "Devices", icon: Smartphone, active: false },
           ].map((tab) => (
             <button
               key={tab.name}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm
                 ${tab.active 
                   ? 'bg-[#00d992]/10 text-[#00d992] border border-[#00d992]/20' 
                   : 'text-[#8b949e] hover:bg-[#101010] hover:text-[#f2f2f2] border border-transparent'}`}
             >
               <tab.icon size={18} />
               {tab.name}
             </button>
           ))}
        </div>

        <div className="lg:col-span-3 space-y-6">
           <Card className="bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl">
             <CardHeader>
                <CardTitle className="text-[#f2f2f2]">Public Profile</CardTitle>
                <CardDescription className="text-[#8b949e]">This information will be displayed on leaderboards.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label className="text-[#8b949e]">Full Name</Label>
                      <Input placeholder="John Doe" className="bg-[#050507] border-[#3d3a39] focus-visible:ring-[#00d992]" />
                   </div>
                   <div className="space-y-2">
                      <Label className="text-[#8b949e]">Display Name</Label>
                      <Input placeholder="GolfHero_42" className="bg-[#050507] border-[#3d3a39] focus-visible:ring-[#00d992]" />
                   </div>
                </div>
                <div className="space-y-2">
                   <Label className="text-[#8b949e]">Bio</Label>
                   <Input placeholder="Tell us about your golf journey..." className="bg-[#050507] border-[#3d3a39] focus-visible:ring-[#00d992]" />
                </div>
             </CardContent>
           </Card>

           <Card className="bg-[#101010]/50 border-[#3d3a39]/30 backdrop-blur-xl">
             <CardHeader>
                <CardTitle className="text-[#f2f2f2]">Preferences</CardTitle>
             </CardHeader>
             <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                      <Label className="text-[#f2f2f2]">Show on Leaderboards</Label>
                      <p className="text-xs text-[#8b949e]">Allow other users to see your scores and rank.</p>
                   </div>
                   <Switch defaultChecked className="data-[state=checked]:bg-[#00d992]" />
                </div>
                <div className="flex items-center justify-between border-t border-[#3d3a39]/20 pt-6">
                   <div className="space-y-0.5">
                      <Label className="text-[#f2f2f2]">Email Notifications</Label>
                      <p className="text-xs text-[#8b949e]">Get notified about draw results and impact updates.</p>
                   </div>
                   <Switch defaultChecked className="data-[state=checked]:bg-[#00d992]" />
                </div>
             </CardContent>
           </Card>

           <div className="flex justify-end gap-4">
              <Button variant="ghost" className="text-[#8b949e] hover:text-[#f2f2f2]">Reset</Button>
              <Button className="bg-[#00d992] text-[#050507] hover:bg-[#00ffaa] rounded-full px-8 font-bold">
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
