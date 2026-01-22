'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ScrollProgressIndicatorProps {
  position?: 'top' | 'bottom';
  showPercentage?: boolean;
  height?: string;
  colors?: {
    from: string;
    via?: string;
    to: string;
  };
  glowIntensity?: number;
}

export function ScrollProgressIndicator({
  position = 'top',
  showPercentage = false,
  height = '3px',
  colors = {
    from: '#A97CF8',
    via: '#F38CB8',
    to: '#FDCC92'
  },
  glowIntensity = 15,
}: ScrollProgressIndicatorProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    let progressTween: gsap.core.Tween | null = null;

    const handleLenisScroll = () => {
      const lenis = (window as any).lenis;
      if (lenis) {
        const { progress: lenisProgress } = lenis;
        const percentage = lenisProgress * 100;

        setProgress(percentage);

        if (progressRef.current && progressTween) {
          progressTween.kill();
        }

        progressTween = gsap.to(progressRef.current, {
          width: `${percentage}%`,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    };

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.on('scroll', handleLenisScroll);
    }

    gsap.fromTo(
      progressRef.current,
      { scaleX: 0, opacity: 0 },
      { 
        scaleX: 1, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        delay: 2
      }
    );

    return () => {
      if (lenis) {
        lenis.off('scroll', handleLenisScroll);
      }
      if (progressTween) {
        progressTween.kill();
      }
    };
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 z-[100] ${
        position === 'top' ? 'top-0' : 'bottom-0'
      }`}
    >
      <div className="relative w-full overflow-hidden" style={{ height }}>
        <div className="absolute inset-0 bg-white/5" />
        <div
          ref={progressRef}
          className="absolute left-0 top-0 h-full origin-left"
          style={{
            width: '0%',
            background: colors.via 
              ? `linear-gradient(to right, ${colors.from}, ${colors.via}, ${colors.to})`
              : `linear-gradient(to right, ${colors.from}, ${colors.to})`,
            boxShadow: `0 0 ${glowIntensity}px ${glowIntensity / 3}px ${colors.from}`,
          }}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '20px',
            height: '200%',
            background: `radial-gradient(ellipse at right, ${colors.to} 0%, transparent 70%)`,
            filter: `blur(${glowIntensity}px)`,
          }}
        />
      </div>

      {showPercentage && (
        <div className={`flex ${position === 'top' ? 'mt-2' : 'mb-2'} justify-center`}>
          <span className="text-xs font-mono text-white/50 tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}
