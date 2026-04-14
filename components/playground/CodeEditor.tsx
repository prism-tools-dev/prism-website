"use client";

import { files, type SourceLine } from "@/data/scenarios";
import { motion } from "framer-motion";

interface CodeEditorProps {
  activeFile: string;
  activeLine: string | null; // scenario key of the clicked line
  onFileChange: (file: string) => void;
  onLineClick: (scenarioKey: string) => void;
}

const fileOrder = ["base.py", "lightning.py", "deepspeed.py"];

export function CodeEditor({
  activeFile,
  activeLine,
  onFileChange,
  onLineClick,
}: CodeEditorProps) {
  const file = files[activeFile];
  if (!file) return null;

  return (
    <div className="flex flex-col h-full rounded-lg border border-border-2 bg-surface overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-border-2 bg-surface-2">
        {fileOrder.map((f) => (
          <button
            key={f}
            onClick={() => onFileChange(f)}
            className={`
              px-4 py-2 font-mono text-[11px] border-r border-border-2
              transition-colors relative
              ${f === activeFile
                ? "text-text bg-surface"
                : "text-text-3 hover:text-text-2 bg-surface-2"
              }
            `}
          >
            {f}
            {f === activeFile && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-prism-purple"
              />
            )}
          </button>
        ))}
      </div>

      {/* Code area */}
      <div className="flex-1 overflow-auto p-0">
        <pre className="font-mono text-[12.5px] leading-[1.7]">
          {file.lines.map((line, i) => (
            <CodeLine
              key={i}
              line={line}
              lineNumber={i + 1}
              isActive={line.clickable === activeLine}
              onClick={line.clickable ? () => onLineClick(line.clickable!) : undefined}
            />
          ))}
        </pre>
      </div>
    </div>
  );
}

function CodeLine({
  line,
  lineNumber,
  isActive,
  onClick,
}: {
  line: SourceLine;
  lineNumber: number;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-stretch
        ${onClick ? "cursor-pointer hover:bg-prism-purple/5" : ""}
        ${isActive ? "bg-prism-purple/10" : ""}
        transition-colors duration-150
      `}
    >
      {/* Line number */}
      <span className="select-none w-10 shrink-0 text-right pr-3 py-px text-[11px] text-text-3/50 font-mono">
        {lineNumber}
      </span>

      {/* Code content */}
      <span className="py-px pr-4 whitespace-pre">
        {line.tokens.map((token, j) => (
          <span key={j} className={token.type || ""}>
            {token.text}
          </span>
        ))}
        {line.tokens.length === 0 && "\u00A0"}
      </span>

      {/* Click hint */}
      {onClick && (
        <span className="ml-auto pr-3 py-px text-[9px] text-text-3/30 font-mono self-center select-none">
          {isActive ? "&#9679;" : "click"}
        </span>
      )}
    </div>
  );
}
