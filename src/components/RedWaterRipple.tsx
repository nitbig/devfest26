/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface RippleWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  intensity: number; // 0 to 1
  ringSpacing: number;
  ringCount: number;
  age: number;
  maxAge: number;
}

interface RedWaterRippleProps {
  className?: string;
  interactive?: boolean;
}

export const RedWaterRipple: React.FC<RedWaterRippleProps> = ({
  className = '',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wavesRef = useRef<RippleWave[]>([]);
  const animFrameId = useRef<number | null>(null);
  const lastDropTime = useRef<number>(0);

  // Helper to spawn a new ripple
  const spawnRipple = (x: number, y: number, intensity = 0.85, maxRadius = 320) => {
    wavesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius,
      speed: 2.2 + intensity * 1.5,
      intensity,
      ringSpacing: 18,
      ringCount: 3,
      age: 0,
      maxAge: Math.floor(maxRadius / 2.2),
    });

    // Cap maximum concurrent ripples to ensure high performance
    if (wavesRef.current.length > 20) {
      wavesRef.current.shift();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Spawn an initial ambient ripple near center
    spawnRipple(width / 2, height / 2, 0.9, Math.min(width, height) * 0.65);

    // Animation Loop
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Ambient drop every 2.4 seconds if idle or active
      if (time - lastDropTime.current > 2200) {
        lastDropTime.current = time;
        // Jitter slightly around center
        const jitterX = (Math.random() - 0.5) * (width * 0.35);
        const jitterY = (Math.random() - 0.5) * (height * 0.25);
        spawnRipple(
          width / 2 + jitterX,
          height / 2 + jitterY,
          0.65 + Math.random() * 0.3,
          Math.min(width, height) * (0.55 + Math.random() * 0.25)
        );
      }

      // Draw each wave
      for (let i = wavesRef.current.length - 1; i >= 0; i--) {
        const wave = wavesRef.current[i];
        wave.radius += wave.speed;
        wave.age += 1;

        // Progress 0 to 1
        const progress = wave.radius / wave.maxRadius;
        if (progress >= 1 || wave.age >= wave.maxAge) {
          wavesRef.current.splice(i, 1);
          continue;
        }

        // Global wave opacity with smooth fade-in and fade-out
        const alpha = Math.sin(progress * Math.PI) * wave.intensity;

        // Draw multiple concentric crests for realistic fluid propagation
        for (let ring = 0; ring < wave.ringCount; ring++) {
          const r = wave.radius - ring * wave.ringSpacing;
          if (r <= 0) continue;

          // Wave attenuation for secondary rings
          const ringFactor = 1 - (ring / wave.ringCount) * 0.45;
          const ringAlpha = alpha * ringFactor;

          // 1. Water crest stroke (Google Red #EA4335)
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(234, 67, 53, ${ringAlpha * 0.75})`;
          ctx.lineWidth = Math.max(1, 2.5 * (1 - progress * 0.6));
          ctx.stroke();

          // 2. Outermost subtle red refraction glow / inner ring
          if (ring === 0) {
            ctx.beginPath();
            ctx.arc(wave.x, wave.y, Math.max(0, r - 2), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 110, 97, ${ringAlpha * 0.45})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Water surface tension wash (soft red fill tint in the wake)
            if (r < wave.maxRadius * 0.6) {
              const gradient = ctx.createRadialGradient(
                wave.x,
                wave.y,
                Math.max(0, r - 20),
                wave.x,
                wave.y,
                r
              );
              gradient.addColorStop(0, 'transparent');
              gradient.addColorStop(0.85, `rgba(234, 67, 53, ${ringAlpha * 0.12})`);
              gradient.addColorStop(1, `rgba(234, 67, 53, ${ringAlpha * 0.25})`);

              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(wave.x, wave.y, r, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    // Interactive pointer handling on the container
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      spawnRipple(x, y, 1.0, Math.max(width, height) * 0.7);
    };

    let lastMoveTime = 0;
    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const now = performance.now();
      if (now - lastMoveTime < 180) return; // Throttle to prevent overwhelming ripples
      lastMoveTime = now;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnRipple(x, y, 0.45, 200);
    };

    container.addEventListener('mousedown', handlePointerDown);
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchstart', handlePointerDown, { passive: true });

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      resizeObserver.disconnect();
      container.removeEventListener('mousedown', handlePointerDown);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('touchstart', handlePointerDown);
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Background CSS Ambient Concentric Red Water Waves for layered depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <div className="w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] rounded-full border border-[#EA4335]/30 animate-ping [animation-duration:4s] opacity-25" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <div className="w-[180px] h-[180px] sm:w-[320px] sm:h-[320px] rounded-full border border-[#EA4335]/40 animate-ping [animation-duration:3s] [animation-delay:1.5s] opacity-30" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <div className="w-[100px] h-[100px] sm:w-[160px] sm:h-[160px] rounded-full bg-[#EA4335]/15 blur-2xl animate-pulse [animation-duration:3s]" />
      </div>

      {/* Interactive Liquid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};
