'use client';

import React, { forwardRef, ReactNode } from 'react';
import { useSpotlightEffect } from '@/hooks/useSpotlightEffect';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  gradient?: string;
  spotlightConfig?: Parameters<typeof useSpotlightEffect>[0];
  disableSpotlight?: boolean;
}

export const SpotlitCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ children, className, gradient, spotlightConfig, disableSpotlight, ...props }, externalRef) => {
    const {
      spotlightRef,
      glareRef,
      handleMouseMove,
      handleMouseEnter,
      handleMouseLeave,
      setCardRef,
    } = useSpotlightEffect({
      disabled: disableSpotlight,
      ...spotlightConfig,
    });

    const refCallback = (element: HTMLDivElement | null) => {
      setCardRef(element);
      if (typeof externalRef === 'function') {
        externalRef(element);
      } else if (externalRef) {
        (externalRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
      }
    };

    return (
      <div
        ref={refCallback}
        className={cn(
          'group relative rounded-3xl overflow-hidden border border-white/10',
          'bg-white/5 backdrop-blur-sm hover:border-white/20',
          'transition-all cursor-none md:cursor-pointer',
          'overflow-hidden',
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {gradient && (
          <div 
            className={cn(
              'absolute inset-0 bg-gradient-to-br',
              'opacity-20 group-hover:opacity-40 transition-opacity duration-500',
              gradient
            )} 
          />
        )}

        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
              rgba(255, 255, 255, ${spotlightConfig?.spotlightIntensity ?? 0.15}) 0%,
              transparent ${spotlightConfig?.spotlightSize ?? 300}px
            )`,
          }}
        />

        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none opacity-0 will-change-transform"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(255, 255, 255, ${spotlightConfig?.glareIntensity ?? 0.1}) 0%,
              transparent 50%
            )`,
            mixBlendMode: 'overlay',
            transformOrigin: 'center',
          }}
        />

        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10" />
        </div>

        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    );
  }
);

SpotlitCard.displayName = 'SpotlitCard';
