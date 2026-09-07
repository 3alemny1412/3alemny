"use client";

import { useState } from "react";
import type { LessonTryIt as TryIt } from "@/lib/types";

export function LessonTryIt({ tryIt }: { tryIt: TryIt }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [stepsDone, setStepsDone] = useState(0);

  const choiceButtons =
    tryIt.options ??
    (tryIt.expected && /^[A-Z]$/.test(tryIt.expected) ? ["A", "B", "C"] : null);

  function submitChoice(value: string) {
    setPicked(value);
    setDone(true);
  }

  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <p className="text-caption font-semibold text-accent">Try it</p>
      <h2 className="mt-1 text-h3 text-ink">{tryIt.title}</h2>
      <p className="mt-2 font-mono text-caption text-ink-muted">{tryIt.prompt}</p>

      {tryIt.inputs && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-body text-ink">
          {tryIt.inputs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {tryIt.hint && (
        <p className="mt-2 text-caption text-warn">Hint: {tryIt.hint}</p>
      )}

      {tryIt.steps && (
        <div className="mt-4 space-y-2">
          {tryIt.steps.map((step, i) => (
            <button
              key={step}
              type="button"
              disabled={i > stepsDone}
              onClick={() => {
                const next = Math.min(i + 1, tryIt.steps!.length);
                setStepsDone(next);
                if (next >= tryIt.steps!.length) setDone(true);
              }}
              className={`w-full rounded-card border px-4 py-3 text-left text-body transition-colors duration-hover ${
                i < stepsDone
                  ? "border-ok bg-ok/10 text-ink"
                  : i === stepsDone
                    ? "border-border bg-surface-2 text-ink hover:border-accent"
                    : "border-border bg-surface text-ink-muted opacity-50"
              }`}
            >
              {i + 1}. {step}
            </button>
          ))}
        </div>
      )}

      {choiceButtons && (
        <div className="mt-4 flex flex-col gap-2">
          {choiceButtons.map((opt) => {
            const active = picked === opt;
            const correct = done && tryIt.expected === opt;
            const wrong = done && active && tryIt.expected !== opt;
            return (
              <button
                key={opt}
                type="button"
                disabled={done}
                onClick={() => submitChoice(opt)}
                className={`w-full rounded-card border px-4 py-3 text-left text-body transition-colors duration-hover ${
                  correct
                    ? "border-ok bg-ok/15 text-ink"
                    : wrong
                      ? "border-warn bg-warn/15 text-ink"
                      : active
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-border bg-surface-2 text-ink hover:bg-surface"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {!choiceButtons && !tryIt.steps && (
        <button
          type="button"
          onClick={() => setDone(true)}
          className="mt-4 rounded-pill bg-accent px-4 py-2 text-caption font-semibold text-accent-ink"
        >
          Mark tried
        </button>
      )}

      {done && (
        <p className="mt-4 rounded-card border border-ok/40 bg-ok/10 p-3 text-caption text-ink">
          {tryIt.debrief}
        </p>
      )}
    </section>
  );
}
