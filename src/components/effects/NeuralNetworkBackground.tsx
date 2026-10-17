"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
  type: "default" | "green" | "cyan";
}

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Track mouse and touch with responsive influence
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 190,
      isHovered: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.isHovered = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const createParticles = () => {
      const isMobile = width < 768;
      // Restrained particle count to ensure high performance
      const count = isMobile
        ? Math.floor((width * height) / 38000)
        : Math.min(75, Math.floor((width * height) / 22000));

      const particleList: Particle[] = [];

      for (let i = 0; i < count; i++) {
        // 15% electric green, 15% cyan, 70% soft white/slate
        const rand = Math.random();
        let type: "default" | "green" | "cyan" = "default";
        let color = "rgba(155, 167, 183, ";

        if (rand < 0.15) {
          type = "green";
          color = "rgba(163, 255, 18, ";
        } else if (rand < 0.3) {
          type = "cyan";
          color = "rgba(0, 217, 255, ";
        }

        const baseAlpha = 0.25 + Math.random() * 0.45;

        particleList.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: type === "default" ? 1.2 + Math.random() * 0.8 : 1.8 + Math.random() * 0.8,
          baseAlpha,
          alpha: baseAlpha,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
          color,
          type,
        });
      }

      particles = particleList;
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      createParticles();
    };

    resizeCanvas();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        if (prefersReducedMotion) {
          drawStaticFrame();
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    const maxLineDist = width < 768 ? 95 : 135;

    // Static frame for reduced motion
    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${p1.baseAlpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxLineDist) {
            const alpha = (1 - dist / maxLineDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(155, 167, 183, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    };

    if (prefersReducedMotion) {
      drawStaticFrame();
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    // Animation Loop
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
        render(performance.now());
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isTabVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Mouse lerp for smooth fluid tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Connect lines first so particles appear on top
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxLineDist) {
            const proximityFactor = 1 - dist / maxLineDist;
            let strokeColor = "rgba(155, 167, 183, ";
            let maxAlpha = 0.14;

            if (p1.type === "green" || p2.type === "green") {
              strokeColor = "rgba(163, 255, 18, ";
              maxAlpha = 0.22;
            } else if (p1.type === "cyan" || p2.type === "cyan") {
              strokeColor = "rgba(0, 217, 255, ";
              maxAlpha = 0.22;
            }

            const lineAlpha = proximityFactor * maxAlpha;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${strokeColor}${lineAlpha})`;
            ctx.lineWidth = proximityFactor * 0.9;
            ctx.stroke();
          }
        }

        // Interactive Mouse/Touch connection line
        if (mouse.isHovered) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < mouse.radius) {
            const mouseProximity = 1 - mdist / mouse.radius;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            const lineCol = p1.type === "green" ? "163, 255, 18" : "0, 217, 255";
            ctx.strokeStyle = `rgba(${lineCol}, ${mouseProximity * 0.45})`;
            ctx.lineWidth = mouseProximity * 1.2;
            ctx.stroke();
          }
        }
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx * 60 * delta;
        p.y += p.vy * 60 * delta;

        // Bounce gently at screen edges
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Subtle organic deflection from cursor
        if (mouse.isHovered) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < mouse.radius && mdist > 0) {
            const force = (1 - mdist / mouse.radius) * 0.45;
            p.x += (mdx / mdist) * force;
            p.y += (mdy / mdist) * force;
          }
        }

        // Soft sinusoidal pulsing of luminosity
        p.pulsePhase += p.pulseSpeed;
        const pulse = Math.sin(p.pulsePhase) * 0.15;
        p.alpha = Math.max(0.1, Math.min(0.85, p.baseAlpha + pulse));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Subtle glow halo for accent particles
        if (p.type !== "default") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha * 0.25})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: 0.85 }}
      />
      {/* Subtle ambient gradient vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none ambient-glow-radial" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090D]/40 via-transparent to-[#07090D] pointer-events-none" />
    </div>
  );
}
