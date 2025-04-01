import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Task } from '../task.interface'
import { useMenuStore } from '../task.store'
import { useModalStore } from '../../../shared/stores/modal.store'
import { updateTask } from '../task.service'

interface Props {
  task: Task
}

export function TodoMenu({ task }: Props) {
  const navigate = useNavigate()
  const closeMenu = useMenuStore((s) => s.closeMenu)
  const openModal = useModalStore((s) => s.openModal)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => updateTask(task._id, { completed: !task.completed }),
    onSuccess: () => {
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old?.map((t) => (t._id === task._id ? { ...t, completed: !t.completed } : t))
      )
    },
    onSettled: closeMenu,
  })

  const handleValidate = () => {
    mutation.mutate()
  }

  const handleEdit = () => {
    navigate(`/edit/${task._id}`)
    closeMenu()
  }

  const handleDelete = () => {
    openModal({
      title: "Confirmation",
      content: (
        <div>
          <p>Supprimer la tâche « {task.title} » ?</p>
          <button className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
            Supprimer
          </button>
        </div>
      ),
    })
    closeMenu()
  }

  return (
    <div className="absolute right-2 top-12 bg-white shadow border rounded p-2 z-10 w-40">
      <button onClick={handleValidate} className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-sm">
        {task.completed ? 'Marquer comme en attente' : 'Marquer comme complétée'}
      </button>
      <button onClick={handleEdit} className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-sm">
        Éditer
      </button>
      <button onClick={handleDelete} className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-sm text-red-500">
        Supprimer
      </button>
    </div>
  )
}
