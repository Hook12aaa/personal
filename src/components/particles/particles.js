const DEFAULTS = {
  density: 0.00015,
  connectionDistance: 200,
  speed: 0.3,
  minSize: 0.5,
  maxSize: 2,
  connectionColor: [110, 120, 255],
  hueRange: [220, 250],
  alphaRange: [0.3, 0.5],
};

export function initParticles(canvas, userConfig = {}) {
  const config = { ...DEFAULTS, ...userConfig };
  const ctx = canvas.getContext('2d');

  let particles = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationId = 0;
  let running = false;

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
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

  function create() {
    const count = Math.round(width * height * config.density);
    particles = [];
    for (let i = 0; i < count; i++) {
      const hue =
        config.hueRange[0] +
        Math.random() * (config.hueRange[1] - config.hueRange[0]);
      const alpha =
        config.alphaRange[0] +
        Math.random() * (config.alphaRange[1] - config.alphaRange[0]);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size:
          config.minSize + Math.random() * (config.maxSize - config.minSize),
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        color: 'hsla(' + hue + ', 100%, 70%, ' + alpha + ')',
        colorFaded: 'hsla(' + hue + ', 100%, 70%, 0)',
      });
    }
  }

  function drawConnections() {
    const [r, g, b] = config.connectionColor;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - particles[i].x;
        const dy = particles[j].y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < config.connectionDistance) {
          const opacity = 0.15 * (1 - dist / config.connectionDistance);
          ctx.beginPath();
          ctx.strokeStyle =
            'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function drawDots() {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.size * 2,
      );
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(1, p.colorFaded);
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function update() {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx * config.speed;
      p.y += p.vy * config.speed;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }
  }

  function renderFrame() {
    ctx.clearRect(0, 0, width, height);
    drawConnections();
    update();
    drawDots();
  }

  function renderStatic() {
    ctx.clearRect(0, 0, width, height);
    drawDots();
  }

  function loop() {
    renderFrame();
    animationId = requestAnimationFrame(loop);
  }

  function start() {
    resize();
    create();
    if (reducedMotion) {
      renderStatic();
    } else {
      running = true;
      loop();
    }
  }

  function stop() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = 0;
    }
    running = false;
  }

  function handleResize() {
    stop();
    resize();
    create();
    if (reducedMotion) {
      renderStatic();
    } else {
      running = true;
      loop();
    }
  }

  window.addEventListener('resize', handleResize);

  start();

  return function dispose() {
    stop();
    window.removeEventListener('resize', handleResize);
    particles = [];
  };
}
