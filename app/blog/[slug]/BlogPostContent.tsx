"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type BlogPost, type BlogSection } from "@/data/blog-posts";
import { IconVSCode } from "@/components/Icons";

function SectionRenderer({ section, index }: { section: BlogSection; index: number }) {
  switch (section.type) {
    case "paragraph":
      return (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, delay: 0.02 * index }}
          className="text-text-2 font-sans text-[15px] leading-[1.8] mb-6"
        >
          {section.content}
        </motion.p>
      );

    case "heading":
      if (section.level === 3) {
        return (
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4 }}
            className="font-mono text-lg font-bold text-text mt-10 mb-4"
          >
            {section.content}
          </motion.h3>
        );
      }
      return (
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xl font-bold text-text mt-12 mb-5"
        >
          {section.content}
        </motion.h2>
      );

    case "code":
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="rounded-lg border border-border-2 overflow-hidden">
            {section.language && (
              <div className="flex items-center px-4 py-2 bg-surface-2 border-b border-border-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-3">
                  {section.language}
                </span>
              </div>
            )}
            <pre className="bg-surface p-4 overflow-x-auto">
              <code className="font-mono text-[13px] leading-[1.7] text-text-2 whitespace-pre">
                {section.content}
              </code>
            </pre>
          </div>
        </motion.div>
      );

    case "diagram":
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="rounded-lg border border-prism-purple/20 bg-prism-purple/5 p-5 overflow-x-auto">
            <pre className="font-mono text-[12px] leading-[1.6] text-text-2 whitespace-pre">
              {section.content}
            </pre>
          </div>
        </motion.div>
      );

    case "list":
      return (
        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4 }}
          className="mb-6 space-y-3 pl-1"
        >
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-text-2 font-sans text-[15px] leading-[1.7]"
            >
              <span className="text-prism-purple font-bold mt-1 shrink-0">
                &bull;
              </span>
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>
      );

    case "callout": {
      const variants = {
        info: {
          bg: "bg-prism-purple/5",
          border: "border-prism-purple/25",
          text: "text-text-2",
          accent: "border-l-prism-purple",
        },
        warning: {
          bg: "bg-prism-amber/5",
          border: "border-prism-amber/25",
          text: "text-text-2",
          accent: "border-l-prism-amber",
        },
        insight: {
          bg: "bg-prism-green/5",
          border: "border-prism-green/25",
          text: "text-text-2",
          accent: "border-l-prism-green",
        },
      };
      const v = variants[section.variant || "info"];
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4 }}
          className={`mb-6 rounded-r-lg border-l-[3px] ${v.accent} ${v.bg} border ${v.border} px-5 py-4`}
        >
          <p className={`${v.text} font-sans text-[14px] leading-[1.7] italic`}>
            {section.content}
          </p>
        </motion.div>
      );
    }

    default:
      return null;
  }
}

interface BlogPostContentProps {
  post: BlogPost;
  prev: BlogPost | null;
  next: BlogPost | null;
}

export function BlogPostContent({ post, prev, next }: BlogPostContentProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-12 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(91,106,240,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="font-mono text-[11px] text-text-3 hover:text-prism-purple transition-colors mb-6 inline-block"
            >
              &larr; Back to blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-mono text-[11px] text-text-3">
              {post.date}
            </span>
            <span className="text-text-3/30">&middot;</span>
            <span className="font-mono text-[11px] text-text-3">
              {post.readTime}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-mono font-bold text-text leading-tight"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2 mt-5"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="label rounded border border-border-2 bg-surface-2 px-2 py-1 text-text-3"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          {post.sections.map((section, i) => (
            <SectionRenderer key={i} section={section} index={i} />
          ))}
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="relative px-6 pb-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-stretch gap-4 border-t border-border pt-10">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="flex-1 group rounded-lg border border-border-2 p-5 hover:border-prism-purple/40 transition-colors"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-text-3 mb-2">
                  &larr; Previous
                </div>
                <div className="font-mono text-sm font-semibold text-text group-hover:text-prism-purple transition-colors leading-snug">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="flex-1 group rounded-lg border border-border-2 p-5 hover:border-prism-purple/40 transition-colors text-right"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-text-3 mb-2">
                  Next &rarr;
                </div>
                <div className="font-mono text-sm font-semibold text-text group-hover:text-prism-purple transition-colors leading-snug">
                  {next.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <h3 className="font-mono text-lg font-bold text-text mb-1">
                Try PRISM
              </h3>
              <p className="text-text-2 text-sm">
                See method resolution in real time.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://marketplace.visualstudio.com/items?itemName=TemilolaOlowolayemo.prism-vscode"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm bg-prism-purple text-white px-5 py-2 rounded hover:bg-prism-purple/90 transition-colors"
              >
                <IconVSCode size={14} />
                Install for VS Code
              </a>
              <Link
                href="/playground"
                className="font-mono text-sm border border-border-2 text-text-2 px-5 py-2 rounded hover:border-text-3 hover:text-text transition-colors"
              >
                Try the Playground
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
