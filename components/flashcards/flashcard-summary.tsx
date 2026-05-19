import React from "react";
import { CardSim } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string;
  question: string;
  answer: string;
  deckId: string;
}
const Flashcard = ({ id, question, answer, deckId }: Props) => {
  return (
    <div className="relative gap-3 p-5 bg-white shadow-md items-center rounded-md">
      <Link
        href={`/decks/${deckId}/cards/${id}`}
        className="absolute inset-0 z-0 rounded-md cursor-pointer"
        aria-label={`View ${question} card`}
      />
      <div className="flex gap-3">
        <div className="flex justify-center items-center h-10 w-10 rounded-md bg-brand-mint-light text-brand-mint shadow-sm">
          <CardSim size={20} />
        </div>
        <div className="flex flex-col   rounded-md justify-start items-start">
          <p className="text-sm line-clamp-1">
            <span className="font-semibold">Q:</span> {question}
          </p>
          <p className="text-sm line-clamp-1">
            <span className="font-semibold">A:</span> {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
