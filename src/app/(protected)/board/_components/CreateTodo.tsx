"use client";
import React from "react";
import { PlusCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Form } from "@/components/ui/form";
import InputFormControl from "@/components/FormControl/InputFormField";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoCreationSchema, TodoCreationType } from "@/lib/zod/board";
import { useAction } from "next-safe-action/hooks";
import { CreateTodoAction } from "../../_actions/CreateTodoAction";
import { useToast } from "@/hooks/use-toast";
import { useTasks } from "@/components/TaskContext";
const CreateTodo = ({ boardId }: { boardId: string }) => {
  const { executeAsync, isExecuting } = useAction(CreateTodoAction);
  const { toast } = useToast();
  const { setTasks, tasks } = useTasks();
  const form = useForm<TodoCreationType>({
    resolver: zodResolver(TodoCreationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onSubmit = async (values: TodoCreationType) => {
    const result = await executeAsync({
      boardId: boardId,
      ...values,
    });
    if (result?.data?.error) {
      toast({
        title: "Something went wrong",
      });
    }
    if (result?.data?.newTask) {
      setTasks([...tasks, result.data?.newTask]);
    }
    form.reset();
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormProvider {...form}>
                <InputFormControl
                  label="Enter the title of the board"
                  name="title"
                />
                <InputFormControl
                  label="Enter the description of todo"
                  name="description"
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

export default CreateTodo;
