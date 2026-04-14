"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  type AnalysisResult,
  type Status,
  statusMeta,
  methodLocations,
  classLocations,
} from "@/data/scenarios";

// Hierarchy data matching the playground's demo files
interface ClassNode {
  name: string;
  file: string;
  line: number;
  methods: { name: string; status: Status }[];
  children: string[];
}

const hierarchy: Record<string, ClassNode> = {
  DLEstimatorBase: {
    name: "DLEstimatorBase",
    file: "base.py",
    line: 1,
    methods: [
      { name: "setup_dataloader", status: "overridden" },
      { name: "configure_optimizers", status: "overridden" },
      { name: "train", status: "owns" },
    ],
    children: ["LightningTrainer"],
  },
  LightningTrainer: {
    name: "LightningTrainer",
    file: "lightning.py",
    line: 3,
    methods: [{ name: "configure_optimizers", status: "overrides" }],
    children: ["DeepSpeedEstimator"],
  },
  DeepSpeedEstimator: {
    name: "DeepSpeedEstimator",
    file: "deepspeed.py",
    line: 3,
    methods: [{ name: "setup_dataloader", status: "overrides" }],
    children: [],
  },
};

function statusColor(s: Status): string {
  return statusMeta[s].color;
}

function statusBg(s: Status): string {
  const map: Record<Status, string> = {
    owns: "rgba(16,185,129,0.15)",
    overrides: "rgba(245,158,11,0.15)",
    overridden: "rgba(139,92,246,0.15)",
    shadowed: "rgba(239,68,68,0.15)",
  };
  return map[s];
}

type ViewMode = "mindmap" | "text" | "radial";

interface PlaygroundGraphProps {
  result: AnalysisResult;
  onClassClick?: (file: string, scenarioKey: string) => void;
  onMethodClick?: (file: string, scenarioKey: string) => void;
}

