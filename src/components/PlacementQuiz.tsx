"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PlacementQuizFile } from "@/lib/types";

type Props = {
  data: PlacementQuizFile;
};

export function PlacementQuiz({ data }: Props) {
  const questions = data.questions;
  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const progress = done ? 100 : Math.round((index / total) * 100);
  const current = questions[index];

  const band = useMemo(() => {
    return (
      data.bands.find((b) => score >= b.min && score <= b.max) ??
      data.bands[0]
    );
  }, [data.bands, score]);

  function confirm() {
    if (selected === null || !current) return;
    const nextScore =
      selected === current.answer_index ? score + 1 : score;
    if (index + 1 >= total) {
      setScore(nextScore);
      setDone(true);
      return;
    }
    setScore(nextScore);
    setIndex(index + 1);
    setSelected(null);
  }

  if (done) {
    return (
      <div className="rounded-card border border-border bg-surface p-5 animate-enter">
        <p className="text-caption font-semibold text-accent">{band.label}</p>
        <h1 className="mt-2 text-h2 text-ink">
          {score}/{total} — placement locked
        </h1>
        <p className="mt-2 text-body text-ink-muted">{band.message}</p>
        <p className="mt-4 text-caption text-ink-muted">
          Unlocks:{" "}
          {band.unlock === "all"
            ? "all lessons"
            : `${band.unlock.length} lessons`}
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-pill bg-accent px-4 py-2 text-caption font-semibold text-accent-ink"
        >
          Start learning
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border bg-surface p-5 animate-enter">
      <div className="mb-6 h-1 w-full overflow-hidden rounded-pill bg-border">
        <div
          className="h-full bg-accent transition-all duration-unlock"
          style={{ width: `${Math.max(progress, 8)}%` }}
        />
      </div>
      <p className="text-caption text-ink-muted">
        {index + 1} / {total} · {current.track}
      </p>
      <h1 className="mt-2 text-h2 text-ink">{current.q}</h1>
      <div className="mt-6 flex flex-col gap-3">
        {current.choices.map((choice, i) => {
          const active = selected === i;
          return (
            <button
              key={`${current.id}-${i}`}
              type="button"
              onClick={() => setSelected(i)}
              className={`w-full rounded-card border px-4 py-3 text-left text-body transition-colors duration-hover ${
                active
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-border bg-surface text-ink hover:bg-surface-2"
              }`}
            >
              {choice}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        disabled={selected === null}
        onClick={confirm}
        className="mt-6 w-full rounded-pill bg-accent px-4 py-3 text-caption font-semibold text-accent-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        {index + 1 >= total ? "See results" : "Next"}
      </button>
    </div>
  );
}
