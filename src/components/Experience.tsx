'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { TextReveal } from '@/components/TextReveal';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "IBM",
    role: "Software Developer",
    period: "July 2024 - Present",
    location: "Pune, Maharashtra, India",
    description: "Contributing to high-performance data security solutions and core software development at IBM ISL.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    company: "IBM",
    role: "SDE Intern",
    period: "January 2024 - July 2024",
    location: "Pune, Maharashtra, India",
    description: "Worked on critical backend modules and gained hands-on experience with enterprise-scale systems.",
    color: "text-blue-300",
    bg: "bg-blue-500/5",
    border: "border-blue-500/10"
  },
  {
    company: "D2C Ecommerce",
    role: "Software Development Engineer",
    period: "August 2023 - October 2023",
    location: "Gurugram, Haryana, India",
    description: "Developed scalable e-commerce features and optimized product performance.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    company: "D2C Ecommerce",
    role: "Product and Tech Intern",
    period: "May 2023 - August 2023",
    location: "Gurugram, Haryana, India",
    description: "Collaborated with product teams to refine user requirements and implement technical solutions.",
    color: "text-emerald-300",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/10"
  },
  {
    company: "7 Dots Smart Solutions",
    role: "Software Developer Intern",
    period: "May 2022 - June 2022",
    location: "Remote / Hybrid",
    description: "Assisted in developing client-centric web solutions and streamlined development workflows.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  }
];

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ScrollTrigger Animation targeting the WRAPPER
    const wrappers = gsap.utils.toArray<HTMLElement>('.experience-trigger-wrapper');
    
    wrappers.forEach((wrapper, i) => {
      gsap.fromTo(wrapper,
        { 
          opacity: 0, 
          x: i % 2 === 0 ? -50 : 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Tilt Animation targeting the INNER CARD
    const items = gsap.utils.toArray<HTMLElement>('.experience-tilt-card');
    
    items.forEach((item) => {
      // Super fast response time (0.05s) for "instant" feel
      const xTo = gsap.quickTo(item, "rotationY", { duration: 0.05, ease: "power1.out" });
      const yTo = gsap.quickTo(item, "rotationX", { duration: 0.05, ease: "power1.out" });
      
      let bounds = item.getBoundingClientRect();

      const onMove = (e: MouseEvent) => {
        const x = e.clientX - bounds.left - bounds.width / 2;
        const y = e.clientY - bounds.top - bounds.height / 2;
        
        // Increased sensitivity (divisor 15 instead of 20)
        xTo(x / 15);
        yTo(-y / 15);
      };

      const onEnter = () => {
          bounds = item.getBoundingClientRect(); 
          item.addEventListener('mousemove', onMove);
          
          gsap.to(item, {
              scale: 1.02,
              duration: 0.2, // Faster scale up
              ease: "power2.out",
              overwrite: 'auto'
          });
      };

      const onLeave = () => {
        item.removeEventListener('mousemove', onMove);
        xTo(0);
        yTo(0);
        
        gsap.to(item, {
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
          overwrite: 'auto'
        });
      };
      
      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);
    });

    // Animate the centerline
    gsap.fromTo('.timeline-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 20%",
          scrub: true
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden perspective-1000" id="experience">
       <div className="max-w-7xl mx-auto px-6 mb-20">
        <TextReveal
          text="Professional Journey"
          className="text-4xl md:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
          duration={0.8}
          stagger={0.1}
        />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Center Line */}
        <div className="timeline-line absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent md:-translate-x-1/2" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <div key={i} className={`relative flex items-center md:justify-between ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-background border-4 border-blue-500 z-10 md:-translate-x-1/2 translate-y-1.5 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

              {/* Spacer for mobile alignment */}
              <div className="hidden md:block w-1/2" />

              {/* Content Card Wrapper for Scroll Animation */}
              <div className="experience-trigger-wrapper w-[calc(100%-3rem)] md:w-[45%] ml-10 md:ml-0 hover:z-20">
                  <div 
                    className={`experience-tilt-card w-full p-6 rounded-2xl border ${exp.border} ${exp.bg} backdrop-blur-sm will-change-transform`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 pointer-events-none gap-2" style={{ transform: "translateZ(20px)" }}>
                      <div>
                        <h3 className={`text-xl font-bold ${exp.color} leading-tight`}>{exp.role}</h3>
                        <p className="text-lg font-semibold text-white/90">{exp.company}</p>
                      </div>
                      <div className="hidden md:block">
                        <Briefcase className={`w-6 h-6 ${exp.color}`} />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground pointer-events-none" style={{ transform: "translateZ(10px)" }}>
                      <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="whitespace-nowrap">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="whitespace-nowrap">{exp.location}</span>
                      </div>
                    </div>

                    <p className="text-white/70 leading-relaxed pointer-events-none text-sm md:text-base">
                      {exp.description}
                    </p>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
