import React from "react";
import { LuSettings } from "react-icons/lu";

export default function CreateDeckGraphic() {
  return (
    <div className="relative w-32 h-28 flex items-center justify-center select-none">
      {/* Background Circle Glow */}
      {/* FIXED: Shifted light-green blur into a deeper, subtle emerald glow in dark mode */}
      <div className="absolute inset-2 bg-emerald-200/40 dark:bg-emerald-950/30 rounded-full blur-md" />

      {/* Browser Window 3 (Back Layer) */}
      {/* FIXED: Changed bg-white/60 to dark:bg-slate-900/40 and adjusted boundaries to use your crisp dark:border-slate-700 outline */}
      <div className="absolute left-2 top-6 w-20 h-16 bg-white/60 dark:bg-slate-900/40 border border-emerald-600/20 dark:border-slate-700/50 rounded-lg shadow-xs transition-colors" />

      {/* Browser Window 2 (Middle Layer) */}
      {/* FIXED: Changed bg-white/80 to dark:bg-slate-900/70 */}
      <div className="absolute left-4 top-4 w-20 h-16 bg-white/80 dark:bg-slate-900/70 border border-emerald-600/30 dark:border-slate-700 rounded-lg shadow-xs transition-colors" />

      {/* Browser Window 1 (Front Active Layer) */}
      {/* FIXED: Changed main wrapper surface fill to dark:bg-slate-900 with your distinct light border (dark:border-slate-700) */}
      <div className="absolute left-6 top-8 w-22 h-18 bg-white dark:bg-slate-900 border border-emerald-600/40 dark:border-slate-700 rounded-xl shadow-md p-2 flex flex-col gap-1.5 transition-colors">
        {/* Browser Top Header Dot/Bar */}
        <div className="flex gap-1 items-center border-b border-gray-100 dark:border-slate-800 pb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {/* Muted the tiny layout title bar placeholder to dark:bg-slate-800 */}
          <div className="w-6 h-1 rounded-xs bg-gray-200 dark:bg-slate-800" />
        </div>
        {/* Content Placeholders */}
        <div className="w-10 h-1.5 rounded-xs bg-brand-mint/30" />
        {/* Adjusted content simulation lines to dark:bg-slate-800 */}
        <div className="w-14 h-1 rounded-xs bg-gray-200 dark:bg-slate-800" />
        <div className="w-12 h-1 rounded-xs bg-gray-200 dark:bg-slate-800" />
      </div>

      {/* Floating Gear Icon Stack (Top Right) */}
      {/* FIXED: Brightened the emerald gears slightly in dark mode (dark:text-emerald-400) to stand out against the background canvas */}
      <div className="absolute right-4 top-2 text-emerald-600 dark:text-emerald-400 drop-shadow-xs animate-spin-slow">
        <LuSettings size={28} strokeWidth={2.5} />
      </div>
      <div className="absolute right-1 top-8 text-emerald-500/80 dark:text-emerald-500/60 drop-shadow-xs">
        <LuSettings size={18} strokeWidth={2.5} />
      </div>
    </div>
  );
}
