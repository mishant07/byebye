'use client';
import React from 'react';
import { footballersList } from '@/config/footballers';

export default function FootballMarquee() {
  const displayList = footballersList.slice(0, 50);

  return (
    <div 
      className="relative w-full overflow-hidden py-3 sm:py-3.5 border-y border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md select-none z-20"
      aria-label="Football Legends Marquee"
    >
      {/* Edge gradient fade masks for smooth infinity illusion */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-light dark:from-[#0A0F1E] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-light dark:from-[#0A0F1E] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
        {/* Track 1 */}
        <div className="flex items-center space-x-6 sm:space-x-8 shrink-0 pr-6 sm:pr-8">
          {displayList.map((player) => (
            <div 
              key={`track1-${player.id}`} 
              className="inline-flex items-center space-x-2.5 text-xs sm:text-sm font-medium tracking-wider uppercase font-mono"
            >
              <span className={player.isCR7 ? "text-gold font-bold drop-shadow-sm" : player.isRealMadrid ? "text-gold/90 font-semibold" : "text-charcoalMuted dark:text-creamMuted/80"}>
                {player.isCR7 ? '👑 ' : player.isRealMadrid ? '⚪ ' : '• '}
                {player.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-charcoalMuted/80 dark:text-creamMuted/70 font-sans normal-case">
                {player.club.split('/')[0].trim()}
              </span>
            </div>
          ))}
        </div>

        {/* Track 2 (Duplicate for continuous seamless loop) */}
        <div className="flex items-center space-x-6 sm:space-x-8 shrink-0 pr-6 sm:pr-8" aria-hidden="true">
          {displayList.map((player) => (
            <div 
              key={`track2-${player.id}`} 
              className="inline-flex items-center space-x-2.5 text-xs sm:text-sm font-medium tracking-wider uppercase font-mono"
            >
              <span className={player.isCR7 ? "text-gold font-bold drop-shadow-sm" : player.isRealMadrid ? "text-gold/90 font-semibold" : "text-charcoalMuted dark:text-creamMuted/80"}>
                {player.isCR7 ? '👑 ' : player.isRealMadrid ? '⚪ ' : '• '}
                {player.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-charcoalMuted/80 dark:text-creamMuted/70 font-sans normal-case">
                {player.club.split('/')[0].trim()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
