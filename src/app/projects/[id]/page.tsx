import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { NeuralNetworkBackground } from "@/components/effects/NeuralNetworkBackground";
import { Cpu, ArrowLeft } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found — Ahmad Hassan",
    };
  }

  return {
    title: `${project.name} — Project Case Study | Ahmad Hassan`,
    description: project.overview,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#07090D] text-[#F5F7FA] overflow-x-hidden selection:bg-[#A3FF12] selection:text-[#07090D]">
      {/* Background Neural Canvas */}
      <NeuralNetworkBackground />

      {/* Minimal Top Header */}
      <header className="sticky top-0 z-40 bg-[#07090D]/85 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3FF12] rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-[#A3FF12]/60">
            <Cpu className="w-4 h-4 text-[#A3FF12]" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
            AHMAD HASSAN
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] inline-block animate-pulse" />
          </span>
        </Link>

        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#9BA7B7] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Projects</span>
        </Link>
      </header>

      {/* Case Study Content */}
      <main className="relative z-10">
        <ProjectCaseStudy project={project} />
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#07090D]/90 py-8 text-center text-xs font-mono text-[#9BA7B7]">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Ahmad Hassan · Computer Science Student · Case Study</p>
        </div>
      </footer>
    </div>
  );
}
