"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import PageHeader from "@/components/common/page-header";
import Link from "next/link";
import { MoveRight } from "lucide-react";

interface GreetingProps {
  isDemo?: boolean;
}

const DashboardHeader = ({ isDemo = false }: GreetingProps) => {
  const { user, isLoaded } = useUser();

  // 2. Fall back to "Friend" if the page explicitly flags isDemo,
  // or if Clerk is still checking session cookies.
  const firstName = isDemo
    ? "Friend"
    : !isLoaded
      ? ""
      : (user?.firstName ?? "Friend");

  return (
    <div className="flex items-center justify-between">
      <PageHeader title={`Welcome back, ${firstName}`} />
      <Link
        href="/decks"
        className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100  group mr-5 shrink-0  whitespace-nowrap"
      >
        <span>View all decks</span>
        <MoveRight
          size={16}
          className="transform group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>
  );
};

export default DashboardHeader;
