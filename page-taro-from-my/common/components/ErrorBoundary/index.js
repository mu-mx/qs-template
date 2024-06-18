import { PureComponent } from 'react'

export default class ErrorBoundary extends PureComponent {
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
    }
  }

  componentDidCatch(error, errorInfo) {
    const { onDidCatch } = this.props
    if (onDidCatch) return onDidCatch(error, errorInfo)
  }

  render() {
    const { hasError, error } = this.state
    const { render, children, renderError } = this.props

    if (hasError) {
      return renderError ? renderError({ error }) : null
    }

    return render ? render() : children || null
  }
}
