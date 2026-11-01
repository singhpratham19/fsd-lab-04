import { useEffect, useState } from 'react'
import ConfirmModal from '../components/ConfirmModal'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

function Home() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')
  const [taskToDelete, setTaskToDelete] = useState(null)

  // Load the tasks from the database when the page opens
  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => {
        if (!response.ok) throw new Error('Request failed')
        return response.json()
      })
      .then((data) => setTasks(data))
      .catch(() => setError('Could not load tasks. Is the server running?'))
  }, [])

  async function addTask(text) {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text }),
    })
    const newTask = await response.json()
    setTasks([...tasks, newTask])
  }

  async function toggleTask(id) {
    const task = tasks.find((task) => task.id === id)

    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !task.done }),
    })

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  async function confirmDelete() {
    await fetch(`/api/tasks/${taskToDelete.id}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) => task.id !== taskToDelete.id))
    setTaskToDelete(null)
  }

  const remaining = tasks.filter((task) => !task.done).length

  return (
    <>
      <h1>Task Manager</h1>
      <p className="count">
        {remaining} of {tasks.length} tasks left
      </p>

      <TaskForm onAdd={addTask} />
      {error && <p className="error">{error}</p>}
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={setTaskToDelete} />

      {taskToDelete && (
        <ConfirmModal
          text={taskToDelete.text}
          onConfirm={confirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </>
  )
}

export default Home
