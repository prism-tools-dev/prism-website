"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scanResults, statusMeta, type ScanMode, type ScanEntry } from "@/data/scenarios";

interface ScanViewProps {
  onJump?: (file: string, scenarioKey: string) => void;
}

const modes: { id: ScanMode; icon: string }[] = [
  { id: "dead", icon: "\u2620" },
  { id: "unique", icon: "\u2713" },
  { id: "conflicts", icon: "\u26A0" },
  { id: "collisions", icon: "\u2194" },
];

export function ScanView({ onJump }: ScanViewProps) {
  const [activeMode, setActiveMode] = useState<ScanMode>("dead");
  const data = scanResults[activeMode];

  return (
    <div className="flex flex-col gap-3">
      {/* Scan header */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-3">
          Workspace Scan
        </span>
        <span className="font-mono text-[10px] text-text-3/50">
          3 files analyzed
        </span>
      </div>

      {/* Mode buttons */}
      <div className="flex gap-1.5">
        {modes.map((m) => {
          const scan = scanResults[m.id];
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id)}
              className={`
                flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-mono text-[11px]
                border transition-all duration-200
                ${isActive
                  ? "bg-prism-purple/10 text-prism-purple border-prism-purple/30"
                  : "text-text-3 hover:text-text-2 border-border-2 hover:border-text-3/30"
                }
              `}
            >
              <span className="text-[10px]">{m.icon}</span>
              <span className="hidden sm:inline">{scan.label}</span>
              <span className={`
                text-[9px] px-1.5 py-0.5 rounded-full
                ${isActive ? "bg-prism-purple/20 text-prism-purple" : "bg-surface-2 text-text-3"}
              `}>
                {scan.entries.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Description */}
      <p className="font-mono text-[11px] text-text-3 leading-relaxed">
        {data.description}
      </p>

      {/* Entries */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="flex flex-col gap-2"
        >
          {data.entries.map((entry, i) => (
            <ScanEntryCard key={`${entry.method}-${entry.definedIn}-${i}`} entry={entry} onJump={onJump} />
          ))}
        </motion.div>
      </AnimatePresence>

      {data.entries.length === 0 && (
        <div className="text-center text-text-3 font-mono text-[11px] py-6">
          No results for this scan mode.
        </div>
      )}
    </div>
  );
}

function ScanEntryCard({ entry, onJump }: { entry: ScanEntry; onJump?: (file: string, scenarioKey: string) => void }) {
  const meta = statusMeta[entry.status];
  const canJump = !!entry.scenarioKey && !!onJump;

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        rounded-lg border bg-surface p-3 transition-all duration-200
        ${canJump ? "cursor-pointer hover:border-prism-purple/40 hover:bg-prism-purple/5" : ""}
        border-border-2
      `}
      onClick={() => {
        if (canJump) onJump!(entry.file, entry.scenarioKey!);
      }}
    >
      <div className="flex items-start gap-3">
        {/* Status dot */}
        <span
          className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: meta.color }}
        />

        <div className="flex-1 min-w-0">
          {/* Method and class */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-[12px] font-semibold text-text">
              {entry.method}
            </span>
            <span className="font-mono text-[10px] text-text-3">
              in {entry.definedIn}
            </span>
          </div>

          {/* File location */}
          <div className="font-mono text-[10px] text-text-3/70 mt-0.5">
            {entry.file}:{entry.line}
          </div>

          {/* Detail */}
          <p className="font-mono text-[11px] text-text-2 mt-1.5 leading-relaxed">
            {entry.detail}
          </p>
        </div>

        {/* Status badge */}
        <span className={`
          shrink-0 px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold
          ${meta.bgClass} ${meta.textClass} ${meta.borderClass} border
        `}>
          {meta.label}
        </span>
      </div>

      {canJump && (
        <div className="mt-2 text-right">
          <span className="font-mono text-[9px] text-prism-purple/60">
            click to jump to code
          </span>
        </div>
      )}
    </motion.div>
  );
}
