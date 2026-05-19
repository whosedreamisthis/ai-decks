import React from "react";
import { Deck } from "@/lib/types";
import { FiCreditCard } from "react-icons/fi";
import CurrentDeckActions from "@/components/decks/current-deck-actions";

const DeckCard = ({ deck }: { deck: Deck }) => {
  return (
    <div className="relative flex flex-col  shadow-md border border-gray-200">
      <CurrentDeckActions deckId={deck.id} />
      <div className="w-full flex gap-2 p-4 rounded-md justify-start items-center">
        <div className="flex justify-center items-center h-10 w-10 rounded-lg bg-brand-mint-light text-brand-mint shadow-sm">
          <FiCreditCard size={20} />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-md font-bold">{deck.title}</p>
          <div className="flex  w items-center justify-between">
            <p className="text-sm text-muted-foreground shrink-0">200 cards</p>
            <div className="relative h-2 flex-1 max-w-[70%] translate-y-[1.5px]">
              <div className="absolute inset-0 bg-slate-200/80 dark:bg-stone-700 rounded-full"></div>
              <div
                className={`absolute inset-0 rounded-full bg-brand-mint transition-all duration-30`}
                style={{
                  width: `${Math.min(85, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckCard;
