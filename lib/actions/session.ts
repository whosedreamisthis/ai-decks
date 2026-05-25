// @/lib/actions/session.ts
"use server";

import { getDb } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface FinalizeSessionInput {
  deckId: string;
  totalAnswered: number;
  correctCount: number;
  accuracy: number;
  history: Record<string, "correct" | "incorrect">;
}

// Helper to cast revalidateTag safely for Next.js build engines
const clearCache = revalidateTag as (tag: string) => void;

export async function finalizeStudySessionAction(data: FinalizeSessionInput) {
  const db = await getDb();

  let userId: string | null = null;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (e) {
    console.log("Auth skipped or failed in demo tracking mode");
  }

  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  // Guard clause against unauthenticated live users
  if (!userId && !isDemo) {
    throw new Error("Unauthorized: You must be logged in to save progress.");
  }

  const { deckId, totalAnswered, correctCount, accuracy } = data;

  try {
    if (isDemo) {
      // --- DEMO USER COOKIE TRANSACTION ENGINE ---
      const nowString = new Date().toISOString();

      // A) Log attempt into cookie history
      const existingHistoryRaw = cookieStore.get("custom_demo_history")?.value;
      const demoHistory = existingHistoryRaw
        ? JSON.parse(existingHistoryRaw)
        : [];
      demoHistory.push({
        id: `log_${Date.now()}`,
        userId: "demo-user-id",
        deckId,
        score: correctCount,
        totalCards: totalAnswered,
        accuracyPercentage: accuracy,
        completedAt: nowString,
      });
      cookieStore.set("custom_demo_history", JSON.stringify(demoHistory), {
        path: "/",
      });

      // B) Update cumulative deck progress in cookies
      const existingProgressRaw = cookieStore.get(
        "custom_demo_progress",
      )?.value;
      let demoProgress = existingProgressRaw
        ? JSON.parse(existingProgressRaw)
        : [];
      const progIndex = demoProgress.findIndex((p: any) => p.deckId === deckId);

      if (progIndex > -1) {
        demoProgress[progIndex] = {
          ...demoProgress[progIndex],
          lastStudied: nowString,
          highestAccuracy: Math.max(
            demoProgress[progIndex].highestAccuracy,
            accuracy,
          ),
          timesReviewed: demoProgress[progIndex].timesReviewed + 1,
        };
      } else {
        demoProgress.push({
          userId: "demo-user-id",
          deckId,
          lastStudied: nowString,
          highestAccuracy: accuracy,
          timesReviewed: 1,
        });
      }
      cookieStore.set("custom_demo_progress", JSON.stringify(demoProgress), {
        path: "/",
      });

      // C) Housekeeping: Delete intermediate mid-session saves out of cookies
      const existingSessionsRaw = cookieStore.get(
        "custom_demo_sessions",
      )?.value;
      if (existingSessionsRaw) {
        const demoSessions = JSON.parse(existingSessionsRaw).filter(
          (s: any) => s.deckId !== deckId,
        );
        cookieStore.set("custom_demo_sessions", JSON.stringify(demoSessions), {
          path: "/",
        });
      }
    } else {
      // --- AUTHENTICATED CLERK DB FLOW ---
      const newLogItem = {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: userId!,
        deckId,
        score: correctCount,
        totalCards: totalAnswered,
        accuracyPercentage: accuracy,
        completedAt: new Date(),
      };
      db.studyHistoryLog.push(newLogItem);

      const existingProgressIndex = db.deckProgress.findIndex(
        (p) => p.userId === userId && p.deckId === deckId,
      );

      if (existingProgressIndex > -1) {
        const existing = db.deckProgress[existingProgressIndex];
        db.deckProgress[existingProgressIndex] = {
          ...existing,
          lastStudied: new Date(),
          highestAccuracy: Math.max(existing.highestAccuracy, accuracy),
          timesReviewed: existing.timesReviewed + 1,
        };
      } else {
        db.deckProgress.push({
          userId: userId!,
          deckId,
          lastStudied: new Date(),
          highestAccuracy: accuracy,
          timesReviewed: 1,
        });
      }

      db.activeDeckSession = db.activeDeckSession.filter(
        (session) => !(session.userId === userId && session.deckId === deckId),
      );
    }

    // Standard cache tag invalidation updates both paths flawlessly
    clearCache("decks");

    console.log(`Successfully completed deck session tracking.`);
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
  let userId: string | null = null;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (e) {
    /* Ignore */
  }

  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  if (!userId && !isDemo) return { success: false };

  if (isDemo) {
    const existingSessionsRaw = cookieStore.get("custom_demo_sessions")?.value;
    let demoSessions = existingSessionsRaw
      ? JSON.parse(existingSessionsRaw)
      : [];
    const existingIndex = demoSessions.findIndex(
      (s: any) => s.deckId === deckId,
    );

    const sessionPayload = {
      userId: "demo-user-id",
      deckId,
      currentIndex,
      progress,
    };

    if (existingIndex > -1) {
      demoSessions[existingIndex] = sessionPayload;
    } else {
      demoSessions.push(sessionPayload);
    }
    cookieStore.set("custom_demo_sessions", JSON.stringify(demoSessions), {
      path: "/",
    });
    return { success: true };
  }

  // Fallback database mutations for true profiles
  const db = await getDb();
  const existingIndex = db.activeDeckSession.findIndex(
    (s) => s.userId === userId && s.deckId === deckId,
  );

  const sessionPayload = { userId: userId!, deckId, currentIndex, progress };

  if (existingIndex > -1) {
    db.activeDeckSession[existingIndex] = sessionPayload;
  } else {
    db.activeDeckSession.push(sessionPayload);
  }

  return { success: true };
}

// Fetch saved session progress on mount
export async function getActiveSessionAction(deckId: string) {
  let userId: string | null = null;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (e) {
    /* Ignore */
  }

  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  if (!userId && !isDemo) return null;

  if (isDemo) {
    const existingSessionsRaw = cookieStore.get("custom_demo_sessions")?.value;
    if (!existingSessionsRaw) return null;

    const demoSessions = JSON.parse(existingSessionsRaw);
    return demoSessions.find((s: any) => s.deckId === deckId) || null;
  }

  const db = await getDb();
  return (
    db.activeDeckSession.find(
      (s) => s.userId === userId && s.deckId === deckId,
    ) || null
  );
}
