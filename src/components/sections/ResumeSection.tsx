"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Cpu,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  Award,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface ResumeSectionProps {
  onOpenConnect: () => void;
}

export function ResumeSection({ onOpenConnect }: ResumeSectionProps) {
  const [activeTab, setActiveTab] = useState<"experience" | "skills" | "education">("experience");

  return (
    <section
      id="resume"
      aria-label="Technical Resume and Credentials"
      className="relative py-24 sm:py-32 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-indigo-300 mb-3">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>CURRICULUM VITAE · CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Technical Resume
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2.5 max-w-2xl leading-relaxed">
              Academic foundation in Computer Science paired with hands-on full-stack development and autonomous AI engineering.
            </p>
          </div>

          {/* Download Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/showcase/Ahmad_Hassan_Technical_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Ahmad_Hassan_Technical_Resume.pdf"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/25 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <a
              href="/Ahmad_Hassan_Resume.docx"
              download="Ahmad_Hassan_Resume.docx"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download DOCX</span>
            </a>
          </div>
        </div>

        {/* Resume Card Display */}
        <div className="rounded-3xl border border-white/[0.1] bg-[#0A0D15]/85 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden">
          {/* Top Resume Header Card */}
          <div className="p-6 sm:p-8 border-b border-white/[0.08] bg-white/[0.02] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/15 bg-white/[0.05] shrink-0">
                <img
                  src="/ahmad-hassan.png"
                  alt="Ahmad Hassan Portrait"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Ahmad Hassan</h3>
                <p className="text-xs sm:text-sm text-indigo-300 font-mono font-medium mt-0.5">
                  Web Developer &amp; AI Automations Specialist
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <a href="mailto:ahmadd557125@gmail.com" className="hover:text-white transition-colors">
                      ahmadd557125@gmail.com
                    </a>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Remote / Worldwide</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/Ahmad-Haassan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>github.com/Ahmad-Haassan</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ahmad-haassan/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-cyan-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Subnav Tabs */}
          <div className="px-6 py-3 border-b border-white/[0.08] flex items-center gap-2 bg-white/[0.01]">
            {[
              { id: "experience", label: "Projects & Deliverables", icon: <Briefcase className="w-3.5 h-3.5" /> },
              { id: "skills", label: "Technical Competencies", icon: <Code2 className="w-3.5 h-3.5" /> },
              { id: "education", label: "Education & Academics", icon: <GraduationCap className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === "experience" && (
              <div className="space-y-6">
                {/* Deliverable 1: ShopLens */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-white">
                      ShopLens — Smart Ecommerce Research &amp; Price Engine
                    </h4>
                    <span className="text-xs font-mono text-indigo-400">Next.js 16 • React 19 • Python</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Engineered cross-store product data extraction using Playwright &amp; BeautifulSoup. Built normalization routines to align variable SKU specs into comparable tables, and integrated LLM synthesis to distill 400+ reviews into verified durability pros and cons.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-white/[0.04]">Data Extraction</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04]">Pydantic Schema</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04]">Gemini LLM API</span>
                  </div>
                </div>

                {/* Deliverable 2: Jarvis AI Assistant */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-white">
                      Jarvis (Flexivo) — Local Voice AI Desktop Assistant
                    </h4>
                    <span className="text-xs font-mono text-cyan-400">Python • SpeechRecognition • OS Macros</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Developed a local voice assistant pairing acoustic audio capture with native operating system subprocess automation. Features sub-800ms speech token parsing, offline pyttsx3 audio feedback, and strict command allowlisting to trigger developer environments hands-free.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-white/[0.04]">PyAudio Threading</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04]">PyQt Desktop UI</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04]">Macro Automation</span>
                  </div>
                </div>

                {/* Deliverable 3: WhatsApp Automation */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-white">
                      WhatsApp Business Automation — Autonomous Webhook Pipeline
                    </h4>
                    <span className="text-xs font-mono text-emerald-400">Node.js • Meta Graph API • HMAC SHA256</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Designed webhook-driven event routers processing incoming customer messages. Implemented SHA256 payload signature verification, keyword intent state machines, and automated interactive button dispatches within official Meta 24-hour compliance windows.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-white/[0.04]">Meta Cloud API</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04]">Idempotent Webhooks</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04]">Operator Escalation</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                  <h4 className="text-xs font-mono uppercase text-indigo-400 font-bold tracking-wider">
                    Frontend Engineering
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Next.js 16 (App Router), React 19, TypeScript, JavaScript (ES6+), HTML5, Vanilla CSS, Tailwind CSS, Motion (Framer Motion).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                  <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                    AI &amp; Automation
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Python (Playwright, BeautifulSoup, SpeechRecognition, PyAudio, pyttsx3, pyautogui), LLM APIs (OpenAI &amp; Google Gemini), Webhooks.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                  <h4 className="text-xs font-mono uppercase text-violet-400 font-bold tracking-wider">
                    Backend &amp; APIs
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Node.js, Express, REST APIs, JSON Schema, HMAC-SHA256 signature verification, Meta Graph API.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                  <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                    Computer Science Core
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    C++, Data Structures &amp; Algorithms, Object-Oriented Programming (OOP), Git/GitHub Version Control, Linux Shell.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-base font-bold text-white">
                        Bachelor of Science in Computer Science (BSCS)
                      </h4>
                      <span className="text-xs font-mono text-emerald-400">Currently In Progress</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400">
                      Undergraduate Degree focusing on core algorithms, computer systems, and modern software engineering.
                    </p>
                    <div className="pt-2 text-xs text-slate-300 space-y-1">
                      <div>• Data Structures &amp; Algorithm Analysis in C++</div>
                      <div>• Object-Oriented Software Design and Architecture</div>
                      <div>• Operating Systems, Concurrency, and Process Automation</div>
                      <div>• Software Engineering Principles and Modern Web Development</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
