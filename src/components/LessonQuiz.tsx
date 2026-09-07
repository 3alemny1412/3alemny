"use client";

import { useState } from "react";
import type { LessonQuizItem } from "@/lib/types";

export function LessonQuiz({ items }: { items: LessonQuizItem[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<"ok" | "warn" | null>(null);

  const current = items[index];
  const total = items.length;

  function lockIn() {
    if (selected === null || !current) return;
    const hit = selected === current.answer_index;
    setFeedback(hit ? "ok" : "warn");
    const nextScore = hit ? score + 1 : score;
    setTimeout(() => {
      if (index + 1 >= total) {
        setScore(nextScore);
        setDone(true);
        return;
      }
      setScore(nextScore);
      setIndex(index + 1);
      setSelected(null);
      setFeedback(null);
    }, 450);
  }

  if (done) {
    return (
      <section className="rounded-card border border-border bg-surface p-5">
        <p className="text-caption font-semibold text-ok">Lesson quiz</p>
        <h2 className="mt-1 text-h3 text-ink">
          {score}/{total} correct
        </h2>
        <p className="mt-2 text-body text-ink-muted">
          Keep going — related lessons are linked above.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <p className="text-caption font-semibold text-accent">
        Lesson quiz · {index + 1}/{total}
      </p>
      <h2 className="mt-2 text-h3 text-ink">{current.q}</h2>
      <div className="mt-4 flex flex-col gap-2">
        {current.choices.map((choice, i) => {
          const active = selected === i;
          return (
            <button
              key={`${index}-${i}`}
              type="button"
              onClick={() => setSelected(i)}
              className={`w-full rounded-card border px-4 py-3 text-left text-body transition-colors duration-hover ${
                active
                  ? feedback === "ok"
                    ? "border-ok bg-ok/15 text-ink"
                    : feedback === "warn"
                      ? "border-warn bg-warn/15 text-ink"
                      : "border-accent bg-accent text-accent-ink"
                  : "border-border bg-surface-2 text-ink hover:bg-surface"
              }`}
            >
              {choice}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        disabled={selected === null || feedback !== null}
        onClick={lockIn}
        className="mt-4 w-full rounded-pill bg-accent px-4 py-3 text-caption font-semibold text-accent-ink disabled:opacity-40"
      >
        Check
      </button>
    </section>
  );
}
