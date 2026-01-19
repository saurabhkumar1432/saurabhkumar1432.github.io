'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Preloader() {
  const container = useRef(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Counter Animation
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counterObj.value)}%`;
        }
      }
    });

    // Exit Animation
    tl.to(container.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
      delay: 0.2
    });
    
    // Animate content in after preloader
    tl.fromTo("body", { overflow: "hidden" }, { overflow: "auto" }, "<");

  }, { scope: container });

  return (
    <div ref={container} className="fixed inset-0 z-[99999] flex items-center justify-center bg-black text-white">
      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div ref={counterRef} className="text-[12vw] font-black leading-none tracking-tighter mix-blend-difference">
          0%
        </div>
        <div className="mt-4 text-sm font-medium tracking-[0.5em] uppercase opacity-50">
          Loading Experience
        </div>
      </div>
    </div>
  );
}
