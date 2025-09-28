'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CosmicCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'purple' | 'blue' | 'pink' | 'cyan';
  hoverable?: boolean;
}

export function CosmicCard({ 
  children, 
  className = '', 
  glowColor = 'purple',
  hoverable = true 
}: CosmicCardProps) {
  const glowColors = {
    purple: 'hover:shadow-purple-500/20',
    blue: 'hover:shadow-blue-500/20',
    pink: 'hover:shadow-pink-500/20',
    cyan: 'hover:shadow-cyan-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverable ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        cosmic-card rounded-xl p-6
        ${hoverable ? `cursor-pointer ${glowColors[glowColor]}` : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}