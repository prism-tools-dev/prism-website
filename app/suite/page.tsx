"use client";

import { motion } from "framer-motion";

const features = [
  {
    id: "sidebar",
    icon: "▦",
    title: "Sidebar Panel",
    description:
      "The primary MRO view. Signal bar summarizes method status in one color-coded sentence. Class cards show the full inheritance chain with method pills color-coded by status.",
    order: 0,
  },
  {
    id: "codelens",
    icon: "↓",
    title: "CodeLens",
    description:
      "Inline annotations in the editor gutter. Hover over method definitions to see override and shadow status. Quick-pick navigation to jump definitions.",
    order: 1,
  },
  {
    id: "hover",
    icon: "⚬",
    title: "Hover Cards",
    description:
      "Rich markdown hovers on method names. Shows status, effective class, MRO position, and docstrings. GitLens-style detail card right in the editor.",
    order: 2,
  },
  {
    id: "decorations",
    icon: "◆",
    title: "Inline Decorations",
    description:
      "Shadowed methods dimmed in editor. Overridden methods amber-underlined. Visual indicators without leaving your cursor position.",
    order: 3,
  },
  {
    id: "diagnostics",
    icon: "⚠",
    title: "Diagnostics",
    description:
      "Dead-code warnings in VS Code's Problems panel. One warning per shadowed method, with file, line, and jump-to-definition link.",
    order: 4,
  },
  {
    id: "scanner",
    icon: "\u2315",
    title: "Workspace Scanner",
    description:
      "Four scan modes: dead code (find all shadowed methods), unique methods (methods defined once), conflicts (same name, different classes), name collisions. Run from Command Palette.",
    order: 5,
  },
  {
    id: "graph",
    icon: "⟡",
    title: "Graph Visualization",
    description:
      "Mindmap tree and radial view of the full inheritance hierarchy. Pan, zoom, fit, focus per class, dynamic link colors. Optional floating panel.",
    order: 6,
  },
  {
    id: "statusbar",
    icon: "◎",
    title: "Status Bar",
    description:
      "Always-visible PRISM indicator. Shows cursor context: inside class, outside class, or error state. Click to show panel.",
    order: 7,
  },
  {
    id: "commands",
    icon: "»",
    title: "Command Palette",
    description:
      "prism.showPanel to open the main panel. prism.scanDeadCode to run a workspace scan. prism.jumpToEffective to navigate to the effective version of a method.",
    order: 8,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function SuitePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Subtle gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(91,106,240,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="label mb-6"
          >
            Everything PRISM Shows
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-hero font-mono font-bold text-text"
          >
            The PRISM Suite
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-text-2 font-sans text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Nine surfaces. One unified workspace visualization. From sidebar to
            gutter to graph, every tool works together to answer one question:
            which version actually runs?
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Sidebar (large, featured) */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-2 lg:row-span-2"
            >
              <div className="relative h-full rounded-lg border border-border-2 bg-surface p-8 hover:border-border-2/50 transition-colors">
                {/* Icon */}
                <div className="text-5xl mb-4 text-prism-purple">{features[0].icon}</div>

                {/* Title */}
                <h3 className="font-mono text-xl font-bold text-text mb-3">
                  {features[0].title}
                </h3>

                {/* Description */}
                <p className="text-text-2 text-sm leading-relaxed">
                  {features[0].description}
                </p>

                {/* Accent line */}
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-prism-purple to-transparent w-full rounded-t-lg" />
              </div>
            </motion.div>

            {/* CodeLens */}
            <motion.div variants={cardVariants}>
              <div className="relative h-full rounded-lg border border-border-2 bg-surface p-6 hover:border-border-2/50 transition-colors">
                <div className="text-3xl mb-3 text-prism-amber">{features[1].icon}</div>
                <h3 className="font-mono text-base font-bold text-text mb-2">
                  {features[1].title}
                </h3>
                <p className="text-text-2 text-xs leading-relaxed">
                  {features[1].description}
                </p>
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-prism-amber to-transparent w-full rounded-t-lg" />
              </div>
            </motion.div>

            {/* Hover Cards */}
            <motion.div variants={cardVariants}>
              <div className="relative h-full rounded-lg border border-border-2 bg-surface p-6 hover:border-border-2/50 transition-colors">
                <div className="text-3xl mb-3 text-prism-green">{features[2].icon}</div>
                <h3 className="font-mono text-base font-bold text-text mb-2">
                  {features[2].title}
                </h3>
                <p className="text-text-2 text-xs leading-relaxed">
                  {features[2].description}
                </p>
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-prism-green to-transparent w-full rounded-t-lg" />
              </div>
            </motion.div>

            {/* Inline Decorations */}
            <motion.div variants={cardVariants}>
              <div className="relative h-full rounded-lg border border-border-2 bg-surface p-6 hover:border-border-2/50 transition-colors">
                <div className="text-3xl mb-3 text-prism-red">{features[3].icon}</div>
                <h3 className="font-mono text-base font-bold text-text mb-2">
                  {features[3].title}
                </h3>
                <p className="text-text-2 text-xs leading-relaxed">
                  {features[3].description}
                </p>
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-prism-red to-transparent w-full rounded-t-lg" />
              </div>
            </motion.div>

            {/* Diagnostics */}
            <motion.div variants={cardVariants}>
              <div className="relative h-full rounded-lg border border-border-2 bg-surface p-6 hover:border-border-2/50 transition-colors">
                <div className="text-3xl mb-3 text-prism-amber">{features[4].icon}</div>
                <h3 className="font-mono text-base font-bold text-text mb-2">
                  {features[4].title}
                </h3>
                <p className="text-text-2 text-xs leading-relaxed">
                  {features[4].description}
                </p>
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-prism-amber to-transparent w-full rounded-t-lg" />
              </div>
            </motion.div>

            {/* Scanner (featured) */}
            <motion.div variants={cardVariants} className="lg:col-span-2">
              <div className="relative h-full rounded-lg border border-border-2 bg-surface p-6 hover:border-border-2/50 transition-colors">
                <div className="text-3xl mb-3 text-prism-green">{features[5].icon}</div>
                <h3 className="font-mono text-base font-bold text-text mb-2">
                  {features[5].title}
                </h3>
                <p className="text-text-2 text-xs leading-relaxed">
                  {features[5].description}
                </p>
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-prism-green to-transparent w-full rounded-t-lg" />
              </div>
            </motion.div>

            {/* Graph */}
            <motion.div variants={cardVariants}>
              <div className="relative h-full rounded-lg border border-border-2 bg-surface p-6 hover:border-border-2/50 transition-colors">
                <div className="text-3xl mb-3 text-prism-purple">{features[6].icon}</div>
                <h3 className="font-mono text-base font-bold text-text mb-2">
                  {features[6].title}
                </h3>
                <p className="text-text-2 text-xs leading-relaxed">
                  {features[6].description}
                </p>
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-prism-purple to-transparent w-full rounded-t-lg" />
              </div>
            </motion.div>

            {/* Status Bar */}
            <motion.div variants={cardVariants}>
              <div className="relative h-full rounded-lg border border-border-2 bg-surface p-6 hover:border-border-2/50 transition-colors">
                <div className="text-3xl mb-3 text-text-3">{features[7].icon}</div>
                <h3 className="font-mono text-base font-bold text-text mb-2">
                  {features[7].title}
                </h3>
                <p className="text-text-2 text-xs leading-relaxed">
                  {features[7].description}
                </p>
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-text-3 to-transparent w-full rounded-t-lg" />
              </div>
            </motion.div>

            {/* Commands */}
            <motion.div variants={cardVariants}>
              <div className="relative h-full rounded-lg border border-border-2 bg-surface p-6 hover:border-border-2/50 transition-colors">
                <div className="text-3xl mb-3 text-prism-purple">{features[8].icon}</div>
                <h3 className="font-mono text-base font-bold text-text mb-2">
                  {features[8].title}
                </h3>
                <p className="text-text-2 text-xs leading-relaxed">
                  {features[8].description}
                </p>
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-prism-purple to-transparent w-full rounded-t-lg" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="relative py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="label mb-4">How They Work Together</div>
            <h2 className="text-section font-mono font-bold text-text mb-6">
              One unified workspace
            </h2>
            <p className="text-text-2 text-base leading-relaxed mb-6">
              Every surface reads the same real-time analysis. Move your cursor
              once — the sidebar updates, CodeLens annotations highlight, hover
              cards refresh, and the graph reflows. All in under 200ms. No
              plugins. No configuration. Install and go.
            </p>
          </motion.div>

          {/* Simple flow diagram */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface border border-border rounded-lg p-8 font-mono text-sm text-text-2"
          >
            <div className="text-left">
              <div className="text-text-3 mb-3">Cursor moves</div>
              <div className="text-text-3 mb-1">↓</div>
              <div className="text-text-3 mb-3">Python backend analyzes (MRO, C3, status)</div>
              <div className="text-text-3 mb-1">↓</div>
              <div className="text-text-3 mb-3">Results broadcast to all surfaces</div>
              <div className="text-text-3 mb-1">↓</div>
              <div className="text-prism-green">Every view updates together</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
