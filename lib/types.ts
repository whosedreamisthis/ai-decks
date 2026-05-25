// @/lib/types.ts
export interface Card {
  id: string;
  question: string;
  answer: string;
}

export interface Deck {
  id: string;
  userId?: string;
  title: string;
  progress: number;
  status: "active" | "archived";
  cards: Card[]; // Array containing the actual card objects
  createdAt?: Date;
  isDemoDeck?: boolean;
}

export interface ResultsSummaryData {
  totalAnswered: number;
  correctCount: number;
  accuracy: number;
}
