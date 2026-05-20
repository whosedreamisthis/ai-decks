"use client";

import React from "react";
import FlashcardStudy from "@/components/flashcards/flashcard-study";
import { Deck } from "@/lib/types";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import ProgressBar from "@/components/common/progress-bar";

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
        {/* Navigation Back Action */}
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-2 px-2 text-muted-foreground py-4 transition-colors text-sm w-fit disabled:opacity-30"
          onClick={handlePreviousCard}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={20} />
          <span>Previous Card</span>
        </Button>

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
