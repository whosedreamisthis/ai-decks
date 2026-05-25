import React from "react";
import { getDeckById } from "@/lib/actions/decks";
import StudySessionEngine from "@/components/study/study-session-engine";

export const dynamic = "force-dynamic";

const StudyPage = async ({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) => {
  const { deckId } = await params;
  const deck = await getDeckById(deckId);
  if (!deck) return <div>Deck not found</div>;
  if (!deck.cards || deck.cards.length === 0)
    return <div>No cards in deck</div>;
  return (
    <div className="min-h-screen  overflow-hidden pb-25">
      <StudySessionEngine deck={deck} />
    </div>
  );
};

export default StudyPage;
