'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Code, Smartphone, Zap, Bot, Globe, ArrowRight } from 'lucide-react';
import { ProjectModal } from '@/components/ProjectModal';
import { MagneticElement } from '@/components/MagneticElement';
import { TextReveal } from '@/components/TextReveal';
import { SpotlitCard } from '@/components/SpotlitCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "NotebookLM Mobile",
    category: "AI Native",
    description: "Multi-source research AI platform with local-first sync using WatermelonDB. Syncs PDFs, YouTube, and Web URLs.",
    icon: <Smartphone className="w-6 h-6" />,
    tags: ["React Native", "WatermelonDB", "AI"],
    github: "https://github.com/saurabhkumar1432/NotebookLM",
    color: "from-blue-500/20 to-cyan-500/20",
    id: "01"
  },
  {
    title: "Restaurant SaaS",
    category: "SaaS Platform",
    description: "A full-featured website builder for restaurateurs. QR menus & real-time analytics dashboards.",
    icon: <Globe className="w-6 h-6" />,
    tags: ["React", "Typescript", "Drizzle"],
    github: "https://github.com/saurabhkumar1432/Restraunt_builder",
    color: "from-emerald-500/20 to-teal-500/20",
    id: "02"
  },
  {
    title: "Voice Notes AI",
    category: "Mobile App",
    description: "Transforms voice into structured insights. Android native with on-device intelligence.",
    icon: <Bot className="w-6 h-6" />,
    tags: ["Kotlin", "Jetpack Compose", "OpenAI"],
    github: "https://github.com/saurabhkumar1432/instantNotes",
    color: "from-purple-500/20 to-pink-500/20",
    id: "03"
  },
  {
    title: "MentorShala",
    category: "EdTech",
    description: "Industry-student networking hub built for scale and community impact.",
    icon: <Code className="w-6 h-6" />,
    tags: ["React", "Node.js"],
    github: "https://github.com/saurabhkumar1432/Mentorshala-react",
    color: "from-orange-500/20 to-red-500/20",
    id: "04"
  },
  {
    title: "IIITS Foodies",
    category: "Campus Tech",
    description: "Campus-wide food ordering system reducing wait times. Modern tech stack for high-concurrency.",
    icon: <Globe className="w-6 h-6" />,
    tags: ["FullStack", "React", "Node.js"],
    github: "https://github.com/saurabhkumar1432/IIITS_Foodies",
    color: "from-yellow-500/20 to-amber-500/20",
    id: "05"
  },
  {
    title: "Space Trapped",
    category: "Game Dev",
    description: "High-octane survival game exploring physics and collision logic.",
    icon: <Zap className="w-6 h-6" />,
    tags: ["Python", "Pygame"],
    github: "https://github.com/saurabhkumar1432/bird-trapped-in-space-game",
    color: "from-rose-500/20 to-red-500/20",
    id: "06"
  }
];

export function ProjectGrid() {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  useGSAP(() => {
    const totalWidth = track.current!.scrollWidth;
    const windowWidth = window.innerWidth;

    if (windowWidth > 768) {
      gsap.to(track.current, {
        x: () => -(totalWidth - windowWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth - windowWidth + 100}`,
          invalidateOnRefresh: true,
        }
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen bg-background overflow-hidden flex flex-col justify-center py-20" id="projects">
      {/* Background Title - z-0 to sit behind cards */}
      <div className="container mx-auto px-6 mb-12 md:absolute md:top-20 md:left-20 max-w-xl z-0 pointer-events-none select-none">
        <TextReveal
          text="Selected Works"
          className="text-5xl md:text-8xl font-black mb-6 text-white/10 tracking-tighter"
          duration={0.8}
          stagger={0.12}
          as="h2"
        />
        <p className="text-white/40 text-lg max-w-sm ml-2 font-light">
          A showcase of technical depth and product craftsmanship. <span className="text-white">Scroll to explore.</span>
        </p>
      </div>

      {/* Cards Track - z-10 to sit on top of title */}
      <div ref={track} className="flex flex-col md:flex-row gap-8 px-6 md:px-[40vw] w-full relative z-10 will-change-transform">
        {projects.map((project, i) => (
          <SpotlitCard
            key={i}
            onClick={() => setActiveProject(project)}
            className="group relative flex-shrink-0 w-full md:w-[600px] h-[400px] project-card cursor-pointer"
            gradient={project.color}
            data-cursor-text="View Case"
          >
            <div className="absolute top-8 right-8 text-6xl font-black text-white/5 select-none">
              {project.id}
            </div>

            <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                    {project.icon}
                  </div>
                  <span className="text-sm font-medium tracking-wider uppercase text-white/60 border border-white/10 px-3 py-1 rounded-full">{project.category}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-8">
                 <div className="flex gap-2 flex-wrap">
                   {project.tags.map(tag => (
                     <span key={tag} className="text-xs font-semibold px-3 py-1 bg-white/5 rounded-full border border-white/5">
                       {tag}
                     </span>
                   ))}
                 </div>

                 <MagneticElement
                   strength={0.15}
                   duration={0.25}
                   returnEase="elastic.out(1, 0.6)"
                   className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform pointer-events-auto"
                   tagName="button"
                   onClick={() => setActiveProject(project)}
                 >
                   <ArrowRight className="w-5 h-5" />
                 </MagneticElement>
              </div>
            </div>
          </SpotlitCard>
        ))}
      </div>

      <ProjectModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
