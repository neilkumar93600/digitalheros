"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="py-20 px-6 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Logo */}
        <div className="flex items-center gap-3 grayscale opacity-60">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 border border-white/20 rounded-full" />
            <div className="absolute inset-1 border border-white/40 rounded-full" />
            <div className="absolute inset-2 border border-white/80 rounded-full" />
          </div>
          <span className="font-serif italic text-xl tracking-tight text-white">Mindloop</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm uppercase tracking-widest text-white/40">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-white/20">
          © {new Date().getFullYear()} Mindloop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
