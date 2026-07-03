import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TimerWidget from "./components/TimerWidget";
import Analytics from "./components/Analytics";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('all');
  const filteredTasks = filter === 'all' ? tasks : tasks.filter((t) => t.priority === filter);

  const addTask = (taskText, priority) => {
    setTasks([
      { id: Date.now(), text: taskText, completed: false, priority, createdAt: Date.now(), completedAt: null },
      ...tasks,
    ]);
  };
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed, completedAt: !t.completed ? Date.now() : null } : t)));
  const editTask = (id, newText) => setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <Header tasks={tasks} />
      <div className="bg-[var(--bg)] min-h-screen">
       <div className="flex flex-col lg:flex-row lg:items-start max-w-6xl mx-auto">
          <div className="w-full lg:w-1/2 border-r border-[var(--line)]">
            <TaskForm onAddTask={addTask} />
            <TaskList
              tasks={filteredTasks}
              onDeleteTask={deleteTask}
              onToggleTask={toggleTask}
              onEditTask={editTask}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 flex flex-col gap-4">
            <TimerWidget />
            <div className="flex-1">
              <Analytics tasks={tasks} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;