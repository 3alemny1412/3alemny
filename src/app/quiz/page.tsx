import Link from "next/link";

export default function QuizPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-16 pt-6">
      <Link href="/" className="text-caption text-ink-muted hover:text-ink">
        ← 3alemny
      </Link>
      <div className="mt-10 rounded-card border border-border bg-surface p-5">
        <div className="mb-6 h-1 w-full overflow-hidden rounded-pill bg-border">
          <div className="h-full w-1/12 bg-accent" />
        </div>
        <h1 className="text-h2 text-ink">Placement quiz</h1>
        <p className="mt-2 text-body text-ink-muted">
          Question bank is in{" "}
          <code className="font-mono text-caption text-ink">src/data/placement-quiz.json</code>
          . Wiring big accent-select answer buttons next.
        </p>
        <button
          type="button"
          disabled
          className="mt-6 w-full rounded-card border border-border bg-surface-2 px-4 py-3 text-left text-body text-ink-muted"
        >
          Questions coming soon
        </button>
      </div>
    </main>
  );
}
