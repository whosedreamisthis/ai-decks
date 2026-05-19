import React from "react";
import DashboardSummary from "@/components/dashboard/dashboard-summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";

const DashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <DashboardSummary
        overallProficiency="85%"
        totalCardCount={100}
        activeDecksCount={5}
      />
    </div>
  );
};

export default DashboardPage;
