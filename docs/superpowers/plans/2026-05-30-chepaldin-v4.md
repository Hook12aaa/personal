# chepaldin-v4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Single-page personal brand site with particle network background, centered card layout, and brand colours — Vite + vanilla JS, zero production dependencies.

**Architecture:** One HTML file with inline content, one CSS file for all styles, one JS file for the Canvas 2D particle network. Assets (headshot, favicon) served from `public/`. Google Fonts loaded via CDN link in `<head>`.

**Tech Stack:** Vite 6+, vanilla JS, Canvas 2D API, CSS

---

### Task 1: Project scaffold and assets

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `.gitignore`
- Copy: `public/assets/headshot.jpg` (from v1)
- Copy: `public/favicon.ico` (from v1)

- [ ] **Step 1: Create package.json**

Create `package.json`:

```json
{
  "name": "chepaldin-v4",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^6.0.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

Create `vite.config.js`:

```js
import { defineConfig } from 'vite';

export default defineConfig({});
```

- [ ] **Step 3: Create .gitignore**

Create `.gitignore`:

```
node_modules
dist
.DS_Store
```

- [ ] **Step 4: Copy assets from v1**

```bash
mkdir -p public/assets
cp "../archive/chepaldin-v3/public/assets/headshot.jpg" public/assets/headshot.jpg 2>/dev/null || cp "../../personal - v1 /public/assets/headshot.jpg" public/assets/headshot.jpg
cp "../../personal - v1 /public/favicon.ico" public/favicon.ico 2>/dev/null || true
```

Note: the v1 directory has a trailing space in its name (`personal - v1 `). Use the python copy approach if shell quoting fails:

```bash
python3 -c "
import shutil, os
v1 = os.path.join(os.path.dirname(os.getcwd()), 'personal - v1 ')
shutil.copy2(os.path.join(v1, 'public', 'assets', 'headshot.jpg'), 'public/assets/headshot.jpg')
shutil.copy2(os.path.join(v1, 'public', 'favicon.ico'), 'public/favicon.ico')
print('Assets copied')
"
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: `node_modules` created, lockfile written.

- [ ] **Step 6: Commit**

```bash
git add package.json vite.config.js .gitignore public/
git commit -m "chore: project scaffold with vite and assets"
```

---

### Task 2: HTML entry with SEO and content

**Files:**
- Create: `index.html`

This is the single HTML entry. All visible content is inline HTML — no JS rendering.

- [ ] **Step 1: Create index.html**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Anton Chepaldin: AI, systems and human behaviour</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="canonical" href="https://chepaldin.com/" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Anton Chepaldin" />
    <meta name="theme-color" content="#6E78FF" />
    <meta name="description" content="AI, systems and human behaviour. I reduce ambiguity so organisations can move with clarity." />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="chepaldin.com" />
    <meta property="og:url" content="https://chepaldin.com/" />
    <meta property="og:title" content="Anton Chepaldin — AI, systems and human behaviour" />
    <meta property="og:description" content="I work at the intersection of AI, systems and human behaviour. I reduce ambiguity so organisations can move with clarity." />
    <meta property="og:image" content="https://chepaldin.com/assets/headshot.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Anton Chepaldin — AI, systems and human behaviour" />
    <meta name="twitter:description" content="I reduce ambiguity so organisations can move with clarity." />
    <meta name="twitter:image" content="https://chepaldin.com/assets/headshot.jpg" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Anton Chepaldin",
        "url": "https://chepaldin.com/",
        "image": "https://chepaldin.com/assets/headshot.jpg",
        "description": "Integrator at the intersection of AI, systems and human behaviour.",
        "jobTitle": "AI & Behavioural Science Consultant",
        "sameAs": [
          "https://www.linkedin.com/in/anton-chepaldin/",
          "https://github.com/Hook12aaa",
          "https://www.kaggle.com/chepaldin"
        ]
      }
    </script>
    <link rel="stylesheet" href="/src/styles.css" />
  </head>
  <body>
    <canvas id="particles" aria-hidden="true"></canvas>
    <div class="homepage-container">
      <main class="main-content">
        <div class="headshot-container">
          <div class="profile-bg-blob">
            <img
              src="/assets/headshot.jpg"
              class="headshot-img"
              alt="Headshot of Anton Chepaldin"
              width="190"
              height="190"
            />
          </div>
        </div>
        <div class="name-display">
          <span class="terminal-prefix" aria-hidden="true">&gt;</span>
          <span class="name-glitch">
            Anton_Chepaldin
            <span class="cursor" aria-hidden="true">_</span>
          </span>
        </div>
        <h1 class="sr-only">Anton Chepaldin</h1>
        <p class="tagline">AI, systems and human behaviour</p>
        <p class="bio">I reduce ambiguity so organisations can move with clarity.</p>
        <a
          class="cta-primary"
          href="https://www.linkedin.com/in/anton-chepaldin/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn
        </a>
        <div class="social-links">
          <a class="social-link" href="https://github.com/Hook12aaa" target="_blank" rel="noopener noreferrer">
            <span class="bracket">[</span>GitHub<span class="bracket">]</span>
          </a>
          <a class="social-link" href="https://www.kaggle.com/chepaldin" target="_blank" rel="noopener noreferrer">
            <span class="bracket">[</span>Kaggle<span class="bracket">]</span>
          </a>
        </div>
      </main>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Verify dev server starts**

```bash
npx vite --open
```

