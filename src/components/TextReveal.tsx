'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  scrollTrigger?: boolean;
  trigger?: HTMLElement | string;
  duration?: number;
  delay?: number;
  stagger?: number;
  onComplete?: () => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export function TextReveal({
  text,
  className = '',
  scrollTrigger = true,
  trigger,
  duration = 1,
  delay = 0,
  stagger = 0.05,
  onComplete,
  as: Tag = 'h2'
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const config: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power3.out',
      onComplete
    };

    if (scrollTrigger) {
      config.scrollTrigger = {
        trigger: trigger || element,
        start: 'top 85%',
        end: 'top 15%',
        toggleActions: 'play none none reverse'
      };
    }

    gsap.fromTo(element, 
      { y: 50, opacity: 0 },
      config
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [text, scrollTrigger, trigger, duration, delay, stagger, onComplete]);

  return <Tag ref={containerRef as any} className={className}>{text}</Tag>;
}
