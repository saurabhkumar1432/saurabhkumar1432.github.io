'use client';

import { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  github: string;
  color: string;
  id: string;
  icon: React.ReactNode;
}

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      const tl = gsap.timeline();

      // Overlay fade in
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      // Modal slide up and scale
      .fromTo(modalRef.current, 
        { y: 100, scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" },
        "-=0.1"
      )
      // Content stagger
      .from(".modal-stagger", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4
      }, "-=0.2");

      document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

  }, { dependencies: [isOpen] });

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose
    });

    tl.to(modalRef.current, {
      y: 100,
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.2
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        ref={overlayRef} 
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md opacity-0 transition-opacity"
      />

      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col opacity-0"
      >
        {/* Header Image / Gradient */}
        <div className={`h-48 md:h-64 w-full bg-gradient-to-br ${project.color} relative overflow-hidden shrink-0`}>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
          <div className="absolute top-6 right-6 z-10">
            <button 
              onClick={handleClose}
              className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors border border-white/10 group"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
            </button>
          </div>
          
          <div className="absolute bottom-6 left-6 md:left-10">
            <div className="modal-stagger flex items-center gap-3 mb-2">
                 <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium uppercase tracking-wider text-white">
                    {project.category}
                 </span>
            </div>
            <h2 className="modal-stagger text-4xl md:text-6xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content Scrollable Area */}
        <div 
            className="flex-1 overflow-y-auto custom-scrollbar"
            data-lenis-prevent
        >
            <div className="p-6 md:p-10 grid md:grid-cols-[1.5fr_1fr] gap-12">
                
                {/* Left Column: Description */}
                <div className="space-y-8">
                    <div className="modal-stagger">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-white/90">
                           Overview
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {project.description}
                        </p>
                        <p className="mt-4 text-muted-foreground leading-relaxed">
                            This project was built to address real-world scalability challenges. 
                            Leveraging modern architecture, it ensures performance, security, and a seamless user experience.
                            (Placeholder for extended case study text...)
                        </p>
                    </div>

                     <div className="modal-stagger">
                        <h3 className="text-xl font-semibold mb-4 text-white/90">Key Features</h3>
                        <ul className="space-y-3">
                            {['Real-time Synchronization', 'AI-Powered Analysis', 'Enterprise-Grade Security', 'Responsive Design System'].map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Metadata & Links */}
                <div className="space-y-8 p-6 rounded-2xl bg-white/5 border border-white/5 h-fit">
                    
                    <div className="modal-stagger space-y-4">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-white/40">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-white/80">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="modal-stagger space-y-4">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-white/40">Links</h3>
                        <div className="flex gap-3">
                            <a 
                                href={project.github} 
                                target="_blank"
                                className="flex-1 flex items-center justify-center gap-2 p-3 bg-white text-black rounded-xl font-semibold hover:bg-white/90 transition-colors"
                            >
                                <Github className="w-5 h-5" />
                                View Code
                            </a>
                             <a 
                                href="#" 
                                className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/10 text-white border border-white/10 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Live Demo
                            </a>
                        </div>
                    </div>

                    <div className="modal-stagger pt-4 border-t border-white/10">
                        <span className="text-xs text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            Completed 2024
                        </span>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
