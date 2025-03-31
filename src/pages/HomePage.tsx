import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '../features/tasks/task.service'
import { Task } from '../features/tasks/task.interface'
import { TodoItem } from '../features/tasks/components/TodoItem'

export default function HomePage() {
  const { data: tasks, isLoading, error } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })

  if (isLoading) return <p>Chargement...</p>
  if (error) return <p>Erreur de chargement des tâches</p>

  return (
    <div className="space-y-4">
      {tasks?.length === 0 ? (
        <p className="text-gray-500">Aucune tâche pour l'instant.</p>
      ) : (
        tasks?.map((task) => <TodoItem key={task._id} task={task} />)
      )}
    </div>
  )
}
