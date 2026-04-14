"use client";

import { motion } from "framer-motion";

const languages = [
  "Python",
  "TypeScript",
  "JavaScript",
  "Java",
  "Kotlin",
  "C++",
  "Go",
  "C#",
  "Ruby",
  "Scala",
];

export function LanguageStrip() {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="mx-auto max-w-6xl text-center">
        <div className="label mb-3">Language Support</div>
        <h2 className="text-section font-mono font-bold text-text mb-10">
          10 languages. One tool.
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {languages.map((lang, i) => (
            <motion.span
              key={lang}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="font-mono text-xs px-4 py-2 rounded border border-border-2 text-text-2 bg-surface hover:border-prism-purple/30 hover:text-prism-purple transition-colors"
            >
              {lang}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
