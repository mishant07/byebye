'use client';
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function BackgroundDepth({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse spotlight glow
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      
      {/* 1. Film Grain / Noise Overlay (3-4% opacity) */}
      <div className="film-grain" />

      {/* 2. Interactive Spotlight Glow following cursor */}
      {!isTouchDevice && (
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-40 dark:opacity-25"
          animate={{
            background: isDark
              ? 'radial-gradient(circle, rgba(76, 125, 255, 0.16) 0%, rgba(214, 179, 106, 0.08) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(214, 179, 106, 0.18) 0%, rgba(76, 125, 255, 0.08) 50%, transparent 70%)',
          }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* 3. Stadium Floodlight Beams (Pulsing diagonal light cones from hero top corners) */}
      <div className="absolute top-0 left-0 w-full h-[650px] overflow-hidden pointer-events-none opacity-40 dark:opacity-60">
        {/* Left floodlight beam */}
        <div
          className="absolute -top-16 -left-20 w-[450px] h-[850px] origin-top-left animate-beam-pulse"
          style={{
            background: isDark
              ? 'conic-gradient(from 120deg at 10% 0%, rgba(76, 125, 255, 0.18) 0deg, rgba(214, 179, 106, 0.12) 25deg, transparent 55deg)'
              : 'conic-gradient(from 120deg at 10% 0%, rgba(214, 179, 106, 0.15) 0deg, rgba(76, 125, 255, 0.08) 25deg, transparent 55deg)',
            filter: 'blur(35px)',
          }}
        />

        {/* Right floodlight beam */}
        <div
          className="absolute -top-16 -right-20 w-[450px] h-[850px] origin-top-right animate-beam-pulse"
          style={{
            background: isDark
              ? 'conic-gradient(from 200deg at 90% 0%, transparent 0deg, rgba(214, 179, 106, 0.14) 25deg, rgba(76, 125, 255, 0.16) 50deg)'
              : 'conic-gradient(from 200deg at 90% 0%, transparent 0deg, rgba(76, 125, 255, 0.10) 25deg, rgba(214, 179, 106, 0.16) 50deg)',
            filter: 'blur(35px)',
            animationDelay: '3s',
          }}
        />
      </div>

      {/* 4. Slow-moving Aurora Mesh Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-45">
        {/* Navy/Blue Blob */}
        <div
          className="absolute -top-[10%] left-[15%] w-[600px] h-[550px] rounded-full blur-[140px] animate-aurora"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(76, 125, 255, 0.18) 0%, rgba(17, 26, 51, 0.4) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(76, 125, 255, 0.10) 0%, transparent 70%)',
          }}
        />

        {/* Champagne Gold Accent Blob */}
        <div
          className="absolute top-[35%] right-[5%] w-[520px] h-[520px] rounded-full blur-[130px] animate-aurora"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(214, 179, 106, 0.13) 0%, rgba(10, 15, 30, 0.3) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(214, 179, 106, 0.14) 0%, transparent 70%)',
            animationDelay: '5s',
          }}
        />

        {/* Deep Midnight Navy Base Blob */}
        <div
          className="absolute -bottom-[10%] left-[30%] w-[700px] h-[600px] rounded-full blur-[160px] animate-aurora"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(76, 125, 255, 0.12) 0%, rgba(10, 15, 30, 0.6) 70%, transparent 90%)'
              : 'radial-gradient(circle, rgba(214, 179, 106, 0.08) 0%, transparent 70%)',
            animationDelay: '9s',
          }}
        />
      </div>

      {/* 5. Faint Pitch-Line Center Circle & Touchlines (Parallax backdrop) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] dark:opacity-[0.055]">
        <svg
          viewBox="0 0 1000 1400"
          className="w-full max-w-5xl h-auto stroke-current text-gold fill-none"
          strokeWidth="1.5"
        >
          {/* Outer Boundary */}
          <rect x="50" y="50" width="900" height="1300" rx="4" />
          {/* Halfway line */}
          <line x1="50" y1="700" x2="950" y2="700" />
          {/* Center Circle */}
          <circle cx="500" cy="700" r="160" />
          <circle cx="500" cy="700" r="4" fill="currentColor" />
          {/* Top Penalty Box */}
          <rect x="250" y="50" width="500" height="240" />
          <rect x="360" y="50" width="280" height="90" />
          <path d="M 400 290 A 110 110 0 0 0 600 290" />
          {/* Bottom Penalty Box */}
          <rect x="250" y="1110" width="500" height="240" />
          <rect x="360" y="1260" width="280" height="90" />
          <path d="M 400 1110 A 110 110 0 0 1 600 1110" />
        </svg>
      </div>

    </div>
  );
}

