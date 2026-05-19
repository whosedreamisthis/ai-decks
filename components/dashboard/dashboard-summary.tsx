import React from "react";
import { DASHBOARD_SUMMARY } from "@/lib/constants";
import DashboardSummaryCard from "@/components/dashboard/dashboard-summary-card";

interface Props {
  totalCardCount: number;
  activeDecksCount: number;
  overallProficiency: string;
}

const DashboardSummary = ({
  totalCardCount,
  activeDecksCount,
  overallProficiency,
}: Props) => {
  return (
    // 1. Base mobile layout: 2 columns (grid-cols-2)
    // 2. Tablet/Desktop override: switch to 3 columns on medium screens (md:grid-cols-3)
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 m-5">
      {/* First Card (Row 1, Left on mobile | Column 1 on desktop) */}
      <DashboardSummaryCard
        {...DASHBOARD_SUMMARY[0]}
        value={activeDecksCount}
      />

      {/* Second Card (Row 1, Right on mobile | Column 2 on desktop) */}
      <DashboardSummaryCard {...DASHBOARD_SUMMARY[1]} value={totalCardCount} />

      {/* Third Card */}
      {/* col-span-2: spans the full width on mobile */}
      {/* md:col-span-1: resets to take up exactly 1 standard slot in a 3-column row on desktop */}
      <div className="col-span-2 sm:col-span-1">
        <DashboardSummaryCard
          {...DASHBOARD_SUMMARY[2]}
          value={overallProficiency}
        />
      </div>
    </div>
  );
};

export default DashboardSummary;
