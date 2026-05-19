import React from "react";
import Logo from "./logo";
import { Separator } from "@/components/ui/separator";
import Profile from "@/components/nav/profile";

const TopNav = () => {
  return (
    <>
      <div className="flex  items-center justify-between mx-5 my-2">
        <Logo />
        <Profile />
      </div>
      <Separator className="mt-2" />
    </>
  );
};

export default TopNav;
