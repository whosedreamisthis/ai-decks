import React from "react";
import { Deck } from "@/lib/types";
import { FiArchive } from "react-icons/fi";
import { UserCheck } from "lucide-react";
import DeckActions from "@/components/decks/deck-actions";
import Link from "next/link";
import DeckCardProgressBar from "@/components/decks/deck-card-progress-bar";

interface DeckCardProps {
  deck: Deck;
}

const DeckCard = ({ deck }: DeckCardProps) => {
  return (
    /* FIXED: Changed dark:border-slate-800 to dark:border-slate-700 for a visible light border outline in dark mode */
    <div className="relative flex flex-col shadow-md bg-white dark:bg-slate-700/60 border border-gray-200 dark:border-slate-700 rounded-md hover:border-slate-300 dark:hover:border-slate-500 ">
      <div className="relative z-10">
        <DeckActions deckId={deck.id} status={deck.status} />
      </div>

      <Link
        href={`/decks/${deck.id}`}
        className="absolute inset-0 z-0 rounded-md cursor-pointer"
        aria-label={`View ${deck.title} deck`}
      />

      <div className="w-full flex gap-2 p-4 rounded-md justify-start items-center">
        <div className="flex justify-center items-center h-10 w-10 rounded-lg bg-brand-mint-light dark:bg-emerald-950/40 text-brand-mint shadow-sm shrink-0">
          {deck.status === "active" ? (
            <UserCheck size={20} />
          ) : (
            <FiArchive size={20} />
          )}
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-md font-bold text-slate-900 dark:text-slate-100 truncate">
            {deck.title}
          </p>
          <div className="flex items-center justify-between gap-4 mt-0.5">
            <p className="text-sm text-muted-foreground dark:text-slate-400 shrink-0">
              {deck.cards.length} cards
            </p>

            {deck.status === "active" && (
              <DeckCardProgressBar deckId={deck.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckCard;
