import { useState } from "react";

function TaskForm({ editingTask, saving, onSubmit, onCancel }) {
  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || saving) return;

    try {
      await onSubmit({ title, description });
      if (!editingTask) {
        setTitle("");
        setDescription("");
      }
    } catch {
      // Error is shown in App
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={saving}
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={saving}
        rows={3}
      />
      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
