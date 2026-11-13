/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── "Bernabéu Night" Cinematic Palette ────────────────────────
        // Dark Theme Tokens
        navyDark: "#0A0F1E",       // Midnight navy start
        navyDeep: "#111A33",       // Midnight navy end
        glassDark: "rgba(255, 255, 255, 0.05)",
        glassBorderDark: "rgba(255, 255, 255, 0.10)",
        glassHoverDark: "rgba(255, 255, 255, 0.08)",
        
        // Light Theme Tokens
        ivoryLight: "#F7F4EC",     // Warm ivory background
        glassLight: "rgba(255, 255, 255, 0.85)",
        glassBorderLight: "rgba(14, 22, 48, 0.10)",
        navyText: "#0E1630",       // Primary text light theme
        navyMuted: "#455173",      // Secondary text light theme

        // Primary Accents
        gold: {
          DEFAULT: "#D6B36A",      // Champagne Gold
          light: "#E5C888",
          dark: "#B89248",
          glow: "rgba(214, 179, 106, 0.25)",
        },
        electric: {
          DEFAULT: "#4C7DFF",      // Soft Electric Blue
          light: "#7099FF",
          dark: "#2A5FE8",
          glow: "rgba(76, 125, 255, 0.25)",
        },

        // Legacy / Standard Mappings
        primary: "#D6B36A",        // Gold
        primaryDark: "#4C7DFF",    // Electric Blue
        accentGold: "#D6B36A",
        accentBlue: "#4C7DFF",
        dark: "#0A0F1E",
        darkCard: "rgba(255, 255, 255, 0.05)",
        darkBorder: "rgba(255, 255, 255, 0.10)",
        light: "#F7F4EC",
        lightCard: "rgba(255, 255, 255, 0.90)",
        lightBorder: "rgba(14, 22, 48, 0.10)",
        charcoal: "#0E1630",
        charcoalMuted: "#455173",
        cream: "#F4F1EA",
        creamMuted: "#B9BED0",
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'spin-reverse': 'spin-reverse 28s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'aurora': 'aurora 18s ease-in-out infinite alternate',
        'shimmer-gold': 'shimmerGold 3.5s ease-in-out infinite',
        'beam-pulse': 'beamPulse 8s ease-in-out infinite alternate',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'aurora': {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate(40px, -30px) rotate(15deg) scale(1.15)' },
          '100%': { transform: 'translate(-30px, 20px) rotate(-10deg) scale(0.95)' },
        },
        'shimmerGold': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'beamPulse': {
          '0%': { opacity: '0.2', transform: 'rotate(-25deg) scaleY(0.9)' },
          '50%': { opacity: '0.45', transform: 'rotate(-23deg) scaleY(1.08)' },
          '100%': { opacity: '0.25', transform: 'rotate(-27deg) scaleY(0.95)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(214, 179, 106, 0.20)',
        'gold-md': '0 0 25px rgba(214, 179, 106, 0.35)',
        'blue-glow': '0 0 25px rgba(76, 125, 255, 0.25)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
