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
