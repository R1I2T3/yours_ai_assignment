"use server";
import { z } from "zod";
import { authActionClient } from "@/lib/safe-action";
import { getBoard } from "@/data-access/board-persistance";
const getBoardSchema = z.object({
  id: z.string().min(1),
});
export const getBoardInfoAction = authActionClient
  .schema(getBoardSchema)
  .action(async ({ parsedInput }) => {
    const board = await getBoard(parsedInput.id);
    return board;
  });
