"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

export type Point = { x: number; y: number };

export function useDiagramActive() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px 0px -100px 0px" });
  const reduced = useReducedMotion();
  return { ref, active: inView && !reduced };
}

export function elbowPath(from: Point, to: Point): string {
  if (Math.abs(from.x - to.x) < 1) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }
  const midY = from.y + (to.y - from.y) * 0.55;
  return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
}

export function supportsOffsetPath(): boolean {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  try {
    return CSS.supports('offset-path: path("M0 0 L1 1")');
  } catch {
    return false;
  }
}

export function DiagramCanvas({
  viewBox = "0 0 640 380",
  children,
  caption,
}: {
  viewBox?: string;
  children: ReactNode;
  caption?: string;
}) {
  return (
    <div className="rounded-lg border border-wire bg-surface p-4">
      <svg
        viewBox={viewBox}
        className="w-full"
        role="img"
        aria-label={caption ?? "Architecture diagram"}
      >
        <defs>
          <pattern id="diagram-dots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--wire)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagram-dots)" />
        {children}
      </svg>
      {caption && (
        <p className="mt-3 text-center font-mono text-xs text-ink-faint">{caption}</p>
      )}
    </div>
  );
}

export function Edge({
  from,
  to,
  dashed = false,
  reveal = true,
}: {
  from: Point;
  to: Point;
  dashed?: boolean;
  reveal?: boolean;
}) {
  const d = elbowPath(from, to);
  return (
    <m.path
      d={d}
      fill="none"
      style={{ stroke: "var(--ink-faint)" }}
      strokeWidth={1.75}
      strokeDasharray={dashed ? "4 4" : undefined}
      initial={reveal ? { pathLength: 0, opacity: 0 } : undefined}
      whileInView={reveal ? { pathLength: 1, opacity: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    />
  );
}

export function Node({
  x,
  y,
  width = 128,
  height = 46,
  label,
  sublabel,
  active = false,
  alert = false,
  fontSize = 11.5,
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  label: string;
  sublabel?: string;
  active?: boolean;
  alert?: boolean;
  fontSize?: number;
}) {
  const strokeColor = alert
    ? "var(--accent-alert)"
    : active
      ? "var(--accent-signal)"
      : "var(--wire-strong)";

  return (
    <g>
      <m.rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx={8}
        style={{ fill: "var(--bg-surface-raised)" }}
        initial={{ stroke: strokeColor }}
        animate={{ stroke: strokeColor }}
        strokeWidth={1.5}
        transition={{ duration: 0.4 }}
      />
      <text
        x={x}
        y={sublabel ? y - 4 : y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontFamily="var(--font-mono), ui-monospace, monospace"
        style={{ fill: "var(--ink-primary)" }}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x}
          y={y + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={9.5}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          style={{ fill: "var(--ink-faint)" }}
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

export function PacketDot({
  from,
  to,
  duration = 1.6,
  delay = 0,
  repeat = 0,
  repeatDelay = 0,
  color = "var(--accent-signal)",
  active = true,
}: {
  from: Point;
  to: Point;
  duration?: number;
  delay?: number;
  repeat?: number;
  repeatDelay?: number;
  color?: string;
  active?: boolean;
}) {
  if (!active) return null;
  const d = elbowPath(from, to);
  const offsetSupported = supportsOffsetPath();

  if (!offsetSupported) {
    return (
      <m.circle
        cx={to.x}
        cy={to.y}
        r={4}
        style={{ fill: color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration, delay, repeat, repeatDelay, ease: "easeInOut" }}
      />
    );
  }

  return (
    <m.circle
      r={4}
      style={{ fill: color, offsetPath: `path("${d}")`, offsetRotate: "0deg" }}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat, repeatDelay, ease: "linear" }}
    />
  );
}
