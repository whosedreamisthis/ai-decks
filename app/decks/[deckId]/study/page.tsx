import React from "react";
import FlashcardStudy from "@/components/flashcards/flashcard-study";
import { getDeckById } from "@/lib/actions/decks";

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
      <div className="m-5">
        <FlashcardStudy {...deck.cards[0]} deckId={deckId} />
      </div>
    </div>
  );
};

export default StudyPage;
