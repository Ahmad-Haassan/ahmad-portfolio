"use client";

import React from "react";
import {
  Compass,
  CheckCircle2,
  Sparkles,
  GitCommit,
  Cpu,
  GraduationCap,
  Rocket,
  ArrowRight,
  Code2,
  Terminal,
  Globe,
  Layers,
  FlaskConical,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export function JourneySection() {
  const steps = [
    {
      step: "01",
      title: "Learning programming fundamentals",
      badge: "Foundation",
      icon: <Terminal className="w-4 h-4 text-[#A3FF12]" />,
      description:
        "Building a solid base in computer science: data structures, object-oriented design, algorithmic complexity, and foundational languages like C++ and Python.",
      highlights: [
        "Core data structures & algorithm design",
        "Object-oriented programming principles",
        "Problem-solving practice in C++ and Python",
      ],
      status: "Active Foundation",
    },
    {
      step: "02",
      title: "Exploring web development",
      badge: "Interface Craft",
      icon: <Globe className="w-4 h-4 text-[#00D9FF]" />,
      description:
        "Mastering modern web fundamentals with HTML, CSS, JavaScript, and advancing to React, TypeScript, and the Next.js App Router for responsive digital products.",
      highlights: [
        "Semantic HTML5 & modern CSS styling",
        "Modern TypeScript typing & component architecture",
        "Next.js App Router & responsive mobile layouts",
      ],
      status: "Actively Practicing",
    },
    {
      step: "03",
      title: "Experimenting with AI and automation",
      badge: "Emerging Tech",
      icon: <Cpu className="w-4 h-4 text-[#A3FF12]" />,
      description:
        "Investigating how language models, voice synthesis, and automated scripts can streamline everyday desktop tasks and business communication.",
      highlights: [
        "Language model prompting & context structuring",
        "Desktop automation concepts & voice triggers",
        "Message routing and automated response flows",
      ],
      status: "Active Experimentation",
    },
    {
      step: "04",
      title: "Building practical software projects",
      badge: "Real Prototypes",
      icon: <FlaskConical className="w-4 h-4 text-[#00D9FF]" />,
      description:
        "Translating knowledge into concrete prototypes like ShopLens for price comparisons and Flexivo for desktop shortcuts, validating real-world utility.",
      highlights: [
        "ShopLens: Multi-store shopping & comparison engine",
        "Flexivo: Voice-controlled desktop assistant prototype",
        "WhatsApp Automation: Business messaging exploration",
      ],
      status: "In Progress",
    },
    {
      step: "05",
      title: "Improving, testing, and deploying applications",
      badge: "Refinement & Horizon",
      icon: <Rocket className="w-4 h-4 text-[#A3FF12]" />,
      description:
        "Focusing on code hygiene, edge-case testing, responsive verification, and deploying functional applications to production environments.",
      highlights: [
        "Rigorous type checking and linting pipelines",
        "Cross-device mobile & keyboard accessibility testing",
        "Continuous iteration based on real feedback",
      ],
      status: "Ongoing Goal",
    },
  ];

  return (
    <section
      id="journey"
      aria-label="Learning Journey and Timeline"
      className="relative py-24 sm:py-32 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#A3FF12]/05 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#00D9FF]/05 rounded-full blur-[130px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#A3FF12] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>TIMELINE · PROGRESSION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              MY BUILDING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3FF12] via-[#00D9FF] to-white">JOURNEY</span>
            </h2>
            <p className="text-sm sm:text-base text-[#9BA7B7] mt-3 max-w-2xl leading-relaxed">
              A progressive visual roadmap showing how I advance from programming fundamentals to practical software prototypes and continuous engineering improvement.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#00D9FF]">
            <Rocket className="w-3.5 h-3.5" />
            <span>5-Stage Development Path</span>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/[0.12] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {steps.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Glowing Timeline Node Indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full border-2 bg-[#07090D] border-white/30 group-hover:border-[#A3FF12] flex items-center justify-center transition-all shadow-[0_0_10px_rgba(163,255,18,0.2)]">
                <div className="w-2 h-2 rounded-full bg-[#A3FF12] group-hover:scale-125 transition-transform" />
              </div>

              {/* Milestone Card */}
              <GlassCard
                variant="interactive"
                className="p-6 sm:p-7 border-white/[0.08] hover:border-white/20 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[#A3FF12] font-bold">
                      STAGE {item.step}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#00D9FF]">
                      {item.badge}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#9BA7B7] px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                    <span>{item.status}</span>
                  </span>
                </div>

                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#A3FF12] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#C2CCD6] leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Focus areas / Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-white/[0.06]">
                  {item.highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs font-mono text-[#9BA7B7]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A3FF12] shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
