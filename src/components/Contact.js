import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2, User, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedInIcon, TwitterIcon, DribbbleIcon } from './Icons';
import { profileConfig } from '@/config/profile';
import { playSuccessSound, playClickSound } from '@/utils/audio';
import { useTheme } from '../pages/_app';

export default function Contact() {
  const { soundEnabled } = useTheme();
  const [copiedType, setCopiedType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopy = (text, type) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      playClickSound(soundEnabled);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Trigger Confetti explosion & celebratory audio!
      try {
        playSuccessSound(soundEnabled);
        confetti({
          particleCount: 90,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#C5A880', '#D4AF7A', '#818CF8', '#94A3B8', '#F8FAFC'],
        });
      } catch (err) {
        console.error(err);
      }

      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    }, 700);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary dark:text-accentGold">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Have Any Project? <span className="text-gradient-primary">Drop A Message!</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Let’s discuss your vision, architecture challenges, or upcoming product roadmap.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>Contact Details</span>
                <Sparkles className="w-4 h-4 text-primary" />
              </h3>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary dark:text-primaryDark shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Address
                    </span>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      {profileConfig.contact.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-primaryDark/10 text-primaryDark shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Mobile
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                        {profileConfig.contact.phone}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(profileConfig.contact.phone, 'phone')}
                    className="p-2 rounded-lg text-slate-400 hover:text-primary dark:hover:text-primaryDark hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors relative"
                    title="Copy phone number"
                  >
                    {copiedType === 'phone' ? (
                      <span className="inline-flex items-center text-[10px] font-bold text-emerald-500 space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-start justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Email Address
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                        {profileConfig.contact.email}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(profileConfig.contact.email, 'email')}
                    className="p-2 rounded-lg text-slate-400 hover:text-primary dark:hover:text-primaryDark hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors relative"
                    title="Copy email address"
                  >
                    {copiedType === 'email' ? (
                      <span className="inline-flex items-center text-[10px] font-bold text-emerald-500 space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Connect on Socials
                </span>
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                  <a
                    href={profileConfig.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-dark transition-all duration-300 shadow-sm"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={profileConfig.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
              
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center space-x-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="text-sm font-semibold">
                      Thank you! Your message has been received. I will reply within 24 hours.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Your Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. johndoe@mail.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark transition-all"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write details about your project or inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-slate-900 text-white dark:bg-primary dark:text-slate-950 font-bold text-sm hover:bg-slate-800 dark:hover:bg-accentGold shadow-lg shadow-black/10 dark:shadow-primary/20 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

