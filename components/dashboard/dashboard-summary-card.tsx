import React from "react";
import { IconType } from "react-icons";

interface Props {
  title: string;
  value: number | string;
  icon: IconType;
  bgColor: string;
  fgColor: string;
}

const DashboardSummaryCard = async ({
  title,
  value,
  icon: Icon,
  bgColor,
  fgColor,
}: Props) => {
  return (
    <div className="flex gap-4 items-center shadow-md border border-gray-500/20 dark:border-slate-700 bg-white dark:bg-slate-700/60 p-5 w-full rounded-md transition-colors">
      <div>
        <div
          className={`flex justify-center items-center h-9 w-9 rounded-md shrink-0 dark:bg-opacity-20 ${bgColor}`}
        >
          <div className={`${fgColor} dark:text-slate-900`}>
            <Icon size={18} />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-1">
          {title}
        </p>

        <p
          className={`text-xl font-bold truncate tracking-tight dark:text-white ${fgColor}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default DashboardSummaryCard;
