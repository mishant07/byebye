'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react';

/**
 * Procedural Telstar Football Texture (2048x1024)
 * High contrast: Deep rich black pentagons, crisp white leather panels, real stitching.
 */
function createFootballTexture() {
  const W = 2048, H = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Crisp off-white leather base
  ctx.fillStyle = '#F8F6F0';
  ctx.fillRect(0, 0, W, H);

  // Micro leather grain
  ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
  for (let i = 0; i < 4000; i++) {
    ctx.fillRect(Math.random() * W, Math.random() * H, 1.5, 1.5);
  }

  const R = 118;
  const pentVerts = (cx, cy, r, rot) =>
    Array.from({ length: 5 }, (_, i) => {
      const a = (i * 2 * Math.PI) / 5 - Math.PI / 2 + rot;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    });

  const drawPath = (verts) => {
    ctx.beginPath();
    verts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.closePath();
  };

  const drawStitches = (verts) => {
    ctx.fillStyle = '#5A5A5A';
    for (let i = 0; i < 5; i++) {
      const [x1, y1] = verts[i];
      const [x2, y2] = verts[(i + 1) % 5];
      for (let j = 1; j < 12; j++) {
        const t = j / 12;
        ctx.beginPath();
        ctx.arc(x1 + t * (x2 - x1), y1 + t * (y2 - y1), 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const patches = [
    { u: 0.500, v: 0.070, rot: 0.000 },
    { u: 0.100, v: 0.255, rot: 0.314 },
    { u: 0.300, v: 0.210, rot: 0.628 },
    { u: 0.700, v: 0.210, rot: 0.942 },
    { u: 0.900, v: 0.255, rot: 1.257 },
    { u: 0.080, v: 0.500, rot: 0.400 },
    { u: 0.420, v: 0.500, rot: 0.800 },
    { u: 0.580, v: 0.500, rot: 1.200 },
    { u: 0.920, v: 0.500, rot: 1.600 },
    { u: 0.100, v: 0.745, rot: 0.500 },
    { u: 0.300, v: 0.790, rot: 1.000 },
    { u: 0.700, v: 0.790, rot: 1.500 },
    { u: 0.900, v: 0.745, rot: 2.000 },
    { u: 0.500, v: 0.930, rot: 0.000 },
  ];

  patches.forEach(({ u, v, rot }) => {
    const cx = u * W;
    const cy = v * H;
    const seamVerts = pentVerts(cx, cy, R + 8, rot);
    const patchVerts = pentVerts(cx, cy, R, rot);

    ctx.fillStyle = '#CCCCCC';
    drawPath(seamVerts);
    ctx.fill();

    ctx.fillStyle = '#0E0E10';
    drawPath(patchVerts);
    ctx.fill();

    drawStitches(patchVerts);

    if (u < 0.15) {
      const sx = cx + W;
      ctx.fillStyle = '#CCCCCC';
      drawPath(pentVerts(sx, cy, R + 8, rot));
      ctx.fill();
      ctx.fillStyle = '#0E0E10';
      drawPath(pentVerts(sx, cy, R, rot));
      ctx.fill();
    }
  });

  ctx.strokeStyle = '#D0CCC4';
  ctx.lineWidth = 2.2;
  ctx.setLineDash([5, 4]);

  const seamConnections = [
    [[0.50, 0.07], [0.10, 0.255]], [[0.50, 0.07], [0.30, 0.21]],
    [[0.50, 0.07], [0.70, 0.21]],  [[0.50, 0.07], [0.90, 0.255]],
    [[0.10, 0.255], [0.08, 0.50]], [[0.30, 0.21], [0.42, 0.50]],
    [[0.70, 0.21], [0.58, 0.50]],  [[0.90, 0.255], [0.92, 0.50]],
    [[0.08, 0.50], [0.42, 0.50]],  [[0.58, 0.50], [0.92, 0.50]],
    [[0.08, 0.50], [0.10, 0.745]], [[0.42, 0.50], [0.30, 0.79]],
    [[0.58, 0.50], [0.70, 0.79]],  [[0.92, 0.50], [0.90, 0.745]],
    [[0.10, 0.745], [0.50, 0.93]], [[0.30, 0.79], [0.50, 0.93]],
    [[0.70, 0.79], [0.50, 0.93]],  [[0.90, 0.745], [0.50, 0.93]],
  ];

  seamConnections.forEach(([[u1, v1], [u2, v2]]) => {
    ctx.beginPath();
    ctx.moveTo(u1 * W, v1 * H);
    ctx.lineTo(u2 * W, v2 * H);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  return canvas;
}

export default function AppleShowcase({ onPhaseChange }) {
  const containerRef = useRef(null);
  const canvasMountRef = useRef(null);

  // Absolute DOM Refs for zero-rerender GPU transformations
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const dotsRef = useRef([]);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const lastReportedStep = useRef(1);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const ballMeshRef = useRef(null);
  const shadowMeshRef = useRef(null);
  const isVisibleRef = useRef(true);
  const prefersReducedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedRef.current = mq.matches;
    const handler = (e) => {
      prefersReducedRef.current = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Reliable scroll listener tracking container progress
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
          const scrolled = -rect.top;
          const p = Math.min(Math.max(scrolled / (totalScroll || 1), 0), 1);
          targetProgress.current = p;

          let step = 1;
          if (p > 0.72) step = 4;
          else if (p > 0.46) step = 3;
          else if (p > 0.20) step = 2;

          if (step !== lastReportedStep.current) {
            lastReportedStep.current = step;
            if (onPhaseChange) onPhaseChange(step);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onPhaseChange]);

  // Keep scene alive while in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Three.js Studio Scene
  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 13);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFFDF0, 1.2);
    keyLight.position.set(-6, 8, 8);
    scene.add(keyLight);

    const blueRim = new THREE.DirectionalLight(0x4C7DFF, 2.2);
    blueRim.position.set(6, -3, -5);
    scene.add(blueRim);

    const goldRim = new THREE.DirectionalLight(0xD6B36A, 1.9);
    goldRim.position.set(-6, -4, -5);
    scene.add(goldRim);

    // 3D Football Model
    const ballRadius = 2.4;
    const geometry = new THREE.SphereGeometry(ballRadius, 64, 64);

    const texture = new THREE.CanvasTexture(createFootballTexture());
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 24,
      specular: new THREE.Color(0x282828),
    });

    const ballMesh = new THREE.Mesh(geometry, material);
    ballMesh.position.set(0, -0.6, 0);
    scene.add(ballMesh);
    ballMeshRef.current = ballMesh;

    // Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(6.5, 6.5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 58);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    sGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
    sGrad.addColorStop(1, 'transparent');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -ballRadius - 0.7, 0);
    scene.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 60/120 FPS Native Render Loop
    let rafId;
    const clock = new THREE.Clock();

    const render = () => {
      rafId = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.12;
      const p = currentProgress.current;

      // 1. UPDATE 3D FOOTBALL & CAMERA
      if (ballMesh && camera && shadowMesh) {
        const ambientFloat = Math.sin(elapsedTime * 1.4) * 0.08;

        if (prefersReducedRef.current) {
          ballMesh.position.set(0, -0.6 + ambientFloat, 0);
          ballMesh.rotation.y = 0.5;
          camera.position.set(0, 0, 13);
        } else {
          if (p <= 0.25) {
            // STEP 1: Centered in lower half, headline above it
            const t1 = p / 0.25;
            const scale = 1.0 + t1 * 0.15;
            ballMesh.scale.set(scale, scale, scale);
            ballMesh.position.set(0, -0.6 + ambientFloat, 0);
            ballMesh.rotation.y = t1 * 0.6;
            ballMesh.rotation.x = 0.12;
            camera.position.set(0, 0, 13.0 - t1 * 1.0);
            shadowMesh.position.set(0, -0.6 - ballRadius * scale - 0.15, 0);
          } else if (p <= 0.50) {
            // STEP 2: Moves right (x: 3.2), scales up to 1.55x, rotates
            const t2 = (p - 0.25) / 0.25;
            const scale = 1.15 + t2 * 0.40;
            const posX = t2 * 3.2;
            ballMesh.scale.set(scale, scale, scale);
            ballMesh.position.set(posX, 0.1 + ambientFloat, 0);
            ballMesh.rotation.y = 0.6 + t2 * 1.4;
            ballMesh.rotation.x = 0.15 + t2 * 0.2;
            camera.position.set(0, 0, 12.0 - t2 * 1.2);
            shadowMesh.position.set(posX, 0.1 - ballRadius * scale - 0.15, 0);
          } else if (p <= 0.75) {
            // STEP 3: Stays on right side, orbits, leaves left clear for bullets
            const t3 = (p - 0.50) / 0.25;
            const scale = 1.55 - t3 * 0.3;
            const posX = 3.2 + t3 * 0.3;
            ballMesh.scale.set(scale, scale, scale);
            ballMesh.position.set(posX, 0.1 + ambientFloat, 0);
            ballMesh.rotation.y = 2.0 + t3 * 1.4;
            ballMesh.rotation.x = 0.35 - t3 * 0.25;
            camera.position.set(0, 0, 10.8 + t3 * 1.8);
            shadowMesh.position.set(posX, 0.1 - ballRadius * scale - 0.15, 0);
          } else {
            // STEP 4: Pulls back & shrinks to corner for transition
            const t4 = (p - 0.75) / 0.25;
            const scale = 1.25 - t4 * 0.7;
            const posX = 3.5 + t4 * 3.0;
            const posY = 0.1 - t4 * 2.5;
            ballMesh.scale.set(scale, scale, scale);
            ballMesh.position.set(posX, posY, -t4 * 2.0);
            ballMesh.rotation.y = 3.4 + t4 * 1.0;
            camera.position.set(0, 0, 12.6 + t4 * 2.0);
            shadowMesh.position.set(posX, posY - ballRadius * scale - 0.15, -t4 * 2.0);
          }
        }

        renderer.render(scene, camera);
      }

      // 2. DIRECT GPU COMPOSITOR TRANSFORMS FOR TEXT SLIDES
      // Step 1: 0.00 -> 0.22 (Top Center)
      if (step1Ref.current) {
        let op1 = 1;
        let y1 = 0;
        if (p > 0.16) {
          const f = Math.min((p - 0.16) / 0.07, 1);
          op1 = 1 - f;
          y1 = -f * 32;
        }
        step1Ref.current.style.opacity = op1.toFixed(3);
        step1Ref.current.style.transform = `translate3d(-50%, ${y1.toFixed(1)}px, 0)`;
        step1Ref.current.style.pointerEvents = op1 > 0.3 ? 'auto' : 'none';
      }

      // Step 2: 0.20 -> 0.48 (Left Side Card)
      if (step2Ref.current) {
        let op2 = 0;
        let x2 = -28;
        if (p >= 0.18 && p <= 0.48) {
          if (p < 0.26) {
            const f = (p - 0.18) / 0.08;
            op2 = f;
            x2 = (1 - f) * -28;
          } else if (p > 0.40) {
            const f = (p - 0.40) / 0.08;
            op2 = 1 - f;
            x2 = -f * 28;
          } else {
            op2 = 1;
            x2 = 0;
          }
        }
        step2Ref.current.style.opacity = op2.toFixed(3);
        step2Ref.current.style.transform = `translate3d(${x2.toFixed(1)}px, -50%, 0)`;
        step2Ref.current.style.pointerEvents = op2 > 0.3 ? 'auto' : 'none';
      }

      // Step 3: 0.46 -> 0.74 (Left Side Bullets)
      if (step3Ref.current) {
        let op3 = 0;
        let x3 = -28;
        if (p >= 0.44 && p <= 0.74) {
          if (p < 0.52) {
            const f = (p - 0.44) / 0.08;
            op3 = f;
            x3 = (1 - f) * -28;
          } else if (p > 0.66) {
            const f = (p - 0.66) / 0.08;
            op3 = 1 - f;
            x3 = -f * 28;
          } else {
            op3 = 1;
            x3 = 0;
          }
        }
        step3Ref.current.style.opacity = op3.toFixed(3);
        step3Ref.current.style.transform = `translate3d(${x3.toFixed(1)}px, -50%, 0)`;
        step3Ref.current.style.pointerEvents = op3 > 0.3 ? 'auto' : 'none';
      }

      // Step 4: 0.72 -> 1.00 (Transition Card)
      if (step4Ref.current) {
        let op4 = 0;
        let y4 = 28;
        if (p >= 0.70) {
          const f = Math.min((p - 0.70) / 0.08, 1);
          op4 = f;
          y4 = (1 - f) * 28;
        }
        step4Ref.current.style.opacity = op4.toFixed(3);
        step4Ref.current.style.transform = `translate3d(0, calc(-50% + ${y4.toFixed(1)}px), 0)`;
        step4Ref.current.style.pointerEvents = op4 > 0.3 ? 'auto' : 'none';
      }

      // Progress dots
      const activeIdx = p > 0.72 ? 3 : p > 0.46 ? 2 : p > 0.20 ? 1 : 0;
      dotsRef.current.forEach((dot, idx) => {
        if (!dot) return;
        if (idx === activeIdx) {
          dot.style.width = '24px';
          dot.style.backgroundColor = '#D6B36A';
        } else {
          dot.style.width = '6px';
          dot.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
        }
      });
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[360vh] bg-[#050608] text-white selection:bg-gold/30 selection:text-white"
      id="product-showcase"
      aria-label="Interactive 3D Product Showcase"
    >
      {/* Pinned Sticky Stage (100vh) — Works seamlessly now that overflow-x-hidden is removed from parents */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Stage Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(5, 6, 8, 0.8) 85%, #050608 100%)',
          }}
        />

        {/* Studio Spotlight Cone */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[700px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(214, 179, 106, 0.25) 0%, rgba(76, 125, 255, 0.15) 50%, transparent 75%)',
          }}
        />

        {/* WebGL Canvas Mount */}
        <div ref={canvasMountRef} className="absolute inset-0 z-0 pointer-events-none" />

        {/* ── ABSOLUTELY PINNED TEXT OVERLAYS: Positioned in Dedicated Screen Halves ── */}
        <div className="absolute inset-0 z-20 pointer-events-none max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* STEP 1: Upper-Center Card (Ball is in Lower Half) */}
          <div
            ref={step1Ref}
            style={{ willChange: 'transform, opacity' }}
            className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 flex flex-col items-center text-center transition-none"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0A0F1E]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-3 w-full">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-gold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Engineered For Precision</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Turning <span className="gold-shimmer-sweep">Vision</span> Into Reality.
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 max-w-lg mx-auto font-normal leading-relaxed">
                Scroll to inspect the architecture — full-stack scalability, offline AI, and performance-first systems.
              </p>
              <div className="pt-2 flex items-center justify-center space-x-2 text-xs font-mono uppercase tracking-widest text-gold animate-pulse">
                <span>Scroll to Explore</span>
                <span>↓</span>
              </div>
            </div>
          </div>

          {/* STEP 2: Left-Side Card (Ball is on Right Side) */}
          <div
            ref={step2Ref}
            style={{ willChange: 'transform, opacity', opacity: 0 }}
            className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-12 max-w-lg w-full transition-none pr-4"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0A0F1E]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold font-mono">
                01 / The Core Engine
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Full-Stack <br />
                <span className="text-gradient-primary">Engineering.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                High-concurrency microservices architected with FastAPI and React 19. Precision state synchronization, async data pipelines, and sub-100ms response latencies.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">FastAPI</span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">React 19</span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">Next.js 14</span>
                <span className="px-2.5 py-1 rounded bg-gold/15 border border-gold/30 text-gold font-semibold">Uvicorn ASGI</span>
              </div>
            </div>
          </div>

          {/* STEP 3: Left-Side Bullets (Ball is on Right Side) */}
          <div
            ref={step3Ref}
            style={{ willChange: 'transform, opacity', opacity: 0 }}
            className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-12 max-w-lg w-full transition-none pr-4"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0A0F1E]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-electric font-mono">
                  02 / Privacy & Intelligence
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Offline AI <br />
                  <span className="gold-shimmer-sweep">& Vision.</span>
                </h2>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-3 h-3 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">100% On-Device Privacy</h3>
                    <p className="text-xs text-neutral-400">Zero data leaves local memory; vector search runs on bare metal.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-electric/15 border border-electric/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Cpu className="w-3 h-3 text-electric" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">Multimodal Gemini Vision</h3>
                    <p className="text-xs text-neutral-400">Automated SKU extraction & visual price intelligence.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers className="w-3 h-3 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">Offline Mesh SOS Protocols</h3>
                    <p className="text-xs text-neutral-400">Sub-5-second emergency dispatch in cellular blackouts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4: Transition Card */}
          <div
            ref={step4Ref}
            style={{ willChange: 'transform, opacity', opacity: 0 }}
            className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-12 max-w-lg w-full transition-none pr-4"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0A0F1E]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold font-mono">
                03 / Production Proof
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Battle-Tested <br />
                <span className="text-gradient-primary">Deployments.</span>
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                Four production systems engineered for offline search, emergency safety, and real-time inventory intelligence.
              </p>
              <div className="pt-2 pointer-events-auto">
                <a
                  href="#projects"
                  className="btn-shine-sweep inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gold text-[#0E1630] font-bold text-sm shadow-gold-sm hover:bg-[#E5C888] transition-all"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Sequence Progress Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          {[0, 1, 2, 3].map((idx) => (
            <span
              key={idx}
              ref={(el) => (dotsRef.current[idx] = el)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: idx === 0 ? '24px' : '6px',
                backgroundColor: idx === 0 ? '#D6B36A' : 'rgba(255, 255, 255, 0.25)',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
