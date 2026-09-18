import { useCallback, useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    try {
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(
        err.message ||
          "Could not load tasks. Start the backend with: cd backend && npm start"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleSubmit = async (taskData) => {
    try {
      setSaving(true);
      setError("");

      if (editingTask) {
        const updated = await updateTask(editingTask._id, taskData);
        setTasks((prev) =>
          prev.map((task) => (task._id === updated._id ? updated : task))
        );
        setEditingTask(null);
      } else {
        const newTask = await createTask(taskData);
        setTasks((prev) => [newTask, ...prev]);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (task) => {
    try {
      setError("");
      const updated = await updateTask(task._id, {
        completed: !task.completed,
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );
    } catch (err) {
      setError(err.message || "Failed to update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      if (editingTask?._id === id) setEditingTask(null);
    } catch (err) {
      setError(err.message || "Failed to delete task.");
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <header className="header">
        <div className="header-badge">MERN Task Manager</div>
        <h1>Manage Your Tasks</h1>
        <p>Add, edit, complete, and delete tasks easily.</p>
      </header>

      <div className="stats">
        <div className="stat-card">
          <span>Total</span>
          <strong>{tasks.length}</strong>
        </div>
        <div className="stat-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>
        <div className="stat-card">
          <span>Pending</span>
          <strong>{tasks.length - completedCount}</strong>
        </div>
      </div>

      {error && (
        <div className="error">
          <p>{error}</p>
          <button type="button" onClick={loadTasks}>
            Retry
          </button>
        </div>
      )}

      <TaskForm
        key={editingTask?._id || "new"}
        editingTask={editingTask}
        saving={saving}
        onSubmit={handleSubmit}
        onCancel={() => setEditingTask(null)}
      />

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      )}
    </div>
  );
}

export default App;
