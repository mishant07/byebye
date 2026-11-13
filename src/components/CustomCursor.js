import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing outer ring
  const springX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target;
      const interactiveEl = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor-text');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Outer Trailing Ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.75 : isHovered ? (cursorText ? 2.5 : 1.7) : 1,
          borderColor: isHovered ? 'rgba(88, 230, 217, 0.9)' : 'rgba(182, 62, 150, 0.5)',
          backgroundColor: isHovered
            ? 'rgba(88, 230, 217, 0.12)'
            : 'rgba(182, 62, 150, 0.03)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="fixed top-0 left-0 pointer-events-none z-[100] w-10 h-10 rounded-full border-2 backdrop-blur-[1px] flex items-center justify-center"
      >
        {cursorText && (
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* 2. Inner Fast Point Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 pointer-events-none z-[101] w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primaryDark shadow-[0_0_8px_rgba(88,230,217,0.8)]"
      />
    </>
  );
}

