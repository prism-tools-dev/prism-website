"use client";

import { motion } from "framer-motion";

const releases = [
  {
    version: "v0.4.0",
    date: "April 14, 2026",
    label: "From Inspection to Action",
    changes: [
      "Callers UX: \"Who calls this?\" impact analysis on method pills",
      "Deterministic rule engine: PRX001\u2013PRX005 (shadow, circular, MRO conflict, missing abstract, signature mismatch)",
      "Package/Namespace view: bird\u2019s-eye tree of all classes by directory",
      "Entry point finder: auto-identify key classes and most-extended bases",
      "Privacy-respecting product analytics via PostHog",
    ],
    highlight: true,
  },
  {
    version: "v0.3.6",
    date: "April 11, 2026",
    label: null,
    changes: [
      "Stability and performance improvements across all 10 languages",
      "Walkthrough content and VSIX packaging fixes",
      "Open VSX (Cursor) compatibility improvements",
    ],
    highlight: false,
  },
  {
    version: "v0.3.0",
    date: "April 8, 2026",
    label: "Multi-Language",
    changes: [
      "Multi-language support: TypeScript, JavaScript, Java, Kotlin, C++, Go, C#, Ruby, Scala",
      "Tree-sitter powered parsing for non-Python languages",
      "Inline decorations: dimmed shadowed methods, amber-underlined overridden",
      "Diagnostics: dead-code warnings in Problems panel",
    ],
    highlight: false,
  },
  {
    version: "v0.2.0",
    date: "April 7, 2026",
    label: null,
    changes: [
      "Interactive graph visualization (mindmap + radial)",
      "Workspace scanning: dead code, unique methods, conflicts, name collisions",
      "CodeLens with override/shadow badges and hover cards",
      "Call chain analysis, super() tracking, descendant tree",
    ],
    highlight: false,
  },
  {
    version: "v0.1.0",
    date: "April 6, 2026",
    label: "Initial Release",
    changes: [
      "Live MRO panel with 4 method states",
      "Python support with sub-200ms cursor tracking",
      "Jump-to-definition from class cards",
    ],
    highlight: false,
  },
];

