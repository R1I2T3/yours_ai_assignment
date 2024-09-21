"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CreateTodo from "./CreateTodo";
const initialTasks = {
  "To Do": [
    { id: "task1", content: "Create project plan" },
    { id: "task2", content: "Design UI mockups" },
  ],
  "In Progress": [{ id: "task3", content: "Implement login functionality" }],
  Completed: [{ id: "task4", content: "Set up project repository" }],
};

const SortableItem = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card>
        <CardContent className="p-2">{content}</CardContent>
      </Card>
    </li>
  );
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeContainer = Object.keys(tasks).find((key) =>
      tasks[key].find((task) => task.id === active.id)
    );
    const overContainer = Object.keys(tasks).find((key) =>
      tasks[key].find((task) => task.id === over.id)
    );

    if (activeContainer !== overContainer) {
      setTasks((prev) => {
        const activeItems = prev[activeContainer];
        const overItems = prev[overContainer];
        const activeIndex = activeItems.findIndex(
          (item) => item.id === active.id
        );
        const overIndex = overItems.findIndex((item) => item.id === over.id);

        return {
          ...prev,
          [activeContainer]: [
            ...prev[activeContainer].filter((item) => item.id !== active.id),
          ],
          [overContainer]: [
            ...prev[overContainer].slice(0, overIndex),
            activeItems[activeIndex],
            ...prev[overContainer].slice(overIndex),
          ],
        };
      });
    } else {
      setTasks((prev) => {
        const activeIndex = prev[activeContainer].findIndex(
          (item) => item.id === active.id
        );
        const overIndex = prev[overContainer].findIndex(
          (item) => item.id === over.id
        );
        return {
          ...prev,
          [overContainer]: arrayMove(
            prev[overContainer],
            activeIndex,
            overIndex
          ),
        };
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4">
        {Object.entries(tasks).map(([columnId, columnTasks]) => (
          <div key={columnId} className="flex-1">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">{columnId}</h2>
              </CardHeader>
              <CardContent>
                <SortableContext
                  items={columnTasks.map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="space-y-2">
                    {columnTasks.map((task) => (
                      <SortableItem
                        key={task.id}
                        id={task.id}
                        content={task.content}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
