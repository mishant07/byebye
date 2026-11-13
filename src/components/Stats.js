import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, CheckCircle, HeartHandshake, BookOpen } from 'lucide-react';

function Counter({ target, suffix = '', duration = 1.8 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end)) return;

    const totalSteps = 45;
    const stepTime = (duration * 1000) / totalSteps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const val = Math.round(eased * end);
      setCount(val);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setCount(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  const numVal = parseInt(target, 10);
  if (isNaN(numVal)) {
    return <span>{target}</span>;
  }

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const statsData = [
  {
    fallbackIcon: Award,
    rawNumber: null,
    displayNumber: 'Full-Stack',
    suffix: '',
    label: 'Systems & AI Stack',
    description: 'React 19, FastAPI backends, MongoDB, and Gemini Vision pipelines.',
    accent: 'gold',
  },
  {
    fallbackIcon: CheckCircle,
    rawNumber: '4',
    displayNumber: null,
    suffix: '+',
    label: 'Core Projects',
    description: 'Nukkad Retail AI, Recall Offline Search, Solve For Her, Sehat Link.',
    accent: 'electric',
  },
  {
    fallbackIcon: HeartHandshake,
    rawNumber: '100',
    displayNumber: null,
    suffix: '%',
    label: 'Offline AI Privacy',
    description: 'Zero data leakage via strictly on-device local embeddings & mesh protocols.',
    accent: 'gold',
  },
  {
    fallbackIcon: BookOpen,
    rawNumber: null,
    displayNumber: 'MAIT',
    suffix: '',
    label: 'B.Tech IT (Delhi)',
    description: 'Maharaja Agrasen Institute of Technology - Information Technology.',
    accent: 'electric',
  },
];

export default function Stats() {
  return (
    <section className="relative py-14 md:py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card group relative p-6 rounded-2xl shadow-glass-card hover:border-gold/40 transition-all duration-300"
            >
              <div className="relative z-10 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl p-2.5 flex items-center justify-center border transition-colors ${
                    stat.accent === 'gold'
                      ? 'bg-gold/10 border-gold/25 text-gold group-hover:bg-gold/20'
                      : 'bg-electric/10 border-electric/25 text-electric group-hover:bg-electric/20'
                  }`}>
                    <stat.fallbackIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-charcoalMuted/50 dark:text-creamMuted/50">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-charcoal dark:text-cream">
                    {stat.rawNumber ? (
                      <Counter target={stat.rawNumber} suffix={stat.suffix} />
                    ) : (
                      <span>{stat.displayNumber}</span>
                    )}
                  </h3>
                  <h4 className="text-xs font-bold text-charcoal dark:text-cream uppercase tracking-wider">
                    {stat.label}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-charcoalMuted dark:text-creamMuted leading-relaxed font-normal">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
