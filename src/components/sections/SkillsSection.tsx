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
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = PORTFOLIO_DATA.skills;

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
        return <Terminal className="w-5 h-5 text-indigo-400" />;
      case "python":
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case "html":
        return <Globe className="w-5 h-5 text-indigo-400" />;
      case "css":
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case "javascript":
        return <Code2 className="w-5 h-5 text-indigo-400" />;
      case "typescript":
        return <FileCode className="w-5 h-5 text-cyan-400" />;
      case "next.js":
        return <Globe className="w-5 h-5 text-indigo-400" />;
      case "git":
      case "github":
        return <GitBranch className="w-5 h-5 text-indigo-400" />;
      case "visual studio code":
        return <Laptop className="w-5 h-5 text-cyan-400" />;
      case "ai-assisted coding tools":
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
      default:
        return <Code2 className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section
      id="skills"
      aria-label="Technical Skills and Tools"
      className="relative py-24 sm:py-32 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-indigo-300 mb-3">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>TOOLKIT · TECHNOLOGIES IN PRACTICE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Skills &amp; Capabilities
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2.5 max-w-2xl leading-relaxed">
              Every tool in my stack serves a direct purpose in delivering clean user experiences or reliable workflow scripts.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {[
              { id: "all", label: "All Tools" },
              { id: "programming", label: "Core Langs" },
              { id: "web", label: "Web Frameworks" },
              { id: "ai", label: "AI & Tools" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeCategory === tab.id
                    ? "bg-indigo-600 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSkills.map((skill, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-[#0B0E16]/80 border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-200 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:scale-105 transition-transform">
                    {getSkillIcon(skill.name)}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    {skill.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{skill.categoryTitle}</span>
                <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
