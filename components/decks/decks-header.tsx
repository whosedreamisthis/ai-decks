import React from "react";
import PageHeader from "@/components/common/page-header";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const DecksHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <PageHeader title="Your Decks" />
      <Link href="/dashboard" className="flex gap-2 mr-5">
        <p>View current decks</p>
        <MoveRight />
      </Link>
    </div>
  );
};

export default DecksHeader;
