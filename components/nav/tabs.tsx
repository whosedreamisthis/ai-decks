"use client";
import React, { useState } from "react";
import { GoGear } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { CgCardClubs } from "react-icons/cg";
import { router } from "next/client";
import Tab from "@/components/nav/tab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<"home" | "decks" | "settings">(
    "home",
  );

  return (
    <div className=" sticky bottom-0 left-0 right-0 mx-4 p-3 bg-white border-t border-gray-200 z-50">
      {/*<Separator className="w-full" />*/}
      <div className="flex justify-between items-center">
        <Tab
          url="/dashboard"
          icon={IoHomeOutline}
          tab="home"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          icon={CgCardClubs}
          activeTab={activeTab}
          tab="decks"
          setActiveTab={setActiveTab}
          url="/decks"
        />

        <Tab
          icon={GoGear}
          activeTab={activeTab}
          tab="settings"
          setActiveTab={setActiveTab}
          url="/settings"
        />
      </div>
    </div>
  );
};

export default Tabs;
