'use client';

import { motion } from 'framer-motion';

const skills = [
  "Typescript", "React", "Next.js", "Kotlin", "Spring Boot", 
  "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Framer Motion", 
  "Node.js", "React Native", "Git", "Python", "Java"
];

export function Skills() {
  return (
    <section className="py-24 overflow-hidden border-t border-white/5" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-12 text-center opacity-50 uppercase tracking-widest">Tech Stack</h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="px-6 py-3 rounded-2xl glass border border-white/5 text-sm font-medium hover:border-white/20 transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
