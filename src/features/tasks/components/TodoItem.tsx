import { Task } from "../task.interface";
import { TodoMenu } from "./TodoMenu";
import { useMenuStore } from "../task.store";
import { MoreVertical } from "lucide-react"; // ou ton icône préférée

interface Props {
  task: Task;
}

export function TodoItem({ task }: Props) {
  const toggleMenu = useMenuStore((state) => state.toggleMenu);
  const isOpen = useMenuStore((state) => state.openedMenuId === task._id);

  return (
    <div className="flex">
      <div>
        <h3
          className={`font-medium ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>
      </div>

      <button onClick={() => toggleMenu(task._id)}>
        <MoreVertical size={20} />
      </button>

      {isOpen && <TodoMenu task={task} />}
    </div>
  );
}
