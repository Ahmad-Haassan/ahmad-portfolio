"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ExternalLink,
  Code2,
  Workflow,
  Cpu,
  Layers,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCw,
  Search,
  Mic,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Send,
  Zap,
} from "lucide-react";
import { Project, PROJECTS } from "@/lib/projects";
import { GithubIcon } from "@/components/ui/Icons";
import { Project3DCube } from "@/components/effects/Project3DCube";

interface ProjectDeepDiveStudioProps {
  onOpenConnect: () => void;
  selectedProjectId?: string;
}

export function ProjectDeepDiveStudio({
  onOpenConnect,
  selectedProjectId,
}: ProjectDeepDiveStudioProps) {
  const [activeProjectId, setActiveProjectId] = useState<string>(
    selectedProjectId || "shoplens"
  );
  const [activeTab, setActiveTab] = useState<"overview" | "cube3d" | "architecture" | "interactive" | "tech">("overview");

  // Interactive Simulator States
  // 1. ShopLens Simulator
  const [shopLensQuery, setShopLensQuery] = useState("Sony WH-1000XM5");
  const [isComparing, setIsComparing] = useState(false);

  // 2. Flexivo Voice Simulator
  const [flexivoOutput, setFlexivoOutput] = useState<string[]>([
    "[System] Flexivo Core 1.0 initialized (Acoustic listener active)",
    "[System] Ready for voice triggers...",
  ]);
  const [isVoiceRunning, setIsVoiceRunning] = useState(false);

  // 3. WhatsApp Simulator
  const [incomingMessage, setIncomingMessage] = useState("What are your business hours and pricing?");
  const [chatLog, setChatLog] = useState<{ sender: "user" | "bot"; text: string; time: string }[]>([
    {
      sender: "bot",
      text: "👋 Hello! Welcome to our automated business assistant. How can we help you today?",
      time: "10:00 AM",
    },
  ]);
  const [isProcessingWebhook, setIsProcessingWebhook] = useState(false);

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0];

  const handleSimulateVoice = (command: string) => {
    setIsVoiceRunning(true);
    setFlexivoOutput((prev) => [
      ...prev,
      `[Microphone] Audio buffer captured: "${command}"`,
      `[Acoustic Engine] Transcribing speech tokens (320ms)...`,
    ]);

    setTimeout(() => {
      let executionMsg = "";
      if (command.includes("Dev")) {
        executionMsg = "[Action] Launching VS Code, opening project directory, running 'npm run dev' on :3000";
      } else if (command.includes("Focus")) {
        executionMsg = "[Action] Enabling Do Not Disturb, muting Slack, launching Spotify Lo-Fi";
      } else {
        executionMsg = "[Action] Executing git status, checking uncommitted worktree changes";
      }

      setFlexivoOutput((prev) => [
        ...prev,
        `[Intent Matcher] Intent identified: RUN_WORKFLOW_PRESET`,
        executionMsg,
        `[Voice TTS] Spoken audio synthesized: "Task completed successfully."`,
        "---",
      ]);
      setIsVoiceRunning(false);
    }, 800);
  };

  const handleSimulateWebhook = () => {
    if (!incomingMessage.trim() || isProcessingWebhook) return;
    const userMsg = incomingMessage;
    setChatLog((prev) => [
      ...prev,
      { sender: "user", text: userMsg, time: "Just now" },
    ]);
    setIncomingMessage("");
    setIsProcessingWebhook(true);

    setTimeout(() => {
      let reply = "";
      if (userMsg.toLowerCase().includes("hour") || userMsg.toLowerCase().includes("time")) {
        reply = "🕒 We are open Monday to Friday, 9:00 AM - 6:00 PM EST. Online automations run 24/7!";
      } else if (userMsg.toLowerCase().includes("price") || userMsg.toLowerCase().includes("cost")) {
        reply = "💼 Our web development & automation packages start at custom milestone pricing. Would you like a brochure?";
      } else {
        reply = "🤖 Thanks for your message! Our routing engine has logged your request and notified Ahmad directly.";
      }

      setChatLog((prev) => [
        ...prev,
        { sender: "bot", text: reply, time: "Just now" },
      ]);
      setIsProcessingWebhook(false);
    }, 700);
  };

  return (
    <section
      id="projects"
      aria-label="Flagship Projects Studio"
      className="relative py-24 sm:py-32 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>PROJECTS STUDIO · IN-DEPTH TECHNICAL DETAIL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Flagship Engineering Work
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2.5 max-w-2xl leading-relaxed">
              Explore the real architectural depth, solved problems, and live interactive simulators behind each application.
            </p>
          </div>

          {/* Project Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0E121B] border border-white/[0.1] backdrop-blur-md">
            {PROJECTS.map((p) => {
              const isActive = p.id === activeProjectId;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveProjectId(p.id);
                    setActiveTab("overview");
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{p.name}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      p.status === "In Development"
                        ? "bg-cyan-400"
                        : p.status === "Experiment"
                        ? "bg-violet-400"
                        : "bg-emerald-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Showcase Container */}
        <div className="rounded-3xl border border-white/[0.12] bg-[#0A0D15]/80 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden">
          {/* Top Project Subnav & Meta Bar */}
          <div className="px-6 py-4 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="text-base sm:text-lg font-bold text-white">
                {activeProject.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-white/[0.06] text-slate-300 border border-white/10">
                {activeProject.status}
              </span>
            </div>

            {/* Sub-tabs */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              {[
                { id: "overview", label: "Overview & Problem" },
                { id: "cube3d", label: "360° 3D Cube" },
                { id: "architecture", label: "Architecture Pipeline" },
                { id: "interactive", label: "Interactive Simulator" },
                { id: "tech", label: "Tech Stack & Challenges" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === tab.id
                      ? "bg-white/[0.12] text-white font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-tab 1: Overview & Problem */}
          {activeTab === "overview" && (
            <div className="p-6 sm:p-10 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 cols: Pitch & Problem */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {activeProject.concept}
                    </h3>
                    <p className="text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
                      {activeProject.description || activeProject.overview}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold tracking-wider uppercase">
                      <AlertCircle className="w-4 h-4" />
                      <span>The Real Problem Explored</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {activeProject.problemExplored}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-mono font-bold tracking-wider uppercase">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>The Engineering Solution</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {activeProject.proposedSolution}
                    </p>
                  </div>
                </div>

                {/* Right 5 cols: 3D Cube & Key Metrics */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Interactive 3D Cube Card */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col items-center">
                    <div className="flex items-center justify-between w-full px-2 mb-2">
                      <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
                        Interactive 360° {activeProject.name} Cube
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">Drag to spin</span>
                    </div>
                    <Project3DCube projectId={activeProjectId} onOpenConnect={onOpenConnect} />
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Target Audience &amp; Workflow
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300">
                      <strong className="text-white">Intended Users:</strong> {activeProject.intendedUsers}
                    </p>
                    {activeProject.intendedWorkflow && (
                      <div className="pt-2 border-t border-white/[0.06]">
                        <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wide block mb-1">
                          Standard Execution Cycle
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {activeProject.intendedWorkflow}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Current Development Milestone
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeProject.currentStatusDetails}
                    </p>
                    <div className="pt-3 flex items-center gap-3">
                      <button
                        onClick={onOpenConnect}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md flex items-center gap-1.5"
                      >
                        Inquire About Project <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab: 360° 3D Cube Dedicated Showcase */}
          {activeTab === "cube3d" && (
            <div className="p-6 sm:p-12 flex flex-col items-center justify-center space-y-6">
              <div className="text-center max-w-xl">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">
                  Interactive 3D System Model
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  {activeProject.name} — 360° Structural Cube
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Drag with your cursor to inspect every facet of {activeProject.name}&apos;s architecture, tech stack, and execution flow in 3D.
                </p>
              </div>

              <div className="w-full max-w-md p-6 rounded-3xl bg-[#090C14]/90 border border-white/[0.08] backdrop-blur-xl shadow-2xl flex flex-col items-center">
                <Project3DCube
                  projectId={activeProjectId}
                  onOpenConnect={onOpenConnect}
                />
              </div>
            </div>
          )}

          {/* Sub-tab 2: Architecture Pipeline */}
          {activeTab === "architecture" && (
            <div className="p-6 sm:p-10 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white">System Architecture &amp; Data Pipeline</h3>
                <p className="text-sm text-slate-400 mt-1">
                  How data flows from user input through backend processors to the client interface.
                </p>
              </div>

              {/* Visual Pipeline Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {activeProjectId === "shoplens" ? (
                  <>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-cyan-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        01
                      </div>
                      <h4 className="text-sm font-bold text-white">Input Query</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        User submits product URL or model query via Next.js 16 frontend interface.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-indigo-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        02
                      </div>
                      <h4 className="text-sm font-bold text-white">DOM Parser</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        Python / BeautifulSoup extracts price, stock, and specification tables across stores.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-violet-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        03
                      </div>
                      <h4 className="text-sm font-bold text-white">Schema Normalizer</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        Pydantic matches SKU models across retailers and computes relative price deltas.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-emerald-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        04
                      </div>
                      <h4 className="text-sm font-bold text-white">LLM Synthesis</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        Distills raw user reviews into bulleted durability pros, cons, and reliability alerts.
                      </p>
                    </div>
                  </>
                ) : activeProjectId === "flexivo" ? (
                  <>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-violet-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        01
                      </div>
                      <h4 className="text-sm font-bold text-white">Acoustic Capture</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        PyAudio background thread monitors local microphone buffer with voice activity detection.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-indigo-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        02
                      </div>
                      <h4 className="text-sm font-bold text-white">Speech Parser</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        Transcribes speech offline or via API into normalized token intents under 800ms.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-cyan-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        03
                      </div>
                      <h4 className="text-sm font-bold text-white">OS Subprocess</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        Executes allowlisted shell scripts, arranges dev windows, or launches project environments.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-emerald-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        04
                      </div>
                      <h4 className="text-sm font-bold text-white">Offline TTS</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        pyttsx3 synthesizes immediate spoken confirmation to provide feedback without visual distraction.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-emerald-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        01
                      </div>
                      <h4 className="text-sm font-bold text-white">Webhook Ingestion</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        Receives Meta Graph API POST payload with HMAC-SHA256 signature verification handshake.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-cyan-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        02
                      </div>
                      <h4 className="text-sm font-bold text-white">Intent Classifier</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        Validates message type against state machine: FAQ, booking inquiry, or human escalation.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-indigo-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        03
                      </div>
                      <h4 className="text-sm font-bold text-white">Template Engine</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        Formats pre-approved WhatsApp interactive quick-reply buttons and rich media cards.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative group hover:border-amber-500/40 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                        04
                      </div>
                      <h4 className="text-sm font-bold text-white">Escalation Queue</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        Unrecognized queries are piped to business operator notifications with full conversation log.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Features List */}
              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Feature Implementation Status
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProject.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3"
                    >
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase mt-0.5 ${
                          feat.stage === "In Progress"
                            ? "bg-cyan-500/15 text-cyan-300"
                            : feat.stage === "Experimental"
                            ? "bg-violet-500/15 text-violet-300"
                            : "bg-amber-500/15 text-amber-300"
                        }`}
                      >
                        {feat.stage}
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-white">{feat.title}</h5>
                        <p className="text-[11.5px] text-slate-400 mt-1 leading-snug">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 3: Interactive Simulator */}
          {activeTab === "interactive" && (
            <div className="p-6 sm:p-10 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Live Prototype Simulator
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Interact directly with the simulation of {activeProject.name}&apos;s core functionality.
                </p>
              </div>

              {/* SIMULATOR 1: ShopLens */}
              {activeProjectId === "shoplens" && (
                <div className="p-6 rounded-2xl bg-[#080B12] border border-cyan-500/25 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                        Live Cross-Retailer Price Delta Simulator
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Sample Dataset: Consumer Hardware
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shopLensQuery}
                      onChange={(e) => setShopLensQuery(e.target.value)}
                      placeholder="e.g. Sony WH-1000XM5, MacBook Pro M3..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      onClick={() => {
                        setIsComparing(true);
                        setTimeout(() => setIsComparing(false), 600);
                      }}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400 transition-all flex items-center gap-2"
                    >
                      {isComparing ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Parsing...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5" />
                          <span>Compare Stores</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Simulated Comparison Table */}
                  <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02]">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-white/[0.04] text-[11px] font-mono uppercase text-slate-400">
                        <tr>
                          <th className="p-3">Retailer</th>
                          <th className="p-3">Detected Price</th>
                          <th className="p-3">Stock Status</th>
                          <th className="p-3">Price Delta</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05]">
                        <tr className="hover:bg-white/[0.02]">
                          <td className="p-3 font-semibold text-white">Store Alpha</td>
                          <td className="p-3 text-emerald-400 font-mono font-bold">$349.99</td>
                          <td className="p-3 text-emerald-400">In Stock (2 units)</td>
                          <td className="p-3 font-mono text-emerald-400">Best Price (Save $50)</td>
                        </tr>
                        <tr className="hover:bg-white/[0.02]">
                          <td className="p-3 font-semibold text-white">Retail Prime</td>
                          <td className="p-3 text-slate-200 font-mono">$399.99</td>
                          <td className="p-3 text-cyan-400">Free Next-Day</td>
                          <td className="p-3 font-mono text-slate-400">Standard MSRP</td>
                        </tr>
                        <tr className="hover:bg-white/[0.02]">
                          <td className="p-3 font-semibold text-white">TechHub Online</td>
                          <td className="p-3 text-amber-400 font-mono">$419.00</td>
                          <td className="p-3 text-amber-400">Limited Stock</td>
                          <td className="p-3 font-mono text-rose-400">+$19.01 over MSRP</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Simulated LLM Sentiment Badge */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-2">
                    <span className="font-mono text-cyan-300 font-bold uppercase tracking-wider block">
                      AI Review Synthesis (380 Verified Reviews):
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      &ldquo;Exceptional active noise cancellation and comfort for long flights. Note: slightly warmer earcups in summer climates. Recommended over XM4 for microphone call clarity.&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* SIMULATOR 2: Flexivo */}
              {activeProjectId === "flexivo" && (
                <div className="p-6 rounded-2xl bg-[#0A0813] border border-violet-500/25 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-violet-400" />
                      <span className="text-xs font-mono text-violet-300 uppercase tracking-wider">
                        Local Voice Trigger &amp; Subprocess Runner
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Click a phrase to simulate speech trigger
                    </span>
                  </div>

                  {/* Voice Trigger Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Launch Dev Workspace",
                      "Start Focus Session",
                      "Check Git Status & Sync",
                    ].map((phrase) => (
                      <button
                        key={phrase}
                        onClick={() => handleSimulateVoice(phrase)}
                        disabled={isVoiceRunning}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-violet-500/15 border border-violet-500/30 text-violet-200 hover:bg-violet-500 hover:text-white transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        <Play className="w-3 h-3 text-violet-400" />
                        <span>&ldquo;{phrase}&rdquo;</span>
                      </button>
                    ))}
                  </div>

                  {/* Simulated Terminal Log */}
                  <div className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-slate-300 h-48 overflow-y-auto space-y-1">
                    {flexivoOutput.map((line, idx) => (
                      <div
                        key={idx}
                        className={
                          line.startsWith("[Action]")
                            ? "text-emerald-400 font-bold"
                            : line.startsWith("[Voice TTS]")
                            ? "text-violet-300"
                            : line.startsWith("[Microphone]")
                            ? "text-cyan-300"
                            : "text-slate-400"
                        }
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SIMULATOR 3: WhatsApp Automation */}
              {activeProjectId === "whatsapp-automation" && (
                <div className="p-6 rounded-2xl bg-[#09110E] border border-emerald-500/25 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider">
                        Autonomous Webhook &amp; Routing Simulator
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>HMAC SHA256 Verified</span>
                    </div>
                  </div>

                  {/* Simulated Chat Window */}
                  <div className="rounded-xl border border-white/10 bg-black/50 p-4 h-64 overflow-y-auto space-y-3">
                    {chatLog.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${
                          msg.sender === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs ${
                            msg.sender === "user"
                              ? "bg-emerald-600 text-white rounded-br-none"
                              : "bg-white/[0.08] text-slate-200 border border-white/[0.08] rounded-bl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 px-1">
                          {msg.time}
                        </span>
                      </div>
                    ))}
                    {isProcessingWebhook && (
                      <div className="text-[11px] font-mono text-emerald-400 animate-pulse">
                        Webhook received • Routing response...
                      </div>
                    )}
                  </div>

                  {/* Quick-Prompt Suggestions */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "What are your business hours?",
                      "Can I see your price packages?",
                      "Connect me with Ahmad Hassan",
                    ].map((text) => (
                      <button
                        key={text}
                        onClick={() => setIncomingMessage(text)}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white"
                      >
                        &ldquo;{text}&rdquo;
                      </button>
                    ))}
                  </div>

                  {/* Input Box */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={incomingMessage}
                      onChange={(e) => setIncomingMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSimulateWebhook()}
                      placeholder="Type a customer query to test the webhook..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                    <button
                      onClick={handleSimulateWebhook}
                      disabled={isProcessingWebhook}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-tab 4: Tech Stack & Challenges */}
          {activeTab === "tech" && (
            <div className="p-6 sm:p-10 space-y-8">
              {/* Tech Stack Breakdown */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Granular Tech Stack Breakdown
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeProject.techStackDetails.map((ts, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2.5"
                    >
                      <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
                        {ts.category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {ts.tools.map((t, ti) => (
                          <span
                            key={ti}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.06] text-white"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pt-1">
                        {ts.purpose}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Challenges Solved */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Engineering Challenges &amp; Overcomes
                </h4>
                <ul className="space-y-2.5">
                  {activeProject.developmentChallenges.map((ch, ci) => (
                    <li key={ci} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Takeaways */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Takeaways &amp; Architectural Insights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.learningTakeaways.map((lt, li) => (
                    <div
                      key={li}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-slate-300"
                    >
                      {lt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
