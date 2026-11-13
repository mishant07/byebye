import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, FileDown, Sparkles, Code2, Cpu, Clock } from 'lucide-react';
import { CircularBadge } from './Icons';
import { profileConfig } from '@/config/profile';
import { useTheme } from '@/pages/_app';

// Lazy-load Three.js football canvas strictly for the hero section
const ThreeCanvas = dynamic(() => import('@/components/ThreeCanvas'), {
  ssr: false,
});

const rotatingTitles = [
  'Full-Stack Engineering',
  'Offline AI & Search Systems',
  'FastAPI & Microservices',
  'React 19 & Next.js Systems',
  'Multimodal Vision Systems',
];

export default function Hero() {
  const { theme, mounted } = useTheme();
  const [tilt, setTilt] = useState({ x: 0, y: 0, mouseX: 50, mouseY: 50 });
  const [roleIndex, setRoleIndex] = useState(0);
  const [delhiTime, setDelhiTime] = useState('');

  // Magnetic button values
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const btn1X = useMotionValue(0);
  const btn1Y = useMotionValue(0);
  const btn1SpringX = useSpring(btn1X, { stiffness: 150, damping: 15 });
  const btn1SpringY = useSpring(btn1Y, { stiffness: 150, damping: 15 });

  const btn2X = useMotionValue(0);
  const btn2Y = useMotionValue(0);
  const btn2SpringX = useSpring(btn2X, { stiffness: 150, damping: 15 });
  const btn2SpringY = useSpring(btn2Y, { stiffness: 150, damping: 15 });

  // Update Delhi local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setDelhiTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // Cycle rotating titles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // 3D Tilt on Profile Card
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x, y, mouseX, mouseY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, mouseX: 50, mouseY: 50 });
  };

  // Magnetic Button Hover Handlers
  const handleMagnetic = (e, ref, mX, mY) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distFactor = 0.28;
    mX.set((e.clientX - centerX) * distFactor);
    mY.set((e.clientY - centerY) * distFactor);
  };

  const handleMagneticLeave = (mX, mY) => {
    mX.set(0);
    mY.set(0);
  };

  // Split text words for headline reveal
  const headlineWords = [
    { text: 'Turning', highlight: false },
    { text: 'Vision', highlight: 'vision' },
    { text: 'Into', highlight: false },
    { text: 'Reality', highlight: false },
    { text: 'With', highlight: false },
    { text: 'Code', highlight: 'code' },
    { text: '&', highlight: false },
    { text: 'Systems.', highlight: false },
  ];

  return (
    <section id="home" className="relative min-h-[94vh] pt-28 pb-16 md:pt-36 md:pb-20 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Content (Guaranteed 100% Free of Background Obstruction) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-20">
            
            {/* Matchday Live Status Chip */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-glassDark dark:bg-white/5 border border-glassBorderDark dark:border-white/10 shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-cream">
                Matchday Ready • Available for Work
              </span>
              {delhiTime && (
                <span className="hidden sm:inline-flex items-center space-x-1 pl-2 border-l border-white/10 text-[11px] text-charcoalMuted dark:text-creamMuted font-mono">
                  <Clock className="w-3 h-3 text-gold" />
                  <span>{delhiTime} IST</span>
                </span>
              )}
            </motion.div>

            {/* Split-Text Reveal Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] text-charcoal dark:text-cream flex flex-wrap justify-center lg:justify-start gap-x-3.5 gap-y-1">
              {headlineWords.map((word, idx) => (
                <span key={idx} className="overflow-hidden inline-block py-0.5">
                  <motion.span
                    initial={{ y: '115%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.75,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {word.highlight === 'vision' ? (
                      <span className="gold-shimmer-sweep font-black drop-shadow-sm">
                        Vision
                      </span>
                    ) : word.highlight === 'code' ? (
                      <span className="underline decoration-gold decoration-2 underline-offset-8">
                        Code
                      </span>
                    ) : (
                      word.text
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* "Specializing in" Flip/Typewriter Cycler */}
            <div className="h-9 flex items-center justify-center lg:justify-start space-x-2.5 text-base sm:text-lg font-bold text-charcoal dark:text-cream">
              <span className="text-charcoalMuted dark:text-creamMuted font-medium">Specializing in:</span>
              <div className="relative overflow-hidden h-8 w-64 sm:w-80 text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 22, opacity: 0, rotateX: -60 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -22, opacity: 0, rotateX: 60 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 text-gold dark:text-gold font-black tracking-wide truncate"
                  >
                    {rotatingTitles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Intro Paragraph - WCAG AAA Compliant */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base sm:text-lg md:text-xl text-charcoalMuted dark:text-creamMuted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Hi, I’m <strong className="text-charcoal dark:text-cream font-semibold">{profileConfig.name}</strong>.
              Information Technology undergraduate at <strong className="text-charcoal dark:text-cream font-semibold underline decoration-gold/60 decoration-2">MAIT (Delhi)</strong> and 
              software developer dedicated to architecting high-impact software, offline AI tools, and production-ready full-stack applications.
            </motion.p>

            {/* Interactive Magnetic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              {/* Primary Gold Magnetic Button */}
              <motion.div
                ref={btn1Ref}
                style={{ x: btn1SpringX, y: btn1SpringY }}
                onMouseMove={(e) => handleMagnetic(e, btn1Ref, btn1X, btn1Y)}
                onMouseLeave={() => handleMagneticLeave(btn1X, btn1Y)}
                className="inline-block"
              >
                <a
                  href="#contact"
                  className="btn-shine-sweep group inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-xl bg-gold text-[#0E1630] font-bold text-base shadow-gold-sm hover:shadow-gold-md hover:bg-[#E5C888] transition-all duration-300 border border-gold"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>

              {/* Secondary Glass Magnetic Button */}
              <motion.div
                ref={btn2Ref}
                style={{ x: btn2SpringX, y: btn2SpringY }}
                onMouseMove={(e) => handleMagnetic(e, btn2Ref, btn2X, btn2Y)}
                onMouseLeave={() => handleMagneticLeave(btn2X, btn2Y)}
                className="inline-block"
              >
                <a
                  href={profileConfig.resumeUrl}
                  download="Mishant_Gautam_Resume.pdf"
                  className="group inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 text-charcoal dark:text-cream font-semibold text-base hover:border-gold/60 hover:bg-white dark:hover:bg-white/10 transition-all duration-200 shadow-sm backdrop-blur-md"
                >
                  <FileDown className="w-4 h-4 text-gold transition-transform duration-200 group-hover:translate-y-0.5" />
                  <span>Download Resume</span>
                </a>
              </motion.div>
            </motion.div>

            {/* DNA Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs"
            >
              <span className="font-semibold text-charcoalMuted dark:text-creamMuted mr-1">Focus & DNA:</span>
              <span className="px-3 py-1 rounded-md bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-charcoal dark:text-cream font-medium">
                React 19 & Next.js
              </span>
              <span className="px-3 py-1 rounded-md bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-charcoal dark:text-cream font-medium">
                FastAPI & Python
              </span>
              <span className="px-3 py-1 rounded-md bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-charcoal dark:text-cream font-medium">
                Offline AI & Vision
              </span>
              <span className="px-3 py-1 rounded-md bg-gold/15 text-charcoal dark:text-cream border border-gold/30 font-semibold flex items-center space-x-1">
                <span>⚽</span>
                <span>Madridista • CR7 Mindset</span>
              </span>
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Hero Card & Football */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative min-h-[460px]"
          >
            {/* 1. 3D Football - Positioned strictly behind the card on the right side (~40% reduced size) */}
            <div 
              className="absolute w-[380px] h-[380px] sm:w-[440px] sm:h-[440px] pointer-events-none -z-10 flex items-center justify-center"
              aria-hidden="true"
            >
              {mounted && <ThreeCanvas theme={theme} />}
            </div>

            {/* 2. Interactive Profile Card with Safe Anchor Points */}
            <div className="relative">
              
              {/* Floating Tech Chip 1 (Top Left) - Float phase 1 */}
              <div className="absolute -top-6 -left-6 sm:-left-10 z-20 hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white/80 dark:bg-[#151D33]/90 border border-black/10 dark:border-white/15 shadow-lg backdrop-blur-md animate-float">
                <Code2 className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs font-semibold text-charcoal dark:text-cream">Clean Architecture</span>
              </div>

              {/* Floating Tech Chip 2 (Bottom Left) - Float phase 2 */}
              <div 
                className="absolute -bottom-6 -left-6 sm:-left-10 z-20 hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white/80 dark:bg-[#151D33]/90 border border-black/10 dark:border-white/15 shadow-lg backdrop-blur-md animate-float-delayed"
              >
                <Cpu className="w-3.5 h-3.5 text-electric" />
                <span className="text-xs font-semibold text-charcoal dark:text-cream">Offline AI & Systems</span>
              </div>

              {/* 3. Circular Rotating Badge - Top-Right anchor: Touches NO labels or buttons */}
              <div className="absolute -top-10 -right-8 sm:-right-12 z-20 hidden md:block">
                <CircularBadge />
              </div>

              {/* 3D Tilt Card with Animated Rotating Conic Gold Border */}
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="conic-gold-card relative w-72 sm:w-84 rounded-2xl p-2.5 bg-white/85 dark:bg-[#0D1426]/90 border border-black/10 dark:border-white/15 shadow-glass-card backdrop-blur-xl group cursor-pointer"
              >
                {/* Portrait Container */}
                <div className="relative rounded-xl overflow-hidden bg-[#0A0F1E] aspect-[4/5] flex items-center justify-center shadow-inner">
                  <img
                    src={profileConfig.heroImage}
                    alt={`${profileConfig.name} - Portrait`}
                    className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Cursor-following glass reflection */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${tilt.mouseX}% ${tilt.mouseY}%, rgba(214, 179, 106, 0.4) 0%, rgba(76, 125, 255, 0.2) 40%, transparent 70%)`,
                    }}
                  />

                  {/* Gentle gradient for label legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Card Bottom Meta Label - High-Contrast Glass Pill */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-[#0A0F1E]/85 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#B9BED0] font-medium">Education</div>
                      <div className="text-xs sm:text-sm font-bold text-white flex items-center space-x-1">
                        <span>B.Tech IT @ MAIT</span>
                        <Sparkles className="w-3 h-3 text-gold" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[#B9BED0] font-medium">Domain</div>
                      <div className="text-xs sm:text-sm font-bold text-gold">Full-Stack & AI</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Fallback for Circular Badge */}
              <div className="mt-8 flex justify-center md:hidden">
                <CircularBadge />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
