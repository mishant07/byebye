import React, { useEffect, useState } from 'react';
import { ArrowUp, Heart, Code2 } from 'lucide-react';
import { profileConfig } from '@/config/profile';

export default function Footer() {
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Logo & Info */}
          <div className="space-y-1">
            <a href="#home" className="text-2xl font-black font-heading inline-block">
              <span className="text-dark dark:text-white">{profileConfig.firstName}</span>
              <span className="text-primary text-3xl leading-none">.</span>
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {profileConfig.headline}
            </p>
          </div>

          {/* Copyright Note */}
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center space-x-1">
            <span>&copy; {new Date().getFullYear()} {profileConfig.name}. Built with</span>
            <Heart className="w-3.5 h-3.5 text-primary fill-primary inline" />
            <span>using Next.js & Three.js 3D • ¡Hala Madrid! 👑</span>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a href="#home" className="hover:text-primary transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-primary transition-colors">
              Skills
            </a>
            <a href="#honors" className="hover:text-primary transition-colors">
              Honors
            </a>
            <a href="#education" className="hover:text-primary transition-colors">
              Education
            </a>
            <a href="#photography" className="hover:text-primary transition-colors">
              Photography
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>

        </div>
      </div>

      {/* Floating Go To Top Button */}
      {showGoTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl hover:bg-primary dark:hover:bg-primary dark:hover:text-slate-950 transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}

