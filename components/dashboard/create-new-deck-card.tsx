"use client";

import React, { useState } from "react";
import CreateDeckGraphic from "./create-deck-graphic";
import { Button } from "@/components/ui/button";
import AIGenerationModal from "./ai-generation-modal";

const CreateNewDeckCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Container is explicitly locked down into flex-1 filling columns */}
      {/* FIXED: Added dark:bg-emerald-950/30 and dark:border-emerald-800/60 so this promotional card
          melds perfectly into dark layouts without casting an intense neon green glare */}
      <div className="flex-1 flex gap-3 items-center justify-center p-5 mx-5 md:m-5 md:mr-0 bg-brand-mint-light dark:bg-slate-700/60 border-brand-mint dark:border-emerald-800/60 border rounded-md w-auto h-full ">
        <CreateDeckGraphic />
        <div className="flex flex-col gap-2 flex-1">
          <div>
            {/* FIXED: Swapped static text-slate-800 text class over to text-slate-900 dark:text-slate-100 */}
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Create New Deck
            </p>
            {/* FIXED: Ensured secondary summary text can be read clearly via dark:text-slate-400 */}
            <p className="text-sm text-muted-foreground dark:text-slate-400">
              Enter any topic and instantly generate a custom study session
              optimized by Gemini.
            </p>
          </div>
          <Button
            className="w-fit py-2 px-4 bg-brand-mint hover:bg-brand-mint/80 rounded-md text-white font-medium shadow-sm "
            onClick={() => setIsModalOpen(true)}
          >
            Create Now
          </Button>
        </div>
      </div>

      <AIGenerationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CreateNewDeckCard;
