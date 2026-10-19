"use client";

import React from "react";
import {
  Globe,
  Bot,
  Zap,
  Layers,
  ArrowUpRight,
  Code2,
  Workflow,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface SpecializationSectionProps {
  onOpenConnect: () => void;
}

export function SpecializationSection({ onOpenConnect }: SpecializationSectionProps) {
  return (
    <section
      id="expertise"
      aria-label="Core Engineering Disciplines"
      className="relative py-20 sm:py-28 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-3">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>CORE SPECIALIZATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            What I Design &amp; Engineer
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Delivering clean, maintainable web products and autonomous workflows designed to eliminate manual bottlenecks.
          </p>
        </div>

        {/* 2 Flagship Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: Web Development */}
          <div className="p-8 rounded-3xl bg-[#0B0E16]/80 border border-white/[0.1] hover:border-indigo-500/40 transition-all duration-300 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-500" />

            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6" />
            </div>

            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              Discipline 01
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-1 mb-3">
              Full-Stack Web Development
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Building responsive, high-performance web applications using modern React and Next.js architectures. Focused on smooth interactions, clean code, and intuitive user experiences.
            </p>

            <div className="space-y-2.5 mb-8">
              {[
                "Next.js 16 App Router & Server Components for speed",
                "TypeScript for rock-solid type safety and maintainability",
                "Tailwind CSS & Vanilla CSS with modern fluid animations",
                "REST APIs, responsive layouts, and seamless data flow",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Core Stack: Next.js • React 19 • TypeScript
              </span>
              <a
                href="#projects"
                className="text-xs font-semibold text-indigo-300 group-hover:text-white flex items-center gap-1 transition-colors"
              >
                View Work <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Pillar 2: AI & Workflow Automations */}
          <div className="p-8 rounded-3xl bg-[#0B0E16]/80 border border-white/[0.1] hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-6">
              <Bot className="w-6 h-6" />
            </div>

            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Discipline 02
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-1 mb-3">
              AI &amp; Workflow Automations
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Designing intelligent scripts, webhook bridges, and AI-assisted data pipelines that eliminate repetitive manual tasks and orchestrate business operations autonomously.
            </p>

            <div className="space-y-2.5 mb-8">
              {[
                "Python automation scripts for web scraping & OS workflows",
                "Webhook event handling with signature verification (HMAC)",
                "LLM API integration (OpenAI & Gemini) for real-world synthesis",
                "Local voice command runners & desktop macro routines",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Core Stack: Python • Webhooks • LLM APIs
              </span>
              <button
                onClick={onOpenConnect}
                className="text-xs font-semibold text-cyan-300 group-hover:text-white flex items-center gap-1 transition-colors"
              >
                Discuss Automation <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
