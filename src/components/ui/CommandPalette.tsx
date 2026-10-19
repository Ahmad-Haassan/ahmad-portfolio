"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  FileText,
  Mail,
  Copy,
  ExternalLink,
  Home,
  User,
  FolderGit2,
  Cpu,
  Compass,
  Sparkles,
  Terminal,
  Check,
  ArrowRight,
  Laptop,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Actions" | "Social & External";
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenConnect: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  onOpenConnect,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const email = "ahmad.hassan.dev@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1500);
  };

  const navigateTo = (selector: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Home / Overview",
      subtitle: "Back to introduction, focus track, and hero",
      category: "Navigation",
      icon: <Home className="w-4 h-4 text-[#A3FF12]" />,
      action: () => navigateTo("#home"),
      shortcut: "H",
    },
    {
      id: "nav-workspace",
      title: "Inside My Digital Workspace",
      subtitle: "Personal OS dashboard: profile, focus, stack, and philosophy",
      category: "Navigation",
      icon: <Laptop className="w-4 h-4 text-[#00D9FF]" />,
      action: () => navigateTo("#workspace"),
      shortcut: "W",
    },
    {
      id: "nav-projects",
      title: "Projects & Experiments",
      subtitle: "ShopLens, Flexivo, and WhatsApp Business Automation",
      category: "Navigation",
      icon: <FolderGit2 className="w-4 h-4 text-[#A3FF12]" />,
      action: () => navigateTo("#projects"),
      shortcut: "P",
    },
    {
      id: "nav-about",
      title: "The Person Behind The Code",
      subtitle: "Introduction, interest areas, and learning philosophy",
      category: "Navigation",
      icon: <User className="w-4 h-4 text-[#00D9FF]" />,
      action: () => navigateTo("#about"),
      shortcut: "A",
    },
    {
      id: "nav-skills",
      title: "Tools I'm Exploring",
      subtitle: "Programming, web development, and dev tooling matrix",
      category: "Navigation",
      icon: <Cpu className="w-4 h-4 text-[#A3FF12]" />,
      action: () => navigateTo("#skills"),
      shortcut: "S",
    },
    {
      id: "nav-journey",
      title: "My Building Journey",
      subtitle: "5-stage visual progression from CS fundamentals to applications",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-[#00D9FF]" />,
      action: () => navigateTo("#journey"),
      shortcut: "J",
    },
    {
      id: "case-shoplens",
      title: "ShopLens — Detailed Case Study",
      subtitle: "Explore product discovery, price comparisons, and architecture",
      category: "Navigation",
      icon: <ArrowRight className="w-4 h-4 text-[#A3FF12]" />,
      action: () => {
        onClose();
        window.location.href = "/projects/shoplens";
      },
    },
    {
      id: "case-flexivo",
      title: "Flexivo — Detailed Case Study",
      subtitle: "Explore voice command assistant and desktop automation",
      category: "Navigation",
      icon: <ArrowRight className="w-4 h-4 text-[#00D9FF]" />,
      action: () => {
        onClose();
        window.location.href = "/projects/flexivo";
      },
    },
    {
      id: "case-whatsapp",
      title: "WhatsApp Automation — Case Study",
      subtitle: "Explore business messaging flows and webhook prototyping",
      category: "Navigation",
      icon: <ArrowRight className="w-4 h-4 text-[#A3FF12]" />,
      action: () => {
        onClose();
        window.location.href = "/projects/whatsapp-automation";
      },
    },

    // Actions
    {
      id: "act-resume",
      title: "View / Print Curriculum Vitae (Resume)",
      subtitle: "Open digital resume document with printable layout",
      category: "Actions",
      icon: <FileText className="w-4 h-4 text-[#A3FF12]" />,
      action: () => {
        onClose();
        setTimeout(onOpenResume, 150);
      },
      shortcut: "R",
    },
    {
      id: "act-connect",
      title: "Initiate Connection / Contact",
      subtitle: "Send a direct message or transmission to Ahmad",
      category: "Actions",
      icon: <Sparkles className="w-4 h-4 text-[#00D9FF]" />,
      action: () => {
        onClose();
        setTimeout(onOpenConnect, 150);
      },
      shortcut: "C",
    },
    {
      id: "act-copy-email",
      title: copiedEmail ? "Email Address Copied!" : "Copy Email to Clipboard",
      subtitle: email,
      category: "Actions",
      icon: copiedEmail ? (
        <Check className="w-4 h-4 text-[#A3FF12]" />
      ) : (
        <Copy className="w-4 h-4 text-[#9BA7B7]" />
      ),
      action: handleCopyEmail,
      shortcut: "E",
    },
    {
      id: "act-terminal",
      title: "Jump to Agent Terminal Sandbox",
      subtitle: "Test interactive CLI commands and agent simulated workflows",
      category: "Actions",
      icon: <Terminal className="w-4 h-4 text-[#A3FF12]" />,
      action: () => navigateTo("#terminal-sandbox"),
      shortcut: "T",
    },

    // Social & External
    {
      id: "ext-github",
      title: "GitHub Repository Profile",
      subtitle: "Inspect open-source repositories and experimental code",
      category: "Social & External",
      icon: <GithubIcon className="w-4 h-4 text-white" />,
      action: () => {
        window.open("https://github.com/Ahmad-Haassan", "_blank", "noopener,noreferrer");
        onClose();
      },
    },
    {
      id: "ext-linkedin",
      title: "LinkedIn Professional Profile",
      subtitle: "Connect on LinkedIn for career, networking, and collaborations",
      category: "Social & External",
      icon: <LinkedinIcon className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.open("https://www.linkedin.com/in/ahmad-haassan/", "_blank", "noopener,noreferrer");
        onClose();
      },
    },
  ];

  const filtered = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filtered.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-[#0D1118] border border-white/20 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-5 h-5 text-[#9BA7B7] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search sections (e.g. 'projects', 'resume', 'skills')..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-[#9BA7B7] border border-white/10">
              ESC
            </span>
          )}
        </div>

        {/* Command list */}
        <div className="overflow-y-auto p-2 divide-y divide-white/[0.04]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#9BA7B7]">
              No command matches found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group ${
                    isSelected
                      ? "bg-white/[0.08] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      : "hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-white/10 border border-white/20"
                          : "bg-white/[0.03] border border-white/5"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#9BA7B7] uppercase px-1.5 py-0.2 rounded bg-white/[0.03] border border-white/[0.05]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#9BA7B7] truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {item.shortcut && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-[#9BA7B7] border border-white/10">
                        {item.shortcut}
                      </span>
                    )}
                    <ArrowRight
                      className={`w-4 h-4 text-[#A3FF12] transition-transform ${
                        isSelected ? "translate-x-0.5 opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 border-t border-white/10 bg-[#07090D] flex items-center justify-between text-[11px] font-mono text-[#9BA7B7]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white mr-1">↑↓</kbd>
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white mr-1">↵</kbd>
              Select
            </span>
          </div>
          <span className="text-[#A3FF12] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-pulse" />
            Quick Command HUD
          </span>
        </div>
      </div>
    </div>
  );
}