export function PlaygroundGraph({ result, onClassClick, onMethodClick }: PlaygroundGraphProps) {
  const [mode, setMode] = useState<ViewMode>("mindmap");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    [result.cursor_class || "DeepSpeedEstimator"]: true,
  });

  const handleToggle = useCallback((name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const handleClassJump = useCallback(
    (name: string) => {
      const loc = classLocations[name];
      if (loc?.scenarioKey && onClassClick) {
        onClassClick(loc.file, loc.scenarioKey);
      }
    },
    [onClassClick]
  );

  const handleMethodJump = useCallback(
    (className: string, methodName: string) => {
      const key = `${className}.${methodName}`;
      const loc = methodLocations[key];
      if (loc?.scenarioKey && onMethodClick) {
        onMethodClick(loc.file, loc.scenarioKey);
      }
    },
    [onMethodClick]
  );

  const mroNames = result.mro_chain.map((e) => e.name);
  const cursorClass = result.cursor_class || "DeepSpeedEstimator";

  const modes: { id: ViewMode; label: string }[] = useMemo(
    () => [
      { id: "mindmap", label: "Mindmap" },
      { id: "text", label: "Text" },
      { id: "radial", label: "Radial" },
    ],
    []
  );

  return (
    <div className="dark flex flex-col gap-0 flex-1">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-2 py-1.5 rounded-md bg-[#1a1d2e] mb-2">
        <div className="flex gap-1">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                mode === m.id
                  ? "bg-prism-purple/20 text-prism-purple border border-prism-purple/40"
                  : "text-text-3 hover:text-text-2 border border-transparent"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        {mode === "mindmap" && (
          <div className="flex gap-1">
            <button
              onClick={() => setExpanded({ [cursorClass]: true })}
              className="px-1.5 py-0.5 rounded text-[9px] font-mono text-text-3 hover:text-text-2 border border-border-2 hover:border-text-3/30 transition-colors"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="flex-1"
        >
          {mode === "mindmap" && (
            <MindmapView
              mroNames={mroNames}
              cursorClass={cursorClass}
              expanded={expanded}
              onToggle={handleToggle}
              onClassClick={handleClassJump}
              onMethodClick={handleMethodJump}
            />
          )}
          {mode === "text" && (
            <TextTreeView
              mroNames={mroNames}
              cursorClass={cursorClass}
              expanded={expanded}
              onToggle={handleToggle}
              onClassClick={handleClassJump}
              onMethodClick={handleMethodJump}
            />
          )}
          {mode === "radial" && (
            <RadialView
              mroNames={mroNames}
              cursorClass={cursorClass}
              onClassClick={handleClassJump}
              onMethodClick={handleMethodJump}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- Mindmap SVG ---

function MindmapView({
  mroNames,
  cursorClass,
  expanded,
  onToggle,
  onClassClick,
  onMethodClick,
}: {
  mroNames: string[];
  cursorClass: string;
  expanded: Record<string, boolean>;
  onToggle: (name: string) => void;
  onClassClick: (name: string) => void;
  onMethodClick: (cls: string, method: string) => void;
}) {
  const NODE_W = 140;
  const NODE_H = 28;
  const COL_GAP = 50;
  const METHOD_W = 110;
  const METHOD_H = 18;
  const METHOD_GAP = 5;
  const PILL_TOP_GAP = 8;
  const PAD = 25;

  const cursorIdx = mroNames.indexOf(cursorClass);
  const cursorX = 0;
  const cursorY = 0;

  interface NodePos {
    name: string;
    x: number;
    y: number;
    isCursor: boolean;
  }

  const nodes: NodePos[] = [];
  const edges: { from: [number, number]; to: [number, number] }[] = [];

  // Place cursor class at center
  nodes.push({ name: cursorClass, x: cursorX, y: cursorY, isCursor: true });

  // Ancestors to the left
  let leftIdx = 0;
  for (let i = 0; i < mroNames.length; i++) {
    if (i === cursorIdx) continue;
    leftIdx++;
    const x = cursorX - leftIdx * (NODE_W + COL_GAP);
    nodes.push({ name: mroNames[i], x, y: cursorY, isCursor: false });
    edges.push({
      from: [x + NODE_W, cursorY + NODE_H / 2],
      to: [x + NODE_W + COL_GAP, cursorY + NODE_H / 2],
    });
  }

  // Method pills
  interface MethodPillPos {
    name: string;
    status: Status;
    className: string;
    x: number;
    y: number;
    parentX: number;
    parentY: number;
  }
  const methodPills: MethodPillPos[] = [];

  nodes.forEach((n) => {
    if (!expanded[n.name]) return;
    const cls = hierarchy[n.name];
    if (!cls || cls.methods.length === 0) return;
    const startX = n.x + NODE_W / 2 - METHOD_W / 2;
    const startY = n.y + NODE_H + PILL_TOP_GAP;
    cls.methods.forEach((m, i) => {
      methodPills.push({
        name: m.name,
        status: m.status,
        className: n.name,
        x: startX,
        y: startY + i * (METHOD_H + METHOD_GAP),
        parentX: n.x + NODE_W / 2,
        parentY: n.y + NODE_H,
      });
    });
  });

  const allX = [
    ...nodes.map((n) => n.x),
    ...nodes.map((n) => n.x + NODE_W),
    ...methodPills.map((m) => m.x),
    ...methodPills.map((m) => m.x + METHOD_W),
  ];
  const allY = [
    ...nodes.map((n) => n.y),
    ...nodes.map((n) => n.y + NODE_H),
    ...methodPills.map((m) => m.y),
    ...methodPills.map((m) => m.y + METHOD_H),
  ];
  const minX = Math.min(...allX) - PAD;
  const maxX = Math.max(...allX) + PAD;
  const minY = Math.min(...allY) - PAD - 10;
  const maxY = Math.max(...allY) + PAD;
  const vbW = maxX - minX;
  const vbH = maxY - minY;

  return (
    <div className="relative">
      <div className="text-text-3 text-[9px] font-mono text-center mb-1">
        Click class to expand -- double-click to jump to code
      </div>
      <svg viewBox={`${minX} ${minY} ${vbW} ${vbH}`} className="w-full" style={{ height: 240 }}>
        {/* Section label */}
        {mroNames.length > 1 && (
          <text
            x={cursorX - (NODE_W + COL_GAP) / 2}
            y={cursorY - 10}
            textAnchor="middle"
            className="fill-text-3"
            style={{ fontSize: 8, fontFamily: "monospace" }}
          >
            Ancestors (MRO)
          </text>
        )}

        {/* Edges */}
        {edges.map((e, i) => {
          const dx = (e.to[0] - e.from[0]) * 0.5;
          return (
            <path
              key={`edge-${i}`}
              d={`M${e.from[0]} ${e.from[1]} C${e.from[0] + dx} ${e.from[1]} ${e.to[0] - dx} ${e.to[1]} ${e.to[0]} ${e.to[1]}`}
              fill="none"
              stroke="#5B6AF0"
              strokeWidth={1.5}
              opacity={0.5}
            />
          );
        })}

        {/* Method connector lines */}
        {methodPills.map((m, i) => (
          <line
            key={`mline-${i}`}
            x1={m.parentX}
            y1={m.parentY}
            x2={m.x + METHOD_W / 2}
            y2={m.y + METHOD_H / 2}
            stroke="#2D3148"
            strokeWidth={1}
          />
        ))}

        {/* Class nodes */}
        {nodes.map((n) => (
          <g
            key={n.name}
            className="cursor-pointer"
            onClick={() => onToggle(n.name)}
            onDoubleClick={() => onClassClick(n.name)}
          >
            <rect
              x={n.x}
              y={n.y}
              width={NODE_W}
              height={NODE_H}
              rx={6}
              fill={n.isCursor ? "#5B6AF0" : "#252840"}
              stroke={n.isCursor ? "#5B6AF0" : expanded[n.name] ? "#5B6AF0" : "#2D3148"}
              strokeWidth={n.isCursor ? 2 : 1}
            />
            <text
              x={n.x + NODE_W / 2}
              y={n.y + NODE_H / 2 + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fill={n.isCursor ? "#fff" : "#E2E8F0"}
              style={{ fontSize: 9, fontFamily: "monospace", fontWeight: 600 }}
            >
              {n.name}
            </text>
            {hierarchy[n.name]?.methods.length > 0 && (
              <text
                x={n.x + NODE_W - 8}
                y={n.y + NODE_H / 2 + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={n.isCursor ? "rgba(255,255,255,0.6)" : "#6B7280"}
                style={{ fontSize: 7 }}
              >
                {expanded[n.name] ? "\u25BC" : "\u25B6"}
              </text>
            )}
          </g>
        ))}

        {/* Method pills */}
        {methodPills.map((m, i) => (
          <g
            key={`pill-${i}`}
            className="cursor-pointer"
            onClick={() => onMethodClick(m.className, m.name)}
          >
            <rect
              x={m.x}
              y={m.y}
              width={METHOD_W}
              height={METHOD_H}
              rx={4}
              fill={statusBg(m.status)}
              stroke={statusColor(m.status)}
              strokeWidth={0.5}
              opacity={0.9}
            />
            <text
              x={m.x + METHOD_W / 2}
              y={m.y + METHOD_H / 2 + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fill={statusColor(m.status)}
              style={{ fontSize: 8, fontFamily: "monospace" }}
            >
              {m.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// --- Text tree ---

function TextTreeView({
  mroNames,
  cursorClass,
  expanded,
  onToggle,
  onClassClick,
  onMethodClick,
}: {
  mroNames: string[];
  cursorClass: string;
  expanded: Record<string, boolean>;
  onToggle: (name: string) => void;
  onClassClick: (name: string) => void;
  onMethodClick: (cls: string, method: string) => void;
}) {
  return (
    <div className="font-mono text-xs leading-6 px-1">
      <div className="text-text-3 text-[9px] uppercase tracking-wider mb-2">
        Hierarchy (MRO)
      </div>
      {mroNames.map((name, i) => {
        const cls = hierarchy[name];
        if (!cls) return null;
        const isCursor = name === cursorClass;
        const isExp = expanded[name];
        const indent = Array.from({ length: i }, () => "\u2502  ").join("");
        const connector =
          i === 0 ? "" : i === mroNames.length - 1 ? "\u2514\u2500 " : "\u251C\u2500 ";

        return (
          <React.Fragment key={name}>
            <div
              className={`flex items-center gap-1 cursor-pointer hover:bg-surface-2/50 rounded px-1 -mx-1 ${
                isCursor ? "text-prism-purple font-bold" : "text-text"
              }`}
              onClick={() => onToggle(name)}
              onDoubleClick={() => onClassClick(name)}
            >
              <span className="text-text-3 select-none whitespace-pre">
                {indent}
                {connector}
              </span>
              {cls.methods.length > 0 && (
                <span className="text-text-3 select-none w-3">
                  {isExp ? "\u25BC" : "\u25B6"}
                </span>
              )}
              <span className={isCursor ? "text-prism-purple" : "text-text"}>
                {name}
              </span>
              {cls.methods.length > 0 && !isExp && (
                <span className="text-text-3 ml-1 text-[10px]">
                  {cls.methods.length} methods
                </span>
              )}
            </div>
            <AnimatePresence>
              {isExp &&
                cls.methods.map((m, mi) => {
                  const methodIndent =
                    indent + (i === mroNames.length - 1 ? "   " : "\u2502  ");
                  const mConnector =
                    mi === cls.methods.length - 1 ? "\u2514\u2500 " : "\u251C\u2500 ";
                  return (
                    <motion.div
                      key={`${name}-${m.name}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-1 px-1 -mx-1 cursor-pointer hover:bg-surface-2/50 rounded"
                      onClick={() => onMethodClick(name, m.name)}
                    >
                      <span className="text-text-3 select-none whitespace-pre">
                        {methodIndent}
                        {mConnector}
                      </span>
                      <span style={{ color: statusColor(m.status) }}>
                        {m.name}
                      </span>
                      <span
                        className="text-[9px] ml-1"
                        style={{ color: statusColor(m.status), opacity: 0.7 }}
                      >
                        {m.status}
                      </span>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </React.Fragment>
        );
      })}
      <div className="text-text-3 text-[9px] font-mono mt-3">
        Click to expand -- double-click class to jump -- click method to jump
      </div>
    </div>
  );
}

// --- Radial view ---

function RadialView({
  mroNames,
  cursorClass,
  onClassClick,
  onMethodClick,
}: {
  mroNames: string[];
  cursorClass: string;
  onClassClick: (name: string) => void;
  onMethodClick: (cls: string, method: string) => void;
}) {
  const innerR = 35;
  const ringStep = 45;
  const W = 280;
  const H = 280;
  const cx = W / 2;
  const cy = H / 2;

  function pt(r: number, angleDeg: number) {
    const a = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 240 }}>
        {/* Concentric rings */}
        {mroNames.slice(1).map((_, i) => {
          const r = innerR + (i + 1) * ringStep;
          return (
            <circle
              key={`ring-${i}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#2D3148"
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.5}
            />
          );
        })}

        {/* Center class */}
        <g className="cursor-pointer" onClick={() => onClassClick(cursorClass)}>
          <circle cx={cx} cy={cy} r={innerR - 6} fill="#5B6AF0" opacity={0.15} />
          <circle cx={cx} cy={cy} r={innerR - 6} fill="none" stroke="#5B6AF0" strokeWidth={1.5} />
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#5B6AF0"
            style={{ fontSize: 7, fontFamily: "monospace", fontWeight: 700 }}
          >
            {cursorClass.length > 14 ? cursorClass.slice(0, 12) + ".." : cursorClass}
          </text>
        </g>

        {/* Ring labels */}
        {mroNames.slice(1).map((name, i) => {
          const r = innerR + (i + 1) * ringStep;
          const pos = pt(r, 0);
          return (
            <text
              key={`label-${name}`}
              x={pos.x}
              y={pos.y - 5}
              textAnchor="middle"
              fill="#6B7280"
              style={{ fontSize: 6, fontFamily: "monospace" }}
              className="cursor-pointer"
              onClick={() => onClassClick(name)}
            >
              {name.length > 16 ? name.slice(0, 14) + ".." : name}
            </text>
          );
        })}

        {/* Method dots */}
        {mroNames.map((className, ringIdx) => {
          const r = ringIdx === 0 ? innerR - 6 : innerR + ringIdx * ringStep;
          const cls = hierarchy[className];
          if (!cls) return null;
          const angleStep = cls.methods.length > 0 ? 360 / cls.methods.length : 0;
          const startAngle = ringIdx === 0 ? 180 : 30 + ringIdx * 15;

          return cls.methods.map((m, mi) => {
            const angle = startAngle + mi * angleStep;
            const pos = pt(r, angle);
            const color = statusColor(m.status);
            return (
              <g
                key={`dot-${className}-${m.name}`}
                className="cursor-pointer"
                onClick={() => onMethodClick(className, m.name)}
              >
                <circle cx={pos.x} cy={pos.y} r={4} fill={color} opacity={0.8} />
                {ringIdx > 0 && (
                  <text
                    x={pos.x}
                    y={pos.y + 10}
                    textAnchor="middle"
                    fill={color}
                    style={{ fontSize: 5.5, fontFamily: "monospace" }}
                  >
                    {m.name.length > 16 ? m.name.slice(0, 14) + ".." : m.name}
                  </text>
                )}
              </g>
            );
          });
        })}

        {/* Legend */}
        {(["owns", "overrides", "overridden", "shadowed"] as Status[]).map((s, i) => (
          <g key={`legend-${s}`}>
            <circle cx={10} cy={H - 44 + i * 11} r={3} fill={statusColor(s)} />
            <text
              x={18}
              y={H - 44 + i * 11 + 1}
              dominantBaseline="central"
              fill="#6B7280"
              style={{ fontSize: 6, fontFamily: "monospace" }}
            >
              {s}
            </text>
          </g>
        ))}
      </svg>
      <div className="text-text-3 text-[9px] font-mono text-center mt-1">
        Click a dot or label to jump to code
      </div>
    </div>
  );
}
