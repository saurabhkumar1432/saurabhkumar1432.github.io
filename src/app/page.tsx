import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { ParticleTrail } from "@/components/ParticleTrail";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <ParticleTrail />
      <Hero />
      <Experience />
      <Skills />
      <ProjectGrid />
      <Education />
      <Footer />
    </main>
  );
}
