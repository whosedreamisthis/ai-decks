import React from "react";
import { Trophy } from "lucide-react";
import { ResultsSummaryData } from "@/lib/types";
import Link from "next/link";

interface Props {
  resultsSummary: ResultsSummaryData | null;
  handleResetAndRestartStudy: () => void;
  deckId: string;
}
const ResultsSummary = ({
  resultsSummary,
  handleResetAndRestartStudy,
  deckId,
}: Props) => {
  return (
    <div className="min-h-100 flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 max-w-md mx-auto mt-10">
      <div className="w-16 h-16 bg-brand-purple/10 text-brand-purple rounded-full flex items-center justify-center mb-4">
        <Trophy size={32} />
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-1">Deck Complete!</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Great job finishing your study block.
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4 w-full mb-8 bg-slate-50 p-4 rounded-xl">
        <div>
          <span className="block text-2xl font-bold text-emerald-600">
            {resultsSummary?.correctCount}
          </span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Correct
          </span>
        </div>
        <div>
          <span className="block text-2xl font-bold text-brand-purple">
            {resultsSummary?.accuracy}%
          </span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Accuracy
          </span>
        </div>
      </div>

      {/* Action Navigation Row */}
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={handleResetAndRestartStudy} // Clears states back to 0
          className="w-full py-3 bg-brand-purple text-white font-semibold rounded-xl hover:bg-brand-purple/90 "
        >
          Study Again
        </button>
        <div className="flex gap-2">
          <Link
            href="/dashboard"
            className="flex-1 py-3 bg-white border border-gray-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50  block text-center"
            replace
          >
            Dashboard
          </Link>
          <Link
            href={`/decks/${deckId}`}
            className="flex-1 py-3 bg-white border border-gray-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50  block text-center"
            replace
          >
            Deck Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;
