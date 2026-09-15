'use client';

import React from 'react';
import { motion } from 'motion/react';

export function ScrollReveal({ 
  children, 
  delay = 0, 
  className = '',
  yOffset = 30
}: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string,
  yOffset?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
