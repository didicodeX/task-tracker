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


interface MenuStore {
  openedMenuId: string | null
  toggleMenu: (id: string) => void
  closeMenu: () => void
}

export const useMenuStore = create<MenuStore>((set) => ({
  openedMenuId: null,
  toggleMenu: (id) =>
    set((state) => ({
      openedMenuId: state.openedMenuId === id ? null : id,
    })),
  closeMenu: () => set({ openedMenuId: null }),
}))
