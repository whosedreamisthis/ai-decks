import React from "react";
import PageHeader from "@/components/common/page-header";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const DecksHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <PageHeader title="Your Decks" />
      <Link
        href="/dashboard"
        className="flex gap-2 mr-5  flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100  group"
      >
        <p>Home</p>
        <MoveRight />
      </Link>
    </div>
  );
};

export default DecksHeader;
