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

export const MOCK_DECKS: Deck[] = [
  {
    id: "deck-1",
    title: "Next.js 15 & Server Components",
    cardCount: 24,
    progress: 75,
  },
  {
    id: "deck-2",
    title: "TypeScript Advanced Inferences",
    cardCount: 18,
    progress: 40,
  },
  {
    id: "deck-3",
    title: "Prisma & Drizzle ORM Basics",
    cardCount: 15,
    progress: 100,
  },
  {
    id: "deck-4",
    title: "React Native Expo Navigation",
    cardCount: 32,
    progress: 10,
  },
];
