'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface FloatingShape {
  id: string;
  type: 'circle' | 'square' | 'triangle' | 'blob' | 'star' | 'hexagon';
  size: number;
  x: number;
  y: number;
  speed: number;
  rotationSpeed: number;
  opacity: number;
  blur: number;
  layer: 'background' | 'middle' | 'foreground';
  color?: string;
  originalColor?: string;
  borderRadius?: string;
}

export interface FloatingElementsProps {
  count?: number;
  shapes?: ('circle' | 'square' | 'triangle' | 'blob' | 'star' | 'hexagon')[];
  enableScrollParallax?: boolean;
  enableVelocitySkew?: boolean;
  enableMouseInteraction?: boolean;
  enableColorShift?: boolean;
  colors?: string[];
  className?: string;
}

function generateShapes(
  count: number,
  types: ('circle' | 'square' | 'triangle' | 'blob' | 'star' | 'hexagon')[],
  colors: string[]
): FloatingShape[] {
  const shapes: FloatingShape[] = [];
  const layers: Array<'background' | 'middle' | 'foreground'> = ['background', 'middle', 'foreground'];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const layer = layers[Math.floor(Math.random() * layers.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const borderRadius = type === 'blob'
      ? `${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% / ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%`
      : undefined;

    shapes.push({
      id: `shape-${i}`,
      type,
      size: 20 + Math.random() * 150,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 2,
      rotationSpeed: (Math.random() - 0.5) * 2,
      opacity: 0.05 + Math.random() * 0.15,
      blur: 20 + Math.random() * 60,
      layer,
      color,
      originalColor: color,
      borderRadius,
    });
  }

  return shapes;
}

function renderShape(shape: FloatingShape) {
  const commonProps = {
    style: {
      width: shape.size,
      height: shape.size,
      opacity: shape.opacity,
      filter: `blur(${shape.blur}px)`,
      backgroundColor: shape.color,
    },
    className: 'absolute will-change-transform transition-colors duration-500',
  };

  switch (shape.type) {
    case 'circle':
      return <div {...commonProps} className="rounded-full" />;
    case 'square':
      return <div {...commonProps} className="rounded-lg" />;
    case 'triangle':
      return (
        <div
          {...commonProps}
          style={{
            ...commonProps.style,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderBottom: `${shape.size}px solid ${shape.color}`,
            borderLeft: `${shape.size / 2}px solid transparent`,
            borderRight: `${shape.size / 2}px solid transparent`,
          }}
        />
      );
    case 'star':
      return (
        <svg
          viewBox="0 0 24 24"
          {...commonProps}
          style={{
            ...commonProps.style,
            width: shape.size,
            height: shape.size,
            backgroundColor: 'transparent',
          }}
        >
          <polygon
            points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
            fill={shape.color}
          />
        </svg>
      );
    case 'hexagon':
      return (
        <svg
          viewBox="0 0 24 24"
          {...commonProps}
          style={{
            ...commonProps.style,
            width: shape.size,
            height: shape.size,
            backgroundColor: 'transparent',
          }}
        >
          <polygon
            points="12,2 21,7 21,17 12,22 3,17 3,7"
            fill={shape.color}
          />
        </svg>
      );
    case 'blob':
      return (
        <div
          {...commonProps}
          style={{
            ...commonProps.style,
            borderRadius: shape.borderRadius,
          }}
        />
      );
    default:
      return <div {...commonProps} className="rounded-full" />;
  }
}

export function FloatingElements({
  count = 20,
  shapes = ['circle', 'square', 'triangle', 'blob', 'star', 'hexagon'],
  enableScrollParallax = true,
  enableVelocitySkew = true,
  enableMouseInteraction = true,
  enableColorShift = false,
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'],
  className = '',
}: FloatingElementsProps) {
  const container = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);
  const initializedRef = useRef(false);
  const [generatedShapes, setGeneratedShapes] = useState<FloatingShape[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;

    setIsMounted(true);
    initializedRef.current = true;

    const isMobile = window.innerWidth < 768;
    const actualCount = isMobile ? Math.floor(count / 2) : count;
    setGeneratedShapes(generateShapes(actualCount, shapes, colors));
  }, [count, shapes, colors]);

  useEffect(() => {
    if (enableMouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [enableMouseInteraction, handleMouseMove]);

  useEffect(() => {
    if (!enableMouseInteraction || !shapesRef.current) return;

    shapesRef.current.forEach((shape, i) => {
      const data = generatedShapes[i];
      if (!data) return;

      const strength = data.layer === 'foreground' ? 30 : data.layer === 'middle' ? 20 : 10;

      gsap.to(shape, {
        x: mousePosition.x * strength,
        y: mousePosition.y * strength,
        duration: 1,
        ease: 'power2.out',
      });
    });
  }, [mousePosition, enableMouseInteraction, generatedShapes]);

  useGSAP(() => {
    if (!container.current || !isMounted) return;

    const shapes = container.current.querySelectorAll('.floating-shape');
    const proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter(shapes, 'skewX', 'deg');
    const clamp = gsap.utils.clamp(-20, 20);

    shapes.forEach((shape, i) => {
      const data = generatedShapes[i];
      const duration = 20 / data.speed;
      const yAmplitude = 30 + Math.random() * 50;

      gsap.to(shape, {
        y: `+=${yAmplitude}`,
        rotation: data.rotationSpeed * 360,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * duration,
      });

      if (enableScrollParallax) {
        const speedMultiplier = data.layer === 'background' ? 0.2 : data.layer === 'middle' ? 0.5 : 0.8;
        gsap.to(shape, {
          y: `+=${window.innerHeight * speedMultiplier}`,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (enableColorShift && enableScrollParallax) {
        const colorIndex = i % colors.length;
        ScrollTrigger.create({
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const progress = self.progress;
            const nextColorIndex = (colorIndex + Math.floor(progress * colors.length)) % colors.length;
            const newColor = colors[nextColorIndex];

            const element = shape as HTMLElement;
            const renderedShape = element.firstElementChild;
            if (renderedShape) {
              if (renderedShape.tagName === 'DIV' && data.type !== 'triangle') {
                gsap.to(renderedShape, {
                  backgroundColor: newColor,
                  duration: 0.3,
                });
              } else if (renderedShape.tagName === 'svg') {
                const polygon = renderedShape.querySelector('polygon');
                if (polygon) {
                  gsap.to(polygon, {
                    fill: newColor,
                    duration: 0.3,
                  });
                }
              } else if (data.type === 'triangle') {
                gsap.to(renderedShape, {
                  borderBottomColor: newColor,
                  duration: 0.3,
                });
              }
            }
          },
        });
      }
    });

    if (enableVelocitySkew) {
      ScrollTrigger.create({
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -500);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: 'power3',
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [enableScrollParallax, enableVelocitySkew, enableColorShift, generatedShapes, colors, isMounted]);

  if (!isMounted) return null;

  return (
    <div ref={container} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {generatedShapes.map((shape, i) => (
        <div
          key={shape.id}
          ref={(el) => {
            if (el) shapesRef.current[i] = el;
          }}
          className="floating-shape"
          style={{
            position: 'absolute',
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            zIndex:
              shape.layer === 'background' ? 1 : shape.layer === 'middle' ? 2 : 3,
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          {renderShape(shape)}
        </div>
      ))}
    </div>
  );
}
