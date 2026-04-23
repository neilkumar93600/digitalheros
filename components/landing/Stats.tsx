'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HLSVideo } from '../video/HLSVideo';

const stats = [
  { value: '2,400+', label: 'Active golfers' },
  { value: '$847K', label: 'Raised for charity' },
  { value: '38', label: 'States covered' },
  { value: '12', label: 'Major tournaments' },
];

export const Stats = () => {
  return (
    <section className="relative w-full py-40 overflow-hidden bg-black">
      {/* Background Video - desaturated */}
      <div className="absolute inset-0 z-0 opacity-30">
        <HLSVideo
          src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-0" />

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="liquid-glass rounded-3xl p-12 md:p-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-3">
                <div className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-[#00d992] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-white/60 font-body font-light text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};