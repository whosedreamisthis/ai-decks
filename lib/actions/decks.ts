// @/lib/actions/decks.ts
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

// Safely cast revalidateTag to bypass strict TypeScript compiler signature overloads

export async function createAiDeckAction(
  title: string,
  cards: RawGeneratedCard[],
) {
  console.log("createAiDeckAction started", { title });
  let userId;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (e) {
    // Silent catch for auth check in demo mode
  }

  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  if (!userId && !isDemo) {
    throw new Error("Unauthorized");
  }

  const newDeckId = crypto.randomUUID();
  const formattedCards = cards.map((card) => ({
    id: crypto.randomUUID(),
    question: card.question,
    answer: card.answer,
  }));

  // FIXED: Changed createdAt to a native Date object to perfectly match your database's Deck interface
  const newDeck = {
    id: newDeckId,
    userId: userId || undefined,
    title: title || "AI Generated Deck",
    progress: 0,
    status: "active" as const,
    cards: formattedCards,
    createdAt: new Date(), // <-- Native Date Object
    isDemoDeck: isDemo,
  };

  if (isDemo) {
    // 1. SAVE TO IN-MEMORY DB (Immediate session persistence)
    const db = getDb();
    db.decks.push(newDeck);

    // 2. SAVE TO COOKIES (Best-effort persistence across restarts)
    const existingDemoDecksRaw = cookieStore.get("custom_demo_decks")?.value;
    const existingDemoDecks = existingDemoDecksRaw
      ? JSON.parse(existingDemoDecksRaw)
      : [];

    // Stringify the date property specifically for cookie transport payload safety
    const cookiePayloadDeck = {
      ...newDeck,
      createdAt: newDeck.createdAt.toISOString(),
    };

    existingDemoDecks.push(cookiePayloadDeck);

    const serializedDecks = JSON.stringify(existingDemoDecks);
    // console.log("Cookie size estimate:", serializedDecks.length, "bytes");

    if (serializedDecks.length > 4000) {
      console.warn(
        "Cookie size exceeding 4KB limit! This deck may not persist across server restarts.",
      );
    }

    try {
      cookieStore.set("custom_demo_decks", serializedDecks, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 Hours
      });
      // console.log("Successfully set custom_demo_decks cookie");
    } catch (cookieError) {
      console.error(
        "Failed to set custom_demo_decks cookie (likely size limit):",
        cookieError,
      );
    }
  } else {
    // Authenticated path for persistent database storage layouts
    const db = getDb();
    db.decks.push(newDeck); // <-- This will now compile with no type mismatch errors!
  }

  revalidateTag("decks", "max");
  redirect(`/decks/${newDeckId}`);
}

export const getDecks = async (filter: "active" | "archived" | "all") => {
  let userId: string | null = null;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (e) {
    /* Ignore */
  }

  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  const db = getDb();
  let masterDecks = db.decks || [];

  // Inject any browser-cookie saved AI decks into the layout pool if in demo mode
  if (isDemo) {
    const customDemoDecksRaw = cookieStore.get("custom_demo_decks")?.value;
    if (customDemoDecksRaw) {
      try {
        const customDecks = JSON.parse(customDemoDecksRaw).map((deck: any) => ({
          ...deck,
          createdAt: new Date(deck.createdAt), // Re-hydrate the string back into a Date instance object
        }));

        // Merge without duplicates (favoring DB version if already present)
        const dbDeckIds = new Set(masterDecks.map((d) => d.id));
        const uniqueCustomDecks = customDecks.filter(
          (d: any) => !dbDeckIds.has(d.id),
        );

        masterDecks = [...masterDecks, ...uniqueCustomDecks];
      } catch (e) {
        console.error("Failed to parse custom demo decks:", e);
      }
    }
  }

  let userDecks = masterDecks.filter(
    (deck) => !deck.userId || (userId && deck.userId === userId),
  );

  if (isDemo) {
    userDecks = userDecks.filter((deck) => !deck.userId || deck.isDemoDeck);
  } else if (userId) {
    userDecks = userDecks.filter((deck) => deck.userId === userId);

    if (userDecks.length === 0) {
      const db = getDb();
      const alreadyExists = db.decks.some(
        (d) => d.id === EXAMPLE_DECK.id && d.userId === userId,
      );

      if (!alreadyExists) {
        const initialDeck = { ...EXAMPLE_DECK, userId };
        db.decks.push(initialDeck);
        userDecks = [initialDeck];
      } else {
        userDecks = db.decks.filter(
          (d) => d.id === EXAMPLE_DECK.id && d.userId === userId,
        );
      }
    }
  }

  return userDecks.filter((deck) => filter === "all" || deck.status === filter);
};

