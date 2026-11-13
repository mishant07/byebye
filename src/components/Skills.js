import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Wrench, Sparkles } from 'lucide-react';
import { playClickSound } from '@/utils/audio';
import { useTheme } from '../pages/_app';

const devSkills = [
  { name: 'Python', icon: '/images/command.png', level: '96%', tag: 'Core Language & AI' },
  { name: 'TypeScript', icon: '/images/typescript.png', level: '92%', tag: 'Type-Safe Frontend' },
  { name: 'JavaScript', icon: '/images/javascript.png', level: '95%', tag: 'Full-Stack Logic' },
  { name: 'React 19', icon: '/images/react.png', level: '94%', tag: 'Component UI' },
  { name: 'FastAPI', icon: '/images/ajax.png', level: '95%', tag: 'High-Performance APIs' },
  { name: 'Gemini Vision API', icon: '/images/react.png', level: '92%', tag: 'Multimodal AI' },
  { name: 'Tailwind CSS', icon: '/images/css3.png', level: '95%', tag: 'Modern Styling' },
  { name: 'C/C++', icon: '/images/vs-code.png', level: '88%', tag: 'Systems & Algorithmic' },
  { name: 'SQL', icon: '/images/firebase.png', level: '90%', tag: 'Relational Queries' },
  { name: 'Scikit-learn', icon: '/images/webpack.png', level: '86%', tag: 'Machine Learning' },
  { name: 'HTML5 & CSS3', icon: '/images/html5.png', level: '96%', tag: 'Semantic Layout' },
  { name: 'Next.js & Vite', icon: '/images/npm.png', level: '92%', tag: 'Modern Tooling' },
];

const toolsList = [
  { name: 'Node.js', icon: '/images/npm.png', level: '92%', tag: 'Runtime Environment' },
  { name: 'MongoDB', icon: '/images/firebase.png', level: '90%', tag: 'NoSQL Database' },
  { name: 'Uvicorn & ASGI', icon: '/images/command.png', level: '92%', tag: 'Async Web Server' },
  { name: 'Pydantic', icon: '/images/vs-code.png', level: '94%', tag: 'Data Validation' },
  { name: 'Git & GitHub', icon: '/images/git.png', level: '95%', tag: 'Version Control' },
  { name: 'Linux Shell', icon: '/images/command.png', level: '90%', tag: 'CLI & Scripting' },
  { name: 'RESTful APIs', icon: '/images/ajax.png', level: '96%', tag: 'Endpoint Design' },
  { name: 'Offline AI Search', icon: '/images/webpack.png', level: '95%', tag: 'Local Embeddings' },
  { name: 'Web Scraping', icon: '/images/ajax.png', level: '92%', tag: 'Data Extraction' },
  { name: 'VS Code', icon: '/images/vs-code.png', level: '98%', tag: 'Primary IDE' },
  { name: 'WebRTC / Video', icon: '/images/slack.png', level: '88%', tag: 'Real-Time Streaming' },
  { name: 'P2P Mesh Protocols', icon: '/images/trello.png', level: '90%', tag: 'Resilient Edge Comm' },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('skills');
  const { soundEnabled } = useTheme();

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    playClickSound(soundEnabled);
  };

  const activeList = activeTab === 'skills' ? devSkills : toolsList;

  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary dark:text-accentGold">
            Technical Stack
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            My Skills & <span className="text-gradient-primary">Technologies.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A comprehensive breakdown of core languages, multimodal AI tools, and production-tested systems engineering frameworks.
          </p>
        </div>

        {/* Tab Switcher Controls */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-inner">
            <button
              onClick={() => handleTabSwitch('skills')}
              className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'skills'
                  ? 'text-white dark:text-slate-950 font-bold shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {activeTab === 'skills' && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded-full bg-slate-900 dark:bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Code2 className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Languages & AI Systems</span>
            </button>

            <button
              onClick={() => handleTabSwitch('tools')}
              className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'tools'
                  ? 'text-white dark:text-slate-950 font-bold shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {activeTab === 'tools' && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded-full bg-slate-900 dark:bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Wrench className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Backend & Dev Tools</span>
            </button>
          </div>
        </div>

        {/* Skills Cards Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
          >
            {activeList.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="spotlight-card group relative p-5 rounded-2xl bg-white dark:bg-darkCard/80 border border-slate-200/90 dark:border-white/[0.08] hover:border-primary/50 dark:hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-3 cursor-pointer"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl p-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                  <img
                    src={skill.icon}
                    alt={`${skill.name} logo`}
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>

                {/* Skill Name */}
                <div className="space-y-0.5 w-full">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-accentGold transition-colors truncate">
                    {skill.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider truncate">
                    {skill.tag}
                  </p>
                </div>

                {/* Micro Level Indicator */}
                <div className="w-full pt-1">
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.04 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accentGold"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

