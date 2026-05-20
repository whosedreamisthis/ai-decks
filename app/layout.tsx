import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/nav/top-nav";
import { ClerkProvider } from "@clerk/nextjs";
import { cookies } from "next/headers";

const sansFont = Inter({
  subsets: ["latin"],
  display: "swap",
  // This defines a CSS custom variable name that Tailwind v4 can grab
  variable: "--font-sans-custom",
});

export const metadata: Metadata = {
  title: "AI Flash-Card Sprint",
  description: "Master complex topics with agentic AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  return (
    <html
      lang="en"
      className={`${sansFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-brand-bg text-brand-text h-full">
        <ClerkProvider>
          <div className="min-h-screen flex flex-col">
            <TopNav isDemo={isDemo} />
            <main className="flex-1">{children}</main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
