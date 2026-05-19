// @/lib/types.ts
export interface Card {
  id: string;
  question: string;
  answer: string;
}

export interface Deck {
  id: string;
  title: string;
  progress: number;
  status: "active" | "archived";
  cards: Card[]; // Array containing the actual card objects
}
