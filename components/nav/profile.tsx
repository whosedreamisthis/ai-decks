"use client";

import React from "react";
import {
  useClerk,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Profile = () => {
  const { openSignIn, openSignUp } = useClerk();

  return (
    <div>
      <Show when="signed-out">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <User />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => openSignIn({ signUpUrl: "/dashboard" })}
              >
                Sign In
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => openSignUp({ signInUrl: "/dashboard" })}
              >
                Sign Up
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
};

export default Profile;
