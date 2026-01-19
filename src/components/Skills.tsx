'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "PostgreSQL", "Docker", "Spring Boot", "Java", 
  "System Design", "Google Cloud", "Data Security", "Next.js", 
  "React Native", "Kotlin", "Drizzle ORM", "Tailwind CSS",
  "Node.js", "Python", "Git", "Performance"
];

export function Skills() {
  const container = useRef(null);
  const row1 = useRef(null);
  const row2 = useRef(null);

  useGSAP(() => {
    // Scroll Velocity Skew Effect
    const proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter(".skill-item", "skewX", "deg");
    const clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

    // Marquee Animations
    gsap.to(row1.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear"
    }).totalProgress(0.5);

    gsap.to(row2.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear"
    });

  }, { scope: container });

  return (
    <section ref={container} className="py-32 overflow-hidden bg-black relative" id="skills">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent blur-3xl opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
        <h2 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-8">Technical Proficiency</h2>
        <p className="skill-text text-2xl md:text-3xl font-light leading-relaxed text-white/80 max-w-3xl mx-auto">
          Scale-ready architecture. <span className="text-white font-medium italic">Polyglot engineering</span>. 
          Building the future with <span className="underline decoration-blue-500 underline-offset-4 decoration-2">precision</span>.
        </p>
      </div>

      <div className="flex flex-col gap-12 rotate-[-2deg] scale-105">
        {/* Row 1 - Left */}
        <div className="relative flex overflow-x-hidden" data-cursor-text="Drag">
          <div ref={row1} className="flex gap-8 whitespace-nowrap will-change-transform">
            {[...skills, ...skills, ...skills].map((skill, i) => (
              <span
                key={`r1-${i}`}
                className="skill-item text-6xl md:text-8xl font-black text-transparent stroke-text hover:text-white/10 transition-colors uppercase select-none"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 - Right (Reversed visually via CSS or start offset) */}
        <div className="relative flex overflow-x-hidden" data-cursor-text="Scroll">
          <div ref={row2} className="flex gap-8 whitespace-nowrap will-change-transform" style={{ transform: 'translateX(-25%)' }}>
            {[...skills, ...skills, ...skills].reverse().map((skill, i) => (
              <span
                key={`r2-${i}`}
                className="skill-item text-6xl md:text-8xl font-black text-white/20 hover:text-white transition-colors uppercase select-none"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
