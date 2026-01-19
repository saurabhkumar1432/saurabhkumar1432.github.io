'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const container = useRef(null);
  const mobileMenuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.from(container.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.5
    });

    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        gsap.to(container.current, { y: -100, duration: 0.3, ease: 'power2.inOut' });
      } else {
        gsap.to(container.current, { y: 0, duration: 0.3, ease: 'power2.inOut' });
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, { scope: container });

  useGSAP(() => {
    if (isMenuOpen) {
        gsap.to(mobileMenuRef.current, {
            clipPath: "circle(150% at 100% 0%)",
            duration: 1,
            ease: "power4.inOut",
            pointerEvents: "all"
        });
        gsap.fromTo(".mobile-link", 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, delay: 0.3 }
        );
        document.body.style.overflow = 'hidden';
    } else {
        gsap.to(mobileMenuRef.current, {
            clipPath: "circle(0% at 100% 0%)",
            duration: 0.8,
            ease: "power4.inOut",
            pointerEvents: "none"
        });
        document.body.style.overflow = 'auto';
    }
  }, { dependencies: [isMenuOpen] });

  return (
    <>
    <header
      ref={container}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-6"
    >
      <nav className="flex items-center gap-2 px-2 py-2 rounded-full glass border border-white/10 shadow-2xl bg-black/50 backdrop-blur-xl">
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="relative px-5 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors rounded-full hover:bg-white/10"
                data-cursor-text="Navigate"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="hidden md:block w-px h-4 bg-white/10 mx-2" />

        <div className="flex items-center gap-1">
          <a href="https://github.com/saurabhkumar1432" target="_blank" className="p-3 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-all" data-cursor-text="GitHub" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/saurabhkumar14" target="_blank" className="p-3 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-all" data-cursor-text="LinkedIn" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:saurabhkumar1432001@gmail.com" className="p-3 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-all" data-cursor-text="Email" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        
        {/* Mobile Menu Toggle */}
         <button 
           className="md:hidden p-3 text-white rounded-full bg-white/10 relative z-[60]" 
           onClick={() => setIsMenuOpen(!isMenuOpen)}
           aria-label="Toggle Menu"
         >
           {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
         </button>
      </nav>
    </header>

    {/* Full Screen Mobile Menu */}
    <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-[55] bg-black text-white flex flex-col items-center justify-center md:hidden"
        style={{ clipPath: "circle(0% at 100% 0%)", pointerEvents: "none" }}
    >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        
        <ul className="flex flex-col gap-6 text-center z-10">
            {navLinks.map((link) => (
                <li key={link.name} className="overflow-hidden">
                    <a
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="mobile-link block text-5xl font-black tracking-tighter hover:text-blue-500 transition-colors"
                    >
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>

        <div className="mobile-link mt-12 flex gap-6">
             <a href="https://github.com/saurabhkumar1432" target="_blank" className="p-4 bg-white/5 rounded-full" aria-label="Github mobile"><Github className="w-6 h-6" /></a>
             <a href="https://www.linkedin.com/in/saurabhkumar14" target="_blank" className="p-4 bg-white/5 rounded-full" aria-label="LinkedIn mobile"><Linkedin className="w-6 h-6" /></a>
             <a href="mailto:saurabhkumar1432001@gmail.com" className="p-4 bg-white/5 rounded-full" aria-label="Email mobile"><Mail className="w-6 h-6" /></a>
        </div>
    </div>
    </>
  );
}
