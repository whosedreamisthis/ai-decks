import React from "react";
import CreateDeckGraphic from "./create-deck-graphic";
import { Button } from "@/components/ui/button";

const CreateNewDeckCard = () => {
  return (
    <div className="m-5 flex gap-3 items-center justify-center p-5 bg-brand-mint-light border-brand-mint border rounded-md">
      <CreateDeckGraphic />
      <div className="flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xl font-semibold">Create New Deck</p>
          <p className="text-sm text-muted-foreground">
            Enter any topic and instantly create a tailored 10-card study
            powered by Gemini
          </p>
        </div>
        <Button className=" w-fit p-5 bg-brand-mint hover:bg-brand-mint/80">
          Create Now
        </Button>
      </div>
    </div>
  );
};

export default CreateNewDeckCard;
