'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5" id="contact">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 italic">Let's <br />Collaborate.</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-sm">
            Interested in building something AI-native or local-first? I'm always open to discussing new projects.
          </p>
          <a 
            href="mailto:saurabhkumar1432@gmail.com"
            className="inline-flex items-center gap-2 text-2xl font-semibold hover:underline decoration-white/20 underline-offset-8"
          >
            saurabhkumar1432@gmail.com
            <ArrowUpRight className="w-6 h-6 border border-white/20 rounded-full p-0.5" />
          </a>
        </div>
        
        <div className="flex flex-col justify-end md:items-end gap-12">
          <div className="flex gap-8">
            <a href="https://github.com/saurabhkumar1432" target="_blank" className="hover:text-muted-foreground transition-colors">Github</a>
            <a href="https://linkedin.com/in/saurabh-kumar14" target="_blank" className="hover:text-muted-foreground transition-colors">Linkedin</a>
            <a href="#" className="hover:text-muted-foreground transition-colors">CV</a>
          </div>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            © 2026 Saurabh Kumar <span className="w-1 h-1 rounded-full bg-blue-500" /> IIIT Sri City
          </p>
        </div>
      </div>
    </footer>
  );
}
