"use client";

import { motion } from "framer-motion";
import { IconGitHub, IconLinkedIn, IconMail } from "@/components/Icons";
const ArrowDown = () => <span className="text-border-2 text-lg">&#8595;</span>;


export default function AboutPage() {
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
            How We Got Here
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-hero font-mono font-bold text-text"
          >
            About PRISM
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-4 font-mono text-xs tracking-widest text-text-3/60 uppercase"
          >
            Program Resolution &amp; Inheritance Structure Map
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 text-text-2 font-sans text-lg max-w-2xl mx-auto leading-relaxed"
          >
            PRISM exists because inheritance chains should be transparent.
            When you edit a method buried in a deep class hierarchy, you
            deserve to know instantly whether your version actually runs.
          </motion.p>
        </div>
      </section>

      {/* The Problem */}
      <section className="relative py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="label mb-3"
          >
            The Problem
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-section font-mono font-bold text-text mb-8"
          >
            Method shadowing in the dark
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 text-text-2 font-sans leading-relaxed"
          >
            <p>
              You are editing <code className="font-mono bg-surface-2 px-2 py-1 rounded text-text">
                DLEstimatorBase.configure_optimizers
              </code>. You add logic. You test. But the test passes with the old behavior.
              Something is wrong.
            </p>

            <p>
              After 20 minutes of debugging, you discover:
              <code className="font-mono bg-surface-2 px-2 py-1 rounded text-text block my-3">
                LightningTrainer.configure_optimizers
              </code>
              also defines the method. Your base class version never runs—the derived class
              shadows it. You were editing dead code.
            </p>

            <p>
              This happens constantly in large inheritance chains. The deeper the hierarchy,
              the easier it is to edit a method that never executes. Python&apos;s MRO is powerful,
              but invisible until something breaks.
            </p>

            <p>
              PRISM makes the invisible visible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="label mb-3"
          >
            How It Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-section font-mono font-bold text-text mb-12"
          >
            The 200ms loop
          </motion.h2>

          {/* Pipeline Diagram */}
          <div className="space-y-4">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0 }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-prism-purple/20 border border-prism-purple/40 flex items-center justify-center font-mono text-sm font-bold text-prism-purple">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-mono font-semibold text-text mb-1">Cursor moves</h3>
                <p className="text-text-2 text-sm">
                  You move your cursor in a Python file.
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <ArrowDown />
              </motion.div>
            </div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-prism-amber/20 border border-prism-amber/40 flex items-center justify-center font-mono text-sm font-bold text-prism-amber">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-mono font-semibold text-text mb-1">Extension sends request</h3>
                <p className="text-text-2 text-sm">
                  The TypeScript extension captures the cursor position and file path.
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                <ArrowDown />
              </motion.div>
            </div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-prism-green/20 border border-prism-green/40 flex items-center justify-center font-mono text-sm font-bold text-prism-green">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-mono font-semibold text-text mb-1">Backend analyzes</h3>
                <p className="text-text-2 text-sm">
                  The Python backend parses the AST, resolves the inheritance chain, computes the
                  Method Resolution Order (C3 linearization), and classifies each method into one
                  of four states.
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <ArrowDown />
              </motion.div>
            </div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-prism-red/20 border border-prism-red/40 flex items-center justify-center font-mono text-sm font-bold text-prism-red">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-mono font-semibold text-text mb-1">Panel updates</h3>
                <p className="text-text-2 text-sm">
                  The webview panel renders the MRO chain, method statuses, and a summary of
                  whether your method actually runs.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-text-2 font-sans text-sm leading-relaxed border-l-2 border-border-2 pl-4 italic"
          >
            All of this happens in under 200 milliseconds. No configuration. No waiting.
          </motion.p>
        </div>
      </section>

      {/* Who Built This */}
      <section className="relative py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="label mb-3"
          >
            Built By
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg border border-border bg-surface p-8"
          >
            <div className="space-y-4">
              <p className="text-text font-sans text-lg">
                <span className="font-mono font-semibold">Temilola Olowolayemo</span> built PRISM
                from scratch. Every line of code — TypeScript extension, Python backend, webview
                UI — was written with the principle that developers deserve tools that respect their
                time and intelligence.
              </p>

              <p className="text-text-2 font-sans leading-relaxed">
                The idea for PRISM came from my first internship at Uber, working on the
                Michelangelo Deep Learning team. It was the first time I was working in a
                codebase of that scale — deep inheritance hierarchies, methods overriding
                methods overriding methods. I spent more time than I&apos;d like to admit
                figuring out whether the code I was editing was even the version that ran.
                I got the job done, but I kept thinking: there has to be a better way to
                onboard to a new codebase and understand where your changes actually live.
              </p>

              <p className="text-text-2 font-sans leading-relaxed">
                That question sent me down a series of rabbit holes — from the literature on
                how class resolution works across languages, to the diamond problem, to
                C3 linearization, and beyond. PRISM is the tool I wish I&apos;d had on day one.
              </p>

              <p className="text-text-3 font-sans text-sm italic">
                Read the full story in{" "}
                <a
                  href="/blog/why-i-built-prism"
                  className="text-prism-purple hover:text-prism-purple/80 underline"
                >
                  Why I Built PRISM
                </a>
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://github.com/temilola23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-sm text-prism-purple hover:text-prism-purple/80 transition-colors underline"
                >
                  <IconGitHub size={14} />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/temilola-olowolayemo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-sm text-prism-purple hover:text-prism-purple/80 transition-colors underline"
                >
                  <IconLinkedIn size={14} />
                  LinkedIn
                </a>
                <a
                  href="mailto:hello@prism-tools.dev"
                  className="inline-flex items-center gap-1.5 font-mono text-sm text-prism-purple hover:text-prism-purple/80 transition-colors underline"
                >
                  <IconMail size={14} />
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Source */}
      <section className="relative py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="label mb-3"
          >
            Going Open Source
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-section font-mono font-bold text-text mb-6"
          >
            Free forever
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 text-text-2 font-sans leading-relaxed"
          >
            <p>
              PRISM is free to use. The codebase is coming to open source after
              refactoring and code review is complete. We believe good developer
              tools should be transparent, auditable, and community-driven.
            </p>

            <a
              href="https://github.com/temilola23"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm bg-prism-purple text-white px-6 py-2.5 rounded hover:bg-prism-purple/90 transition-colors"
            >
              <IconGitHub size={16} />
              Follow on GitHub
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
