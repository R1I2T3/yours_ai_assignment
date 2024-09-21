"use server";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { DeleteBoard } from "@/data-access/board-persistance";
import { revalidatePath } from "next/cache";
const DeleteBoardSchema = z.object({
  id: z.string().min(1),
});
export const DeleteBoardAction = authActionClient
  .schema(DeleteBoardSchema)
  .action(async ({ parsedInput }) => {
    await DeleteBoard(parsedInput.id);
    return revalidatePath("/", "page");
  });
