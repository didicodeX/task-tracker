import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../task.service'
import { NewTaskSchema } from '../task.interface'
import { toast } from 'react-hot-toast'


export default function AddTodoPage() {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tâche ajoutée avec succès ✅')
      navigate('/')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = NewTaskSchema.safeParse({ title })
    if (!parsed.success) {
      setError(parsed.error.errors[0].message)
      return
    }

    mutation.mutate({ title })
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Ajouter une nouvelle tâche</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la tâche"
          className="w-full border px-3 py-2 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </form>
    </div>
  )
}
