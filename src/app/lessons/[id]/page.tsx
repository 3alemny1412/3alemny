import Link from "next/link";
import coreLessons from "@/data/core-lessons.json";
import slangLessons from "@/data/slang-lessons.json";
import { LessonTryIt } from "@/components/LessonTryIt";
import { LessonQuiz } from "@/components/LessonQuiz";
import type { FullLesson } from "@/lib/types";

type Props = { params: Promise<{ id: string }> };

const allLessons: FullLesson[] = [
  ...(coreLessons.lessons as FullLesson[]).map((l) => ({
    ...l,
    track: "core",
  })),
  ...(slangLessons.lessons as FullLesson[]).map((l) => ({
    ...l,
    track: l.track ?? "slang",
  })),
];

export function generateStaticParams() {
  return allLessons.map((l) => ({ id: l.id }));
}

export default async function LessonPage({ params }: Props) {
  const { id } = await params;
  const lesson = allLessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <main className="mx-auto max-w-lg px-4 py-10">
        <p className="text-ink-muted">Lesson not found.</p>
        <Link href="/" className="mt-4 inline-block text-accent">
          ← Home
        </Link>
      </main>
    );
  }

  const track = lesson.track === "slang" ? "slang" : "core";
  const chip =
    track === "core"
      ? "bg-core/15 text-core"
      : "bg-slang/15 text-slang";

  return (
    <main className="mx-auto max-w-lg px-4 pb-24 pt-6 animate-enter">
      <Link href="/" className="text-caption text-ink-muted hover:text-ink">
        ← 3alemny
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex rounded-chip px-2 py-0.5 text-caption font-semibold ${chip}`}
        >
          {track === "core" ? "Core" : "Slang"}
        </span>
        {lesson.prerequisites.length > 0 && (
          <span className="text-caption text-ink-muted">
            Prereqs:{" "}
            {lesson.prerequisites.map((p, i) => (
              <span key={p}>
                {i > 0 && ", "}
                <Link href={`/lessons/${p}`} className="text-accent">
                  {p}
                </Link>
              </span>
            ))}
          </span>
        )}
      </div>

      <h1 className="mt-3 text-h1 text-ink">{lesson.term}</h1>
      <p className="mt-4 text-body text-ink">{lesson.plain_def}</p>
      <p className="mt-3 text-body text-ink-muted">{lesson.why_it_blew_up}</p>

      {lesson.related.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {lesson.related.map((r) => (
            <Link
              key={r}
              href={`/lessons/${r}`}
              className="rounded-pill border border-border bg-surface px-3 py-1 text-caption text-ink hover:bg-surface-2"
            >
              {r}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 space-y-6">
        <LessonTryIt tryIt={lesson.try_it} />
        <LessonQuiz items={lesson.quiz} />
      </div>
    </main>
  );
}
