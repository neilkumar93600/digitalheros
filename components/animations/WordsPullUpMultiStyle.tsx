'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className }: WordsPullUpMultiStyleProps) {
  // Flatten segments into an array of words with their corresponding classNames
  const wordsWithStyles = segments.flatMap(segment => 
    segment.text.split(' ').map(word => ({
      word,
      className: segment.className
    }))
  );

  return (
    <div className={cn("inline-flex flex-wrap justify-center", className)}>
      {wordsWithStyles.map((item, i) => (
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
          className={cn("inline-block mr-[0.25em] last:mr-0", item.className)}
        >
          {item.word}
        </motion.span>
      ))}
    </div>
  );
}
