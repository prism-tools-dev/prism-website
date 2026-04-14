"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Claude Code CLI mockup — matches the real CLI's visual language:
 * - Orange accent (rgb(215, 119, 87)) for branding
 * - Green for user prompt
 * - Spinner/thinking states
 * - Tool calls shown as indented blocks
 * - Streaming character-by-character for responses
 */

interface Step {
  type:
    | "banner"
    | "prompt"
    | "thinking"
    | "tool-header"
    | "tool-body"
    | "tool-result"
    | "response"
    | "warning"
    | "suggestion"
    | "idle";
  content?: string;
  delay?: number; // ms to show this step
}

const ORANGE = "#D77757";
const GREEN = "#4EBA65";
const DIM = "#6B7280";
const RED = "#FF6B80";
const TEXT = "#E2E8F0";
const SURFACE = "#1a1a2e";

const steps: Step[] = [
  { type: "banner", delay: 600 },
  {
    type: "prompt",
    content:
      "Analyze the inheritance for DeepSpeedEstimator and check for dead code.",
    delay: 0,
  },
  { type: "thinking", content: "Thinking...", delay: 1200 },
  {
    type: "response",
    content:
      "I'll use the PRISM MCP server to analyze this class. Let me call the analyze_mro tool.",
    delay: 800,
  },
  { type: "tool-header", content: "analyze_mro", delay: 400 },
  {
    type: "tool-body",
    content:
      'file: "src/models/deepspeed.py"\nline: 3\nworkspace: "/project"',
    delay: 600,
  },
  { type: "thinking", content: "Running...", delay: 1000 },
  { type: "tool-result", delay: 400 },
  { type: "thinking", content: "Thinking...", delay: 800 },
  {
    type: "warning",
    content:
      "Dead code detected: DLEstimatorBase.setup_dataloader is shadowed by DeepSpeedEstimator.setup_dataloader. The base version on line 3 of base.py will never execute.",
    delay: 600,
  },
  {
    type: "suggestion",
    content:
      "Suggested fix: Remove the dead method or call super().setup_dataloader() to chain the call.",
    delay: 400,
  },
  { type: "idle", delay: 0 },
];

function Spinner({ text }: { text: string }) {
  const frames = ["\u280B", "\u2819", "\u2838", "\u2830", "\u2826", "\u2807"];
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 100);
    return () => clearInterval(interval);
  }, [frames.length]);

  return (
    <span style={{ color: ORANGE }}>
      {frames[frame]}{" "}
      <span style={{ color: DIM, fontSize: "12px" }}>{text}</span>
    </span>
  );
}

