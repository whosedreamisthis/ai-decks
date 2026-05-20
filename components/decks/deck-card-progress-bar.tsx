// @/components/decks/deck-card-progress-bar.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProgressBar from "@/components/common/progress-bar";

interface DeckCardProgressBarProps {
  deckId: string;
}

export default function DeckCardProgressBar({
  deckId,
}: DeckCardProgressBarProps) {
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    const savedData = localStorage.getItem(`study_session_${deckId}`);
    if (savedData) {
      try {
        const { percentage: savedPercentage } = JSON.parse(savedData);
        setPercentage(savedPercentage || 0);
        console.log("Deck progress loaded from localStorage", savedPercentage);
      } catch (e) {
        console.error("Error parsing deck progress from localStorage:", e);
        setPercentage(0);
      }
    } else {
      setPercentage(0); // Safely sets 0% progress if no session state exists
    }
  }, [deckId]);

  return (
    <div className="flex-1 max-w-[100px]">
      <ProgressBar percentage={percentage} isFull={false} />
    </div>
  );
}
