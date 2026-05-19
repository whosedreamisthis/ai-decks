import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/nav/top-nav";
import { ClerkProvider } from "@clerk/nextjs";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-brand-bg text-brand-text h-full">
        <ClerkProvider>
          <TopNav />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
