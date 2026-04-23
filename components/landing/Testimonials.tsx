'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: 'I have played golf for 30 years. This is the first time my rounds actually mean something beyond my handicap. $12,000 raised for St. Jude last year alone.',
    author: 'Michael Torres',
    role: 'Handicap 8, Denver CC'
  },
  {
    quote: 'The leaderboard feature alone is worth it. My foursome now has a running competition every month. The charity aspect just makes it better.',
    author: 'Jennifer Walsh',
    role: 'Handicap 14, Pebble Beach'
  },
  {
    quote: 'Finally a golf app that understands the game. The precision tracking is incredible, and knowing every birdie helps someone else is the best feeling.',
    author: 'David Kim',
    role: 'Handicap 5, Augusta National'
  },
];

export const Testimonials = () => {
  return (
    <section className="py-32 bg-black">
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
            Golfer Stories
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Real golfers. Real impact.
          </h2>
        </div>

        {/* 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="liquid-glass rounded-2xl p-8 flex flex-col justify-between"
            >
              <div className="text-white/80 font-body font-light text-sm italic leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </div>
              <div>
                <div className="text-white font-body font-medium text-sm">{t.author}</div>
                <div className="text-[#00d992] font-body font-light text-xs mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};