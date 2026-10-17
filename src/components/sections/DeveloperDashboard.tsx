"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import {
  User,
  Target,
  Layers,
  Sparkles,
  ArrowUpRight,
  GitBranch,
  Code2,
  Terminal,
  Compass,
  CheckCircle2,
  Cpu,
  Laptop,
  Flame,
  Lightbulb,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PROJECTS } from "@/lib/projects";

interface DeveloperDashboardProps {
  onOpenConnect?: () => void;
}

export function DeveloperDashboard({ onOpenConnect }: DeveloperDashboardProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const techStack = [
    { name: "C++", note: "CS Fundamentals & DSA", tag: "Core" },
    { name: "Python", note: "Scripting & AI Tooling", tag: "Automation" },
    { name: "HTML & CSS", note: "Semantic Layouts", tag: "Web" },
    { name: "JavaScript / TypeScript", note: "Modern App Logic", tag: "Web" },
    { name: "Next.js", note: "App Router & SSR", tag: "Frontend" },
    { name: "Git & GitHub", note: "Version Control", tag: "DevOps" },
  ];

  const currentFocusAreas = [
    {
      title: "Frontend Development",
      description: "Crafting modern, accessible web apps with Next.js, React 19, and Tailwind CSS.",
      accent: "cyan" as const,
    },
    {
      title: "Programming Fundamentals",
      description: "Strengthening data structures, algorithms, and computational problem solving in C++ and Python.",
      accent: "green" as const,
    },
    {
      title: "AI-Assisted Development",
      description: "Studying how language models, APIs, and prompt techniques integrate into useful software.",
      accent: "cyan" as const,
    },
    {
      title: "Automation Workflows",
      description: "Exploring scripting, webhook triggers, and batch routines to automate repetitive everyday tasks.",
      accent: "green" as const,
    },
  ];

  const journeySteps = [
    { step: "01", title: "Learn the fundamentals", desc: "Computer science theory, memory, algorithms, and core languages." },
    { step: "02", title: "Build small experiments", desc: "Prototyping isolated scripts, CLI tools, and proof-of-concept features." },
    { step: "03", title: "Develop practical applications", desc: "Connecting frontends with functional backends and external APIs." },
    { step: "04", title: "Test, improve, and deploy", desc: "Gathering feedback, refining code quality, and hosting real iterations." },
  ];

  return (
    <section
      id="workspace"
      aria-label="Inside My Digital Workspace"
      className="relative py-24 sm:py-32 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#A3FF12]/04 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#00D9FF]/05 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#00D9FF] mb-3">
              <Laptop className="w-3.5 h-3.5" />
              <span>PERSONAL OS · DEVELOPER DASHBOARD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Inside My <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F7FA] to-[#9BA7B7]">Digital Workspace</span>
            </h2>
            <p className="text-sm sm:text-base text-[#9BA7B7] mt-3 max-w-2xl leading-relaxed">
              A transparent view of my learning priorities, explored technologies, projects in flight, and build philosophy.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A3FF12]">
            <span className="w-2 h-2 rounded-full bg-[#A3FF12] animate-pulse" />
            <span>Active Student Environment</span>
          </div>
        </div>

        {/* Dashboard Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5"
        >
          {/* Card A: Developer Profile (Span 7) */}
          <motion.div variants={cardVariants} className="lg:col-span-7">
            <GlassCard variant="interactive" className="p-6 sm:p-7 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    {/* Abstract animated avatar badge */}
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A3FF12]/20 via-[#00D9FF]/20 to-transparent border border-white/15 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(#A3FF12_1px,transparent_1px)] [background-size:8px_8px] opacity-40 animate-pulse" />
                      <User className="w-7 h-7 text-white relative z-10" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        Ahmad Hassan
                        <span className="w-2 h-2 rounded-full bg-[#A3FF12]" />
                      </h3>
                      <p className="text-xs font-mono text-[#00D9FF]">
                        Computer Science Student
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#9BA7B7]">
                    Card // 01
                  </span>
                </div>

                <p className="text-sm text-[#C2CCD6] leading-relaxed mb-6">
                  Focused on building practical software while developing a rigorous foundation in algorithms, systems, and modern web architectures. Learning how to translate user problems into intuitive digital products.
                </p>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#9BA7B7] block">
                    Core Interests:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Artificial Intelligence",
                      "Workflow Automation",
                      "Full-Stack Web",
                      "Product Building",
                      "Systems Fundamentals",
                    ].map((interest) => (
                      <span
                        key={interest}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.03] text-white border border-white/10"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#9BA7B7]">
                <span>Status: Undergraduate</span>
                <span className="text-[#A3FF12]">Open to Collaborations</span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Card D: Build Philosophy (Span 5) */}
          <motion.div variants={cardVariants} className="lg:col-span-5">
            <GlassCard variant="interactive" className="p-6 sm:p-7 h-full flex flex-col justify-between relative overflow-hidden group">
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-44 h-44 bg-[#A3FF12]/08 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#A3FF12]/15 transition-all"
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#A3FF12]/10 border border-[#A3FF12]/30 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-[#A3FF12]" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#A3FF12]">
                      Build Philosophy
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#9BA7B7]">
                    Card // 02
                  </span>
                </div>

                <blockquote className="text-lg sm:text-xl font-bold text-white leading-snug tracking-tight mb-4">
                  &ldquo;Learn by building. Improve through iteration. Turn useful ideas into real products.&rdquo;
                </blockquote>

                <p className="text-xs text-[#9BA7B7] leading-relaxed">
                  I believe the best way to understand technology is by getting hands dirty with real code, making mistakes, and continually refining solutions through feedback.
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-[#9BA7B7]">Guiding Principle</span>
                <span className="text-white">Continuous Iteration</span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Card B: Current Focus Areas (Span 6) */}
          <motion.div variants={cardVariants} className="lg:col-span-6">
            <GlassCard variant="interactive" className="p-6 sm:p-7 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center">
                      <Target className="w-4 h-4 text-[#00D9FF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Current Learning Focus</h3>
                      <p className="text-[11px] font-mono text-[#9BA7B7]">Active priorities, not claimed masteries</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#9BA7B7]">
                    Card // 03
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {currentFocusAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            area.accent === "green" ? "bg-[#A3FF12]" : "bg-[#00D9FF]"
                          }`}
                        />
                        <h4 className="text-xs font-semibold text-white">
                          {area.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#9BA7B7] leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-white/[0.08] text-[11px] font-mono text-[#9BA7B7] flex justify-between">
                <span>Learning Velocity: Daily Commits</span>
                <span className="text-[#00D9FF]">Self-Directed</span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Card C: Explored Technology Stack (Span 6) */}
          <motion.div variants={cardVariants} className="lg:col-span-6">
            <GlassCard variant="interactive" className="p-6 sm:p-7 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#A3FF12]/10 border border-[#A3FF12]/30 flex items-center justify-center">
                      <Code2 className="w-4 h-4 text-[#A3FF12]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Explored Technology Stack</h3>
                      <p className="text-[11px] font-mono text-[#9BA7B7]">Tools &amp; languages actively practiced</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#9BA7B7]">
                    Card // 04
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4">
                  {techStack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-[#A3FF12]/30 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white group-hover:text-[#A3FF12] transition-colors">
                          {tech.name}
                        </span>
                        <span className="text-[9px] font-mono text-[#9BA7B7] uppercase px-1 py-0.2 rounded bg-white/[0.03]">
                          {tech.tag}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#9BA7B7] block leading-tight">
                        {tech.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-white/[0.08] text-[11px] font-mono text-[#9BA7B7] flex justify-between">
                <span>Working Knowledge</span>
                <span className="text-[#A3FF12]">Exploratory Depth</span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Card E: Current Projects Preview (Span 6) */}
          <motion.div variants={cardVariants} className="lg:col-span-6">
            <GlassCard variant="interactive" className="p-6 sm:p-7 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center">
                      <Layers className="w-4 h-4 text-[#00D9FF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Active Project Prototypes</h3>
                      <p className="text-[11px] font-mono text-[#9BA7B7]">Currently in flight in my workspace</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#9BA7B7]">
                    Card // 05
                  </span>
                </div>

                <div className="space-y-3 mt-3">
                  {PROJECTS.map((proj) => (
                    <a
                      key={proj.id}
                      href={`#project-${proj.id}`}
                      className="block p-3 rounded-xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/20 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white group-hover:text-[#A3FF12] transition-colors flex items-center gap-1.5">
                          {proj.name}
                          <ArrowUpRight className="w-3 h-3 text-[#9BA7B7] group-hover:text-[#A3FF12] group-hover:translate-x-0.5 transition-all" />
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            proj.statusVariant === "green"
                              ? "bg-[#A3FF12]/10 border-[#A3FF12]/30 text-[#A3FF12]"
                              : proj.statusVariant === "cyan"
                              ? "bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF]"
                              : "bg-amber-400/10 border-amber-400/30 text-amber-300"
                          }`}
                        >
                          {proj.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9BA7B7] leading-relaxed line-clamp-1">
                        {proj.concept}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#9BA7B7]">
                <span>3 Active Prototypes</span>
                <a href="#projects" className="text-[#00D9FF] hover:underline flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </GlassCard>
          </motion.div>

          {/* Card F: Learning Journey Progression (Span 6) */}
          <motion.div variants={cardVariants} className="lg:col-span-6">
            <GlassCard variant="interactive" className="p-6 sm:p-7 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#A3FF12]/10 border border-[#A3FF12]/30 flex items-center justify-center">
                      <Compass className="w-4 h-4 text-[#A3FF12]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Learning Progression</h3>
                      <p className="text-[11px] font-mono text-[#9BA7B7]">How I approach new domains</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#9BA7B7]">
                    Card // 06
                  </span>
                </div>

                <div className="space-y-2.5 mt-3">
                  {journeySteps.map((j, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                    >
                      <span className="text-[10px] font-mono font-bold text-[#A3FF12] px-1.5 py-0.5 rounded bg-[#A3FF12]/10 border border-[#A3FF12]/20 shrink-0">
                        {j.step}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-white block">
                          {j.title}
                        </span>
                        <p className="text-[11px] text-[#9BA7B7] leading-tight mt-0.5">
                          {j.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-white/[0.08] text-[11px] font-mono text-[#9BA7B7] flex justify-between">
                <span>Methodology</span>
                <span className="text-[#A3FF12]">Disciplined Growth</span>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
