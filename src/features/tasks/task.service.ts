import axios from "axios";
import { TaskListSchema, Task, NewTask, TaskSchema } from "./task.interface";

const API_URL = "http://localhost:3500/tasks/";

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_URL);
  return TaskListSchema.parse(res.data);
};

export const addTask = async (newTask: NewTask) => {
  const res = await axios.post(API_URL, newTask);
  return TaskSchema.parse(res.data);
};

export const updateTask = async(id: string, updates: Partial<Task>) => {
  const res = await axios.patch(`${API_URL}/${id}`,updates)
  return TaskListSchema.parse(res.data)
}

export const deleteTask = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return TaskSchema.parse(res.data);
  // return res.data // tu peux aussi valider avec Zod si tu veux
};
