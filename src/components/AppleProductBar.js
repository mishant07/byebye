'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Volume2, VolumeX, Menu, X, ArrowRight } from 'lucide-react';
import { useTheme } from '@/pages/_app';
import { playClickSound, playToggleSound } from '@/utils/audio';

export default function AppleProductBar({ currentStep = 1, inShowcase = true }) {
  const { theme, toggleTheme, soundEnabled, toggleSound, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stepLabels = {
    1: 'Overview',
    2: 'Full-Stack',
    3: 'Offline AI',
    4: 'Showcase',
  };

  const navLinks = [
    { name: 'Home Hero', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills & Stack', href: '#skills' },
    { name: 'Honors', href: '#honors' },
    { name: 'Education', href: '#education' },
    { name: 'Photography', href: '#photography' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: inShowcase ? 0 : -80, opacity: inShowcase ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 select-none w-full max-w-2xl px-4 transition-all duration-300 ${
        inShowcase ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-label="Product Navigation Bar"
    >
      <div
        className={`flex items-center justify-between rounded-full bg-[#0A0F1E]/90 backdrop-blur-2xl border border-white/15 shadow-2xl transition-all duration-300 ${
          scrolled ? 'py-1.5 px-4 shadow-glass-card' : 'py-2 px-5'
        }`}
      >
        {/* Left Brand Identity */}
        <a
          href="#home"
          className="flex items-center space-x-2 group focus-visible:outline-gold"
          aria-label="Mishant Portfolio Home"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-extrabold tracking-tight text-white group-hover:text-gold transition-colors font-heading">
            Mishant
          </span>
          <span className="text-gold text-lg leading-none font-bold">.</span>
        </a>

        {/* Center: Dynamic Active Section Indicator */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
          <span className="text-gold font-bold">0{currentStep}</span>
          <span className="text-neutral-500">/</span>
          <span className="font-semibold text-white tracking-wide">{stepLabels[currentStep] || 'Showcase'}</span>
        </div>

        {/* Right CTA Actions & Controls */}
        <div className="flex items-center space-x-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleSound();
              playToggleSound(!soundEnabled);
            }}
            aria-label="Toggle audio"
            className="p-1.5 rounded-full text-neutral-400 hover:text-gold hover:bg-white/5 transition-colors hidden sm:inline-flex"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-gold" /> : <VolumeX className="w-3.5 h-3.5 opacity-50" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              toggleTheme();
              playClickSound(soundEnabled);
            }}
            aria-label="Toggle theme"
            className="p-1.5 rounded-full text-neutral-400 hover:text-gold hover:bg-white/5 transition-colors hidden sm:inline-flex"
          >
            {mounted && theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-gold" /> : <Moon className="w-3.5 h-3.5 text-gold" />}
          </button>

          {/* Projects Button */}
          <a
            href="#projects"
            className="px-3 py-1 rounded-full text-xs font-semibold text-neutral-200 border border-white/15 hover:border-gold/60 hover:text-white hover:bg-white/5 transition-all"
          >
            Projects
          </a>

          {/* Hire Me Button (Solid Gold) */}
          <a
            href="#contact"
            className="btn-shine-sweep px-3.5 py-1 rounded-full text-xs font-bold bg-gold text-[#0E1630] hover:bg-[#E5C888] shadow-gold-sm transition-all"
          >
            Hire me
          </a>

          {/* Mobile Menu Dropdown Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-full text-neutral-300 hover:text-white sm:hidden"
            aria-label="Toggle menu drawer"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mt-2 p-4 rounded-2xl bg-[#0A0F1E]/95 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-2 sm:hidden"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-gold hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
