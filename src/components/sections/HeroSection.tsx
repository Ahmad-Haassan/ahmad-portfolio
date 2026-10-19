"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  FileText,
  Mail,
  Code2,
  Bot,
  Zap,
  Globe,
  Terminal,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Play,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface HeroSectionProps {
  onOpenConnect: () => void;
  onOpenResume?: () => void;
  onSelectProject?: (projectId: string) => void;
}

const ROLES = [
  "Full-Stack Web Developer",
  "AI Automations Architect",
  "Jarvis Voice OS Builder",
  "Next.js 16 & React 19 Specialist",
];

export function HeroSection({
  onOpenConnect,
  onOpenResume,
  onSelectProject,
}: HeroSectionProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Dynamic role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      aria-label="Introduction and Hero"
      className="relative min-h-[95vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* ================= LEFT COLUMN: Kinetic Typography & Value Proposition ================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Top Kinetic Live Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-300">
                Available for Projects • Web &amp; AI Systems
              </span>
            </motion.div>

            {/* Dynamic Kinetic Headline */}
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2 text-sm sm:text-base font-mono text-indigo-400 font-semibold uppercase tracking-wider"
              >
                <span>👋 Hello, I&apos;m Ahmad Hassan</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl sm:text-6xl lg:text-[62px] font-black tracking-tight text-white leading-[1.08]"
              >
                Building Next-Gen Web &amp;{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  Autonomous AI
                </span>{" "}
                Workflows.
              </motion.h1>

              {/* Animated Morphing Role Pill */}
              <div className="h-9 flex items-center pt-1">
                <span className="text-xs sm:text-sm font-mono text-slate-400 mr-2">Specializing in:</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.35 }}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs sm:text-sm font-mono font-bold bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 shadow-sm"
                  >
                    {ROLES[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Subtitle / Pitch */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed"
            >
              Computer Science student and full-stack builder engineering clean Next.js 16 applications and custom Python automation pipelines (like Jarvis OS) to eliminate manual friction.
            </motion.p>

            {/* Call To Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Explore 3D Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenConnect}
                className="px-5 py-3.5 rounded-xl text-sm font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Message Me</span>
              </button>

              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="px-4 py-3.5 rounded-xl text-sm font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Resume</span>
                </button>
              )}
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono"
            >
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/Ahmad-Haassan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:text-white hover:border-white/20 transition-all"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ahmad-haassan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Next.js 16 &amp; React 19</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Jarvis Voice Automation</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: Styled Hero Portrait with Floating HUD Badges ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Ambient Background Aura behind photo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-transparent rounded-3xl blur-3xl pointer-events-none" />

            {/* Main Portrait Frame (NOT a circle!) */}
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-[#0C101A]/80 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] group">
              {/* Photo Image */}
              <img
                src="/ahmad-hassan.png"
                alt="Ahmad Hassan — Full-Stack Developer & AI Automations Specialist"
                className="w-full h-full object-cover object-top transition-transform duration-750 ease-out group-hover:scale-105"
              />

              {/* Subtle Gradient Overlays for High-End Studio Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-transparent opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent opacity-60" />

              {/* Bottom Card Title Overlay */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Ahmad Hassan
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Online
                  </span>
                </div>
                <p className="text-xs text-indigo-300 font-mono">
                  Full-Stack Web &amp; AI Systems Developer
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>BS Computer Science</span>
                  <a
                    href="mailto:ahmadd557125@gmail.com"
                    className="text-cyan-300 hover:underline"
                  >
                    ahmadd557125@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Floating Telemetry Badge 1: Top-Left (Web Engineering) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 sm:-left-6 p-3 rounded-2xl bg-[#0E1320]/90 border border-indigo-400/30 backdrop-blur-xl shadow-xl hidden sm:flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Globe className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  Frontend Mastery
                </span>
                <span className="text-xs font-bold text-white">Next.js 16 • React 19</span>
              </div>
            </motion.div>

            {/* Floating Telemetry Badge 2: Bottom-Right (Jarvis Voice OS) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -bottom-4 -right-4 sm:-right-6 p-3 rounded-2xl bg-[#110D1D]/90 border border-violet-400/30 backdrop-blur-xl shadow-xl hidden sm:flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
                <Bot className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  Autonomous Tech
                </span>
                <span className="text-xs font-bold text-white">Jarvis OS &amp; Webhooks</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
