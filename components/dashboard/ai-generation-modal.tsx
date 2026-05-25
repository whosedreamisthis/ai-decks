"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createAiDeckAction } from "@/lib/actions/decks";
import { isRedirectError } from "next/dist/client/components/redirect-error";

interface AIGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIGenerationModal({
  isOpen,
  onClose,
}: AIGenerationModalProps) {
  const [input, setInput] = useState("");
  const [cardCount, setCardCount] = useState("10");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setErrorStatus(null);

    const prompt = `Create a ${cardCount} card deck focusing on key foundational concepts of: ${input}`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("API Error Response:", data);
        throw new Error(data.error || data.details || "Generation failed");
      }

      let rawJson = data.jsonString;
      // Secondary sanitization just in case
      if (rawJson.includes("```")) {
        rawJson = rawJson.replace(/```json\n?|```/g, "").trim();
      }

      let generatedCards;
      try {
        generatedCards = JSON.parse(rawJson);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError, "Raw content:", rawJson);
        throw new Error(
          "Failed to parse the AI generated content. Please try again.",
        );
      }

      if (!Array.isArray(generatedCards) || generatedCards.length === 0) {
        throw new Error("Invalid structure returned from generator");
      }

      await createAiDeckAction(input, generatedCards);
      handleCloseWrapper();
    } catch (error: any) {
      if (isRedirectError(error)) {
        throw error;
      }
      console.error(error);
      setErrorStatus(
        error.message || "An unexpected generation error occurred.",
      );
      setIsLoading(false);
    }
  };

  const handleCloseWrapper = () => {
    setInput("");
    setCardCount("10");
    setErrorStatus(null);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in-0 duration-200"
      onClick={isLoading ? undefined : handleCloseWrapper}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col scale-100 animate-in zoom-in-95 duration-150 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER AREA */}
        {/* FIXED: Changed bottom separator lines to dark:border-slate-800 */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles
              size={18}
              className="text-brand-purple dark:text-purple-400"
            />

            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Generate with Gemini AI
            </h2>
          </div>
          <button
            onClick={handleCloseWrapper}
            className="p-1 text-muted-foreground dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 rounded-lg transition-colors"
            disabled={isLoading}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* MODAL MAIN CONTENT FIELDS FORM */}
        <div className="p-6 flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {/* Input Target Topic Selection */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="topic"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                What do you want to study?
              </label>

              <input
                id="topic"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., React Server Components, TypeScript Generics..."
                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-brand-purple dark:focus:border-purple-400 text-slate-800 dark:text-slate-100 text-sm shadow-sm transition-colors"
                disabled={isLoading}
                autoFocus
                required
              />
            </div>

            {/* Dynamic Deck Size Selector Dropdown Box */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="cardCount"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Number of cards
              </label>

              <select
                id="cardCount"
                value={cardCount}
                onChange={(e) => setCardCount(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-brand-purple dark:focus:border-purple-400 text-slate-800 dark:text-slate-100 text-sm shadow-sm cursor-pointer transition-colors"
                disabled={isLoading}
              >
                <option value="5" className="dark:bg-slate-800">
                  5 Cards (Quick Review)
                </option>
                <option value="10" className="dark:bg-slate-800">
                  10 Cards (Standard Session)
                </option>
                <option value="15" className="dark:bg-slate-800">
                  15 Cards (Detailed Study)
                </option>
                <option value="20" className="dark:bg-slate-800">
                  20 Cards (Deep Dive)
                </option>
              </select>
            </div>

            {/* ERROR ALERTS PAYLOAD FIELD */}
            {errorStatus && (
              <p className="text-sm text-red-500 font-medium bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-100 dark:border-red-900/50">
                {errorStatus}
              </p>
            )}

            <div className="flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
              <Button
                type="button"
                variant="ghost"
                className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                onClick={handleCloseWrapper}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand-purple hover:bg-brand-purple/90 dark:bg-purple-600 dark:hover:bg-purple-500 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Generating Deck..." : "Generate Deck"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
