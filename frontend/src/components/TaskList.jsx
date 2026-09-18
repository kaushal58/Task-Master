function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-card">
        <h3>No tasks yet</h3>
        <p>Add your first task using the form above.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          <div className="task-content">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task)}
              />
              <span className="task-title">{task.title}</span>
            </label>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
          </div>
          <div className="task-actions">
            <button type="button" className="btn-edit" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button
              type="button"
              className="btn-delete"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
