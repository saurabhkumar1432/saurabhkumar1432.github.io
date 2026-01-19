'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Smartphone, Zap, Bot, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const projects = [
  {
    title: "NotebookLM Mobile",
    description: "Multi-source research AI platform with local-first sync using WatermelonDB. Syncs PDFs, YouTube, and Web URLs.",
    icon: <Smartphone className="w-6 h-6" />,
    tags: ["React Native", "WatermelonDB", "AI"],
    github: "https://github.com/saurabhkumar1432/NotebookLM",
    className: "md:col-span-2 md:row-span-2 bg-blue-500/10 border-blue-500/20",
    feature: "Local-First Sync"
  },
  {
    title: "Restaurant SaaS",
    description: "A full-featured website builder for restaurateurs. QR menus & real-time analytics.",
    icon: <Globe className="w-6 h-6" />,
    tags: ["React", "Typescript", "Drizzle"],
    github: "https://github.com/saurabhkumar1432/Restraunt_builder",
    className: "md:col-span-2 md:row-span-1 bg-emerald-500/10 border-emerald-500/20",
    feature: "Live Preview"
  },
  {
    title: "Voice Notes AI",
    description: "Transforms voice into structured insights. Android native with on-device intelligence.",
    icon: <Bot className="w-6 h-6" />,
    tags: ["Kotlin", "Jetpack Compose", "OpenAI"],
    github: "https://github.com/saurabhkumar1432/instantNotes",
    className: "md:col-span-1 md:row-span-1 bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "MentorShala",
    description: "Industry-student networking hub built for scale and community impact.",
    icon: <Code className="w-6 h-6" />,
    tags: ["React", "Node.js"],
    github: "https://github.com/saurabhkumar1432/Mentorshala-react",
    className: "md:col-span-1 md:row-span-1 bg-orange-500/10 border-orange-500/20",
  },
  {
    title: "Space Trapped",
    description: "High-octane survival game exploring physics and collision logic.",
    icon: <Zap className="w-6 h-6" />,
    tags: ["Python", "Pygame"],
    github: "https://github.com/saurabhkumar1432/bird-trapped-in-space-game",
    className: "md:col-span-2 md:row-span-1 bg-rose-500/10 border-rose-500/20",
  }
];

export function ProjectGrid() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20" id="projects">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Selected Works</h2>
        <p className="text-muted-foreground max-w-2xl">
          A collection of projects ranging from AI-native mobile apps to scalable SaaS platforms.
        </p>
      </motion.div>

      <div className="bento-grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={cn(
              "group relative overflow-hidden rounded-3xl border p-8 flex flex-col justify-between transition-all",
              project.className
            )}
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-background/50 backdrop-blur-sm border ring-1 ring-white/10 group-hover:scale-110 transition-transform">
                  {project.icon}
                </div>
                <div className="flex gap-2">
                  <a href={project.github} target="_blank" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-medium bg-white/5 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
