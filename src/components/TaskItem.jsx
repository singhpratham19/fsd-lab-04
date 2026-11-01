function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <label className={task.done ? 'done' : ''}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.text}</span>
      </label>
      <button
        type="button"
        aria-label={`Delete ${task.text}`}
        onClick={() => onDelete(task)}
      >
        Delete
      </button>
    </li>
  )
}

export default TaskItem
