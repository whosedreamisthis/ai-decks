"use server";

import { getDb } from "@/lib/actions/decks"; // Your database client instance
import { auth } from "@clerk/nextjs/server"; // Or whichever auth library you use
import { revalidatePath } from "next/cache";

interface FinalizeSessionInput {
  deckId: string;
  totalAnswered: number;
  correctCount: number;
  accuracy: number;
  history: Record<string, "correct" | "incorrect">;
}

export async function finalizeStudySessionAction(data: FinalizeSessionInput) {
  let db = await getDb();
  // 1. Authenticate the user securely on the server
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: You must be logged in to save progress.");
  }

  const { deckId, totalAnswered, correctCount, accuracy } = data;

  try {
    // 2. Run database operations in a transaction to guarantee data integrity
    await db.$transaction([
      // A) Log this completed attempt into a permanent history log table
      db.studyHistoryLog.create({
        data: {
          userId,
          deckId,
          score: correctCount,
          totalCards: totalAnswered,
          accuracyPercentage: accuracy,
          completedAt: new Date(),
        },
      }),

      // B) Update or Upsert the cumulative, overall progress record for this deck
      db.deckProgress.upsert({
        where: {
          userId_deckId: { userId, deckId }, // Assumes a unique compound index
        },
        update: {
          lastStudied: new Date(),
          highestAccuracy: accuracy, // Or compare Math.max(existing, accuracy)
          timesReviewed: { increment: 1 },
        },
        create: {
          userId,
          deckId,
          lastStudied: new Date(),
          highestAccuracy: accuracy,
          timesReviewed: 1,
        },
      }),

      // C) HOUSEKEEPING: Delete the intermediate save state row.
      // This resets their position so their next study run starts from scratch.
      db.activeDeckSession.deleteMany({
        where: {
          userId,
          deckId,
        },
      }),
    ]);

    // 3. Purge the Next.js data cache for the deck details page
    // This forces the dashboard to pull fresh numbers, immediately showing their new score!
    revalidatePath(`/decks/${deckId}`);
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error(
      "Database transaction failure in finalizeStudySessionAction:",
      error,
    );
    throw new Error("Could not finalize study session. Please try again.");
  }
}
