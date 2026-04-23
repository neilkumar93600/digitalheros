'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp, Shield } from 'lucide-react';

const gridFeatures = [
  {
    icon: Trophy,
    title: 'Win Prizes Weekly',
    description: 'Weekly leaderboard prizes, annual championships, and exclusive golf experiences. Compete against players nationwide.'
  },
  {
    icon: Target,
    title: 'Precision Tracking',
    description: 'Log every shot with GPS accuracy. Get AI-powered insights on your game. Track improvement over time.'
  },
  {
    icon: TrendingUp,
    title: 'Climb the Ranks',
    description: 'Handicap calculation, ranking systems, and achievement badges. Your game deserves recognition.'
  },
  {
    icon: Shield,
    title: 'Charity Guaranteed',
    description: '10% of every subscription goes directly to charity. Your game makes a difference, guaranteed.'
  },
];

export const FeaturesGrid = () => {
  return (
    <section className="py-32 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-6"
          >
            Why Digital Heroes
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            More than just a scorecard.
          </h2>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="liquid-glass rounded-2xl p-6 space-y-4"
            >
              <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center">
                <feature.icon className="h-5 w-5 text-[#00d992]" />
              </div>
              <h3 className="text-white text-lg font-heading italic">{feature.title}</h3>
              <p className="text-white/60 text-sm font-body font-light leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};