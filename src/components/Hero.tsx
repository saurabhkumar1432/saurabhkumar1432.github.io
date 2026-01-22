'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDownRight, Github, Linkedin, Mail } from 'lucide-react';
import SplitType from 'split-type';
import { MagneticElement } from '@/components/MagneticElement';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { FloatingElements } from '@/components/FloatingElements';

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const titleText = new SplitType(titleRef.current, { types: 'chars' });
    const subtitleText = new SplitType(subtitleRef.current, { types: 'chars' });

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

    return () => {
      titleText.revert();
      subtitleText.revert();
    };

  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen flex flex-col justify-center px-6 lg:px-20 overflow-hidden pt-20">
      <FloatingElements count={15} colors={['#3b82f6', '#8b5cf6', '#06b6d4']} enableMouseInteraction={true} enableColorShift={true} />

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

               <div className="flex gap-12 pt-4 border-t border-white/10 opacity-60">
                  <div>
                     <span className="block text-2xl font-bold text-white">
                        <AnimatedCounter value={2} suffix="+" duration={2} />
                     </span>
                     <span className="text-sm uppercase tracking-wider">Years Exp</span>
                  </div>
                  <div>
                     <span className="block text-2xl font-bold text-white">
                        <AnimatedCounter value={10} suffix="+" duration={2.5} />
                     </span>
                     <span className="text-sm uppercase tracking-wider">Projects</span>
                  </div>
               </div>
          </div>

          <div className="hero-social flex flex-col items-start lg:items-end gap-6">
            <MagneticElement
              href="#projects"
              strength={0.3}
              contentStrength={0.1}
              duration={0.3}
              className="group bg-white text-black px-10 py-5 rounded-full font-bold transition-all text-lg shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-white/90 w-full md:w-auto text-center no-underline"
              tagName="a"
              data-cursor-text="View Work"
            >
              <span className="flex items-center justify-center gap-3">
                PROJECTS
                <ArrowDownRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
              </span>
            </MagneticElement>

            <div className="flex gap-2">
               {[
                 { icon: <Github />, href: "https://github.com/saurabhkumar1432", label: "GitHub" },
                 { icon: <Linkedin />, href: "https://www.linkedin.com/in/saurabhkumar14", label: "LinkedIn" },
                 { icon: <Mail />, href: "mailto:saurabhkumar1432001@gmail.com", label: "Email" }
               ].map((social, i) => (
                 <MagneticElement
                   key={i}
                   href={social.href}
                   target="_blank"
                   strength={0.2}
                   contentStrength={0.05}
                   duration={0.3}
                   className="flex items-center justify-center w-14 h-14 rounded-full border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all group relative bg-black/20 backdrop-blur-sm no-underline"
                   data-cursor-text={social.label}
                   tagName="a"
                 >
                   <span className="group-hover:scale-110 transition-transform duration-300">
                     {social.icon}
                   </span>
                 </MagneticElement>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
