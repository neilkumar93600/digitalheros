"use client";

import { Bell, Search, Menu, Sparkles, Trophy } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export function DashboardHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-4 px-8 border-b border-[#3d3a39]/30 bg-[#050507]/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-[#8b949e] hover:text-[#00d992] hover:bg-[#00d992]/10 transition-all duration-300" />
      </div>

      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <form className="ml-auto flex-1 sm:flex-initial group">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e] group-focus-within:text-[#00d992] transition-colors" />
            <Input
              type="search"
              placeholder="Search scores, draws..."
              className="pl-10 w-full sm:w-[300px] md:w-[400px] bg-[#101010]/50 border-[#3d3a39]/50 text-[#f2f2f2] focus-visible:ring-[#00d992] rounded-full placeholder:text-[#8b949e]/50 focus:bg-[#101010] transition-all"
            />
          </div>
        </form>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-[#8b949e] hover:text-[#f2f2f2] hover:bg-[#101010] rounded-full transition-all"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-[#00d992] rounded-full border-2 border-[#050507]" />
            </Button>
          </motion.div>

          <div className="h-8 w-[1px] bg-[#3d3a39]/50 hidden sm:block" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative flex items-center gap-3 p-1 h-auto rounded-full hover:bg-[#101010] group"
              >
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-semibold text-[#f2f2f2] group-hover:text-[#00d992] transition-colors">
                    {user?.user_metadata?.full_name || 'Golf Hero'}
                  </span>
                  <div className="flex items-center gap-1">
                    <Trophy size={10} className="text-[#00d992]" />
                    <span className="text-[10px] text-[#8b949e] uppercase tracking-wider font-mono">1,240 XP</span>
                  </div>
                </div>
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-[#3d3a39] group-hover:border-[#00d992] transition-all duration-300">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-[#1a1a1a] text-[#00d992] font-bold">
                      {user?.email?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-[#00d992] to-[#00ffaa] p-0.5 rounded-full shadow-[0_0_10px_rgba(0,217,146,0.3)]">
                    <Sparkles size={8} className="text-[#050507]" />
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#101010] border-[#3d3a39] text-[#f2f2f2] rounded-2xl p-2 shadow-2xl" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-bold leading-none">{user?.user_metadata?.full_name || 'Golf Hero'}</p>
                  <p className="text-xs leading-none text-[#8b949e]">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#3d3a39]/50" />
              <DropdownMenuItem className="focus:bg-[#00d992]/10 focus:text-[#00d992] cursor-pointer rounded-xl p-2.5 transition-colors">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#00d992]/10 focus:text-[#00d992] cursor-pointer rounded-xl p-2.5 transition-colors">
                My Statistics
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#00d992]/10 focus:text-[#00d992] cursor-pointer rounded-xl p-2.5 transition-colors">
                Achievements
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#3d3a39]/50" />
              <DropdownMenuItem 
                onClick={() => signOut()}
                className="text-red-400 focus:bg-red-400/10 focus:text-red-300 cursor-pointer rounded-xl p-2.5 transition-colors"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
