'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollOpacityTextProps {
  text: string;
  className?: string;
}

const AnimatedLetter = ({ char, progress, range }: { char: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }}>
      {char}
    </motion.span>
  );
};

export function ScrollOpacityText({ text, className }: ScrollOpacityTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const chars = text.split('');

  return (
    <p ref={containerRef} className={cn("flex flex-wrap", className)}>
      {chars.map((char, i) => {
        const charProgress = i / chars.length;
        const range: [number, number] = [
          Math.max(0, charProgress - 0.1),
          Math.min(1, charProgress + 0.05)
        ];
        
        return (
          <AnimatedLetter 
            key={i} 
            char={char} 
            progress={scrollYProgress} 
            range={range} 
          />
        );
      })}
    </p>
  );
}
