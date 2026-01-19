'use client';

import { motion } from 'framer-motion';

const skills = [
  "Typescript", "React", "Next.js", "Kotlin", "Spring Boot", 
  "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Framer Motion", 
  "Node.js", "React Native", "Git", "Python", "Java", "Docker", "AWS"
];

export function Skills() {
  return (
    <section className="py-32 overflow-hidden border-y border-white/5" id="about">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-8">About Me</h2>
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/80">
            Passionate Full-Stack Developer currently studying at <span className="text-white font-medium italic">IIIT Sri City</span>. 
            I translate complex ideas into <span className="italic">functional, performant, and beautiful</span> digital experiences. 
            Specializing in high-impact products from AI-native mobile apps to scalable SaaS architectures.
          </p>
        </motion.div>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-12">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={i}
              className="mx-8 text-4xl md:text-6xl font-bold text-white/10 uppercase hover:text-white/40 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
