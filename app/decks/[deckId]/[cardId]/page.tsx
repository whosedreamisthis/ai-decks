import React from "react";
import BackButton from "@/components/common/back-button";
import { getDeckById } from "@/lib/actions/decks";
import FlashcardExpanded from "@/components/flashcards/flashcard-expanded";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronDivider,
} from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ deckId: string; cardId: string }>;
}

const CardPage = async ({ params }: Props) => {
  const { deckId, cardId } = await params;
  const deck = await getDeckById(deckId);

  const deckUrl = `/decks/${deckId}`;

  if (!deck)
    return <div className="p-5 text-center font-bold">Deck not found</div>;

  const currentCardIndex = deck.cards.findIndex((c) => c.id === cardId);
  const currentCard = deck.cards[currentCardIndex];

  if (!currentCard)
    return (
      <div className="min-h-screen bg-brand-blue/10 overflow-hidden p-5 pb-25">
        <BackButton fallbackUrl={deckUrl} />
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
    <div className="min-h-screen bg-brand-blue/10 overflow-hidden p-5 pb-25">
      {/* GLOBAL TOP NAVIGATION HEADER (Breadcrumbs + Escape Hatch) */}
      <div className="max-w-md mx-auto mb-6 flex items-center justify-between text-xs sm:text-sm bg-white/60 backdrop-blur-sm py-2.5 px-4 rounded-lg border border-slate-200/50 shadow-sm">
        {/* Dynamic Breadcrumb Path Links */}
        <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
          <Link
            href="/dashboard"
            className="hover:text-slate-900 transition-colors"
          >
            Home
          </Link>
          <ChevronDivider size={14} className="text-slate-300" />

          {/* FIXED: This gives them a direct, unconditional escape hatch to the /decks shelf! */}
          <Link
            href="/decks"
            className="hover:text-slate-900 transition-colors text-brand-purple font-semibold"
          >
            Decks
          </Link>
        </div>

        {/* Clean, unambiguous exit trigger */}
        <Link
          href={deckUrl}
          className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-red-500 transition-colors"
        >
          Exit
        </Link>
      </div>
      <h1 className="text-center text-xl font-bold my-2">{deck.title}</h1>

      {/* Main Flashcard Body */}
      <div className="flex justify-center">
        <FlashcardExpanded deckId={deckId} {...currentCard} />
      </div>

      {/* Card Carousel Controls */}
      <div className="flex justify-center">
        <div className="flex items-center justify-between mt-6 w-full max-w-md">
          <Link
            href={`/decks/${deckId}/${prevCardId}`}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-slate-50 transition-colors text-sm"
            replace
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </Link>

          <span className="text-sm text-slate-500 font-medium">
            {currentCardIndex + 1} of {deck.cards.length}
          </span>

          <Link
            href={`/decks/${deckId}/${nextCardId}`}
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
