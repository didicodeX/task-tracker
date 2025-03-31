import { AddTask } from "./features/tasks/AddTask";
import { TaskFilter } from "./features/tasks/TaskFilter";
import { TaskList } from "./features/tasks/TaskList";
import "./styles/index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">📋 Mes tâches</h1>{" "}
        <TaskFilter />
        <AddTask />
        <TaskList />
      </main>
    </QueryClientProvider>
  );
}

export default App;
