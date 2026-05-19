import { LuCopy, LuAward, LuLayers } from "react-icons/lu";
import { Deck } from "@/lib/types";

export const DASHBOARD_SUMMARY = [
  {
    title: "Active Decks",
    icon: LuLayers,
    bgColor: "bg-brand-mint-light",
    fgColor: "text-brand-mint",
  },
  {
    title: "Total Cards",
    icon: LuCopy,
    bgColor: "bg-brand-purple-light",
    fgColor: "text-brand-purple",
  },
  {
    title: "Overall Proficiency",
    icon: LuAward,
    bgColor: "bg-brand-blue-light",
    fgColor: "text-brand-blue",
  },
];
