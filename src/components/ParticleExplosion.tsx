import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotSpeed: number;
  shape: 'circle' | 'square' | 'star' | 'sparkle';
}

interface ParticleExplosionProps {
  active: boolean;
  origin: { x: number; y: number } | null;
  onComplete: () => void;
}

export default function ParticleExplosion({ active, origin, onComplete }: ParticleExplosionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const flashAlphaRef = useRef<number>(0);

  useEffect(() => {
    if (!active || !origin) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI screens
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Flash effect peak
    flashAlphaRef.current = 0.95;

    // Colors: Cyan, Lime/Neon Green, White, Deep Indigo, Purple
    const colors = [
      '#22d3ee', // Cyan
      '#ccff00', // Neon Green
      '#ffffff', // White
      '#818cf8', // Indigo
      '#a855f7', // Purple
    ];

    // Spawn particles
    const particleCount = 200;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      // High initial burst speed with some dispersion
      const speed = 4 + Math.random() * 16;
      const radius = 2 + Math.random() * 6;
      const maxLife = 40 + Math.random() * 50; // frames of life

      // Assign shapes randomly
      const shapeRand = Math.random();
      let shape: 'circle' | 'square' | 'star' | 'sparkle' = 'circle';
      if (shapeRand < 0.25) shape = 'square';
      else if (shapeRand < 0.5) shape = 'star';
      else if (shapeRand < 0.75) shape = 'sparkle';

      particles.push({
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 2), // slightly upward bias
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0,
        maxLife,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        shape,
      });
    }

    particlesRef.current = particles;

    let elapsedFrames = 0;
    const totalDurationFrames = 80; // ~1.3 seconds at 60fps

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Flash Overlay (highly satisfying initial shockwave glow)
      if (flashAlphaRef.current > 0) {
        ctx.fillStyle = `rgba(34, 211, 238, ${flashAlphaRef.current * 0.3})`;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        flashAlphaRef.current *= 0.88; // rapid decay
      }

      // 2. Draw & Update Particles
      const currentParticles = particlesRef.current;
      for (let i = currentParticles.length - 1; i >= 0; i--) {
        const p = currentParticles[i];
        p.life++;

        if (p.life >= p.maxLife) {
          currentParticles.splice(i, 1);
          continue;
        }

        // Apply friction and minimal gravity
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.08; // subtle gravity

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Fade out in the last 50% of its life
        const lifeRatio = p.life / p.maxLife;
        p.alpha = lifeRatio < 0.2 ? lifeRatio * 5 : 1 - (lifeRatio - 0.2) / 0.8;
        if (p.alpha < 0) p.alpha = 0;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        // Glowing shadow effect for that high-tech energy feeling
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'square') {
          const s = p.radius * 2;
          ctx.fillRect(-s / 2, -s / 2, s, s);
        } else if (p.shape === 'star') {
          // Draw standard 5-point star
          ctx.beginPath();
          for (let k = 0; k < 5; k++) {
            ctx.lineTo(
              Math.cos(((18 + k * 72) * Math.PI) / 180) * p.radius * 1.5,
              Math.sin(((18 + k * 72) * Math.PI) / 180) * p.radius * 1.5
            );
            ctx.lineTo(
              Math.cos(((54 + k * 72) * Math.PI) / 180) * (p.radius * 0.6),
              Math.sin(((54 + k * 72) * Math.PI) / 180) * (p.radius * 0.6)
            );
          }
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'sparkle') {
          // Four point flare sparkle
          ctx.beginPath();
          ctx.moveTo(0, -p.radius * 2);
          ctx.quadraticCurveTo(0, 0, p.radius * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, p.radius * 2);
          ctx.quadraticCurveTo(0, 0, -p.radius * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, -p.radius * 2);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      elapsedFrames++;

      // Trigger transition state change at peak burst (~18-20 frames, when screen is filled with kinetic energy)
      if (elapsedFrames === 18) {
        onComplete();
      }

      if (elapsedFrames < totalDurationFrames && currentParticles.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active, origin, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
