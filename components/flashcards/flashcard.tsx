import React from "react";
import FlashcardSummary from "@/components/flashcards/flashcard-summary";
import { Card } from "@/lib/types";
import FlashcardStudy from "@/components/flashcards/flashcard-study";
import FlashcardExpanded from "@/components/flashcards/flashcard-expanded";

interface Props {
  card: Card;
  variant: "summary" | "expanded" | "study";
  deckId: string;
}

const Flashcard = ({ card, variant, deckId }: Props) => {
  switch (variant) {
    case "summary":
      return <FlashcardSummary {...card} deckId={deckId} />;
    case "expanded":
      return <FlashcardExpanded {...card} deckId={deckId} />;
    case "study":
      return <FlashcardStudy {...card} />;
    default:
      console.error(`invalid flashcard variant: ${variant}`);
  }
  return null;
};

export default Flashcard;
