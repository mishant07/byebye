import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Sparkles, X, ArrowUpRight, Layers, ShieldCheck, Cpu, Video } from 'lucide-react';
import { GithubIcon } from './Icons';
import { playClickSound } from '@/utils/audio';
import { useTheme } from '../pages/_app';

const realProjects = [
  {
    id: 1,
    title: 'Nukkad — Hyperlocal Commerce & Retail Intelligence',
    subtitle: 'Full-Stack Project • Delhi, India',
    icon: Cpu,
    accent: 'from-primary/15 via-accentGold/10 to-transparent',
    borderColor: 'group-hover:border-primary/50',
    tagColor: 'text-primary dark:text-accentGold',
    summary:
      'AI-driven inventory intelligence and automated competitive pricing platform for neighborhood retail merchants.',
    bullets: [
      'Multimodal AI Vision: Integrated Google Gemini Vision API to analyze product images, auto-extracting SKU attributes, category, and catalog metadata for zero-friction inventory management.',
      'Live Price Intelligence Engine: Built a FastAPI scraping engine cross-referencing Amazon and Flipkart data to deliver real-time, AI-verified competitive pricing for neighborhood merchants.',
    ],
    tags: ['React 19', 'FastAPI', 'Google Gemini Vision', 'Tailwind CSS', 'Uvicorn', 'Web Scraping'],
    githubUrl: 'https://github.com/mishant07',
    demoUrl: '#contact',
  },
  {
    id: 2,
    title: 'Recall — 100% Offline AI Search System',
    subtitle: 'Personal Project • Delhi, India',
    icon: ShieldCheck,
    accent: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    borderColor: 'group-hover:border-emerald-500/40',
    tagColor: 'text-emerald-500 dark:text-emerald-400',
    summary:
      'Zero-cloud semantic document discovery engine running entirely on local hardware for total privacy.',
    bullets: [
      'Offline AI Search: Built a 100% offline AI search system that allows users to find local files using natural language.',
      'Data Privacy: Eliminated data privacy risks by processing all semantic queries and file indexing strictly on-device without external network dependencies.',
    ],
    tags: ['Python', 'Local Embeddings', 'Vector Search', 'Semantic Parsing', 'On-Device Privacy'],
    githubUrl: 'https://github.com/mishant07',
    demoUrl: '#contact',
  },
  {
    id: 3,
    title: 'Solve For Her — Women’s Safety Application',
    subtitle: 'Emergency Protocols • Delhi, India',
    icon: Layers,
    accent: 'from-amber-600/15 via-orange-500/10 to-transparent',
    borderColor: 'group-hover:border-amber-500/40',
    tagColor: 'text-amber-500 dark:text-amber-400',
    summary:
      'Mission-critical emergency dispatch and offline safety network engineered to safeguard users in connectivity blackouts.',
    bullets: [
      'Emergency Alerts: Led a team to develop a women’s safety application featuring offline SOS triggers, automated location sharing, and real-time alerts.',
      'Offline Protocols: Engineered low-latency emergency protocols that run without active internet connections to ensure reliable usage in network-dead zones under 5 seconds.',
    ],
    tags: ['Offline SOS', 'P2P Mesh Protocols', 'Emergency Dispatch', 'Low-Latency SMS', 'Geolocation'],
    githubUrl: 'https://github.com/mishant07',
    demoUrl: '#contact',
  },
  {
    id: 4,
    title: 'Sehat Link — Secure Video Consultation Platform',
    subtitle: 'Telemedicine System • Delhi, India',
    icon: Video,
    accent: 'from-primaryDark/15 via-primaryDark/10 to-transparent',
    borderColor: 'group-hover:border-primaryDark/50',
    tagColor: 'text-primaryDark',
    summary:
      'Direct, browser-native WebRTC telemedicine portal providing reliable, private clinical appointments remotely.',
    bullets: [
      'Video Consultations: Developed "Sehat Link," a telemedicine platform facilitating direct, one-to-one secure video consultations between patients and doctors.',
      'Healthcare Access: Improved medical accessibility by integrating real-time scheduling and virtual appointment features, reducing clinic visits and friction.',
    ],
    tags: ['WebRTC', 'React', 'Node.js', 'Real-Time Scheduling', 'Secure Video API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mishant07',
    demoUrl: '#contact',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { soundEnabled } = useTheme();

  return (
    <section id="projects" className="relative py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary dark:text-primaryDark">
            Portfolio & Systems
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Engineered <span className="text-gradient-primary">Projects.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Full-stack systems, offline AI architectures, and resilient real-world software solutions from my engineering portfolio.
          </p>
        </div>

        {/* 2x2 Clean Engineering Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {realProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              className={`spotlight-card group relative rounded-3xl bg-white dark:bg-darkCard/80 border border-slate-200/90 dark:border-white/[0.08] ${project.borderColor} shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-7 sm:p-8 backdrop-blur-md overflow-hidden`}
            >
              {/* Subtle Ambient Hover Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 space-y-5">
                {/* Card Top Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-primary dark:text-accentGold group-hover:scale-105 transition-transform duration-300">
                      <project.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        {project.subtitle}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    0{idx + 1}
                  </span>
                </div>

                {/* Project Title & Summary */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-accentGold transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {project.summary}
                  </p>
                </div>

                {/* Bullets directly from resume */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {project.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start space-x-2">
                      <span className="text-primary dark:text-accentGold mt-1 font-bold">•</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-dark dark:hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>

                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setSelectedProject(project);
                  }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-slate-900 dark:bg-primary text-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-accentGold transition-all duration-300 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Architecture Details</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for detailed review */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-primaryDark">
                    {selectedProject.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {selectedProject.summary}
                  </p>
                </div>

                <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Key Architectural Implementation:
                  </h4>
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {selectedProject.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5">
                        <span className="text-primary dark:text-primaryDark font-bold mt-0.5">•</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Technologies & Tools:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-primary transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
