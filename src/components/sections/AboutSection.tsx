"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Terminal,
  Cpu,
  Sparkles,
  Binary,
  Code2,
  GraduationCap,
  Layers,
  ArrowRight,
  FileText,
  Compass,
  Lightbulb,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

interface AboutSectionProps {
  onOpenConnect: () => void;
  onOpenResume?: () => void;
}

export function AboutSection({ onOpenConnect, onOpenResume }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState<"intro" | "interests" | "philosophy">("intro");

  const interestAreas = [
    {
      icon: <Cpu className="w-4 h-4 text-[#A3FF12]" />,
      title: "AI & Automation",
      desc: "Exploring how language models and intelligent scripting can automate repetitive computer tasks and enhance human workflows.",
    },
    {
      icon: <Code2 className="w-4 h-4 text-[#00D9FF]" />,
      title: "Web & Software Engineering",
      desc: "Building clean, interactive user interfaces using Next.js, TypeScript, and modern responsive design patterns.",
    },
    {
      icon: <GraduationCap className="w-4 h-4 text-[#A3FF12]" />,
      title: "Computer Science Foundations",
      desc: "Studying algorithmic problem solving, data structures, and software principles to write disciplined, maintainable code.",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-[#00D9FF]" />,
      title: "Practical Product Design",
      desc: "Turning concepts into working software prototypes like ShopLens and Flexivo to explore genuine usability and value.",
    },
  ];

  return (
    <section
      id="about"
      aria-label="About Ahmad Hassan"
      className="relative py-24 sm:py-32 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#A3FF12]/05 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#00D9FF]/05 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#A3FF12] mb-3">
              <User className="w-3.5 h-3.5" />
              <span>ABOUT ME · IDENTITY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              THE PERSON BEHIND <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3FF12] via-[#00D9FF] to-white">THE CODE</span>
            </h2>
            <p className="text-sm sm:text-base text-[#9BA7B7] mt-3 max-w-2xl leading-relaxed">
              Aspiring AI &amp; automation developer crafting intuitive digital experiences while building a strong foundation in computer science.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A3FF12] animate-pulse" />
            <span className="text-xs font-mono text-[#C2CCD6]">
              Student &amp; Active Builder
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Terminal & Bio */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <GlassCard variant="elevated" className="p-6 sm:p-8">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                  <span className="ml-2 text-xs font-mono text-[#9BA7B7]">
                    ahmad@student-node: ~/about-me
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-[#00D9FF]">
                  <Binary className="w-3 h-3" />
                  <span>CS STUDENT</span>
                </div>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setActiveTab("intro")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === "intro"
                      ? "bg-[#A3FF12]/15 text-[#A3FF12] border border-[#A3FF12]/40"
                      : "text-[#9BA7B7] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  01. Introduction
                </button>
                <button
                  onClick={() => setActiveTab("interests")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === "interests"
                      ? "bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/40"
                      : "text-[#9BA7B7] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  02. Areas of Interest
                </button>
                <button
                  onClick={() => setActiveTab("philosophy")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === "philosophy"
                      ? "bg-[#A3FF12]/15 text-[#A3FF12] border border-[#A3FF12]/40"
                      : "text-[#9BA7B7] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  03. Learning Philosophy
                </button>
              </div>

              {/* Dynamic Tab Body */}
              <div className="space-y-4 text-sm sm:text-base text-[#C2CCD6] leading-relaxed">
                {activeTab === "intro" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent border-l-2 border-[#A3FF12] text-[#F5F7FA] font-medium leading-relaxed">
                      &quot;I&apos;m a Computer Science student interested in AI, automation, and software development. I enjoy exploring new technologies, experimenting with ideas, and turning what I learn into practical projects. My goal is to build useful digital products while developing strong engineering and problem-solving skills.&quot;
                    </div>

                    <p className="text-sm text-[#9BA7B7]">
                      Instead of simply reading theory or rushing through tutorials, I believe in rolling up my sleeves and creating tangible tools—from intelligent desktop assistants to e-commerce comparison engines. Every project is an opportunity to debug real-world friction and improve architectural intuition.
                    </p>

                    <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.08] font-mono text-xs text-[#9BA7B7] space-y-1">
                      <div className="text-[#A3FF12]">$ cat ahmad_profile.json</div>
                      <div className="pl-4 text-[#C2CCD6]">&#123;</div>
                      <div className="pl-6"><span className="text-[#00D9FF]">&quot;name&quot;</span>: &quot;Ahmad Hassan&quot;,</div>
                      <div className="pl-6"><span className="text-[#00D9FF]">&quot;status&quot;</span>: &quot;Computer Science Undergraduate&quot;,</div>
                      <div className="pl-6"><span className="text-[#00D9FF]">&quot;focus&quot;</span>: [&quot;AI Integration&quot;, &quot;Automation&quot;, &quot;Full-Stack Web&quot;],</div>
                      <div className="pl-6"><span className="text-[#00D9FF]">&quot;motto&quot;</span>: &quot;Turn learning into practical digital products&quot;</div>
                      <div className="pl-4 text-[#C2CCD6]">&#125;</div>
                    </div>
                  </div>
                )}

                {activeTab === "interests" && (
                  <div className="space-y-4 animate-fadeIn">
                    <p>
                      My core focus revolves around three interconnected pillars:
                    </p>
                    <div className="space-y-3 pt-1">
                      <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-xs font-mono text-[#A3FF12] block mb-1">01. ARTIFICIAL INTELLIGENCE &amp; AGENTS</span>
                        <p className="text-xs text-[#9BA7B7]">
                          Exploring how LLMs, prompt pipelines, and multi-turn conversational agents can handle structured reasoning and bridge user intent to deterministic code.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-xs font-mono text-[#00D9FF] block mb-1">02. WORKFLOW &amp; DESKTOP AUTOMATION</span>
                        <p className="text-xs text-[#9BA7B7]">
                          Building tools that automate repetitive tasks, route business messaging, and provide seamless voice or shortcut interactions on local computers.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-xs font-mono text-white block mb-1">03. MODERN WEB DEVELOPMENT</span>
                        <p className="text-xs text-[#9BA7B7]">
                          Developing fast, reactive user experiences with Next.js Turbopack, TypeScript, Tailwind CSS, and accessible interface design.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "philosophy" && (
                  <div className="space-y-4 animate-fadeIn">
                    <p>
                      My approach to growth as a software engineer is grounded in honesty, discipline, and practical execution:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-[#A3FF12] block font-bold mb-1">1. Hands-on Experimentation</span>
                        <span className="text-[#9BA7B7]">Build real prototypes rather than remaining purely theoretical.</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-[#00D9FF] block font-bold mb-1">2. Transparent Progress</span>
                        <span className="text-[#9BA7B7]">Clearly label what is working, what is in progress, and what is planned.</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-[#00D9FF] block font-bold mb-1">3. Rigorous Fundamentals</span>
                        <span className="text-[#9BA7B7]">Complement modern web frameworks with algorithmic and systems foundations.</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-[#A3FF12] block font-bold mb-1">4. User-Centric Design</span>
                        <span className="text-[#9BA7B7]">Design software that solves real bottlenecks with intuitive, polished UX.</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="pt-8 border-t border-white/[0.08] mt-6 flex flex-wrap items-center gap-3">
                <Button
                  href="#projects"
                  variant="primary"
                  size="md"
                  icon={<BookOpen className="w-4 h-4 text-[#07090D]" />}
                >
                  EXPLORE MY PROJECTS
                </Button>
                <Button
                  onClick={onOpenConnect}
                  variant="secondary"
                  size="md"
                  icon={<Sparkles className="w-4 h-4 text-[#A3FF12]" />}
                >
                  START A CONVERSATION
                </Button>
                {onOpenResume && (
                  <Button
                    onClick={onOpenResume}
                    variant="glass"
                    size="md"
                    icon={<FileText className="w-4 h-4 text-[#00D9FF]" />}
                  >
                    VIEW RESUME / CV
                  </Button>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Key Pillars & Honest Focus Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00D9FF] mb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>AREAS OF ACTIVE EXPLORATION</span>
            </h3>

            {interestAreas.map((item, index) => (
              <GlassCard
                key={index}
                variant="interactive"
                className="p-5 flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#A3FF12]/40 transition-colors">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#A3FF12] transition-colors mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#9BA7B7] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </GlassCard>
            ))}

            {/* Honest Identity Callout */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2.5 mt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#A3FF12]">
                <CheckCircle2 className="w-4 h-4" />
                <span>COMMITTED TO HONEST CRAFT</span>
              </div>
              <p className="text-xs text-[#9BA7B7] leading-relaxed">
                As an aspiring engineer, every project in this portfolio reflects hands-on learning, transparent architecture, and verified implementations. No inflated claims—just real code and continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
