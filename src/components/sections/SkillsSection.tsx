"use client";

import React, { useState } from "react";
import {
  Cpu,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  GitBranch,
  Globe,
  FileCode,
  Laptop,
  CheckCircle2,
  Clock,
  BookOpen,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = PORTFOLIO_DATA.skills;

  // Flatten or filter by active tab
  const activeSkills =
    activeCategory === "all"
      ? categories.flatMap((cat) =>
          cat.skills.map((s) => ({ ...s, categoryTitle: cat.title }))
        )
      : categories
          .find((cat) => cat.title.toLowerCase().includes(activeCategory.toLowerCase()))
          ?.skills.map((s) => ({
            ...s,
            categoryTitle:
              categories.find((cat) =>
                cat.title.toLowerCase().includes(activeCategory.toLowerCase())
              )?.title || "",
          })) || [];

  const getSkillIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "c++":
        return <Terminal className="w-5 h-5 text-[#A3FF12]" />;
      case "python":
        return <Cpu className="w-5 h-5 text-[#00D9FF]" />;
      case "html":
        return <Globe className="w-5 h-5 text-[#A3FF12]" />;
      case "css":
        return <Layers className="w-5 h-5 text-[#00D9FF]" />;
      case "javascript":
        return <Code2 className="w-5 h-5 text-[#A3FF12]" />;
      case "typescript":
        return <FileCode className="w-5 h-5 text-[#00D9FF]" />;
      case "next.js":
        return <Globe className="w-5 h-5 text-[#A3FF12]" />;
      case "git":
        return <GitBranch className="w-5 h-5 text-[#00D9FF]" />;
      case "github":
        return <GitBranch className="w-5 h-5 text-[#A3FF12]" />;
      case "visual studio code":
        return <Laptop className="w-5 h-5 text-[#00D9FF]" />;
      case "ai-assisted coding tools":
        return <Sparkles className="w-5 h-5 text-[#A3FF12]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#A3FF12]" />;
    }
  };

  const getStatusBadge = (status: "Learning" | "Practicing" | "Used in Projects") => {
    switch (status) {
      case "Used in Projects":
        return {
          label: "Used in Projects",
          className: "bg-[#A3FF12]/10 border-[#A3FF12]/30 text-[#A3FF12]",
          dot: "bg-[#A3FF12]",
        };
      case "Practicing":
        return {
          label: "Practicing",
          className: "bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF]",
          dot: "bg-[#00D9FF]",
        };
      case "Learning":
        return {
          label: "Learning",
          className: "bg-purple-500/10 border-purple-500/30 text-purple-300",
          dot: "bg-purple-400",
        };
    }
  };

  return (
    <section
      id="skills"
      aria-label="Tools and Technologies"
      className="relative py-24 sm:py-32 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#00D9FF]/06 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/4 w-[380px] h-[380px] bg-[#A3FF12]/05 rounded-full blur-[130px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#00D9FF] mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>SKILLS &amp; TECHNOLOGIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              TOOLS I&apos;M <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3FF12] to-[#00D9FF]">EXPLORING</span>
            </h2>
            <p className="text-sm sm:text-base text-[#9BA7B7] mt-3 max-w-2xl leading-relaxed">
              Technologies and developer tools I actively use in my university studies, personal projects, and software experiments. No arbitrary percentage scores—just honest hands-on application.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {[
              { id: "all", label: "All Tools" },
              { id: "programming", label: "Programming" },
              { id: "web", label: "Web Development" },
              { id: "tools", label: "Dev Tools" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeCategory === tab.id
                    ? "bg-[#A3FF12] text-[#07090D] font-bold shadow-[0_0_12px_rgba(163,255,18,0.3)]"
                    : "text-[#9BA7B7] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeSkills.map((skill, idx) => {
            const badge = getStatusBadge(skill.status);
            return (
              <GlassCard
                key={idx}
                variant="interactive"
                className="p-5 flex flex-col justify-between group h-full border-white/[0.08] hover:border-white/20 transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Icon + Category + Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#A3FF12]/40 transition-colors">
                      {getSkillIcon(skill.name)}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#9BA7B7] uppercase tracking-wider hidden sm:inline">
                        {skill.categoryTitle}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded border ${badge.className}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        <span>{badge.label}</span>
                      </span>
                    </div>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-base font-bold text-white group-hover:text-[#A3FF12] transition-colors mb-2">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#9BA7B7] leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Card Footer indicator */}
                <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-[#9BA7B7]">
                  <span className="text-white/40">EXPLORATION</span>
                  <span className="text-[#00D9FF] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Active Focus</span>
                    <span>→</span>
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Honest Transparency Note */}
        <div className="mt-10 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#9BA7B7]">
          <div className="flex items-center gap-2 text-[#A3FF12]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Honest Evaluation: Skills represent tools currently practiced or applied in university assignments and hobby projects.</span>
          </div>
          <span className="text-white/40">ZERO INVENTED PERCENTAGES</span>
        </div>
      </div>
    </section>
  );
}
