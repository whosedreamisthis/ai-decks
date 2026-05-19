import React from "react";

const ProgressBar = ({
  percentage,
  isFull,
}: {
  percentage: number;
  isFull: boolean;
}) => {
  return (
    <div
      className={`relative h-2 flex-1 max-w-[${isFull ? "100" : "70"}%] translate-y-[1.5px]`}
    >
      <div className="absolute inset-0 bg-slate-200/80 dark:bg-stone-700 rounded-full"></div>
      <div
        className={`absolute inset-0 rounded-full bg-brand-blue transition-all duration-30`}
        style={{
          width: `${Math.min(percentage, 100)}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
