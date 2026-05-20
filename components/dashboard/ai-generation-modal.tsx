// @/components/dashboard/ai-generation-modal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createAiDeckAction } from "@/lib/actions/decks";

interface AIGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIGenerationModal({
  isOpen,
  onClose,
}: AIGenerationModalProps) {
  const [input, setInput] = useState("");
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

    // Tight instruction telling Gemini exactly what concept framework to extract
    const prompt = `Create a 10 card deck focusing on key foundational concepts of: ${input}`;

    try {
      // 1. Get the structured array string back from your local route handler bridge
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");

      // 2. Safe parse the reliable structured output payload directly into your model array
      const generatedCards = JSON.parse(data.jsonString);

      if (!Array.isArray(generatedCards) || generatedCards.length === 0) {
        throw new Error("Invalid structure returned from generator");
      }

      // 3. Call your Server Action to create the DB entries and handle the page redirection
      await createAiDeckAction(input, generatedCards);

      handleCloseWrapper();
    } catch (error: any) {
      console.error(error);
      setErrorStatus(
        error.message || "An unexpected generation error occurred.",
      );
      setIsLoading(false);
    }
  };

  const handleCloseWrapper = () => {
    setInput("");
    setErrorStatus(null);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      onClick={isLoading ? undefined : handleCloseWrapper}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-100 flex flex-col scale-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-brand-purple" />
            <h2 className="text-lg font-bold text-slate-800">
              Generate with Gemini AI
            </h2>
          </div>
          <button
            onClick={handleCloseWrapper}
            className="p-1 text-muted-foreground hover:text-slate-800 rounded-lg transition-colors"
            disabled={isLoading}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="topic"
                className="text-sm font-semibold text-slate-700"
              >
                What do you want to study?
              </label>
              <input
                id="topic"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., React Server Components, TypeScript Generics..."
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-purple text-slate-800 text-sm shadow-sm"
                disabled={isLoading}
                autoFocus
                required
              />
            </div>

            {errorStatus && (
              <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                {errorStatus}
              </p>
            )}

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCloseWrapper}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand-purple hover:bg-brand-purple/90 text-white font-medium"
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
