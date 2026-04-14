"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Radial hierarchy view — matches the actual PRISM extension's render-radial.ts:
 * - Polar coordinate system with cursor class at center
 * - Concentric dashed rings for each MRO ancestor
 * - Method dots distributed around rings, color-coded by status
 * - Toolbar: zoom in/out, fit, focus
 * - Legend strip at bottom
 * - Pan & zoom with mouse drag + ctrl+wheel
 */

interface Method {
  name: string;
  defined_in: string;
  status: "owns" | "overrides" | "overridden" | "shadowed";
}

interface MROEntry {
  name: string;
  file: string;
  line: number;
}

const mroChain: MROEntry[] = [
  { name: "DeepSpeedEstimator", file: "src/models/deepspeed.py", line: 5 },
  { name: "LightningTrainer", file: "src/models/lightning.py", line: 8 },
  { name: "DLEstimatorBase", file: "src/models/base.py", line: 1 },
];

const methods: Method[] = [
  {
    name: "setup_dataloader",
    defined_in: "DeepSpeedEstimator",
    status: "overrides",
  },
  {
    name: "__init__",
    defined_in: "DeepSpeedEstimator",
    status: "owns",
  },
  {
    name: "configure_optimizers",
    defined_in: "LightningTrainer",
    status: "overrides",
  },
  {
    name: "on_train_start",
    defined_in: "LightningTrainer",
    status: "owns",
  },
  {
    name: "setup_dataloader",
    defined_in: "DLEstimatorBase",
    status: "shadowed",
  },
  {
    name: "configure_optimizers",
    defined_in: "DLEstimatorBase",
    status: "shadowed",
  },
  { name: "train", defined_in: "DLEstimatorBase", status: "owns" },
  {
    name: "validate",
    defined_in: "DLEstimatorBase",
    status: "owns",
  },
];

const STATUS_COLORS: Record<string, string> = {
  owns: "rgb(var(--prism-green))",
  overrides: "rgb(var(--prism-amber))",
  overridden: "rgb(var(--prism-purple))",
  shadowed: "rgb(var(--prism-red))",
};

const STATUS_LABELS: Record<string, string> = {
  owns: "Owns",
  overrides: "Overrides",
  overridden: "Overridden",
  shadowed: "Shadowed",
};

// Layout constants — match the extension
const INNER_R = 50;
const RING_STEP = 56;
const OUTER_MARGIN = 40;

