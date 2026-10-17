"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Clock,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  ShoppingBag,
  Mic,
  MessageSquare,
  Compass,
  Code2,
  ExternalLink,
  Workflow,
  Check,
} from "lucide-react";
import { Project } from "@/lib/projects";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectCaseStudyProps {
  project: Project;
  onOpenConnect?: () => void;
}

export function ProjectCaseStudy({ project, onOpenConnect }: ProjectCaseStudyProps) {
  // Render abstract interactive hero visual matching the project
  const renderHeroVisual = () => {
    switch (project.id) {
      case "shoplens":
        return (
          <div className="w-full h-48 sm:h-64 rounded-2xl bg-[#0D1118]/90 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden mb-8">
            <div className="flex items-center justify-between text-xs font-mono text-[#9BA7B7]">
              <span className="flex items-center gap-2 text-[#A3FF12] font-semibold">
                <ShoppingBag className="w-4 h-4" />
                Price Comparison &amp; Discovery Architecture
              </span>
              <span className="text-white/40">PROTOTYPE // v0.2</span>
            </div>

            <div className="space-y-3 my-auto max-w-lg">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9BA7B7]">Retailer A (Standard Price)</span>
                  <span className="text-white font-bold">$249.00</span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-white/30 to-[#9BA7B7] rounded-full w-[85%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A3FF12] font-semibold">Retailer B (Identified Best Deal)</span>
                  <span className="text-[#A3FF12] font-bold">$219.00 (-12% Delta)</span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00D9FF] to-[#A3FF12] rounded-full w-[70%]" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#9BA7B7] pt-3 border-t border-white/5">
              <span>Spec Parser: Active Validation</span>
              <span className="text-[#A3FF12]">Review Sentiment: Planned Phase</span>
            </div>
          </div>
        );

      case "flexivo":
        return (
          <div className="w-full h-48 sm:h-64 rounded-2xl bg-[#0D1118]/90 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden mb-8">
            <div className="flex items-center justify-between text-xs font-mono text-[#9BA7B7]">
              <span className="flex items-center gap-2 text-[#00D9FF] font-semibold">
                <Mic className="w-4 h-4 text-[#00D9FF]" />
                Voice Recognition &amp; Shortcut Execution Engine
              </span>
              <span className="text-[#00D9FF]">EXPERIMENT // AUDIO TELEMETRY</span>
            </div>

            <div className="flex items-end justify-between gap-1.5 h-20 my-auto px-2">
              {[35, 65, 45, 85, 95, 60, 40, 75, 90, 50, 70, 85, 40, 60, 80, 55, 95, 65, 40, 75].map(
                (val, idx) => (
                  <div
                    key={idx}
                    className="w-full rounded-t bg-gradient-to-t from-[#00D9FF]/20 via-[#00D9FF]/60 to-[#00D9FF] transition-all"
                    style={{ height: `${val}%` }}
                  />
                )
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#9BA7B7] pt-3 border-t border-white/5">
              <span>Speech-to-Text: Offline Capture</span>
              <span className="text-[#00D9FF]">System Subprocess Runner: In Progress</span>
            </div>
          </div>
        );

      case "whatsapp-automation":
      default:
        return (
          <div className="w-full h-48 sm:h-64 rounded-2xl bg-[#0D1118]/90 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden mb-8 font-mono">
            <div className="flex items-center justify-between text-xs text-[#9BA7B7]">
              <span className="flex items-center gap-2 text-amber-300 font-semibold">
                <MessageSquare className="w-4 h-4 text-amber-300" />
                Messaging Webhook Relay &amp; Intent Dispatcher
              </span>
              <span className="text-white/40">CONCEPT // FLOW MATRIX</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.025] border border-white/5 my-auto text-xs space-y-1.5 max-w-md">
              <div className="flex items-center justify-between text-white/90">
                <span>INCOMING: &quot;What are your business hours?&quot;</span>
                <span className="text-[#A3FF12]">200 OK</span>
              </div>
              <div className="flex items-center justify-between text-amber-300">
                <span>MATCHED INTENT: FAQ_STORE_HOURS</span>
                <span>DISPATCHING TEMPLATE</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-[#9BA7B7] pt-3 border-t border-white/5">
              <span>Signature Handshake: Tested</span>
              <span className="text-amber-300">Live Cloud API: Planned Next</span>
            </div>
          </div>
        );
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Top Navigation Back */}
      <div className="mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#9BA7B7] hover:text-[#A3FF12] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects Showcase</span>
        </Link>
      </div>

      {/* Header Info */}
      <header className="mb-8 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">
            {project.concept}
          </span>

          <span
            className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
              project.statusVariant === "green"
                ? "bg-[#A3FF12]/10 border-[#A3FF12]/30 text-[#A3FF12]"
                : project.statusVariant === "cyan"
                ? "bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF]"
                : "bg-amber-400/10 border-amber-400/30 text-amber-300"
            }`}
          >
            {project.status === "In Development" ? (
              <Clock className="w-3.5 h-3.5" />
            ) : project.status === "Experiment" ? (
              <FlaskConical className="w-3.5 h-3.5" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>Status: {project.status}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
          {project.name}
        </h1>

        <p className="text-base sm:text-lg text-[#9BA7B7] leading-relaxed max-w-2xl">
          {project.tagline}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.04] text-[#C2CCD6] border border-white/[0.08]"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Hero Visual Preview */}
      {renderHeroVisual()}

      {/* Case Study Structured Sections */}
      <div className="space-y-12">
        {/* Section 1: Project Overview */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-[#A3FF12] uppercase tracking-wider font-semibold">
              01 // Overview
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Project Overview
          </h2>
          <p className="text-sm sm:text-base text-[#C2CCD6] leading-relaxed">
            {project.overview}
          </p>
        </section>

        {/* Section 2: Problem & Solution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-amber-300 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Problem Being Explored</span>
            </div>
            <p className="text-xs sm:text-sm text-[#9BA7B7] leading-relaxed">
              {project.problemExplored}
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#A3FF12] uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Proposed Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-[#9BA7B7] leading-relaxed">
              {project.proposedSolution}
            </p>
          </GlassCard>
        </section>

        {/* Section 3: Intended Users & Workflow */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#00D9FF] uppercase tracking-wider font-semibold">
              02 // Architecture &amp; Workflow
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Intended Users &amp; Execution Flow
          </h2>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
            <div>
              <span className="text-xs font-mono text-[#00D9FF] block mb-1">
                INTENDED USERS:
              </span>
              <p className="text-xs sm:text-sm text-[#C2CCD6] leading-relaxed">
                {project.intendedUsers}
              </p>
            </div>

            {project.intendedWorkflow && (
              <div className="pt-3 border-t border-white/[0.06]">
                <span className="text-xs font-mono text-[#A3FF12] block mb-1">
                  PLANNED INTERACTION WORKFLOW:
                </span>
                <p className="text-xs sm:text-sm text-[#9BA7B7] leading-relaxed font-mono">
                  {project.intendedWorkflow}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Section 4: Feature Breakdown & Honest Stages */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#A3FF12] uppercase tracking-wider font-semibold">
              03 // Feature Breakdown
            </span>
            <span className="text-[11px] font-mono text-[#9BA7B7]">
              Accurately labeled by current progress
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Explored &amp; Planned Features
          </h2>

          <div className="space-y-3">
            {project.features.map((feature, idx) => (
              <GlassCard key={idx} className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        feature.stage === "In Progress"
                          ? "text-[#A3FF12]"
                          : feature.stage === "Experimental"
                          ? "text-[#00D9FF]"
                          : "text-[#9BA7B7]"
                      }`}
                    />
                    <span>{feature.title}</span>
                  </h3>

                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded shrink-0 self-start sm:self-auto ${
                      feature.stage === "In Progress"
                        ? "bg-[#A3FF12]/15 text-[#A3FF12] border border-[#A3FF12]/30"
                        : feature.stage === "Experimental"
                        ? "bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/30"
                        : "bg-white/[0.05] text-[#9BA7B7] border border-white/10"
                    }`}
                  >
                    {feature.stage}
                  </span>
                </div>
                <p className="text-xs text-[#9BA7B7] leading-relaxed pl-6">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Section 5: Technology Stack Detailed */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#00D9FF] uppercase tracking-wider font-semibold">
              04 // Engineering Tooling
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Technology Stack &amp; Purpose
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.techStackDetails.map((tech, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#00D9FF] block mb-1">
                    {tech.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tech.tools.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-xs font-mono rounded bg-white/[0.04] text-white border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#9BA7B7] leading-relaxed pt-2 border-t border-white/5">
                  {tech.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Challenges & Lessons Learned */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#A3FF12] uppercase tracking-wider font-semibold">
              05 // Engineering Takeaways
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Development Challenges &amp; Lessons
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 block mb-3">
                Key Technical Hurdles:
              </span>
              <ul className="space-y-2 text-xs text-[#9BA7B7] leading-relaxed">
                {project.developmentChallenges.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-300 font-mono">•</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A3FF12] block mb-3">
                Core Lessons Learned:
              </span>
              <ul className="space-y-2 text-xs text-[#9BA7B7] leading-relaxed">
                {project.learningTakeaways.map((lt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#A3FF12] font-mono">•</span>
                    <span>{lt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: Current Status & Future Improvements */}
        <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#00D9FF] block mb-1">
              Current Implementation Status:
            </span>
            <p className="text-xs sm:text-sm text-[#C2CCD6] leading-relaxed">
              {project.currentStatusDetails}
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A3FF12] block mb-2">
              Future Improvements:
            </span>
            <ul className="space-y-1.5 text-xs text-[#9BA7B7]">
              {project.futureImprovements.map((fi, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#A3FF12] font-mono">→</span>
                  <span>{fi}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Case Study Actions Footer */}
        <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#9BA7B7] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Projects</span>
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-white transition-colors flex-1 sm:flex-initial"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}

            <Button
              href="/#contact"
              variant="primary"
              size="sm"
              icon={<Sparkles className="w-3.5 h-3.5 text-[#07090D]" />}
              className="flex-1 sm:flex-initial"
            >
              Discuss Project
            </Button>
          </div>
        </footer>
      </div>
    </article>
  );
}
