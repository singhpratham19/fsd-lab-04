import express from 'express'
import mysql from 'mysql2/promise'

const app = express()
app.use(express.json())

// Connection to the MySQL database
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'task_manager',
})

// Read all tasks
app.get('/api/tasks', async (req, res) => {
  const [rows] = await db.query('SELECT id, text, done FROM tasks ORDER BY id')
  res.json(rows.map((task) => ({ ...task, done: Boolean(task.done) })))
})

// Add a task
app.post('/api/tasks', async (req, res) => {
  const text = (req.body.text || '').trim()

  if (text === '') {
    return res.status(400).json({ error: 'Task text is required.' })
  }

  const [result] = await db.query('INSERT INTO tasks (text) VALUES (?)', [text])
  res.status(201).json({ id: result.insertId, text: text, done: false })
})

// Mark a task as done or not done
app.put('/api/tasks/:id', async (req, res) => {
  await db.query('UPDATE tasks SET done = ? WHERE id = ?', [
    Boolean(req.body.done),
    req.params.id,
  ])
  res.json({ message: 'Task updated.' })
})

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  await db.query('DELETE FROM tasks WHERE id = ?', [req.params.id])
  res.json({ message: 'Task deleted.' })
})

// Runs when a database query fails
app.use((error, req, res, next) => {
  console.error(error.message)
  res.status(500).json({ error: 'Database error.' })
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
