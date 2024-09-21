"use server";

import dbConnect from "@/lib/db/connection";
import { authActionClient } from "@/lib/safe-action";
import { getBoards } from "@/data-access/board-persistance";
export const GetAllBoardAction = authActionClient.action(async ({ ctx }) => {
  await dbConnect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boards = (await getBoards(ctx.currentUser._id)).map((b: any) => ({
    id: b._id,
    name: b.name,
  }));
  return { boards };
});
