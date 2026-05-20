"use client";

import React, { useState } from "react";
import CreateDeckGraphic from "./create-deck-graphic";
import { Button } from "@/components/ui/button";
import AIGenerationModal from "./ai-generation-modal"; // Import your new modal component
const CreateNewDeckCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="m-5 flex gap-3 items-center justify-center p-5 bg-brand-mint-light border-brand-mint border rounded-md md:w-[50%] w-auto">
        <CreateDeckGraphic />
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <p className="text-xl font-semibold">Create New Deck</p>
            <p className="text-sm text-muted-foreground">
              Enter any topic and instantly generate a custom study session
              optimized by Gemini.
            </p>
          </div>
          <Button
            className=" w-fit py-2 px-4 bg-brand-mint hover:bg-brand-mint/80 rounded-md text-white "
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
