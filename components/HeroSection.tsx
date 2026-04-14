"use client";

import { motion } from "framer-motion";
import { IconVSCode, IconCursor } from "./Icons";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden">
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
          VS Code Extension &middot; 10 Languages &middot; Sub-200ms
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-hero font-mono font-bold text-text"
        >
          Know exactly which
          <br />
          version of a method
          <br />
          <span className="text-prism-purple">actually runs.</span>
        </motion.h1>

        {/* Acronym */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-5 font-mono text-xs tracking-widest text-text-3/60 uppercase"
        >
          Program Resolution &amp; Inheritance Structure Map
        </motion.p>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-4 text-text-2 font-sans text-lg max-w-2xl mx-auto leading-relaxed"
        >
          PRISM shows live method resolution order and inheritance chain
          visualization as you move your cursor. Four color-coded states.
          One glance.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://marketplace.visualstudio.com/items?itemName=TemilolaOlowolayemo.prism-vscode"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm bg-prism-purple text-white px-6 py-2.5 rounded hover:bg-prism-purple/90 transition-colors"
          >
            <IconVSCode size={16} />
            Install for VS Code
          </a>
          <a
            href="https://open-vsx.org/extension/TemilolaOlowolayemo/prism-vscode"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm border border-border-2 text-text-2 px-6 py-2.5 rounded hover:border-text-3 hover:text-text transition-colors"
          >
            <IconCursor size={16} />
            Cursor / Open VSX
          </a>
        </motion.div>
      </div>
    </section>
  );
}
