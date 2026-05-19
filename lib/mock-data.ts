import { Deck } from "@/lib/types";

export const MOCK_DECKS: Deck[] = [
  {
    id: "deck-1",
    title: "Next.js 15 & Server Components",
    cardCount: 24,
    progress: 75,
    status: "active",
  },
  {
    id: "deck-2",
    title: "TypeScript Advanced Inferences",
    cardCount: 18,
    progress: 40,
    status: "active",
  },
  {
    id: "deck-3",
    title: "Prisma & Drizzle ORM Basics",
    cardCount: 15,
    progress: 100,
    status: "archived",
  },
  {
    id: "deck-4",
    title: "React Native Expo Navigation",
    cardCount: 32,
    progress: 10,
    status: "active",
  },
];
