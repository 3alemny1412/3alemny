"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import gamesData from "@/data/games.json";

type Props = { gameId: string };

export function GamePlayer({ gameId }: Props) {
  const game = useMemo(
    () => gamesData.games.find((g) => g.id === gameId),
    [gameId],
  );
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState<"ok" | "warn" | null>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [locked, setLocked] = useState(false);

  if (!game) {
    return <p className="text-ink-muted">Game not found.</p>;
  }

  const g = game;
  const total = g.round_bank.length;
  const current = g.round_bank[round];
  const isSlop = g.id === "spot-the-slop";
  const isToken = g.id === "next-token";
  const isAgent = g.id === "script-or-agent";
  const streakEvery =
    "streak_bonus_every" in g.scoring
      ? (g.scoring as { streak_bonus_every?: number }).streak_bonus_every
      : undefined;

  const shell = isSlop
    ? "border-slang/50"
    : isToken
      ? "border-accent/50"
      : "border-core/50";

  function finishAdvance(hit: boolean) {
    if (hit) {
      const nextStreak = streak + 1;
      let add = 1;
      if (isSlop && streakEvery && nextStreak % streakEvery === 0) {
        add += 1;
      }
      setScore((s) => s + add);
      setStreak(nextStreak);
      setFlash("ok");
    } else {
      setStreak(0);
      setFlash("warn");
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
    setTimeout(() => {
      setFlash(null);
      setPickedId(null);
      if (round + 1 >= total) {
        setDone(true);
        return;
      }
      setRound((r) => r + 1);
      setLocked(false);
    }, 650);
  }

  function advance(hit: boolean, id?: string) {
    if (locked || done) return;
    setLocked(true);
    if (id) setPickedId(id);
    finishAdvance(hit);
  }

  if (done) {
    return (
      <section className={`rounded-card border bg-surface p-6 ${shell}`}>
        <p className="text-caption font-semibold text-accent">Score</p>
        <h2 className="mt-2 text-h1 text-ink">{score} pts</h2>
        <p className="mt-3 text-body text-ink-muted">{g.debrief}</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="rounded-pill bg-accent px-4 py-2 text-caption font-semibold text-accent-ink"
            onClick={() => {
              setRound(0);
              setScore(0);
              setStreak(0);
              setDone(false);
              setLocked(false);
              setFlash(null);
              setPickedId(null);
            }}
          >
            Play again
          </button>
          <Link
            href="/games"
            className="rounded-pill border border-border px-4 py-2 text-caption text-ink"
          >
            All games
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`rounded-card border bg-surface p-5 transition-colors ${shell} ${
        shake ? "animate-[shake_0.4s_ease-in-out] border-warn" : ""
      } ${flash === "ok" ? "border-ok ring-1 ring-ok/40" : ""} ${
        flash === "warn" ? "border-warn ring-1 ring-warn/40" : ""
      }`}
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-h2 text-ink">{g.title}</h1>
          <p className="mt-1 text-caption text-ink-muted">{g.goal}</p>
        </div>
        <div
          className={`rounded-card border border-border px-3 py-2 text-center ${
            isToken ? "bg-bg font-mono text-accent" : "bg-bg text-ink"
          }`}
        >
          <p className="text-[10px] uppercase text-ink-muted">Score</p>
          <p className="text-h3">{score}</p>
        </div>
      </header>
      <p className="mt-3 text-caption text-ink-muted">
        Round {round + 1}/{total}
        {isSlop && streak > 0 ? ` · streak ${streak}` : ""}
      </p>
      {flash === "ok" && (
        <p className="mt-2 text-caption font-semibold text-ok">Hit</p>
      )}
      {flash === "warn" && (
        <p className="mt-2 text-caption font-semibold text-warn">Miss</p>
      )}

      {isSlop && current && "cards" in current && (
        <div className="mt-4 grid gap-3">
          {(
            current as {
              cards: {
                id: string;
                label: string;
                blurb: string;
                is_slop: boolean;
              }[];
            }
          ).cards.map((card) => {
            const picked = pickedId === card.id;
            const showHit = flash === "ok" && picked && card.is_slop;
            const showMiss = flash === "warn" && picked && !card.is_slop;
            const revealSlop = flash !== null && card.is_slop;
            return (
              <button
                key={card.id}
                type="button"
                disabled={locked}
                onClick={() => advance(card.is_slop, card.id)}
                className={`rounded-card border p-4 text-left transition-colors duration-hover ${
                  showHit
                    ? "border-ok bg-ok/20 text-ink"
                    : showMiss
                      ? "border-warn bg-warn/20 text-ink"
                      : revealSlop
                        ? "border-ok/60 bg-ok/10"
                        : "border-border bg-surface-2 hover:border-slang"
                }`}
              >
                <p className="text-body font-semibold text-ink">{card.label}</p>
                <p className="mt-1 text-caption text-ink-muted">{card.blurb}</p>
              </button>
            );
          })}
        </div>
      )}

      {isToken && current && "prompt" in current && (
        <div className="mt-4">
          <p className="rounded-card border border-border bg-bg p-4 font-mono text-body text-ink">
            {(current as { prompt: string }).prompt}
            <span className="text-accent"> ▍</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(
              current as {
                choices: { id: string; text: string; correct: boolean }[];
              }
            ).choices.map((c) => {
              const picked = pickedId === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  disabled={locked}
                  onClick={() => advance(c.correct, c.id)}
                  className={`rounded-card border px-3 py-3 font-mono text-caption transition-colors ${
                    picked && flash === "ok"
                      ? "border-ok bg-ok/20 text-ink"
                      : picked && flash === "warn"
                        ? "border-warn bg-warn/20 text-ink"
                        : "border-border bg-surface-2 text-ink hover:border-accent"
                  }`}
                >
                  {c.text}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isAgent && current && "scenario" in current && (
        <div className="mt-4">
          <p className="rounded-card border border-border bg-bg p-4 text-body text-ink">
            {(current as { scenario: string }).scenario}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {(current as { choices: string[]; answer: string }).choices.map(
              (label) => {
                const picked = pickedId === label;
                const correct =
                  label === (current as { answer: string }).answer;
                return (
                  <button
                    key={label}
                    type="button"
                    disabled={locked}
                    onClick={() => advance(correct, label)}
                    className={`rounded-pill border px-5 py-3 text-caption font-semibold capitalize transition-colors duration-hover ${
                      picked && flash === "ok"
                        ? "border-ok bg-ok/20 text-ok"
                        : picked && flash === "warn"
                          ? "border-warn bg-warn/20 text-warn"
                          : "border-core bg-core/10 text-core hover:bg-accent hover:text-accent-ink"
                    }`}
                  >
                    {label}
                  </button>
                );
              },
            )}
          </div>
        </div>
      )}
    </section>
  );
}
