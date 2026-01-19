'use client';

import { useRef } from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Education() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".edu-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-20 relative px-6" id="education">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          <div className="md:w-1/3">
             <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
               Education
             </h2>
             <p className="text-muted-foreground text-lg">
               The academic foundation that drives my technical excellence.
             </p>
          </div>

          <div className="md:w-2/3 space-y-6">
            <div className="edu-card group relative overflow-hidden bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <GraduationCap className="w-24 h-24 text-white/5 -rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">IIIT Sri City</h3>
                    <p className="text-emerald-400/80 font-medium">B.Tech in Computer Science</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">November 2020 - June 2024</p>
                <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  Specialization: Data Security & Performance
                </div>
              </div>
            </div>

            <div className="edu-card group relative overflow-hidden bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
               <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <BookOpen className="w-24 h-24 text-white/5 -rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Army Public School, Nehru Road</h3>
                    <p className="text-blue-400/80 font-medium">Lucknow</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">2008 - 2019</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
