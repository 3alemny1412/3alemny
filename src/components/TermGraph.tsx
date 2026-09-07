"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { buildGraph, type GraphNode } from "@/lib/graph";

const W = 720;
const H = 520;

export function TermGraph() {
  const { nodes, edges } = useMemo(() => buildGraph(W, H), []);
  const byId = useMemo(() => {
    const m = new Map<string, GraphNode>();
    nodes.forEach((n) => m.set(n.id, n));
    return m;
  }, [nodes]);
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const selected = active ? byId.get(active) : null;
  const focus = hover ?? active;

  return (
    <div className="relative flex min-h-[560px] flex-col gap-4 lg:flex-row">
      <div className="flex-1 overflow-hidden rounded-card border border-border bg-bg">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full touch-pan-y"
          role="img"
          aria-label="Term relations graph"
        >
          {edges.map((e) => {
            const a = byId.get(e.from);
            const b = byId.get(e.to);
            if (!a || !b) return null;
            const lit =
              focus && (e.from === focus || e.to === focus);
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={lit ? "#E8FF47" : "#2A2A2E"}
                strokeWidth={lit ? 2 : 1}
              />
            );
          })}
          {nodes.map((n) => {
            const fill = n.track === "core" ? "#5EEAD4" : "#FB7185";
            const on = focus === n.id;
            return (
              <g
                key={n.id}
                transform={`translate(${n.x}, ${n.y})`}
                className="cursor-pointer"
                onClick={() => setActive(n.id)}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
              >
                <circle
                  r={on ? 16 : 12}
                  fill={fill}
                  opacity={on ? 1 : 0.85}
                  stroke={on ? "#E8FF47" : "transparent"}
                  strokeWidth={2}
                />
                <text
                  y={28}
                  textAnchor="middle"
                  className="fill-ink text-[10px]"
                  fill="#F4F4F5"
                  fontSize={10}
                >
                  {n.term}
                </text>
              </g>
            );
          })}
        </svg>
        {!selected && (
          <p className="px-4 pb-4 text-center text-caption text-ink-muted">
            Pick a node.
          </p>
        )}
      </div>

      <aside className="w-full rounded-card border border-border bg-surface p-5 lg:w-80">
        {selected ? (
          <>
            <p
              className={`inline-flex rounded-chip px-2 py-0.5 text-caption font-semibold ${
                selected.track === "core"
                  ? "bg-core/15 text-core"
                  : "bg-slang/15 text-slang"
              }`}
            >
              {selected.track === "core" ? "Core" : "Slang"}
            </p>
            <h2 className="mt-3 text-h2 text-ink">{selected.term}</h2>
            <p className="mt-2 text-body text-ink-muted">{selected.plain_def}</p>
            <Link
              href={`/lessons/${selected.id}`}
              className="mt-6 inline-flex rounded-pill bg-accent px-4 py-2 text-caption font-semibold text-accent-ink"
            >
              Open lesson
            </Link>
          </>
        ) : (
          <p className="text-body text-ink-muted">Pick a node.</p>
        )}
      </aside>
    </div>
  );
}
