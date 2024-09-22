import React from "react";
import { GetAllBoardAction } from "./_actions/getAllBoards";
import BoardStatusCard from "./board/BoardCard";
const HomePage = async () => {
  const result = (await GetAllBoardAction()) as {
    data: Awaited<ReturnType<typeof GetAllBoardAction>>;
  };
  let boards = [];
  if (result && "data" in result && "boards" in result.data!) {
    // Safely access boards
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    boards = result.data.boards as any[];
  }
  return (
    <div className="p-10 w-full grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
      {boards?.length > 0 ? (
        boards?.map((board) => (
          <BoardStatusCard key={board.id} name={board.name} id={board.id} />
        ))
      ) : (
        <div className="flex justify-center items-center w-[90dvw] font-extrabold text-3xl text-center">
          Their are no boards
        </div>
      )}
    </div>
  );
};

export default HomePage;
