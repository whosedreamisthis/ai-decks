import React from "react";
import { getDeckById } from "@/lib/actions/decks";
import Flashcard from "@/components/flashcards/flashcard";
import { Play } from "lucide-react";
import Link from "next/link";
import BreadCrumbs from "@/components/common/bread-crumbs";

interface Props {
  params: Promise<{ deckId: string }>;
}

const DeckPage = async ({ params }: Props) => {
  const { deckId } = await params;
  const deck = await getDeckById(deckId);

  if (!deck) {
    return (
      <div className="p-5 text-center dark:text-slate-200">Deck not found</div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden p-5 pb-25">
      <div className="flex flex-col items-center text-center max-w-md mx-auto mt-4 mb-8">
        {/* FIXED: Applied dark:bg-slate-900/60 and the crisp dark:border-slate-700 illuminated layout border to match your study session exactly */}
        <div className="max-w-md mx-auto mb-6 flex items-center justify-between text-xs sm:text-sm bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm py-2.5 px-4 rounded-lg border border-slate-200/50 dark:border-slate-700 shadow-sm w-full ">
          {/* Passed /decks as the exit URL since we are already on the specific deck profile summary view */}
          <BreadCrumbs deckUrl="/decks" exitLabel="" />
        </div>

        {/* FIXED: Swapped static text-slate-800 out for text-slate-900 dark:text-slate-100 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          {deck.title}
        </h1>
        {/* FIXED: Ensured metadata text scales properly using dark:text-slate-400 */}
        <p className="text-sm text-muted-foreground dark:text-slate-400 mt-1 mb-5">
          {deck.cards.length} cards total
        </p>

        {/* Central, highly visible Play Button Link */}
        <Link
          href={`/decks/${deckId}/study`}
          className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-brand-purple hover:bg-brand-purple/90 dark:bg-purple-600 dark:hover:bg-purple-500 text-white font-semibold rounded-xl shadow-md active:scale-[0.98] transition-transform text-base group"
          replace
        >
          <Play
            size={20}
            className="fill-white text-white group-hover:scale-110 transition-transform"
          />
          <span>Start Study Session</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
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
