// @/lib/db.ts
import { MOCK_DECKS } from "@/lib/mock-data";

export interface StudyHistoryLog {
  id: string;
  userId: string;
  deckId: string;
  score: number;
  totalCards: number;
  accuracyPercentage: number;
  completedAt: Date;
}

export interface DeckProgress {
  userId: string;
  deckId: string;
  lastStudied: Date;
  highestAccuracy: number;
  timesReviewed: number;
}

export interface ActiveDeckSession {
  userId: string;
  deckId: string;
  currentIndex: number;
  progress: Record<string, "correct" | "incorrect">;
}

interface MockDatabase {
  decks: typeof MOCK_DECKS;
  studyHistoryLog: StudyHistoryLog[];
  deckProgress: DeckProgress[];
  activeDeckSession: ActiveDeckSession[];
}

// 1. Declare on globalThis instead of generic node global
declare global {
  var _db: MockDatabase | undefined;
}

// 2. Helper to instantiate the baseline mock state
const createInitialMockDb = (): MockDatabase => ({
  decks: JSON.parse(JSON.stringify(MOCK_DECKS)),
  studyHistoryLog: [],
  deckProgress: [],
  activeDeckSession: [],
});

// Initialize right away on module load
if (!globalThis._db) {
  globalThis._db = createInitialMockDb();
}

// 3. SECURE GETTER: If it ever gets wiped or dropped across server worker chunks,
// re-initialize it immediately rather than forcing a runtime crash.
export const getDb = (): MockDatabase => {
  if (!globalThis._db) {
    globalThis._db = createInitialMockDb();
  }
  return globalThis._db;
};

export const setDecks = (newDecks: typeof MOCK_DECKS) => {
  const db = getDb();
  db.decks = newDecks;
};

export const setDb = (newDbState: MockDatabase) => {
  globalThis._db = newDbState;
};
