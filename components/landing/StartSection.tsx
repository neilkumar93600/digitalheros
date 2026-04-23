'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HLSVideo } from '../video/HLSVideo';
import { BlurText } from '../animations/BlurText';
import { ArrowUpRight } from 'lucide-react';

export const StartSection = () => {
  return (
    <section className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-30">
        <HLSVideo
          src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
          className="h-full w-full object-cover grayscale"
        />
      </div>

      {/* Top Gradient Fade */}
      <div className="absolute top-0 right-0 left-0 z-0 h-[200px] bg-gradient-to-b from-black to-transparent" />

      {/* Bottom Gradient Fade */}
      <div className="absolute right-0 bottom-0 left-0 z-0 h-[200px] bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-4xl flex-col justify-center px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="liquid-glass mx-auto mb-8 inline-block rounded-full px-3.5 py-1 font-body text-xs font-medium text-white"
        >
          How It Works
        </motion.div>

        <h2 className="mb-6">
          <BlurText
            text="Play for purpose. Win for charity."
            className="font-heading text-4xl leading-[0.9] tracking-tight text-white italic md:text-5xl lg:text-6xl"
            delay={100}
          />
        </h2>

        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl font-body text-sm font-light text-white/60 md:text-base"
        >
          Create your profile. Log your scores. Watch the leaderboard. A percentage of every subscription goes to the charity of your choice.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="liquid-glass-strong group mx-auto flex items-center gap-2 rounded-full px-6 py-3 text-white transition-all hover:scale-105 active:scale-95"
        >
          <span className="font-medium tracking-wide">Start Scoring Free</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.button>
      </div>
    </section>
  );
};