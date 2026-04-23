'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HLSVideo } from '../video/HLSVideo';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const CtaFooter = () => {
  return (
    <footer className="relative w-full bg-black">
      {/* CTA Section */}
      <div className="relative flex h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <HLSVideo
            src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
            className="h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 font-heading text-5xl tracking-tight italic text-white md:text-6xl lg:text-7xl leading-[0.85]"
          >
            Your next round starts here.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mb-12 max-w-xl font-body text-sm text-white/60 md:text-base font-light"
          >
            Join 2,400+ golfers making every round count. Free to start, no commitment. Choose your charity and start competing today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button className="liquid-glass-strong flex items-center gap-2 rounded-full px-6 py-3 text-white transition-all hover:scale-105 active:scale-95 group">
              <span className="font-medium tracking-wide">Start Free Today</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button className="flex items-center gap-2 rounded-full bg-[#00d992] px-6 py-3 font-medium text-[#050507] transition-colors hover:bg-[#00d992]/90">
              View Leaderboard
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="mt-32 border-t border-white/10 px-8 py-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="font-body text-xs text-white/40">
            &copy; 2026 Digital Heroes. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-8 font-body text-xs text-white/40">
            <Link href="#" className="transition-colors hover:text-[#00d992]">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-[#00d992]">Terms</Link>
            <Link href="#" className="transition-colors hover:text-[#00d992]">Contact</Link>
            <Link href="#" className="transition-colors hover:text-[#00d992]">Charities</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};