"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  RotateCw,
  Play,
  Pause,
  Bot,
  Globe,
  Terminal,
  Cpu,
  Layers,
  GraduationCap,
  Mail,
  Move,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface About3DCubeProps {
  onOpenConnect?: () => void;
}

type AboutFaceId = "identity" | "web" | "automation" | "foundations" | "stack" | "contact";

const ABOUT_FACE_ROTATIONS: Record<AboutFaceId, { x: number; y: number }> = {
  identity: { x: -10, y: 0 },
  web: { x: -10, y: -90 },
  automation: { x: -10, y: -180 },
  foundations: { x: -10, y: 90 },
  stack: { x: -90, y: 0 },
  contact: { x: 90, y: 0 },
};

export function About3DCube({ onOpenConnect }: About3DCubeProps) {
  const [rotX, setRotX] = useState(-12);
  const [rotY, setRotY] = useState(20);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [activeFace, setActiveFace] = useState<AboutFaceId>("identity");
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: -12,
    rotY: 20,
  });

  const animFrameRef = useRef<number | null>(null);
  const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isAutoSpin && !isDragging) {
        setRotY((prev) => (prev + 16 * delta) % 360);
        setRotX((prev) => -10 + Math.sin(currentTime * 0.001) * 7);
      } else if (!isDragging && (Math.abs(velocityRef.current.vx) > 0.05 || Math.abs(velocityRef.current.vy) > 0.05)) {
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

  const jumpToFace = (face: AboutFaceId) => {
    setIsAutoSpin(false);
    setActiveFace(face);
    const target = ABOUT_FACE_ROTATIONS[face];
    setRotX(target.x);
    setRotY(target.y);
  };

  return (
    <div className="flex flex-col items-center justify-center select-none w-full max-w-md mx-auto py-2">
      {/* 3D Scene Viewport */}
      <div
        className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{ perspective: "1100px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Dynamic floor shadow */}
        <div
          className="absolute -bottom-6 w-52 h-10 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none"
          style={{
            transform: `scale(${1 + Math.sin(rotY * (Math.PI / 180)) * 0.15})`,
          }}
        />

        {/* The 3D Cube Container */}
        <div
          className="relative w-[240px] h-[240px] sm:w-[260px] sm:h-[260px] transition-transform duration-75 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* 1. FRONT FACE: Ahmad Hassan Profile */}
          <div
            className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border border-indigo-400/30 bg-[#0C101A]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "translateZ(120px) sm:translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                  About Me
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </span>
              </div>
              <h3 className="text-lg font-black tracking-tight text-white">
                Ahmad Hassan
              </h3>
              <p className="text-xs text-indigo-200/90 font-medium">
                BS Computer Science Student
              </p>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug my-1">
              Passionate developer translating concepts into high-speed web apps and autonomous AI workflows with clean architectures.
            </p>

            <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-white/[0.08] flex items-center justify-between">
              <span>Drag to spin 360°</span>
              <span className="text-indigo-400">Cube Face 01</span>
            </div>
          </div>

          {/* 2. RIGHT FACE: Web Engineering */}
          <div
            className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border border-cyan-400/30 bg-[#0C121D]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "rotateY(90deg) translateZ(120px) sm:translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                  Web Craft
                </span>
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <h3 className="text-base font-black tracking-tight text-white">
                Modern Web Apps
              </h3>
            </div>

            <div className="space-y-1 text-[11px] text-slate-300">
              <div>• Next.js 16 App Router &amp; SSR</div>
              <div>• React 19 Component Systems</div>
              <div>• Strict TypeScript Typing</div>
              <div>• High-conversion UI/UX</div>
            </div>

            <div className="text-[10px] font-mono text-cyan-300 pt-1 border-t border-white/[0.08]">
              Speed • Responsiveness • Clean DOM
            </div>
          </div>

          {/* 3. BACK FACE: AI & Automations (Jarvis) */}
          <div
            className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border border-violet-400/30 bg-[#110D1D]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "rotateY(180deg) translateZ(120px) sm:translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-violet-500/15 text-violet-300 border border-violet-500/25">
                  Automation
                </span>
                <Bot className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <h3 className="text-base font-black tracking-tight text-white">
                AI &amp; Jarvis Systems
              </h3>
            </div>

            <div className="space-y-1 text-[11px] text-slate-300">
              <div>• Voice-driven OS macros (Jarvis)</div>
              <div>• Webhook pipeline orchestration</div>
              <div>• Python scrapers &amp; normalizers</div>
              <div>• LLM review &amp; prompt synthesis</div>
            </div>

            <div className="text-[10px] font-mono text-violet-300 pt-1 border-t border-white/[0.08]">
              Zero Friction • Autonomous Workflows
            </div>
          </div>

          {/* 4. LEFT FACE: CS Rigor & Algorithms */}
          <div
            className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border border-emerald-400/30 bg-[#0C1612]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "rotateY(-90deg) translateZ(120px) sm:translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  CS Rigor
                </span>
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <h3 className="text-base font-black tracking-tight text-white">
                Fundamentals
              </h3>
            </div>

            <div className="space-y-1 text-[11px] text-slate-300">
              <div>• C++ Data Structures &amp; Complexity</div>
              <div>• Memory Management &amp; Pointers</div>
              <div>• OOP &amp; Modular Design Patterns</div>
              <div>• OS Process Trees &amp; Concurrency</div>
            </div>

            <div className="text-[10px] font-mono text-emerald-300 pt-1 border-t border-white/[0.08]">
              Disciplined Engineering
            </div>
          </div>

          {/* 5. TOP FACE: Tech Stack */}
          <div
            className="absolute inset-0 rounded-2xl p-4 flex flex-col justify-between border border-blue-400/30 bg-[#0A101C]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "rotateX(90deg) translateZ(120px) sm:translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-blue-300 font-bold">Stack Core</span>
              <Layers className="w-3.5 h-3.5 text-blue-400" />
            </div>

            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-300">
              <span className="p-1 rounded bg-white/[0.04]">Next.js 16</span>
              <span className="p-1 rounded bg-white/[0.04]">React 19</span>
              <span className="p-1 rounded bg-white/[0.04]">TypeScript</span>
              <span className="p-1 rounded bg-white/[0.04]">Python</span>
              <span className="p-1 rounded bg-white/[0.04]">C++</span>
              <span className="p-1 rounded bg-white/[0.04]">Webhooks</span>
            </div>

            <div className="text-[10px] text-slate-400 text-center font-mono">
              Next.js • React • Python
            </div>
          </div>

          {/* 6. BOTTOM FACE: Contact Ahmad */}
          <div
            className="absolute inset-0 rounded-2xl p-4 flex flex-col justify-between border border-indigo-400/30 bg-[#0A0D15]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            style={{
              transform: "rotateX(-90deg) translateZ(120px) sm:translateZ(130px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-indigo-300 font-bold">Get In Touch</span>
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs font-bold text-white">ahmadd557125@gmail.com</p>
              <p className="text-[10px] text-slate-400 font-mono">github.com/Ahmad-Haassan</p>
            </div>

            <button
              onClick={onOpenConnect}
              className="w-full py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm flex items-center justify-center gap-1"
            >
              Open Message <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Face Navigation Buttons */}
      <div className="mt-4 flex flex-col items-center gap-2.5 w-full">
        <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          {[
            { id: "identity" as AboutFaceId, label: "Identity" },
            { id: "web" as AboutFaceId, label: "Web Dev" },
            { id: "automation" as AboutFaceId, label: "Jarvis & AI" },
            { id: "foundations" as AboutFaceId, label: "CS Rigor" },
            { id: "stack" as AboutFaceId, label: "Stack" },
            { id: "contact" as AboutFaceId, label: "Contact" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => jumpToFace(tab.id)}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-mono transition-all ${
                activeFace === tab.id
                  ? "bg-indigo-600 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
          <button
            onClick={() => setIsAutoSpin((prev) => !prev)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 hover:text-white transition-all"
          >
            {isAutoSpin ? (
              <>
                <Pause className="w-3 h-3 text-indigo-400" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span>360° Spin</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setRotX(-12);
              setRotY(20);
              setIsAutoSpin(true);
              setActiveFace("identity");
            }}
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <RotateCw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500">
            <Move className="w-3 h-3" /> Drag 3D
          </span>
        </div>
      </div>
    </div>
  );
}
