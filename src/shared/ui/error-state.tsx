import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/shared/lib/utils'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
  variant?: 'inline' | 'page'
}

function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this content. Please try again.',
  onRetry,
  className,
  variant = 'inline',
}: ErrorStateProps) {
  if (variant === 'page') {
    return (
      <div
        className={cn('flex min-h-[400px] flex-col items-center justify-center gap-4 text-center p-8', className)}
        role="alert"
        aria-live="polite"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-7 w-7 text-destructive" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
        </div>
        {onRetry && (
          <Button variant="secondary" size="sm" onClick={onRetry}>
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn('flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3', className)}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
      <p className="text-sm text-destructive flex-1">{message}</p>
      {onRetry && (
        <Button variant="ghost" size="sm" onClick={onRetry} className="h-7 px-2 text-destructive hover:text-destructive">
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </Button>
      )}
    </div>
  )
}

function OfflineState({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3', className)}
      role="status"
    >
      <WifiOff className="h-4 w-4 shrink-0 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">No internet connection. Showing last known data.</p>
    </div>
  )
}

export { ErrorState, OfflineState }
