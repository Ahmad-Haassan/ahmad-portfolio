"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  RotateCw,
  Play,
  Pause,
  ExternalLink,
  Bot,
  Search,
  MessageSquare,
  ShieldCheck,
  Zap,
  Mic,
  Cpu,
  Layers,
  ChevronRight,
  Move,
  Code2,
} from "lucide-react";

interface Project3DCubeProps {
  projectId: "shoplens" | "jarvis" | "whatsapp-automation" | string;
  onOpenConnect?: () => void;
}

type ProjectFaceId = "overview" | "engine" | "algorithm" | "ai" | "stack" | "metrics";

const PROJECT_FACE_ROTATIONS: Record<ProjectFaceId, { x: number; y: number }> = {
  overview: { x: -10, y: 0 },
  engine: { x: -10, y: -90 },
  algorithm: { x: -10, y: -180 },
  ai: { x: -10, y: 90 },
  stack: { x: -90, y: 0 },
  metrics: { x: 90, y: 0 },
};

export function Project3DCube({ projectId, onOpenConnect }: Project3DCubeProps) {
  const [rotX, setRotX] = useState(-12);
  const [rotY, setRotY] = useState(25);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [activeFace, setActiveFace] = useState<ProjectFaceId>("overview");
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: -12,
    rotY: 25,
  });

  const animFrameRef = useRef<number | null>(null);
  const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isAutoSpin && !isDragging) {
        setRotY((prev) => (prev + 18 * delta) % 360);
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

  const jumpToFace = (face: ProjectFaceId) => {
    setIsAutoSpin(false);
    setActiveFace(face);
    const target = PROJECT_FACE_ROTATIONS[face];
    setRotX(target.x);
    setRotY(target.y);
  };

  // Determine Project Specific Visual Config
  const isShopLens = projectId === "shoplens";
  const isJarvis = projectId === "jarvis" || projectId === "flexivo";
  const isWhatsApp = projectId === "whatsapp-automation";

  const themeBorder = isShopLens
    ? "border-cyan-400/35 bg-[#0A121A]/95 shadow-cyan-500/10"
    : isJarvis
    ? "border-violet-400/35 bg-[#110D1D]/95 shadow-violet-500/10"
    : "border-emerald-400/35 bg-[#091510]/95 shadow-emerald-500/10";

  const glowShadow = isShopLens
    ? "bg-cyan-500/15"
    : isJarvis
    ? "bg-violet-500/15"
    : "bg-emerald-500/15";

  return (
    <div className="flex flex-col items-center justify-center select-none w-full max-w-sm mx-auto py-2">
      {/* 3D Scene Viewport */}
      <div
        className="relative w-[270px] h-[270px] sm:w-[300px] sm:h-[300px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{ perspective: "1100px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Dynamic floor shadow */}
        <div
          className={`absolute -bottom-6 w-48 h-10 rounded-full blur-2xl pointer-events-none ${glowShadow}`}
          style={{
            transform: `scale(${1 + Math.sin(rotY * (Math.PI / 180)) * 0.15})`,
          }}
        />

        {/* The 3D Cube Container */}
        <div
          className="relative w-[230px] h-[230px] sm:w-[250px] sm:h-[250px] transition-transform duration-75 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* ================= 1. FRONT FACE: Overview ================= */}
          <div
            className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border ${themeBorder} backdrop-blur-xl shadow-2xl overflow-hidden`}
            style={{
              transform: "translateZ(115px) sm:translateZ(125px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-white/[0.08] text-white">
                  {isShopLens ? "ShopLens" : isJarvis ? "Jarvis OS" : "WhatsApp Bot"}
                </span>
                <span className="text-[10px] font-mono text-emerald-400">360° View</span>
              </div>
              <h3 className="text-base font-black tracking-tight text-white">
                {isShopLens
                  ? "Price Intelligence"
                  : isJarvis
                  ? "AI Voice Assistant"
                  : "Webhook Agent"}
              </h3>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                {isShopLens
                  ? "Cross-retailer research engine extracting normalized specifications."
                  : isJarvis
                  ? "Hands-free voice recognition orchestrating local terminal and app macros."
                  : "Webhook-driven customer support router with SHA256 verification."}
              </p>
            </div>

            <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-white/[0.08] flex items-center justify-between">
              <span>Drag to spin 3D</span>
              <span className="text-indigo-400">Face 01</span>
            </div>
          </div>

          {/* ================= 2. RIGHT FACE: Engine & Scraper / Input ================= */}
          <div
            className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border ${themeBorder} backdrop-blur-xl shadow-2xl overflow-hidden`}
            style={{
              transform: "rotateY(90deg) translateZ(115px) sm:translateZ(125px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-white/[0.08] text-cyan-300">
                  Core Engine
                </span>
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <h3 className="text-base font-black tracking-tight text-white">
                {isShopLens
                  ? "Playwright Scraper"
                  : isJarvis
                  ? "PyAudio Buffer"
                  : "Webhook Verification"}
              </h3>
            </div>

            <div className="space-y-1 text-[11px] text-slate-300">
              {isShopLens ? (
                <>
                  <div>• Dynamic DOM JavaScript parser</div>
                  <div>• Microdata &amp; Schema extraction</div>
                  <div>• Rate-limit avoiding throttles</div>
                </>
              ) : isJarvis ? (
                <>
                  <div>• Sub-800ms speech token parsing</div>
                  <div>• Local voice activity detection</div>
                  <div>• Noise threshold adaptation</div>
                </>
              ) : (
                <>
                  <div>• HMAC-SHA256 handshake logic</div>
                  <div>• Payload idempotency protection</div>
                  <div>• Meta Graph API webhook queue</div>
                </>
              )}
            </div>

            <div className="text-[10px] font-mono text-cyan-300 pt-1 border-t border-white/[0.08]">
              High Reliability Pipeline
            </div>
          </div>

          {/* ================= 3. BACK FACE: Algorithm & Execution ================= */}
          <div
            className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border ${themeBorder} backdrop-blur-xl shadow-2xl overflow-hidden`}
            style={{
              transform: "rotateY(180deg) translateZ(115px) sm:translateZ(125px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-white/[0.08] text-violet-300">
                  Execution
                </span>
                <Zap className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <h3 className="text-base font-black tracking-tight text-white">
                {isShopLens
                  ? "Price Delta Alignment"
                  : isJarvis
                  ? "Subprocess Runner"
                  : "State Machine Router"}
              </h3>
            </div>

            <div className="space-y-1 text-[11px] text-slate-300">
              {isShopLens ? (
                <>
                  <div>• Canonical SKU reconciliation</div>
                  <div>• Cross-store visual price matrix</div>
                  <div>• Instant delta calculation</div>
                </>
              ) : isJarvis ? (
                <>
                  <div>• Strict command allowlisting</div>
                  <div>• Multi-app workspace launcher</div>
                  <div>• Zero cloud latency execution</div>
                </>
              ) : (
                <>
                  <div>• Intent classification logic</div>
                  <div>• 24h compliance messaging</div>
                  <div>• Operator escalation alert</div>
                </>
              )}
            </div>

            <div className="text-[10px] font-mono text-violet-300 pt-1 border-t border-white/[0.08]">
              Automated Operations
            </div>
          </div>

          {/* ================= 4. LEFT FACE: AI & Audio / Synthesis ================= */}
          <div
            className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border ${themeBorder} backdrop-blur-xl shadow-2xl overflow-hidden`}
            style={{
              transform: "rotateY(-90deg) translateZ(115px) sm:translateZ(125px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-white/[0.08] text-emerald-300">
                  Intelligent Layer
                </span>
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <h3 className="text-base font-black tracking-tight text-white">
                {isShopLens
                  ? "LLM Sentiment Pros/Cons"
                  : isJarvis
                  ? "pyttsx3 Voice Audio"
                  : "Template Auto-Reply"}
              </h3>
            </div>

            <div className="space-y-1 text-[11px] text-slate-300">
              {isShopLens ? (
                <>
                  <div>• Distills 400+ customer reviews</div>
                  <div>• Highlights recurring defect flags</div>
                  <div>• Impartial pros &amp; cons summary</div>
                </>
              ) : isJarvis ? (
                <>
                  <div>• Offline synthesized voice feedback</div>
                  <div>• Instant spoken task confirmations</div>
                  <div>• Zero audio buffering delays</div>
                </>
              ) : (
                <>
                  <div>• Interactive quick reply buttons</div>
                  <div>• Business knowledge FAQ lookup</div>
                  <div>• Formatted rich media cards</div>
                </>
              )}
            </div>

            <div className="text-[10px] font-mono text-emerald-300 pt-1 border-t border-white/[0.08]">
              Intelligent Synthesis
            </div>
          </div>

          {/* ================= 5. TOP FACE: Tech Stack ================= */}
          <div
            className={`absolute inset-0 rounded-2xl p-4 flex flex-col justify-between border ${themeBorder} backdrop-blur-xl shadow-2xl overflow-hidden`}
            style={{
              transform: "rotateX(90deg) translateZ(115px) sm:translateZ(125px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-white font-bold">Tech Stack</span>
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
            </div>

            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-300">
              {isShopLens ? (
                <>
                  <span className="p-1 rounded bg-white/[0.04]">Next.js 16</span>
                  <span className="p-1 rounded bg-white/[0.04]">React 19</span>
                  <span className="p-1 rounded bg-white/[0.04]">Python</span>
                  <span className="p-1 rounded bg-white/[0.04]">Playwright</span>
                  <span className="p-1 rounded bg-white/[0.04]">LLM API</span>
                  <span className="p-1 rounded bg-white/[0.04]">Tailwind</span>
                </>
              ) : isJarvis ? (
                <>
                  <span className="p-1 rounded bg-white/[0.04]">Python</span>
                  <span className="p-1 rounded bg-white/[0.04]">PyAudio</span>
                  <span className="p-1 rounded bg-white/[0.04]">pyttsx3</span>
                  <span className="p-1 rounded bg-white/[0.04]">Subprocess</span>
                  <span className="p-1 rounded bg-white/[0.04]">PyQt</span>
                  <span className="p-1 rounded bg-white/[0.04]">pyautogui</span>
                </>
              ) : (
                <>
                  <span className="p-1 rounded bg-white/[0.04]">Node.js</span>
                  <span className="p-1 rounded bg-white/[0.04]">Express</span>
                  <span className="p-1 rounded bg-white/[0.04]">Meta API</span>
                  <span className="p-1 rounded bg-white/[0.04]">Webhooks</span>
                  <span className="p-1 rounded bg-white/[0.04]">HMAC SHA</span>
                  <span className="p-1 rounded bg-white/[0.04]">JSON Schema</span>
                </>
              )}
            </div>

            <div className="text-[10px] text-slate-400 text-center font-mono">
              Production Architecture
            </div>
          </div>

          {/* ================= 6. BOTTOM FACE: Project Action / Links ================= */}
          <div
            className={`absolute inset-0 rounded-2xl p-4 flex flex-col justify-between border ${themeBorder} backdrop-blur-xl shadow-2xl overflow-hidden`}
            style={{
              transform: "rotateX(-90deg) translateZ(115px) sm:translateZ(125px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-white font-bold">Source &amp; Inquire</span>
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs font-bold text-white">github.com/Ahmad-Haassan</p>
              <p className="text-[10px] text-slate-400 font-mono">Status: In Active Testing</p>
            </div>

            <button
              onClick={onOpenConnect}
              className="w-full py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm flex items-center justify-center gap-1"
            >
              Discuss System <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Face Navigation Buttons */}
      <div className="mt-4 flex flex-col items-center gap-2 w-full">
        <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          {[
            { id: "overview" as ProjectFaceId, label: "Overview" },
            { id: "engine" as ProjectFaceId, label: "Engine" },
            { id: "algorithm" as ProjectFaceId, label: "Execution" },
            { id: "ai" as ProjectFaceId, label: "AI / Audio" },
            { id: "stack" as ProjectFaceId, label: "Stack" },
            { id: "metrics" as ProjectFaceId, label: "Source" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => jumpToFace(tab.id)}
              className={`px-2 py-0.5 rounded-lg text-[10.5px] font-mono transition-all ${
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
              setRotY(25);
              setIsAutoSpin(true);
              setActiveFace("overview");
            }}
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <RotateCw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500">
            <Move className="w-3 h-3" /> Drag 360°
          </span>
        </div>
      </div>
    </div>
  );
}
