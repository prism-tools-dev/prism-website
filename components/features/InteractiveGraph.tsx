"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { statusMeta, type Status } from "@/data/scenarios";

// --- Data types ---

interface ClassNode {
  name: string;
  file: string;
  line: number;
  methods: { name: string; status: Status }[];
  children?: string[];
}

// Pre-built hierarchy matching the PRISM extension's PyTorch Lightning demo
const hierarchy: Record<string, ClassNode> = {
  DLEstimatorBase: {
    name: "DLEstimatorBase",
    file: "base.py",
    line: 1,
    methods: [
      { name: "setup_dataloader", status: "shadowed" },
      { name: "configure_optimizers", status: "shadowed" },
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

const mroChain = ["DeepSpeedEstimator", "LightningTrainer", "DLEstimatorBase"];
const cursorClass = "DeepSpeedEstimator";

type ViewMode = "mindmap" | "text" | "radial";

// --- Status color helpers ---

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

// --- Mindmap SVG view ---

function MindmapView({
  expanded,
  onToggle,
}: {
  expanded: Record<string, boolean>;
  onToggle: (name: string) => void;
}) {
  // Layout constants matching the actual extension
  const NODE_W = 150;
  const NODE_H = 30;
  const COL_GAP = 60;
  const METHOD_W = 120;
  const METHOD_H = 18;
  const METHOD_GAP = 6;
  const PILL_TOP_GAP = 8;
  const PAD = 30;

  // Cursor class at center (0,0), ancestors to the left
  const cursorX = 0;
  const cursorY = 0;

  interface NodePos {
    name: string;
    x: number;
    y: number;
    isCursor: boolean;
    isDescendant?: boolean;
  }

  const nodes: NodePos[] = [];
  const edges: { from: [number, number]; to: [number, number]; active: boolean }[] = [];

  // Cursor node
  nodes.push({ name: cursorClass, x: cursorX, y: cursorY, isCursor: true });

  // Ancestors to the left (mroChain[1], mroChain[2], ...)
  for (let i = 1; i < mroChain.length; i++) {
    const x = cursorX - i * (NODE_W + COL_GAP);
    nodes.push({ name: mroChain[i], x, y: cursorY, isCursor: false });
    edges.push({
      from: [x + NODE_W, cursorY + NODE_H / 2],
      to: [x + NODE_W + COL_GAP, cursorY + NODE_H / 2],
      active: true,
    });
  }

  // Method pills for expanded nodes
  interface MethodPill {
    name: string;
    status: Status;
    x: number;
    y: number;
    parentX: number;
    parentY: number;
  }
  const methodPills: MethodPill[] = [];

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
        x: startX,
        y: startY + i * (METHOD_H + METHOD_GAP),
        parentX: n.x + NODE_W / 2,
        parentY: n.y + NODE_H,
      });
    });
  });

  // Compute viewBox
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
      <div className="text-text-3 text-[10px] font-mono text-center mb-2">
        Ctrl+scroll to zoom -- drag to pan -- click a class to expand
      </div>
      <svg
        viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
        className="w-full"
        style={{ height: 280 }}
      >
        {/* Section labels */}
        {mroChain.length > 1 && (
          <text
            x={cursorX - (NODE_W + COL_GAP) / 2}
            y={cursorY - 12}
            textAnchor="middle"
            className="fill-text-3"
            style={{ fontSize: 9, fontFamily: "monospace" }}
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
              stroke={e.active ? "#5B6AF0" : "#2D3148"}
              strokeWidth={1.5}
              opacity={0.6}
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
              style={{ fontSize: 10, fontFamily: "monospace", fontWeight: 600 }}
            >
              {n.name}
            </text>
            {/* Expand indicator */}
            {hierarchy[n.name]?.methods.length > 0 && (
              <text
                x={n.x + NODE_W - 8}
                y={n.y + NODE_H / 2 + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={n.isCursor ? "rgba(255,255,255,0.6)" : "#6B7280"}
                style={{ fontSize: 8 }}
              >
                {expanded[n.name] ? "\u25BC" : "\u25B6"}
              </text>
            )}
          </g>
        ))}

        {/* Method pills */}
        {methodPills.map((m, i) => (
          <g key={`pill-${i}`}>
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
              style={{ fontSize: 9, fontFamily: "monospace" }}
            >
              {m.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// --- Text tree view (ASCII-style, matching the extension's text mode) ---

function TextTreeView({
  expanded,
  onToggle,
}: {
  expanded: Record<string, boolean>;
  onToggle: (name: string) => void;
}) {
  return (
    <div className="font-mono text-xs leading-6 px-2">
      <div className="text-text-3 text-[10px] uppercase tracking-wider mb-2">
        Ancestors (MRO)
      </div>
      {mroChain.map((name, i) => {
        const cls = hierarchy[name];
        const isCursor = name === cursorClass;
        const isExp = expanded[name];
        const indent = Array.from({ length: i }, () => "\u2502  ").join("");
        const connector =
          i === 0 ? "" : i === mroChain.length - 1 ? "\u2514\u2500 " : "\u251C\u2500 ";

        return (
          <React.Fragment key={name}>
            <div
              className={`flex items-center gap-1 cursor-pointer hover:bg-surface-2/50 rounded px-1 -mx-1 ${
                isCursor ? "text-prism-purple font-bold" : "text-text"
              }`}
              onClick={() => onToggle(name)}
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
                <span className="text-text-3 ml-1">
                  {cls.methods.length} methods
                </span>
              )}
            </div>
            {/* Expanded methods */}
            <AnimatePresence>
              {isExp &&
                cls.methods.map((m, mi) => {
                  const methodIndent =
                    indent +
                    (i === mroChain.length - 1 ? "   " : "\u2502  ");
                  const mConnector =
                    mi === cls.methods.length - 1
                      ? "\u2514\u2500 "
                      : "\u251C\u2500 ";
                  return (
                    <motion.div
                      key={`${name}-${m.name}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-1 px-1 -mx-1"
                    >
                      <span className="text-text-3 select-none whitespace-pre">
                        {methodIndent}
                        {mConnector}
                      </span>
                      <span style={{ color: statusColor(m.status) }}>
                        {m.name}
                      </span>
                      <span
                        className="text-[10px] ml-1"
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
    </div>
  );
}

// --- Radial polar view (concentric rings, matching the extension) ---

function RadialView() {
  const innerR = 40;
  const ringStep = 50;
  const W = 320;
  const H = 320;
  const cx = W / 2;
  const cy = H / 2;

  function pt(r: number, angleDeg: number) {
    const a = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  // All methods across the MRO
  const allMethods = mroChain.flatMap((name) =>
    hierarchy[name].methods.map((m) => ({
      ...m,
      definedIn: name,
    }))
  );

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 280 }}>
        {/* Concentric rings for each ancestor */}
        {mroChain.slice(1).map((_, i) => {
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

        {/* Center class label */}
        <circle cx={cx} cy={cy} r={innerR - 8} fill="#5B6AF0" opacity={0.15} />
        <circle
          cx={cx}
          cy={cy}
          r={innerR - 8}
          fill="none"
          stroke="#5B6AF0"
          strokeWidth={1.5}
        />
        <text
          x={cx}
          y={cy - 3}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#5B6AF0"
          style={{ fontSize: 8, fontFamily: "monospace", fontWeight: 700 }}
        >
          DeepSpeed
        </text>
        <text
          x={cx}
          y={cy + 8}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#5B6AF0"
          style={{ fontSize: 7, fontFamily: "monospace" }}
        >
          Estimator
        </text>

        {/* Ring labels */}
        {mroChain.slice(1).map((name, i) => {
          const r = innerR + (i + 1) * ringStep;
          const pos = pt(r, 0);
          return (
            <text
              key={`label-${name}`}
              x={pos.x}
              y={pos.y - 6}
              textAnchor="middle"
              fill="#6B7280"
              style={{ fontSize: 7, fontFamily: "monospace" }}
            >
              {name.length > 16 ? name.slice(0, 14) + "..." : name}
            </text>
          );
        })}

        {/* Method dots distributed around rings */}
        {mroChain.map((className, ringIdx) => {
          const r = ringIdx === 0 ? innerR - 8 : innerR + ringIdx * ringStep;
          const clsMethods = hierarchy[className].methods;
          const angleStep =
            clsMethods.length > 0 ? 360 / clsMethods.length : 0;
          const startAngle = ringIdx === 0 ? 180 : 30 + ringIdx * 15;

          return clsMethods.map((m, mi) => {
            const angle = startAngle + mi * angleStep;
            const pos = pt(r, angle);
            const color = statusColor(m.status);
            return (
              <g key={`dot-${className}-${m.name}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={5}
                  fill={color}
                  opacity={0.8}
                />
                {/* Label for non-center methods */}
                {ringIdx > 0 && (
                  <text
                    x={pos.x}
                    y={pos.y + 12}
                    textAnchor="middle"
                    fill={color}
                    style={{ fontSize: 6, fontFamily: "monospace" }}
                  >
                    {m.name.length > 18
                      ? m.name.slice(0, 16) + "..."
                      : m.name}
                  </text>
                )}
              </g>
            );
          });
        })}

        {/* Legend */}
        {(["owns", "overrides", "shadowed"] as Status[]).map((s, i) => (
          <g key={`legend-${s}`}>
            <circle
              cx={12}
              cy={H - 36 + i * 12}
              r={3}
              fill={statusColor(s)}
            />
            <text
              x={20}
              y={H - 36 + i * 12 + 1}
              dominantBaseline="central"
              fill="#6B7280"
              style={{ fontSize: 7, fontFamily: "monospace" }}
            >
              {s}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// --- Main component ---

export function InteractiveGraph() {
  const [mode, setMode] = useState<ViewMode>("mindmap");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    DeepSpeedEstimator: true,
  });

  const handleToggle = useCallback((name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const modes: { id: ViewMode; label: string }[] = useMemo(
    () => [
      { id: "mindmap", label: "Mindmap" },
      { id: "text", label: "Text" },
      { id: "radial", label: "Radial" },
    ],
    []
  );

  return (
    <div className="dark border border-border-2 rounded-lg bg-surface-2 overflow-hidden">
      {/* Toolbar matching the extension's mindmap-toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border-2 bg-[#1a1d2e]">
        <div className="flex gap-1">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
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
            {["Fit", "Focus", "Reset"].map((action) => (
              <button
                key={action}
                onClick={() => {
                  if (action === "Reset")
                    setExpanded({ DeepSpeedEstimator: true });
                }}
                className="px-2 py-0.5 rounded text-[10px] font-mono text-text-3 hover:text-text-2 border border-border-2 hover:border-text-3/30 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* View content */}
      <div className="p-4" style={{ minHeight: 300 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {mode === "mindmap" && (
              <MindmapView expanded={expanded} onToggle={handleToggle} />
            )}
            {mode === "text" && (
              <TextTreeView expanded={expanded} onToggle={handleToggle} />
            )}
            {mode === "radial" && <RadialView />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4 text-center">
        <a
          href="/playground"
          className="inline-block font-mono text-[11px] text-prism-purple hover:text-prism-purple/80 transition-colors"
        >
          Try the full interactive playground →
        </a>
      </div>
    </div>
  );
}
