import { Component } from 'react'

// Shows a message instead of a blank page when a child component fails
class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong</h1>
          <p>This page could not be shown.</p>
          <button type="button" onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
