import React from "react";
import FlashcardSummary from "@/components/flashcards/flashcard-summary";
import { Card } from "@/lib/types";
import FlashcardStudy from "@/components/flashcards/flashcard-study";
import FlashcardExpanded from "@/components/flashcards/flashcard-expanded";

interface Props {
  card: Card;
  variant: "summary" | "expanded" | "study";
}

const Flashcard = ({ card, variant }: Props) => {
  switch (variant) {
    case "summary":
      return <FlashcardSummary {...card} />;
    case "expanded":
      return <FlashcardExpanded {...card} />;
    case "study":
      return <FlashcardStudy {...card} />;
    default:
      console.error(`invalid flashcard variant: ${variant}`);
  }
  return null;
};

export default Flashcard;
