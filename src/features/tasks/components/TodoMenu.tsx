import { Task } from '../task.interface'

interface Props {
  task: Task
}

export function TodoMenu({ task }: Props) {
  return (
    <div className="absolute right-2 top-12 bg-white shadow border rounded p-2 z-10">
      <p className="text-sm">Actions pour : {task.title}</p>
      {/* Tu vas ajouter les vrais boutons ici plus tard */}
    </div>
  )
}
