"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Terminal as TerminalIcon,
  Play,
  Zap,
  FileText,
  MessageSquare,
  RotateCcw,
  Sparkles,
  Bot,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { GlassCard } from "./GlassCard";

interface TerminalLog {
  id: string;
  type: "command" | "output" | "success" | "warning" | "agent" | "system";
  content: string;
}

interface TerminalSandboxProps {
  onOpenConnect: () => void;
  onOpenResume: () => void;
}

export function TerminalSandbox({
  onOpenConnect,
  onOpenResume,
}: TerminalSandboxProps) {
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: "init-1",
      type: "system",
      content: "ANTIGRAVITY // AHMAD HASSAN AGENT RUNTIME [v2.4.0-prod]",
    },
    {
      id: "init-2",
      type: "output",
      content: "Type 'help' or click quick-run chips to execute agent routines.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (
    content: string,
    type: TerminalLog["type"] = "output"
  ) => {
    setLogs((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        type,
        content,
      },
    ]);
  };

  const runAgentWorkflow = async () => {
    if (isRunning) return;
    setIsRunning(true);
    addLog("$ ./bin/agent-orchestrator --target='deploy-eval'", "command");

    const steps = [
      { text: "[1/4] Initializing LangGraph state coordinator...", delay: 400, type: "system" as const },
      { text: "[2/4] Supervisor node: Delegating task to ToolWorker(PyTorch, Redis)...", delay: 800, type: "agent" as const },
      { text: "[3/4] ToolWorker: Executing deterministic JSON schema validation...", delay: 1300, type: "agent" as const },
      { text: "[4/4] Self-correction cycle completed with 0 errors. Checkpoint persisted to Redis.", delay: 1900, type: "success" as const },
      { text: "✔ Execution verified: Latency = 380ms | Confidence = 99.2%", delay: 2400, type: "success" as const },
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.delay));
      addLog(step.text, step.type);
    }
    setIsRunning(false);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    addLog(`$ ${trimmed}`, "command");
    const lower = trimmed.toLowerCase();

    if (lower === "help") {
      addLog(
        "Available commands:\n" +
          "  • test-agent      - Run cyclic multi-agent orchestration graph\n" +
          "  • stack-scan      - Inspect verified tech stack & capabilities\n" +
          "  • projects        - List engineering works\n" +
          "  • resume          - View Ahmad's digital CV\n" +
          "  • contact         - Initiate direct connection transmission\n" +
          "  • whoami          - Display guest terminal identity\n" +
          "  • sudo hire ahmad - Evaluate hiring transaction\n" +
          "  • clear           - Clear terminal window",
        "output"
      );
    } else if (lower === "test-agent" || lower === "agent" || lower === "agent --run") {
      runAgentWorkflow();
    } else if (lower === "stack-scan" || lower === "skills") {
      addLog(
        "CORE STACK TELEMETRY:\n" +
          "  AI & Agents:  LangGraph, Python FastAPI, OpenAI/Anthropic APIs, RAG, PyTorch (94% avg)\n" +
          "  Frontend:     Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4 (94% avg)\n" +
          "  Systems:      Docker, Redis, PostgreSQL, Node.js, Linux, Git CI/CD (88% avg)",
        "output"
      );
    } else if (lower === "projects") {
      addLog(
        "FEATURED ARCHITECTURES:\n" +
          "  1. Autonomous Multi-Agent Orchestrator (LangGraph + Redis)\n" +
          "  2. Real-Time Neural Telemetry Interface (PyTorch + WebGL)\n" +
          "  3. Task Automation Daemon Engine (Docker + Node.js)\n" +
          "  4. Hybrid RAG Document Retrieval (Vector DB + Dense Reranking)",
        "output"
      );
    } else if (lower === "resume" || lower === "cat resume") {
      addLog("Opening digital curriculum vitae viewer...", "system");
      onOpenResume();
    } else if (lower === "contact" || lower === "ping") {
      addLog("Opening encrypted transmission channel...", "system");
      onOpenConnect();
    } else if (lower === "whoami") {
      addLog("guest@quantum-telemetry (Authenticated · Read-Only Access)", "output");
    } else if (lower.includes("hire")) {
      addLog(
        "★ [TRANSACTION EVALUATION: APPROVED]\n" +
          "Candidate matches: AI engineering, rigorous CS foundations, full-stack velocity.\n" +
          "Dispatching direct line to Ahmad...",
        "success"
      );
      setTimeout(onOpenConnect, 900);
    } else if (lower === "clear") {
      setLogs([]);
    } else {
      addLog(
        `Command not recognized: "${trimmed}". Type 'help' for instructions.`,
        "warning"
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isRunning) return;
    const cmd = inputValue;
    setInputValue("");
    handleCommand(cmd);
  };

  return (
    <section
      id="terminal-sandbox"
      aria-label="Interactive AI Agent Terminal Sandbox"
      className="relative py-16 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#A3FF12] mb-3">
              <Bot className="w-3.5 h-3.5" />
              <span>LIVE INTERACTION · AGENT CLI ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Interactive <span className="text-[#A3FF12]">Agent Sandbox</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9BA7B7] mt-1.5 max-w-xl">
              Experience the deterministic execution logic and agent telemetry directly in this embedded interactive shell.
            </p>
          </div>

          {/* Quick-run preset action chips */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={runAgentWorkflow}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A3FF12]/15 hover:bg-[#A3FF12]/25 border border-[#A3FF12]/30 text-xs font-mono text-[#A3FF12] transition-colors disabled:opacity-50"
            >
              <Play className="w-3 h-3" />
              <span>▶ test-agent</span>
            </button>
            <button
              onClick={() => handleCommand("stack-scan")}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D9FF]/15 hover:bg-[#00D9FF]/25 border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF] transition-colors disabled:opacity-50"
            >
              <Zap className="w-3 h-3" />
              <span>⚡ stack-scan</span>
            </button>
            <button
              onClick={() => {
                addLog("$ cat resume", "command");
                onOpenResume();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-white transition-colors"
            >
              <FileText className="w-3 h-3" />
              <span>📄 cat resume</span>
            </button>
            <button
              onClick={() => setLogs([])}
              className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-[#9BA7B7] hover:text-white transition-colors"
              title="Clear terminal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Container */}
        <GlassCard
          variant="elevated"
          className="p-0 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#07090D]/90 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
              <span className="ml-2 text-xs font-mono text-[#9BA7B7] truncate">
                ahmad@ai-lab: ~/agent-sandbox (bash)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#A3FF12]">
                <Activity className="w-3 h-3 animate-pulse" />
                {isRunning ? "PROCESSING" : "STANDBY"}
              </span>
            </div>
          </div>

          {/* Terminal Logs Viewport */}
          <div
            className="p-4 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed space-y-2 h-[260px] sm:h-[300px] overflow-y-auto bg-[#07090D]/95 text-[#C2CCD6]"
            onClick={() => inputRef.current?.focus()}
          >
            {logs.map((log) => (
              <div
                key={log.id}
                className={`whitespace-pre-wrap ${
                  log.type === "command"
                    ? "text-[#A3FF12] font-semibold"
                    : log.type === "agent"
                    ? "text-[#00D9FF]"
                    : log.type === "success"
                    ? "text-[#A3FF12]"
                    : log.type === "warning"
                    ? "text-[#FFBD2E]"
                    : log.type === "system"
                    ? "text-purple-300"
                    : "text-[#9BA7B7]"
                }`}
              >
                {log.content}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Command Prompt Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 bg-[#07090D] border-t border-white/[0.08]"
          >
            <span className="text-xs font-mono text-[#A3FF12] font-bold select-none shrink-0">
              ahmad@ai-lab:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isRunning}
              placeholder="Type 'help', 'test-agent', 'stack-scan', 'contact'..."
              className="flex-1 bg-transparent text-xs sm:text-sm font-mono text-white placeholder:text-white/25 focus:outline-none disabled:opacity-50"
            />
            <span className="text-[10px] font-mono text-[#9BA7B7] hidden sm:inline-block">
              Press ↵ Enter
            </span>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
