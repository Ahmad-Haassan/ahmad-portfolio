"use client";

import React, { forwardRef, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "accent-green" | "accent-cyan" | "interactive";
  glow?: boolean;
  enableTilt?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = "default",
      glow = false,
      enableTilt,
      children,
      onMouseMove,
      onMouseLeave,
      onMouseEnter,
      ...props
    },
    forwardedRef
  ) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const glareRef = useRef<HTMLDivElement | null>(null);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    const shouldTilt =
      enableTilt !== undefined
        ? enableTilt
        : variant === "interactive";

    useEffect(() => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(media.matches);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || isReducedMotion || !shouldTilt) {
        if (onMouseMove) onMouseMove(e);
        return;
      }

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt: max ~6 degrees for elegance
      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;

      // Specular glare position
      if (glareRef.current) {
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(450px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.08) 0%, transparent 70%)`;
      }

      if (onMouseMove) onMouseMove(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (cardRef.current && !isReducedMotion && shouldTilt) {
        cardRef.current.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      }
      if (glareRef.current) {
        glareRef.current.style.opacity = "0";
      }
      if (onMouseLeave) onMouseLeave(e);
    };

    const baseStyles =
      "relative rounded-2xl border transition-all duration-300 backdrop-blur-xl overflow-hidden will-change-transform";

    const variantStyles = {
      default:
        "bg-[rgba(255,255,255,0.045)] border-[rgba(255,255,255,0.12)] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]",
      elevated:
        "bg-[rgba(13,17,24,0.7)] border-[rgba(255,255,255,0.14)] shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
      "accent-green":
        "bg-[rgba(255,255,255,0.045)] border-[#A3FF12]/30 shadow-[0_0_25px_rgba(163,255,18,0.08)]",
      "accent-cyan":
        "bg-[rgba(255,255,255,0.045)] border-[#00D9FF]/30 shadow-[0_0_25px_rgba(0,217,255,0.08)]",
      interactive:
        "bg-[rgba(255,255,255,0.045)] border-[rgba(255,255,255,0.12)] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/30 hover:bg-[rgba(255,255,255,0.065)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.55)]",
    };

    const glowStyles = glow
      ? "after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none after:border after:border-white/10 after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
      : "";

    return (
      <div
        ref={(node) => {
          cardRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        className={cn(baseStyles, variantStyles[variant], glowStyles, className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Specular glare tracker */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 z-0"
        />

        {/* Subtle top glare reflection highlight */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10"
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
