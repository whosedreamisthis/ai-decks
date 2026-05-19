"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import PageHeader from "@/components/common/page-header";

interface GreetingProps {
  isDemo?: boolean;
}

const DashboardHeader = ({ isDemo = false }: GreetingProps) => {
  const { user, isLoaded } = useUser();

  // 2. Fall back to "Friend" if the page explicitly flags isDemo,
  // or if Clerk is still checking session cookies.
  const firstName = isDemo || !isLoaded ? "" : (user?.firstName ?? "Friend");

  return <PageHeader title={`Welcome back, ${firstName}`} />;
};

export default DashboardHeader;
