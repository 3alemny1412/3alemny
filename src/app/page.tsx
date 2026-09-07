import Link from "next/link";
import { LessonCard } from "@/components/LessonCard";
import type { LessonsFile } from "@/lib/types";
import coreLessons from "@/data/core-lessons.json";
import slangLessons from "@/data/slang-lessons.json";

function orderedPreviews(file: LessonsFile, track: "core" | "slang") {
  const byId = new Map(file.lessons.map((l) => [l.id, l]));
  return file.unlock_order
    .map((id) => byId.get(id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))
    .map((l) => (
      <LessonCard
        key={l.id}
        id={l.id}
        term={l.term}
        plainDef={l.plain_def}
        track={track}
      />
    ));
}

export default function HomePage() {
  const core = coreLessons as LessonsFile;
  const slang = slangLessons as LessonsFile;

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-16 pt-6">
      <header className="flex items-center justify-between gap-3">
        <span className="text-h3 tracking-tight text-ink">3alemny</span>
        <div className="flex items-center gap-2">
          <Link
            href="/graph"
            className="rounded-pill border border-border bg-surface px-3 py-2 text-caption text-ink hover:bg-surface-2"
          >
            Graph
          </Link>
          <Link
            href="/quiz"
            className="rounded-pill bg-accent px-4 py-2 text-caption font-semibold text-accent-ink transition-colors duration-hover hover:bg-accent/90"
          >
            Placement quiz
          </Link>
        </div>
      </header>

      <section className="mt-16">
        <h1 className="max-w-xl text-display tracking-tight text-ink">
          Learn the terms.{" "}
          <span className="underline decoration-accent decoration-4 underline-offset-8">
            Speak the slang.
          </span>
        </h1>
        <p className="mt-4 max-w-md text-body text-ink-muted">
          Core AI vocabulary and viral slang — placement quiz, unlockable
          lessons, graph, and in-browser games.
        </p>
      </section>

      <section className="mt-14 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-h2 text-core">Core track</h2>
          <div className="flex flex-col gap-3">
            {orderedPreviews(core, "core")}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-h2 text-slang">Slang track</h2>
          <div className="flex flex-col gap-3">
            {orderedPreviews(slang, "slang")}
          </div>
        </div>
      </section>

      <footer className="mt-auto pt-16 text-caption text-ink-muted">
        Free and open. No paid APIs. Nothing ships without approval.
      </footer>
    </main>
  );
}
