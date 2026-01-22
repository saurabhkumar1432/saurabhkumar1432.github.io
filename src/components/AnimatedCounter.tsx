'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  once?: boolean;
  className?: string;
  ease?: string;
  delay?: number;
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  once = true,
  className = '',
  ease = 'power2.out',
  delay = 0,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  useGSAP(() => {
    if (!counterRef.current) return;

    tweenRef.current = gsap.to(
      { val: 0 },
      {
        val: value,
        duration,
        ease,
        delay,
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.textContent = `${prefix}${formatNumber(this.targets()[0].val)}${suffix}`;
          }
        },
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 85%',
          toggleActions: once ? 'play none none reverse' : 'play pause resume reverse',
          once,
        },
      }
    );

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [value, duration, ease, delay, once, prefix, suffix, decimals, separator]);

  return (
    <span ref={counterRef} className={`tabular-nums ${className}`}>
      {prefix}{formatNumber(0)}{suffix}
    </span>
  );
}
