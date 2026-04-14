"use client";

import { Terminal, TerminalLine } from "./Terminal";

const diffLines: TerminalLine[] = [
  { text: "prism compare main", type: "command" },
  { text: "", type: "output" },
  { text: "Comparing feature/new-trainer \u2190 main", type: "info" },
  { text: "Analyzing 8 changed files...", type: "dim" },
  { text: "", type: "output" },
  {
    text: "\u250C\u2500 src/models/deepspeed.py \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510",
    type: "dim",
  },
  { text: "\u2502", type: "dim" },
  { text: "\u2502  \u26A0 NEW SHADOW: setup_dataloader", type: "warning" },
  { text: "\u2502    was: owns (unique to this class)", type: "dim" },
  { text: "\u2502    now: shadowed by LightningTrainer", type: "error" },
  { text: "\u2502    impact: 3 downstream classes affected", type: "dim" },
  { text: "\u2502", type: "dim" },
  { text: "\u2502  \u2713 SAFE: configure_optimizers", type: "success" },
  { text: "\u2502    status unchanged: overrides", type: "dim" },
  { text: "\u2502", type: "dim" },
  { text: "\u2502  + NEW METHOD: init_distributed", type: "success" },
  { text: "\u2502    status: owns", type: "dim" },
  { text: "\u2502", type: "dim" },
  {
    text: "\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518",
    type: "dim",
  },
  { text: "", type: "output" },
  {
    text: "\u250C\u2500 src/models/lightning.py \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510",
    type: "dim",
  },
  { text: "\u2502", type: "dim" },
  { text: "\u2502  \u2713 SAFE: No inheritance changes", type: "success" },
  { text: "\u2502", type: "dim" },
  {
    text: "\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518",
    type: "dim",
  },
  { text: "", type: "output" },
  { text: "Safety Score: \u26A0 AMBER", type: "warning" },
  { text: "  1 new shadow, 0 broken chains, 1 new method", type: "dim" },
  { text: "  Review recommended before merge.", type: "warning" },
];

export function PRDiffDemo() {
  return (
    <div>
      <Terminal
        title="zsh \u2014 prism compare"
        lines={diffLines}
        typeSpeed={35}
        lineDelay={45}
      />
      <p className="mt-4 text-text-3 font-sans text-xs">
        Coming in v0.5 &mdash; Compare inheritance changes between any two git
        refs. Catch dead code <em>before</em> it lands.
      </p>
    </div>
  );
}
