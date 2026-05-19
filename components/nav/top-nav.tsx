"use client";
import React from "react";
import Logo from "./logo";
import { Separator } from "@/components/ui/separator";
import Profile from "@/components/nav/profile";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutDemo } from "../../lib/actions/auth";
import { LogIn, LogOut } from "lucide-react";
import { UserButton, Show, SignInButton } from "@clerk/nextjs";

const TopNav = ({ isDemo }: { isDemo: boolean }) => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="sticky top-0 bg-white z-50">
      <div className=" bg-white flex  items-center justify-between px-5 py-2">
        <Logo />
        {isDemo ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="h-9 w-9 rounded-full bg-brand-purple flex items-center justify-center font-bold text-xs outline-none hover:opacity-90 transition-opacity text-white cursor-pointer"
              aria-label="Demo User Menu"
            >
              D
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Demo User</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <form action={logoutDemo}>
                <DropdownMenuItem asChild>
                  <button
                    type="submit"
                    className="w-full cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                  >
                    <LogOut size={16} />
                    <span>Logout Demo</span>
                  </button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
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
        )}
      </div>
      <Separator className="mt-2" />
    </div>
  );
};

export default TopNav;
