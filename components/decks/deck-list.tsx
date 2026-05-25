// @/components/decks/deck-list.tsx
import React from "react";
import { Deck } from "@/lib/types";
import DeckCard from "@/components/decks/deck-card";

interface Props {
  decks: Deck[];
  current?: boolean;
}

const DeckList = ({ decks, current = false }: Props) => {
  const safeDecks = Array.isArray(decks) ? decks : [];

  return (
    <div
      className={`grid grid-cols-1 ${current ? "" : "md:grid-cols-2 lg:grid-cols-3"} gap-3 my-5`}
    >
      {safeDecks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
};

export default DeckList;
