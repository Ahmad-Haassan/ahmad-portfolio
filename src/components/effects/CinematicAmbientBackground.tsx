"use client";

import React, { useEffect, useRef } from "react";

export function CinematicAmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleResize = () => {
      // Use lower resolution for canvas to maximize 60fps performance and use CSS blur for velvety smooth gradients
      width = canvas.width = Math.floor(window.innerWidth / 2);
      height = canvas.height = Math.floor(window.innerHeight / 2);
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
      mouse.x = width / 2;
      mouse.y = height / 2;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX / 2;
      mouse.targetY = e.clientY / 2;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleResize();

    // Floating micro-particles for subtle cinematic depth
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.2 - Math.random() * 0.4,
      size: 0.8 + Math.random() * 1.5,
      alpha: 0.15 + Math.random() * 0.35,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    }));

    const render = () => {
      time += 0.008;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Base clear with deep luxury obsidian
      ctx.fillStyle = "#07080B";
      ctx.fillRect(0, 0, width, height);

      // Gradient Orb 1: Primary Indigo-Violet Wave (Moves smoothly in figure-8)
      const orb1X = width * 0.35 + Math.sin(time * 0.7) * (width * 0.2) + (mouse.x - width / 2) * 0.15;
      const orb1Y = height * 0.3 + Math.cos(time * 0.5) * (height * 0.15) + (mouse.y - height / 2) * 0.15;
      const orb1Radius = Math.max(width, height) * 0.55;

      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, orb1Radius);
      grad1.addColorStop(0, "rgba(99, 102, 241, 0.22)"); // Electric Indigo
      grad1.addColorStop(0.4, "rgba(79, 70, 229, 0.12)");
      grad1.addColorStop(1, "rgba(7, 8, 11, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Gradient Orb 2: Luminescent Cyan-Teal Wave (Gentle harmonic counter-motion)
      const orb2X = width * 0.68 + Math.cos(time * 0.6) * (width * 0.22) - (mouse.x - width / 2) * 0.1;
      const orb2Y = height * 0.65 + Math.sin(time * 0.8) * (height * 0.18) - (mouse.y - height / 2) * 0.1;
      const orb2Radius = Math.max(width, height) * 0.5;

      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, orb2Radius);
      grad2.addColorStop(0, "rgba(14, 165, 233, 0.18)"); // Sky / Cyan
      grad2.addColorStop(0.45, "rgba(6, 182, 212, 0.08)");
      grad2.addColorStop(1, "rgba(7, 8, 11, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Gradient Orb 3: Deep Royal Purple Glow (Subtle center anchor)
      const orb3X = width * 0.5 + Math.sin(time * 0.4) * (width * 0.1);
      const orb3Y = height * 0.45 + Math.cos(time * 0.35) * (height * 0.12);
      const orb3Radius = Math.max(width, height) * 0.4;

      const grad3 = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, orb3Radius);
      grad3.addColorStop(0, "rgba(168, 85, 247, 0.12)"); // Purple / Violet
      grad3.addColorStop(0.5, "rgba(124, 58, 237, 0.05)");
      grad3.addColorStop(1, "rgba(7, 8, 11, 0)");
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // Render drifting cinematic micro-particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(time * 2 + p.x));
        ctx.fillStyle = `rgba(226, 232, 240, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Fluid Canvas with hardware-accelerated backdrop blur */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover filter blur-[40px] opacity-80 transition-opacity duration-1000"
      />

      {/* 2. Delicate Minimalist Grid Overlay (Giving structure without clutter) */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* 3. Subtle Vignette Shadowing towards edges */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
}
