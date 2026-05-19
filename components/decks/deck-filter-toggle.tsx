import React from "react";
import { Button } from "../ui/button";

interface Props {
  showActiveDecks: boolean;
  setShowActiveDecks: (showActive: boolean) => void;
  numActive: number;
  numArchived: number;
}
const DeckFilterToggle = ({
  showActiveDecks,
  setShowActiveDecks,
  numActive,
  numArchived,
}: Props) => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <Button
        variant={`${showActiveDecks ? "default" : "outline"}`}
        className={` w-full max-w-32 ${showActiveDecks ? "p-4  bg-brand-blue text-white" : "p-3border-slate-900"}`}
        onClick={() => setShowActiveDecks(true)}
      >
        Active: {numActive}
      </Button>
      <Button
        variant={`${!showActiveDecks ? "default" : "outline"}`}
        className={`w-full max-w-32 ${!showActiveDecks ? "p-4 bg-brand-blue text-white" : "p-3 border-slate-900"}`}
        onClick={() => setShowActiveDecks(false)}
      >
        Archived: {numArchived}
      </Button>
    </div>
  );
};

export default DeckFilterToggle;
