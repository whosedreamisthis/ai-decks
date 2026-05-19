"use server";
import { MOCK_DECKS } from "@/lib/mock-data";
import { revalidatePath } from "next/cache";

// Use a global variable to persist data across HMR in development
declare global {
  var _db: typeof MOCK_DECKS | undefined;
}

if (!global._db) {
  global._db = [...MOCK_DECKS];
}

const getDb = () => global._db!;
const setDb = (newDb: typeof MOCK_DECKS) => {
  global._db = newDb;
};

export const getDecks = async (filter: "active" | "archived" | "all") => {
  const db = getDb();
  // If "all", bypass the filter completely; otherwise, match the status
  return db.filter((deck) => filter === "all" || deck.status === filter);
};

export const resetDecks = async () => {
  setDb([...MOCK_DECKS]);
  revalidatePath("/dashboard");
  revalidatePath("/decks");
  console.log("resetting decks to mock decks");
};

export const archiveDeck = async (deckId: string) => {
  const db = getDb();
  setDb(
    db.map((deck) =>
      deck.id === deckId ? { ...deck, status: "archived" } : deck,
    ),
  );
  revalidatePath("/dashboard");
  revalidatePath("/decks");
  console.log("Archiving deck with ID:", deckId);
};

export const unarchiveDeck = async (deckId: string) => {
  const db = getDb();
  setDb(
    db.map((deck) =>
      deck.id === deckId ? { ...deck, status: "active" } : deck,
    ),
  );

  revalidatePath("/dashboard");
  revalidatePath("/decks");

  console.log("Unarchiving deck with ID:", deckId);
};

export const deleteDeck = async (deckId: string) => {
  const db = getDb();
  setDb(db.filter((deck) => deckId !== deck.id));
  revalidatePath("/dashboard");
  revalidatePath("/decks");
  console.log("Deleting deck with ID:", deckId);
};
