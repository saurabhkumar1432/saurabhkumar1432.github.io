'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  contentStrength?: number;
  duration?: number;
  returnEase?: string;
  className?: string;
  tagName?: 'button' | 'a' | 'div' | 'span';
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
}

export function MagneticElement({
  children,
  strength = 0.3,
  contentStrength = 0.1,
  duration = 0.3,
  returnEase = 'elastic.out(1, 0.4)',
  className = '',
  tagName: Tag = 'div',
  disabled = false,
  onClick,
  href,
  target
}: MagneticElementProps) {
  const elementRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasContentRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    const content = contentRef.current;

    if (!element || disabled) return;

    const xTo = gsap.quickTo(element, "x", { duration, ease: "power2.out" });
    const yTo = gsap.quickTo(element, "y", { duration, ease: "power2.out" });
    const xToContent = content && hasContentRef.current ? gsap.quickTo(content, "x", { duration, ease: "power2.out" }) : null;
    const yToContent = content && hasContentRef.current ? gsap.quickTo(content, "y", { duration, ease: "power2.out" }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      xTo(x * strength);
      yTo(y * strength);
      if (content && xToContent && yToContent && hasContentRef.current) {
        xToContent(x * contentStrength);
        yToContent(y * contentStrength);
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: returnEase });
      if (content && hasContentRef.current) {
        gsap.to(content, { x: 0, y: 0, duration: 0.5 });
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, contentStrength, duration, returnEase, disabled]);

  const props: any = {
    ref: elementRef,
    className: `magnetic-element ${className}`,
    onClick,
  };

  if (href) {
    props.href = href;
    if (target) props.target = target;
  }

  hasContentRef.current = !!contentRef;

  return (
    <Tag {...props}>
      {children}
    </Tag>
  );
}
