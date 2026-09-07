import Link from "next/link";
import coreLessons from "@/data/core-lessons.json";
import slangLessons from "@/data/slang-lessons.json";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  const ids = [
    ...coreLessons.lessons.map((l) => l.id),
    ...slangLessons.lessons.map((l) => l.id),
  ];
  return ids.map((id) => ({ id }));
}

export default async function LessonPage({ params }: Props) {
  const { id } = await params;
  const lesson =
    coreLessons.lessons.find((l) => l.id === id) ??
    slangLessons.lessons.find((l) => l.id === id);

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

  return (
    <main className="mx-auto max-w-lg px-4 pb-16 pt-6 animate-enter">
      <Link href="/" className="text-caption text-ink-muted hover:text-ink">
        ← 3alemny
      </Link>
      <h1 className="mt-8 text-h1 text-ink">{lesson.term}</h1>
      <p className="mt-4 text-body text-ink">{lesson.plain_def}</p>
      <p className="mt-6 rounded-card border border-border bg-surface p-4 text-caption text-ink-muted">
        Full try-it + lesson quiz wire next. Def from Curriculum/Research only.
      </p>
    </main>
  );
}
