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

  const userProgress = (db.deckProgress || []).filter(
    (p) => p.userId === userId,
  );

  let totalWeightedScore = 0;
  let totalCardsInStudiedDecks = 0;

  userProgress.forEach((p) => {
    // Only count progress for decks that still exist and are active
    const deck = activeDecks.find((d) => d.id === p.deckId);
    if (deck) {
      const cardsCount = deck.cards?.length || 0;
      totalWeightedScore += (p.highestAccuracy / 100) * cardsCount;
      totalCardsInStudiedDecks += cardsCount;
    }
  });

  const activeDecksCount = activeDecks.length;
  const computedProficiency =
    totalCardsInStudiedDecks > 0
      ? Math.round((totalWeightedScore / totalCardsInStudiedDecks) * 100)
      : 0;

  const overallProficiency = `${computedProficiency}%`;

  return (
    <div className="min-h-screen bg-brand-blue/10 overflow-hidden pb-25">
      <DashboardHeader isDemo={isDemo} />
      <DashboardSummary
        overallProficiency={overallProficiency}
        totalCardCount={totalCardCount}
        activeDecksCount={activeDecksCount}
      />
      <div className="flex flex-col md:flex-row">
        <CreateNewDeckCard />
        <CurrentDecks decks={activeDecks} />
      </div>
    </div>
  );
};

export default DashboardPage;
