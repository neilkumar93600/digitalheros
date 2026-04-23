'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'word' | 'letter';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 200,
  className = '',
  animateBy = 'word',
  direction = 'bottom',
  threshold = 0.1,
  rootMargin = '0px',
}) => {
  const elements = animateBy === 'word' ? text.split(' ') : text.split('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      y: direction === 'bottom' ? 50 : -50,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.p
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`inline-block ${className}`}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
          style={{ whiteSpace: animateBy === 'word' ? 'pre' : 'normal' }}
        >
          {element}
          {animateBy === 'word' && index !== elements.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.p>
  );
};
