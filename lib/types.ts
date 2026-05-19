export interface Deck {
  id: string;
  title: string;
  cardCount: number;
  progress: number; // Value between 0 and 100
  status: "active" | "archived";
}
