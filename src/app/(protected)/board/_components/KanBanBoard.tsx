"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column } from "./Columns";
import { SortableTask } from "./SortTableTask";
import { useTasks, Task } from "@/components/TaskContext";
import { updateTaskStatusAction } from "../../_actions/updateTaskStatus";
import { useAction } from "next-safe-action/hooks";
export default function KanBanBoard() {
  const { tasks, setTasks } = useTasks();
  const { execute } = useAction(updateTaskStatusAction);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTask(tasks.find((task) => task.id === active.id) || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    const overId = over.id;

    if (overId === "todo" || overId === "progress" || overId === "completed") {
      execute({ id: active.id.toString(), status: overId });

      if (activeTask.status !== overId) {
        setTasks((tasks) =>
          tasks.map((task) =>
            task.id === active.id
              ? { ...task, status: overId as Task["status"] }
              : task
          )
        );
      }
    } else {
      const overTask = tasks.find((task) => task.id === overId);
      if (!overTask || activeTask.status === overTask.status) return;
      // execute({ id: active.id, status: overTask.status });
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        return arrayMove(tasks, activeIndex, overIndex).map((task) => {
          if (task.id === active.id) {
            return { ...task, status: overTask.status };
          }
          return task;
        });
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    const overId = over.id;

    if (overId === "todo" || overId === "progress" || overId === "completed") {
      if (activeTask.status !== overId) {
        setTasks((tasks) =>
          tasks.map((task) =>
            task.id === active.id
              ? { ...task, status: overId as Task["status"] }
              : task
          )
        );
      }
    } else {
      const overTask = tasks.find((task) => task.id === overId);
      if (!overTask) return;

      if (activeTask.status !== overTask.status) {
        setTasks((tasks) =>
          tasks.map((task) => {
            if (task.id === active.id) {
              return { ...task, status: overTask.status };
            }
            return task;
          })
        );
      } else if (active.id !== over.id) {
        setTasks((tasks) => {
          const oldIndex = tasks.findIndex((t) => t.id === active.id);
          const newIndex = tasks.findIndex((t) => t.id === over.id);

          return arrayMove(tasks, oldIndex, newIndex);
        });
      }
    }

    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4">
        <Column
          title="To Do"
          tasks={tasks.filter((task) => task.status === "todo")}
          status="todo"
        />
        <Column
          title="In Progress"
          tasks={tasks.filter((task) => task.status === "progress")}
          status="progress"
        />
        <Column
          title="Completed"
          tasks={tasks.filter((task) => task.status === "completed")}
          status="completed"
        />
      </div>
      <DragOverlay>
        {activeTask ? <SortableTask task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
