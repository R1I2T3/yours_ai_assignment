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
import { useAction } from "next-safe-action/hooks";
import { DeleteBoardAction } from "../_actions/DeleteBoardAction";
import { useToast } from "@/hooks/use-toast";
const BoardCardActions = ({ id }: { id: string }) => {
  const router = useRouter();
  const { executeAsync, result } = useAction(DeleteBoardAction);
  const { toast } = useToast();
  const onViewButtonClick = () => {
    router.push(`/board/${id}`);
  };
  const onDeleteButtonClick = async () => {
    await executeAsync({ id });
    if (result.serverError || result.validationErrors) {
      toast({
        title: "Something went wrong",
      });
    }
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
        <DropdownMenuItem onClick={onDeleteButtonClick}>
          Delete Board
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BoardCardActions;
