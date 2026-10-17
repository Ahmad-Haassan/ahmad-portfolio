"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  X,
  Sparkles,
  MessageSquare,
  RefreshCw,
  Send,
  Loader2,
  AlertCircle,
  Minimize2,
  ChevronDown,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { ChatMessage, ChatMessageProps } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { GlassCard } from "@/components/ui/GlassCard";

const SUGGESTED_QUESTIONS = [
  "Tell me about Ahmad.",
  "What projects has he explored?",
  "What technologies does he use?",
  "Tell me about ShopLens.",
  "What is Flexivo?",
  "How can I contact him?",
];

const INITIAL_MESSAGE: ChatMessageProps = {
  id: "welcome-msg",
  role: "assistant",
  content:
    "Hi! I'm your guide to Ahmad's portfolio. Ask me about his projects, technologies, learning journey, or development interests.",
  source: "faq-fallback",
  timestamp: "Just now",
};

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageProps[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Handle escape key to close assistant
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    setError(null);
    setInputValue("");

    const userMessage: ChatMessageProps = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Unable to reach assistant service.");
      }

      const data = await response.json();

      const assistantMessage: ChatMessageProps = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "I couldn't process that query. Please try asking about Ahmad's projects or skills.",
        source: data.source || "faq-fallback",
        relatedLink: data.relatedLink,
        relatedLinkLabel: data.relatedLinkLabel,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetConversation = () => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#07090D]/90 border border-white/10 text-xs font-mono text-[#9BA7B7] shadow-xl backdrop-blur-md animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-[#A3FF12] animate-pulse" />
            <span>Ask Ahmad&apos;s AI Guide</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close AI Guide" : "Open Ahmad's AI Guide"}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl relative group ${
            isOpen
              ? "bg-[#07090D] border border-white/20 text-white"
              : "bg-gradient-to-tr from-[#A3FF12] to-[#00D9FF] text-[#07090D] shadow-[0_0_25px_rgba(163,255,18,0.35)] hover:scale-105"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#9BA7B7] group-hover:text-white" />
          ) : (
            <>
              <Bot className="w-6 h-6 font-bold" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#00D9FF] border-2 border-[#07090D]" />
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Ahmad's AI Guide Chat Interface"
          className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[80vh] h-[580px] z-50 rounded-2xl bg-[#07090D]/95 border border-white/15 shadow-[0_10px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col overflow-hidden animate-fadeIn"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#A3FF12]/20 to-[#00D9FF]/20 border border-[#A3FF12]/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#A3FF12]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    AHMAD&apos;S AI GUIDE
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-[#9BA7B7]">
                  Verified Portfolio Knowledge
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleResetConversation}
                className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#9BA7B7] hover:text-white flex items-center justify-center transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#9BA7B7] hover:text-white flex items-center justify-center transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation History Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} {...msg} />
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#9BA7B7] my-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] w-fit">
                <Loader2 className="w-3.5 h-3.5 text-[#A3FF12] animate-spin" />
                <span>Checking verified portfolio data...</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono my-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="flex-1">{error}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Carousel / Chips */}
          <div className="px-3 py-2 border-t border-white/[0.06] bg-white/[0.01]">
            <div className="text-[10px] font-mono text-[#9BA7B7] mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#A3FF12]" />
              <span>Suggested Prompts:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#A3FF12]/40 text-[11px] font-mono text-[#C2CCD6] hover:text-white shrink-0 transition-all disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Section */}
          <div className="p-3 border-t border-white/10 bg-[#07090D]">
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={() => handleSendMessage()}
              isLoading={isLoading}
            />
            <div className="flex items-center justify-between mt-2 text-[9px] font-mono text-[#9BA7B7]">
              <span>Enter to send · Shift+Enter for newline</span>
              <span className="text-[#A3FF12]">Strictly Honest Responses</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
