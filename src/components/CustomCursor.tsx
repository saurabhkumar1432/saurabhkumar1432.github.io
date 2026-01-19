'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useGSAP(() => {
    // Only run on client and if fine pointer
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Center the initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    // Follower is slower/smoother
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Add hover listeners to all interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      const isInteractive = target.closest('a, button, .interactive, input, textarea, [role="button"]');
      const text = target.getAttribute('data-cursor-text') || target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      
      setIsHovering(!!isInteractive);
      setCursorText(text || '');

      if (isInteractive || text) {
        gsap.to(cursor, { scale: 0.5, duration: 0.2 }); // Shrink main dot slightly
        gsap.to(follower, { 
          scale: 1, // Keep scale distinct from text
          opacity: 1,
          duration: 0.3
        });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
        gsap.to(follower, { 
          scale: 0, 
          opacity: 0,
          duration: 0.3 
        });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    
    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
    };
    
    const handleMouseUp = () => {
      gsap.to(cursor, { scale: isHovering ? 0.5 : 1, duration: 0.1 });
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [isHovering]);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      />
      
      {/* Label Pill instead of expanding circle */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center opacity-0 whitespace-nowrap shadow-xl transform translate-x-4 translate-y-4"
      >
         <span ref={cursorTextRef}>
            {cursorText || 'View'}
         </span>
      </div>
    </>
  );
}
