import React from 'react';

export const GithubIcon = ({ className = "w-5 h-5", ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    className={className}
    {...rest}
  >
    <path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32Z" />
  </svg>
);

export const LinkedInIcon = ({ className = "w-5 h-5", ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={className}
    {...rest}
  >
    <path d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82 19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4ZM38 59.627c0 11.865 9.767 21.627 21.632 21.627 11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38 47.762 38 38 47.763 38 59.627Zm6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4Z" />
  </svg>
);

export const TwitterIcon = ({ className = "w-5 h-5", ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 209"
    fill="currentColor"
    className={className}
    {...rest}
  >
    <path d="M256 25.45a105.04 105.04 0 0 1-30.166 8.27c10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45" />
  </svg>
);

export const DribbbleIcon = ({ className = "w-5 h-5", ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    className={className}
    {...rest}
  >
    <path d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-28.393-17.831-41.934 90.224-41.247 117.498-83.203 117.498-83.203zm-17.831-18.068s-27.274 41.956-117.498 83.203c-36.953-68.421-77.348-124.966-77.348-124.966 84.179-24.878 174.526 8.351 194.846 41.763zM212.75 51.521s40.395 56.545 77.348 124.966c-94.673 25.992-184.288 25.688-219.06 25.385C88.22 131.957 144.595 72.827 212.75 51.521zM52.195 256c0-1.637.039-3.264.089-4.891 34.772.303 124.387.607 219.06-25.385 6.65 13.541 12.079 27.893 17.831 41.934-80.45 22.846-156.401 93.308-156.401 93.308-50.648-27.186-80.579-68.563-80.579-104.966zm38.188 132.839s75.951-70.462 156.401-93.308c35.602 97.452 50.047 165.719 50.047 165.719-86.425 21.056-169.215-20.908-206.448-72.411zm229.414 62.532s-14.445-68.267-50.047-165.719c70.484-8.864 140.518 5.341 147.502 6.818-4.004 69.191-44.588 126.548-97.455 158.901z"/>
  </svg>
);

export const CircularBadge = ({ 
  text = "• SOFTWARE ENGINEER • FULL STACK • OFFLINE AI • SYSTEMS ", 
  href = "#contact",
  className = "" 
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Outer rotating circular text - cleanly sized to avoid overlapping cards */}
      <div className="w-28 h-28 sm:w-32 sm:h-32 animate-spin-slow opacity-90 hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            id="badgeCirclePath"
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
            fill="none"
          />
          <text className="text-[9px] font-bold tracking-[2px] uppercase fill-charcoal dark:fill-cream">
            <textPath href="#badgeCirclePath" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Connect button with high contrast WCAG AA: charcoal text on gold */}
      <a
        href={href}
        className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-charcoal font-bold text-xs flex items-center justify-center shadow-md border border-primary/60 hover:scale-105 hover:bg-[#B89255] transition-all duration-200 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="Connect with Mishant"
      >
        Connect
      </a>
    </div>
  );
};
