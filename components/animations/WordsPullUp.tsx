'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export function WordsPullUp({ text, className, showAsterisk }: WordsPullUpProps) {
  const words = text.split(' ');

  return (
    <div className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
            duration: 0.6,
          }}
          className="relative inline-block mr-[0.25em] last:mr-0"
        >
          {word}
          {showAsterisk && i === words.length - 1 && (
            <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
          )}
        </motion.span>
      ))}
    </div>
  );
}
