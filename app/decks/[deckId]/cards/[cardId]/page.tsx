import React from "react";
import BackButton from "@/components/common/back-button";
import { getDeck } from "@/lib/actions/decks";
import FlashcardExpanded from "@/components/flashcards/flashcard-expanded";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ deckId: string; cardId: string }>;
}

const CardPage = async ({ params }: Props) => {
  const { deckId, cardId } = await params;
  const deck = await getDeck(deckId);

  if (!deck) return <div>Deck not found</div>;

  const currentCardIndex = deck.cards.findIndex((c) => c.id === cardId);
  const currentCard = deck.cards[currentCardIndex];

  if (!currentCard)
    return (
      <div className="min-h-screen bg-brand-blue/10 overflow-hidden p-5 pb-25">
        <BackButton />
        <div className="text-center text-2xl font-bold">Card not found</div>
      </div>
    );

  const prevIndex =
    currentCardIndex > 0 ? currentCardIndex - 1 : deck.cards.length - 1;
  const nextIndex =
    currentCardIndex < deck.cards.length - 1 ? currentCardIndex + 1 : 0;

  const prevCardId = deck.cards[prevIndex].id;
  const nextCardId = deck.cards[nextIndex].id;

  return (
    <div className="min-h-screen bg-brand-blue/10 overflow-hidden p-5 pb-25 ">
      <BackButton />
      <div className="flex justify-center">
        <FlashcardExpanded deckId={deckId} {...currentCard} />
      </div>
      <div className="flex justify-center">
        <div className="flex items-center justify-between  mt-6  w-full max-w-md">
          <Link
            href={`/decks/${deckId}/cards/${prevCardId}`}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-slate-50 transition-colors text-sm"
            replace
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </Link>

          <span className="text-sm text-muted-foreground">
            {currentCardIndex + 1} of {deck.cards.length}
          </span>

          <Link
            href={`/decks/${deckId}/cards/${nextCardId}`}
            className="flex items-center gap-2 px-4 py-2 bg-brand-mint text-white rounded-md shadow-sm hover:bg-brand-blue/90 transition-colors text-sm"
            replace
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
