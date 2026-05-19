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
        className={`${showActiveDecks ? "bg-brand-blue text-white" : "border-slate-900"}`}
        onClick={() => setShowActiveDecks(true)}
      >
        Active: {numActive}
      </Button>
      <Button
        variant={`${!showActiveDecks ? "default" : "outline"}`}
        className={`${!showActiveDecks ? "bg-brand-blue text-white" : "border-slate-900"}`}
        onClick={() => setShowActiveDecks(false)}
      >
        Archived: {numArchived}
      </Button>
    </div>
  );
};

export default DeckFilterToggle;
