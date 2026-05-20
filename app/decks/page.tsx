import React from "react";
import { getDecks } from "@/lib/actions/decks";
import DecksContainer from "@/components/decks/decks-container";
import DecksHeader from "@/components/decks/decks-header";

const Page = async () => {
  const activeDecks = await getDecks("active");
  const archivedDecks = await getDecks("archived");
  return (
    <div className="min-h-screen bg-brand-blue/10 overflow-hidden pb-5">
      <DecksHeader />
      <DecksContainer active={activeDecks} archived={archivedDecks} />
    </div>
  );
};

export default Page;
