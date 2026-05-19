import React from "react";
import { MOCK_DECKS } from "@/lib/constants";
import DeckCard from "@/components/decks/deck-card";

const CurrentDecks = () => {
  return (
    <div className="flex flex-col gap-4 m-5">
      <p className="text-xl font-bold">Current Decks</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {MOCK_DECKS.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
};

export default CurrentDecks;
