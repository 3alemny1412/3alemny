import Link from "next/link";
import { GamesHub } from "@/components/games/GamesHub";

export default function GamesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-16 pt-6 animate-enter">
      <Link href="/" className="text-caption text-ink-muted hover:text-ink">
        ← 3alemny
      </Link>
      <h1 className="mt-4 text-h1 text-ink">Games</h1>
      <p className="mt-2 text-body text-ink-muted">
        Three browser minis — do the thing, don’t just read.
      </p>
      <GamesHub />
    </main>
  );
}
