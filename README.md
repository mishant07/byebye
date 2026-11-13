# 🌟 Mishant Gautam — Portfolio & Systems Engineering

A professional, high-performance developer portfolio built with **Next.js 14**, **Three.js (WebGL)**, **Tailwind CSS**, and **Framer Motion**.

Combines the sleek visual aesthetics and skills layout of Jack Portfolio with the interactive modern design, clean typography, and 3D interactions of Next.js Developer Portfolio, fully customized with **Mishant Gautam's** authentic credentials, resume projects, and competitive honors.

---

## 👨‍💻 About Mishant Gautam
- **Institution**: Maharaja Agrasen Institute of Technology (MAIT), Delhi
- **Degree**: B.Tech in Information Technology
- **Core Focus**: Offline AI Systems, Full-Stack Development (React 19, FastAPI), and Multimodal Intelligence
- **Contact**: `gautammishant48@gmail.com` • `+91-9971773980`
- **GitHub**: [mishant07](https://github.com/mishant07)
- **LinkedIn**: [mishant-gautam](https://linkedin.com/in/mishant-gautam-50872b274)

---

## 🚀 Key Sections & Architecture

### 1. 🌌 Interactive 3D WebGL Background (`ThreeCanvas.js`)
- **GPU-Accelerated 3D Geometry**: Floating wireframe icosahedron and dual concentric torus rings.
- **Dynamic Particle Constellation**: 900+ multi-hued particles with real-time cursor physics and depth parallax.
- **Zero Layout Shift**: Fixed background layer with adaptive dark/light blending modes.

### 2. ⚡ Executive Hero Section (`Hero.js`)
- **Dynamic Perspective 3D Tilt**: Interactive cursor-tracked portrait card using Mishant's photo with holographic light glare simulation.
- **Rotating Specialization Headline**: Seamlessly transitions between core technical competencies (*Full-Stack Engineering*, *Offline AI & Search Tools*, *FastAPI & Microservices*, *React 19 & Modern Web*, *Multimodal Vision Systems*).
- **Executive Profile Badge**: Clean MAIT Information Technology student indicator without repetitive award slogans.

### 3. 💻 Authentic Resume Projects (`Projects.js`)
All dummy/placeholder projects have been removed. Every project card showcases Mishant's real-world systems:
1. **Nukkad — Hyperlocal Commerce & Retail Intelligence**:
   - Google Gemini Vision API for multimodal inventory attribute extraction.
   - FastAPI scraping engine for live competitive retail price intelligence.
2. **Recall — 100% Offline AI Search System**:
   - Zero-cloud local embeddings and semantic parsing for privacy-first natural language document discovery.
3. **Solve For Her — Women’s Safety Application**:
   - Under-5-second emergency dispatch with offline SOS triggers, mesh network protocols, and automated coordinate broadcast.
4. **Sehat Link — Secure Video Consultation Platform**:
   - Direct peer-to-peer WebRTC video telemedicine portal with real-time scheduling.

### 4. 🛠️ Interactive Skills Matrix & 3D Tech Sphere (`Skills.js` & `TechSphere3D.js`)
- Tabbed categorical breakdown of languages, frameworks, backend architectures, AI/ML tools, and developer utilities.
- Interactive 3D spherical tag cloud rotating on a Fibonacci sphere with 60–120 FPS performance and mouse inertia.

### 5. 🏆 Dedicated Hackathons & Honors Section (`Experience.js`)
All awards and honors are structured cleanly in one dedicated, executive section rather than scattered across the site:
- **1st Position (Winner)** — *Solve For Her Hackathon* (Women-Centric Safety Innovation Track)
- **2nd Position (Runner's Up)** — *Singularity AI Hackathon (Parsec 6.0)* (Regional Technical & AI Contest)

### 6. 🎓 Education Milestones (`Education.js`)
- **Maharaja Agrasen Institute of Technology (MAIT)** — B.Tech in Information Technology (2024–2028)
- **Kendriya Vidyalaya Pragati Vihar** — High School Diploma in Computer Science (2022–2024)

### 7. 📸 Photography Portfolio — "Through My Lens" (`Photography.js`)
- Dedicated gallery showcasing visual stories, street shots, architectural geometry, and campus perspectives.
- Dynamic category filtering (*All*, *Architecture & Geometry*, *Street & Urban*, *Golden Hour & Skies*, *Campus & Perspectives*).
- Interactive Lightbox modal featuring exposure settings, camera focal lens details, location tags, and backstory.
- Configurable directly from `src/config/photography.js` and `public/images/photography/`.

### 8. ⚽ Real Madrid & CR7 Athletic Mentality
- Glimpse into football passion: **Real Madrid C.F.** (15× UCL Champions) & **Cristiano Ronaldo (CR7)**.
- Integrated into the About section and Hero DNA: translating CR7's relentless work ethic, obsessive preparation, and composure under pressure directly into software architecture and late-night problem solving.

### 9. 📬 Interactive Contact Portal (`Contact.js`)
- Direct contact form with animated celebratory confetti in champagne gold and platinum.
- One-click copy buttons for email and phone number with audio feedback and toast confirmation.
- Direct links to GitHub and LinkedIn.

---

## 🛠️ Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note on Cache**: The `dev` command is configured to automatically flush any stale `.next` cache (`rm -rf .next && next dev`), preventing 404 chunk errors when alternating between production builds and dev mode.

### 3. Production Build & Start
```bash
npm run build
npm start
```
