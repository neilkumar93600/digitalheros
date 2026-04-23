"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const MissionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const text = "We believe information shouldn't be a flood. It should be a clear, consistent stream that empowers you to think deeper, act faster, and stay human in the age of AI.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="py-32 px-6 bg-black relative">
      <div className="max-w-5xl mx-auto">
        <motion.p 
          variants={fadeUp(0)}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="text-sm tracking-widest uppercase opacity-40 text-center mb-12"
        >
          The Mission
        </motion.p>

        {/* Word Reveal Logic */}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 text-3xl md:text-5xl font-sans font-bold text-center mb-20 leading-tight">
          {words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </Word>
          ))}
        </div>

        {/* Large Mission Video */}
        <motion.div 
          variants={fadeUp(0.2)}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="relative w-full aspect-video rounded-[3rem] overflow-hidden grayscale brightness-75"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://d237sk032qnd09.cloudfront.net/v/b.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
};

const Word = ({ children, progress, range }: { children: React.ReactNode; progress: any; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="relative">
      {children}
    </motion.span>
  );
};

export default MissionSection;
