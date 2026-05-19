"use client";

import React, { useState } from "react";
import { Deck } from "@/lib/types";
import DeckList from "@/components/decks/deck-list";
import DeckFilterToggle from "@/components/decks/deck-filter-toggle";

interface Props {
  active: Deck[];
  archived: Deck[];
}

const DecksContainer = ({ active, archived }: Props) => {
  const [showActiveDecks, setShowActiveDecks] = useState(false);

  return (
    <div className="mb-15 p-5 w-full flex flex-col gap-5">
      <DeckFilterToggle
        showActiveDecks={showActiveDecks}
        setShowActiveDecks={setShowActiveDecks}
        numActive={active.length}
        numArchived={archived.length}
      />

      {showActiveDecks ? (
        <DeckList decks={active} />
      ) : (
        <DeckList decks={archived} />
      )}
    </div>
  );
};

export default DecksContainer;
