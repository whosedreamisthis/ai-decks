"use client";

import React, { useState } from "react";
import { Deck } from "@/lib/types";
import DeckList from "@/components/decks/deck-list";

interface Props {
  active: Deck[];
  archived: Deck[];
}

const DecksContainer = ({ active, archived }: Props) => {
  const [showActiveDecks, setShowActiveDecks] = useState(false);

  return (
    <div className="m-5">
      <div>Active/archived</div>
      <div>Active Decks:{active.length}</div>
      <div>Archived Decks:{archived.length}</div>
      {showActiveDecks ? (
        <DeckList decks={active} />
      ) : (
        <DeckList decks={archived} />
      )}
    </div>
  );
};

export default DecksContainer;
