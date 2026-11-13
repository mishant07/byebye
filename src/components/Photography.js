import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Sliders, Maximize2, X, Calendar, Aperture, Eye } from 'lucide-react';
import { photoGallery, photographyCategories } from '@/config/photography';
import { playClickSound } from '@/utils/audio';
import { useTheme } from '../pages/_app';

export default function Photography() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);
  const { soundEnabled } = useTheme();

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    playClickSound(soundEnabled);
  };

  const handlePhotoClick = (photo) => {
    setActivePhoto(photo);
    playClickSound(soundEnabled);
  };

  const filteredPhotos =
    selectedCategory === 'All'
      ? photoGallery
      : photoGallery.filter((p) => p.category === selectedCategory);

  return (
    <section id="photography" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary dark:text-accentGold text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Stories & Creative Lens</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Through My <span className="text-gradient-primary">Lens.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Beyond writing algorithms and code, I capture the world through photography — documenting architectural geometry, urban street rhythms, and golden-hour light.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {photographyCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-primary dark:text-slate-950 shadow-md font-bold'
                    : 'bg-white/80 dark:bg-darkCard/80 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-white/[0.08] hover:text-slate-900 dark:hover:text-white hover:border-primary/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => handlePhotoClick(photo)}
                className="spotlight-card group relative rounded-3xl overflow-hidden bg-white dark:bg-darkCard/80 border border-slate-200/90 dark:border-white/[0.08] hover:border-primary/50 dark:hover:border-primary/50 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col aspect-[4/5] sm:aspect-[3/4]"
              >
                {/* Photo Image */}
                <div className="relative w-full h-full overflow-hidden bg-slate-900">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    onError={(e) => {
                      if (photo.fallbackSrc && e.currentTarget.src !== photo.fallbackSrc) {
                        e.currentTarget.src = photo.fallbackSrc;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-white border border-white/10 shadow-sm">
                      {photo.category}
                    </span>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur-md text-white border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-primary dark:text-accentGold" />
                  </div>

                  {/* Bottom Metadata Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-primary dark:text-accentGold">
                        <MapPin className="w-3 h-3" />
                        <span>{photo.location}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary dark:group-hover:text-accentGold transition-colors leading-snug">
                        {photo.title}
                      </h3>
                    </div>

                    {/* Camera Specs Pill */}
                    <div className="flex items-center space-x-2 pt-1 border-t border-white/10 text-[11px] text-slate-300">
                      <Aperture className="w-3 h-3 text-slate-400" />
                      <span className="truncate">{photo.camera} • {photo.settings}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Photography Lightbox Modal */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={() => setActivePhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-white"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 text-white border border-white/10 hover:bg-white hover:text-slate-900 transition-colors shadow-lg"
                  aria-label="Close photo preview"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left: Image Container */}
                <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden aspect-[4/3] md:aspect-auto">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    onError={(e) => {
                      if (activePhoto.fallbackSrc && e.currentTarget.src !== activePhoto.fallbackSrc) {
                        e.currentTarget.src = activePhoto.fallbackSrc;
                      }
                    }}
                    className="w-full h-full object-contain max-h-[75vh]"
                  />
                </div>

                {/* Right: Technical Details & Story */}
                <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto bg-slate-900/95">
                  <div className="space-y-4">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30">
                      <span>{activePhoto.category}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl font-extrabold text-white leading-tight">
                        {activePhoto.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>{activePhoto.location}</span>
                        <span>•</span>
                        <span>Captured {activePhoto.date}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                      {activePhoto.story}
                    </p>
                  </div>

                  {/* Camera EXIF Details */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center space-x-1.5">
                      <Aperture className="w-3.5 h-3.5" />
                      <span>Camera & Exposure Metadata</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Lens / Focal</span>
                        <span className="font-semibold text-slate-200">{activePhoto.camera}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Exposure Settings</span>
                        <span className="font-semibold text-slate-200">{activePhoto.settings}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

