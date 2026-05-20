"use client";
import React from "react";
import Logo from "./logo";
import { Separator } from "@/components/ui/separator";
import UserProfile from "./user-profile";
import { usePathname } from "next/navigation";
import { resetDecks } from "@/lib/actions/decks";
import { Button } from "@/components/ui/button";
import DemoProfile from "@/components/nav/demo-profile";
import Link from "next/link";
import ThemeChanger from "@/components/common/theme-changer";

const TopNav = ({ isDemo }: { isDemo: boolean }) => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const handleReset = async () => {
    // 1. Clear server-side database (via server action)
    await resetDecks();

    // 2. Clear client-side persistence
    // This finds all keys starting with our prefixes and nukes them
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith("study_session_") ||
        key.startsWith("deck_best_score_")
      ) {
        localStorage.removeItem(key);
      }
    });

    // 3. Force a full page refresh to sync UI state
    window.location.reload();
  };

  return (
    <div className="sticky top-0  z-50 ">
      <div className=" bg-white dark:bg-slate-700 flex  items-center justify-between px-5 py-2">
        <div className="flex items-center justify-start gap-4">
          <Link href="/dashboard">
            <Logo />
          </Link>
          {isDemo && (
            <Button
              onClick={handleReset}
              className="bg-brand-blue hover:bg-brand-blue/80 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
            >
              Reset Demo
            </Button>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <ThemeChanger />
          {isDemo ? <DemoProfile /> : <UserProfile />}
        </div>
      </div>

      <Separator className="mt-2" />
    </div>
  );
};

export default TopNav;
