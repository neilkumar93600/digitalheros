"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Circle, Filter, Sparkles, Zap } from "lucide-react";

const features = [
  {
    title: "AI Synthesis",
    description: "Multi-layered processing using ChatGPT, Perplexity, and Google AI.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: "Smart Filtering",
    description: "Noise reduction algorithms that highlight what truly matters.",
    icon: <Filter className="w-6 h-6" />,
  },
  {
    title: "Insight Loops",
    description: "Recursive feedback systems that learn your interests over time.",
    icon: <Circle className="w-6 h-6" />,
  },
  {
    title: "Human Touch",
    description: "Final editorial review for nuance that AI hasn't mastered yet.",
    icon: <Zap className="w-6 h-6" />,
  },
];

const SolutionSection = () => {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainer}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p 
            variants={fadeUp(0)}
            className="text-sm tracking-widest uppercase opacity-40 text-center mb-4"
          >
            The Solution
          </motion.p>
          
          <motion.h2 
            variants={fadeUp(0.1)}
            className="text-4xl md:text-5xl font-sans font-bold text-center mb-20"
          >
            Intelligence, <span className="font-serif italic font-normal">distilled.</span>
          </motion.h2>

          {/* 3:1 Aspect Video Container */}
          <motion.div
            variants={fadeUp(0.2)}
            className="relative w-full aspect-[3/1] rounded-[2.5rem] overflow-hidden mb-16 grayscale brightness-75 bg-muted"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://d237sk032qnd09.cloudfront.net/v/c.mp4" type="video/mp4" />
            </video>
            {/* Overlay Glass Panel */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="liquid-glass px-8 py-4 rounded-full border border-white/5 backdrop-blur-md">
                <span className="text-white/80 font-serif italic text-xl">The Loop Process</span>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                variants={fadeUp(0.3 + idx * 0.1)}
                className="liquid-glass p-8 rounded-[2rem] flex flex-col gap-6 group hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-sans font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
