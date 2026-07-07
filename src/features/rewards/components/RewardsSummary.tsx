import { ArrowUpRight } from 'lucide-react'
import { Skeleton } from '@/shared/ui'
import type { RewardsSummary as RewardsSummaryType } from '../types/rewards.types'

interface RewardsSummaryProps {
  summary?: RewardsSummaryType
  isLoading: boolean
}

export function RewardsSummary({ summary, isLoading }: RewardsSummaryProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-border/60 bg-card p-5 space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-border/60 bg-card p-5">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Points</p>
        <p className="mt-2 text-2xl font-bold text-foreground tabular-nums">
          {(summary?.totalPoints ?? 0).toLocaleString()}
          <span className="text-sm font-semibold text-muted-foreground ml-1">pts</span>
        </p>
      </div>
      <div className="rounded-xl border border-border/60 bg-card p-5">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Points Value (est.)</p>
        <p className="mt-2 text-2xl font-bold text-foreground tabular-nums">
          ~ ${(summary?.pointsValueUsd ?? 0).toFixed(2)}
        </p>
      </div>
      <div className="rounded-xl border border-border/60 bg-card p-5">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Claimable Now</p>
        <p className="mt-2 text-2xl font-bold text-foreground tabular-nums">
          {(summary?.claimablePts ?? 0).toLocaleString()}
          <span className="text-sm font-semibold text-muted-foreground ml-1">pts</span>
        </p>
        {(summary?.harmonixPoints24h ?? 0) > 0 && (
          <div className="mt-1 flex items-center gap-1 text-xs text-success font-semibold">
            <ArrowUpRight className="h-3 w-3" aria-hidden />
            +{(summary?.harmonixPoints24h ?? 0).toLocaleString()} (24h)
          </div>
        )}
      </div>
    </div>
  )
}
