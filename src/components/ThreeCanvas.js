import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Authentic Telstar Football Texture (2048x1024)
 * Real black pentagons, crisp white leather panels, subtle seams and stitch marks.
 */
function createAuthenticFootballTexture() {
  const W = 2048, H = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Base off-white leather
  ctx.fillStyle = '#F5F3EC';
  ctx.fillRect(0, 0, W, H);

  // Subtle natural leather texture grain
  ctx.fillStyle = 'rgba(0, 0, 0, 0.025)';
  for (let i = 0; i < 3500; i++) {
    const rx = Math.random() * W;
    const ry = Math.random() * H;
    ctx.fillRect(rx, ry, 1.5, 1.5);
  }

  // Pentagon circumradius
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
    ctx.fillStyle = '#6E6E6E';
    for (let i = 0; i < 5; i++) {
      const [x1, y1] = verts[i];
      const [x2, y2] = verts[(i + 1) % 5];
      const dots = 12;
      for (let j = 1; j < dots; j++) {
        const t = j / dots;
        ctx.beginPath();
        ctx.arc(x1 + t * (x2 - x1), y1 + t * (y2 - y1), 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  // 12 Pentagon UV coordinates (truncated icosahedron projection)
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

  const drawPatch = (cx, cy, rot) => {
    const seamVerts = pentVerts(cx, cy, R + 8, rot);
    const patchVerts = pentVerts(cx, cy, R, rot);

    // Subtle seam line
    ctx.fillStyle = '#CCCCCC';
    drawPath(seamVerts);
    ctx.fill();

    // Deep black pentagonal patch
    ctx.fillStyle = '#181818';
    drawPath(patchVerts);
    ctx.fill();

    // Perimeter stitches
    drawStitches(patchVerts);
  };

  patches.forEach(({ u, v, rot }) => {
    const cx = u * W;
    const cy = v * H;
    drawPatch(cx, cy, rot);
    if (u < 0.15) drawPatch(cx + W, cy, rot);
    if (u > 0.85) drawPatch(cx - W, cy, rot);
  });

  // Inter-panel seam lines
  ctx.strokeStyle = '#CCC8C0';
  ctx.lineWidth = 2;
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

export default function ThreeCanvas({ theme = 'dark' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth || 440;
    const height = container.clientHeight || 440;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const isDark = theme === 'dark';

    // ── Balanced Studio Lighting ───────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, isDark ? 0.65 : 0.85);
    scene.add(ambientLight);

    // Key Light (top-left)
    const keyLight = new THREE.DirectionalLight(0xFFFBF0, isDark ? 0.95 : 0.75);
    keyLight.position.set(-6, 7, 8);
    scene.add(keyLight);

    // GOLD RIM LIGHT (Champagne Gold glow tracing edge)
    const goldRimLight = new THREE.DirectionalLight(0xD6B36A, isDark ? 1.4 : 0.8);
    goldRimLight.position.set(5, -4, -6);
    scene.add(goldRimLight);

    // Subtle Electric Blue Accent Light (back-top-right)
    const blueAccentLight = new THREE.DirectionalLight(0x4C7DFF, isDark ? 0.45 : 0.2);
    blueAccentLight.position.set(4, 5, -5);
    scene.add(blueAccentLight);

    // ── Ball Geometry ──────────────────────────────────────────────
    const ballRadius = 5.2;
    const geometry = new THREE.SphereGeometry(ballRadius, 64, 64);

    const texCanvas = createAuthenticFootballTexture();
    const texture = new THREE.CanvasTexture(texCanvas);
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Matte leather material with natural distributed specular
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 16,
      specular: new THREE.Color(0x3A3A3A),
      transparent: true,
      opacity: isDark ? 0.92 : 0.85,
    });

    const ball = new THREE.Mesh(geometry, material);
    ball.position.set(0, 0, 0);
    scene.add(ball);

    // ── Soft Contact Shadow ────────────────────────────────────────
    const shadowGeo = new THREE.PlaneGeometry(8.5, 8.5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
    sGrad.addColorStop(0, isDark ? 'rgba(0, 0, 0, 0.55)' : 'rgba(14, 22, 48, 0.22)');
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
    shadowMesh.position.set(0, -ballRadius - 0.2, 0);
    scene.add(shadowMesh);

    // ── Mouse parallax & smooth rotation ───────────────────────────
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 440;
      const h = container.clientHeight || 440;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop: slowed, majestic rotation
    let rafId;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      if (!prefersReducedMotion) {
        ball.rotation.y = delta * 0.035 + targetX * 0.16;
        ball.rotation.x = delta * 0.02 + targetY * 0.12;
        ball.rotation.z = 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full pointer-events-none select-none flex items-center justify-center"
      aria-hidden="true"
    />
  );
}
