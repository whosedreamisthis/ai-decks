"use server";
import { MOCK_DECKS } from "@/lib/mock-data";
import { revalidatePath } from "next/cache";

let db = MOCK_DECKS;

export const getDecks = async (filter: "active" | "archived" | "all") => {
  // If "all", bypass the filter completely; otherwise, match the status
  return db.filter((deck) => filter === "all" || deck.status === filter);
};

export const resetDecks = async () => {
  db = MOCK_DECKS;
  revalidatePath("/dashboard");
  console.log("resetting decks to mock decks");
};

export const archiveDeck = async (deckId: string) => {
  db = db.map((deck) =>
    deck.id === deckId ? { ...deck, status: "archived" } : deck,
  );
  revalidatePath("/dashboard");
  revalidatePath("/decks");
  console.log("Archiving deck with ID:", deckId);
};

export const unarchiveDeck = async (deckId: string) => {
  db = db.map((deck) =>
    deck.id === deckId ? { ...deck, status: "active" } : deck,
  );

  revalidatePath("/dashboard");
  revalidatePath("/decks");

  console.log("Unarchiving deck with ID:", deckId);
};

export const deleteDeck = async (deckId: string) => {
  db = db.filter((deck) => deckId !== deck.id);
  revalidatePath("/dashboard");
  console.log("Deleting deck with ID:", deckId);
};
