"use client";

import React from "react";
import { Cpu, Mail, ArrowUp, FileText, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface FooterProps {
  onOpenConnect: () => void;
  onOpenResume?: () => void;
}

export function Footer({ onOpenConnect, onOpenResume }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-white/[0.08] bg-[#07090D]/90 backdrop-blur-xl mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="flex flex-col gap-2 max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/15 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-[#A3FF12]" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                AHMAD HASSAN
              </span>
            </div>
            <p className="text-xs text-[#9BA7B7] leading-relaxed">
              Computer Science student exploring AI, autonomous workflows, and modern web architectures. Building from idea to application.
            </p>
          </div>

          {/* Social Links & Quick Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenConnect}
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 hover:border-[#A3FF12]/60 hover:text-[#A3FF12] text-[#9BA7B7] transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12]"
                aria-label="Direct Email"
                title="Send Direct Transmission"
              >
                <Mail className="w-4 h-4" />
              </button>

              <a
                href="https://github.com/Ahmad-Haassan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/40 hover:text-white text-[#9BA7B7] transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                aria-label="GitHub Profile"
                title="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 hover:border-[#00D9FF]/60 hover:text-[#00D9FF] text-[#9BA7B7] transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00D9FF]"
                aria-label="LinkedIn Profile"
                title="LinkedIn Network"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 hover:border-[#A3FF12]/60 hover:text-[#A3FF12] text-[#9BA7B7] transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12]"
                  aria-label="View Resume"
                  title="View Resume / CV"
                >
                  <FileText className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/20 text-xs text-[#9BA7B7] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#9BA7B7]">
          <p>
            © 2026 Ahmad Hassan. Engineered with Next.js, Motion &amp; Canvas.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12]" />
              Production Core Active
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#00D9FF]">All Systems Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
