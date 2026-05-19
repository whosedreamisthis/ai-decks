import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CurrentDeckActions = () => {
  return (
    <div className="absolute top-0 right-2 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="relative flex justify-end`">
          <button className="text-gray-800 w-full hover:text-gray-600  transition-colors z-10 p-0 m-0 border-none focus:outline-none focus-visible:ring-0 select-none cursor-pointer">
            <IoEllipsisHorizontal size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <FiArchive />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 cursor-pointer">
              <FaRegTrashAlt className="h-2 w-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CurrentDeckActions;
