import Link from "next/link";

type LessonCardProps = {
  id: string;
  term: string;
  plainDef: string;
  track: "core" | "slang";
};

export function LessonCard({ id, term, plainDef, track }: LessonCardProps) {
  const chip =
    track === "core"
      ? "bg-core/15 text-core"
      : "bg-slang/15 text-slang text-[0.95em]";

  return (
    <Link
      href={`/lessons/${id}`}
      className="block rounded-card border border-border bg-surface p-4 transition-colors duration-hover hover:bg-surface-2"
    >
      <span
        className={`mb-2 inline-flex rounded-chip px-2 py-0.5 text-caption font-semibold ${chip}`}
      >
        {track === "core" ? "Core" : "Slang"}
      </span>
      <h3 className="text-h3 text-ink">{term}</h3>
      <p className="mt-1 line-clamp-2 text-caption text-ink-muted">{plainDef}</p>
    </Link>
  );
}
