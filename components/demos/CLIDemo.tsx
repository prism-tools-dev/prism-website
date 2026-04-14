"use client";

import { useState } from "react";
import { Terminal, TerminalLine } from "./Terminal";

const installLines: TerminalLine[] = [
  { text: "pip3 install prism-check", type: "command" },
  { text: "Collecting prism-check", type: "output" },
  {
    text: "  Downloading prism_check-0.5.0-py3-none-any.whl (2.1 MB)",
    type: "dim",
  },
  {
    text: "  \u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501 2.1/2.1 MB",
    type: "dim",
  },
  { text: "Installing collected packages: prism-check", type: "output" },
  { text: "Successfully installed prism-check-0.5.0", type: "success" },
  { text: "", type: "output" },
  { text: "prism check src/", type: "command" },
  { text: "Scanning 47 Python files...", type: "dim" },
  { text: "", type: "output" },
  { text: "  src/models/deepspeed.py:5", type: "output" },
  { text: "  PRX001 error  setup_dataloader is shadowed", type: "error" },
  {
    text: "                \u2192 DLEstimatorBase.setup_dataloader wins in MRO",
    type: "dim",
  },
  { text: "", type: "output" },
  { text: "  src/models/trainer.py:23", type: "output" },
  {
    text: "  PRX005 warn   configure_optimizers signature mismatch",
    type: "warning",
  },
  {
    text: "                \u2192 Override changes (self) to (self, lr: float)",
    type: "dim",
  },
  { text: "", type: "output" },
  { text: "  src/utils/helpers.py:89", type: "output" },
  {
    text: "  PRX004 error  missing abstract implementation",
    type: "error",
  },
  {
    text: "                \u2192 AbstractTrainer.validate() not implemented",
    type: "dim",
  },
  { text: "", type: "output" },
  {
    text: "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
    type: "dim",
  },
  { text: "3 issues (2 errors, 1 warning) in 47 files", type: "error" },
];

const precommitLines: TerminalLine[] = [
  {
    text: 'git commit -m "refactor: update trainer hierarchy"',
    type: "command",
  },
  { text: "", type: "output" },
  {
    text: "\u{1F50D} PRISM pre-commit check (--staged, fast mode)",
    type: "info",
  },
  { text: "Checking 3 staged files...", type: "dim" },
  { text: "", type: "output" },
  { text: "  src/models/deepspeed.py:5", type: "output" },
  { text: "  PRX001 error  setup_dataloader is shadowed", type: "error" },
  {
    text: "                \u2192 Method will never run for DeepSpeedEstimator instances",
    type: "dim",
  },
  { text: "", type: "output" },
  {
    text: "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
    type: "dim",
  },
  { text: "\u2717 1 error found. Commit blocked.", type: "error" },
  {
    text: "  Fix the issue or use git commit --no-verify to skip.",
    type: "dim",
  },
];

const tabs = [
  { id: "install", label: "Install & Check" },
  { id: "precommit", label: "Pre-commit Hook" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function CLIDemo() {
  const [active, setActive] = useState<TabId>("install");

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

      {active === "install" && (
        <Terminal
          key="install"
          title="zsh \u2014 prism-check"
          lines={installLines}
          typeSpeed={35}
          lineDelay={55}
        />
      )}
      {active === "precommit" && (
        <Terminal
          key="precommit"
          title="zsh \u2014 git commit"
          lines={precommitLines}
          typeSpeed={30}
          lineDelay={50}
        />
      )}
      <p className="mt-4 text-text-3 font-sans text-xs">
        Coming in v0.5 &mdash;{" "}
        <span className="text-text-2">pip install prism-check</span>,
        GitHub Action, and pre-commit framework integration.
      </p>
    </div>
  );
}
