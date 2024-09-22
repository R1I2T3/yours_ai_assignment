import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/components/TaskContext";

const taskColors = {
  todo: "border-l-4 border-blue-500",
  progress: "border-l-4 border-yellow-500",
  completed: "border-l-4 border-green-500",
};

export const SortableTask = ({ task }: { task: Task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-3 rounded shadow cursor-move hover:shadow-md transition-shadow duration-200 ${
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        taskColors[task.status]
      }`}
    >
      <div className="flex justify-between items-start">
        <p className="text-sm">{task.title}</p>
      </div>
    </Card>
  );
};
