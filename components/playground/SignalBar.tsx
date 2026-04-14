"use client";

import { type AnalysisResult, statusMeta } from "@/data/scenarios";
import { motion, AnimatePresence } from "framer-motion";

interface SignalBarProps {
  result: AnalysisResult;
}

function barColor(result: AnalysisResult): { bg: string; border: string; text: string } {
  if (!result.cursor_class) {
    return { bg: "bg-text-3/5", border: "border-text-3/30", text: "text-text-3" };
  }
  if (!result.cursor_status) {
    return { bg: "bg-prism-purple/8", border: "border-prism-purple/25", text: "text-text-2" };
  }
  const meta = statusMeta[result.cursor_status];
  return { bg: meta.bgClass, border: meta.borderClass, text: meta.textClass };
}

export function SignalBar({ result }: SignalBarProps) {
  const colors = barColor(result);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={result.signal}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.2 }}
        className={`
          px-3 py-2.5 border-l-[3px] rounded-r-md
          ${colors.bg} ${colors.border} ${colors.text}
          font-mono text-[12px] leading-relaxed
        `}
      >
        {result.signal}
      </motion.div>
    </AnimatePresence>
  );
}
