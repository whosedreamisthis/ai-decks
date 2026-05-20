import React from "react";
import { getDeckById } from "@/lib/actions/decks";
import Flashcard from "@/components/flashcards/flashcard";
import BackButton from "../../../components/common/back-button";
import { Play } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ deckId: string }>;
}

const DeckPage = async ({ params }: Props) => {
  const { deckId } = await params;
  const deck = await getDeckById(deckId);

  if (!deck) {
    return <div>Deck not found</div>;
  }

  return (
    <div className="min-h-screen bg-brand-blue/10 overflow-hidden p-5 pb-25">
      <div className="flex items-center justify-between mb-4">
        <BackButton fallbackUrl="/dashboard" />
      </div>{" "}
      <div className="flex flex-col items-center text-center max-w-md mx-auto mt-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          {deck.title}
        </h1>
        <p className="text-sm text-muted-foreground mt-1 mb-5">
          {deck.cards.length} cards total
        </p>

        {/* Central, highly visible Play Button Link */}
        <Link
          href={`/decks/${deckId}/study`}
          className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-brand-purple text-white font-semibold rounded-xl shadow-md hover:bg-brand-purple/90 active:scale-[0.98] transition-all text-base group"
          replace
        >
          <Play
            size={20}
            className="fill-white text-white group-hover:scale-110 transition-transform"
          />
          <span>Start Study Session</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-5">
        {deck.cards.map((card) => (
          <Flashcard
            variant="summary"
            key={card.id}
            card={card}
            deckId={deckId}
          />
        ))}
      </div>
    </div>
  );
};

export default DeckPage;
