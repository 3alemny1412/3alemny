import Link from "next/link";
import gamesData from "@/data/games.json";
import { GamePlayer } from "@/components/games/GamePlayer";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return gamesData.games.map((g) => ({ id: g.id }));
}

export default async function GamePage({ params }: Props) {
  const { id } = await params;
  return (
    <main className="mx-auto min-h-screen max-w-lg px-4 pb-16 pt-6 animate-enter">
      <Link href="/games" className="text-caption text-ink-muted hover:text-ink">
        ← Games
      </Link>
      <div className="mt-6">
        <GamePlayer gameId={id} />
      </div>
    </main>
  );
}
