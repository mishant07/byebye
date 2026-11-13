'use client';
import React, { useEffect, useMemo } from 'react';
import { footballersList } from '@/config/footballers';

// ─────────────────────────────────────────────────────────────────
// 4 orbital rings — each at a different tilt, radius & speed
// 25 names per ring × 4 rings = all 100 legends orbit the ball
// ─────────────────────────────────────────────────────────────────
const RING_CONFIGS = [
  { radius: 210, tilt:  22, duration: 28, dir:  1 }, // inner — fast
  { radius: 355, tilt: -35, duration: 45, dir: -1 }, // mid-inner — reverse
  { radius: 505, tilt:  48, duration: 63, dir:  1 }, // mid-outer
  { radius: 668, tilt: -16, duration: 82, dir: -1 }, // outer — slow
];

// Color: CR7 → golden caramel, Real Madrid → dry sage, rest → rotate palette
const PALETTE = ['#D4A373', '#CCD5AE', '#E9EDC9', '#FAEDCD'];

function nameColor(f, ni) {
  if (f.isCR7)       return '#D4A373';
  if (f.isRealMadrid) return '#CCD5AE';
  return PALETTE[ni % PALETTE.length];
}

function nameOpacity(f, ni) {
  if (f.isCR7)       return 0.90;
  if (f.isRealMadrid) return 0.65;
  return 0.32 + (ni % 6) * 0.045;
}

function nameFontSize(f, ni) {
  if (f.isCR7)       return 16;
  if (f.isRealMadrid) return 13;
  return 10 + (ni % 4);
}

export default function FootballNamesBackground() {
  // Distribute all 100 names across 4 rings (25 each)
  const rings = useMemo(() =>
    RING_CONFIGS.map((cfg, ri) => ({
      ...cfg,
      names:     footballersList.slice(ri * 25, ri * 25 + 25),
      angleStep: 360 / 25,
    }))
  , []);

  // Inject CSS keyframes once
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById('fb-orbit-css')) return;

    const style = document.createElement('style');
    style.id = 'fb-orbit-css';
    style.textContent = `
      /* Ring spins — CW and CCW */
      @keyframes fb-cw  { from { transform: rotateY(0deg);    } to { transform: rotateY( 360deg); } }
      @keyframes fb-ccw { from { transform: rotateY(0deg);    } to { transform: rotateY(-360deg); } }

      /* Entrance: rings fade in staggered */
      @keyframes fb-ring-in {
        from { opacity: 0; transform: scale(0.4); }
        to   { opacity: 1; transform: scale(1);   }
      }

      /* Shimmer pulse on special names */
      @keyframes fb-shimmer {
        0%, 100% { text-shadow: 0 0 8px rgba(212,163,115,0.6); }
        50%       { text-shadow: 0 0 20px rgba(212,163,115,0.95), 0 0 40px rgba(212,163,115,0.4); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden',
        // 3D perspective — origin aligned to football position (≈56% left, 55% top)
        perspective: '1100px',
        perspectiveOrigin: '56% 55%',
      }}
    >
      {rings.map((ring, ri) => {
        const { radius, tilt, duration, dir, names, angleStep } = ring;
        const spinAnim = dir > 0 ? 'fb-cw' : 'fb-ccw';

        return (
          /* ── Tilt wrapper — sets the orbital plane angle ── */
          <div
            key={ri}
            style={{
              position: 'absolute',
              left: '56%',
              top: '55%',
              width: 0,
              height: 0,
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tilt}deg)`,
              // Staggered fade-in entrance
              animation: `fb-ring-in 1.4s ease-out ${ri * 0.35}s both`,
            }}
          >
            {/* ── Spin wrapper — rotates the whole ring ── */}
            <div
              style={{
                transformStyle: 'preserve-3d',
                animation: `${spinAnim} ${duration}s linear infinite`,
              }}
            >
              {names.map((f, ni) => {
                const angle   = ni * angleStep;
                const color   = nameColor(f, ni);
                const opacity = nameOpacity(f, ni);
                const size    = nameFontSize(f, ni);
                const isCR7   = f.isCR7;
                const isRM    = f.isRealMadrid;

                return (
                  <span
                    key={f.id}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      // Place each name at its orbital angle, pushed out to radius along Z
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      color,
                      opacity,
                      fontSize: `${size}px`,
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      textTransform: 'uppercase',
                      letterSpacing: '0.09em',
                      whiteSpace: 'nowrap',
                      // CR7 pulsing glow
                      animation: isCR7
                        ? 'fb-shimmer 2.8s ease-in-out infinite'
                        : isRM
                        ? 'fb-shimmer 4s ease-in-out infinite'
                        : 'none',
                      textShadow: (isCR7 || isRM)
                        ? `0 0 10px ${color}80`
                        : 'none',
                    }}
                  >
                    {isCR7 ? `⚽ ${f.name}` : f.name}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
