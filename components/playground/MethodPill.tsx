"use client";

import { type Status, statusMeta } from "@/data/scenarios";

interface MethodPillProps {
  name: string;
  status: Status;
  isCursor: boolean;
  onClick?: () => void;
}

export function MethodPill({ name, status, isCursor, onClick }: MethodPillProps) {
  const meta = statusMeta[status];

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[11px]
        border transition-all duration-200
        ${meta.bgClass} ${meta.textClass} ${meta.borderClass}
        ${isCursor ? "ring-1 ring-offset-1 ring-offset-bg font-semibold" : "opacity-80"}
        hover:opacity-100 hover:scale-105
      `}
    >
      {status === "shadowed" && <span className="text-[9px]">&#9873;</span>}
      {name}
      <span className="text-[9px] opacity-60">{meta.label.toLowerCase()}</span>
    </button>
  );
}
