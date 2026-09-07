import Link from "next/link";
import { PlacementQuiz } from "@/components/PlacementQuiz";
import type { PlacementQuizFile } from "@/lib/types";
import placement from "@/data/placement-quiz.json";

export default function QuizPage() {
  const data = placement as PlacementQuizFile;

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-16 pt-6">
      <Link href="/" className="text-caption text-ink-muted hover:text-ink">
        ← 3alemny
      </Link>
      <div className="mt-10">
        <PlacementQuiz data={data} />
      </div>
    </main>
  );
}
