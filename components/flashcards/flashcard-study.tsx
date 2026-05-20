"use client";

import React, { useState } from "react";
import { RotateCw } from "lucide-react";

interface Props {
  question: string;
  answer: string;
}

export default function FlashcardStudy({ question, answer }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* The Interactive Card Container
        Perspective utilities create a smooth 3D flipping animation effect 
      */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full max-w-md h-87.5 cursor-pointer group perspective-[1000px]"
        role="button"
        tabIndex={0}
        aria-label="Flashcard. Click to flip."
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
      >
        <div
          className={`relative w-full h-full duration-500 transform-3d transition-transform ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* FRONT SIDE (Question) */}
          <div className="absolute inset-0 bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between backface-hidden">
            <div className="flex-1 flex items-center justify-center text-center">
              <p className="text-xl sm:text-2xl font-semibold text-slate-800">
                {question}
              </p>
            </div>

            {/* Subtle, intuitive visual helper text at the bottom */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground group-hover:text-brand-purple transition-colors shrink-0">
              <RotateCw size={12} />
              <span>Click card to show answer</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between backface-hidden transform-[rotateY(180deg)]">
            <div className=" my-auto flex-1 overflow-y-auto pr-1 flex flex-col justify-start text-center">
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col justify-start">
                <div className="my-auto py-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-purple mb-3 block shrink-0">
                    Answer
                  </span>
                  <p className="text-base sm:text-lg text-slate-600 wrap-break-word">
                    {answer}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground shrink-0">
              <RotateCw size={12} />
              <span>Click card to show question</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
