import { Component, type ReactNode, type ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/shared/ui'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  featureName?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production, send to error reporting service (Sentry, etc.)
    console.error(`[ErrorBoundary:${this.props.featureName ?? 'unknown'}]`, error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              {this.props.featureName
                ? `${this.props.featureName} failed to load`
                : 'Something went wrong'}
            </p>
            <p className="text-xs text-muted-foreground max-w-[280px] mx-auto">
              An unexpected error occurred. Try refreshing — your funds are safe.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={this.handleReset}
            className="gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            Try again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
