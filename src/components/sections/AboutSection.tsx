"use client";

import React from "react";
import {
  User,
  Cpu,
  Sparkles,
  Code2,
  GraduationCap,
  Layers,
  ArrowRight,
  FileText,
  Mail,
  MapPin,
} from "lucide-react";
import { About3DCube } from "@/components/effects/About3DCube";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface AboutSectionProps {
  onOpenConnect: () => void;
  onOpenResume?: () => void;
}

export function AboutSection({ onOpenConnect, onOpenResume }: AboutSectionProps) {
  return (
    <section
      id="about"
      aria-label="About Ahmad Hassan"
      className="relative py-24 sm:py-32 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Personal Narrative, Background, Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-indigo-300">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>ABOUT THE DEVELOPER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Ahmad Hassan — The Mind Behind The Code
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              I am an undergraduate Computer Science student who loves bridging the gap between rigorous systems thinking and high-speed modern software. Rather than building generic tutorials, I build practical tools: cross-store shopping intelligence engines, hands-free voice desktop assistants like Jarvis, and automated messaging pipelines.
            </p>

            {/* Quick Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase">
                  <Code2 className="w-4 h-4" />
                  <span>Web Craft</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  Next.js 16, React 19, and TypeScript with a strict focus on speed, responsive beauty, and clean UI architecture.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase">
                  <Cpu className="w-4 h-4" />
                  <span>AI &amp; Automation</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  Python voice runners (Jarvis OS), webhook routers, and prompt pipelines that automate repetitive bottlenecks.
                </p>
              </div>
            </div>

            {/* Contact & Social Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenConnect}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Direct Message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Resume</span>
                </button>
              )}

              <a
                href="https://github.com/Ahmad-Haassan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:text-white text-slate-400 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/ahmad-haassan/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:text-cyan-400 text-slate-400 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: 360° Interactive Profile Cube */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-3xl bg-[#090C14]/60 border border-white/[0.08] backdrop-blur-xl">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              Interactive 360° Knowledge Cube
            </span>
            <About3DCube onOpenConnect={onOpenConnect} />
          </div>
        </div>
      </div>
    </section>
  );
}
