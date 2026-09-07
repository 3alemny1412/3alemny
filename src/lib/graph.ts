import coreLessons from "@/data/core-lessons.json";
import slangLessons from "@/data/slang-lessons.json";

export type GraphNode = {
  id: string;
  term: string;
  plain_def: string;
  track: "core" | "slang";
  x: number;
  y: number;
};

export type GraphEdge = { from: string; to: string };

export function buildGraph(width: number, height: number) {
  const core = coreLessons.lessons.map((l) => ({
    id: l.id,
    term: l.term,
    plain_def: l.plain_def,
    related: l.related as string[],
    track: "core" as const,
  }));
  const slang = slangLessons.lessons.map((l) => ({
    id: l.id,
    term: l.term,
    plain_def: l.plain_def,
    related: l.related as string[],
    track: "slang" as const,
  }));
  const all = [...core, ...slang];
  const ids = new Set(all.map((n) => n.id));

  const nodes: GraphNode[] = all.map((n, i) => {
    const ring = n.track === "core" ? 0 : 1;
    const group = all.filter((x) => x.track === n.track);
    const idx = group.findIndex((x) => x.id === n.id);
    const count = group.length || 1;
    const angle = (Math.PI * 2 * idx) / count - Math.PI / 2;
    const cx = width / 2;
    const cy = height / 2;
    const r = ring === 0 ? Math.min(width, height) * 0.28 : Math.min(width, height) * 0.42;
    return {
      id: n.id,
      term: n.term,
      plain_def: n.plain_def,
      track: n.track,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  });

  const edgeKeys = new Set<string>();
  const edges: GraphEdge[] = [];
  for (const n of all) {
    for (const r of n.related) {
      if (!ids.has(r)) continue;
      const a = n.id < r ? n.id : r;
      const b = n.id < r ? r : n.id;
      const key = `${a}→${b}`;
      if (edgeKeys.has(key)) continue;
      edgeKeys.add(key);
      edges.push({ from: a, to: b });
    }
  }

  return { nodes, edges };
}
