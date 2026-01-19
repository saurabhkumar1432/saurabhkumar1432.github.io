'use client';

import { useRef } from 'react';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Footer() {
  const container = useRef(null);

  useGSAP(() => {
    // Magnetic Button Effect for Footer CTA
    const button = document.querySelector('.cta-btn') as HTMLElement;
    if (button) {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(button, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
        gsap.to(button.querySelector('.btn-text'), { x: x * 0.1, y: y * 0.1, duration: 0.3 });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        gsap.to(button.querySelector('.btn-text'), { x: 0, y: 0, duration: 0.5 });
      });
    }
  }, { scope: container });

  return (
    <footer ref={container} className="py-20 border-t border-white/5 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 relative z-10">
        <div>
          <h2 className="text-4xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-white/80 to-white/40">
            LET'S <br />WORK TOGETHER
          </h2>
          <p className="text-muted-foreground text-xl mb-12 max-w-sm leading-relaxed">
            Building the next generation of digital experiences? I'm ready to join your team.
          </p>
          
          <a 
            href="mailto:saurabhkumar1432001@gmail.com"
            className="cta-btn group inline-flex items-center justify-center w-full md:w-auto px-10 py-6 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            data-cursor-text="Say Hello"
          >
            <span className="btn-text flex items-center gap-3">
              saurabhkumar1432001@gmail.com
              <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
            </span>
          </a>
        </div>
        
        <div className="flex flex-col justify-end md:items-end gap-12">
          <div className="flex gap-4 md:gap-8 flex-wrap">
            {[
                { name: "Github", url: "https://github.com/saurabhkumar1432" },
                { name: "Linkedin", url: "https://www.linkedin.com/in/saurabhkumar14" },
                { name: "Twitter", url: "#" }
            ].map((link) => (
                <a 
                    key={link.name} 
                    href={link.url} 
                    target="_blank" 
                    className="relative px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium uppercase tracking-wider"
                >
                    {link.name}
                </a>
            ))}
          </div>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            © 2026 Saurabh Kumar <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Bengaluru / Pune
          </p>
        </div>
      </div>
    </footer>
  );
}
