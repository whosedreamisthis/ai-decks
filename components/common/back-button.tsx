// components/common/back-button.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallbackUrl?: string;
}

export default function BackButton({
  fallbackUrl = "/dashboard",
}: BackButtonProps) {
  const router = useRouter();

  const handleBackClick = (e: React.MouseEvent) => {
    // Check if the window history has items we can go back to
    if (typeof window !== "undefined" && window.history.length > 1) {
      e.preventDefault();
      router.back(); // Native back: Dashboard -> Deck goes back to Dashboard, Decks -> Deck goes back to Decks!
    }
    // If no history exists (e.g. fresh tab page refresh), it follows the standard link href fallback
  };

  return (
    <a
      href={fallbackUrl}
      onClick={handleBackClick}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground  mb-4 select-none"
    >
      <ArrowLeft size={16} />
      <span>Back</span>
    </a>
  );
}
