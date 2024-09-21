"use server";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { createTodo } from "@/data-access/board-persistance";
import { revalidatePath } from "next/cache";
const CreateTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().max(50),
  boardId: z.string().min(1),
});
export const CreateTodoAction = authActionClient
  .schema(CreateTodoSchema)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);

    await createTodo(parsedInput);
    return revalidatePath(`/board/${parsedInput.boardId}`, "page");
  });