function pt(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): { x: number; y: number } {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

export function RadialDemo() {
  const [hoveredDot, setHoveredDot] = useState<{
    method: string;
    definedIn: string;
  } | null>(null);
  const [viewport, setViewport] = useState({ tx: 0, ty: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const ancestorCount = mroChain.length - 1;
  const computedR = INNER_R + ancestorCount * RING_STEP + OUTER_MARGIN;
  const W = Math.max(280, computedR * 2);
  const H = W;
  const cx = W / 2;
  const cy = H / 2;

  // Mouse handlers for pan
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        tx: viewport.tx,
        ty: viewport.ty,
      };
      setIsDragging(true);
    },
    [viewport]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setViewport((v) => ({
        ...v,
        tx: dragStart.current!.tx + dx / v.scale,
        ty: dragStart.current!.ty + dy / v.scale,
      }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStart.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      setViewport((v) => ({
        ...v,
        scale: Math.min(3, Math.max(0.4, v.scale * factor)),
      }));
    }
  }, []);

  // Toolbar actions
  const zoomIn = () =>
    setViewport((v) => ({ ...v, scale: Math.min(3, v.scale * 1.2) }));
  const zoomOut = () =>
    setViewport((v) => ({ ...v, scale: Math.max(0.4, v.scale / 1.2) }));
  const fit = () => setViewport({ tx: 0, ty: 0, scale: 1 });
  const focus = () => setViewport({ tx: 0, ty: 0, scale: 1.4 });

  // Build SVG elements
  const rings = useMemo(() => {
    const elements: React.ReactElement[] = [];

    // Concentric rings for ancestors
    for (let i = 1; i < mroChain.length; i++) {
      const r = INNER_R + i * RING_STEP;
      elements.push(
        <circle
          key={`ring-${i}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#2D3148"
          strokeWidth={1}
          strokeDasharray="2 3"
          opacity={0.6}
        />
      );
    }

    return elements;
  }, [cx, cy]);

  const centerNode = useMemo(() => {
    const center = mroChain[0];
    return (
      <g>
        {/* Center circle with glow */}
        <circle
          cx={cx}
          cy={cy}
          r={INNER_R}
          fill="rgba(91, 106, 240, 0.15)"
          stroke="#5B6AF0"
          strokeWidth={1.5}
        />
        {/* Class name */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fill="#5B6AF0"
          fontSize={11}
          fontFamily="monospace"
          fontWeight="bold"
          className="cursor-pointer"
        >
          {center.name}
        </text>
        {/* "cursor class" sub-label */}
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fill="#4B5563"
          fontSize={8}
          fontFamily="monospace"
        >
          cursor class
        </text>
      </g>
    );
  }, [cx, cy]);

  const methodDots = useMemo(() => {
    const elements: React.ReactElement[] = [];
    const cursorMethod = "setup_dataloader";

    // Center class methods
    const centerMethods = methods.filter(
      (m) => m.defined_in === mroChain[0].name
    );
    centerMethods.forEach((m, idx) => {
      const angle = (idx / Math.max(1, centerMethods.length)) * 360;
      const p = pt(cx, cy, INNER_R + 14, angle);
      const isCursor = m.name === cursorMethod;
      const color = STATUS_COLORS[m.status];

      elements.push(
        <g
          key={`dot-center-${m.name}`}
          onMouseEnter={() =>
            setHoveredDot({ method: m.name, definedIn: m.defined_in })
          }
          onMouseLeave={() => setHoveredDot(null)}
          className="cursor-pointer"
        >
          <circle
            cx={p.x}
            cy={p.y}
            r={5}
            fill={m.status === "shadowed" ? `${color}26` : color}
            stroke={isCursor ? "#5B6AF0" : m.status === "shadowed" ? color : "none"}
            strokeWidth={isCursor ? 2.5 : m.status === "shadowed" ? 1 : 0}
            strokeDasharray={m.status === "shadowed" ? "2 1" : "none"}
            opacity={0.9}
          />
          {/* Label */}
          {(centerMethods.length <= 8 || isCursor) && (
            <>
              <text
                x={pt(cx, cy, INNER_R + 26, angle).x}
                y={pt(cx, cy, INNER_R + 26, angle).y + 3}
                textAnchor={angle > 180 ? "end" : "start"}
                fill={isCursor ? "#5B6AF0" : "#6B7280"}
                fontSize={8}
                fontFamily="monospace"
              >
                {m.name}
              </text>
              {isCursor && (
                <text
                  x={pt(cx, cy, INNER_R + 26, angle).x}
                  y={pt(cx, cy, INNER_R + 26, angle).y + 14}
                  textAnchor={angle > 180 ? "end" : "start"}
                  fill="#5B6AF0"
                  fontSize={7}
                  fontFamily="monospace"
                  fontStyle="italic"
                >
                  cursor method
                </text>
              )}
            </>
          )}
        </g>
      );
    });

    // Ancestor ring methods
    for (let i = 1; i < mroChain.length; i++) {
      const cls = mroChain[i];
      const r = INNER_R + i * RING_STEP;
      const cm = methods.filter((m) => m.defined_in === cls.name);

      // Class label at top of ring
      elements.push(
        <text
          key={`label-${cls.name}`}
          x={pt(cx, cy, r, 0).x}
          y={pt(cx, cy, r, 0).y - 6}
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize={10}
          fontFamily="monospace"
          fontWeight="bold"
          className="cursor-pointer"
        >
          {cls.name}
        </text>
      );

      cm.forEach((m, idx) => {
        const span = 310;
        const start = 25;
        const angle =
          cm.length === 1 ? 180 : start + (idx / (cm.length - 1)) * span;
        const p = pt(cx, cy, r, angle);
        const isCursor = m.name === cursorMethod && cls.name === mroChain[0].name;
        const color = STATUS_COLORS[m.status];
        const showLabels = cm.length <= 10;

        elements.push(
          <g
            key={`dot-${cls.name}-${m.name}`}
            onMouseEnter={() =>
              setHoveredDot({ method: m.name, definedIn: cls.name })
            }
            onMouseLeave={() => setHoveredDot(null)}
            className="cursor-pointer"
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={5}
              fill={m.status === "shadowed" ? `${color}26` : color}
              stroke={m.status === "shadowed" ? color : "none"}
              strokeWidth={m.status === "shadowed" ? 1 : 0}
              strokeDasharray={m.status === "shadowed" ? "2 1" : "none"}
              opacity={0.9}
            />
            {(showLabels || isCursor) && (
              <text
                x={pt(cx, cy, r + 12, angle).x}
                y={pt(cx, cy, r + 12, angle).y + 3}
                textAnchor={angle > 180 ? "end" : "start"}
                fill="#6B7280"
                fontSize={8}
                fontFamily="monospace"
              >
                {m.name}
              </text>
            )}
          </g>
        );
      });
    }

    return elements;
  }, [cx, cy]);

  return (
    <div>
      <div className="dark rounded-lg border border-border-2 overflow-hidden bg-[#0d0f1a]">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1d2e] border-b border-border-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-prism-red/70" />
              <div className="w-3 h-3 rounded-full bg-prism-amber/70" />
              <div className="w-3 h-3 rounded-full bg-prism-green/70" />
            </div>
            <span className="text-text-3 text-xs font-mono ml-2">
              PRISM &mdash; Radial View
            </span>
          </div>
        </div>

        {/* SVG Canvas + Toolbar */}
        <div className="relative p-2">
          {/* Toolbar */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1">
            <button
              onClick={zoomOut}
              className="w-7 h-7 flex items-center justify-center rounded text-text-3 hover:text-text bg-[#1a1d2e] border border-border-2 text-xs font-mono"
              title="Zoom out"
            >
              -
            </button>
            <button
              onClick={zoomIn}
              className="w-7 h-7 flex items-center justify-center rounded text-text-3 hover:text-text bg-[#1a1d2e] border border-border-2 text-xs font-mono"
              title="Zoom in"
            >
              +
            </button>
            <button
              onClick={fit}
              className="h-7 px-2 flex items-center justify-center rounded text-text-3 hover:text-text bg-[#1a1d2e] border border-border-2 text-[10px] font-mono"
              title="Reset view"
            >
              Fit
            </button>
            <button
              onClick={focus}
              className="h-7 px-2 flex items-center justify-center rounded text-text-3 hover:text-text bg-[#1a1d2e] border border-border-2 text-[10px] font-mono"
              title="Center on cursor class"
            >
              Focus
            </button>
          </div>

          <motion.svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto select-none"
            style={{ maxHeight: 420, cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <g
              transform={`translate(${viewport.tx} ${viewport.ty}) scale(${viewport.scale})`}
            >
              {rings}
              {centerNode}
              {methodDots}
            </g>
          </motion.svg>

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoveredDot && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute bottom-4 left-4 bg-[#252840] border border-border-2 rounded px-3 py-2 font-mono text-xs flex items-center gap-2"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background:
                      STATUS_COLORS[
                        methods.find(
                          (m) =>
                            m.name === hoveredDot.method &&
                            m.defined_in === hoveredDot.definedIn
                        )?.status || "owns"
                      ],
                  }}
                />
                <span className="text-text">
                  {hoveredDot.definedIn}.{hoveredDot.method}
                </span>
                <span className="text-text-3">
                  (
                  {
                    STATUS_LABELS[
                      methods.find(
                        (m) =>
                          m.name === hoveredDot.method &&
                          m.defined_in === hoveredDot.definedIn
                      )?.status || "owns"
                    ]
                  }
                  )
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border-2 bg-[#1a1d2e]">
          {Object.entries(STATUS_COLORS).map(([status, color]) => (
            <div key={status} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: color }}
              />
              <span className="text-text-3 text-[10px] font-mono">
                {STATUS_LABELS[status]}
              </span>
            </div>
          ))}
          <span className="ml-auto text-text-3 text-[10px] font-mono hidden sm:inline">
            Click class/dot to zoom &middot; Ctrl+wheel to zoom &middot; drag
            to pan
          </span>
        </div>
      </div>

      <p className="mt-4 text-text-3 font-sans text-xs">
        The radial view arranges classes by MRO distance from the cursor class
        at center. Method dots are positioned around concentric rings, colored by
        status. Available in the extension&apos;s Graph tab.
      </p>
    </div>
  );
}
