import React from "react";

import { Deck } from "@/lib/types";
import DeckList from "@/components/decks/deck-list";
import { ActiveDeckSession, DeckProgress } from "@/lib/db";

interface CurrentDecksProps {
  decks: Deck[];
  userProgress: DeckProgress[];
  activeSession?: ActiveDeckSession | null;
}

const CurrentDecks = ({
  decks,
  userProgress,
  activeSession,
}: CurrentDecksProps) => {
  return (
    <div className="bg-white flex flex-col gap-4 m-5 shadow-md p-5 border border-gray-200 rounded-md">
      <p className="text-xl font-bold">Current Decks</p>
      {decks.length > 0 ? (
        <DeckList
          decks={decks}
          userProgress={userProgress}
          activeSession={activeSession}
        />
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
