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
      <div className="flex-1 flex gap-3 items-center justify-center p-5 mx-5 md:m-5 md:mr-0 bg-brand-mint-light border-brand-mint border rounded-md w-auto h-full">
        <CreateDeckGraphic />
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <p className="text-xl font-semibold text-slate-800">
              Create New Deck
            </p>
            <p className="text-sm text-muted-foreground">
              Enter any topic and instantly generate a custom study session
              optimized by Gemini.
            </p>
          </div>
          <Button
            className="w-fit py-2 px-4 bg-brand-mint hover:bg-brand-mint/80 rounded-md text-white font-medium shadow-sm transition-colors"
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
