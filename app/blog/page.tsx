"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog-posts";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};


export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-hero font-mono font-bold text-text">
            Blog
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-text-2">
            Engineering insights, releases, and updates from the PRISM team.
          </p>
        </motion.div>
      </div>

      {/* Blog Posts Grid */}
      <div className="mx-auto w-full max-w-6xl px-6 pb-24">
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.slug}
              variants={itemVariants}
              className="group flex flex-col rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:border-border-2 hover:bg-surface-2"
            >
              {/* Date & read time */}
              <div className="label mb-3 flex items-center gap-2 text-text-3">
                <span>{post.date}</span>
                <span className="text-text-3/30">&middot;</span>
                <span>{post.readTime}</span>
              </div>

              {/* Title */}
              <Link href={`/blog/${post.slug}`}>
                <h2 className="mb-3 text-xl font-bold text-text transition-colors duration-300 group-hover:text-prism-purple">
                  {post.title}
                </h2>
              </Link>

              {/* Excerpt */}
              <p className="mb-6 flex-grow text-sm text-text-2">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="label rounded border border-border-2 bg-surface-2 px-2 py-1 text-text-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
