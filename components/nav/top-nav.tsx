"use client";
import React from "react";
import Logo from "./logo";
import { Separator } from "@/components/ui/separator";
import UserProfile from "./user-profile";
import { usePathname } from "next/navigation";

import { resetDecks } from "@/lib/actions/decks";
import { Button } from "@/components/ui/button";
import DemoProfile from "@/components/nav/demo-profile";

const TopNav = ({ isDemo }: { isDemo: boolean }) => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="sticky top-0 bg-white z-50">
      <div className=" bg-white flex  items-center justify-between px-5 py-2">
        <Logo />
        <Button onClick={() => resetDecks()}>Reset Decks</Button>
        {isDemo ? <DemoProfile /> : <UserProfile />}
      </div>

      <Separator className="mt-2" />
    </div>
  );
};

export default TopNav;
