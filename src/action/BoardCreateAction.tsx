"use server";

import { authActionClient } from "@/lib/safe-action";
import { BoardCreationSchema } from "@/lib/zod/board";
import { CreateBoard } from "@/data-access/board-persistance";
import dbConnect from "@/lib/db/connection";
import { redirect } from "next/navigation";
export const BoardCreateAction = authActionClient
  .schema(BoardCreationSchema)
  .action(async ({ parsedInput, ctx }) => {
    await dbConnect();
    const boardId = await CreateBoard({
      userId: ctx.currentUser._id,
      boardName: parsedInput.name,
    });
    return redirect(`/board/${boardId}`);
  });
