"use client";

import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

interface Props {
  id: string;
  question: string;
  answer: string;
  deckId: string;
}

const FlashcardExpanded = ({ question, answer }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  // Reset back to the question face whenever navigating to a different card
  useEffect(() => {
    setShowAnswer(false);
  }, [question, answer]);

  const handleFlip = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <div className="perspective-1000 w-full max-w-md h-87.5">
      {/* 3D Wrapper Layer - Left exactly as is to keep rotation crisp */}
      <div
        className={`w-full h-full relative transition-transform duration-500 transform preserve-3d cursor-pointer select-none ${
          showAnswer ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT FACE: The Question */}
        <div
          onClick={handleFlip}
          /* FIXED: Swapped light properties for bg-white dark:bg-slate-900 and border-gray-100 dark:border-slate-700 */
          className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-slate-700/60 p-6 rounded-lg shadow-md border border-gray-100 dark:border-slate-700 flex flex-col justify-center items-center text-center transition-colors"
        >
          {/* FIXED: Swapped static subtitle text to support dark:text-slate-400 */}
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Question (Click to flip)
          </span>
          {/* FIXED: Swapped static text-slate-800 to text-slate-900 dark:text-slate-100 */}
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            {question}
          </div>
        </div>

        {/* BACK FACE: The Answer */}
        <div
          onClick={handleFlip}
          /* FIXED: Synced styling properties identically to the front layout surface (dark:bg-slate-900 dark:border-slate-700) */
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-slate-700/60 p-6 rounded-lg shadow-md border border-gray-100 dark:border-slate-700 flex flex-col overflow-hidden transition-colors"
        >
          {/* Header area */}
          {/* FIXED: Swapped static layout parameters to include text-slate-400 dark:text-slate-500 */}
          <div className="text-sm font-bold text-slate-400 dark:text-slate-500 shrink-0 mb-1 line-clamp-1">
            Q: {question}
          </div>
          {/* Note: Radix / Shadcn components like Separator listen to your global css variables (--border) automatically */}
          <Separator className="my-2 shrink-0 bg-slate-100 dark:bg-slate-800" />

          {/* The main scrollable viewport container */}
          <div className="text-base sm:text-lg text-slate-600 dark:text-slate-300 flex-1 overflow-y-auto min-h-0 pr-1 flex flex-col">
            <div className="flex flex-col justify-center items-center my-auto w-full text-center py-2">
              {/* FIXED: Swapped layout brand purple text color target values to look rich on dark cards (dark:text-purple-400) */}
              <span className="text-sm font-semibold text-brand-purple dark:text-purple-400 block mb-1 uppercase tracking-wider">
                Answer
              </span>
              {/* FIXED: Shifted static answer typography from text-slate-800 over to dark:text-slate-100 */}
              <span className="break-words block text-slate-900 dark:text-slate-100">
                {answer}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardExpanded;
