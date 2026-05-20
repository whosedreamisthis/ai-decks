// @/lib/actions/decks.ts
// @/lib/actions/decks.ts
"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { getDb, setDecks } from "@/lib/db";
import { MOCK_DECKS } from "@/lib/mock-data";

export const getDecks = async (filter: "active" | "archived" | "all") => {
  const db = getDb();
  // Add fallback fallback checking array arrays to avoid undefined crashes
  const decks = db.decks || [];
  return decks.filter((deck) => filter === "all" || deck.status === filter);
};

export const getDeckById = cache(async (deckId: string) => {
  const db = getDb();
  const decks = db.decks || [];
  return decks.find((deck) => deckId === deck.id);
});

export const resetDecks = async () => {
  const db = getDb();

  setDecks([...MOCK_DECKS]);
  db.studyHistoryLog = [];
  db.deckProgress = [];
  db.activeDeckSession = [];

  revalidatePath("/dashboard");
  revalidatePath("/decks");
  console.log("Reset database to clean mock data state.");
};

// ... keep rest of archive/delete actions identical, as they use setDecks safely now!

export const archiveDeck = async (deckId: string) => {
  const db = getDb();
  setDecks(
    db.decks.map((deck) =>
      deck.id === deckId ? { ...deck, status: "archived" } : deck,
    ),
  );
  revalidatePath("/dashboard");
  revalidatePath("/decks");
};

export const unarchiveDeck = async (deckId: string) => {
  const db = getDb();
  setDecks(
    db.decks.map((deck) =>
      deck.id === deckId ? { ...deck, status: "active" } : deck,
    ),
  );
  revalidatePath("/dashboard");
  revalidatePath("/decks");
};

export const deleteDeck = async (deckId: string) => {
  const db = getDb();
  setDecks(db.decks.filter((deck) => deckId !== deck.id));
  revalidatePath("/dashboard");
  revalidatePath("/decks");
};
