import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import AppleProductBar from '@/components/AppleProductBar';
import ScrollProgress from '@/components/ScrollProgress';
import BackgroundDepth from '@/components/BackgroundDepth';
import Hero from '@/components/Hero';
import FootballMarquee from '@/components/FootballMarquee';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import TechSphere3D from '@/components/TechSphere3D';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Photography from '@/components/Photography';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useTheme } from './_app';

// Lazy-load Apple-style Scroll-Driven Product Showcase (SSR disabled for Three.js WebGL canvas)
const AppleShowcase = dynamic(() => import('@/components/AppleShowcase'), {
  ssr: false,
});

export default function Home() {
  const { theme, mounted } = useTheme();
  const [showcaseStep, setShowcaseStep] = useState(1);
  const [inShowcase, setInShowcase] = useState(true);

  // Switch between Apple Product Bar (during showcase) and Main Navbar (during portfolio)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const showcaseHeight = window.innerHeight * 3.2;
          const isStillIn = window.scrollY < showcaseHeight;
          setInShowcase((prev) => (prev !== isStillIn ? isStillIn : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhaseChange = useCallback((step) => {
    setShowcaseStep((prev) => (prev !== step ? step : prev));
  }, []);

  return (
    <>
      <Head>
        <title>Mishant Gautam | Full-Stack Developer & Software Engineer</title>
        <meta
          name="description"
          content="Apple-inspired scroll-driven developer showcase and engineering portfolio of Mishant Gautam — Full-stack developer & AI systems engineer at MAIT (Delhi)."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="relative min-h-screen text-charcoal dark:text-cream selection:bg-gold/30 selection:text-white transition-colors duration-400 overflow-x-clip font-sans">
        
        {/* Top Scroll Indicator */}
        <ScrollProgress />

        {/* Global Cinematic Background Atmosphere */}
        {mounted && <BackgroundDepth theme={theme} />}

        {/* Apple-Style Centered Glass Product Bar (Active during showcase, zero clash) */}
        <AppleProductBar currentStep={showcaseStep} inShowcase={inShowcase} />

        {/* Main Navigation Bar (Smoothly active when scrolled into portfolio, zero clash) */}
        {!inShowcase && <Navbar />}

        {/* ── Apple-Style Scroll-Driven Product Showcase Section ── */}
        {mounted && (
          <AppleShowcase onPhaseChange={handlePhaseChange} />
        )}

        {/* ── Core Portfolio Sections ── */}
        <main className="relative z-10">
          {/* Detailed Hero Section with 3D Profile Card & Matchday Status */}
          <Hero />

          {/* Football Legends Infinite Ticker */}
          <FootballMarquee />

          {/* Live In-View Count-Up Stats */}
          <Stats />

          {/* Content Narrative & Interactive Highlights */}
          <About />
          <Projects />
          <Skills />
          <TechSphere3D />
          <Experience />
          <Education />
          <Photography />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
