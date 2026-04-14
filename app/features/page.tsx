"use client";

import { motion } from "framer-motion";
import { statusMeta } from "@/data/scenarios";
import { InteractiveGraph } from "@/components/features/InteractiveGraph";

const languages = [
  "Python",
  "TypeScript",
  "Java",
  "C++",
  "Go",
  "C#",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
];

const features = [
  {
    section: "Live MRO Panel",
    label: "Real-Time Visualization",
    heading: "Live Method Resolution Order",
    description:
      "As you move your cursor in Python code, PRISM instantly shows the complete method resolution order (MRO) chain. Every class that could define the method you're editing appears in order, with the effective class highlighted. Updates in less than 200 milliseconds.",
    visual: "mro",
  },
  {
    section: "Four States",
    label: "Status Classification",
    heading: "Owns. Overrides. Overridden. Shadowed.",
    description:
      "Every method gets one of four color-coded statuses. Owns: you define it, nobody else does. Overrides: you win over a base. Overridden: a descendant will override you. Shadowed: a base class wins—your code never runs. One glance tells you the truth.",
    visual: "states",
  },
  {
    section: "CodeLens & Hover",
    label: "Editor Annotations",
    heading: "Inline Method Badges",
    description:
      "Right in the VS Code gutter, PRISM shows CodeLens badges on each method. Red ↓ means overridden downstream. Amber ↑ means shadowed by a base. Hover over any method name to see rich markdown details: file, line, status, and whether it calls super().",
    visual: "codelens",
  },
  {
    section: "Workspace Scan",
    label: "Project-Wide Analysis",
    heading: "Dead Code Detection",
    description:
      "Run 'PRISM: Scan Dead Code' to analyze your entire project. Finds every shadowed method, every overridden method, every inheritance quirk. Results appear in the VS Code Problems panel with jump-to-definition links. No configuration needed.",
    visual: "scan",
  },
  {
    section: "Interactive Graph",
    label: "Visual Exploration",
    heading: "Mindmap & Radial Views",
    description:
      "The floating panel includes three tabs: Resolution (detail view), Scan (dead code results), and Graph. The Graph tab renders your inheritance hierarchy as an interactive mindmap with pan, zoom, fit, and focus controls. Or switch to radial mode for a polar arrangement of the MRO chain.",
    visual: "graph",
  },
  {
    section: "Multi-Language Support",
    label: "10 Languages",
    heading: "Beyond Python",
    description:
      "While PRISM started with Python, we've shipped resolvers for TypeScript, Java, C++, Go, C#, Ruby, PHP, Swift, and Kotlin. Same four-state classification. Same sub-200ms analysis. Same clean UI across every language.",
    visual: "languages",
  },
];

