import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Particle class representing 3D vertices/nodes in level wireframe
    class Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        // Light subtle warm grey, electric blue, or chartreuse yellow-green accents
        const randomVal = Math.random();
        if (randomVal > 0.85) {
          this.color = 'rgba(204, 255, 0, 0.45)'; // Chartreuse yellow-green
        } else if (randomVal > 0.7) {
          this.color = 'rgba(31, 63, 229, 0.5)'; // Electric blue
        } else {
          this.color = 'rgba(255, 255, 255, 0.15)'; // Warm white
        }
      }

      update() {
        // Natural movement
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Bounce boundaries
        if (this.baseX < 0 || this.baseX > width) this.speedX *= -1;
        if (this.baseY < 0 || this.baseY > height) this.speedY *= -1;

        // Interactive push
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Push particles away
          const targetX = this.x - Math.cos(angle) * force * 20;
          const targetY = this.y - Math.sin(angle) * force * 20;
          
          this.x += (targetX - this.x) * 0.1;
          this.y += (targetY - this.y) * 0.1;
        } else {
          // Smooth return to base
          this.x += (this.baseX - this.x) * 0.05;
          this.y += (this.baseY - this.y) * 0.05;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Graphic design vector curves (simulated flowing waves representing paper/packaging curves)
    interface FlowLine {
      points: { x: number; y: number }[];
      color: string;
      offset: number;
      speed: number;
    }

    const flowLines: FlowLine[] = [
      {
        points: [],
        color: 'rgba(31, 63, 229, 0.05)', // Electric blue
        offset: 0,
        speed: 0.001,
      },
      {
        points: [],
        color: 'rgba(204, 255, 0, 0.03)', // Chartreuse
        offset: Math.PI,
        speed: 0.0008,
      },
    ];

    const nodes: Node[] = Array.from({ length: 75 }, () => new Node());

    const drawFlowLine = (line: FlowLine) => {
      if (!ctx) return;
      line.offset += line.speed;
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 1.5;

      for (let x = 0; x <= width; x += 20) {
        // Curve generated using multiple sine components to represent design ribbons
        const y =
          height * 0.5 +
          Math.sin(x * 0.002 + line.offset) * 120 +
          Math.cos(x * 0.004 - line.offset * 1.5) * 60;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Light grid background overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 100;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw flowing graphic design vector contours
      flowLines.forEach(drawFlowLine);

      // Connect 3D wireframe mesh nodes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 150) {
            // Draw gradient-like connectivity
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update();
        node.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      style={{ backgroundColor: '#060814' }}
    />
  );
}
