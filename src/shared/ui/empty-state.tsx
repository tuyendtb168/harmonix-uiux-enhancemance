import { type LucideIcon } from 'lucide-react'
import { TrendingUp, Wallet, Bell, Star, Search } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/shared/lib/utils'

type EmptyStateContext =
  | 'positions'
  | 'vaults'
  | 'notifications'
  | 'rewards'
  | 'activity'
  | 'watchlist'
  | 'search'
  | 'pending-withdrawals'
  | 'campaigns'
  | 'achievements'
  | 'analytics'
  | 'generic'

const EMPTY_STATE_CONFIG: Record<
  EmptyStateContext,
  { icon: LucideIcon; title: string; description: string; cta?: string }
> = {
  positions: {
    icon: Wallet,
    title: 'No active positions',
    description: 'Ready to start earning? Choose a vault and make your first deposit.',
    cta: 'Browse Vaults',
  },
  vaults: {
    icon: TrendingUp,
    title: 'No vaults found',
    description: 'Try adjusting your filters or search term.',
    cta: 'Clear Filters',
  },
  notifications: {
    icon: Bell,
    title: "You're all caught up",
    description: "No new notifications. We'll let you know when something happens.",
  },
  rewards: {
    icon: Star,
    title: 'No rewards yet',
    description: 'Deposit into a vault to start earning points and rewards.',
    cta: 'Browse Vaults',
  },
  activity: {
    icon: TrendingUp,
    title: 'No activity yet',
    description: 'Your transaction history will appear here after your first deposit.',
  },
  watchlist: {
    icon: Star,
    title: 'Your watchlist is empty',
    description: 'Tap the ★ on any vault to save it here for quick access.',
    cta: 'Browse Vaults',
  },
  search: {
    icon: Search,
    title: 'No results found',
    description: 'Try a different search term or browse all vaults.',
    cta: 'Clear Search',
  },
  'pending-withdrawals': {
    icon: Wallet,
    title: 'No pending withdrawals',
    description: 'Your withdrawal requests will appear here when processing.',
  },
  campaigns: {
    icon: Star,
    title: 'No active campaigns',
    description: 'Check back soon for new earning opportunities.',
  },
  achievements: {
    icon: Star,
    title: 'No achievements yet',
    description: 'Complete actions in Harmonix to unlock achievements.',
  },
  analytics: {
    icon: TrendingUp,
    title: 'No data yet',
    description: 'Your performance analytics will appear after your first week of earning.',
    cta: 'Browse Vaults',
  },
  generic: {
    icon: TrendingUp,
    title: 'Nothing here yet',
    description: 'Content will appear here once available.',
  },
}

interface EmptyStateProps {
  context?: EmptyStateContext
  title?: string
  description?: string
  cta?: string
  onAction?: () => void
  className?: string
}

function EmptyState({
  context = 'generic',
  title,
  description,
  cta,
  onAction,
  className,
}: EmptyStateProps) {
  const config = EMPTY_STATE_CONFIG[context]
  const Icon = config.icon
  const displayTitle = title ?? config.title
  const displayDescription = description ?? config.description
  const displayCta = cta ?? config.cta

  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-4 py-16 text-center', className)}
      role="status"
      aria-label={displayTitle}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" aria-hidden />
      </div>
      <div className="space-y-1 max-w-xs">
        <h3 className="text-sm font-semibold text-foreground">{displayTitle}</h3>
        <p className="text-sm text-muted-foreground">{displayDescription}</p>
      </div>
      {displayCta && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {displayCta}
        </Button>
      )}
    </div>
  )
}

export { EmptyState }
export type { EmptyStateContext }
