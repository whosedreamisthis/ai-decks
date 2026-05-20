import React from "react";
import DashboardSummary from "@/components/dashboard/dashboard-summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { cookies } from "next/headers";
import CreateNewDeckCard from "@/components/dashboard/create-new-deck-card";
import CurrentDecks from "@/components/decks/current-decks";
import { getDecks } from "@/lib/actions/decks";
import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  const activeDecks = await getDecks("active");
  const { userId } = await auth();
  const db = getDb();

  const totalCardCount = activeDecks.reduce(
    (acc, deck) => acc + (deck.cards?.length || 0),
    0,
  );

  const allUserHistory = (db.studyHistoryLog || []).filter(
    (p) => p.userId === userId,
  );

  const totalCorrect = allUserHistory.reduce(
    (acc, log) => acc + (log.score || 0),
    0,
  );

  const totalAttempted = allUserHistory.reduce(
    (acc, log) => acc + (log.totalCards || 0),
    0,
  );

  const activeDecksCount = activeDecks.length;
  const computedProficiency =
    totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  const overallProficiency = `${computedProficiency}%`;

  return (
    <div className="min-h-screen bg-brand-blue/10 overflow-hidden pb-25">
      <DashboardHeader isDemo={isDemo} />
      <DashboardSummary
        overallProficiency={overallProficiency}
        totalCardCount={totalCardCount}
        activeDecksCount={activeDecksCount}
      />
      <CreateNewDeckCard />
      <CurrentDecks decks={activeDecks} />
    </div>
  );
};

export default DashboardPage;
