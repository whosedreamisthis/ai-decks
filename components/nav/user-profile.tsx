"use client";

import React from "react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { LogIn, User } from "lucide-react";

const UserProfile = () => {
  return (
    <>
      <Show when="signed-in">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "h-8 w-8",
            },
          }}
        />
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <button
            className="rounded-full bg-transparent p-2 transition-colors hover:bg-stone-100 dark:hover:bg-white/5"
            aria-label="Sign In"
          >
            <LogIn size={20} />
          </button>
        </SignInButton>
      </Show>
    </>
  );
};

export default UserProfile;
