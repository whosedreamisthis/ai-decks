import { LuZap } from "react-icons/lu";
import React from "react";

const Logo = () => {
  return (
    <div className="flex justify-start items-center gap-3">
      <div
        className={`flex justify-center items-center h-9 w-9 rounded-md  bg-brand-mint-light`}
      >
        <LuZap />
      </div>
      <p className="text-2xl font-semibold">AI Decks</p>
    </div>
  );
};

export default Logo;
