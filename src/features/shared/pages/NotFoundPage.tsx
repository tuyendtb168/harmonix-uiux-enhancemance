import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/shared/ui'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <p className="text-7xl font-bold tabular-nums text-muted-foreground/30 select-none" aria-hidden>
        404
      </p>
      <h1 className="mt-4 text-xl font-semibold text-foreground">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Button variant="secondary" onClick={() => window.history.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Go back
        </Button>
        <Button asChild className="gap-2">
          <Link to="/">
            <Home className="h-4 w-4" aria-hidden />
            Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
