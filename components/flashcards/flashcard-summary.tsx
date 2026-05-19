import React from "react";

interface Props {
  id: string;
  question: string;
  answer: string;
}
const Flashcard = ({ id, question, answer }: Props) => {
  return (
    <div className="flex flex-col shadow-md p-5 bg-white rounded-md justify-start items-start">
      <p className="text-sm line-clamp-1">
        <span className="font-semibold">Q:</span> {question}
      </p>
      <p className="text-sm line-clamp-1">
        <span className="font-semibold">A:</span> {answer}
      </p>
    </div>
  );
};

export default Flashcard;
