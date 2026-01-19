'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-6"
    >
      <nav className="flex items-center gap-8 px-6 py-3 rounded-full glass border border-white/10 shadow-2xl">
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="w-px h-4 bg-white/10" />

        <div className="flex items-center gap-4">
          <a href="https://github.com/saurabhkumar1432" target="_blank" className="p-1 hover:text-foreground/80 transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/saurabh-kumar14" target="_blank" className="p-1 hover:text-foreground/80 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:saurabhkumar1432@gmail.com" className="p-1 hover:text-foreground/80 transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