Expected: page loads in browser (unstyled, no particles yet, headshot visible).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: HTML entry with content and SEO meta"
```

---

### Task 3: Styles

**Files:**
- Create: `src/styles.css`

All styles in one file. No tokens layer, no CSS layers — flat and simple.

- [ ] **Step 1: Create src/styles.css**

Create `src/styles.css`:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --blue: #6e78ff;
  --pink: #e64298;
  --bg: #f5f2ee;
  --text: #222222;
  --text-secondary: #444444;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}

html,
body {
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

#particles {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}

.homepage-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  z-index: 2;
}

.headshot-container {
  margin-bottom: 1.6rem;
}

.profile-bg-blob {
  position: relative;
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-bg-blob::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(135deg, var(--blue) 60%, var(--pink) 100%);
  filter: blur(0.5px) brightness(1.1) saturate(1.2);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: blobMorph 12s ease-in-out infinite alternate;
}

.headshot-img {
  width: 190px;
  height: 190px;
  object-fit: cover;
  object-position: 50% 18%;
  border-radius: 50%;
  border: 4px solid #fff;
  background: var(--bg);
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 24px rgba(110, 120, 255, 0.1),
    0 1.5px 8px rgba(230, 66, 152, 0.1);
}

@keyframes blobMorph {
  0% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
  100% {
    border-radius: 60% 40% 60% 30% / 40% 70% 30% 60%;
  }
}

.name-display {
  font-family: var(--font-mono);
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--blue);
  margin-bottom: 0.5rem;
}

.terminal-prefix {
  color: var(--pink);
  margin-right: 0.15em;
}

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.tagline {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 0.3rem;
}

.bio {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  max-width: 36ch;
}

.cta-primary {
  display: inline-block;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7em 1.2em;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-bottom: 1.2rem;
}

.cta-primary:hover {
  background: var(--pink);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.social-link:hover {
  color: var(--pink);
}

.bracket {
  color: var(--text-secondary);
}

@media (max-width: 600px) {
  .main-content {
    padding: 1rem;
  }

  .profile-bg-blob {
    width: 170px;
    height: 170px;
  }

  .headshot-img {
    width: 150px;
    height: 150px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .profile-bg-blob::before {
    animation: none;
  }

  .cursor {
    animation: none;
    opacity: 1;
  }
}
```

- [ ] **Step 2: Verify in browser**

```bash
npx vite --open
```

Expected: page is styled — centered card, headshot in blob, name with cursor, links visible. No particles yet.

- [ ] **Step 3: Commit**

```bash
git add src/styles.css
git commit -m "feat: all styles — layout, blob, typography, responsive"
```

---

### Task 4: Particle network canvas

**Files:**
- Create: `src/main.js`

Canvas 2D particle network animation. This is the only JavaScript file.

- [ ] **Step 1: Create src/main.js**

Create `src/main.js`:

```js
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

const DENSITY = 0.00015;
const CONNECTION_DISTANCE = 200;
const SPEED = 0.3;
const PARTICLE_MIN_SIZE = 0.5;
const PARTICLE_MAX_SIZE = 2;

let particles = [];
let width = 0;
let height = 0;
let dpr = 1;
let animationId = 0;

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function resize() {
  dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

function createParticles() {
  const count = Math.round(width * height * DENSITY);
  particles = [];
  for (let i = 0; i < count; i++) {
    const hue = 220 + Math.random() * 30;
    const alpha = 0.3 + Math.random() * 0.2;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: PARTICLE_MIN_SIZE + Math.random() * (PARTICLE_MAX_SIZE - PARTICLE_MIN_SIZE),
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      color: 'hsla(' + hue + ', 100%, 70%, ' + alpha + ')',
      colorFaded: 'hsla(' + hue + ', 100%, 70%, 0)',
    });
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[j].x - particles[i].x;
      const dy = particles[j].y - particles[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DISTANCE) {
        const opacity = 0.15 * (1 - dist / CONNECTION_DISTANCE);
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(110, 120, 255, ' + opacity + ')';
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function drawParticles() {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
    gradient.addColorStop(0, p.color);
    gradient.addColorStop(1, p.colorFaded);
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx * SPEED;
    p.y += p.vy * SPEED;
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  drawConnections();
  updateParticles();
  drawParticles();
  animationId = requestAnimationFrame(animate);
}

function renderStatic() {
  ctx.clearRect(0, 0, width, height);
  drawParticles();
}

resize();
createParticles();

if (prefersReducedMotion) {
  renderStatic();
} else {
  animate();
}

window.addEventListener('resize', () => {
  resize();
  createParticles();
  if (prefersReducedMotion) {
    renderStatic();
  }
});
```

- [ ] **Step 2: Verify in browser**

```bash
npx vite --open
```

Expected: blue particles float and drift slowly across the warm off-white background. Faint lines connect nearby particles. Content card sits on top. Blob morphs. Cursor blinks.

- [ ] **Step 3: Test reduced motion**

In Chrome DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`.

Expected: particles visible but static (no animation), blob does not morph, cursor does not blink.

- [ ] **Step 4: Test mobile viewport**

In Chrome DevTools → toggle device toolbar → select iPhone SE or similar small viewport.

Expected: headshot scales to 150×170px, padding tightens, no horizontal scroll, fewer particles (density scales with area).

- [ ] **Step 5: Verify build**

```bash
npx vite build
npx vite preview
```

Expected: production build succeeds, preview serves correctly.

- [ ] **Step 6: Commit**

```bash
git add src/main.js
git commit -m "feat: canvas 2D particle network background"
```
