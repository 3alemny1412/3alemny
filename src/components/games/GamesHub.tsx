import Link from "next/link";
import gamesData from "@/data/games.json";

const skins: Record<string, string> = {
  "spot-the-slop": "border-slang/40 hover:border-slang",
  "next-token": "border-accent/40 hover:border-accent",
  "script-or-agent": "border-core/40 hover:border-core",
};

export function GamesHub() {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {gamesData.games.map((g) => (
        <Link
          key={g.id}
          href={`/games/${g.id}`}
          className={`rounded-card border bg-surface p-5 transition-colors duration-hover hover:bg-surface-2 ${skins[g.id] ?? "border-border"}`}
        >
          <p className="text-caption font-semibold text-ink-muted">{g.track}</p>
          <h2 className="mt-1 text-h3 text-ink">{g.title}</h2>
          <p className="mt-2 text-caption text-ink-muted">{g.goal}</p>
        </Link>
      ))}
    </div>
  );
}
