import React from "react";
import { LuSettings } from "react-icons/lu";

export default function CreateDeckGraphic() {
  return (
    <div className="relative w-32 h-28 flex items-center justify-center select-none">
      {/* Background Circle Glow */}
      <div className="absolute inset-2 bg-emerald-200/40 rounded-full blur-md" />

      {/* Browser Window 3 (Back Layer) */}
      <div className="absolute left-2 top-6 w-20 h-16 bg-white/60 border border-emerald-600/20 rounded-lg shadow-xs" />

      {/* Browser Window 2 (Middle Layer) */}
      <div className="absolute left-4 top-4 w-20 h-16 bg-white/80 border border-emerald-600/30 rounded-lg shadow-xs" />

      {/* Browser Window 1 (Front Active Layer) */}
      <div className="absolute left-6 top-8 w-22 h-18 bg-white border border-emerald-600/40 rounded-xl shadow-md p-2 flex flex-col gap-1.5">
        {/* Browser Top Header Dot/Bar */}
        <div className="flex gap-1 items-center border-b border-gray-100 pb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <div className="w-6 h-1 rounded-xs bg-gray-200" />
        </div>
        {/* Content Placeholders */}
        <div className="w-10 h-1.5 rounded-xs bg-brand-mint/30" />{" "}
        {/* Uses your brand-mint */}
        <div className="w-14 h-1 rounded-xs bg-gray-200" />
        <div className="w-12 h-1 rounded-xs bg-gray-200" />
      </div>

      {/* Floating Gear Icon Stack (Top Right) */}
      <div className="absolute right-4 top-2 text-emerald-600 drop-shadow-xs animate-spin-slow">
        <LuSettings size={28} strokeWidth={2.5} />
      </div>
      <div className="absolute right-1 top-8 text-emerald-500/80 drop-shadow-xs">
        <LuSettings size={18} strokeWidth={2.5} />
      </div>
    </div>
  );
}
