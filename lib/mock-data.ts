import { Deck } from "@/lib/types";

export const MOCK_DECKS: Deck[] = [
  {
    id: "deck-1",
    title: "Next.js 15 & Server Components",
    progress: 75,
    status: "active",
    cards: [
      {
        id: "c1-1",
        question: "What is the default component type in Next.js App Router?",
        answer: "Server Components",
      },
      {
        id: "c1-2",
        question: "How do you opt into Client Components?",
        answer:
          "By adding the 'use client' directive at the very top of the file.",
      },
      {
        id: "c1-3",
        question: "Can you import a Server Component into a Client Component?",
        answer:
          "Not directly as an import, but you can pass it down as 'children' or props.",
      },
      {
        id: "c1-4",
        question:
          "What hook is used to programmatically navigate in the App Router?",
        answer: "useRouter from 'next/navigation'",
      },
      {
        id: "c1-5",
        question: "What is the purpose of the layout.tsx file?",
        answer:
          "To create UI that is shared across multiple pages and preserves state on navigation.",
      },
      {
        id: "c1-6",
        question:
          "How does Next.js 15 handle fetch requests caching by default?",
        answer:
          "Fetch requests are no longer cached by default; they are 'no-store' unless explicitly configured.",
      },
      {
        id: "c1-7",
        question: "What is PPR in Next.js?",
        answer:
          "Partial Prerendering—combining static and dynamic parts in the same route.",
      },
      {
        id: "c1-8",
        question: "Which file handles custom error UI boundaries?",
        answer: "error.tsx (must be a Client Component)",
      },
      {
        id: "c1-9",
        question: "How do you read dynamic route parameters?",
        answer: "Via the 'params' prop passed directly to the page component.",
      },
      {
        id: "c1-10",
        question: "What is the loading.tsx file used for?",
        answer:
          "To automatically wrap a route segment in a React Suspense boundary and show a loading skeleton.",
      },
    ],
  },
  {
    id: "deck-2",
    title: "TypeScript Advanced Inferences",
    progress: 40,
    status: "active",
    cards: [
      {
        id: "c2-1",
        question: "What does the 'as const' assertion do?",
        answer:
          "It locks an object or array down into a read-only literal type wrapper.",
      },
      {
        id: "c2-2",
        question: "What is the purpose of 'keyof'?",
        answer:
          "It extracts the public keys of an object type as a union of string literals.",
      },
      {
        id: "c2-3",
        question: "How do you make all properties in a type optional?",
        answer: "Using the Partial<T> utility type.",
      },
      {
        id: "c2-4",
        question: "What does 'Record<string, number>' represent?",
        answer: "An object where keys are strings and values are numbers.",
      },
      {
        id: "c2-5",
        question: "What is a Type Guard in TypeScript?",
        answer:
          "A function that uses a type predicate ('parameterName is Type') to narrow types at runtime.",
      },
      {
        id: "c2-6",
        question: "Difference between 'unknown' and 'any'?",
        answer:
          "'unknown' is type-safe; you must perform type checking before interacting with it, unlike 'any'.",
      },
      {
        id: "c2-7",
        question: "What utility type excludes properties from another type?",
        answer: "Omit<T, K>",
      },
      {
        id: "c2-8",
        question: "What utility type selects specific keys from a type?",
        answer: "Pick<T, K>",
      },
      {
        id: "c2-9",
        question: "How do conditional types work?",
        answer: "They follow a ternary syntax: T extends U ? X : Y",
      },
      {
        id: "c2-10",
        question: "What does 'ReturnType<T>' do?",
        answer: "Extracts the return type of a function type T.",
      },
    ],
  },
  {
    id: "deck-3",
    title: "Prisma & Drizzle ORM Basics",
    progress: 100,
    status: "archived",
    cards: [
      {
        id: "c3-1",
        question:
          "Where do you define your database database models in Prisma?",
        answer: "In the prisma.schema file.",
      },
      {
        id: "c3-2",
        question: "How do you push schema updates to your database in Drizzle?",
        answer: "Using 'drizzle-kit push' or running generated migrations.",
      },
      {
        id: "c3-3",
        question: "What command generates the Prisma Client?",
        answer: "prisma generate",
      },
      {
        id: "c3-4",
        question: "How does Drizzle define schemas?",
        answer:
          "Directly in TypeScript files using TypeScript objects and utilities.",
      },
      {
        id: "c3-5",
        question: "How do you filter records matching a condition in Prisma?",
        answer: "Using the 'where' clause object.",
      },
      {
        id: "c3-6",
        question: "Is Drizzle a query builder or a traditional thick ORM?",
        answer: "It acts primarily as a type-safe SQL query builder.",
      },
      {
        id: "c3-7",
        question: "What is a database migration?",
        answer:
          "A version-controlled file containing SQL instructions to update a database schema state.",
      },
      {
        id: "c3-8",
        question: "How do you perform a relation join in Prisma?",
        answer: "Using the 'include' or 'select' options.",
      },
      {
        id: "c3-9",
        question: "What is Drizzle Kit?",
        answer:
          "The CLI companion tool for Drizzle used to manage migrations and prototypes.",
      },
      {
        id: "c3-10",
        question: "How do you connect to a relational database in these ORMs?",
        answer:
          "Via a connection string URL inside an environment variable file (.env).",
      },
    ],
  },
  {
    id: "deck-4",
    title: "React Native Expo Navigation",
    progress: 10,
    status: "active",
    cards: [
      {
        id: "c4-1",
        question: "What is Expo Router based on?",
        answer: "File-based navigation routing, similar to Next.js App Router.",
      },
      {
        id: "c4-2",
        question: "How do you create a modal screen in Expo Router?",
        answer:
          "Set presentation: 'modal' in your screen layout options config configuration.",
      },
      {
        id: "c4-3",
        question: "What component is used to link to other screens?",
        answer: "<Link href='/path'>",
      },
      {
        id: "c4-4",
        question: "Where do global app layouts go in Expo Router?",
        answer: "Inside the root _layout.tsx file.",
      },
      {
        id: "c4-5",
        question: "How do you hide a tab bar button dynamically?",
        answer: "Set tabBarButton: () => null inside screen options rules.",
      },
      {
        id: "c4-6",
        question: "What hook reads search parameters from a URL route?",
        answer: "useLocalSearchParams()",
      },
      {
        id: "c4-7",
        question: "How do you create a dynamic route segment?",
        answer: "By naming the file or directory with brackets, like [id].tsx.",
      },
      {
        id: "c4-8",
        question: "What layout component represents standard mobile tab views?",
        answer: "<Tabs>",
      },
      {
        id: "c4-9",
        question:
          "What layout component mimics native iOS/Android swipe headers?",
        answer: "<Stack>",
      },
      {
        id: "c4-10",
        question:
          "How do you prevent a user from pressing the hardware back button?",
        answer: "Using the BackHandler API inside a React useEffect hook hook.",
      },
    ],
  },
  // --- 6 NEW DECKS ADDED BELOW ---
  {
    id: "deck-5",
    title: "Tailwind CSS Layout Layouts",
    progress: 90,
    status: "active",
    cards: [
      {
        id: "c5-1",
        question:
          "What utility centres a block container horizontally inside its parent?",
        answer: "mx-auto",
      },
      {
        id: "c5-2",
        question:
          "How do you implement grid items wrapping on mobile vs desktop layouts?",
        answer: "grid-cols-1 md:grid-cols-3",
      },
      {
        id: "c5-3",
        question:
          "What class hides an element on mobile but blocks it on medium screens?",
        answer: "hidden md:block",
      },
      {
        id: "c5-4",
        question: "What is the tracking utility used for?",
        answer: "Letter-spacing adjustment text styles.",
      },
      {
        id: "c5-5",
        question: "Difference between absolute and fixed positioning?",
        answer:
          "Absolute anchors relative to its closest relative parent; fixed anchors relative directly to the browser window viewport screen frame.",
      },
      {
        id: "c5-6",
        question: "How do you apply arbitrary exact pixel padding?",
        answer: "Using brackets syntax, like p-[17px].",
      },
      {
        id: "c5-7",
        question: "What utility targets dark mode themes explicitly?",
        answer: "The 'dark:' modifier prefix.",
      },
      {
        id: "c5-8",
        question: "What utility creates uniform grid gaps?",
        answer: "gap-{size}",
      },
      {
        id: "c5-9",
        question:
          "How do you force truncating long text blocks into trailing ellipses?",
        answer: "The 'truncate' class utility.",
      },
      {
        id: "c5-10",
        question: "What does 'shrink-0' prevent?",
        answer:
          "It keeps a flex item from squishing or condensing smaller than its minimum content boundaries.",
      },
    ],
  },
  {
    id: "deck-6",
    title: "PostgreSQL Indexing Strategies",
    progress: 30,
    status: "active",
    cards: [
      {
        id: "c6-1",
        question: "What is the default index type in PostgreSQL?",
        answer: "B-Tree index structure.",
      },
      {
        id: "c6-2",
        question: "When should you use a Partial Index?",
        answer:
          "When you only need to run queries targeting a specific, static subset rows filtered by a WHERE condition clause rule.",
      },
      {
        id: "c6-3",
        question:
          "What command analyzes query execution steps and index choices?",
        answer: "EXPLAIN ANALYZE",
      },
      {
        id: "c6-4",
        question: "What is a covering index?",
        answer:
          "An index that uses the 'INCLUDE' clause to store extra non-key values, allowing index-only scans.",
      },
      {
        id: "c6-5",
        question: "What is a downside of having too many indexes?",
        answer:
          "It slows down write operations (INSERT, UPDATE, DELETE) because every index needs real-time adjustments.",
      },
      {
        id: "c6-6",
        question: "When is a GiST or GIN index preferred over B-Tree?",
        answer:
          "For composite structures like text search keywords, arrays, or geometric spatial coordinates maps.",
      },
      {
        id: "c6-7",
        question: "Does a primary key automatically build an index?",
        answer:
          "Yes, PostgreSQL automatically spins up a unique B-Tree index for primary keys and unique constraints parameters.",
      },
      {
        id: "c6-8",
        question: "What index optimizes multi-column filters?",
        answer: "A Composite Index (multi-column index).",
      },
      {
        id: "c6-9",
        question: "What does sequential scan mean?",
        answer:
          "The engine scanned the entire table block-by-block because no index was available or helpful.",
      },
      {
        id: "c6-10",
        question:
          "How do you rebuild an index concurrently to avoid table locks?",
        answer: "CREATE INDEX CONCURRENTLY",
      },
    ],
  },
  {
    id: "deck-7",
    title: "React Query Data Fetching",
    progress: 60,
    status: "active",
    cards: [
      {
        id: "c7-1",
        question: "What hook handles GET requests in TanStack Query?",
        answer: "useQuery",
      },
      {
        id: "c7-2",
        question: "What hook manages updates, inserts, or mutations?",
        answer: "useMutation",
      },
      {
        id: "c7-3",
        question: "What is a query key used for?",
        answer:
          "To uniquely identify, cache, and automatically invalidate datasets.",
      },
      {
        id: "c7-4",
        question: "What does staleTime control?",
        answer:
          "The duration of time before fetched data transitions from 'fresh' to 'stale' status definitions.",
      },
      {
        id: "c7-5",
        question: "What does gcTime (formerly cacheTime) do?",
        answer:
          "Determines how long unused query cache chunks hang out in storage memory before being garbage collected.",
      },
      {
        id: "c7-6",
        question: "How do you manually force refetching a query path?",
        answer: "By calling queryClient.invalidateQueries({ queryKey })",
      },
      {
        id: "c7-7",
        question: "What is optimistic updates?",
        answer:
          "Updating the UI instantly to look successful before server verification returns over network pipelines.",
      },
      {
        id: "c7-8",
        question: "How do you execute parallel queries dynamically?",
        answer: "Using the useQueries() hook hook.",
      },
      {
        id: "c7-9",
        question: "What option disables automatic background tracking loops?",
        answer: "enabled: false",
      },
      {
        id: "c7-10",
        question:
          "How do you pass context configurations across an app layout?",
        answer:
          "Via the <QueryClientProvider client={queryClient}> wrapper layer.",
      },
    ],
  },
  {
    id: "deck-8",
    title: "Zustand Global Global States",
    progress: 85,
    status: "active",
    cards: [
      {
        id: "c8-1",
        question: "How do you initialize a basic Zustand store?",
        answer: "Using the create() function utility.",
      },
      {
        id: "c8-2",
        question: "Does Zustand require context provider wrapper blocks?",
        answer:
          "No, hooks can be consumed anywhere directly without wrapping parent view layouts.",
      },
      {
        id: "c8-3",
        question: "How do you mutate state keys safely inside actions?",
        answer: "Using the set() callback function engine.",
      },
      {
        id: "c8-4",
        question:
          "What parameter lets you look up current states inside action mutations?",
        answer: "The get() method parameter.",
      },
      {
        id: "c8-5",
        question:
          "How do you filter a store state to prevent unnecessary rerenders?",
        answer:
          "By passing a selector function: useStore((state) => state.specificKey)",
      },
      {
        id: "c8-6",
        question:
          "What middleware connects a Zustand store to browser localStorage structures?",
        answer: "The persist middleware utility.",
      },
      {
        id: "c8-7",
        question: "Can a Zustand store process async API payloads directly?",
        answer:
          "Yes, actions can be written as standard async/await methods natively.",
      },
      {
        id: "c8-8",
        question: "What middleware unlocks browser extension logging tools?",
        answer: "The devtools middleware layer.",
      },
      {
        id: "c8-9",
        question: "How do you clear or reset store variables completely?",
        answer:
          "By overriding the keys inside a dedicated reset action function call.",
      },
      {
        id: "c8-10",
        question: "Can you use Zustand outside React component files?",
        answer: "Yes, via store.getState() and store.setState() methods.",
      },
    ],
  },
  {
    id: "deck-9",
    title: "Docker Containerization Fundamentals",
    progress: 0,
    status: "active",
    cards: [
      {
        id: "c9-1",
        question: "What is a Dockerfile?",
        answer:
          "A text blueprint file outlining automated setups to configure a custom container image layer.",
      },
      {
        id: "c9-2",
        question: "Difference between an image and a container?",
        answer:
          "An image is the read-only snapshot blueprint configuration; a container is a live, running instance running that image snapshot.",
      },
      {
        id: "c9-3",
        question:
          "What command boots multiple coordinated containers concurrently?",
        answer: "docker-compose up",
      },
      {
        id: "c9-4",
        question: "What does the EXPOSE directive do inside a Dockerfile?",
        answer:
          "Informs developers and engines which port boundaries the system monitors at runtime.",
      },
      {
        id: "c9-5",
        question:
          "How do you persist database changes when a container collapses?",
        answer: "By configuring Docker Volumes map tracks.",
      },
      {
        id: "c9-6",
        question:
          "What command kills active local images and free disk spaces?",
        answer: "docker system prune",
      },
      {
        id: "c9-7",
        question:
          "What file ignores copying bulky directories like node_modules into builds?",
        answer: "A .dockerignore file boundary.",
      },
      {
        id: "c9-8",
        question: "What does the -d flag stand for in 'docker run -d'?",
        answer:
          "Detached mode—spins up the container to operate quietly in the background background.",
      },
      {
        id: "c9-9",
        question: "How do you drop a terminal prompt inside a live container?",
        answer: "docker exec -it {container_id} sh",
      },
      {
        id: "c9-10",
        question: "What is Docker Hub?",
        answer:
          "A cloud library platform used to share public container snapshots.",
      },
    ],
  },
  {
    id: "deck-10",
    title: "Git Rebase vs Merging Methods",
    progress: 100,
    status: "archived",
    cards: [
      {
        id: "c10-1",
        question: "What is a main difference between merge and rebase?",
        answer:
          "Merge creates a unique diamond commit tracking path history branch; rebase rewrites linear histories by picking commits and appending them ahead of target nodes.",
      },
      {
        id: "c10-2",
        question:
          "What flag opens an interactive commit restructuring terminal spreadsheet?",
        answer: "git rebase -i",
      },
      {
        id: "c10-3",
        question: "What does squashing commits mean?",
        answer:
          "Condensing several minor commit timeline checkpoints down into a single clean commit message block.",
      },
      {
        id: "c10-4",
        question:
          "Why shouldn't you rebase shared public repository master branches?",
        answer:
          "It alters timeline tracking histories, which completely messes up tracking states for other active developers pulling code branches.",
      },
      {
        id: "c10-5",
        question:
          "How do you exit safely if an interactive rebase runs into massive conflicts?",
        answer: "git rebase --abort",
      },
      {
        id: "c10-6",
        question:
          "What action keyword keeps a commit but drops its edit title descriptions during rebase spreadsheet edits?",
        answer: "fixup (or f)",
      },
      {
        id: "c10-7",
        question:
          "How do you push a branch successfully after completing a rebase timeline adjustment?",
        answer:
          "git push --force-with-lease (safer alternative to pure --force)",
      },
      {
        id: "c10-8",
        question:
          "What command tracks the exact actions history records of local HEAD pointers?",
        answer: "git reflog",
      },
      {
        id: "c10-9",
        question: "What does the pick keyword indicate?",
        answer:
          "Keep this commit exactly as it stands without changing any metadata or codes codes.",
      },
      {
        id: "c10-10",
        question:
          "How do you move to the next phase after patching rebase merge conflicts manually?",
        answer: "git rebase --continue",
      },
    ],
  },
];

