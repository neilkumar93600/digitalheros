'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 py-3 flex justify-between items-center">
      <div className="pointer-events-auto">
        <Link href="/">
          <div className="h-12 w-12 bg-[#00d992]/20 rounded-xl liquid-glass flex items-center justify-center overflow-hidden">
            <span className="text-[#00d992] font-heading italic text-xl">D</span>
          </div>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-1.5 py-1 pointer-events-auto">
        {['Home', 'Leaderboard', 'Charities'].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-3 py-2 text-sm font-medium text-foreground/90 font-body hover:text-[#00d992] transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="pointer-events-auto">
        <Link href="/signup" className="bg-[#00d992] text-[#050507] rounded-full px-3.5 py-1.5 text-sm font-medium flex items-center gap-1.5 hover:bg-[#00d992]/90 transition-colors pointer-events-auto">
          Join Now <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </nav>
  );
};