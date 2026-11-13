import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
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

export default function Home() {
  const { theme, mounted } = useTheme();

  return (
    <>
      <Head>
        <title>Mishant Gautam | Full-Stack Developer & Software Engineer</title>
        <meta
          name="description"
          content="Portfolio of Mishant Gautam — Full-Stack Developer & Software Engineer at MAIT Delhi. Bernabéu Night design with Real Madrid inspiration."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="relative min-h-screen text-charcoal dark:text-cream selection:bg-gold/30 selection:text-white transition-colors duration-400 overflow-x-clip font-sans">
        
        {/* Top Scroll Indicator */}
        <ScrollProgress />

        {/* Global Cinematic Background Atmosphere */}
        {mounted && <BackgroundDepth theme={theme} />}

        {/* Sleek Floating Glass Navigation Bar */}
        <Navbar />

        {/* ── Main Portfolio Sections ── */}
        <main className="relative z-10">
          {/* Hero Section with 3D Profile Card & Matchday Status */}
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
