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

  // Loading skeleton layout matching the frame boundaries exactly
  if (!isMounted) {
    return (
      <div className="flex-1 bg-white flex flex-col mx-5 md:m-5 shadow-md p-5 border border-gray-200 rounded-md w-auto h-full animate-pulse">
        <p className="text-xl font-bold text-slate-800">Current Decks</p>
        <div className="h-24 bg-slate-100 rounded mt-4" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col my-5 mx-5 md:m-5 shadow-md p-5 border border-gray-200 rounded-md w-auto h-full">
      <div className="flex items-center justify-between shrink-0 mb-4">
        <p className="text-xl font-bold text-slate-800">Current Decks</p>
        <Link
          href="/decks"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
        >
          <span>View all decks</span>
          <MoveRight
            size={16}
            className="transform group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {currentDecks.length > 0 ? (
        <div className="flex-1 overflow-y-auto min-h-0">
          <DeckList decks={currentDecks} />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[140px] text-center border-2 border-dashed border-slate-100 rounded-xl p-4">
          <p className="text-sm text-muted-foreground max-w-xs">
            There are no active study sessions at the moment. Pick a deck or
            generate one to begin!
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentDecks;
