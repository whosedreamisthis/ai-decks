"use client";

import React from "react";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  description?: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onDelete,
  title = "Delete Deck",
  description = "Are you sure you want to delete this deck? This action cannot be undone and the data will be permanently removed.",
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-700/60 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden p-6 animate-scale-up transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 mb-4 shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
            {title}
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-2">
            {description}
          </p>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="w-full sm:w-auto px-5 h-10 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-lg font-medium transition-colors"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto px-5 h-10 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white rounded-lg font-medium shadow-sm transition-colors"
            onClick={onDelete}
          >
            Delete permanently
          </Button>
        </div>
      </div>
    </div>
  );
}
