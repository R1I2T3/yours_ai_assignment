"use client";

import React from "react";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const BoardCardActions = ({ id }: { id: string }) => {
  const router = useRouter();
  const onViewButtonClick = () => {
    router.push(`/board/${id}`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="bg-background hover:bg-background">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onViewButtonClick}>
          View Board
        </DropdownMenuItem>
        <DropdownMenuItem>Edit Board Name</DropdownMenuItem>
        <DropdownMenuItem>Delete Board</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BoardCardActions;
