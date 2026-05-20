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
      {/* The Interactive Card Container */}
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
          {/* FIXED: Added dark:bg-slate-900 and your signature crisp dark:border-slate-700 border framework */}
          <div className="absolute inset-0 bg-white dark:bg-slate-700/60 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 flex flex-col justify-between backface-hidden ">
            <div className="flex-1 flex items-center justify-center text-center">
              {/* FIXED: Upgraded static question text from text-slate-800 to text-slate-900 dark:text-slate-100 */}
              <p className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {question}
              </p>
            </div>

            {/* Subtle, intuitive visual helper text at the bottom */}
            {/* FIXED: Added dark:text-slate-400 and dark:group-hover:text-purple-400 */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground dark:text-slate-400 group-hover:text-brand-purple dark:group-hover:text-purple-400  shrink-0">
              <RotateCw size={12} />
              <span>Click card to show answer</span>
            </div>
          </div>

          {/* BACK SIDE (Answer) */}
          {/* FIXED: Applied identical layout backing definitions: dark:bg-slate-900 and dark:border-slate-700 */}
          <div className="absolute inset-0 bg-white dark:bg-slate-700/60 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 flex flex-col justify-between backface-hidden transform-[rotateY(180deg)] ">
            <div className="my-auto flex-1 overflow-y-auto pr-1 flex flex-col justify-start text-center">
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col justify-start">
                <div className="my-auto py-2">
                  {/* FIXED: Shifted light-mode purple variable over to dark:text-purple-400 for better night neon contrast */}
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-purple dark:text-purple-400 mb-3 block shrink-0">
                    Answer
                  </span>
                  {/* FIXED: Changed standard copy text from text-slate-600 to text-slate-700 dark:text-slate-200 */}
                  <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 wrap-break-word">
                    {answer}
                  </p>
                </div>
              </div>
            </div>

            {/* FIXED: Muted bottom toggle guide tracking elements cleanly via dark:text-slate-400 */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground dark:text-slate-400 shrink-0">
              <RotateCw size={12} />
              <span>Click card to show question</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
