"use client";

import { useState, useEffect } from "react";
import { Deck } from "@/lib/types";
import DeckList from "@/components/decks/deck-list";
import { MoveRight } from "lucide-react";
import Link from "next/link";

interface CurrentDecksProps {
  decks: Deck[];
}

const CurrentDecks = ({ decks }: CurrentDecksProps) => {
  const [currentDecks, setCurrentDecks] = useState<Deck[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const filtered = decks.filter((deck) => {
      const savedActiveSession = localStorage.getItem(
        `study_session_${deck.id}`,
      );
      if (savedActiveSession) {
        try {
          const { percentage } = JSON.parse(savedActiveSession);
          return percentage > 0;
        } catch (error) {
          // Fallback if localstorage JSON is ever corrupted
          return false;
        }
      }
      return false;
    });

    setCurrentDecks(filtered);
  }, [decks]);

  if (!isMounted) {
    return (
      <div className="bg-white flex flex-col gap-4 m-5 shadow-md p-5 border border-gray-200 rounded-md animate-pulse">
        <p className="text-xl font-bold">Current Decks</p>
        <div className="h-24 bg-gray-100 rounded mt-4" />
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col gap-4 m-5 shadow-md p-5 border border-gray-200 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Current Decks</p>
        <Link href="/decks" className="flex gap-2">
          <p>View all decks</p>
          <MoveRight />
        </Link>
      </div>
      {currentDecks.length > 0 ? (
        <DeckList decks={currentDecks} />
      ) : (
        <>
          <p className="text-center text-sm mt-10">
            There are no active decks.
          </p>
        </>
      )}
    </div>
  );
};

export default CurrentDecks;
