"use client";

import { useState } from "react";
import { MCPDemo } from "./MCPDemo";
import { Terminal, TerminalLine } from "./Terminal";

const codexLines: TerminalLine[] = [
  { text: "codex", type: "command" },
  { text: "", type: "output" },
  {
    text: "  OpenAI Codex CLI v1.2.0  |  gpt-5.4  |  workspace-write",
    type: "dim",
  },
  {
    text: "  MCP: prism-mcp (connected)",
    type: "accent",
  },
  { text: "", type: "output" },
  {
    text: "> Check for inheritance issues in src/models/",
    type: "command",
  },
  { text: "", type: "output" },
  {
    text: "  Calling prism-mcp.analyze_hierarchy...",
    type: "info",
  },
  { text: "", type: "output" },
  {
    text: "  PRISM found 2 issues in src/models/:",
    type: "output",
  },
  { text: "", type: "output" },
  {
    text: "  1. deepspeed.py:5  setup_dataloader",
    type: "output",
  },
  {
    text: "     Status: shadowed by DLEstimatorBase",
    type: "error",
  },
  {
    text: "     This method never runs. The base class version wins in MRO.",
    type: "dim",
  },
  { text: "", type: "output" },
  {
    text: "  2. trainer.py:23  configure_optimizers",
    type: "output",
  },
  {
    text: "     Status: overrides DLEstimatorBase",
    type: "warning",
  },
  {
    text: "     Your version runs, but signature differs from base.",
    type: "dim",
  },
  { text: "", type: "output" },
  {
    text: "  Plan: Remove dead setup_dataloader from DeepSpeedEstimator,",
    type: "output",
  },
  {
    text: "        align configure_optimizers signature with base.",
    type: "output",
  },
  { text: "", type: "output" },
  {
    text: "  [Y] approve  [N] reject  [E] edit plan  [C] cancel",
    type: "accent",
  },
];

const tabs = [
  { id: "claude", label: "Claude Code" },
  { id: "codex", label: "Codex" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function MCPSection() {
  const [active, setActive] = useState<TabId>("claude");

  return (
    <div>
      {/* Sub-tabs */}
      <div className="flex gap-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-3 py-1.5 rounded font-mono text-xs transition-colors ${
              active === tab.id
                ? "bg-prism-purple/20 text-prism-purple border border-prism-purple/30"
                : "text-text-3 hover:text-text-2 border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "claude" && <MCPDemo />}
      {active === "codex" && (
        <div>
          <Terminal
            key="codex"
            title={`codex \u2014 prism-mcp`}
            lines={codexLines}
            typeSpeed={30}
            lineDelay={55}
          />
          <p className="mt-4 text-text-3 font-sans text-xs">
            PRISM as an MCP server gives Codex deterministic inheritance
            analysis without consuming LLM tokens on resolution logic.
          </p>
        </div>
      )}
    </div>
  );
}
