import React from "react";
import DashboardSummary from "@/components/dashboard/dashboard-summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { cookies } from "next/headers";

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";
  return (
    <div>
      <DashboardHeader isDemo={isDemo} />
      <DashboardSummary
        overallProficiency="85%"
        totalCardCount={100}
        activeDecksCount={5}
      />
    </div>
  );
};

export default DashboardPage;
