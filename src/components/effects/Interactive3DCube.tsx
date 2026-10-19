"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  ArrowRight,
  RotateCw,
  Play,
  Pause,
  ExternalLink,
  Bot,
  Globe,
  Terminal,
  Cpu,
  Layers,
  ChevronRight,
  Move,
} from "lucide-react";

interface Interactive3DCubeProps {
  onSelectProject?: (projectId: string) => void;
  onOpenConnect?: () => void;
}

type FaceId = "front" | "right" | "back" | "left" | "top" | "bottom";

const FACE_ROTATIONS: Record<FaceId, { x: number; y: number }> = {
  front: { x: -10, y: 0 },
  right: { x: -10, y: -90 },
  back: { x: -10, y: -180 },
  left: { x: -10, y: 90 },
  top: { x: -90, y: 0 },
  bottom: { x: 90, y: 0 },
};

export function Interactive3DCube({
  onSelectProject,
  onOpenConnect,
}: Interactive3DCubeProps) {
  const [rotX, setRotX] = useState(-14);
  const [rotY, setRotY] = useState(25);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [activeFace, setActiveFace] = useState<FaceId>("front");
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: -14,
    rotY: 25,
  });

  const cubeRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });

  // Handle continuous gentle auto-rotation when not interacting
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isAutoSpin && !isDragging) {
        setRotY((prev) => (prev + 18 * delta) % 360);
        setRotX((prev) => -12 + Math.sin(currentTime * 0.001) * 8);
      } else if (!isDragging && (Math.abs(velocityRef.current.vx) > 0.05 || Math.abs(velocityRef.current.vy) > 0.05)) {
        // Inertia decay
        setRotY((prev) => (prev + velocityRef.current.vx) % 360);
        setRotX((prev) => Math.max(-85, Math.min(85, prev - velocityRef.current.vy)));
        velocityRef.current.vx *= 0.92;
        velocityRef.current.vy *= 0.92;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoSpin, isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsAutoSpin(false);
    velocityRef.current = { vx: 0, vy: 0 };
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX,
      rotY,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const newRotY = dragStartRef.current.rotY + dx * 0.55;
    const newRotX = Math.max(-85, Math.min(85, dragStartRef.current.rotX - dy * 0.55));

    velocityRef.current = {
      vx: dx * 0.05,
      vy: dy * 0.05,
    };

    setRotY(newRotY);
    setRotX(newRotX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const jumpToFace = (face: FaceId) => {
    setIsAutoSpin(false);
    setActiveFace(face);
    const target = FACE_ROTATIONS[face];
    setRotX(target.x);
    setRotY(target.y);
  };

  const handleProjectClick = (projectId: string) => {
    if (onSelectProject) {
      onSelectProject(projectId);
    }
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center select-none w-full max-w-lg mx-auto py-4">
      {/* 3D Scene Viewport */}
      <div
        className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{ perspective: "1200px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Subtle dynamic floor shadow that scales with rotation */}
        <div
          className="absolute -bottom-8 w-56 h-12 rounded-full bg-indigo-500/15 blur-2xl transition-all duration-300 pointer-events-none"
          style={{
            transform: `scale(${1 + Math.sin(rotY * (Math.PI / 180)) * 0.15})`,
          }}
        />

        {/* The 3D Cube Container */}
        <div
          ref={cubeRef}
          className="relative w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] transition-transform duration-100 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* 1. FRONT FACE: Developer Profile & Core Identity */}
          <div
            className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border border-indigo-400/30 bg-[#0C101A]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                  Core Identity
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </span>
              </div>

              <h3 className="text-xl font-black tracking-tight text-white">
                Ahmad Hassan
              </h3>
              <p className="text-xs text-indigo-200/90 font-medium mt-1">
                Web Developer &amp; AI Automations Maker
              </p>
            </div>

            <div className="my-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Next.js 16 • React 19 • Fast UI</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Python • LLMs • Automated Systems</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 font-mono">
                Drag to rotate 360°
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenConnect?.();
                }}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md flex items-center gap-1"
              >
                Connect <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 2. RIGHT FACE: ShopLens Project */}
          <div
            className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border border-cyan-400/30 bg-[#0C121D]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "rotateY(90deg) translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                  Project 01
                </span>
                <span className="text-[10px] text-slate-400 font-mono">In Development</span>
              </div>

              <h3 className="text-xl font-black tracking-tight text-white">
                ShopLens
              </h3>
              <p className="text-xs text-cyan-200/90 font-medium mt-1 line-clamp-2">
                Real-Time Price Intelligence &amp; AI Review Synthesis
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[11px] text-slate-300 space-y-1">
              <div className="text-[10px] font-mono text-cyan-300">Stack: Next.js + Python + LLM</div>
              <p className="text-[10.5px] text-slate-400 leading-snug">
                Extracts store schemas, normalizes spec deltas, and synthesizes customer sentiment.
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleProjectClick("shoplens");
              }}
              className="w-full py-2 rounded-lg text-xs font-semibold bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center gap-1.5"
            >
              Inspect Depth Detail <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. BACK FACE: Flexivo Project */}
          <div
            className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border border-violet-400/30 bg-[#100D1B]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "rotateY(180deg) translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-violet-500/15 text-violet-300 border border-violet-500/25">
                  Project 02
                </span>
                <span className="text-[10px] text-amber-400 font-mono">Experiment</span>
              </div>

              <h3 className="text-xl font-black tracking-tight text-white">
                Flexivo
              </h3>
              <p className="text-xs text-violet-200/90 font-medium mt-1 line-clamp-2">
                Local AI Voice Assistant &amp; Desktop OS Automation
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[11px] text-slate-300 space-y-1">
              <div className="text-[10px] font-mono text-violet-300">Stack: Python + Speech + OS Subprocess</div>
              <p className="text-[10.5px] text-slate-400 leading-snug">
                Zero-lag offline voice triggers, macro scripting, and low-latency system actions.
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleProjectClick("flexivo");
              }}
              className="w-full py-2 rounded-lg text-xs font-semibold bg-violet-500/15 border border-violet-500/30 text-violet-200 hover:bg-violet-500 hover:text-white transition-all flex items-center justify-center gap-1.5"
            >
              Inspect Depth Detail <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. LEFT FACE: WhatsApp Automation Project */}
          <div
            className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border border-emerald-400/30 bg-[#0C1512]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "rotateY(-90deg) translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  Project 03
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Concept</span>
              </div>

              <h3 className="text-xl font-black tracking-tight text-white">
                WhatsApp Pipeline
              </h3>
              <p className="text-xs text-emerald-200/90 font-medium mt-1 line-clamp-2">
                Webhook-Driven Customer Routing &amp; AI Support
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[11px] text-slate-300 space-y-1">
              <div className="text-[10px] font-mono text-emerald-300">Stack: Node.js + Meta Graph API</div>
              <p className="text-[10.5px] text-slate-400 leading-snug">
                HMAC-SHA256 handshake verification, intent classification, and template auto-replies.
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleProjectClick("whatsapp-automation");
              }}
              className="w-full py-2 rounded-lg text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center gap-1.5"
            >
              Inspect Depth Detail <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5. TOP FACE: Tech Stack Capabilities */}
          <div
            className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border border-blue-400/30 bg-[#0A101C]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "rotateX(90deg) translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-500/15 text-blue-300 border border-blue-500/25">
                  Tech Matrix
                </span>
                <Layers className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-lg font-black tracking-tight text-white">
                Core Stack
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10.5px] font-mono text-slate-300">
              <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">Next.js 16 &amp; React 19</div>
              <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">Python Automation</div>
              <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">TypeScript / JS</div>
              <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">C++ Fundamentals</div>
              <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">Tailwind CSS</div>
              <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">REST &amp; Webhooks</div>
            </div>

            <div className="text-[10px] text-slate-400 text-center font-mono">
              Designed for speed &amp; reliability
            </div>
          </div>

          {/* 6. BOTTOM FACE: Engineering Philosophy */}
          <div
            className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border border-amber-400/30 bg-[#161109]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "rotateX(-90deg) translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-500/15 text-amber-300 border border-amber-500/25">
                  Philosophy
                </span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-base font-black tracking-tight text-white">
                Execution Over Hype
              </h3>
            </div>

            <blockquote className="text-xs text-amber-100/90 italic leading-relaxed">
              &ldquo;Build what eliminates manual friction. Test in real code. Refine every interaction.&rdquo;
            </blockquote>

            <div className="text-[10px] font-mono text-amber-300">
              Ahmad Hassan • Computer Science
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & 360° Face Navigators */}
      <div className="mt-5 flex flex-col items-center gap-3 w-full">
        {/* Face Quick-Switch Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          {[
            { id: "front" as FaceId, label: "Identity" },
            { id: "right" as FaceId, label: "ShopLens" },
            { id: "back" as FaceId, label: "Flexivo" },
            { id: "left" as FaceId, label: "WhatsApp AI" },
            { id: "top" as FaceId, label: "Stack" },
            { id: "bottom" as FaceId, label: "Philosophy" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => jumpToFace(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 ${
                activeFace === tab.id
                  ? "bg-indigo-600 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3D Utility Toggles: Spin toggle & Drag hint */}
        <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
          <button
            onClick={() => setIsAutoSpin((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white transition-all"
          >
            {isAutoSpin ? (
              <>
                <Pause className="w-3.5 h-3.5 text-indigo-400" />
                <span>Pause Spin</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto-Spin 360°</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setRotX(-14);
              setRotY(25);
              setIsAutoSpin(true);
              setActiveFace("front");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg hover:text-white hover:bg-white/[0.04] transition-all"
            title="Reset Angle"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500">
            <Move className="w-3 h-3 text-slate-400" /> Drag to spin 3D
          </span>
        </div>
      </div>
    </div>
  );
}
