'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-20 overflow-hidden pt-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-[10%] w-[40vw] h-[40vw] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-20 left-[10%] w-[30vw] h-[30vw] bg-purple-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium tracking-wider text-emerald-500 uppercase">
            Available for new opportunities
          </span>
        </motion.div>

        <motion.h1 
          className="text-7xl md:text-[10rem] font-bold tracking-tight mb-8 leading-[0.8] mix-blend-difference"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          ENGINEERING <br /> 
          <span className="text-muted-foreground italic font-light">EXPERIENCES.</span>
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-end">
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Saurabh Kumar. Full Stack Developer based in India. 
            Crafting <span className="text-foreground border-b-2 border-white/20 hover:border-white transition-colors cursor-help">next-gen AI tools</span> and high-performance SaaS applications with local-first precision.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="#projects" 
              className="group flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all text-lg shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              PROJECTS
              <ArrowDownRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
            </a>
            
            <div className="flex gap-2">
              {[
                { icon: <Github />, href: "https://github.com/saurabhkumar1432" },
                { icon: <Linkedin />, href: "https://linkedin.com/in/saurabh-kumar14" },
                { icon: <Mail />, href: "mailto:saurabhkumar1432@gmail.com" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank" 
                  className="flex items-center justify-center w-16 h-16 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
