import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Medal, CheckCircle2, Award } from 'lucide-react';

const honors = [
  {
    event: 'Solve For Her Hackathon — Project Competition',
    track: 'Women-Centric Safety Innovation Track',
    standing: 'Secured 1st Position (Winner)',
    year: '2024',
    location: 'Delhi, India',
    icon: Trophy,
    standingColor: 'bg-primary/10 text-primary dark:text-accentGold border-primary/30',
    borderColor: 'group-hover:border-primary/50',
    details: [
      {
        title: 'Championship Win',
        desc: 'Awarded 1st place for architecting a resilient women’s safety application that operates without active cellular internet, utilizing peer-to-peer triggers and low-latency SMS/mesh protocols.',
      },
      {
        title: 'Leadership & Execution',
        desc: 'Pitched working prototypes to industry judges, demonstrating under-5-second emergency dispatch time and automated live coordinates sharing in network-dead zones.',
      },
    ],
    skills: ['Offline Protocols', 'P2P Mesh Network', 'Emergency Dispatch', 'Low-Latency SMS', 'Rapid Prototyping'],
  },
  {
    event: 'Singularity AI Hackathon (Parsec 6.0)',
    track: 'Regional Technical & AI Contest',
    standing: 'Secured 2nd Position (Runner’s Up)',
    year: '2024',
    location: 'Delhi, India',
    icon: Medal,
    standingColor: 'bg-primaryDark/10 text-primaryDark border-primaryDark/30',
    borderColor: 'group-hover:border-primaryDark/50',
    details: [
      {
        title: 'Regional AI Finalist',
        desc: 'Secured 2nd place among competitive engineering teams for developing and deploying an intelligent AI solution addressing complex real-world data under strict 24–48 hour hackathon timeframes.',
      },
      {
        title: 'Technical Defense',
        desc: 'Commended by jury for model design efficiency, high accuracy benchmarks, and clean full-stack demo implementation.',
      },
    ],
    skills: ['Google Gemini API', 'FastAPI', 'Python', 'Scikit-learn', 'Model Efficiency'],
  },
];

export default function Experience() {
  return (
    <section id="honors" className="relative py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary dark:text-accentGold">
            Competitive Recognition
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Hackathons & <span className="text-gradient-primary">Honors.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Proven track record of high-velocity problem solving, technical defense, and prototype execution under competitive pressure.
          </p>
        </div>

        {/* Honors Cards */}
        <div className="space-y-8">
          {honors.map((item, idx) => (
            <motion.div
              key={item.event}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              className={`spotlight-card group relative p-7 sm:p-8 rounded-3xl bg-white dark:bg-darkCard/80 border border-slate-200/90 dark:border-white/[0.08] ${item.borderColor} shadow-sm hover:shadow-2xl transition-all duration-300 space-y-5 backdrop-blur-md`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-accentGold transition-colors">
                      {item.event}
                    </h3>
                    <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${item.standingColor} shadow-sm`}>
                      <item.icon className="w-3.5 h-3.5" />
                      <span>{item.standing}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                    {item.track}
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-400 font-medium">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.year}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {item.details.map((d, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 space-y-1.5"
                  >
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary dark:text-accentGold" />
                      <span>{d.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {d.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Skills Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
