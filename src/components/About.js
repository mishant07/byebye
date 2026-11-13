import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Sparkles, Code, Rocket, UserCheck } from 'lucide-react';
import { profileConfig } from '@/config/profile';

export default function About() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const highlights = [
    {
      icon: Code,
      title: 'Full-Stack Architecture',
      desc: 'High-performance backends with FastAPI & Node.js, reactive interfaces with React 19 and Tailwind CSS.',
    },
    {
      icon: Sparkles,
      title: 'Offline AI & Multimodal',
      desc: 'Google Gemini Vision API integration, on-device local embeddings, and zero-cloud search architectures.',
    },
    {
      icon: Rocket,
      title: 'Performance & Systems',
      desc: 'Optimized async query execution, low memory overhead, and scalable RESTful API design.',
    },
    {
      icon: UserCheck,
      title: 'Resilient Edge Protocols',
      desc: 'Low-latency peer-to-peer protocols, offline SOS mesh triggers, and WebRTC streaming.',
    },
  ];

  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
            Background & Mindset
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-charcoal dark:text-cream">
            Engineering With <span className="text-gradient-primary">Precision.</span>
          </h2>
          <p className="text-base text-charcoalMuted dark:text-creamMuted">
            Dedicated to crafting reliable software, on-device intelligence, and clean full-stack systems.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Framed Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-sm rounded-2xl p-2.5 bg-lightCard dark:bg-darkCard border border-lightBorder dark:border-darkBorder shadow-card-light dark:shadow-card-dark group"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#141414] shadow-inner">
                <img
                  src={profileConfig.aboutImage}
                  alt={`${profileConfig.name} working`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#1C1C1C]/90 backdrop-blur-md border border-white/10 text-white space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs text-primary font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mishant Gautam</span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Information Technology @ MAIT • Full-Stack & Systems
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal dark:text-cream">
                Engineering Practical AI & Full-Stack Impact.
              </h3>
              <p className="text-base text-charcoalMuted dark:text-creamMuted leading-relaxed font-normal">
                Hi! I’m <strong className="text-charcoal dark:text-cream font-semibold">{profileConfig.name}</strong>, 
                an Information Technology undergraduate at <strong className="text-charcoal dark:text-cream font-semibold underline decoration-primary/60">MAIT (Delhi)</strong> dedicated 
                to architecting high-impact software, offline AI tools, and production-ready full-stack systems.
              </p>
              <p className="text-base text-charcoalMuted dark:text-creamMuted leading-relaxed font-normal">
                Whether creating retail intelligence engines using Google Gemini Vision, building 100% offline semantic file search systems that guarantee zero data leakage, or engineering resilient SOS protocols that trigger in network-dead zones under 5 seconds, I love turning ambitious problems into clean, fast, and production-tested reality.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl bg-lightCard dark:bg-darkCard border border-lightBorder dark:border-darkBorder hover:border-primary/50 transition-colors shadow-sm"
                >
                  <div className="flex items-center space-x-2.5 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-primary/15 text-primary">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-charcoal dark:text-cream">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-charcoalMuted dark:text-creamMuted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Athletic Mindset & Real Madrid / CR7 Tribute */}
            <div className="p-5 rounded-xl bg-lightCard dark:bg-darkCard border border-lightBorder dark:border-darkBorder shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-base">⚽</span>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-charcoal dark:text-cream border border-primary/30">
                    <span>Madridista</span>
                    <span>•</span>
                    <span className="text-primary font-black">CR7 Mindset</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-charcoalMuted dark:text-creamMuted">
                  Real Madrid C.F. • ¡Hala Madrid! 👑
                </span>
              </div>

              <p className="text-sm text-charcoalMuted dark:text-creamMuted leading-relaxed font-normal">
                Avid football enthusiast and devoted <strong>Madridista</strong> driven by <strong>Cristiano Ronaldo’s</strong> relentless pursuit of perfection. I channel that same high-performance athletic discipline, obsessive preparation, and composure into writing resilient software and competing in hackathons.
              </p>
              
              <div className="text-xs font-mono text-primary flex items-center justify-between pt-1">
                <span className="italic">&ldquo;Dedication, hard work all the time, and belief.&rdquo; — CR7</span>
                <span className="font-bold text-[11px] not-italic px-2 py-0.5 rounded bg-primary/15 border border-primary/30">
                  15× UCL Champions
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-primary text-charcoal font-bold text-sm hover:bg-[#B89255] transition-all shadow-sm"
              >
                <span>Get In Touch</span>
                <Sparkles className="w-4 h-4" />
              </a>

              <a
                href={profileConfig.resumeUrl}
                download="Mishant_Gautam_Resume.pdf"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-lightCard dark:bg-darkCard border border-lightBorder dark:border-darkBorder text-charcoal dark:text-cream font-semibold text-sm hover:border-primary transition-all shadow-sm"
              >
                <FileDown className="w-4 h-4 text-primary" />
                <span>Download Resume</span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
