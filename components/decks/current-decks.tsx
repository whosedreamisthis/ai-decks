import React from "react";

import { Deck } from "@/lib/types";
import DeckList from "@/components/decks/deck-list";

const CurrentDecks = ({ decks }: { decks: Deck[] }) => {
  return (
    <div className="flex flex-col gap-4 m-5 shadow-md p-5 border border-gray-200 rounded-md">
      <p className="text-xl font-bold">Current Decks</p>
      {decks.length > 0 ? (
        <DeckList decks={decks} />
      ) : (
        <>
          <p className="text-center text-sm mt-10">
            There are no active decks.
          </p>
        </>
      )}
    </div>
  );
};

export default CurrentDecks;
