"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  scenarios,
  defaultScenario,
  defaultFile,
  type AnalysisResult,
} from "@/data/scenarios";
import { CodeEditor } from "./CodeEditor";
import { PrismPanel } from "./PrismPanel";

export function Playground() {
  const [activeScenario, setActiveScenario] = useState(defaultScenario);
  const [activeFile, setActiveFile] = useState(defaultFile);
  const result: AnalysisResult = scenarios[activeScenario];

  const handleLineClick = useCallback((scenarioKey: string) => {
    setActiveScenario(scenarioKey);
  }, []);

  const handleFileChange = useCallback(
    (file: string) => {
      setActiveFile(file);
      // Select the first clickable line in the new file (class line)
      const classKey = file.replace(".py", "") + ":class";
      if (scenarios[classKey]) {
        setActiveScenario(classKey);
      }
    },
    [],
  );

  // Jump from PRISM panel → code editor (for class clicks)
  const handleJumpToClass = useCallback((file: string, scenarioKey: string) => {
    setActiveFile(file);
    setActiveScenario(scenarioKey);
  }, []);

  // Jump from PRISM panel → code editor (for method clicks)
  const handleJumpToMethod = useCallback((file: string, scenarioKey: string) => {
    setActiveFile(file);
    setActiveScenario(scenarioKey);
  }, []);

  return (
    <div className="w-full">
      {/* Instructional hint */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="font-mono text-[11px] text-text-3">
          Click highlighted lines in the editor, or interact with the PRISM panel to navigate
        </span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-prism-purple animate-pulse" />
      </div>

      {/* Split pane */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl border border-border-2 overflow-hidden bg-surface-2"
        style={{ minHeight: 480 }}
      >
        {/* Left: Code editor */}
        <div className="min-h-[300px] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-border-2">
          <CodeEditor
            activeFile={activeFile}
            activeLine={activeScenario}
            onFileChange={handleFileChange}
            onLineClick={handleLineClick}
          />
        </div>

        {/* Right: PRISM panel */}
        <div className="min-h-[300px] lg:min-h-0">
          <PrismPanel
            result={result}
            onJumpToMethod={handleJumpToMethod}
            onJumpToClass={handleJumpToClass}
          />
        </div>
      </motion.div>
    </div>
  );
}
