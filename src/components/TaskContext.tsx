"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

export type Task = {
  _id: string;
  id: string;
  title: string;
  description: string;
  status: string;
};

type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{
  children: ReactNode;
  initialTasks: Task[];
}> = ({ children, initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
