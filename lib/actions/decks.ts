"use server";

import { revalidateTag } from "next/cache";
import { cache } from "react";
import { getDb, setDecks } from "@/lib/db";
import { MOCK_DECKS, EXAMPLE_DECK } from "@/lib/mock-data";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";

interface RawGeneratedCard {
  question: string;
  answer: string;
}

export async function createAiDeckAction(
  title: string,
  cards: RawGeneratedCard[],
) {
  console.log("createAiDeckAction started", { title, cardCount: cards.length });
  let userId;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (e) {
    console.log(
      "Auth failed, likely in demo or dev mode without clerk config:",
      e,
    );
  }

  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  console.log("Auth state:", { userId, isDemo });

  if (!userId && !isDemo) {
    console.error("Unauthorized: No userId and not in demo mode");
    throw new Error("Unauthorized");
  }

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
    userId: userId || undefined, // Stored if your database uses multi-tenant indexing records
    title: title || "AI Generated Deck",
    progress: 0, // Starts fresh at zero progress
    status: "active" as const,
    cards: formattedCards,
    createdAt: new Date(),
    isDemoDeck: isDemo, // Explicitly mark it as a demo deck if generated in demo mode
  };

  console.log("Pushing new deck to DB:", newDeckId);
  db.decks.push(newDeck);

  console.log("Updating tag and redirecting...");
  try {
    const clearDeckCache = revalidateTag as (tag: string) => void;
    clearDeckCache("decks");
  } catch (e) {
    console.error("updateTag failed:", e);
  }

  const clearDeckCache = revalidateTag as (tag: string) => void;
  clearDeckCache("decks");
  redirect(`/decks/${newDeckId}`);
}

export const getDecks = async (filter: "active" | "archived" | "all") => {
  let userId: string | null = null;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (e) {
    // Ignore auth errors in dev/demo
  }
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

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

  // 3. Filter for the current user
  let userDecks = decks.filter(
    (deck) => !deck.userId || (userId && deck.userId === userId),
  );

  // 4. Handle default decks logic
  if (isDemo) {
    // Demo user sees mock decks AND any AI decks they just generated
    userDecks = userDecks.filter((deck) => !deck.userId || deck.isDemoDeck);
  } else if (userId) {
    // Regular user:
    // Filter to only show their own decks first
    userDecks = userDecks.filter((deck) => deck.userId === userId);

    // If they have no decks at all, they get the example deck
    if (userDecks.length === 0) {
      const db = getDb();
      // Check if it already exists in the master database to prevent duplicates
      const alreadyExists = db.decks.some(
        (d) => d.id === EXAMPLE_DECK.id && d.userId === userId,
      );

      if (!alreadyExists) {
        const initialDeck = { ...EXAMPLE_DECK, userId };
        db.decks.push(initialDeck);
        userDecks = [initialDeck];
      } else {
        // If it exists in master but wasn't in our filtered/cached view for some reason,
        // grab it from master now.
        userDecks = db.decks.filter(
          (d) => d.id === EXAMPLE_DECK.id && d.userId === userId,
        );
      }
    }
  }

  // 5. Apply your client-facing filtering logic on the cached data
  return userDecks.filter((deck) => filter === "all" || deck.status === filter);
};

export const getDeckById = cache(async (deckId: string) => {
  const db = getDb();
  const decks = db.decks || [];
  return decks.find((deck) => deckId === deck.id);
});

export const resetDecks = async () => {
  const db = getDb();
  const { userId } = await auth();
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  if (isDemo) {
    // Reset to full mock decks for demo user
    setDecks([...MOCK_DECKS]);
    db.studyHistoryLog = [];
    db.deckProgress = [];
    db.activeDeckSession = [];
  } else if (userId) {
    // Remove user's decks
    setDecks(db.decks.filter((deck) => deck.userId !== userId));

    // Clear user history
    db.studyHistoryLog = db.studyHistoryLog.filter(
      (log) => log.userId !== userId,
    );
    db.deckProgress = db.deckProgress.filter((p) => p.userId !== userId);
    db.activeDeckSession = db.activeDeckSession.filter(
      (s) => s.userId !== userId,
    );
  }

  const clearDeckCache = revalidateTag as (tag: string) => void;
  clearDeckCache("decks");
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
  const clearDeckCache = revalidateTag as (tag: string) => void;
  clearDeckCache("decks");
};

export const unarchiveDeck = async (deckId: string) => {
  const db = getDb();
  setDecks(
    db.decks.map((deck) =>
      deck.id === deckId ? { ...deck, status: "active" } : deck,
    ),
  );
  const clearDeckCache = revalidateTag as (tag: string) => void;
  clearDeckCache("decks");
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

  const clearDeckCache = revalidateTag as (tag: string) => void;
  clearDeckCache("decks");
};
