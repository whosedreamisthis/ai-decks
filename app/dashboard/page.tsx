import React from 'react';
import DashboardSummary from "@/components/dashboard/dashboard-summary";

const DashboardPage = () => {
    return (
        <div>
            <DashboardSummary overallProficiency="85%" totalCardCount={100} activeDecksCount={5} />
        </div>
    );
};

export default DashboardPage;