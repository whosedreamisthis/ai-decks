"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Deck } from "@/lib/types";
import DeckList from "@/components/decks/deck-list";
import DeckFilterToggle from "@/components/decks/deck-filter-toggle";

interface Props {
  active: Deck[];
  archived: Deck[];
}

const DecksContainer = ({ active, archived }: Props) => {
  const [showActiveDecks, setShowActiveDecks] = useState(true);

  return (
    <div className="mb-15 p-5 w-full flex flex-col gap-5">
      <DeckFilterToggle
        showActiveDecks={showActiveDecks}
        setShowActiveDecks={setShowActiveDecks}
        numActive={active.length}
        numArchived={archived.length}
      />
      <div className="w-full min-h-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={showActiveDecks ? "active" : "archived"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            {showActiveDecks ? (
              active.length > 0 ? (
                <DeckList decks={active} />
              ) : (
                <>
                  <div className="flex-1 flex flex-col items-center justify-center min-h-35 text-center border-2 border-dashed border-slate-100 dark:border-slate-700/60 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground dark:text-slate-400 max-w-xs">
                      There are no active decks.
                    </p>
                  </div>
                </>
              )
            ) : archived.length > 0 ? (
              <DeckList decks={archived} />
            ) : (
              <>
                <div className="flex-1 flex flex-col items-center justify-center min-h-35 text-center border-2 border-dashed border-slate-100 dark:border-slate-700/60 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground dark:text-slate-400 max-w-xs">
                    There are no archived decks.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DecksContainer;
