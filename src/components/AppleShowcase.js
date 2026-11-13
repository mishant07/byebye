'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react';

/**
 * Procedural Telstar Football Texture (2048x1024)
 * High-contrast: Deep rich black pentagons, crisp white leather panels, real stitching.
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

    // Seam border
    ctx.fillStyle = '#CCCCCC';
    drawPath(seamVerts);
    ctx.fill();

    // Deep rich black pentagon (never washed out)
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

  // Hexagonal connecting seam lines
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const ballMeshRef = useRef(null);
  const shadowMeshRef = useRef(null);
  const isVisibleRef = useRef(true);

  // Detect reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Track scroll progress through container [0, 1]
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
      const current = -rect.top;
      const p = Math.min(Math.max(current / (totalScroll || 1), 0), 1);
      targetProgress.current = p;

      let step = 1;
      if (p > 0.72) step = 4;
      else if (p > 0.46) step = 3;
      else if (p > 0.22) step = 2;

      setCurrentStep(step);
      if (onPhaseChange) onPhaseChange(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onPhaseChange]);

  // Pause render loop when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
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

    // Camera with comfortable field of view
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

    // ── STUDIO LIGHTING (Cinematic Darkroom Contrast) ────────────
    // Lower ambient light so dark pentagons stay deep black
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.35);
    scene.add(ambientLight);

    // Key Light from top-left
    const keyLight = new THREE.DirectionalLight(0xFFFDF0, 1.1);
    keyLight.position.set(-6, 8, 8);
    scene.add(keyLight);

    // Cool Electric Blue Rim Light (Right curvature)
    const blueRim = new THREE.DirectionalLight(0x4C7DFF, 1.9);
    blueRim.position.set(6, -3, -5);
    scene.add(blueRim);

    // Champagne Gold Rim Light (Opposite curvature)
    const goldRim = new THREE.DirectionalLight(0xD6B36A, 1.7);
    goldRim.position.set(-6, -4, -5);
    scene.add(goldRim);

    // ── 3D FOOTBALL MODEL (Sleek Product Proportions: Radius 2.5 vs former 3.4) ──
    const ballRadius = 2.5;
    const geometry = new THREE.SphereGeometry(ballRadius, 64, 64);

    const texture = new THREE.CanvasTexture(createFootballTexture());
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 22,
      specular: new THREE.Color(0x2A2A2A),
    });

    const ballMesh = new THREE.Mesh(geometry, material);
    // Initial position: centered in the lower-middle half so text never collides!
    ballMesh.position.set(0, -0.6, 0);
    scene.add(ballMesh);
    ballMeshRef.current = ballMesh;

    // ── CONTACT SHADOW ───────────────────────────────────────────
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

    let rafId;
    const clock = new THREE.Clock();

    const render = () => {
      rafId = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth scrub lerp
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.085;
      const p = currentProgress.current;
      setScrollProgress(p);

      if (ballMesh && camera && shadowMesh) {
        const ambientFloat = Math.sin(elapsedTime * 1.4) * 0.08;

        if (prefersReduced) {
          ballMesh.position.set(0, -0.6 + ambientFloat, 0);
          ballMesh.rotation.y = 0.5;
          camera.position.set(0, 0, 13);
        } else {
          // 4-STEP SCRUB SEQUENCE WITH GUARANTEED ZERO-TEXT-OVERLAP:

          if (p <= 0.25) {
            // STEP 1: Ball sits gracefully in lower-center area, headline sits cleanly in upper area
            const t1 = p / 0.25;
            const scale = 1.0 + t1 * 0.2;
            ballMesh.scale.set(scale, scale, scale);
            ballMesh.position.set(0, -0.6 + ambientFloat, 0);
            ballMesh.rotation.y = t1 * 0.6;
            ballMesh.rotation.x = 0.15;
            camera.position.set(0, 0, 13.0 - t1 * 1.0);
            shadowMesh.position.set(0, -0.6 - ballRadius * scale - 0.15, 0);
          } else if (p <= 0.50) {
            // STEP 2: Ball moves to RIGHT, text reveals on LEFT
            const t2 = (p - 0.25) / 0.25;
            const scale = 1.2 + t2 * 0.45; // Zooms up to 1.65x
            const posX = t2 * 3.4; // Slides to the right half
            ballMesh.scale.set(scale, scale, scale);
            ballMesh.position.set(posX, 0.2 + ambientFloat, 0);
            ballMesh.rotation.y = 0.6 + t2 * 1.4;
            ballMesh.rotation.x = 0.2 + t2 * 0.25;
            camera.position.set(0, 0, 12.0 - t2 * 1.5);
            shadowMesh.position.set(posX, -ballRadius * scale - 0.1, 0);
          } else if (p <= 0.75) {
            // STEP 3: Ball stays on RIGHT, camera orbits side view, 3 bullets on LEFT
            const t3 = (p - 0.50) / 0.25;
            const scale = 1.65 - t3 * 0.35; // 1.3x
            const posX = 3.4 + t3 * 0.4;
            ballMesh.scale.set(scale, scale, scale);
            ballMesh.position.set(posX, 0.2 + ambientFloat, 0);
            ballMesh.rotation.y = 2.0 + t3 * 1.4;
            ballMesh.rotation.x = 0.45 - t3 * 0.3;
            camera.position.set(0, 0, 10.5 + t3 * 1.8);
            shadowMesh.position.set(posX, -ballRadius * scale - 0.1, 0);
          } else {
            // STEP 4: Ball pulls back & shrinks to corner for transition
            const t4 = (p - 0.75) / 0.25;
            const scale = 1.3 - t4 * 0.75; // 0.55x
            const posX = 3.8 + t4 * 3.0;
            const posY = 0.2 - t4 * 2.8;
            ballMesh.scale.set(scale, scale, scale);
            ballMesh.position.set(posX, posY, -t4 * 2.5);
            ballMesh.rotation.y = 3.4 + t4 * 1.0;
            camera.position.set(0, 0, 12.3 + t4 * 2.0);
            shadowMesh.position.set(posX, posY - ballRadius * scale - 0.1, -t4 * 2.5);
          }
        }
      }

      renderer.render(scene, camera);
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
  }, [prefersReduced]);

  return (
    <section
      ref={containerRef}
      className="relative h-[360vh] bg-[#050608] text-white selection:bg-gold/30 selection:text-white"
      id="product-showcase"
      aria-label="Interactive 3D Product Showcase"
    >
      {/* Pinned Sticky Stage (100vh) */}
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

        {/* ── HTML TEXT OVERLAYS: Placed in Dedicated Safe Zones ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 pointer-events-none h-full flex flex-col justify-between py-24">
          
          {/* STEP 1 TEXT (0.00 - 0.22): Positioned in UPPER Half — Ball is in LOWER Half! */}
          <div
            className={`transition-all duration-500 flex flex-col items-center text-center max-w-3xl mx-auto pt-6 sm:pt-10 ${
              scrollProgress < 0.22 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
            }`}
          >
            {/* Dark glass backdrop to guarantee 100% readability */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0A0F1E]/85 backdrop-blur-xl border border-white/12 shadow-2xl space-y-3">
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

          {/* STEP 2 TEXT (0.22 - 0.48): Positioned on LEFT — Ball is on RIGHT! */}
          <div
            className={`my-auto max-w-lg transition-all duration-500 ${
              scrollProgress >= 0.22 && scrollProgress < 0.48
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8 pointer-events-none'
            }`}
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

          {/* STEP 3 TEXT (0.48 - 0.74): Positioned on LEFT — Ball is on RIGHT! */}
          <div
            className={`my-auto max-w-lg transition-all duration-500 ${
              scrollProgress >= 0.48 && scrollProgress < 0.74
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8 pointer-events-none'
            }`}
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

              {/* 3 Clear Bullet Points */}
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

          {/* STEP 4 TEXT (0.74 - 1.00): Transition Call to Projects */}
          <div
            className={`my-auto max-w-lg transition-all duration-500 ${
              scrollProgress >= 0.74
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
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
          {[1, 2, 3, 4].map((step) => (
            <span
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentStep === step ? 'w-6 bg-gold' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
