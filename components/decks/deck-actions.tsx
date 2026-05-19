"use client";
import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { ArchiveRestore } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { archiveDeck, unarchiveDeck, deleteDeck } from "@/lib/actions/decks";

const DeckActions = ({
  deckId,
  status,
}: {
  deckId: string;
  status: "active" | "archived";
}) => {
  const handleArchiveDeck = async () => {
    await archiveDeck(deckId);
  };

  const handleUnarchiveDeck = async () => {
    await unarchiveDeck(deckId);
  };

  const handleDeleteDeck = async () => {
    await deleteDeck(deckId);
  };

  return (
    <div className="absolute top-2 right-2 z-20">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center justify-center text-gray-800 hover:text-gray-600 transition-colors z-10 p-1 m-0 border-none focus:outline-none focus-visible:ring-0 select-none cursor-pointer rounded-full hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IoEllipsisHorizontal size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={
                status === "active" ? handleArchiveDeck : handleUnarchiveDeck
              }
            >
              {status === "active" ? (
                <div className="flex items-center gap-2">
                  <FiArchive />
                  <span>Archive</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ArchiveRestore />
                  <span>Unarchive</span>
                </div>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onSelect={handleDeleteDeck}
            >
              <FaRegTrashAlt />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DeckActions;
