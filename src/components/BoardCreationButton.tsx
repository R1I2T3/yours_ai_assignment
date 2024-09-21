"use client";

import React from "react";
import { PlusCircle, Loader } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form } from "./ui/form";
import InputFormControl from "./FormControl/InputFormField";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardCreationSchema, BoardCreationType } from "@/lib/zod/board";
import { useAction } from "next-safe-action/hooks";
import { BoardCreateAction } from "@/action/BoardCreateAction";
import { useToast } from "@/hooks/use-toast";

const BoardCreationButton = () => {
  const { executeAsync, isExecuting, result } = useAction(BoardCreateAction);
  const { toast } = useToast();
  const form = useForm<BoardCreationType>({
    resolver: zodResolver(BoardCreationSchema),
    defaultValues: {
      name: "",
    },
  });
  const onBoardCreationButtonClick = async (values: BoardCreationType) => {
    await executeAsync(values);
    if (result.serverError || result.validationErrors) {
      toast({
        title: "Failed to create board",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full p-5 bg-purple-500 hover:bg-purple-700 disabled:bg-purple-700">
          <PlusCircle />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Create Board</AlertDialogTitle>
          <AlertDialogDescription hidden>
            This alert dialog will create a board
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onBoardCreationButtonClick)}
              className="w-full"
            >
              <FormProvider {...form}>
                <InputFormControl
                  label="Enter the name of the board"
                  name="name"
                />
                <div className="flex mt-4 gap-4 justify-end">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-purple-500  hover:bg-purple-700 disabled:bg-purple-700"
                    type="submit"
                  >
                    {isExecuting ? (
                      <Loader className="animate-spin h-10 w-10 text-gray-500" />
                    ) : (
                      "Create Board"
                    )}
                  </AlertDialogAction>
                </div>
              </FormProvider>
            </form>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BoardCreationButton;
