import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, fetchTasks, updateTask } from "./task.service";
import { Task } from "./task.interface";
import { useTaskStore } from "./task.store";

export function TaskList() {
  const queryClient = useQueryClient();

  const {filter} = useTaskStore();


  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const filteredTasks = tasks?.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true // 'all'
  })


  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.filter((task) => task._id !== id)
      );

      return { previousTasks };
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      updateTask(id, { completed }),

    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((task: Task) =>
          task._id === id ? { ...task, completed } : task
        )
      );
      return { previousTasks };
    },
  });

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur de chargement</p>;

  return (
    <ul className="flex flex-col gap-2">
      {filteredTasks?.map((task) => (
        <li key={task._id} className="flex items-center gap-2">
          <input
          id={task._id}
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              updateMutation.mutate({
                id: task._id, 
                completed: !task.completed,
              })
            }
          />
          <label htmlFor={task._id} className="cursor-pointer">{task.title}</label>
          <button
            onClick={() => deleteMutation.mutate(task._id)}
            className="bg-red-200 text-red-900 px-3 py-1.5 font-semibold rounded"
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
