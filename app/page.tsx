import React from "react";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LuZap } from "react-icons/lu";
import { loginAsDemo } from "../lib/actions/auth";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function HomePage() {
  const { userId } = await auth();
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  if (userId || isDemo) {
    redirect("/dashboard");
  }

  //

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc
    (100vh-64px)] bg-brand-bg text-brand-text p-4"
    >
      <div className="flex flex-col items-center gap-8 max-w-2xl text-center">
        {/* Large Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center items-center h-32 w-32 rounded-3xl bg-brand-mint-light text-brand-mint shadow-sm">
            <LuZap size={64} />
          </div>
          <h1 className="text-6xl font-bold tracking-tight">AI Decks</h1>
          <p className="text-xl text-brand-muted max-w-md">
            Master complex topics with agentic AI flash-cards. Sprint through
            your learning goals.
          </p>
        </div>

        <div className="flex flex-row gap-3 justify-center items-center w-full max-w-sm mx-auto">
          {/* Left Side: Demo Form Container */}
          <form action={loginAsDemo} className="flex-1">
            <Button
              type="submit"
              variant="outline"
              size="lg"
              // Removed max-w-40 so the button naturally stretches to match the form's full available width
              className="w-full text-lg h-12 border-brand-border hover:bg-brand-mint-light/50 cursor-pointer"
            >
              Demo
            </Button>
          </form>

          {/* Right Side: Clerk Sign In Trigger */}
          {/* Wrapping the button inside a flex-1 div ensures it mirrors the layout footprint of the form on the left */}
          <div className="flex-1">
            <SignInButton mode="modal">
              <Button
                size="lg"
                // Removed max-w-40 so it matches the left button item perfectly at 1:1 scale ratios
                className="w-full bg-brand-mint hover:bg-brand-mint/90 text-white text-lg h-12決 cursor-pointer h-12"
              >
                Sign In
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
}