export function MCPDemo() {
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const scrollToBottom = useCallback(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      if (el.scrollHeight > el.clientHeight) {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      }
    }
  }, []);

  const play = useCallback(() => {
    cancelRef.current = false;
    setVisibleSteps(0);
    setIsTyping(false);
    setTypedText("");
    setIsDone(false);

    let stepIdx = 0;

    function processNext() {
      if (cancelRef.current || stepIdx >= steps.length) {
        setIsDone(true);
        return;
      }

      const step = steps[stepIdx];
      stepIdx++;

      if (step.type === "prompt") {
        // Type the user prompt character by character
        setIsTyping(true);
        const text = step.content || "";
        let charIdx = 0;

        function typeNext() {
          if (cancelRef.current) return;
          if (charIdx <= text.length) {
            setTypedText(text.substring(0, charIdx));
            charIdx++;
            timeoutRef.current = setTimeout(typeNext, 30);
          } else {
            setIsTyping(false);
            setVisibleSteps(stepIdx);
            scrollToBottom();
            timeoutRef.current = setTimeout(processNext, 400);
          }
        }
        typeNext();
      } else {
        setVisibleSteps(stepIdx);
        scrollToBottom();
        timeoutRef.current = setTimeout(() => {
          scrollToBottom();
          processNext();
        }, step.delay || 300);
      }
    }

    timeoutRef.current = setTimeout(processNext, 500);
  }, [scrollToBottom]);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-play on mount
  useEffect(() => {
    const t = setTimeout(play, 300);
    return () => {
      clearTimeout(t);
      cancelRef.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [play]);

  const handleReplay = () => {
    cancelRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTimeout(play, 50);
  };

  const rendered = steps.slice(0, visibleSteps);

  return (
    <div>
      <div className="dark rounded-lg border border-border-2 overflow-hidden">
        {/* Title bar — Claude Code style */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-2" style={{ background: SURFACE }}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-prism-red/70" />
              <div className="w-3 h-3 rounded-full bg-prism-amber/70" />
              <div className="w-3 h-3 rounded-full bg-prism-green/70" />
            </div>
            <span className="text-xs font-mono ml-2" style={{ color: DIM }}>
              Claude Code &mdash; PRISM MCP
            </span>
          </div>
          {isDone && (
            <button
              onClick={handleReplay}
              className="font-mono text-[10px] hover:text-text transition-colors px-2 py-0.5 border border-border-2 rounded"
              style={{ color: DIM }}
            >
              Replay
            </button>
          )}
        </div>

        {/* Body */}
        <div
          ref={contentRef}
          className="p-5 font-mono text-[13px] leading-6 overflow-x-auto overflow-y-auto max-h-[460px] space-y-3"
          style={{ background: "#0d0f1a" }}
        >
          {rendered.map((step, i) => {
            switch (step.type) {
              case "banner":
                return (
                  <div key={i} style={{ color: DIM }}>
                    <div style={{ color: "#2D3148" }}>
                      {"\u256D" + "\u2500".repeat(38) + "\u256E"}
                    </div>
                    <div style={{ color: "#2D3148" }}>
                      {"\u2502"}{" "}
                      <span style={{ color: ORANGE }}>{"\u2733"}</span>{" "}
                      <span style={{ color: TEXT }}>Claude Code</span>
                      <span
                        style={{
                          color: DIM,
                          marginLeft: "64px",
                        }}
                      >
                        v1.0.12
                      </span>{" "}
                      {"\u2502"}
                    </div>
                    <div style={{ color: "#2D3148" }}>
                      {"\u2502"}
                      {"                                      "}
                      {"\u2502"}
                    </div>
                    <div style={{ color: "#2D3148" }}>
                      {"\u2502"}
                      {"  "}
                      <span style={{ color: DIM }}>/help for commands</span>
                      {"                 "}
                      {"\u2502"}
                    </div>
                    <div style={{ color: "#2D3148" }}>
                      {"\u2570" + "\u2500".repeat(38) + "\u256F"}
                    </div>
                  </div>
                );

              case "prompt":
                return (
                  <div key={i}>
                    <span style={{ color: GREEN }}>&gt; </span>
                    <span style={{ color: TEXT }}>{step.content}</span>
                  </div>
                );

              case "thinking": {
                // Only show spinner for the LAST thinking step that's visible
                const isLastThinking =
                  i === rendered.length - 1 ||
                  rendered
                    .slice(i + 1)
                    .some(
                      (s) =>
                        s.type !== "thinking" &&
                        s.type !== "banner" &&
                        s.type !== "idle"
                    );
                if (!isLastThinking && i < rendered.length - 1) return null;
                if (i < rendered.length - 1) return null; // Only show current spinner
                return (
                  <div key={i}>
                    <Spinner text={step.content || "Thinking..."} />
                  </div>
                );
              }

              case "response":
                return (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ color: ORANGE, flexShrink: 0 }}>
                      {"\u25CF"}
                    </span>
                    <span style={{ color: "#9CA3AF", fontSize: "13px" }}>
                      {step.content}
                    </span>
                  </div>
                );

              case "tool-header":
                return (
                  <div
                    key={i}
                    className="ml-4 border-l-2 pl-4 pt-1"
                    style={{ borderColor: `${ORANGE}40` }}
                  >
                    <div
                      className="text-xs font-bold"
                      style={{ color: ORANGE }}
                    >
                      {step.content}
                    </div>
                  </div>
                );

              case "tool-body":
                return (
                  <div
                    key={i}
                    className="ml-4 border-l-2 pl-4 pb-1"
                    style={{ borderColor: `${ORANGE}40` }}
                  >
                    <div className="text-xs" style={{ color: DIM }}>
                      {step.content?.split("\n").map((line, li) => (
                        <div key={li}>{line}</div>
                      ))}
                    </div>
                  </div>
                );

              case "tool-result":
                return (
                  <div key={i} className="ml-4">
                    <div
                      className="border rounded p-3 text-xs"
                      style={{
                        borderColor: "#2D3148",
                        background: SURFACE,
                      }}
                    >
                      <div className="mb-2" style={{ color: DIM }}>
                        MRO Chain:
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span style={{ color: ORANGE }}>#0</span>
                          <span
                            style={{ color: TEXT, fontWeight: "bold" }}
                          >
                            DeepSpeedEstimator
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pl-4">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "#F59E0B" }}
                          />
                          <span style={{ color: "#F59E0B" }}>
                            setup_dataloader
                          </span>
                          <span style={{ color: DIM }}>&mdash; overrides</span>
                        </div>
                        <div className="pl-2" style={{ color: DIM }}>
                          {"\u2193"}
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ color: ORANGE }}>#1</span>
                          <span style={{ color: TEXT }}>LightningTrainer</span>
                        </div>
                        <div className="flex items-center gap-2 pl-4">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "#F59E0B" }}
                          />
                          <span style={{ color: "#F59E0B" }}>
                            configure_optimizers
                          </span>
                          <span style={{ color: DIM }}>&mdash; overrides</span>
                        </div>
                        <div className="pl-2" style={{ color: DIM }}>
                          {"\u2193"}
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ color: ORANGE }}>#2</span>
                          <span style={{ color: TEXT }}>DLEstimatorBase</span>
                        </div>
                        <div className="flex items-center gap-2 pl-4">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: RED }}
                          />
                          <span style={{ color: RED }}>setup_dataloader</span>
                          <span style={{ color: DIM }}>&mdash; shadowed</span>
                        </div>
                        <div className="flex items-center gap-2 pl-4">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "#10B981" }}
                          />
                          <span style={{ color: "#10B981" }}>train</span>
                          <span style={{ color: DIM }}>&mdash; owns</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );

              case "warning":
                return (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ color: "#F59E0B", flexShrink: 0 }}>
                      {"\u26A0"}
                    </span>
                    <div className="text-xs leading-5">
                      <span style={{ color: TEXT, fontWeight: "bold" }}>
                        Dead code detected:
                      </span>{" "}
                      <span style={{ color: RED }}>
                        DLEstimatorBase.setup_dataloader
                      </span>{" "}
                      <span style={{ color: "#9CA3AF" }}>
                        is shadowed by DeepSpeedEstimator.setup_dataloader. The
                        base version on line 3 of base.py will never execute.
                      </span>
                    </div>
                  </div>
                );

              case "suggestion":
                return (
                  <div key={i} className="flex items-start gap-2 pl-5">
                    <div className="text-xs leading-5">
                      <span style={{ color: TEXT }}>Suggested fix:</span>{" "}
                      <span style={{ color: "#9CA3AF" }}>
                        Remove the dead method or call{" "}
                      </span>
                      <span style={{ color: ORANGE }}>
                        super().setup_dataloader()
                      </span>
                      <span style={{ color: "#9CA3AF" }}>
                        {" "}
                        to chain the call.
                      </span>
                    </div>
                  </div>
                );

              case "idle":
                return null;

              default:
                return null;
            }
          })}

          {/* Active typing prompt */}
          {isTyping && (
            <div>
              <span style={{ color: GREEN }}>&gt; </span>
              <span style={{ color: TEXT }}>{typedText}</span>
              <span
                className="inline-block w-[8px] h-[15px] ml-[1px] align-middle"
                style={{
                  background: `${GREEN}CC`,
                  opacity: showCursor ? 1 : 0,
                }}
              />
            </div>
          )}

          {/* Final cursor when done */}
          {isDone && (
            <div>
              <span style={{ color: GREEN }}>&gt; </span>
              <span
                className="inline-block w-[8px] h-[15px] ml-[1px] align-middle"
                style={{
                  background: `${GREEN}CC`,
                  opacity: showCursor ? 1 : 0,
                }}
              />
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-text-3 font-sans text-xs">
        Coming in v0.5 &mdash; PRISM as an MCP server. Deterministic
        inheritance analysis without consuming LLM tokens.
      </p>
    </div>
  );
}
