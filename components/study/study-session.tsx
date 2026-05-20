"use client";

import React, { useState } from "react";
import FlashcardStudy from "@/components/flashcards/flashcard-study";
import { Deck } from "@/lib/types";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const StudySession = ({ deck }: { deck: Deck }) => {
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  if (!deck) return <div>Deck not found</div>;

  const currentCard = deck.cards[currentCardIndex];

  const prevIndex =
    currentCardIndex > 0 ? currentCardIndex - 1 : deck.cards.length - 1;
  const nextIndex =
    currentCardIndex < deck.cards.length - 1 ? currentCardIndex + 1 : 0;

  const prevCardId = deck.cards[prevIndex].id;
  const nextCardId = deck.cards[nextIndex].id;

  return (
    <div>
      <div className="flex flex-col gap-3 m-5">
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-2 px-2 text-muted-foreground py-4  transition-colors text-sm"
          onClick={() => setCurrentCardIndex(prevIndex)}
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </Button>
        <FlashcardStudy {...deck.cards[currentCardIndex]} />
        <div className="flex flex-col">
          <div className="flex justify-center w-full">
            <div className="flex items-center justify-center  mt-6  w-full max-w-md gap-5">
              <Button
                className="flex-1 bg-red-400"
                onClick={() => setCurrentCardIndex(nextIndex)}
              >
                <X />
                Incorrect
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentCardIndex + 1} of {deck.cards.length}
              </span>

              <Button
                className="flex-1  bg-brand-mint"
                onClick={() => setCurrentCardIndex(nextIndex)}
              >
                <Check />
                Got it!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySession;
