"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  X,
  CheckCircle2,
  Clock,
  FlaskConical,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Project, PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectsSectionProps {
  onOpenConnect: () => void;
}

export function ProjectsSection({ onOpenConnect }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | "In Development" | "Experiment" | "Concept">("all");

  const filteredProjects =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.status === filter);

  return (
    <section
      id="projects"
      aria-label="Projects and Experiments"
      className="relative py-24 sm:py-32 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#00D9FF]/08 via-[#A3FF12]/06 to-transparent rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#00D9FF] mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>PROJECTS SHOWCASE · PROTOTYPES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Projects <span className="text-[#A3FF12]">&amp;</span> Experiments
            </h2>
            <p className="text-sm sm:text-base text-[#9BA7B7] mt-3 max-w-2xl leading-relaxed">
              Things I&apos;m building, exploring, and improving—one iteration at a time.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {[
              { id: "all", label: "All Work" },
              { id: "In Development", label: "In Development" },
              { id: "Experiment", label: "Experiments" },
              { id: "Concept", label: "Concepts" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  filter === tab.id
                    ? "bg-[#00D9FF] text-[#07090D] font-bold shadow-[0_0_12px_rgba(0,217,255,0.3)]"
                    : "text-[#9BA7B7] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: 3 columns on large, 2 on medium, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} id={`project-${project.id}`} className="scroll-mt-28">
              <ProjectCard
                project={project}
                onSelect={setSelectedProject}
              />
            </div>
          ))}
        </div>

        {/* Bottom Iteration Philosophy Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#A3FF12]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#A3FF12]">
                Development Philosophy
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Honest Engineering &amp; Incremental Progress
            </h3>
            <p className="text-xs sm:text-sm text-[#9BA7B7] leading-relaxed">
              Every project listed here is an active learning artifact. Features are implemented step-by-step with clean code principles, version control, and continuous testing.
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={onOpenConnect}
            icon={<Sparkles className="w-4 h-4 text-[#00D9FF]" />}
            className="shrink-0 w-full sm:w-auto"
          >
            DISCUSS A PROJECT
          </Button>
        </div>
      </div>

      {/* Detailed Project Exploration Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="relative w-full max-w-2xl bg-[#0D1118] border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9BA7B7]">
                    {selectedProject.concept}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.2 rounded border ${
                      selectedProject.statusVariant === "green"
                        ? "bg-[#A3FF12]/10 border-[#A3FF12]/30 text-[#A3FF12]"
                        : selectedProject.statusVariant === "cyan"
                        ? "bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF]"
                        : "bg-amber-400/10 border-amber-400/30 text-amber-300"
                    }`}
                  >
                    {selectedProject.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {selectedProject.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#9BA7B7] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* In-depth Description */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#A3FF12]">
                Concept &amp; Objectives
              </h4>
              <p className="text-sm text-[#C2CCD6] leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Feature Roadmap & Stage */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#00D9FF] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Feature Exploration &amp; Current Progress</span>
              </h4>
              <div className="space-y-2">
                {selectedProject.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-[#C2CCD6]"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 ${
                          feat.stage === "In Progress"
                            ? "text-[#A3FF12]"
                            : feat.stage === "Experimental"
                            ? "text-[#00D9FF]"
                            : "text-[#9BA7B7]"
                        }`}
                      />
                      <span>{feat.title}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        feat.stage === "In Progress"
                          ? "bg-[#A3FF12]/15 text-[#A3FF12]"
                          : feat.stage === "Experimental"
                          ? "bg-[#00D9FF]/15 text-[#00D9FF]"
                          : "bg-white/[0.05] text-[#9BA7B7]"
                      }`}
                    >
                      {feat.stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Takeaways */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#A3FF12] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Key Learning &amp; Technical Challenges</span>
              </h4>
              <ul className="space-y-2">
                {selectedProject.learningTakeaways.map((takeaway, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-[#9BA7B7] leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-[#A3FF12] font-mono font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-white/[0.05] text-white border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              {selectedProject.githubUrl ? (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#9BA7B7] hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Explore Repository</span>
                </a>
              ) : (
                <span className="text-xs font-mono text-[#9BA7B7]">
                  Repository: Private Exploration
                </span>
              )}

              <Button
                onClick={() => {
                  setSelectedProject(null);
                  onOpenConnect();
                }}
                variant="primary"
                size="md"
                icon={<Sparkles className="w-4 h-4 text-[#07090D]" />}
              >
                CONNECT ABOUT THIS PROJECT
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
