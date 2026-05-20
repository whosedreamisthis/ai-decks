// @/lib/actions/session.ts
"use server";

import { getDb } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface FinalizeSessionInput {
  deckId: string;
  totalAnswered: number;
  correctCount: number;
  accuracy: number;
  history: Record<string, "correct" | "incorrect">;
}

export async function finalizeStudySessionAction(data: FinalizeSessionInput) {
  const db = await getDb();

  // 1. Authenticate user via Clerk
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: You must be logged in to save progress.");
  }

  const { deckId, totalAnswered, correctCount, accuracy } = data;

  try {
    // --- TRANSACTION SIMULATION ---

    // A) Log this completed attempt into a permanent history log table
    const newLogItem = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      deckId,
      score: correctCount,
      totalCards: totalAnswered,
      accuracyPercentage: accuracy,
      completedAt: new Date(),
    };
    db.studyHistoryLog.push(newLogItem);

    // B) Update or Upsert the cumulative progress record for this deck
    const existingProgressIndex = db.deckProgress.findIndex(
      (p) => p.userId === userId && p.deckId === deckId,
    );

    if (existingProgressIndex > -1) {
      // Update existing progress record
      const existing = db.deckProgress[existingProgressIndex];
      db.deckProgress[existingProgressIndex] = {
        ...existing,
        lastStudied: new Date(),
        highestAccuracy: Math.max(existing.highestAccuracy, accuracy),
        timesReviewed: existing.timesReviewed + 1,
      };
    } else {
      // Create new progress record (Upsert fallback)
      db.deckProgress.push({
        userId,
        deckId,
        lastStudied: new Date(),
        highestAccuracy: accuracy,
        timesReviewed: 1,
      });
    }

    // C) HOUSEKEEPING: Delete intermediate save states
    db.activeDeckSession = db.activeDeckSession.filter(
      (session) => !(session.userId === userId && session.deckId === deckId),
    );

    // 3. Purge the Next.js data cache to instantly update UI elements
    revalidatePath(`/decks/${deckId}`);
    revalidatePath("/dashboard");

    console.log(
      `Successfully completed deck session tracking for user ${userId}`,
    );
    return { success: true };
  } catch (error) {
    console.error("Simulation failure in finalizeStudySessionAction:", error);
    throw new Error("Could not finalize study session. Please try again.");
  }
}

// Save mid-session progress
export async function saveActiveSessionAction(
  deckId: string,
  currentIndex: number,
  progress: Record<string, "correct" | "incorrect">,
) {
  const db = await getDb();
  const { userId } = await auth();
  if (!userId) return { success: false };

  const existingIndex = db.activeDeckSession.findIndex(
    (s) => s.userId === userId && s.deckId === deckId,
  );

  const sessionPayload = { userId, deckId, currentIndex, progress };

  if (existingIndex > -1) {
    db.activeDeckSession[existingIndex] = sessionPayload;
  } else {
    db.activeDeckSession.push(sessionPayload);
  }

  return { success: true };
}

// Fetch saved session progress on mount
export async function getActiveSessionAction(deckId: string) {
  const db = await getDb();
  const { userId } = await auth();
  if (!userId) return null;

  return (
    db.activeDeckSession.find(
      (s) => s.userId === userId && s.deckId === deckId,
    ) || null
  );
}
