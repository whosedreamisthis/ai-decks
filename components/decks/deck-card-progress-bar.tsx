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
  const [displayPercentage, setDisplayPercentage] = useState<number>(0);
  const [label, setLabel] = useState<string>("Best Score");

  useEffect(() => {
    // 1. Check for a saved, active mid-session study progress status loop
    const savedActiveSession = localStorage.getItem(`study_session_${deckId}`);
    const savedBestScore = localStorage.getItem(`deck_best_score_${deckId}`);

    if (savedActiveSession) {
      try {
        const { percentage } = JSON.parse(savedActiveSession);
        setDisplayPercentage(percentage || 0);
        setLabel("In Progress");
        return; // Prioritize showing active session location
      } catch (e) {
        console.error("Error reading current active session state", e);
      }
    }

    // 2. If no active session, fall back to showing their permanent best score record
    if (savedBestScore) {
      const bestScoreNum = parseInt(savedBestScore, 10);
      setDisplayPercentage(isNaN(bestScoreNum) ? 0 : bestScoreNum);
      setLabel("Best Score");
    } else {
      setDisplayPercentage(0);
      setLabel("Unstarted");
    }
  }, [deckId]);

  return (
    <div className="flex flex-col items-end justify-end gap-0.5 flex-1 max-w-27.5">
      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block leading-none">
        {label} ({displayPercentage}%)
      </p>
      <div className="w-full pt-0.5">
        <ProgressBar percentage={displayPercentage} isFull={false} />
      </div>
    </div>
  );
}
