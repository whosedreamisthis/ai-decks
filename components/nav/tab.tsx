"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

type TabType = "home" | "decks" | "settings";

interface Props {
  icon: IconType;
  iconSize: number;
  activeTab: TabType;
  tab: TabType;
  url: string;
}

const Tab = ({ icon: Icon, iconSize, activeTab, tab, url }: Props) => {
  const router = useRouter();

  const isActive = activeTab === tab;

  return (
    <button
      className={`flex flex-col justify-center items-center gap-1 transition-colors outline-none cursor-pointer text-xs
        ${isActive ? "text-brand-purple font-semibold" : "text-gray-400 hover:text-gray-600"}`}
      onClick={() => {
        void router.push(url);
      }}
    >
      <Icon size={iconSize} />
      {/* Capitalized text formatting for UI consistency */}
      <span className="capitalize">{tab}</span>
    </button>
  );
};

export default Tab;
