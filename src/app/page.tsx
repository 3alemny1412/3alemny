import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-16 pt-6">
      <header className="flex items-center justify-between">
        <span className="text-h3 tracking-tight text-ink">3alemny</span>
        <Link
          href="/quiz"
          className="rounded-pill bg-accent px-4 py-2 text-caption font-semibold text-accent-ink transition-colors duration-hover hover:bg-accent/90"
        >
          Placement quiz
        </Link>
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

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-border bg-surface p-5 transition-colors duration-hover hover:bg-surface-2">
          <p className="mb-3 inline-flex rounded-chip bg-core/15 px-2 py-1 text-caption font-semibold text-core">
            Core
          </p>
          <h2 className="text-h2 text-ink">Eight foundations</h2>
          <p className="mt-2 text-body text-ink-muted">
            LLM, tokens, APIs, agents, MCP, n8n, Claude, Grok — locked until
            lesson data wires in.
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5 transition-colors duration-hover hover:bg-surface-2">
          <p className="mb-3 inline-flex rounded-chip bg-slang/15 px-2 py-1 text-caption font-semibold text-slang">
            Slang
          </p>
          <h2 className="text-h2 text-ink">Ten viral terms</h2>
          <p className="mt-2 text-body text-ink-muted">
            Slop, vibe coding, clanker, and more — louder track, same rules.
          </p>
        </div>
      </section>

      <footer className="mt-auto pt-16 text-caption text-ink-muted">
        Free and open. No paid APIs. Nothing ships without approval.
      </footer>
    </main>
  );
}
