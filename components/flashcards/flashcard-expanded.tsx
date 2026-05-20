import React from "react";
import { Separator } from "@/components/ui/separator";

interface Props {
  id: string;
  question: string;
  answer: string;
  deckId: string;
}

const FlashcardExpanded = ({ id, question, answer, deckId }: Props) => {
  return (
    /* 1. Added border and structure to your flex column */
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-[350px] w-full max-w-md border border-gray-100">
      {/* 2. Added shrink-0 so the question never collapses when the answer is huge */}
      <div className="text-xl sm:text-2xl font-bold text-slate-800 shrink-0">
        {question}
      </div>

      <Separator className="my-3 shrink-0" />

      {/* 3. flex-1 forces this container to take up all remaining space.
          4. overflow-y-auto activates a scrollbar ONLY inside this block when text fills it up. */}
      <div className="text-base sm:text-lg text-slate-600 flex-1 overflow-y-auto pr-1">
        <span className="font-semibold text-slate-800 block mb-1">Answer:</span>
        <span className="break-words">{answer}</span>
      </div>
    </div>
  );
};

export default FlashcardExpanded;
