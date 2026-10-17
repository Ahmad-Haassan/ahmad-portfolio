"use client";

import React, { useRef, useEffect } from "react";
import { Send, CornerDownLeft, Loader2 } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  disabled = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height up to 120px
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && !disabled && value.trim().length > 0) {
        onSubmit();
      }
    }
  };

  return (
    <div className="relative flex items-end gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus-within:border-[#A3FF12]/50 transition-colors">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading || disabled}
        placeholder="Ask about Ahmad's projects, skills, or background..."
        className="flex-1 bg-transparent text-xs text-white placeholder-[#9BA7B7] resize-none outline-none max-h-[120px] py-1.5 px-2 leading-relaxed font-sans"
        aria-label="Ask Ahmad's AI Guide a question"
        maxLength={500}
      />

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || disabled || value.trim().length === 0}
          aria-label="Send message"
          className="w-8 h-8 rounded-lg bg-[#A3FF12] text-[#07090D] flex items-center justify-center hover:bg-[#B7FF38] disabled:opacity-30 disabled:hover:bg-[#A3FF12] transition-all font-bold shadow-[0_0_10px_rgba(163,255,18,0.2)] disabled:shadow-none"
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
