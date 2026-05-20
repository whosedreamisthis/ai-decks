// @/lib/actions/decks.ts
// @/lib/actions/decks.ts
"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { getDb, setDecks } from "@/lib/db";
import { MOCK_DECKS } from "@/lib/mock-data";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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

  revalidatePath("/dashboard");
  revalidatePath("/decks");
  redirect(`/decks/${newDeckId}`);
}

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
