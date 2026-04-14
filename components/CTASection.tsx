"use client";

import { motion } from "framer-motion";
import { IconVSCode, IconGitHub, IconMail } from "./Icons";

export function CTASection() {
  return (
    <section className="relative py-24 px-6 border-t border-border overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(91,106,240,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-section font-mono font-bold text-text mb-4"
        >
          Stop guessing which
          <br />
          method runs.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-text-2 font-sans text-base mb-8 max-w-lg mx-auto"
        >
          Install PRISM and see your inheritance chain in real time.
          Free forever. Open source coming soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://marketplace.visualstudio.com/items?itemName=TemilolaOlowolayemo.prism-vscode"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm bg-text text-bg px-6 py-2.5 rounded hover:bg-text/90 transition-colors"
          >
            <IconVSCode size={16} />
            Install for VS Code
          </a>
          <a
            href="https://github.com/temilolaolowolayemo/PRISM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm border border-border-2 text-text-2 px-6 py-2.5 rounded hover:border-text-3 hover:text-text transition-colors"
          >
            <IconGitHub size={16} />
            View on GitHub
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 inline-flex items-center gap-1.5 font-mono text-[11px] text-text-3"
        >
          <IconMail size={12} />
          hello@prism-tools.dev
        </motion.p>
      </div>
    </section>
  );
}
