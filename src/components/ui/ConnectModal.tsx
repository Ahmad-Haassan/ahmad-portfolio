"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Check,
  ExternalLink,
  Terminal,
  Sparkles,
  Send,
  Clock,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const [copied, setCopied] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const email = "ahmadd557125@gmail.com";

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSentMessage(true);

    // Also trigger mailto so the email client drafts the message directly to Ahmad
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Ahmad,\n\n${formData.message}\n\n---\nSent by: ${formData.name} (${formData.email || "No email provided"})`
    );

    setTimeout(() => {
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
      setTimeout(() => {
        setSentMessage(false);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="connect-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <GlassCard
        variant="elevated"
        className="w-full max-w-lg p-6 sm:p-8 border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#A3FF12] animate-pulse" />
            <h2 id="connect-modal-title" className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A3FF12]" />
              Initiate Direct Connection
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3FF12]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <p className="text-sm text-[#9BA7B7] leading-relaxed">
            Interested in collaboration, autonomous AI pipelines, full-stack engineering, or open roles? Drop an email directly or send a message below.
          </p>

          {/* Direct Email Quick-Copy Bar */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Mail className="w-4 h-4 text-[#00D9FF] shrink-0" />
              <span className="text-sm font-mono text-white truncate">
                {email}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#A3FF12]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <span>Copy</span>
                )}
              </button>
              <a
                href={`mailto:${email}`}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#00D9FF] transition-colors"
                title="Open in mail app"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Verified Social Profiles */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Ahmad-Haassan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-white" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-[#9BA7B7]" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmad-haassan/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-cyan-300 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          {/* Quick contact dispatch form */}
          {sentMessage ? (
            <div className="p-4 rounded-xl bg-[#A3FF12]/10 border border-[#A3FF12]/30 text-center py-6">
              <Check className="w-8 h-8 text-[#A3FF12] mx-auto mb-2" />
              <p className="text-sm font-medium text-white">Transmission Prepared</p>
              <p className="text-xs text-[#9BA7B7] mt-1">Opening your default mail client with formatted draft.</p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="user-name" className="block text-xs font-medium text-[#9BA7B7] mb-1">
                    Your Name / Organization
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex or Acme AI Labs"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#A3FF12] focus:ring-1 focus:ring-[#A3FF12] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="user-email" className="block text-xs font-medium text-[#9BA7B7] mb-1">
                    Your Email (Optional)
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#A3FF12] focus:ring-1 focus:ring-[#A3FF12] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="user-message" className="block text-xs font-medium text-[#9BA7B7] mb-1">
                  Message / Opportunity Brief
                </label>
                <textarea
                  id="user-message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, idea, or open role..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#A3FF12] focus:ring-1 focus:ring-[#A3FF12] transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="glass"
                  size="sm"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={<Send className="w-3.5 h-3.5" />}
                >
                  Send Transmission
                </Button>
              </div>
            </form>
          )}

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#9BA7B7]">
            <span className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-[#00D9FF]" />
              Response SLA: &lt; 24h
            </span>
            <span className="font-mono text-[#A3FF12]">Direct Inbox Delivery</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
