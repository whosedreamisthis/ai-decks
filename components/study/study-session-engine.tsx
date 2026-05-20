"use client";

import { Deck, ResultsSummaryData } from "@/lib/types";
import React, { useState, useEffect } from "react";
import StudySession from "@/components/study/study-session";
import { finalizeStudySessionAction } from "@/lib/actions/session";
import { Trophy } from "lucide-react";
import Link from "next/link";

interface Props {
  deck: Deck;
}

export default function StudySessionEngine({ deck }: Props) {
  const { id: deckId, cards } = deck;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sessionProgress, setSessionProgress] = useState<
    Record<string, "correct" | "incorrect">
  >({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [resultsSummary, setResultsSummary] =
    useState<ResultsSummaryData | null>(null);

  const handleFinishSession = async (
    finalProgress: Record<string, "correct" | "incorrect">,
  ) => {
    const attempts = Object.entries(finalProgress);
    const totalAnswered = attempts.length;
    const correctCount = attempts.filter(
      ([_, status]) => status === "correct",
    ).length;
    const accuracy =
      totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    setResultsSummary({ totalAnswered, correctCount, accuracy });
    setIsFinished(true);
    handleClearSession(); // Clear browser storage upon finalization

    try {
      await finalizeStudySessionAction({
        deckId,
        totalAnswered,
        correctCount,
        accuracy,
        history: finalProgress,
      });
    } catch (error) {
      console.error("Failed to save final session results to server:", error);
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

  // Save state to localStorage automatically
  useEffect(() => {
    if (!isLoaded || isFinished) return;

    const sessionData = {
      index: currentIndex,
      progress: sessionProgress,
    };
    localStorage.setItem(
      `study_session_${deckId}`,
      JSON.stringify(sessionData),
    );
  }, [currentIndex, sessionProgress, deckId, isLoaded, isFinished]);

  // Handle rating selections
  const handleRateCard = (status: "correct" | "incorrect") => {
    const updatedProgress = {
      ...sessionProgress,
      [cards[currentIndex].id]: status,
    };

    setSessionProgress(updatedProgress);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Pass the updated object directly to avoid waiting for the async state batch cycle
      handleFinishSession(updatedProgress);
    }
  };

  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleClearSession = () => {
    localStorage.removeItem(`study_session_${deckId}`);
  };

  if (!isLoaded)
    return (
      <div className="text-center p-10 text-muted-foreground">
        Loading your session...
      </div>
    );

  // Render final results view
  if (isFinished && resultsSummary) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 max-w-md mx-auto mt-10">
        <div className="w-16 h-16 bg-brand-purple/10 text-brand-purple rounded-full flex items-center justify-center mb-4">
          <Trophy size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">
          Deck Complete!
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Great job finishing your study block.
        </p>
        <div className="grid grid-cols-3 gap-4 w-full mb-8 bg-slate-50 p-4 rounded-xl">
          <div>
            <span className="block text-2xl font-bold text-slate-700">
              {resultsSummary.totalAnswered}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Reviewed
            </span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-emerald-600">
              {resultsSummary.correctCount}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Correct
            </span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-brand-purple">
              {resultsSummary.accuracy}%
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Accuracy
            </span>
          </div>
        </div>
        <Link
          href="/dashboard"
          className="w-full py-3 bg-brand-purple text-white font-semibold rounded-xl block text-center"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <StudySession
      deck={deck}
      currentIndex={currentIndex}
      handleRateCard={handleRateCard}
      handlePreviousCard={handlePreviousCard}
    />
  );
}
