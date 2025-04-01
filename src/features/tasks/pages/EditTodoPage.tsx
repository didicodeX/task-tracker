import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchTasks, updateTask } from '../task.service'
import { Task } from '../task.interface'
import { useModalStore } from '../../../shared/stores/modal.store'
import { toast } from 'react-hot-toast'

export default function EditTodoPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const openModal = useModalStore((s) => s.openModal)
  const closeModal = useModalStore((s) => s.closeModal)

  const { data: tasks } = useQuery<Task[]>({ queryKey: ['tasks'], queryFn: fetchTasks })

  const todo = tasks?.find((t) => t._id === id)

  const [title, setTitle] = useState(todo?.title || '')

  const mutation = useMutation({
    mutationFn: (newTitle: string) => updateTask(id!, { title: newTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      closeModal()
      toast.success('Tâche modifiée ✏️')
      navigate('/')
    },
  })

  if (!todo) return <p className="text-center">Tâche introuvable...</p>

  const handleSubmit = () => {
    openModal({
      title: 'Confirmer les modifications',
      content: (
        <div>
          <p>Tu veux vraiment modifier cette tâche ?</p>
          <button
            onClick={() => mutation.mutate(title)}
            className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Confirmer
          </button>
        </div>
      ),
    })
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Modifier la tâche</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="Titre de la tâche"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-3 py-2 rounded"
      >
        Valider les modifications
      </button>
    </div>
  )
}
