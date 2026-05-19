import React from "react";

const PageHeader = ({ title }: { title: string }) => {
  // 2. Fall back to "Friend" if the page explicitly flags isDemo,
  // or if Clerk is still checking session cookies.

  return <div className="text-2xl font-bold m-5">{title}</div>;
};

export default PageHeader;
