import React from "react";
import BackButton from "@/components/common/back-button";

interface Props {
  params: Promise<{ deckId: string; cardId: string }>;
}

const CardPage = async ({ params }: Props) => {
  const { deckId, cardId } = await params;

  return (
    <div className="p-5">
      <BackButton />
      {deckId} / {cardId}
    </div>
  );
};

export default CardPage;
