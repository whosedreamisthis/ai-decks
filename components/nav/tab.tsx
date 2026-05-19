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
  setActiveTab: (tab: TabType) => void;
  url: string;
}

const Tab = ({
  icon: Icon,
  iconSize,
  activeTab,
  tab,
  setActiveTab,
  url,
}: Props) => {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col justify-center items-center text-sm ${activeTab === tab ? "text-brand-purple font-semibold" : "text-gray-500"}`}
      onClick={() => {
        setActiveTab(tab);
        void router.push(url);
      }}
    >
      <Icon size={iconSize} />
      <p>{tab}</p>
    </div>
  );
};

export default Tab;