function FeatureSection({
  label,
  heading,
  description,
  visual,
  index,
}: (typeof features)[0] & { index: number }) {
  const isEven = index % 2 === 0;

  return (
    <section className="relative py-20 px-6 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className={isEven ? "lg:order-1" : "lg:order-2"}
          >
            <div className="label mb-3">{label}</div>
            <h2 className="text-section font-mono font-bold text-text mb-4">
              {heading}
            </h2>
            <p className="text-text-2 text-base leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className={isEven ? "lg:order-2" : "lg:order-1"}
          >
            <VisualElement visual={visual} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function VisualElement({ visual }: { visual: string }) {
  switch (visual) {
    case "mro":
      return (
        <div className="space-y-2">
          {["DeepSpeedEstimator", "LightningTrainer", "DLEstimatorBase"].map(
            (cls, i) => (
              <motion.div
                key={cls}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border-2 rounded-lg p-4 bg-surface-2 font-mono text-sm"
              >
                <div className="font-semibold text-text mb-2">{cls}</div>
                <div className="text-text-3 text-xs">
                  {i === 0
                    ? "setup_dataloader → overrides"
                    : i === 1
                      ? "configure_optimizers → overrides"
                      : "base.py, line 1"}
                </div>
              </motion.div>
            )
          )}
          <div className="text-center text-text-3 text-xs mt-4">
            ↓ MRO order, cursor position analyzed
          </div>
        </div>
      );

    case "states":
      return (
        <div className="grid grid-cols-2 gap-3">
          {["owns", "overrides", "overridden", "shadowed"].map((status, i) => {
            const meta = statusMeta[status as keyof typeof statusMeta];
            return (
              <motion.div
                key={status}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border-2 rounded-lg p-3 bg-surface-2"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: meta.color }}
                  />
                  <span className="font-mono text-xs font-semibold text-text-2">
                    {meta.label}
                  </span>
                </div>
                <p className="text-text-3 text-[11px] leading-tight">
                  {status === "owns"
                    ? "You define it"
                    : status === "overrides"
                      ? "You win"
                      : status === "overridden"
                        ? "Descendant wins"
                        : "Base wins"}
                </p>
              </motion.div>
            );
          })}
        </div>
      );

    case "codelens":
      return (
        <div className="space-y-2 font-mono text-sm">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="border border-border-2 rounded-lg p-4 bg-surface-2"
          >
            <div className="text-text-3 text-xs mb-2">42</div>
            <div className="flex items-start gap-2">
              <span className="text-prism-red text-xs">↓ overridden</span>
              <span className="text-text-2 flex-1">
                def setup_dataloader(self):
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border border-border-2 rounded-lg p-4 bg-surface-2"
          >
            <div className="text-text-3 text-xs mb-2">67</div>
            <div className="flex items-start gap-2">
              <span className="text-prism-amber text-xs">↑ shadowed</span>
              <span className="text-text-2 flex-1">
                def configure_optimizers(self):
              </span>
            </div>
          </motion.div>
        </div>
      );

    case "scan":
      return (
        <div className="border border-border-2 rounded-lg p-6 bg-surface-2 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-prism-red text-lg">●</span>
            <div>
              <div className="font-mono text-sm text-text-2">
                base.py:5: setup_dataloader
              </div>
              <div className="text-text-3 text-xs">Shadowed by DeepSpeed</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-prism-amber text-lg">●</span>
            <div>
              <div className="font-mono text-sm text-text-2">
                base.py:11: configure_optimizers
              </div>
              <div className="text-text-3 text-xs">Overridden downstream</div>
            </div>
          </div>
          <div className="text-center text-text-3 text-xs mt-4 pt-4 border-t border-border">
            Run: PRISM: Scan Dead Code
          </div>
        </div>
      );

    case "graph":
      return <InteractiveGraph />;

    case "languages":
      return (
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang, i) => (
            <motion.div
              key={lang}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.06 }}
              className="border border-border-2 rounded-lg p-3 bg-surface-2 text-center"
            >
              <div className="font-mono text-sm font-semibold text-text">
                {lang}
              </div>
            </motion.div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(91,106,240,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="label mb-6"
          >
            Full Feature Breakdown
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-hero font-mono font-bold text-text"
          >
            Everything PRISM
            <br />
            <span className="text-prism-purple">can do.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-text-2 font-sans text-lg max-w-2xl mx-auto leading-relaxed"
          >
            From live MRO visualization to workspace-wide dead code detection.
            Real-time analysis. Sub-200ms response. Works on 10 languages.
          </motion.p>
        </div>
      </section>

      {/* Feature sections */}
      {features.map((feature, index) => (
        <FeatureSection key={feature.section} {...feature} index={index} />
      ))}

      {/* Performance section */}
      <section className="relative py-20 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="label mb-3">Performance</div>
            <h2 className="text-section font-mono font-bold text-text mb-8">
              Built for speed.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                className="border border-border-2 rounded-lg p-6 bg-surface-2"
              >
                <div className="text-2xl font-mono font-bold text-prism-green mb-2">
                  &lt;200ms
                </div>
                <p className="text-text-2 text-sm">
                  Response time from cursor move to panel update.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="border border-border-2 rounded-lg p-6 bg-surface-2"
              >
                <div className="text-2xl font-mono font-bold text-prism-amber mb-2">
                  ∞
                </div>
                <p className="text-text-2 text-sm">
                  Subprocess stays alive. No respawning per request.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="border border-border-2 rounded-lg p-6 bg-surface-2"
              >
                <div className="text-2xl font-mono font-bold text-prism-purple mb-2">
                  ✓
                </div>
                <p className="text-text-2 text-sm">
                  AST caching. File mtimes tracked. No re-parse unless changed.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 border-t border-border">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-section font-mono font-bold text-text mb-6">
              Ready to see it in action?
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://marketplace.visualstudio.com/items?itemName=TemilolaOlowolayemo.prism-vscode"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm bg-prism-purple text-white px-6 py-2.5 rounded hover:bg-prism-purple/90 transition-colors"
              >
                Install for VS Code
              </a>
              <a
                href="https://open-vsx.org/extension/TemilolaOlowolayemo/prism-vscode"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm border border-border-2 text-text-2 px-6 py-2.5 rounded hover:border-text-3 hover:text-text transition-colors"
              >
                Cursor / Open VSX
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
