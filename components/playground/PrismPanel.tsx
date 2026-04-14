"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type AnalysisResult } from "@/data/scenarios";
import { SignalBar } from "./SignalBar";
import { MROChain } from "./MROChain";
import { ScanView } from "./ScanView";
import { PlaygroundGraph } from "./PlaygroundGraph";

type Tab = "resolution" | "scan" | "graph";

interface PrismPanelProps {
  result: AnalysisResult;
  onJumpToMethod?: (file: string, scenarioKey: string) => void;
  onJumpToClass?: (file: string, scenarioKey: string) => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "resolution", label: "Resolution" },
  { id: "scan", label: "Scan" },
  { id: "graph", label: "Graph" },
];

export function PrismPanel({ result, onJumpToMethod, onJumpToClass }: PrismPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("resolution");

  return (
    <div className="flex flex-col h-full rounded-lg border border-border-2 bg-surface overflow-hidden">
      {/* Panel header with tabs */}
      <div className="flex items-center gap-0 border-b border-border-2 bg-surface-2">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-text px-3 py-2 border-r border-border-2">
          PRISM
        </span>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative px-3 py-2 font-mono text-[11px] transition-colors border-r border-border-2
              ${activeTab === tab.id
                ? "text-text bg-surface"
                : "text-text-3 hover:text-text-2"
              }
            `}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="panelTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-prism-purple"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto p-3 flex flex-col gap-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-3 flex-1"
          >
            {activeTab === "resolution" && (
              <>
                <SignalBar result={result} />
                <MROChain
                  result={result}
                  onClassClick={onJumpToClass}
                  onMethodClick={onJumpToMethod}
                />
              </>
            )}
            {activeTab === "scan" && (
              <ScanView onJump={onJumpToMethod} />
            )}
            {activeTab === "graph" && (
              <PlaygroundGraph
                result={result}
                onClassClick={onJumpToClass}
                onMethodClick={onJumpToMethod}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