export const getDeckById = async (deckId: string) => {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  let userId: string | null = null;
  try {
    // Only call auth() if we're not explicitly in demo mode or if we need to check ownership
    const authResult = await auth();
    userId = authResult.userId;
  } catch (e) {
    if (!isDemo) {
      console.log("Auth failed in getDeckById");
    }
  }

  const db = getDb();
  let masterDecks = db.decks || [];

  if (isDemo) {
    const customDemoDecksRaw = cookieStore.get("custom_demo_decks")?.value;
    if (customDemoDecksRaw) {
      try {
        const customDecks = JSON.parse(customDemoDecksRaw).map((deck: any) => ({
          ...deck,
          createdAt: new Date(deck.createdAt),
        }));

        // Merge without duplicates (favoring DB version if already present)
        const dbDeckIds = new Set(masterDecks.map((d) => d.id));
        const uniqueCustomDecks = customDecks.filter(
          (d: any) => !dbDeckIds.has(d.id),
        );

        masterDecks = [...masterDecks, ...uniqueCustomDecks];
      } catch (e) {
        console.error("Failed to parse custom demo decks in getDeckById:", e);
      }
    }
  }

  const deck = masterDecks.find((d) => d.id === deckId);

  if (!deck) {
    return null;
  }

  // Security check: ensure the user owns the deck or it's a demo deck in demo mode
  if (isDemo) {
    // In demo mode, we allow access to any deck that is marked as a demo deck OR has no owner
    if (!deck.userId || deck.isDemoDeck) return deck;

    // If the deck HAS a userId and we are in demo mode, we only allow it if it's explicitly a demo deck
    // This handles the case where a user logs out but their demo cookie persists
    if (deck.isDemoDeck) return deck;
  } else if (userId) {
    if (deck.userId === userId) return deck;
  }

  return null;
};

export const resetDecks = async () => {
  const db = getDb();
  const { userId } = await auth();
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  if (isDemo) {
    cookieStore.delete("custom_demo_decks");
    setDecks([...MOCK_DECKS]);
    db.studyHistoryLog = [];
    db.deckProgress = [];
    db.activeDeckSession = [];
  } else if (userId) {
    setDecks(db.decks.filter((deck) => deck.userId !== userId));
    db.studyHistoryLog = db.studyHistoryLog.filter(
      (log) => log.userId !== userId,
    );
    db.deckProgress = db.deckProgress.filter((p) => p.userId !== userId);
    db.activeDeckSession = db.activeDeckSession.filter(
      (s) => s.userId !== userId,
    );
  }

  revalidateTag("decks", "max");
  console.log("Reset database state completely.");
};

export const archiveDeck = async (deckId: string) => {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  if (isDemo) {
    const customDemoDecksRaw = cookieStore.get("custom_demo_decks")?.value;
    if (customDemoDecksRaw) {
      const decks = JSON.parse(customDemoDecksRaw).map((d: any) =>
        d.id === deckId ? { ...d, status: "archived" } : d,
      );
      cookieStore.set("custom_demo_decks", JSON.stringify(decks), {
        path: "/",
      });
    }
  } else {
    const db = getDb();
    setDecks(
      db.decks.map((d) => (d.id === deckId ? { ...d, status: "archived" } : d)),
    );
  }
  revalidateTag("decks", "max");
};

export const unarchiveDeck = async (deckId: string) => {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  if (isDemo) {
    const customDemoDecksRaw = cookieStore.get("custom_demo_decks")?.value;
    if (customDemoDecksRaw) {
      const decks = JSON.parse(customDemoDecksRaw).map((d: any) =>
        d.id === deckId ? { ...d, status: "active" } : d,
      );
      cookieStore.set("custom_demo_decks", JSON.stringify(decks), {
        path: "/",
      });
    }
  } else {
    const db = getDb();
    setDecks(
      db.decks.map((d) => (d.id === deckId ? { ...d, status: "active" } : d)),
    );
  }
  revalidateTag("decks", "max");
};

export const deleteDeck = async (deckId: string) => {
  const db = getDb();
  const { userId } = await auth();
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  if (isDemo) {
    const customDemoDecksRaw = cookieStore.get("custom_demo_decks")?.value;
    if (customDemoDecksRaw) {
      const decks = JSON.parse(customDemoDecksRaw).filter(
        (d: any) => d.id !== deckId,
      );
      cookieStore.set("custom_demo_decks", JSON.stringify(decks), {
        path: "/",
      });
    }
  } else {
    setDecks(db.decks.filter((deck) => deckId !== deck.id));
    if (userId) {
      db.deckProgress = db.deckProgress.filter(
        (p) => !(p.deckId === deckId && p.userId === userId),
      );
      db.activeDeckSession = db.activeDeckSession.filter(
        (s) => !(s.deckId === deckId && s.userId === userId),
      );
    }
  }

  revalidateTag("decks", "max");
};