export const EXAMPLE_DECK: Deck = {
  id: "example-deck",
  title: "Fun Trivia & General Knowledge",
  progress: 0,
  status: "active",
  cards: [
    {
      id: "ex-1",
      question: "Which planet is known as the 'Red Planet'?",
      answer: "Mars",
    },
    {
      id: "ex-2",
      question: "What is the capital city of France?",
      answer: "Paris",
    },
    {
      id: "ex-3",
      question: "How many continents are there on Earth?",
      answer: "Seven (7)",
    },
    {
      id: "ex-4",
      question: "What is the largest mammal in the world?",
      answer: "The Blue Whale",
    },
    {
      id: "ex-5",
      question: "In which year did the Titanic sink?",
      answer: "1912",
    },
    {
      id: "ex-6",
      question: "What is the hardest natural substance on Earth?",
      answer: "Diamond",
    },
    {
      id: "ex-7",
      question: "Which artist painted the 'Mona Lisa'?",
      answer: "Leonardo da Vinci",
    },
    {
      id: "ex-8",
      question: "What is the chemical symbol for gold?",
      answer: "Au",
    },
    {
      id: "ex-9",
      question: "Which ocean is the largest on Earth?",
      answer: "The Pacific Ocean",
    },
    {
      id: "ex-10",
      question: "Who wrote the play 'Romeo and Juliet'?",
      answer: "William Shakespeare",
    },
  ],
};
