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

  const decks = await getDecks("active");
  const { userId } = await auth();
  const db = getDb();
  const allUserProgress = db.deckProgress.filter((p) => p.userId === userId);

  return (
    <div className="min-h-screen bg-brand-blue/10 overflow-hidden pb-25">
      <DashboardHeader isDemo={isDemo} />
      <DashboardSummary
        overallProficiency="85%"
        totalCardCount={100}
        activeDecksCount={5}
      />
      <CreateNewDeckCard />
      <CurrentDecks decks={decks} userProgress={allUserProgress} />
    </div>
  );
};

export default DashboardPage;
