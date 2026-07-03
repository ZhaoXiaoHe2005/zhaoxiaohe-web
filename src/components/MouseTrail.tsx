import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, active: false });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  // Smooth delayed cursor coordinates
  const cursorRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match display size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles array
    let particles: Particle[] = [];

    // Core Brand Palette Colors
    const COLORS = [
      '#ccff00', // Vibrant high-contrast chartreuse yellow-green
      '#1f3fe5', // Intense electric cobalt blue
      '#3b82f6', // Light indigo-blue
      '#ffffff'  // Clean white accent
    ];

    const createParticle = (x: number, y: number, isClickBurst = false) => {
      const angle = Math.random() * Math.PI * 2;
      // Faster, wider speed distribution on click burst
      const speed = isClickBurst 
        ? Math.random() * 4 + 1.5 
        : Math.random() * 1.2 + 0.3;
      
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - (isClickBurst ? 0.5 : 0.8); // Slight float upwards
      
      const maxLife = isClickBurst 
        ? Math.random() * 40 + 20 
        : Math.random() * 30 + 15;

      const size = isClickBurst
        ? Math.random() * 4 + 2
        : Math.random() * 3.5 + 1.5;

      // Choose color with weight (more green and blue, fewer whites)
      const colorRand = Math.random();
      let color = COLORS[0]; // default green
      if (colorRand > 0.85) {
        color = COLORS[3]; // white
      } else if (colorRand > 0.45) {
        color = COLORS[1]; // cobalt blue
      } else if (colorRand > 0.2) {
        color = COLORS[2]; // soft blue
      }

      particles.push({
        x,
        y,
        vx,
        vy,
        color,
        size,
        alpha: 1,
        life: maxLife,
        maxLife
      });
    };

    // Tracking mouse actions
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.active = true;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      cursorRef.current.targetX = e.clientX;
      cursorRef.current.targetY = e.clientY;

      // Calculate distance moved from last point to spawn intermediate particles
      const dist = Math.hypot(
        e.clientX - mouseRef.current.lastX,
        e.clientY - mouseRef.current.lastY
      );

      // Only spawn trail particles if there's actual motion
      if (dist > 2) {
        const steps = Math.min(Math.floor(dist / 4), 6); // Cap steps to prevent performance spikes
        for (let i = 0; i < steps; i++) {
          const ratio = i / steps;
          const interX = mouseRef.current.lastX + (e.clientX - mouseRef.current.lastX) * ratio;
          const interY = mouseRef.current.lastY + (e.clientY - mouseRef.current.lastY) * ratio;
          // Spawn particle with subtle randomness
          createParticle(
            interX + (Math.random() - 0.5) * 4,
            interY + (Math.random() - 0.5) * 4
          );
        }
      }

      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;

      // Perform a quick hover check for clickable items
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = 
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.cursor-pointer') ||
          target.getAttribute('role') === 'button';
        setIsHoveringClickable(!!isClickable);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Spawn a majestic splash of particles on mouse click!
      const burstCount = 18;
      for (let i = 0; i < burstCount; i++) {
        createParticle(e.clientX, e.clientY, true);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      mouseRef.current.active = true;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      cursorRef.current.targetX = e.clientX;
      cursorRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    // Dynamic animation loop
    let animId: number;
    const updateAndRender = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Smooth custom cursor spring follow logic
      const dx = cursorRef.current.targetX - cursorRef.current.x;
      const dy = cursorRef.current.targetY - cursorRef.current.y;
      
      // Speed factor to interpolate smooth lag
      const easing = isHoveringClickable ? 0.12 : 0.18;
      cursorRef.current.x += dx * easing;
      cursorRef.current.y += dy * easing;

      // Draw active cursor if mouse active
      if (mouseRef.current.active) {
        ctx.save();
        
        // Base setup for beautiful shadows / high tech glow
        ctx.shadowBlur = isHoveringClickable ? 15 : 6;
        ctx.shadowColor = '#ccff00';

        if (isHoveringClickable) {
          // Glow ring expanding when hovering on clickable elements
          ctx.beginPath();
          ctx.arc(cursorRef.current.x, cursorRef.current.y, 16, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(204, 255, 0, 0.85)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Tiny center point
          ctx.beginPath();
          ctx.arc(cursorRef.current.x, cursorRef.current.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ccff00';
          ctx.fill();
        } else {
          // Standard elegant tech point & soft outer circle
          ctx.beginPath();
          ctx.arc(cursorRef.current.x, cursorRef.current.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ccff00';
          ctx.fill();

          ctx.shadowColor = '#1f3fe5';
          ctx.beginPath();
          ctx.arc(cursorRef.current.x, cursorRef.current.y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(31, 63, 229, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Render and update trail particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        
        // Physics friction / air resistance
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Age decrement
        p.life--;
        p.alpha = Math.max(0, p.life / p.maxLife);

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        
        // Soft glowing filter for high contrast green and electric blue
        if (p.color === '#ccff00' || p.color === '#1f3fe5') {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
        }

        ctx.beginPath();
        // Dynamic shrinking scale as it ages
        const currentRadius = p.size * p.alpha;
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(updateAndRender);
    };

    updateAndRender();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isHoveringClickable]);

  return (
    <canvas
      id="pointer-trail-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 hidden md:block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
