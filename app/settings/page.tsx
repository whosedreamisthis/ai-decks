"use client";

import React, { useEffect } from "react";
import PageHeader from "@/components/common/page-header";

const SettingsPage = () => {
  // Reset the window scroll position back to the top when this page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-blue/10 overflow-hidden pb-5">
      <PageHeader title="Settings" />
    </div>
  );
};

export default SettingsPage;
