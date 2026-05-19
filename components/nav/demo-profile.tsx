import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutDemo } from "../../lib/actions/auth";
import { LogOut } from "lucide-react";

const DemoProfile = () => {
  return (
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
  );
};

export default DemoProfile;
