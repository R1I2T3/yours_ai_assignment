import React from "react";
import { getBoardInfoAction } from "./_action/getBoardInfo";
import KanbanBoard from "../_components/KanBanBoard";
import CreateTodo from "../_components/CreateTodo";
import { redirect } from "next/navigation";
import { TaskProvider } from "@/components/TaskContext";
interface BoardPageProps {
  params: {
    id: string;
  };
}

interface Task {
  _id: string;
  id: string;
  title: string;
  description: string;
  status: string;
  // Add any other properties that your Task might have
}

interface BoardData {
  _id: string;
  name: string;
  Tasks: Task[];
}

// Define the type for the result of getBoardInfoAction
type BoardInfoActionResult = {
  data?: BoardData;
  errors?: string[];
};

const BoardPage = async ({ params: { id } }: BoardPageProps) => {
  const result = (await getBoardInfoAction({ id })) as BoardInfoActionResult;

  if (!result.data) {
    // Handle the case where data is undefined
    console.error("Board data not found:", result.errors);
    return redirect("/");
  }

  const { data } = result;

  return (
    <main className="w-full p-10">
      <TaskProvider
        initialTasks={data.Tasks.map((task) => ({
          ...task,
          id: task._id,
        }))}
      >
        <div className="flex justify-between items-center text-2xl font-bold mb-4">
          {data.name}
          <CreateTodo boardId={data._id} />
        </div>
        <KanbanBoard />
      </TaskProvider>
    </main>
  );
};

export default BoardPage;
