"use client";

import React, { useEffect, useRef, useState } from "react";

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface RippleWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color: string;
}

export function InteractiveCursorFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  const [isPointerInside, setIsPointerInside] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    // Check if device is purely touch
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Position state
    const mouse = {
      x: -100,
      y: -100,
      ringX: -100,
      ringY: -100,
      prevX: -100,
      prevY: -100,
      speed: 0,
      isActive: false,
    };

    const sparks: SparkParticle[] = [];
    const ripples: RippleWave[] = [];

    // Colors: Electric Lime and Cyber Cyan
    const colors = [
      "rgba(163, 255, 18, ", // Lime
      "rgba(0, 217, 255, ", // Cyan
      "rgba(255, 255, 255, ", // Pure highlight
    ];

    const addSparks = (x: number, y: number, count = 2, speedMultiplier = 1) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.5 + Math.random() * 2) * speedMultiplier;
        const color = colors[Math.floor(Math.random() * colors.length)];
        sparks.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2,
          alpha: 0.8 + Math.random() * 0.2,
          decay: 0.02 + Math.random() * 0.03,
          color,
        });
      }
    };

    const addRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 4,
        maxRadius: 55,
        alpha: 0.8,
        speed: 2.8,
        color: "rgba(0, 217, 255, ",
      });
      ripples.push({
        x,
        y,
        radius: 2,
        maxRadius: 35,
        alpha: 0.7,
        speed: 2.0,
        color: "rgba(163, 255, 18, ",
      });
      // Also emit burst of sparks
      addSparks(x, y, 8, 2.5);
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.isActive = true;
      setIsPointerInside(true);

      const x = e.clientX;
      const y = e.clientY;

      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const dist = Math.hypot(dx, dy);

      mouse.speed = dist;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = x;
      mouse.y = y;

      // Update spotlight position
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Update cursor dot position directly for instant response
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Emit trail sparks when moving
      if (dist > 3) {
        const sparkCount = Math.min(4, Math.max(1, Math.floor(dist / 12)));
        addSparks(x, y, sparkCount, Math.min(1.8, dist / 20));
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "button, a, input, textarea, [role='button'], .group, [data-interactive='true']"
        );
        setIsHoveringClickable(!!interactive);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      addRipple(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      mouse.isActive = false;
      setIsPointerInside(false);
      setIsHoveringClickable(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;

        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }

        addSparks(x, y, 2, 1.2);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        addRipple(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Animation frame loop
    let animId: number;
    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (!isTabVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp for ring follower
      mouse.ringX += (mouse.x - mouse.ringX) * 0.18;
      mouse.ringY += (mouse.y - mouse.ringY) * 0.18;

      if (cursorRingRef.current && mouse.isActive) {
        cursorRingRef.current.style.transform = `translate3d(${mouse.ringX}px, ${mouse.ringY}px, 0)`;
      }

      // Draw and update ripple shockwaves
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= 0.025;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color}${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Secondary subtle outer glow ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color}${r.alpha * 0.35})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Draw and update spark particles
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${s.alpha})`;
        ctx.shadowColor = s.color.includes("163") ? "#A3FF12" : "#00D9FF";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* 1. Dynamic Cursor Spotlight Light Source (Behind UI but above background) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      >
        <div
          ref={spotlightRef}
          className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 217, 255, 0.08) 0%, rgba(163, 255, 18, 0.04) 30%, transparent 70%)",
            opacity: isPointerInside ? 1 : 0,
            willChange: "transform",
          }}
        />
      </div>

      {/* 2. Particle Sparks and Ripple Canvas (On top of UI) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-40 block"
      />

      {/* 3. Sleek Cybernetic Cursor Elements (Desktop only for precision) */}
      {!isTouchDevice && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        >
          {/* Center Precision Micro-Dot */}
          <div
            ref={cursorDotRef}
            className="absolute -top-1 -left-1 w-2 h-2 rounded-full pointer-events-none transition-opacity duration-200"
            style={{
              opacity: isPointerInside ? 1 : 0,
              backgroundColor: isHoveringClickable ? "#00D9FF" : "#A3FF12",
              boxShadow: isHoveringClickable
                ? "0 0 10px #00D9FF, 0 0 20px #00D9FF"
                : "0 0 10px #A3FF12, 0 0 20px #A3FF12",
              willChange: "transform",
            }}
          />

          {/* Smooth Lagging Cyber Ring Follower */}
          <div
            ref={cursorRingRef}
            className="absolute pointer-events-none transition-all duration-150 ease-out flex items-center justify-center"
            style={{
              top: isHoveringClickable ? "-24px" : "-16px",
              left: isHoveringClickable ? "-24px" : "-16px",
              width: isHoveringClickable ? "48px" : "32px",
              height: isHoveringClickable ? "48px" : "32px",
              opacity: isPointerInside ? 1 : 0,
              borderRadius: "9999px",
              borderWidth: "1.5px",
              borderColor: isHoveringClickable
                ? "rgba(0, 217, 255, 0.8)"
                : "rgba(163, 255, 18, 0.45)",
              backgroundColor: isHoveringClickable
                ? "rgba(0, 217, 255, 0.08)"
                : "transparent",
              boxShadow: isHoveringClickable
                ? "0 0 20px rgba(0, 217, 255, 0.35)"
                : "0 0 12px rgba(163, 255, 18, 0.2)",
              backdropFilter: isHoveringClickable ? "blur(1px)" : "none",
              transform: isHoveringClickable ? "scale(1.15)" : "scale(1)",
              willChange: "transform",
            }}
          >
            {/* Subtle crosshair notches on hover */}
            {isHoveringClickable && (
              <>
                <div className="absolute top-0 w-1 h-1 bg-[#00D9FF] rounded-full" />
                <div className="absolute bottom-0 w-1 h-1 bg-[#00D9FF] rounded-full" />
                <div className="absolute left-0 w-1 h-1 bg-[#00D9FF] rounded-full" />
                <div className="absolute right-0 w-1 h-1 bg-[#00D9FF] rounded-full" />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
