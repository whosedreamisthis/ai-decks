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
      {/* FIXED: Changed text-muted-foreground to handle dark mode context using dark:text-slate-400 */}
      <div className="flex items-center gap-1.5 text-muted-foreground dark:text-slate-400 font-medium">
        <Link
          href="/dashboard"
          /* FIXED: Added dark:hover:text-slate-100 so the link lights up cleanly at night */
          className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          Home
        </Link>
        {/* FIXED: Muted the chevron divider line color in dark mode from text-slate-300 to dark:text-slate-600 */}
        <ChevronDivider
          size={14}
          className="text-slate-300 dark:text-slate-600"
        />

        <Link
          href="/decks"
          className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-brand-purple dark:text-purple-400 font-semibold"
        >
          Decks
        </Link>
      </div>

      <Link
        href={deckUrl}
        /* FIXED: Swapped light gray text-slate-400 to dark:text-slate-500, keeping your red hover escape active */
        className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
      >
        {exitLabel}
      </Link>
    </div>
  );
};

export default BreadCrumbs;
