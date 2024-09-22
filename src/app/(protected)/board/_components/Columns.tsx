import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Circle, ArrowRightCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/components/TaskContext";
import { SortableTask } from "./SortTableTask";

const columnColors = {
  todo: "bg-blue-100 border-blue-300",
  progress: "bg-yellow-100 border-yellow-300",
  completed: "bg-green-100 border-green-300",
};

export const Column = ({
  title,
  tasks,
  status,
}: {
  title: string;
  tasks: Task[];
  status: "todo" | "progress" | "completed";
}) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Card className={`w-full shadow-lg ${columnColors[status]} border-t-4`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            {status === "todo" && (
              <Circle className="w-5 h-5 mr-2 text-blue-500" />
            )}
            {status === "progress" && (
              <ArrowRightCircle className="w-5 h-5 mr-2 text-yellow-500" />
            )}
            {status === "completed" && (
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
            )}
            {title}
          </h2>
          <Badge variant="secondary" className="bg-white">
            {tasks.length}
          </Badge>
        </div>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <div ref={setNodeRef} className="space-y-2 min-h-[200px]">
            {tasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))}
            {tasks.length === 0 && (
              <div className="text-gray-400 text-center pt-8">
                Drop tasks here
              </div>
            )}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
};
