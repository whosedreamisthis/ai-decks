// @/components/flashcards/study-session.tsx
"use client";

import React from "react";
import FlashcardStudy from "@/components/flashcards/flashcard-study";
import { Deck } from "@/lib/types";
import { ChevronLeft, ChevronRight as ChevronDivider } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import ProgressBar from "@/components/common/progress-bar";
import Link from "next/link";
import BreadCrumbs from "@/components/common/bread-crumbs";

interface StudySessionProps {
  deck: Deck;
  currentIndex: number;
  handleRateCard: (status: "correct" | "incorrect") => void;
  handlePreviousCard: () => void;
}

const StudySession = ({
  deck,
  currentIndex,
  handleRateCard,
  handlePreviousCard,
}: StudySessionProps) => {
  if (!deck || deck.cards.length === 0)
    return <div className="p-5 text-center">Deck contains no cards</div>;

  const currentCard = deck.cards[currentIndex];

  // Dynamic progress calculation based on cards reviewed
  const progressPercentage = Math.round(
    (currentIndex / deck.cards.length) * 100,
  );

  return (
    <div>
      <div className="flex flex-col gap-3 m-5 justify-center">
        <div className="max-w-md mx-auto mb-6 flex items-center justify-between text-xs sm:text-sm bg-white/60 backdrop-blur-sm py-2.5 px-4 rounded-lg border border-slate-200/50 shadow-sm w-full">
          <BreadCrumbs deckUrl={`/decks/${deck.id}`} exitLabel="Exit Session" />
        </div>
        <div className="w-full max-w-xl mx-auto flex items-center justify-start -mt-2">
          <Button
            variant="ghost"
            className="flex items-center gap-1 px-2 text-muted-foreground hover:text-slate-800 transition-colors text-xs font-medium h-auto pt-1 disabled:opacity-30"
            onClick={handlePreviousCard}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={14} />
            <span>Previous Card</span>
          </Button>
        </div>

        <h1 className="text-center text-xl font-bold">{deck.title}</h1>

        {/* Display Current Flashcard Context */}
        <FlashcardStudy {...currentCard} />

        {/* Unified Layout Control Box */}
        <div className="flex flex-col items-center w-full mt-6">
          <div className="w-full max-w-md flex flex-col gap-5">
            {/* Buttons Row */}
            <div className="flex items-center justify-center gap-5 w-full">
              <Button
                className="flex-1 bg-red-400 hover:bg-red-500 text-white"
                onClick={() => handleRateCard("incorrect")}
              >
                <X size={18} className="mr-1" />
                Incorrect
              </Button>

              <span className="text-sm text-muted-foreground font-medium shrink-0">
                {currentIndex + 1} of {deck.cards.length}
              </span>

              <Button
                className="flex-1 bg-brand-mint hover:bg-brand-mint/90 text-white"
                onClick={() => handleRateCard("correct")}
              >
                <Check size={18} className="mr-1" />
                Got it!
              </Button>
            </div>

            {/* Sized Progress Bar Row */}
            <div className="w-full pt-1">
              <ProgressBar percentage={progressPercentage} isFull={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySession;
