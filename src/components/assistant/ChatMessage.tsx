"use client";

import React from "react";
import Link from "next/link";
import { Bot, User, ArrowUpRight, Sparkles, Database } from "lucide-react";

export interface ChatMessageProps {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: "ai" | "faq-fallback";
  relatedLink?: string;
  relatedLinkLabel?: string;
  timestamp: string;
}

export function ChatMessage({
  role,
  content,
  source,
  relatedLink,
  relatedLinkLabel,
  timestamp,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} items-start my-3 text-xs`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border ${
          isUser
            ? "bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF]"
            : "border-[#A3FF12]/40 bg-white/[0.04] shadow-[0_0_8px_rgba(163,255,18,0.2)]"
        }`}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5" />
        ) : (
          <img
            src="/ahmad-hassan.png"
            alt="Ahmad Hassan"
            className="w-full h-full object-cover object-top"
          />
        )}
      </div>

      {/* Bubble Container */}
      <div className={`max-w-[85%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {/* Source or Role Label */}
        <div className="flex items-center gap-2 mb-1 text-[10px] font-mono text-[#9BA7B7]">
          <span>{isUser ? "You" : "Ahmad's AI Guide"}</span>
          <span>•</span>
          <span>{timestamp}</span>
          {!isUser && source && (
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded border text-[9px] ${
                source === "ai"
                  ? "bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF]"
                  : "bg-white/[0.04] border-white/10 text-[#A3FF12]"
              }`}
            >
              {source === "ai" ? (
                <>
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>AI Generated</span>
                </>
              ) : (
                <>
                  <Database className="w-2.5 h-2.5" />
                  <span>Verified FAQ Fallback</span>
                </>
              )}
            </span>
          )}
        </div>

        {/* Bubble */}
        <div
          className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap break-words border text-xs ${
            isUser
              ? "bg-[#00D9FF]/10 border-[#00D9FF]/20 text-white rounded-tr-none"
              : "bg-[#07090D]/90 border-white/10 text-[#C2CCD6] rounded-tl-none shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          }`}
        >
          {content}

          {/* Optional Related Link */}
          {relatedLink && (
            <div className="mt-2.5 pt-2 border-t border-white/[0.08]">
              <Link
                href={relatedLink}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[#A3FF12] hover:text-white hover:underline transition-colors"
              >
                <span>{relatedLinkLabel || "Explore related section"}</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
