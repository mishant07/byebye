import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Trophy, Crown, Sparkles, Search, X, Award, Shield, Compass, RotateCcw } from 'lucide-react';
import { footballersList } from '@/config/footballers';
import { playClickSound } from '@/utils/audio';
import { useTheme } from '../pages/_app';

export default function FootballSphere3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const elementsRef = useRef([]);
  const mouseRef = useRef({ targetX: 0.003, targetY: 0.004 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const { soundEnabled } = useTheme();

  // Filter 100 footballers
  const filteredList = footballersList.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.club.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'Real Madrid') return player.isRealMadrid;
    if (activeFilter === 'CR7') return player.isCR7;
    if (activeFilter === 'Ballon d’Or') return player.achievements.includes('Ballon d’Or');
    return true;
  });

  // 1. Initialize Central 3D Football (Three.js WebGL)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(220, 220);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xD4AF7A, 2.0); // Gold sheen
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x818CF8, 1.4); // Celestial sheen
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    // 3D Classic Football Core (Truncated Icosahedron / Geodesic soccer ball)
    const ballGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0xFAFAFA,
      roughness: 0.25,
      metalness: 0.15,
      wireframe: false,
    });
    const soccerBall = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(soccerBall);

    // Dark Pentagon / Hexagon seam lines overlay
    const wireGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.62, 1));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x11131C,
      linewidth: 2,
    });
    const seams = new THREE.LineSegments(wireGeo, wireMat);
    soccerBall.add(seams);

    // Golden Halo Ring around the football
    const ringGeo = new THREE.TorusGeometry(2.1, 0.03, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xD4AF7A,
      transparent: true,
      opacity: 0.6,
    });
    const haloRing = new THREE.Mesh(ringGeo, ringMat);
    haloRing.rotation.x = Math.PI / 3;
    scene.add(haloRing);

    let frameId;
    const animateBall = () => {
      frameId = requestAnimationFrame(animateBall);
      soccerBall.rotation.y += 0.012;
      soccerBall.rotation.x += 0.006;
      haloRing.rotation.z += 0.008;
      renderer.render(scene, camera);
    };
    animateBall();

    return () => {
      cancelAnimationFrame(frameId);
      ballGeometry.dispose();
      ballMaterial.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  // 2. 3D Spherical Fibonacci Orbit for 100 Footballers
  useEffect(() => {
    const count = footballersList.length;
    const radius = 220; // 3D orbit sphere radius
    const phiSpan = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    const coords = footballersList.map((player, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;

      return {
        id: player.id,
        x: Math.cos(theta) * radiusAtY * radius,
        y: y * radius,
        z: Math.sin(theta) * radiusAtY * radius,
      };
    });

    let animationFrameId;
    let rotationSpeedX = 0.002;
    let rotationSpeedY = 0.003;

    const handleMouseDown = (e) => {
      isDragging.current = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;
        mouseRef.current.targetX = deltaY * 0.0006;
        mouseRef.current.targetY = deltaX * 0.0006;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        return;
      }

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseRef.current.targetX = -y * 0.008;
      mouseRef.current.targetY = x * 0.008;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      mouseRef.current.targetX = 0.002;
      mouseRef.current.targetY = 0.003;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    const focalLength = 360;

    // Smooth continuous 3D rotation matrix animation loop
    const rotate = () => {
      rotationSpeedX += (mouseRef.current.targetX - rotationSpeedX) * 0.05;
      rotationSpeedY += (mouseRef.current.targetY - rotationSpeedY) * 0.05;

      const cosX = Math.cos(rotationSpeedX);
      const sinX = Math.sin(rotationSpeedX);
      const cosY = Math.cos(rotationSpeedY);
      const sinY = Math.sin(rotationSpeedY);

      for (let i = 0; i < coords.length; i++) {
        const item = coords[i];

        // Rotate around X
        const y1 = item.y * cosX - item.z * sinX;
        const z1 = item.z * cosX + item.y * sinX;

        // Rotate around Y
        const x2 = item.x * cosY + z1 * sinY;
        const z2 = z1 * cosY - item.x * sinY;

        item.x = x2;
        item.y = y1;
        item.z = z2;

        const el = elementsRef.current[item.id];
        if (el) {
          const scale = focalLength / (focalLength - item.z);
          const alpha = (item.z + 220) / 440;
          const zIndex = Math.round(item.z + 300);

          el.style.transform = `translate3d(${item.x.toFixed(1)}px, ${item.y.toFixed(1)}px, 0) scale(${Math.max(
            0.5,
            Math.min(1.15, scale)
          ).toFixed(2)})`;
          el.style.opacity = Math.max(0.18, Math.min(1, alpha * 0.85 + 0.15)).toFixed(2);
          el.style.zIndex = zIndex;
        }
      }

      animationFrameId = requestAnimationFrame(rotate);
    };

    animationFrameId = requestAnimationFrame(rotate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    playClickSound(soundEnabled);
  };

  return (
    <section id="football" className="relative py-24 md:py-32 overflow-hidden bg-slate-100/60 dark:bg-[#07080B] border-y border-slate-200/80 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-accentGold text-xs font-bold uppercase tracking-wider border border-primary/25 shadow-sm">
            <span>👑</span>
            <span>Real Madrid & 100 Football Legends</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            The Football <span className="text-gradient-primary">Pantheon.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            A 3D tribute to the sport that fuels my discipline and relentless drive. At the center spins the football, surrounded by <strong className="text-slate-900 dark:text-white font-bold">100 iconic footballers</strong> orbiting in 3D — led by <strong className="text-primary dark:text-accentGold font-bold">Cristiano Ronaldo (CR7)</strong> and the European royalty of <strong className="text-primary font-bold">Real Madrid C.F.</strong>
          </p>
        </div>

        {/* Real Madrid & CR7 Spotlight Showcase Bar */}
        <div className="max-w-4xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-white dark:bg-darkCard/90 border border-primary/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-2xl shadow-inner">
              ⚽
            </div>
            <div>
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  Real Madrid C.F. (Madridista)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-primary text-slate-950">
                  15× UCL Kings
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Idol: <strong className="text-primary dark:text-accentGold">Cristiano Ronaldo (CR7)</strong> — 450 goals in 438 matches • 5× Ballon d’Or
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter('CR7')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary text-slate-950 hover:bg-accentGold transition-all shadow-sm"
            >
              CR7 Tribute
            </button>
            <button
              onClick={() => setActiveFilter('Real Madrid')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 transition-all shadow-sm"
            >
              Real Madrid (40)
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'Real Madrid', 'Ballon d’Or', 'CR7'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveFilter(tab);
                  playClickSound(soundEnabled);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === tab
                    ? 'bg-slate-900 text-white dark:bg-primary dark:text-slate-950 shadow-md'
                    : 'bg-white/80 dark:bg-darkCard/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.08] hover:border-primary/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100 players..."
              className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs bg-white/90 dark:bg-darkCard/90 border border-slate-200 dark:border-white/[0.08] focus:outline-none focus:border-primary transition-all text-slate-900 dark:text-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Interactive 3D Orbit Stage */}
        <div className="relative py-8 flex flex-col items-center justify-center select-none overflow-hidden min-h-[520px] sm:min-h-[560px]">
          
          {/* Central 3D Football WebGL Canvas */}
          <div className="absolute z-10 flex flex-col items-center justify-center pointer-events-none">
            <canvas ref={canvasRef} className="w-[200px] h-[200px] drop-shadow-2xl" />
            <div className="mt-1 px-3 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-black uppercase text-primary dark:text-accentGold border border-primary/30 shadow-md">
              Hala Madrid y nada más
            </div>
          </div>

          {/* 3D Orbiting Footballer Name Pills (100 Players) */}
          <div
            ref={containerRef}
            className="relative w-full max-w-2xl h-[460px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {footballersList.map((player) => {
              const isHighlighted = filteredList.some((p) => p.id === player.id);
              const isMadrid = player.isRealMadrid;
              const isCR7 = player.isCR7;

              return (
                <button
                  key={player.id}
                  ref={(el) => (elementsRef.current[player.id] = el)}
                  onClick={() => handlePlayerClick(player)}
                  style={{ display: isHighlighted ? 'block' : 'none' }}
                  className={`absolute px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-200 shadow-sm will-change-transform ${
                    isCR7
                      ? 'bg-gradient-to-r from-amber-400 via-primary to-amber-300 text-slate-950 ring-2 ring-amber-300 shadow-glow-gold scale-110 font-black'
                      : isMadrid
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-primary/60 dark:border-primary/80 hover:bg-primary dark:hover:bg-primary hover:text-slate-950 dark:hover:text-slate-950 shadow-md'
                      : 'bg-white/80 dark:bg-darkCard/80 backdrop-blur-md border border-slate-200/90 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-white hover:bg-slate-900 dark:hover:bg-primary dark:hover:text-slate-950'
                  }`}
                >
                  <span className="flex items-center space-x-1">
                    {isCR7 && <span>👑</span>}
                    {isMadrid && !isCR7 && <span className="text-[10px] text-primary">⚪</span>}
                    <span>{player.short || player.name}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-primary" />
            <span>Click and drag to spin the 100 Footballers Sphere in 3D • Click any player for career stats</span>
          </p>
        </div>

        {/* Player Detail Card Lightbox Modal */}
        <AnimatePresence>
          {selectedPlayer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedPlayer(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="flex items-start space-x-3.5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md ${
                    selectedPlayer.isCR7
                      ? 'bg-amber-400/20 border-2 border-amber-400 text-amber-500'
                      : selectedPlayer.isRealMadrid
                      ? 'bg-primary/20 border border-primary text-primary'
                      : 'bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                  }`}>
                    {selectedPlayer.isCR7 ? '👑' : '⚽'}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        {selectedPlayer.name}
                      </h3>
                      {selectedPlayer.isRealMadrid && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                          Madridista
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {selectedPlayer.role} • {selectedPlayer.country}
                    </p>
                  </div>
                </div>

                {/* Club & Status */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Primary Club
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {selectedPlayer.club}
                  </div>
                </div>

                {/* Career Achievements */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary dark:text-accentGold flex items-center space-x-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Career Legacy & Milestones</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {selectedPlayer.achievements}
                  </p>
                </div>

                {/* CR7 Special Quote if Cristiano Ronaldo */}
                {selectedPlayer.isCR7 && (
                  <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/25 text-xs text-slate-800 dark:text-slate-200 font-mono italic">
                    &ldquo;Dedication, hard work all the time, and belief. Talent without working hard is nothing.&rdquo; — Cristiano Ronaldo
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
