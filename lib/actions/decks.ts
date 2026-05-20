"use server";

import { updateTag } from "next/cache";
import { cache } from "react";
import { getDb, setDecks } from "@/lib/db";
import { MOCK_DECKS } from "@/lib/mock-data";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";

interface RawGeneratedCard {
  question: string;
  answer: string;
}

export async function createAiDeckAction(
  title: string,
  cards: RawGeneratedCard[],
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const db = getDb();
  const newDeckId = crypto.randomUUID();

  // Format the inner cards to perfectly match your Card interface
  const formattedCards = cards.map((card) => ({
    id: crypto.randomUUID(),
    question: card.question,
    answer: card.answer,
  }));

  // Matches your exact Deck interface schema structures
  const newDeck = {
    id: newDeckId,
    userId, // Stored if your database uses multi-tenant indexing records
    title: title || "AI Generated Deck",
    progress: 0, // Starts fresh at zero progress
    status: "active" as const,
    cards: formattedCards,
    createdAt: new Date(),
  };

  db.decks.push(newDeck);

  updateTag("decks");
  redirect(`/decks/${newDeckId}`);
}

export const getDecks = async (filter: "active" | "archived" | "all") => {
  // 1. Wrap the raw database retrieval in Next.js's data cache wrapper
  const getCachedDecks = unstable_cache(
    async () => {
      const db = getDb();
      return db.decks || [];
    },
    ["decks-storage-key"], // Unique cache identifier string
    { tags: ["decks"] }, // This links it to your updateTag("decks") calls!
  );

  // 2. Fetch the cached array
  const decks = await getCachedDecks();

  // 3. Apply your client-facing filtering logic on the cached data
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

  updateTag("decks");
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
  updateTag("decks");
};

export const unarchiveDeck = async (deckId: string) => {
  const db = getDb();
  setDecks(
    db.decks.map((deck) =>
      deck.id === deckId ? { ...deck, status: "active" } : deck,
    ),
  );
  updateTag("decks");
};

export const deleteDeck = async (deckId: string) => {
  const db = getDb();
  const { userId } = await auth();

  // 1. Remove the deck itself
  setDecks(db.decks.filter((deck) => deckId !== deck.id));

  // 2. Clean up associated progress and active sessions
  if (userId) {
    db.deckProgress = db.deckProgress.filter(
      (p) => !(p.deckId === deckId && p.userId === userId),
    );
    db.activeDeckSession = db.activeDeckSession.filter(
      (s) => !(s.deckId === deckId && s.userId === userId),
    );
    // Note: We might want to keep studyHistoryLog for overall user stats,
    // or we could delete it too if we want a full wipe.
    // For now, keeping history to preserve "Overall Proficiency" stats.
  }

  updateTag("decks");
};
