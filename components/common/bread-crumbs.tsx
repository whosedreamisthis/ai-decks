import React from "react";
import { ChevronRight as ChevronDivider } from "lucide-react";
import Link from "next/link";

interface Props {
  deckUrl: string;
  exitLabel: string;
}

const BreadCrumbs = ({ deckUrl, exitLabel }: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
        <Link
          href="/dashboard"
          className="hover:text-slate-900 transition-colors"
        >
          Home
        </Link>
        <ChevronDivider size={14} className="text-slate-300" />

        {/* FIXED: This gives them a direct, unconditional escape hatch to the /decks shelf! */}
        <Link
          href="/decks"
          className="hover:text-slate-900 transition-colors text-brand-purple font-semibold"
        >
          Decks
        </Link>
      </div>

      <Link
        href={deckUrl}
        className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-red-500 transition-colors"
      >
        {exitLabel}
      </Link>
    </div>
  );
};

export default BreadCrumbs;
