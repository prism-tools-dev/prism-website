"use client";

import { motion } from "framer-motion";
import { statusMeta, type Status } from "@/data/scenarios";

const states: { status: Status; description: string; example: string }[] = [
  {
    status: "owns",
    description: "Defined here. No base defines it. No descendant redefines it.",
    example: "DLEstimatorBase.train",
  },
  {
    status: "overrides",
    description: "Defined here and wins. A base class also defines it.",
    example: "LightningTrainer.configure_optimizers",
  },
  {
    status: "overridden",
    description: "Wins in its own MRO, but a descendant redefines it further.",
    example: "DLEstimatorBase.setup_dataloader",
  },
  {
    status: "shadowed",
    description: "Defined here but a class earlier in the MRO wins. Dead code.",
    example: "DLEstimatorBase.configure_optimizers",
  },
];

export function StatusStates() {
  return (
    <section className="relative py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="label mb-3">The Four States</div>
        <h2 className="text-section font-mono font-bold text-text mb-12">
          Every method. One status.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {states.map((s, i) => {
            const meta = statusMeta[s.status];
            return (
              <motion.div
                key={s.status}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`
                  relative rounded-lg border p-5
                  bg-surface ${meta.borderClass}
                `}
              >
                {/* Color dot + label */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: meta.color }}
                  />
                  <span className={`font-mono text-sm font-semibold ${meta.textClass}`}>
                    {meta.label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-text-2 text-sm leading-relaxed mb-3">
                  {s.description}
                </p>

                {/* Example */}
                <div className="font-mono text-[11px] text-text-3 bg-surface-2 px-2 py-1 rounded">
                  {s.example}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
