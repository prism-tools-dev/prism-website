"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Playground } from "@/components/playground/Playground";
import { CLIDemo } from "@/components/demos/CLIDemo";
import { PRDiffDemo } from "@/components/demos/PRDiffDemo";
import { RadialDemo } from "@/components/demos/RadialDemo";
import { MCPSection } from "@/components/demos/MCPSection";
import { ExperimentalDemo } from "@/components/demos/ExperimentalDemo";

function IconMRO() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="3" r="2" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <line x1="8" y1="5" x2="4" y2="10" />
      <line x1="8" y1="5" x2="12" y2="10" />
    </svg>
  );
}

function IconCLI() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="2" width="14" height="12" rx="2" />
      <polyline points="4,7 6.5,9 4,11" />
      <line x1="8" y1="11" x2="12" y2="11" />
    </svg>
  );
}

function IconDiff() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 3L2 8l4 5" />
      <path d="M10 3l4 5-4 5" />
    </svg>
  );
}

function IconRadial() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <circle cx="8" cy="8" r="5" strokeDasharray="2 2" />
      <circle cx="8" cy="8" r="7" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );
}

function IconMCP() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="4" width="6" height="8" rx="1" />
      <rect x="9" y="4" width="6" height="8" rx="1" />
      <line x1="7" y1="7" x2="9" y2="7" />
      <line x1="7" y1="9" x2="9" y2="9" />
    </svg>
  );
}

function IconComingSoon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6" />
      <line x1="8" y1="5" x2="8" y2="8" />
      <line x1="8" y1="8" x2="10.5" y2="10" />
    </svg>
  );
}

const tabIcons: Record<string, React.ReactNode> = {
  "live-mro": <IconMRO />,
  "cli": <IconCLI />,
  "pr-diff": <IconDiff />,
  "radial": <IconRadial />,
  "mcp": <IconMCP />,
  "experimental": <IconComingSoon />,
};

const tabs = [
  { id: "live-mro", label: "Live MRO" },
  { id: "cli", label: "CLI" },
  { id: "pr-diff", label: "PR Diff" },
  { id: "radial", label: "Radial View" },
  { id: "mcp", label: "MCP" },
  { id: "experimental", label: "Coming Soon" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<TabId>("live-mro");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-4xl sm:text-5xl font-bold text-text mb-4"
          >
            Playground
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-text-3 text-lg max-w-2xl mx-auto"
          >
            Explore PRISM&apos;s capabilities — from live MRO analysis to
            upcoming CLI tools, AI integration, and more.
          </motion.p>
        </div>
      </section>

      {/* Tab bar */}
      <section className="sticky top-14 z-30 bg-bg/80 backdrop-blur-md border-b border-border-2">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-prism-purple"
                    : "text-text-3 hover:text-text-2"
                }`}
              >
                <span className="flex-shrink-0">{tabIcons[tab.id]}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-prism-purple/10 border border-prism-purple/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab content */}
      <section className="flex-1 mx-auto w-full max-w-5xl px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "live-mro" && (
              <div>
                <div className="mb-6">
                  <h2 className="font-mono text-xl font-bold text-text mb-2">
                    Live MRO Analysis
                  </h2>
                  <p className="text-text-3 text-sm">
                    Click any highlighted line in the editor to see PRISM
                    analyze the method resolution order in real time.
                  </p>
                </div>
                <Playground />
              </div>
            )}

            {activeTab === "cli" && (
              <div>
                <div className="mb-6">
                  <h2 className="font-mono text-xl font-bold text-text mb-2">
                    CLI &amp; CI Integration
                  </h2>
                  <p className="text-text-3 text-sm">
                    Run PRISM from the command line, integrate with pre-commit
                    hooks, and catch inheritance issues before they ship.
                  </p>
                </div>
                <CLIDemo />
              </div>
            )}

            {activeTab === "pr-diff" && (
              <div>
                <div className="mb-6">
                  <h2 className="font-mono text-xl font-bold text-text mb-2">
                    PR Diff Mode
                  </h2>
                  <p className="text-text-3 text-sm">
                    Compare inheritance changes between any two git refs. See
                    exactly what changed in the resolution order before merging.
                  </p>
                </div>
                <PRDiffDemo />
              </div>
            )}

            {activeTab === "radial" && (
              <div>
                <div className="mb-6">
                  <h2 className="font-mono text-xl font-bold text-text mb-2">
                    Radial Hierarchy View
                  </h2>
                  <p className="text-text-3 text-sm">
                    An alternative visualization that arranges classes by MRO
                    distance. Hover to explore method relationships.
                  </p>
                </div>
                <RadialDemo />
              </div>
            )}

            {activeTab === "mcp" && (
              <div>
                <div className="mb-6">
                  <h2 className="font-mono text-xl font-bold text-text mb-2">
                    AI Agent Integration
                  </h2>
                  <p className="text-text-3 text-sm">
                    PRISM as an MCP server — deterministic inheritance analysis
                    for Claude Code, Copilot, Cursor, and Codex without
                    consuming LLM tokens.
                  </p>
                </div>
                <MCPSection />
              </div>
            )}

            {activeTab === "experimental" && (
              <div>
                <div className="mb-6">
                  <h2 className="font-mono text-xl font-bold text-text mb-2">
                    What&apos;s Coming
                  </h2>
                  <p className="text-text-3 text-sm">
                    Features shipping incrementally from v0.5 through v1.0 —
                    deep analysis, new resolution types, and developer tooling.
                  </p>
                </div>
                <ExperimentalDemo />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Stats footer */}
      <section className="border-t border-border-2 bg-surface-2">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-mono text-3xl font-bold text-prism-purple mb-1">
                10
              </div>
              <div className="text-text-3 text-xs font-mono">Languages</div>
            </div>
            <div>
              <div className="font-mono text-3xl font-bold text-prism-green mb-1">
                204
              </div>
              <div className="text-text-3 text-xs font-mono">
                Resolution Mechanisms
              </div>
            </div>
            <div>
              <div className="font-mono text-3xl font-bold text-prism-amber mb-1">
                &lt;200ms
              </div>
              <div className="text-text-3 text-xs font-mono">
                Analysis Latency
              </div>
            </div>
            <div>
              <div className="font-mono text-3xl font-bold text-prism-red mb-1">
                14
              </div>
              <div className="text-text-3 text-xs font-mono">
                Deterministic Rules
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
