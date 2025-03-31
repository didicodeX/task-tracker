import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "./task.service";
import { NewTaskSchema } from "./task.interface";

export function AddTask() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setError("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parseResult = NewTaskSchema.safeParse({ title });

    if (!parseResult.success) {
      setError(parseResult.error.errors[0].message); //rafraichir la liste
      return;
    }

    mutation.mutate({ title });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Nouvelle tache"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Ajouter
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
