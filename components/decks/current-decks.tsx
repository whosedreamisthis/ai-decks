import React from "react";

import { Deck } from "@/lib/types";
import DeckList from "@/components/decks/deck-list";

const CurrentDecks = ({ decks }: { decks: Deck[] }) => {
  return (
    <div className="flex flex-col gap-4 m-5 shadow-md p-5 border border-gray-200 rounded-md">
      <p className="text-xl font-bold">Current Decks</p>

      <DeckList decks={decks} />
    </div>
  );
};

export default CurrentDecks;
