import { Task } from "../models/Task";

const STORAGE_KEY = "tasks";

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const loadTasks = (): Task[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    const tasks: Task[] = JSON.parse(data);
    return tasks.map((task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }));
  } catch {
    return [];
  }
};