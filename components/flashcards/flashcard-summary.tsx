import React from "react";
// Keeping CardSim exactly as you imported it so your icons don't break!
import { CardSim } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string;
  question: string;
  answer: string;
  deckId: string;
}

const FlashcardSummary = ({ id, question, answer, deckId }: Props) => {
  return (
    /* FIXED: Turned the outer container wrapper directly into a Next.js <Link> component.
       This makes 100% of the surface area (including text and icons) instantly clickable without relying on z-index hacks.
       Also added 'block' layout rule to ensure normal link element box modeling behaviors. */
    <Link
      href={`/decks/${deckId}/${id}`}
      aria-label={`View ${question} card`}
      className="block p-5 bg-white dark:bg-slate-700/60 shadow-md border border-transparent dark:border-slate-700 rounded-md hover:border-slate-300 dark:hover:border-slate-600  cursor-pointer group"
    >
      <div className="flex gap-3 items-start">
        {/* FIXED: Added a dark:group-hover text shift so the icon lights up beautifully when the user hovers anywhere on the card layout frame */}
        <div className="flex justify-center items-center h-10 w-10 rounded-md bg-brand-mint-light dark:bg-emerald-950/40 text-brand-mint dark:text-emerald-400 dark:group-hover:text-emerald-300 shadow-sm shrink-0 ">
          <CardSim size={20} />
        </div>

        <div className="flex flex-col justify-start items-start min-w-0 flex-1">
          {/* FIXED: Text colors will now remain fully readable across light and dark modes */}
          <p className="text-sm line-clamp-1 text-slate-800 dark:text-slate-200">
            <span className="font-semibold text-slate-900 dark:text-white">
              Q:
            </span>{" "}
            {question}
          </p>
          <p className="text-sm line-clamp-1 mt-0.5 text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">
              A:
            </span>{" "}
            {answer}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FlashcardSummary;
