// @/components/decks/deck-card.tsx
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
    <div className="relative flex flex-col shadow-md border border-gray-200 rounded-md bg-white hover:border-slate-300 transition-all">
      <div className="relative z-10">
        <DeckActions deckId={deck.id} status={deck.status} />
      </div>

      <Link
        href={`/decks/${deck.id}`}
        className="absolute inset-0 z-0 rounded-md cursor-pointer"
        aria-label={`View ${deck.title} deck`}
      />

      <div className="w-full flex gap-2 p-4 rounded-md justify-start items-center">
        <div className="flex justify-center items-center h-10 w-10 rounded-lg bg-brand-mint-light text-brand-mint shadow-sm shrink-0">
          {deck.status === "active" ? (
            <UserCheck size={20} />
          ) : (
            <FiArchive size={20} />
          )}
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-md font-bold text-slate-800 truncate">
            {deck.title}
          </p>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground shrink-0">
              {deck.cards.length} cards
            </p>

            {/* Renders the client-side progress reader dynamically */}
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
