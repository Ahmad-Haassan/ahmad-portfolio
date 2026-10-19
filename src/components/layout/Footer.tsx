"use client";

import React from "react";
import { Mail, ArrowUp, FileText, ExternalLink } from "lucide-react";
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
      className="relative z-10 border-t border-white/[0.08] bg-[#07080B]/90 backdrop-blur-xl mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="flex flex-col gap-2 max-w-sm">
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              AHMAD HASSAN
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Web Developer &amp; AI Automations Maker. Building high-performance web products and autonomous workflow systems.
            </p>
          </div>

          {/* Social Links & Quick Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenConnect}
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-indigo-400/60 hover:text-indigo-300 text-slate-400 transition-all flex items-center justify-center focus-visible:outline-none"
                aria-label="Direct Email"
                title="Send Message"
              >
                <Mail className="w-4 h-4" />
              </button>

              <a
                href="https://github.com/Ahmad-Haassan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 hover:text-white text-slate-400 transition-all flex items-center justify-center focus-visible:outline-none"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/ahmad-haassan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 hover:text-white text-slate-400 transition-all flex items-center justify-center focus-visible:outline-none"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-white/20 transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}

            <button
              onClick={onOpenConnect}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Bottom Sub-Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 Ahmad Hassan. Built with Next.js 16 &amp; React 19.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
