"use server";

import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { updateTask } from "@/data-access/board-persistance";

const UpdateTaskStatusSchema = z.object({
  id: z.string().min(1),
  status: z.string().min(1),
});

export const updateTaskStatusAction = authActionClient
  .schema(UpdateTaskStatusSchema)
  .action(async ({ parsedInput }) => {
    await updateTask({ TaskId: parsedInput.id, status: parsedInput.status });
    return true;
  });
