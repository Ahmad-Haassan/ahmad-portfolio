"use client";

import React, { useEffect } from "react";
import {
  X,
  Download,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  FileText,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConnect: () => void;
}

export function ResumeModal({ isOpen, onClose, onOpenConnect }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0D1017] border border-white/20 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07080B]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
              <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h2 id="resume-modal-title" className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Ahmad Hassan — Curriculum Vitae
              </h2>
              <span className="text-[11px] font-mono text-slate-400">
                Web Developer &amp; AI Automations Specialist
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/showcase/Ahmad_Hassan_Technical_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Ahmad_Hassan_Technical_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-mono text-white transition-colors"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </a>

            <a
              href="/Ahmad_Hassan_Resume.docx"
              download="Ahmad_Hassan_Resume.docx"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-white transition-colors"
              title="Download DOCX"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Word</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-sm text-slate-300">
          {/* Header Info */}
          <div className="border-b border-white/10 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/15 shadow-lg shrink-0 bg-white/[0.04]">
                  <img
                    src="/ahmad-hassan.png"
                    alt="Ahmad Hassan Portrait"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    Ahmad Hassan
                  </h1>
                  <p className="text-sm font-mono text-indigo-300 mt-1 font-semibold">
                    Web Developer &amp; AI Automations Specialist
                  </p>
                  <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
                    Undergraduate Computer Science student engineering modern Next.js web applications, webhook-driven API backends, and local Python automation systems.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-slate-400 shrink-0 sm:text-right">
                <div className="flex sm:justify-end items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Pakistan (Remote / Worldwide)</span>
                </div>
                <div className="flex sm:justify-end items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <a
                    href="mailto:ahmadd557125@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    ahmadd557125@gmail.com
                  </a>
                </div>
                <div className="flex sm:justify-end items-center gap-1.5 pt-1">
                  <a
                    href="https://github.com/Ahmad-Haassan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <GithubIcon className="w-3 h-3" />
                    <span>github.com/Ahmad-Haassan</span>
                  </a>
                </div>
                <div className="flex sm:justify-end items-center gap-1.5">
                  <a
                    href="https://www.linkedin.com/in/ahmad-haassan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-300 text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <LinkedinIcon className="w-3 h-3" />
                    <span>linkedin.com/in/ahmad-haassan</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-white">Bachelor of Science in Computer Science (BSCS)</span>
                <span className="text-xs font-mono text-slate-400">In Progress</span>
              </div>
              <p className="text-xs text-slate-400">Undergraduate Degree</p>
              <p className="text-xs text-slate-300 pt-1">
                Relevant Focus: Data Structures &amp; Algorithms in C++, OOP, Operating Systems &amp; Concurrency, Software Engineering, AI Fundamentals.
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3">
              <Code2 className="w-4 h-4" />
              <span>Technical Skills</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <strong className="text-white block mb-1">Languages:</strong>
                <span className="text-slate-300">Python, TypeScript, JavaScript (ES6+), C++, HTML5, CSS3</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <strong className="text-white block mb-1">Frameworks &amp; UI:</strong>
                <span className="text-slate-300">Next.js 16 (App Router), React 19, Tailwind CSS, Motion</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <strong className="text-white block mb-1">AI &amp; Automation:</strong>
                <span className="text-slate-300">Playwright, BeautifulSoup, SpeechRecognition, pyttsx3, LLM APIs (Gemini &amp; OpenAI)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <strong className="text-white block mb-1">Backend &amp; Tooling:</strong>
                <span className="text-slate-300">Node.js, Express, REST APIs, Webhooks, HMAC SHA256, Git, GitHub Actions</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3">
              <Briefcase className="w-4 h-4" />
              <span>Featured Engineering Projects</span>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-white">ShopLens — Ecommerce Research &amp; Price Engine</span>
                  <span className="text-xs font-mono text-slate-400">Next.js 16 • Python • LLM</span>
                </div>
                <p className="text-xs text-slate-300">
                  Cross-store product discovery tool with automated Playwright/BS4 scrapers, SKU spec normalization, and AI sentiment distillation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-white">Jarvis (Flexivo) — Local Voice AI Desktop Assistant</span>
                  <span className="text-xs font-mono text-slate-400">Python • SpeechRecognition • OS Macros</span>
                </div>
                <p className="text-xs text-slate-300">
                  Voice recognition desktop tool for launching developer workspaces, running command pipelines, and spoken audio feedback without cloud latency.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-white">WhatsApp Business Automation — Webhook Router</span>
                  <span className="text-xs font-mono text-slate-400">Node.js • Meta Graph API • SHA256</span>
                </div>
                <p className="text-xs text-slate-300">
                  Resilient webhook service for Meta Cloud API with SHA256 verification, state-machine intent matching, and interactive template responses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#07080B]/80 shrink-0">
          <span className="text-xs font-mono text-slate-400">
            Open for freelance projects &amp; engineering opportunities
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenConnect();
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md"
          >
            Contact Ahmad
          </button>
        </div>
      </div>
    </div>
  );
}
