"use server";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { createTodo } from "@/data-access/board-persistance";
const CreateTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().max(50),
  boardId: z.string().min(1),
});
export const CreateTodoAction = authActionClient
  .schema(CreateTodoSchema)
  .action(async ({ parsedInput }) => {
    const task = JSON.parse(JSON.stringify(await createTodo(parsedInput)));
    if (!task) return { error: "Could not create task" };
    return {
      newTask: { ...task, id: task._id },
    };
  });
