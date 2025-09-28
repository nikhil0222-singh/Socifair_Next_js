'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CosmicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'filled' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function CosmicButton({
  children,
  onClick,
  variant = 'filled',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: CosmicButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    filled: 'cosmic-button',
    outline: 'cosmic-button-outline',
    ghost: 'bg-transparent border-0 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10',
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        rounded-lg font-semibold transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-purple-500/50
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}