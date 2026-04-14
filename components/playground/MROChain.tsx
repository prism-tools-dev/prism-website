"use client";

import { type AnalysisResult, type MethodInfo, classLocations, methodLocations } from "@/data/scenarios";
import { motion } from "framer-motion";
import { MethodPill } from "./MethodPill";

interface MROChainProps {
  result: AnalysisResult;
  onClassClick?: (file: string, scenarioKey: string) => void;
  onMethodClick?: (file: string, scenarioKey: string) => void;
}

export function MROChain({ result, onClassClick, onMethodClick }: MROChainProps) {
  if (result.mro_chain.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-3 font-mono text-xs">
        Move cursor inside a class to see its MRO.
      </div>
    );
  }

  // Group methods by defined_in class
  const methodsByClass = new Map<string, MethodInfo[]>();
  for (const m of result.methods) {
    const existing = methodsByClass.get(m.defined_in) ?? [];
    existing.push(m);
    methodsByClass.set(m.defined_in, existing);
  }

  return (
    <div className="flex flex-col gap-0">
      {/* Section label */}
      <div className="label mb-2">Method Resolution Order</div>
      <div className="font-mono text-sm font-semibold text-prism-purple mb-3">
        {result.cursor_class}
      </div>

      {/* Class cards */}
      <div className="flex flex-col">
        {result.mro_chain.map((entry, i) => {
          const isCursorClass = entry.name === result.cursor_class;
          const methods = methodsByClass.get(entry.name) ?? [];
          const classLoc = classLocations[entry.name];

          return (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
            >
              {/* Arrow between cards */}
              {i > 0 && (
                <div className="flex justify-center py-1 text-text-3 text-[10px] font-mono select-none">
                  &#8595;
                </div>
              )}

              {/* Card */}
              <div
                className={`
                  relative rounded-lg border bg-surface p-3
                  ${isCursorClass ? "border-prism-purple/40" : "border-border-2"}
                `}
              >
                {/* Left accent strip */}
                <div
                  className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-full ${
                    isCursorClass ? "bg-prism-purple" : "bg-border-2"
                  }`}
                />

                <div className="pl-2.5">
                  {/* Class name — clickable */}
                  <div className="flex items-baseline gap-2">
                    <button
                      onClick={() => {
                        if (classLoc?.scenarioKey && onClassClick) {
                          onClassClick(classLoc.file, classLoc.scenarioKey);
                        }
                      }}
                      className={`font-mono text-[13px] font-semibold transition-colors ${
                        isCursorClass
                          ? "text-prism-purple hover:text-prism-purple/80"
                          : "text-text hover:text-prism-purple"
                      } ${classLoc?.scenarioKey ? "cursor-pointer hover:underline" : ""}`}
                    >
                      {entry.name}
                    </button>
                    <span className="font-mono text-[10px] text-text-3 truncate">
                      {entry.file}:{entry.line}
                    </span>
                  </div>

                  {/* Method pills */}
                  {methods.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {methods.map((m, j) => {
                        const methodKey = `${m.defined_in}.${m.name}`;
                        const methodLoc = methodLocations[methodKey];
                        return (
                          <MethodPill
                            key={`${m.name}-${j}`}
                            name={m.name}
                            status={m.status}
                            isCursor={
                              m.name === result.cursor_method &&
                              m.defined_in === result.cursor_class
                            }
                            onClick={() => {
                              if (methodLoc?.scenarioKey && onMethodClick) {
                                onMethodClick(methodLoc.file, methodLoc.scenarioKey);
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
