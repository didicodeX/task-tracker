import { useTaskStore } from "./task.store";

export function TaskFilter() {
  const {filter, setFilter} = useTaskStore();

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setFilter('all')}
        className={filter === 'all' ? 'font-bold underline' : ''}
      >
        Toutes
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={filter === 'completed' ? 'font-bold underline' : ''}
      >
        Complétées
      </button>
      <button
        onClick={() => setFilter('pending')}
        className={filter === 'pending' ? 'font-bold underline' : ''}
      >
        En attente
      </button>
    </div>
  )
}