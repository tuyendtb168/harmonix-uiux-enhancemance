import { Clock, Lock, ArrowRight } from 'lucide-react'
import { Skeleton } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { PendingLocked } from '../types/rewards.types'

interface PendingLockedSectionProps {
  data?: PendingLocked
  isLoading: boolean
  onClaimAll: () => void
}

export function PendingLockedSection({ data, isLoading, onClaimAll }: PendingLockedSectionProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-border/60 bg-card p-4 space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-3 w-36" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {/* Pending */}
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-4">
        <div>
          <p className="text-xs text-muted-foreground font-medium">Pending points</p>
          <p className="mt-1 text-2xl font-bold text-foreground tabular-nums">
            {(data?.pendingPoints ?? 0).toLocaleString()}
            <span className="text-sm font-semibold text-muted-foreground ml-1">pts</span>
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{data?.pendingLabel}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50">
          <Clock className="h-4.5 w-4.5 text-muted-foreground" aria-hidden />
        </div>
      </div>

      {/* Locked */}
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-4">
        <div>
          <p className="text-xs text-muted-foreground font-medium">Locked points</p>
          <p className="mt-1 text-2xl font-bold text-foreground tabular-nums">
            {(data?.lockedPoints ?? 0).toLocaleString()}
            <span className="text-sm font-semibold text-muted-foreground ml-1">pts</span>
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{data?.lockedLabel}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50">
          <Lock className="h-4.5 w-4.5 text-muted-foreground" aria-hidden />
        </div>
      </div>

      {/* Total claimable */}
      <button
        className={cn(
          'flex items-center justify-between rounded-xl border border-border/60 bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-card/80 group'
        )}
        onClick={onClaimAll}
        aria-label="Claim all available points"
      >
        <div>
          <p className="text-xs text-muted-foreground font-medium">Total claimable</p>
          <p className="mt-1 text-2xl font-bold text-foreground tabular-nums">
            {(data?.totalClaimable ?? 0).toLocaleString()}
            <span className="text-sm font-semibold text-muted-foreground ml-1">pts</span>
          </p>
          <p className="mt-0.5 text-xs text-destructive">~ ${(data?.claimableUsd ?? 0).toFixed(2)}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 group-hover:border-primary/40 transition-colors">
          <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
        </div>
      </button>
    </div>
  )
}