const upcoming = [
  {
    version: "v0.5",
    title: "Beyond the Extension",
    items: ["prism-cli (pip/npm/brew)", "GitHub Action for PR gating", "MCP server for AI agents", "PR diff mode", "Pre-commit hooks"],
  },
  {
    version: "v0.6",
    title: "Deep Analysis",
    items: ["Dataflow tracer", "Import Resolution Order (IRO)", "Language dispatch education", "Live impact listener"],
  },
  {
    version: "v0.7",
    title: "Onboarding & Education",
    items: ["Complexity heatmap", "Architecture snapshot export", "Codebase tour generator", "New developer mode"],
  },
  {
    version: "v1.0",
    title: "Production",
    items: ["SaaS team dashboard", "Custom deterministic rules", "REST API", "Enterprise SSO"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function ChangelogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-12 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(91,106,240,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="label mb-6"
          >
            Release History
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-section font-mono font-bold text-text"
          >
            What&apos;s New
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-text-2 font-sans text-base max-w-xl mx-auto"
          >
            Track PRISM&apos;s evolution from initial release to multi-language
            powerhouse.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 mx-auto max-w-lg border border-border bg-surface/40 rounded-lg px-5 py-3"
          >
            <p className="text-text-3 font-sans text-xs leading-relaxed text-center">
              While the public timeline below may appear compressed, PRISM has
              been under ideation and quiet development for much longer. The
              core ideas — MRO visualization, shadow detection, and the 200ms
              loop — were refined over months of research and prototyping before
              the first release.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative flex-1 py-12 px-6">
        <div className="mx-auto max-w-3xl">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-prism-purple/50 via-prism-purple/20 to-transparent"
            style={{
              top: "2rem",
              bottom: 0,
              height: "calc(100% - 4rem)",
            }}
          />

          {/* Timeline items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12 relative"
          >
            {releases.map((release) => (
              <motion.div
                key={release.version}
                variants={itemVariants}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                {/* Left side: date */}
                <div className="flex items-start gap-8">
                  <div className="hidden sm:block w-1/2 text-right pr-8">
                    <div className="label text-text-3 mb-1">
                      {release.date}
                    </div>
                  </div>

                  {/* Center: dot */}
                  <div className="relative flex justify-center">
                    <motion.div
                      whileInView={{
                        scale: 1,
                        boxShadow: release.highlight
                          ? "0 0 20px rgba(139, 92, 246, 0.6)"
                          : "0 0 10px rgba(139, 92, 246, 0.3)",
                      }}
                      initial={{ scale: 0.5 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className={`w-4 h-4 rounded-full border-2 ${
                        release.highlight
                          ? "bg-prism-purple border-prism-purple"
                          : "bg-surface border-prism-purple/50"
                      }`}
                    />
                  </div>

                  {/* Right side: content */}
                  <div className="w-full sm:w-1/2 pb-4">
                    {/* Mobile date */}
                    <div className="sm:hidden mb-2">
                      <div className="label text-text-3">
                        {release.date}
                      </div>
                    </div>

                    {/* Version and changes */}
                    <motion.div
                      whileInView={{
                        boxShadow: release.highlight
                          ? "0 0 24px rgba(139, 92, 246, 0.15)"
                          : "0 0 12px rgba(139, 92, 246, 0.05)",
                      }}
                      className={`rounded-lg border ${
                        release.highlight
                          ? "bg-prism-purple/5 border-prism-purple/30"
                          : "bg-surface/40 border-border"
                      } p-6 transition-all duration-300`}
                    >
                      {/* Version number */}
                      <h3 className="font-mono font-bold text-lg text-text mb-1">
                        {release.version}
                        {release.highlight && (
                          <span className="ml-3 inline-block px-2.5 py-0.5 bg-prism-purple/30 border border-prism-purple/40 rounded text-xs text-prism-purple font-mono tracking-wide">
                            Latest
                          </span>
                        )}
                      </h3>

                      {/* Phase label */}
                      {release.label && (
                        <div className="text-text-3 font-mono text-xs mb-4">
                          {release.label}
                        </div>
                      )}

                      {!release.label && <div className="mb-3" />}

                      {/* Changes list */}
                      <ul className="space-y-2.5">
                        {release.changes.map((change) => (
                          <li
                            key={change}
                            className="flex items-start gap-3 text-text-2 font-sans text-sm"
                          >
                            <span className="text-prism-purple font-bold mt-1">
                              &bull;
                            </span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* End marker */}
          <motion.div
            variants={itemVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-100px" }}
            className="relative mt-12 pt-8"
          >
            <div className="flex items-start gap-8">
              <div className="hidden sm:block w-1/2 text-right pr-8" />

              <div className="relative flex justify-center">
                <div className="w-4 h-4 rounded-full bg-prism-green border-2 border-prism-green" />
              </div>

              <div className="w-full sm:w-1/2">
                <p className="text-text-3 font-sans text-sm">
                  Shipping fast. More below.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Next */}
      <section className="relative py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="label mb-4">Roadmap</div>
            <h2 className="text-section font-mono font-bold text-text">
              What&apos;s Coming
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {upcoming.map((phase) => (
              <motion.div
                key={phase.version}
                variants={itemVariants}
                className="rounded-lg border border-border bg-surface/40 p-6 hover:border-border-2/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm font-bold text-prism-purple bg-prism-purple/10 border border-prism-purple/20 px-2.5 py-0.5 rounded">
                    {phase.version}
                  </span>
                  <h3 className="font-mono text-sm font-bold text-text">
                    {phase.title}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-text-2 font-sans text-xs"
                    >
                      <span className="text-text-3 mt-0.5">&rarr;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="pb-12" />
    </div>
  );
}
