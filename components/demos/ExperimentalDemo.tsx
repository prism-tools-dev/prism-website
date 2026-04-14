"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Feature {
  icon: string; // Monospace/ASCII icon
  title: string;
  abbr: string | null;
  version: string;
  description: string;
  color: string;
  preview: {
    heading: string;
    lines: string[];
  };
}

const features: Feature[] = [
  {
    icon: "\u2192",
    title: "Scope Resolution Order",
    abbr: "SRO",
    version: "v0.6",
    description:
      "Which variable does this name see? Track LEGB scope chains, closures, and shadowed locals across all 10 languages.",
    color: "prism-purple",
    preview: {
      heading: "SRO Analysis",
      lines: [
        "x = 10              # module scope",
        "def outer():",
        "    x = 20          # enclosing scope",
        "    def inner():",
        "        print(x)    # \u2192 resolves to 20 (enclosing)",
        "",
        "SRO: local \u2192 enclosing \u2192 global \u2192 builtin",
        "Result: x resolves to enclosing scope (line 3)",
      ],
    },
  },
  {
    icon: "\u21C4",
    title: "Import Resolution Order",
    abbr: "IRO",
    version: "v0.5",
    description:
      "Which module\u2019s export wins? Resolve import chains, re-exports, circular dependencies, and path aliases.",
    color: "prism-amber",
    preview: {
      heading: "IRO Chain",
      lines: [
        "from utils import Trainer",
        "",
        "utils/__init__.py  re-exports from .base",
        "utils/base.py      defines Trainer",
        "utils/compat.py    also defines Trainer  \u2190 shadowed",
        "",
        "IRO: __init__.py \u2192 base.py \u2192 compat.py",
        "Winner: utils/base.py:12",
      ],
    },
  },
  {
    icon: "\u2593",
    title: "Complexity Heatmap",
    abbr: null,
    version: "v0.7",
    description:
      "Visual map of inheritance depth, override density, and coupling score. Spot the hotspots before they burn you.",
    color: "prism-red",
    preview: {
      heading: "Heatmap: src/models/",
      lines: [
        "File            Depth  Overrides  Score",
        "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
        "deepspeed.py       3          4   [!] HIGH",
        "lightning.py       2          2   [~] MED",
        "base.py            1          0   [.] LOW",
        "trainer.py         4          6   [!] HIGH",
      ],
    },
  },
  {
    icon: "\u21E5",
    title: "Architecture Snapshot",
    abbr: null,
    version: "v0.7",
    description:
      "Export your class hierarchy as HTML, SVG, or JSON. Share with the team, version in docs, compare across branches.",
    color: "prism-green",
    preview: {
      heading: "Export Preview",
      lines: [
        "$ prism export --format svg src/models/",
        "",
        "Generating hierarchy for 12 classes...",
        "Output: hierarchy.svg (48 KB)",
        "",
        "Formats: html | svg | json | mermaid",
        "Options: --depth 5 --include-stdlib",
      ],
    },
  },
  {
    icon: "?=",
    title: "New Developer Mode",
    abbr: null,
    version: "v0.7",
    description:
      'Extra-verbose hover cards with "This means..." explanations. Perfect for onboarding and learning complex codebases.',
    color: "prism-purple",
    preview: {
      heading: "Standard vs New Dev Mode",
      lines: [
        "STANDARD:",
        "  configure_optimizers: overrides",
        "  Effective: LightningTrainer",
        "",
        "NEW DEV MODE:",
        "  configure_optimizers: overrides",
        "",
        "  What this means:",
        "  This class defines its own version of",
        "  configure_optimizers. When Python calls",
        "  this method, YOUR version runs, not the",
        "  parent's. The parent (DLEstimatorBase)",
        "  also defines it, but yours wins in the",
        "  MRO because your class comes first.",
        "",
        "  \u2192 Safe to edit. Changes take effect.",
      ],
    },
  },
  {
    icon: "\u0394",
    title: "Interactive Simulator",
    abbr: null,
    version: "v0.7",
    description:
      '"What would happen if I add this method?" Test inheritance changes before writing code.',
    color: "prism-amber",
    preview: {
      heading: "Simulator",
      lines: [
        "+ Adding: LightningTrainer.setup_dataloader",
        "",
        "Before:",
        "  setup_dataloader: owns (DLEstimatorBase)",
        "",
        "After:",
        "  setup_dataloader: shadowed (DLEstimatorBase)",
        "  setup_dataloader: overrides (LightningTrainer)",
        "",
        "\u26A0 1 new shadow, 1 downstream class affected",
      ],
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function ExperimentalDemo() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={cardVariants}
            className="dark group relative rounded-lg border border-border-2 bg-[#1a1d2e] p-5 hover:border-border-2/60 transition-colors"
            onMouseEnter={() => setHoveredFeature(f.title)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            {/* Version badge */}
            <div className="absolute top-4 right-4">
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded bg-${f.color}/10 text-${f.color} border border-${f.color}/20`}
              >
                {f.version}
              </span>
            </div>

            {/* Icon + title */}
            <div className={`font-mono text-lg mb-3 text-${f.color}`}>
              {f.icon}
            </div>
            <h3 className="font-mono text-sm font-bold text-text mb-1">
              {f.title}
              {f.abbr && (
                <span className="text-text-3 font-normal ml-1.5">
                  ({f.abbr})
                </span>
              )}
            </h3>

            {/* Description */}
            <p className="text-text-3 text-xs leading-relaxed">
              {f.description}
            </p>

            {/* Hover preview panel */}
            <AnimatePresence>
              {hoveredFeature === f.title && (
                <motion.div
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 8, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 pt-3 border-t border-border-2 overflow-hidden"
                >
                  <div className="rounded bg-[#0d0f1a] border border-border-2 p-3 font-mono text-[11px] leading-5 max-h-[200px] overflow-y-auto">
                    <div className="text-text-3 text-[10px] mb-2 uppercase tracking-wider">
                      {f.preview.heading}
                    </div>
                    {f.preview.lines.map((line, i) =>
                      line === "" ? (
                        <div key={i} className="h-3" />
                      ) : (
                        <div
                          key={i}
                          className={`whitespace-pre ${
                            line.includes("[!]") || line.includes("\u26A0") || line.includes("HIGH")
                              ? "text-prism-red"
                              : line.includes("[~]") || line.includes("MED")
                              ? "text-prism-amber"
                              : line.includes("[.]") || line.includes("LOW")
                              ? "text-prism-green"
                              : line.includes("\u2192") || line.includes("Winner")
                              ? "text-prism-green"
                              : line.includes("shadowed") || line.includes("shadow")
                              ? "text-prism-red"
                              : line.startsWith("$") || line.startsWith("+")
                              ? "text-text-2"
                              : line.startsWith("  What") || line.startsWith("STANDARD") || line.startsWith("NEW DEV")
                              ? "text-text-2"
                              : "text-text-3"
                          }`}
                        >
                          {line}
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6 text-center">
        <p className="text-text-3 font-mono text-xs">
          204 resolution mechanisms across 10 languages. 60% deterministic.
          Shipping incrementally through v1.0.
        </p>
      </div>
    </div>
  );
}
