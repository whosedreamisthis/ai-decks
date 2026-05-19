"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";

interface GreetingProps {
  isDemo?: boolean;
}

const DashboardHeader = ({ isDemo = false }: GreetingProps) => {
  const { user, isLoaded } = useUser();

  // 2. Fall back to "Friend" if the page explicitly flags isDemo,
  // or if Clerk is still checking session cookies.
  const firstName =
    isDemo || !isLoaded ? "Friend" : (user?.firstName ?? "Friend");

  return (
    <div className="text-2xl font-bold m-5">Welcome back, {firstName}!</div>
  );
};

export default DashboardHeader;
