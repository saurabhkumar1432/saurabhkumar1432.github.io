'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDownRight, Github, Linkedin, Mail } from 'lucide-react';
import SplitType from 'split-type';
import { Background3D } from '@/components/Background3D';

export function Hero() {
  const container = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Split Text
    const titleText = new SplitType(titleRef.current!, { types: 'chars' });
    const subtitleText = new SplitType(subtitleRef.current!, { types: 'chars' });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-badge", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.2
    })
    .from(titleText.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      rotateX: -90,
      transformOrigin: "bottom center",
    }, "-=0.4")
    .from(subtitleText.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      rotateX: -90,
      transformOrigin: "bottom center",
    }, "-=0.8")
    .from(".hero-desc", {
      y: 20,
      opacity: 0,
      duration: 0.8
    }, "-=0.6")
    .from(".hero-social", {
      scale: 0.9,
      opacity: 0,
      duration: 0.6
    }, "-=0.6");

    // Magnetic Button Effect
    const button = document.querySelector('.magnetic-btn') as HTMLElement;
    if (button) {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(button, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
        gsap.to(button.querySelector('.btn-content'), { x: x * 0.1, y: y * 0.1, duration: 0.3 });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        gsap.to(button.querySelector('.btn-content'), { x: 0, y: 0, duration: 0.5 });
      });
    }

    return () => {
      titleText.revert();
      subtitleText.revert();
    };

  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen flex flex-col justify-center px-6 lg:px-20 overflow-hidden pt-20">
      <Background3D />
      
      {/* Background Decorative Elements - Reduced Opacity for 3D to shine */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-b from-blue-500/10 to-purple-500/10 blur-[120px] rounded-full animate-pulse opacity-30" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gradient-to-t from-emerald-500/10 to-blue-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s] opacity-30" />

      <div className="relative z-10 w-full max-w-[90rem] mx-auto">
        <div className="hero-badge flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium tracking-wider text-emerald-500 uppercase">
             SDE @ IBM ISL | IIITS&apos;24
          </span>
        </div>

        <h1 className="text-[12vw] font-black tracking-tighter mb-8 leading-[0.8] mix-blend-difference w-full">
          <div ref={titleRef} className="hero-title-line block overflow-hidden">SAURABH</div> 
          <div ref={subtitleRef} className="hero-title-line block text-muted-foreground/80 italic font-light overflow-hidden translate-x-[5vw]">KUMAR</div>
        </h1>

        <div className="grid lg:grid-cols-2 gap-12 items-end w-full">
          <div className="space-y-6">
              <p className="hero-desc text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                Software Developer blending <span className="text-foreground font-medium">Performance</span> and <span className="text-foreground font-medium">Data Security</span>. 
                Currently crafting resilient systems at IBM. Previously building scalable tech at D2C Ecommerce.
              </p>
              
              {/* Stats/Info Grid for filling space */}
              <div className="flex gap-12 pt-4 border-t border-white/10 opacity-60">
                 <div>
                    <span className="block text-2xl font-bold text-white">2+</span>
                    <span className="text-sm uppercase tracking-wider">Years Exp</span>
                 </div>
                 <div>
                    <span className="block text-2xl font-bold text-white">10+</span>
                    <span className="text-sm uppercase tracking-wider">Projects</span>
                 </div>
              </div>
          </div>

          <div className="hero-social flex flex-col items-start lg:items-end gap-6">
            <a 
              href="#projects" 
              className="magnetic-btn group bg-white text-black px-10 py-5 rounded-full font-bold transition-all text-lg shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-white/90 hover:scale-105 w-full md:w-auto text-center"
              data-cursor-text="View Work"
            >
              <span className="btn-content flex items-center justify-center gap-3">
                PROJECTS
                <ArrowDownRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
              </span>
            </a>
            
            <div className="flex gap-2">
              {[
                { icon: <Github />, href: "https://github.com/saurabhkumar1432", label: "GitHub" },
                { icon: <Linkedin />, href: "https://www.linkedin.com/in/saurabhkumar14", label: "LinkedIn" },
                { icon: <Mail />, href: "mailto:saurabhkumar1432001@gmail.com", label: "Email" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank" 
                  className="hero-social-icon flex items-center justify-center w-14 h-14 rounded-full border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all group relative bg-black/20 backdrop-blur-sm"
                  data-cursor-text={social.label}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
