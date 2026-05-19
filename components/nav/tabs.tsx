"use client";
import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { GoGear } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { Layers } from "lucide-react";

import Tab from "@/components/nav/tab";

const Tabs = () => {
  const pathname = usePathname(); // Reads the active route (e.g., "/settings")

  // Derives which tab string should be active based on the actual browser URL
  const getActiveTab = (): "home" | "decks" | "settings" => {
    if (pathname?.startsWith("/settings")) return "settings";
    if (pathname?.startsWith("/decks")) return "decks";
    return "home"; // Fallback default for /dashboard or /
  };

  const activeTab = getActiveTab();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-3 pb-6 z-50 shadow-sm">
      <div className="flex justify-between items-center max-w-md mx-auto px-6">
        <Tab
          url="/dashboard"
          icon={IoHomeOutline}
          iconSize={20}
          tab="home"
          activeTab={activeTab}
        />
        <Tab
          url="/decks"
          icon={Layers}
          iconSize={20}
          tab="decks"
          activeTab={activeTab}
        />
        <Tab
          url="/settings"
          icon={GoGear}
          iconSize={20}
          tab="settings"
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};

export default Tabs;
