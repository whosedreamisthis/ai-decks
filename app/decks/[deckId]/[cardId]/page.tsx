import React from "react";
import BackButton from "@/components/common/back-button";
import { getDeckById } from "@/lib/actions/decks";
import FlashcardExpanded from "@/components/flashcards/flashcard-expanded";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import BreadCrumbs from "@/components/common/bread-crumbs";

interface Props {
  params: Promise<{ deckId: string; cardId: string }>;
}

const CardPage = async ({ params }: Props) => {
  const { deckId, cardId } = await params;
  const deck = await getDeckById(deckId);

  const deckUrl = `/decks/${deckId}`;

  if (!deck)
    return (
      <div className="p-5 text-center font-bold dark:text-slate-200">
        Deck not found
      </div>
    );

  const currentCardIndex = deck.cards.findIndex((c) => c.id === cardId);
  const currentCard = deck.cards[currentCardIndex];

  if (!currentCard)
    return (
      /* FIXED: Replaced legacy background tint class with adaptive theme utilities */
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden p-5 pb-25">
        <BackButton fallbackUrl={deckUrl} />
        <div className="text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
          Card not found
        </div>
      </div>
    );

  const prevIndex =
    currentCardIndex > 0 ? currentCardIndex - 1 : deck.cards.length - 1;
  const nextIndex =
    currentCardIndex < deck.cards.length - 1 ? currentCardIndex + 1 : 0;

  const prevCardId = deck.cards[prevIndex].id;
  const nextCardId = deck.cards[nextIndex].id;

  return (
    <div className="min-h-screen overflow-hidden p-5 pb-25">
      {/* GLOBAL TOP NAVIGATION HEADER (Breadcrumbs + Escape Hatch) */}
      {/* FIXED: Added dark:bg-slate-900/60 and your crisp dark:border-slate-700 illuminated layout border */}
      <div className="max-w-md mx-auto mb-6 flex items-center justify-between text-xs sm:text-sm bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm py-2.5 px-4 rounded-lg border border-slate-200/50 dark:border-slate-700 shadow-sm ">
        <BreadCrumbs deckUrl={deckUrl} exitLabel="Exit" />
      </div>

      {/* FIXED: Handled title heading contrast using text-slate-900 dark:text-slate-100 */}
      <h1 className="text-center text-xl font-bold my-2 text-slate-900 dark:text-slate-100">
        {deck.title}
      </h1>

      {/* Main Flashcard Body */}
      <div className="flex justify-center">
        <FlashcardExpanded deckId={deckId} {...currentCard} />
      </div>

      {/* Card Carousel Controls */}
      <div className="flex justify-center">
        <div className="flex items-center justify-between mt-6 w-full max-w-md">
          {/* FIXED: Configured the "Previous" link container card to swap to bg-slate-900 with your crisp dark:border-slate-700 outline */}
          <Link
            href={`/decks/${deckId}/${prevCardId}`}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-md shadow-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800  text-sm"
            replace
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </Link>

          {/* FIXED: Adjusted pagination tracking string to text-slate-500 dark:text-slate-400 */}
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {currentCardIndex + 1} of {deck.cards.length}
          </span>

          {/* FIXED: Replaced unmapped hover:bg-brand-blue/90 with hover:bg-brand-mint/90 or dark controls to avoid confusing color flashing */}
          <Link
            href={`/decks/${deckId}/${nextCardId}`}
            className="flex items-center gap-2 px-4 py-2 bg-brand-mint hover:bg-brand-mint/90 text-white rounded-md shadow-sm text-sm font-semibold"
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
