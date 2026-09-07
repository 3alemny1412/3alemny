import Link from "next/link";
import { TermGraph } from "@/components/TermGraph";

export default function GraphPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-6 animate-enter">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <Link href="/" className="text-caption text-ink-muted hover:text-ink">
            ← 3alemny
          </Link>
          <h1 className="mt-2 text-h1 text-ink">Term graph</h1>
          <p className="mt-1 text-body text-ink-muted">
            Core in teal, slang in rose. Edges = related terms.
          </p>
        </div>
        <Link
          href="/quiz"
          className="rounded-pill border border-border bg-surface px-4 py-2 text-caption text-ink hover:bg-surface-2"
        >
          Placement quiz
        </Link>
      </header>
      <TermGraph />
    </main>
  );
}
