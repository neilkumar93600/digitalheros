"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-transparent backdrop-blur-[2px]">
      {/* Logo: Concentric Circles */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 border-[1.5px] border-white/20 rounded-full" />
          <div className="absolute inset-1.5 border-[1.5px] border-white/40 rounded-full" />
          <div className="absolute inset-3 border-[1.5px] border-white/80 rounded-full" />
        </div>
        <span className="font-serif italic text-2xl tracking-tight text-white mb-1">Mindloop</span>
      </div>

      {/* Social Links: Liquid Glass Buttons */}
      <div className="flex items-center gap-4">
        <SocialButton icon={<Camera className="w-5 h-5" />} href="#" />
        <SocialButton icon={<Play className="w-5 h-5" />} href="#" />
      </div>
    </nav>
  );
};

const SocialButton = ({ icon, href }: { icon: React.ReactNode; href: string }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "liquid-glass flex items-center justify-center w-11 h-11 rounded-full text-white/90 hover:text-white transition-colors cursor-pointer"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
};

export default Navbar;
