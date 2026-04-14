"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface TerminalLine {
  text: string;
  type?:
    | "command"
    | "output"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "dim"
    | "accent";
}

interface TerminalProps {
  title?: string;
  lines: TerminalLine[];
  className?: string;
  /** ms per character when typing a command (default 40) */
  typeSpeed?: number;
  /** ms delay between output lines (default 60) */
  lineDelay?: number;
  /** Auto-play the animation on mount */
  autoPlay?: boolean;
}

const typeColors: Record<string, string> = {
  command: "text-text",
  output: "text-text-2",
  success: "text-prism-green",
  warning: "text-prism-amber",
  error: "text-prism-red",
  info: "text-prism-purple",
  dim: "text-text-3",
  accent: "text-[#5B6AF0]",
};

export function Terminal({
  title = "Terminal",
  lines,
  className = "",
  typeSpeed = 40,
  lineDelay = 60,
  autoPlay = true,
}: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [typingText, setTypingText] = useState("");
  const [isTypingCommand, setIsTypingCommand] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
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
    setVisibleLines([]);
    setTypingText("");
    setIsTypingCommand(false);
    setIsPlaying(true);
    setIsDone(false);

    let lineIdx = 0;

    function processNextLine() {
      if (cancelRef.current || lineIdx >= lines.length) {
        setIsPlaying(false);
        setIsDone(true);
        return;
      }

      const line = lines[lineIdx];
      lineIdx++;

      if (line.type === "command") {
        // Type the command character by character
        setIsTypingCommand(true);
        let charIdx = 0;
        const cmd = line.text;

        function typeNextChar() {
          if (cancelRef.current) return;
          if (charIdx <= cmd.length) {
            setTypingText(cmd.substring(0, charIdx));
            charIdx++;
            timeoutRef.current = setTimeout(typeNextChar, typeSpeed);
          } else {
            // Command finished typing — add it to visible lines
            setIsTypingCommand(false);
            setTypingText("");
            setVisibleLines((prev) => [...prev, line]);
            // Pause before showing output
            timeoutRef.current = setTimeout(() => {
              scrollToBottom();
              processNextLine();
            }, 300);
          }
        }
        typeNextChar();
      } else {
        // Output line — add with delay
        setVisibleLines((prev) => [...prev, line]);
        timeoutRef.current = setTimeout(() => {
          scrollToBottom();
          processNextLine();
        }, lineDelay);
      }
    }

    processNextLine();
  }, [lines, typeSpeed, lineDelay, scrollToBottom]);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-play on mount
  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(play, 400);
      return () => {
        clearTimeout(t);
        cancelRef.current = true;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [autoPlay, play]);

  const handleReplay = () => {
    cancelRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTimeout(play, 50);
  };

  return (
    <div
      className={`dark rounded-lg border border-border-2 overflow-hidden ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1d2e] border-b border-border-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-prism-red/70" />
            <div className="w-3 h-3 rounded-full bg-prism-amber/70" />
            <div className="w-3 h-3 rounded-full bg-prism-green/70" />
          </div>
          <span className="text-text-3 text-xs font-mono ml-2">{title}</span>
        </div>
        {isDone && (
          <button
            onClick={handleReplay}
            className="font-mono text-[10px] text-text-3 hover:text-text transition-colors px-2 py-0.5 border border-border-2 rounded"
          >
            Replay
          </button>
        )}
      </div>

      {/* Body */}
      <div
        ref={contentRef}
        className="bg-[#0d0f1a] p-4 font-mono text-[13px] leading-6 overflow-x-auto overflow-y-auto max-h-[420px]"
      >
        {/* Already-rendered lines */}
        {visibleLines.map((line, i) => (
          <div key={i} className={typeColors[line.type || "output"]}>
            {line.type === "command" ? (
              <>
                <span className="text-prism-green select-none">$ </span>
                {line.text}
              </>
            ) : line.text === "" ? (
              <span className="block h-6" />
            ) : (
              line.text
            )}
          </div>
        ))}

        {/* Currently typing command */}
        {isTypingCommand && (
          <div className="text-text">
            <span className="text-prism-green select-none">$ </span>
            {typingText}
            <span
              className={`inline-block w-[8px] h-[15px] bg-prism-green/80 ml-[1px] align-middle ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        )}

        {/* Idle cursor when done or not started */}
        {isDone && (
          <div className="text-text mt-0">
            <span className="text-prism-green select-none">$ </span>
            <span
              className={`inline-block w-[8px] h-[15px] bg-prism-green/80 ml-[1px] align-middle ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
