import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      // Only set size if canvas is in the DOM
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener('resize', setSize);

    const initParticles = () => {
      // Particle count is proportional to screen area (density: 0.0015 per px^2)
      const density = 0.00015;
      const count = Math.round(window.innerWidth * window.innerHeight * density);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        speedX: Math.random() * 0.8 - 0.4,
        speedY: Math.random() * 0.8 - 0.4,
        color: `hsla(${220 + Math.random() * 30}, 100%, 70%, ${0.3 + Math.random() * 0.2})`
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw connecting edges between close particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x;
          const dy = particles[j].y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(110, 120, 255, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(particle => {
        particle.x += particle.speedX * 0.3;
        particle.y += particle.speedY * 0.3;
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, particle.color.replace('0.', '0.0'));
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    const handleTouch = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      mouseRef.current = {
        x: touch.clientX,
        y: touch.clientY
      };
    };

    initParticles();
    animate();
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('resize', setSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouch);
      canvas.removeEventListener('touchstart', handleTouch);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}