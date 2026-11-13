import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from 'lucide-react';

const educationList = [
  {
    degree: 'Bachelor of Technology - Information Technology (IT)',
    institution: 'Maharaja Agrasen Institute of Technology (MAIT)',
    period: '2024 – 2028',
    location: 'Delhi, India',
    description:
      'Pursuing B.Tech in IT with focus on Data Structures & Algorithms, Systems Architecture, Database Management, and Artificial Intelligence.',
    badge: 'Undergraduate Degree',
    highlight: 'B.Tech IT Department',
  },
  {
    degree: 'Senior Secondary Education — Computer Science',
    institution: 'Kendriya Vidyalaya Pragati Vihar',
    period: 'Completed 2024',
    location: 'Delhi, India',
    description:
      'Graduated with distinction in Computer Science, Python programming, relational database systems, and foundational mathematics.',
    badge: 'High School Diploma',
    highlight: 'Computer Science Stream',
  },
  {
    degree: 'Foundational Systems & Full-Stack Engineering',
    institution: 'Independent Technical Coursework & Open Source',
    period: '2023 – Present',
    location: 'Delhi, India',
    description:
      'Continuous advanced coursework in modern React architectures, asynchronous FastAPI microservices, on-device vector search, and WebRTC protocols.',
    badge: 'Specialized Track',
    highlight: 'Full-Stack & Systems Focus',
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary dark:text-accentGold">
            Academic Background
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Education & <span className="text-gradient-primary">Degrees.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Solid foundations in computer science, software engineering, and systems development.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.institution}
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
              className="spotlight-card p-6 rounded-2xl bg-white dark:bg-darkCard/80 border border-slate-200/90 dark:border-white/[0.08] hover:border-primary/50 dark:hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/15 text-primary dark:text-accentGold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {edu.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-semibold text-primary dark:text-accentGold">
                    {edu.institution}
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-400 dark:text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </span>
                  <span>•</span>
                  <span>{edu.location}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {edu.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center space-x-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Award className="w-4 h-4" />
                <span>{edu.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

