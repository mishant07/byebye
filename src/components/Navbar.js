import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, FileDown, Volume2, VolumeX } from 'lucide-react';
import { GithubIcon, LinkedInIcon } from './Icons';
import { useTheme } from '../pages/_app';
import { profileConfig } from '@/config/profile';
import { playClickSound, playToggleSound } from '@/utils/audio';

export default function Navbar() {
  const { theme, toggleTheme, soundEnabled, toggleSound, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Honors', href: '#honors' },
    { name: 'Education', href: '#education' },
    { name: 'Photography', href: '#photography' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/85 dark:bg-[#0A0F1E]/85 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-lg'
          : 'py-4 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="text-2xl font-extrabold tracking-tight font-heading flex items-center group focus-visible:outline-gold"
        >
          <span className="text-charcoal dark:text-cream group-hover:text-gold transition-colors">
            {profileConfig.firstName}
          </span>
          <span className="text-gold text-3xl leading-none">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-sm font-medium rounded-full text-charcoalMuted dark:text-creamMuted hover:text-gold dark:hover:text-gold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls & Socials */}
        <div className="hidden sm:flex items-center space-x-2.5">
          {/* Social Icons */}
          <div className="flex items-center space-x-1.5 pr-2 border-r border-black/10 dark:border-white/10 text-charcoalMuted dark:text-creamMuted">
            <a
              href={profileConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 hover:text-gold transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profileConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 hover:text-gold transition-colors"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleSound();
              playToggleSound(!soundEnabled);
            }}
            aria-label={soundEnabled ? "Mute interactive audio" : "Enable interactive audio"}
            className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:border-gold text-charcoalMuted dark:text-creamMuted hover:bg-black/5 dark:hover:bg-white/5 transition-all"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-gold" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-50" />
            )}
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={() => {
              toggleTheme();
              playClickSound(soundEnabled);
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:border-gold text-charcoal dark:text-cream hover:bg-black/5 dark:hover:bg-white/5 transition-all"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="w-4 h-4 text-gold" />
            ) : (
              <Moon className="w-4 h-4 text-gold" />
            )}
          </button>

          {/* Resume Action */}
          <a
            href={profileConfig.resumeUrl}
            download="Mishant_Gautam_Resume.pdf"
            className="btn-shine-sweep inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-gold text-[#0E1630] hover:bg-[#E5C888] transition-all shadow-gold-sm"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => toggleTheme()}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-charcoal dark:text-cream"
          >
            {mounted && theme === 'dark' ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-gold" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-charcoal dark:text-cream"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-b border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0A0F1E]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2 rounded-md text-sm font-medium text-charcoal dark:text-cream hover:text-gold hover:bg-black/5 dark:hover:bg-white/5"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <a
                href={profileConfig.resumeUrl}
                download
                className="btn-shine-sweep inline-flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-lg bg-gold text-[#0E1630]"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
