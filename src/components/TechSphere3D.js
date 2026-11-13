import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { playClickSound } from '@/utils/audio';
import { useTheme } from '../pages/_app';

const techItems = [
  'Python', 'FastAPI', 'React 19', 'Gemini Vision', 'Offline AI',
  'TypeScript', 'JavaScript', 'TailwindCSS', 'C/C++', 'SQL',
  'Node.js', 'MongoDB', 'Uvicorn', 'Pydantic', 'Scikit-learn',
  'Git', 'GitHub', 'Linux Shell', 'Vite', 'Next.js',
  'WebRTC', 'REST APIs', 'P2P Mesh', 'Three.js 3D', 'HTML5/CSS3'
];

export default function TechSphere3D({ onSelectTag }) {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const mouseRef = useRef({ targetX: 0.003, targetY: 0.004 });
  const { soundEnabled } = useTheme();

  useEffect(() => {
    const count = techItems.length;
    const radius = 175; // Sphere radius in pixels
    const phiSpan = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    // Generate 3D spherical coordinates using Fibonacci sphere algorithm
    const coords = techItems.map((name, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;

      return {
        x: Math.cos(theta) * radiusAtY * radius,
        y: y * radius,
        z: Math.sin(theta) * radiusAtY * radius,
      };
    });

    let animationFrameId;
    let rotationSpeedX = 0.003;
    let rotationSpeedY = 0.004;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseRef.current.targetX = -y * 0.015;
      mouseRef.current.targetY = x * 0.015;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0.003;
      mouseRef.current.targetY = 0.004;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    const focalLength = 300;

    // Continuous 3D rotation matrix animation loop using direct DOM manipulation for 60-120fps
    const rotate = () => {
      rotationSpeedX += (mouseRef.current.targetX - rotationSpeedX) * 0.05;
      rotationSpeedY += (mouseRef.current.targetY - rotationSpeedY) * 0.05;

      const cosX = Math.cos(rotationSpeedX);
      const sinX = Math.sin(rotationSpeedX);
      const cosY = Math.cos(rotationSpeedY);
      const sinY = Math.sin(rotationSpeedY);

      for (let i = 0; i < coords.length; i++) {
        const item = coords[i];

        // Rotate around X axis
        const y1 = item.y * cosX - item.z * sinX;
        const z1 = item.z * cosX + item.y * sinX;

        // Rotate around Y axis
        const x2 = item.x * cosY + z1 * sinY;
        const z2 = z1 * cosY - item.x * sinY;

        item.x = x2;
        item.y = y1;
        item.z = z2;

        const el = elementsRef.current[i];
        if (el) {
          const scale = focalLength / (focalLength - item.z);
          const alpha = (item.z + 175) / 350;
          const zIndex = Math.round(item.z + 200);

          el.style.transform = `translate3d(${item.x.toFixed(1)}px, ${item.y.toFixed(1)}px, 0) scale(${Math.max(
            0.55,
            Math.min(1.25, scale)
          ).toFixed(2)})`;
          el.style.opacity = Math.max(0.2, Math.min(1, alpha * 0.85 + 0.15)).toFixed(2);
          el.style.zIndex = zIndex;
        }
      }

      animationFrameId = requestAnimationFrame(rotate);
    };

    animationFrameId = requestAnimationFrame(rotate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="relative py-12 flex flex-col items-center justify-center overflow-hidden">
      <div className="text-center mb-6 space-y-1">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-accentGold text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Tech Sphere</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Move your cursor over the sphere to interact and rotate in 3D space
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      >
        {techItems.map((name, i) => (
          <button
            key={name}
            ref={(el) => (elementsRef.current[i] = el)}
            onClick={() => {
              playClickSound(soundEnabled);
              if (onSelectTag) onSelectTag(name);
            }}
            className="absolute px-3 py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 bg-white/80 dark:bg-darkCard/90 backdrop-blur-md border border-slate-200/90 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-slate-950 hover:bg-primary dark:hover:bg-primary hover:border-primary/80 shadow-sm hover:shadow-glow-gold will-change-transform"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
