import React from "react";
import { getBoardInfoAction } from "./_action/getBoardInfo";
import KanbanBoard from "../_components/KanBanBoard";
import CreateTodo from "../_components/CreateTodo";
import { redirect } from "next/navigation";
interface BoardPageProps {
  params: {
    id: string;
  };
}
const BoardPage = async ({ params: { id } }: BoardPageProps) => {
  const { data } = (await getBoardInfoAction({ id })) as {
    data: Awaited<ReturnType<typeof getBoardInfoAction>>;
  };
  console.log(data);
  if (typeof data === "undefined" || !data) {
    return redirect("/");
  }
  return (
    <main className="w-full p-10">
      <div className="flex justify-between items-center text-2xl font-bold mb-4">
        {data.name}
        <CreateTodo boardId={data._id} />
      </div>
      <KanbanBoard />
    </main>
  );
};

export default BoardPage;
