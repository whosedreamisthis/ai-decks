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
    <div className="flex gap-4 items-center shadow-md border border-gray-500/20 bg-white p-5 w-full rounded-md">
      <div>
        <div
          className={`flex justify-center items-center h-9 w-9 rounded-md  ${bgColor}`}
        >
          <Icon />
        </div>
      </div>
      <div className="flex flex-col   justify-start items-start ">
        <p className="text-sm">{title}</p>
        <p className={`text-xl font-semibold ${fgColor}`}>{value}</p>
      </div>
    </div>
  );
};

export default DashboardSummaryCard;
