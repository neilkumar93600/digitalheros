"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
      >
        <source src="https://d237sk032qnd09.cloudfront.net/v/a.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl px-6 text-center"
        initial="initial"
        whileInView="whileInView"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        {/* Avatars & Social Proof */}
        <motion.div variants={fadeUp(0)} className="flex flex-col items-center gap-4 mb-8">
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-muted">
                <Image
                  src={`/avatar-${i}.png`}
                  alt={`Avatar ${i}`}
                  fill
                  className="object-cover grayscale"
                />
              </div>
            ))}
          </div>
          <p className="text-sm tracking-wider uppercase opacity-70">
            Join 10,000+ top readers
          </p>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          variants={fadeUp(0.1)} 
          className="text-6xl md:text-8xl font-sans font-bold leading-[1.05] mb-8"
        >
          Your daily <span className="font-serif italic font-normal">intelligence</span> <br />
          delivered <span className="font-serif italic font-normal">differently.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={fadeUp(0.2)} 
          className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Mindloop curators the most important ideas from across the web, refined into a 5-minute morning loop.
        </motion.p>

        {/* Email Form */}
        <motion.form 
          variants={fadeUp(0.3)}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex-1 group">
            <input
              type="email"
              placeholder="Enter your email"
              className="liquid-glass w-full px-6 py-4 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
            />
          </div>
          <button className="bg-white text-black font-bold px-10 py-4 rounded-full hover:bg-white/90 transition-all active:scale-[0.98]">
            Subscribe
          </button>
        </motion.form>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
