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
  title = "Delete item",
  description = "Are you sure you want to delete this deck? This action cannot be undone and the data will be permanently removed.",
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* e.stopPropagation() prevents the modal window from closing when clicked internally */}
      <div
        className="relative w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden p-6 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon in the corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 "
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          {/* Destructive Warning Visual Indicator */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
            {title}
          </h3>

          <p className="mt-2 text-sm text-slate-500 leading-relaxed px-2">
            {description}
          </p>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="w-full sm:w-auto px-5 h-10 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium "
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto px-5 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-sm "
            onClick={onDelete}
          >
            Delete permanently
          </Button>
        </div>
      </div>
    </div>
  );
}

// "use client";
//
// import React from "react";
// import { X, Sparkles, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
//
// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   onDelete: () => void;
// }
//
// export default function DeleteConfirmationModal({
//   isOpen,
//   onClose,
//   onDelete,
// }: Props) {
//   if (!isOpen) return null;
//
//   return (
//     <>
//       <div
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       >
//         <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-5 pt-2 pb-5">
//           <h2 className="text-2xl font-semibold  text-center pb-10">
//             Are you sure?
//           </h2>
//           <div className="flex gap-4 justify-end items-center">
//             <Button
//               className="bg-white px-6 py-4 text-slate-800 border border-slate-700 rounded-md"
//               onClick={onClose}
//             >
//               Cancel
//             </Button>
//             <Button className="bg-red-500 px-6 py-4 " onClick={onDelete}>
//               Delete
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
