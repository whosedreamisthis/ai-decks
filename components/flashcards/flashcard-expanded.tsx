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
    <div className="perspective-1000 w-full max-w-md h-[350px]">
      {/* 3D Wrapper Layer */}
      <div
        className={`w-full h-full relative transition-transform duration-500 transform preserve-3d cursor-pointer select-none ${
          showAnswer ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT FACE: The Question */}
        <div
          onClick={handleFlip}
          className="absolute inset-0 w-full h-full backface-hidden bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col justify-center items-center text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Question (Click to flip)
          </span>
          <div className="text-xl sm:text-2xl font-bold text-slate-800">
            {question}
          </div>
        </div>

        {/* BACK FACE: The Answer */}
        {/* FIXED: Added onClick={handleFlip} here so tapping anywhere on the container triggers the turn back */}
        <div
          onClick={handleFlip}
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col overflow-hidden"
        >
          {/* Header area */}
          <div className="text-sm font-bold text-slate-400 shrink-0 mb-1 line-clamp-1">
            Q: {question}
          </div>
          <Separator className="my-2 shrink-0" />

          {/* The main scrollable viewport container */}
          {/* Note: We removed the extra onClick on inner elements so the click bubbles naturally up to the main back-face box */}
          <div className="text-base sm:text-lg text-slate-600 flex-1 overflow-y-auto min-h-0 pr-1 flex flex-col">
            <div className="flex flex-col justify-center items-center my-auto w-full text-center py-2">
              <span className="text-sm font-semibold text-brand-purple block mb-1 uppercase tracking-wider">
                Answer
              </span>
              <span className="break-words block text-slate-800">{answer}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardExpanded;
