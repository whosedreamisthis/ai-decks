// @/app/decks/[deckId]/study/page.tsx
import React from "react";
import { getDeckById } from "@/lib/actions/decks";
import StudySessionEngine from "@/components/study/study-session-engine";

// Forces the page to run its data lookup live on every single click in production
export const dynamic = "force-dynamic";

const StudyPage = async ({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) => {
  const { deckId } = await params;
  const deck = await getDeckById(deckId);

  if (!deck) {
    return (
      <div className="p-8 text-center text-slate-600 dark:text-slate-400">
        Deck not found
      </div>
    );
  }

  if (!deck.cards || deck.cards.length === 0) {
    return (
      <div className="p-8 text-center text-slate-600 dark:text-slate-400">
        No cards in deck
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden pb-25">
      <StudySessionEngine deck={deck} />
    </div>
  );
};

export default StudyPage;
