# chepaldin-v4 — Design

Date: 2026-05-30
Status: Approved

## Goal

Single-page personal brand site that recreates v1's look — particle network background, centered card layout, brand colours — using Vite + vanilla JS with zero production dependencies. Strips the blog/posts carousel from v1 and carries nothing from v3's halftone/Three.js/theme complexity.

## Constraints

- Zero production dependencies. Vite is dev-only.
- No framework (no React, no framer-motion, no router).
- No Three.js, no WebGL, no halftone pipeline.
- No dark mode, no theme toggle. Light only.
- Single page, single HTML entry.
- `prefers-reduced-motion` respected — static particles, no animation.

## Content

Vertically centered stack on warm off-white `#F5F2EE` background:

1. **Headshot** in gradient blob (blue→pink, morphing border-radius animation via CSS `@keyframes`).
2. **Name**: `> Anton_Chepaldin_` with terminal prefix and blinking cursor.
3. **Tagline**: "AI, systems and human behaviour"
4. **Bio**: "I reduce ambiguity so organisations can move with clarity."
5. **Primary CTA**: "Connect on LinkedIn" — blue `#6E78FF` bg, white text, pink `#E64298` on hover.
6. **Secondary links**: `[GitHub]` `[Kaggle]` in bracket style.

## Particle Network Background

Full-viewport `<canvas>` behind all content. Canvas 2D API, no WebGL.

Particles:
- Count proportional to screen area (density ~0.00015 per px²).
- Colour: `hsla(220-250, 100%, 70%, 0.3-0.5)` — bluish, semi-transparent.
- Size: 0.5–2px radius with radial gradient glow.
- Drift: slow random velocity (~0.3 px/frame), wrap at edges.

Connections:
- Draw line between particles within 200px proximity.
- Line colour: `rgba(110, 120, 255, 0.15 * (1 - dist/200))` — fades with distance.
- Line width: 1px.

Reduced motion: particles rendered in initial positions, no animation loop, no connecting lines redrawn.

## Visual Design

### Colours
- Background: `#F5F2EE` (warm off-white)
- Text: `#222222` (near-black)
- Text secondary: `#444444`
- Brand blue: `#6E78FF`
- Brand pink: `#E64298`

### Typography
- Body: `'Inter', system-ui, -apple-system, sans-serif`
- Name display: `'JetBrains Mono', 'Courier New', monospace`
- Loaded via Google Fonts CDN.

### Headshot Blob
- 220×220px container with `::before` pseudo-element gradient blob.
- Gradient: `linear-gradient(135deg, #6E78FF 60%, #E64298 100%)`.
- `border-radius` animated via `@keyframes blobMorph` (12s ease-in-out infinite alternate).
- Headshot image: 190×190px circle, `object-fit: cover`, white 4px border.

### Buttons
- Primary CTA: `background: #6E78FF; color: #fff; border-radius: 8px; padding: 0.7em 1.2em`. Hover → `background: #E64298`.
- Secondary bracket links: no background, text only, `[` `]` brackets in muted colour. Hover → brand pink.

### Layout
- `.homepage-container`: `position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1`.
- Canvas: `position: fixed; inset: 0; z-index: 0`.
- Content: `z-index: 2`, centered column, `text-align: center`.

### Responsive
- Headshot container scales down on mobile (170×170px below 600px).
- Name font-size: `clamp(1.4rem, 4vw, 2.2rem)`.
- Padding adjusts: `2rem` → `1rem` on mobile.
- Particle density auto-scales via screen area calculation.

## File Structure

```
chepaldin-v4/
  index.html
  src/
    main.js           — particle canvas
    styles.css         — all styles
  public/
    assets/
      headshot.jpg
    favicon.ico
  package.json
  vite.config.js
```

## SEO

Carry over from v1:
- Open Graph meta tags (og:title, og:description, og:image)
- Twitter Card meta tags
- JSON-LD structured data (Person schema with awards, credentials, sameAs links)
- Canonical URL, robots, theme-color meta

## Test Plan

- Visual inspection: page loads, particles animate, headshot blob morphs, links work.
- `prefers-reduced-motion` emulation: no animation, static render.
- Mobile viewport: content fits, no horizontal scroll, headshot scales.
- All external links open in new tab with `rel="noopener noreferrer"`.
- Lighthouse: check performance, accessibility, SEO scores.

## Out of Scope

- No dark mode or theme toggle.
- No blog/posts/docs pages.
- No Notion sync or markdown rendering.
- No Three.js, WebGL, or halftone effects.
- No rotating outcomes/impact carousel.
- No router or multi-page navigation.
