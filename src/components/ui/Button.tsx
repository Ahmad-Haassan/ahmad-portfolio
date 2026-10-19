"use client";

import React, { forwardRef, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      icon,
      iconPosition = "right",
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isHovered: true,
      });
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isHovered: true,
      });
    };

    const handleMouseLeave = () => {
      setMousePos((prev) => ({ ...prev, isHovered: false }));
    };

    const baseStyles =
      "relative inline-flex items-center justify-center font-medium tracking-normal transition-all duration-200 rounded-xl cursor-pointer select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080B] disabled:opacity-50 disabled:pointer-events-none group overflow-hidden isolation-auto";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5 rounded-lg",
      md: "text-sm px-5 py-2.5 gap-2 rounded-xl",
      lg: "text-base px-6 py-3.5 gap-2.5 rounded-2xl font-semibold",
    };

    const variantStyles = {
      // Primary: Modern Electric Indigo with subtle specular glare
      primary:
        "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30 focus-visible:ring-indigo-500 font-semibold",

      // Secondary: Deep Glass with fine specular border
      secondary:
        "bg-white/[0.04] text-slate-200 border border-white/10 hover:border-white/25 hover:bg-white/[0.08] hover:text-white shadow-md focus-visible:ring-cyan-500 backdrop-blur-md",

      // Glass: subtle backdrop panel style
      glass:
        "bg-white/[0.03] text-slate-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.06] backdrop-blur-sm focus-visible:ring-white/30",

      // Ghost: minimal
      ghost:
        "bg-transparent text-slate-400 hover:text-white hover:bg-white/[0.06] focus-visible:ring-white/20",
    };

    const content = (
      <>
        {/* Cursor Spotlight Glare following mouse within button */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: mousePos.isHovered ? 1 : 0,
            background:
              variant === "primary"
                ? `radial-gradient(90px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.25) 0%, transparent 80%)`
                : `radial-gradient(90px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.2) 0%, transparent 80%)`,
          }}
        />

        {/* Shimmer sweep on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full group-hover:animate-shimmer pointer-events-none"
          style={{
            background:
              variant === "primary"
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* Content */}
        {icon && iconPosition === "left" && (
          <span className="relative z-10 transition-transform duration-200 group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span className="relative z-10 transition-colors duration-150">
          {children}
        </span>
        {icon && iconPosition === "right" && (
          <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => {
            if (href.startsWith("#")) {
              const target = document.querySelector(href);
              if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
              }
            }
            if (onClick) onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
          }}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
