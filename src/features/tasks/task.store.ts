import { create } from "zustand";

type TaskFilter = "all" | "completed" | "pending"

interface TaskStore {
  filter: TaskFilter
  setFilter: (filter: TaskFilter) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  filter: "all",
  setFilter: (filter) => set({filter})
}))