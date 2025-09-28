'use client';

import { ReactNode } from 'react';
import { Starfield } from './Starfield';

interface CosmicLayoutProps {
  children: ReactNode;
}

export function CosmicLayout({ children }: CosmicLayoutProps) {
  return (
    <div className="min-h-screen cosmic-bg">
      <Starfield />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}