"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";

const platforms = [
  {
    name: "ChatGPT",
    icon: "/icon-chatgpt.png",
    description: "Deep content generation and analysis for your morning briefing.",
  },
  {
    name: "Perplexity",
    icon: "/icon-perplexity.png",
    description: "Citations and real-time sources verified for total accuracy.",
  },
  {
    name: "Google AI",
    icon: "/icon-google.png",
    description: "Vast information synthesis from the world's most powerful index.",
  },
];

const SearchSection = () => {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainer}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            variants={fadeUp(0)}
            className="text-4xl md:text-5xl font-sans font-bold text-center mb-20"
          >
            Search is <span className="font-serif italic font-normal">changed.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platforms.map((platform, idx) => (
              <motion.div
                key={platform.name}
                variants={fadeUp(0.1 + idx * 0.1)}
                className="liquid-glass p-8 rounded-[2rem] flex flex-col items-center text-center group"
              >
                <div className="relative w-20 h-20 mb-8 grayscale opacity-80 group-hover:opacity-100 transition-opacity">
                  <Image
                    src={platform.icon}
                    alt={platform.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-sans font-bold mb-4">{platform.name}</h3>
                <p className="text-white/50 leading-relaxed">
                  {platform.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchSection;
