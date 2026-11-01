import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link to="/">Go to tasks</Link>
    </>
  )
}

export default NotFound
