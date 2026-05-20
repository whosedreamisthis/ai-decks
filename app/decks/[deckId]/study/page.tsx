import React from "react";
import FlashcardStudy from "@/components/flashcards/flashcard-study";
import { getDeckById } from "@/lib/actions/decks";
import StudySession from "@/components/study/study-session";

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
    <div className="min-h-screen bg-brand-blue/10 overflow-hidden pb-25">
      <StudySession deck={deck} />
    </div>
  );
};

export default StudyPage;
