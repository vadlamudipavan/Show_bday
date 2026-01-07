import { useEffect, useRef } from 'react';

interface FireworksProps {
  autoPlay?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
}

export default function Fireworks({ autoPlay = false, intensity = 'medium' }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
    }

    let particles: Particle[] = [];

    const createExplosion = (x: number, y: number) => {
      const particleCount = intensity === 'light' ? 30 : intensity === 'medium' ? 60 : 100;
      const colors = ['#ff1744', '#f50057', '#ff5722', '#ffeb3b', '#00bcd4', '#e91e63', '#9c27b0'];

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.random() * Math.PI * 2);
        const velocity = 2 + Math.random() * 8;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          maxLife: 2 + Math.random(),
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 4,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life -= 1 / (60 * p.maxLife);

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (particles.length > 0 || autoPlay) {
        requestAnimationFrame(animate);
      }
    };

    const handleClick = (e: MouseEvent) => {
      createExplosion(e.clientX, e.clientY);
      animate();
    };

    if (autoPlay) {
      const interval = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;
        createExplosion(x, y);
      }, 400);

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);
      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
      };
    } else {
      canvas.addEventListener('click', handleClick);
      animate();

      return () => {
        canvas.removeEventListener('click', handleClick);
      };
    }
  }, [autoPlay, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-40"
      style={{ background: autoPlay ? 'transparent' : 'transparent' }}
    />
  );
}
