"use client";

import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { LogoutAction } from "@/action/LogoutActon";
import { useToast } from "@/hooks/use-toast";
const LogoutButton = () => {
  const { toast } = useToast();
  const { executeAsync, result, isExecuting } = useAction(LogoutAction);
  const onLogoutButtonClick = async () => {
    executeAsync();
    if (result.serverError || result.validationErrors) {
      toast({
        title: result.serverError || "Try again later",
      });
    }
  };
  return (
    <Button
      className="rounded-full p-5 bg-purple-500 hover:bg-purple-700 disabled:bg-purple-700"
      onClick={onLogoutButtonClick}
      disabled={isExecuting}
    >
      <LogOut />
    </Button>
  );
};

export default LogoutButton;
