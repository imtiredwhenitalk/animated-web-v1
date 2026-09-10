import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean; message: string }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'Невідома помилка застосунку' }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application render error:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main style={{ minHeight: '100vh', padding: 40, color: '#fff', background: '#080a14', fontFamily: 'system-ui' }}>
        <h1>Сайт не зміг завантажитися</h1>
        <p style={{ color: '#aeb9dd' }}>{this.state.message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{ padding: '10px 18px', borderRadius: 8, cursor: 'pointer' }}
        >
          Перезавантажити
        </button>
      </main>
    )
  }
}
