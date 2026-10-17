"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Layers,
  Code2,
  Terminal,
  Activity,
  Cpu,
  FileText,
  Command,
  MapPin,
  CheckCircle2,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface HeroSectionProps {
  onOpenConnect: () => void;
  onOpenResume?: () => void;
  onOpenCommandPalette?: () => void;
}

export function HeroSection({
  onOpenConnect,
  onOpenResume,
  onOpenCommandPalette,
}: HeroSectionProps) {
  // Stagger variants for smooth, cinematic entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      aria-label="Introduction and Hero"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Ambient glowing radial lights */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#00D9FF]/10 via-[#A3FF12]/08 to-transparent rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#00D9FF]/05 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Eyebrow & Status HUD */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex flex-wrap items-center justify-center gap-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              <span className="w-2 h-2 rounded-full bg-[#A3FF12] animate-pulse" />
              <span className="text-xs font-mono font-medium tracking-widest text-[#9BA7B7] uppercase">
                COMPUTER SCIENCE • AI • AUTOMATION
              </span>
            </div>

            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#00D9FF] transition-colors"
              >
                <Command className="w-3.5 h-3.5" />
                <span>Press ⌘K for Command Menu</span>
              </button>
            )}
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F5F7FA] uppercase leading-[1.05] sm:leading-[1.08] mb-6"
          >
            FROM IDEA TO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F7FA] to-[#9BA7B7]">
              APPLICATION
            </span>
            <span className="text-[#A3FF12] inline-block ml-1">.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-[#9BA7B7] max-w-2xl font-normal leading-relaxed mb-8"
          >
            I&apos;m a Computer Science student exploring AI, automation, and software engineering. I turn ideas into practical projects while learning how to build useful digital products.
          </motion.p>

          {/* Status Indicator & Quick Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#9BA7B7] mb-10"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#A3FF12] animate-pulse" />
              <span className="text-white font-medium">Currently learning and building</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5">
              <MapPin className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>Remote / Worldwide</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white transition-colors"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#00D9FF] transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Interactive CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              EXPLORE MY PROJECTS
            </Button>

            {onOpenResume && (
              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenResume}
                className="w-full sm:w-auto"
                icon={<FileText className="w-4 h-4 text-[#A3FF12]" />}
              >
                VIEW RESUME / CV
              </Button>
            )}

            <Button
              variant="glass"
              size="lg"
              onClick={onOpenConnect}
              className="w-full sm:w-auto"
              icon={<Sparkles className="w-4 h-4 text-[#00D9FF]" />}
            >
              LET&apos;S CONNECT
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Glass Panels (Representing AI, Automation, and Web Development) */}
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto"
        >
          {/* Panel 1: AI & Intelligent Systems */}
          <GlassCard
            variant="interactive"
            className="p-5 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#A3FF12]/10 border border-[#A3FF12]/30 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#A3FF12]" />
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-[#9BA7B7] uppercase">
                    Core Area
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#A3FF12]">
                  <Activity className="w-3 h-3 animate-pulse" />
                  Active Study
                </span>
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-[#A3FF12] transition-colors mb-1.5">
                AI &amp; Intelligent Systems
              </h3>
              <p className="text-xs text-[#9BA7B7] leading-relaxed">
                Exploring machine learning concepts, agent architectures, and LLM integrations to solve real problems.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#9BA7B7]">
              <span>Focus</span>
              <span className="text-white">Intelligent Workflows</span>
            </div>
          </GlassCard>

          {/* Panel 2: Automation & Tools */}
          <GlassCard
            variant="interactive"
            className="p-5 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center">
                    <Workflow className="w-4 h-4 text-[#00D9FF]" />
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-[#9BA7B7] uppercase">
                    Practical Systems
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#00D9FF]">
                  Building
                </span>
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-[#00D9FF] transition-colors mb-1.5">
                Automation &amp; Tools
              </h3>
              <p className="text-xs text-[#9BA7B7] leading-relaxed">
                Experimenting with workflow automation, system scripts, and developer tooling to eliminate friction.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#9BA7B7]">
              <span>Application</span>
              <span className="text-white">Desktop &amp; Web Scripts</span>
            </div>
          </GlassCard>

          {/* Panel 3: Web Development */}
          <GlassCard
            variant="interactive"
            className="p-5 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-[#F5F7FA]" />
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-[#9BA7B7] uppercase">
                    Full-Stack Core
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#9BA7B7]">
                  Foundation
                </span>
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-white transition-colors mb-1.5">
                Web Development
              </h3>
              <p className="text-xs text-[#9BA7B7] leading-relaxed">
                Building responsive, modern user interfaces with Next.js, React, and TypeScript.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#9BA7B7]">
              <span>Stack</span>
              <span className="text-[#A3FF12]">Next.js &amp; TypeScript</span>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
