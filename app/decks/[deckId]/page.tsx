import React from "react";
import { getDeck } from "@/lib/actions/decks";
import Flashcard from "../../../components/flashcards/flashcard";

interface Props {
  params: Promise<{ deckId: string }>;
}

const DeckPage = async ({ params }: Props) => {
  const { deckId } = await params;
  const deck = await getDeck(deckId);

  if (!deck) {
    return <div>Deck not found</div>;
  }

  return (
    <div className="min-h-screen bg-brand-blue/10 overflow-hidden p-5 pb-25">
      <h1 className="text-xl sm:text-2xl font-bold">{deck.title}</h1>
      <p className="text-sm text-muted-foreground">
        {deck.cards.length} cards total
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-5">
        {deck.cards.map((card) => (
          <Flashcard variant="summary" key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default DeckPage;
