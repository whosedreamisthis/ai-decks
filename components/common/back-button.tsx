// components/common/back-button.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  // 1. Default fallback: safely stays inside your app if there's no valid internal history
  const [backUrl, setBackUrl] = useState("/dashboard");

  useEffect(() => {
    if (typeof window !== "undefined" && document.referrer) {
      try {
        const referrerUrl = new URL(document.referrer);

        // 2. Security Check: Only trust the referrer if it matches your current domain (e.g., localhost)
        const isInternalSite = referrerUrl.host === window.location.host;

        if (isInternalSite) {
          // If they came from somewhere inside your app, go there!
          setBackUrl(referrerUrl.pathname + referrerUrl.search);
        } else {
          // If they came from Google, external sites, or a blank tab, default to your dashboard layout
          setBackUrl("/dashboard");
        }
      } catch (error) {
        // Fallback if URL parsing fails
        setBackUrl("/dashboard");
      }
    }
  }, []);

  return (
    <Link
      href={backUrl}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
    >
      <ArrowLeft size={16} />
      <span>Back</span>
    </Link>
  );
}
