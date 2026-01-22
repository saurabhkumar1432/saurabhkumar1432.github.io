'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface ParticleConfig {
  maxParticles: number;
  particleSize: number;
  fadeSpeed: number;
  gravity: number;
  colors: string[];
}

const SECTION_COLORS: Record<string, string[]> = {
  hero: ['#a855f7', '#3b82f6'],
  experience: ['#3b82f6', '#10b981'],
  skills: ['#a855f7', '#ec4899', '#10b981'],
  projects: ['#f472b6', '#fbbf24', '#34d399'],
  education: ['#10b981', '#06b6d4'],
  contact: ['#8b5cf6', '#ec4899'],
  default: ['#ffffff', '#9ca3af']
};

export function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const animationFrameRef = useRef(0);
  const [currentSection, setCurrentSection] = useState('default');

  const colors = SECTION_COLORS[currentSection] || SECTION_COLORS.default;

  const config: ParticleConfig = {
    maxParticles: 60,
    particleSize: 3,
    fadeSpeed: 0.02,
    gravity: 0.05,
    colors
  };

  const spawnParticle = useCallback((x: number, y: number, speed: number) => {
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const velocity = speed * (0.5 + Math.random());

    particlesRef.current.push({
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      life: 1,
      maxLife: 60 + Math.random() * 40,
      color,
      size: config.particleSize * (0.5 + Math.random())
    });

    if (particlesRef.current.length > config.maxParticles) {
      particlesRef.current.shift();
    }
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseRef.current.lastX;
      const dy = e.clientY - mouseRef.current.lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (speed > 2) {
        spawnParticle(e.clientX, e.clientY, Math.min(speed / 10, 3));
      }

      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(p => p.life > 0);

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += config.gravity;
        p.life -= config.fadeSpeed;
        p.vx *= 0.99;
        p.vy *= 0.99;

        const alpha = Math.max(0, p.life);
        const radius = Math.max(0, p.size * p.life);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [config, spawnParticle]);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute('data-section');
            if (section) {
              setCurrentSection(section);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(section => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
