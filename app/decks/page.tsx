import React from "react";
import PageHeader from "@/components/common/page-header";
import { getDecks } from "@/lib/actions/decks";
import DecksContainer from "@/components/decks/decks-container";

const Page = async () => {
  const activeDecks = await getDecks("active");
  const archivedDecks = await getDecks("archived");
  return (
    <div>
      <PageHeader title="Your Decks" />
      <DecksContainer active={activeDecks} archived={archivedDecks} />
    </div>
  );
};

export default Page;
