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
    <div className="bg-white p-5 rounded-lg shadow-md flex flex-col gap-2 h-87.5 w-full max-w-md">
      <div className="text-2xl font-bold">{question}</div>
      <Separator className="my-2" />
      <div className="text-lg">
        <span className="font-semibold">Answer:</span> {answer}
      </div>
    </div>
  );
};

export default FlashcardExpanded;
