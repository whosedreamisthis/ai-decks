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
  const [showActiveDecks, setShowActiveDecks] = useState(false);

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
                  <p className="text-center text-sm mt-20">
                    There are no active decks.
                  </p>
                </>
              )
            ) : archived.length > 0 ? (
              <DeckList decks={archived} />
            ) : (
              <>
                <p className="text-center text-sm mt-20">
                  There are no archived decks.
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DecksContainer;
