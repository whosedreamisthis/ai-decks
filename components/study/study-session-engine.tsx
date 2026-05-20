"use client";

import { Deck, ResultsSummaryData } from "@/lib/types";
import React, { useState, useEffect } from "react";
import StudySession from "@/components/study/study-session";
import { finalizeStudySessionAction } from "@/lib/actions/session";

interface Props {
  deck: Deck;
}

export default function StudySessionEngine({ deck }: Props) {
  const { id: deckId, cards } = deck;
  // 1. Initialize State. If local storage has a saved session for this deck, load it!
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sessionProgress, setSessionProgress] = useState<
    Record<string, "correct" | "incorrect">
  >({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [resultsSummary, setResultsSummary] =
    useState<ResultsSummaryData | null>(null);

  const handleFinishSession = async () => {
    // 1. Gather all unique attempts from your progress dictionary
    const attempts = Object.entries(sessionProgress); // [ [cardId, "correct"], [cardId, "incorrect"] ]

    const totalAnswered = attempts.length;
    const correctCount = attempts.filter(
      ([_, status]) => status === "correct",
    ).length;

    // 2. Prevent division by zero if a deck has no items
    const accuracy =
      totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    // 3. Set local state to instantly switch the screen to a "Results Summary"
    setResultsSummary({ totalAnswered, correctCount, accuracy });
    setIsFinished(true);

    // 4. Fire and forget the payload to your backend database database
    try {
      // This server action saves the permanent score history AND deletes the temporary active session row
      await finalizeStudySessionAction({
        deckId,
        totalAnswered,
        correctCount,
        accuracy,
        history: sessionProgress,
      });
    } catch (error) {
      console.error("Failed to save final session results to server:", error);
      // Optional: Add a toast notification letting the user know their progress couldn't sync
    }
  };

  // Load saved state on mount
  useEffect(() => {
    const savedData = localStorage.getItem(`study_session_${deckId}`);
    if (savedData) {
      try {
        const { index, progress } = JSON.parse(savedData);
        setCurrentIndex(index || 0);
        setSessionProgress(progress || {});
      } catch (e) {
        console.error("Error parsing saved session state", e);
      }
    }
    setIsLoaded(true);
  }, [deckId]);

  // 2. Save state automatically to localStorage whenever the index or progress modifications happen
  useEffect(() => {
    if (!isLoaded) return; // Prevent overwriting with initial empty states

    const sessionData = {
      index: currentIndex,
      progress: sessionProgress,
    };
    localStorage.setItem(
      `study_session_${deckId}`,
      JSON.stringify(sessionData),
    );
  }, [currentIndex, sessionProgress, deckId, isLoaded]);

  // Handle a card rating selection
  const handleRateCard = (status: "correct" | "incorrect") => {
    setSessionProgress((prev) => ({
      ...prev,
      [cards[currentIndex].id]: status,
    }));

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinishSession();
    }
  };

  const handleClearSession = () => {
    // Clear out browser storage once the session completes fully
    localStorage.removeItem(`study_session_${deckId}`);
  };

  if (!isLoaded) return <div>Loading your session...</div>;

  return (
    <div>
      <StudySession deck={deck} />
    </div>
  );
}
