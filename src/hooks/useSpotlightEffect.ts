'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

interface SpotlightConfig {
  spotlightSize?: number;
  glareSize?: number;
  spotlightIntensity?: number;
  glareIntensity?: number;
  followSpeed?: number;
  spotlightColor?: string;
  glareColor?: string;
  disabled?: boolean;
}

interface SpotlightPosition {
  x: number;
  y: number;
}

interface UseSpotlightEffectReturn {
  spotlightRef: React.RefObject<HTMLDivElement | null>;
  glareRef: React.RefObject<HTMLDivElement | null>;
  handleMouseMove: (e: MouseEvent | React.MouseEvent) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  setCardRef: (element: HTMLElement | null) => void;
}

export function useSpotlightEffect(
  config: SpotlightConfig = {}
): UseSpotlightEffectReturn {
  const {
    spotlightSize = 300,
    glareSize = 200,
    spotlightIntensity = 0.15,
    glareIntensity = 0.1,
    followSpeed = 0.1,
    spotlightColor = '255, 255, 255',
    glareColor = '255, 255, 255',
    disabled = false,
  } = config;

  const spotlightRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement | null>(null);

  const currentPos = useRef<SpotlightPosition>({ x: 0, y: 0 });
  const targetPos = useRef<SpotlightPosition>({ x: 0, y: 0 });
  const rotationRef = useRef(0);

  const xTo = useRef<gsap.TweenTarget | null>(null);
  const yTo = useRef<gsap.TweenTarget | null>(null);
  const glareXTo = useRef<gsap.TweenTarget | null>(null);
  const glareYTo = useRef<gsap.TweenTarget | null>(null);
  const glareRotTo = useRef<gsap.TweenTarget | null>(null);

  const handleMouseMove = (e: MouseEvent | React.MouseEvent) => {
    if (disabled || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    targetPos.current = { x, y };
    
    if (currentPos.current.x === 0 && currentPos.current.y === 0) {
      currentPos.current = { x, y };
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;

    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    if (disabled) return;

    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
    
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        rotation: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
    
    currentPos.current = { x: 0, y: 0 };
    targetPos.current = { x: 0, y: 0 };
    rotationRef.current = 0;
  };

  useEffect(() => {
    if (disabled) return;

    if (glareRef.current) {
      glareXTo.current = gsap.quickTo(glareRef.current, 'x', {
        duration: 0.1,
        ease: 'power2.out'
      });
      glareYTo.current = gsap.quickTo(glareRef.current, 'y', {
        duration: 0.1,
        ease: 'power2.out'
      });
      glareRotTo.current = gsap.quickTo(glareRef.current, 'rotation', {
        duration: 0.1,
        ease: 'power2.out'
      });
    }

    const animateLoop = () => {
      const lerp = (start: number, end: number, factor: number) => 
        start + (end - start) * factor;

      const newX = lerp(currentPos.current.x, targetPos.current.x, followSpeed);
      const newY = lerp(currentPos.current.y, targetPos.current.y, followSpeed);

      currentPos.current = { x: newX, y: newY };

      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angle = Math.atan2(newY - centerY, newX - centerX) * (180 / Math.PI);
        rotationRef.current = angle + 90;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--spotlight-x', `${newX}px`);
        spotlightRef.current.style.setProperty('--spotlight-y', `${newY}px`);
      }

      if (glareRef.current && glareXTo.current && glareYTo.current && glareRotTo.current) {
        (glareXTo.current as (value: number) => void)(newX);
        (glareYTo.current as (value: number) => void)(newY);
        (glareRotTo.current as (value: number) => void)(rotationRef.current);
      }

      requestAnimationFrame(animateLoop);
    };

    requestAnimationFrame(animateLoop);
  }, [disabled, followSpeed]);

  const setCardRef = (element: HTMLElement | null) => {
    cardRef.current = element;
  };

  return {
    spotlightRef,
    glareRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    setCardRef,
  };
}
