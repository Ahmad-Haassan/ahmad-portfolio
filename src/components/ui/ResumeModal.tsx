"use client";

import React, { useEffect } from "react";
import {
  X,
  Download,
  Printer,
  Mail,
  MapPin,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Sparkles,
  Cpu,
} from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";

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

  const handlePrint = () => {
    window.print();
  };

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
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0D1118] border border-white/20 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07090D]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#A3FF12]/10 border border-[#A3FF12]/30 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-[#A3FF12]" />
            </div>
            <div>
              <h2 id="resume-modal-title" className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Ahmad Hassan — Curriculum Vitae
              </h2>
              <span className="text-[11px] font-mono text-[#9BA7B7]">
                AI &amp; Automation Developer · Systems Engineer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-white transition-colors"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3FF12]"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-sm text-[#C2CCD6]">
          {/* Header Info */}
          <div className="border-b border-white/10 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#A3FF12]/40 shadow-[0_0_15px_rgba(163,255,18,0.2)] shrink-0 bg-white/[0.04]">
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
                  <p className="text-sm font-mono text-[#A3FF12] mt-1 font-semibold">
                    Computer Science Student · Aspiring AI &amp; Automation Developer
                  </p>
                  <p className="text-xs text-[#9BA7B7] mt-2 max-w-xl leading-relaxed">
                    Passionate student engineer exploring AI integration, desktop automation prototypes, and modern responsive web applications with strong foundations in computer science.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-[#9BA7B7] shrink-0 sm:text-right">
                <div className="flex sm:justify-end items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00D9FF]" />
                  <span>Pakistan (Remote / Worldwide)</span>
                </div>
                <div className="flex sm:justify-end items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#A3FF12]" />
                  <a
                    href="mailto:ahmad.hassan.dev@gmail.com"
                    className="hover:text-white transition-colors underline decoration-white/20"
                  >
                    ahmad.hassan.dev@gmail.com
                  </a>
                </div>
                <div className="flex sm:justify-end items-center gap-2 pt-1 text-[11px] text-[#00D9FF]">
                  <span>Status: Open for Student Collaborations &amp; Internships</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Technical Strengths */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00D9FF] flex items-center gap-2 mb-3">
              <Code2 className="w-4 h-4" />
              <span>Explored Skills &amp; Technologies</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-xs font-bold text-white block mb-1">
                  Programming Languages
                </span>
                <p className="text-xs text-[#9BA7B7] leading-relaxed">
                  C++ (Data Structures, OOP, Memory &amp; Complexity Analysis), Python (Automation Scripting, Data Extraction, Prototyping).
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-xs font-bold text-white block mb-1">
                  Web Development
                </span>
                <p className="text-xs text-[#9BA7B7] leading-relaxed">
                  Next.js (App Router, Turbopack), React 19, TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5 semantic structure, CSS layout architecture.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-xs font-bold text-white block mb-1">
                  Development Tools
                </span>
                <p className="text-xs text-[#9BA7B7] leading-relaxed">
                  Git, GitHub (Version Control, Branching, Pull Requests), Visual Studio Code, AI-assisted programming tools for testing &amp; refactoring.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Engineering Projects */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#A3FF12] flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4" />
              <span>Selected Key Projects &amp; Implementations</span>
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <h4 className="text-base font-bold text-white">
                    ShopLens — Product Discovery &amp; Price Comparison
                  </h4>
                  <span className="text-xs font-mono text-[#A3FF12]">
                    Next.js · TypeScript · Python · Web Scraping
                  </span>
                </div>
                <p className="text-xs text-[#9BA7B7] leading-relaxed mb-2">
                  An exploration of product comparison and shopping research helping users compare cross-store prices, evaluate structured product specs, and read summarized reviews before buying.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-[#00D9FF]">
                  <span>• Cross-Store Price Delta Comparison</span>
                  <span>• Specification Schema Parsing</span>
                  <span>• Review Summarization</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <h4 className="text-base font-bold text-white">
                    Flexivo — AI Desktop Assistant Concept
                  </h4>
                  <span className="text-xs font-mono text-[#00D9FF]">
                    Python · Speech Recognition · OS Automation · APIs
                  </span>
                </div>
                <p className="text-xs text-[#9BA7B7] leading-relaxed mb-2">
                  An experimental desktop assistant focused on voice interaction, system shortcuts, and automating everyday computer workflows to eliminate repetitive friction.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-[#A3FF12]">
                  <span>• Voice Command Recognition</span>
                  <span>• Application Hotkeys &amp; Launching</span>
                  <span>• Text-to-Speech Feedback</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <h4 className="text-base font-bold text-white">
                    WhatsApp Business Automation
                  </h4>
                  <span className="text-xs font-mono text-amber-300">
                    Node.js · Webhooks · Cloud API · Workflow Logic
                  </span>
                </div>
                <p className="text-xs text-[#9BA7B7] leading-relaxed mb-2">
                  An automation project exploring how messaging workflows and AI-assisted responses can help businesses handle routine customer communication efficiently.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-[#9BA7B7]">
                  <span>• Webhook Signature Ingestion</span>
                  <span>• Message Template Triggers</span>
                  <span>• FAQ Response Routing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Foundations */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00D9FF] flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Education &amp; Academic Background</span>
            </h3>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className="text-sm font-bold text-white">
                  Bachelor of Science in Computer Science (BSCS)
                </h4>
                <span className="text-xs font-mono text-[#A3FF12]">
                  Expected Graduation: 2026
                </span>
              </div>
              <p className="text-xs text-[#9BA7B7] leading-relaxed">
                Coursework: Data Structures &amp; Algorithms, Object Oriented Programming, Operating Systems, Database Management Systems, Computer Networks, Software Engineering Principles, Artificial Intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-[#07090D]/90 backdrop-blur-md shrink-0">
          <span className="text-xs font-mono text-[#9BA7B7] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#A3FF12]" />
            Verified Digital Resume · Updated 2026
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              icon={<Printer className="w-3.5 h-3.5 text-[#00D9FF]" />}
              className="flex-1 sm:flex-initial"
            >
              Print / Save PDF
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onOpenConnect();
              }}
              icon={<Mail className="w-3.5 h-3.5 text-[#07090D]" />}
              className="flex-1 sm:flex-initial"
            >
              Contact Ahmad
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
