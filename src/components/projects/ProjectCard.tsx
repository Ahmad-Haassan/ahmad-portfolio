"use client";

import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
  ShoppingBag,
  Mic,
  MessageSquare,
  Sparkles,
  GitBranch,
  Terminal,
  Activity,
  CheckCircle2,
  Clock,
  FlaskConical,
  BookOpen,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Project } from "@/lib/projects";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  // Custom abstract visual preview for each project
  const renderVisualPreview = () => {
    switch (project.id) {
      case "shoplens":
        return (
          <div className="w-full h-36 rounded-xl bg-[#07090D]/90 border border-white/10 p-3.5 flex flex-col justify-between relative overflow-hidden mb-5 group-hover:border-white/20 transition-all">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#9BA7B7]">
              <span className="flex items-center gap-1.5 text-[#A3FF12]">
                <ShoppingBag className="w-3.5 h-3.5" />
                Price Comparison Core
              </span>
              <span className="text-white/40">EXPLORATION // v0.2</span>
            </div>

            {/* Visual price delta mock bars */}
            <div className="space-y-1.5 my-auto">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#9BA7B7]">Store A (Amazon)</span>
                <span className="text-white font-bold">$249.00</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-white/30 to-[#9BA7B7] rounded-full w-[85%]" />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#A3FF12]">Store B (Best Price)</span>
                <span className="text-[#A3FF12] font-bold">$219.00 (-12%)</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00D9FF] to-[#A3FF12] rounded-full w-[70%]" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-[#9BA7B7] pt-1.5 border-t border-white/5">
              <span>Spec Normalization: Testing</span>
              <span className="text-[#A3FF12]">Review Summary: Planned</span>
            </div>
          </div>
        );

      case "flexivo":
        return (
          <div className="w-full h-36 rounded-xl bg-[#07090D]/90 border border-white/10 p-3.5 flex flex-col justify-between relative overflow-hidden mb-5 group-hover:border-white/20 transition-all">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#9BA7B7]">
              <span className="flex items-center gap-1.5 text-[#00D9FF]">
                <Mic className="w-3.5 h-3.5 text-[#00D9FF]" />
                Voice Command Pipeline
              </span>
              <span className="text-[#00D9FF]">EXPERIMENT // AUDIO</span>
            </div>

            {/* Visual acoustic waveform */}
            <div className="flex items-end justify-between gap-1 h-12 my-auto px-1">
              {[35, 65, 45, 85, 95, 60, 40, 75, 90, 50, 70, 85, 40, 60, 30].map(
                (val, idx) => (
                  <div
                    key={idx}
                    className="w-full rounded-t bg-gradient-to-t from-[#00D9FF]/20 to-[#00D9FF] transition-all"
                    style={{ height: `${val}%` }}
                  />
                )
              )}
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-[#9BA7B7] pt-1.5 border-t border-white/5">
              <span>Speech-to-Text: Active</span>
              <span className="text-[#00D9FF]">App Shortcuts: In Progress</span>
            </div>
          </div>
        );

      case "whatsapp-automation":
      default:
        return (
          <div className="w-full h-36 rounded-xl bg-[#07090D]/90 border border-white/10 p-3.5 flex flex-col justify-between relative overflow-hidden mb-5 group-hover:border-white/20 transition-all font-mono">
            <div className="flex items-center justify-between text-[10px] text-[#9BA7B7]">
              <span className="flex items-center gap-1.5 text-amber-300">
                <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                Messaging Webhook Relay
              </span>
              <span className="text-white/40">CONCEPT // FLOW</span>
            </div>

            {/* Visual message routing node simulation */}
            <div className="p-2 rounded bg-white/[0.025] border border-white/5 my-auto text-[10px] space-y-1">
              <div className="flex items-center justify-between text-white/90">
                <span>INCOMING: &quot;Check availability&quot;</span>
                <span className="text-[#A3FF12]">200 OK</span>
              </div>
              <div className="flex items-center justify-between text-amber-300">
                <span>ROUTER: Business FAQ</span>
                <span>DISPATCHING</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-[#9BA7B7] pt-1.5 border-t border-white/5">
              <span>Webhook Signature: Verified</span>
              <span className="text-amber-300">Auto-Reply: Planned</span>
            </div>
          </div>
        );
    }
  };

  return (
    <GlassCard
      id={`project-${project.id}`}
      variant="interactive"
      className="p-6 flex flex-col justify-between group h-full relative"
    >
      <div>
        {/* Visual Abstract Preview Frame */}
        {renderVisualPreview()}

        {/* Status Badge & Concept Category */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#9BA7B7]">
            {project.concept}
          </span>

          <span
            className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border flex items-center gap-1 ${
              project.statusVariant === "green"
                ? "bg-[#A3FF12]/10 border-[#A3FF12]/30 text-[#A3FF12]"
                : project.statusVariant === "cyan"
                ? "bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF]"
                : "bg-amber-400/10 border-amber-400/30 text-amber-300"
            }`}
          >
            {project.status === "In Development" ? (
              <Clock className="w-3 h-3" />
            ) : project.status === "Experiment" ? (
              <FlaskConical className="w-3 h-3" />
            ) : (
              <Sparkles className="w-3 h-3" />
            )}
            <span>{project.status}</span>
          </span>
        </div>

        {/* Title */}
        <Link href={`/projects/${project.id}`} className="group/title block mb-2">
          <h3 className="text-xl font-bold text-white group-hover/title:text-[#00D9FF] transition-colors flex items-center justify-between">
            <span>{project.name}</span>
            <ArrowUpRight className="w-4 h-4 text-[#9BA7B7] group-hover/title:text-[#00D9FF] group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
          </h3>
        </Link>

        {/* Tagline / Description */}
        <p className="text-xs text-[#9BA7B7] leading-relaxed mb-6">
          {project.tagline}
        </p>

        {/* Planned / Experimental Features Highlight */}
        <div className="space-y-1.5 mb-6 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#9BA7B7] block mb-1">
            Exploration Focus:
          </span>
          {project.features.slice(0, 3).map((feat, fIdx) => (
            <div
              key={fIdx}
              className="flex items-center justify-between text-[11px] font-mono"
            >
              <span className="text-[#C2CCD6] truncate mr-2">• {feat.title}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded shrink-0 ${
                  feat.stage === "In Progress"
                    ? "text-[#A3FF12] bg-[#A3FF12]/10"
                    : feat.stage === "Experimental"
                    ? "text-[#00D9FF] bg-[#00D9FF]/10"
                    : "text-[#9BA7B7] bg-white/[0.04]"
                }`}
              >
                {feat.stage}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] text-[#C2CCD6] border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/[0.08]">
          <Link
            href={`/projects/${project.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#A3FF12]/10 to-[#00D9FF]/10 hover:from-[#A3FF12]/20 hover:to-[#00D9FF]/20 border border-[#A3FF12]/30 hover:border-[#A3FF12]/60 text-xs font-mono text-white transition-all shadow-[0_0_15px_rgba(163,255,18,0.1)]"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#A3FF12]" />
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#00D9FF]" />
          </Link>

          <button
            onClick={() => onSelect(project)}
            className="px-3 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-xs font-mono text-[#C2CCD6] hover:text-white transition-all"
            title="Open Specs Modal"
          >
            <span>Specs</span>
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-[#9BA7B7] hover:text-white transition-all"
              title="View Repository on GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
