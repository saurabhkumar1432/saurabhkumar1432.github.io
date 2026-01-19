'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-[10%] w-[30vw] h-[30vw] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 left-[10%] w-[25vw] h-[25vw] bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium mb-8 backdrop-blur-sm">
            Available for new opportunities
          </span>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Saurabh <br /> 
          <span className="text-muted-foreground">Kumar</span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Full Stack Developer at <span className="text-foreground font-semibold">IIIT Sri City</span>. 
          Focusing on AI-native architectures, local-first apps, and seamless SaaS experiences.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="#projects" 
            className="group flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            View Projects
            <ArrowDownRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </a>
          <a 
            href="#contact" 
            className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold border border-white/10 hover:bg-white/5 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-6 lg:left-20 flex items-center gap-4 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="w-px h-12 bg-border" />
        <p className="rotate-180 [writing-mode:vertical-lr]">SCROLL TO EXPLORE</p>
      </motion.div> section
    </section>
  );
}
