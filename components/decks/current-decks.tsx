"use client";

import React from "react";
import { Deck } from "@/lib/types";
import DeckList from "@/components/decks/deck-list";

interface CurrentDecksProps {
  decks: Deck[];
}

const CurrentDecks = ({ decks }: CurrentDecksProps) => {
  const currentDecks = decks.filter((deck) => {
    const savedActiveSession = localStorage.getItem(`study_session_${deck.id}`);
    if (savedActiveSession) {
      const { percentage } = JSON.parse(savedActiveSession);

      return percentage > 0;
    }

    return false;
  });

  return (
    <div className="bg-white flex flex-col gap-4 m-5 shadow-md p-5 border border-gray-200 rounded-md">
      <p className="text-xl font-bold">Current Decks</p>
      {currentDecks.length > 0 ? (
        <DeckList decks={currentDecks} />
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
