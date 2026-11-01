import { useState } from 'react'

function About() {
  const [crash, setCrash] = useState(false)

  // This error is caught by the ErrorBoundary component
  if (crash) {
    throw new Error('Test error')
  }

  return (
    <>
      <h1>About</h1>
      <p>
        Task Manager helps you keep track of your work. Add a task, tick it when
        it is done and delete it when you no longer need it.
      </p>
      <p>
        It is built with React and React Router, and tasks are saved in a MySQL
        database.
      </p>
      <button type="button" onClick={() => setCrash(true)}>
        Test error handling
      </button>
    </>
  )
}

export default About
