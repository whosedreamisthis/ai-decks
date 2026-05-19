import React from "react";

import DeckCard from "@/components/decks/deck-card";
import { Deck } from "@/lib/types";

const CurrentDecks = ({ decks }: { decks: Deck[] }) => {
  return (
    <div className="flex flex-col gap-4 m-5">
      <p className="text-xl font-bold">Current Decks</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} showProgress={true} />
        ))}
      </div>
    </div>
  );
};

export default CurrentDecks;
