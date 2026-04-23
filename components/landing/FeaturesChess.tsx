'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BlurText } from '../animations/BlurText';
import { ArrowUpRight } from 'lucide-react';

const features = [
  {
    title: 'Track every shot. Every round.',
    description: 'Log scores from any course, any time. Our AI analyzes your game, identifies patterns, and helps you improve -- while earning points for charity.',
    buttonText: 'Start tracking',
    gif: '/feature-1.gif',
    reverse: false,
  },
  {
    title: 'Your game. Your cause.',
    description: 'Choose your charity from our verified partners. Every birdie, eagle, and par you make translates to real contributions. Play meaningful golf.',
    buttonText: 'View charities',
    gif: '/feature-2.gif',
    reverse: true,
  },
];

export const FeaturesChess = () => {
  return (
    <section className="py-32 bg-black overflow-hidden">
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
            Features
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Golf with a bigger purpose.
          </h2>
        </div>

        {/* Feature Rows */}
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 md:gap-32 mb-32 last:mb-0`}
          >
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: feature.reverse ? 50 : -50, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex-1 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-heading italic leading-tight">
                {feature.title}
              </h2>
              <p className="text-white/60 text-base md:text-lg font-body font-light leading-relaxed max-w-xl">
                {feature.description}
              </p>
              <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-white flex items-center gap-2 group transition-all hover:scale-105 active:scale-95">
                <span className="font-medium tracking-wide text-sm">{feature.buttonText}</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* GIF Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex-1 relative aspect-[4/3] w-full"
            >
              <div className="absolute inset-0 liquid-glass rounded-2xl overflow-hidden">
                <img
                  src={feature.gif}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};