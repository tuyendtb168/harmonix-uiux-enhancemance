import { Gift } from 'lucide-react'
import { Button, Skeleton } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { RewardsSummary } from '../types/rewards.types'

const PARTNER_COLORS = [
  'bg-emerald-600',
  'bg-teal-500',
  'bg-green-400',
  'bg-emerald-400',
  'bg-teal-300',
  'bg-green-300',
]

function PartnerAvatars({ tokens }: { tokens: string[] }) {
  const visible = tokens.slice(0, 4)
  const extra = tokens.length - 4
  return (
    <div className="flex items-center mt-3">
      {visible.map((t, i) => (
        <div
          key={t}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-white text-[10px] font-bold',
            PARTNER_COLORS[i] ?? 'bg-muted'
          )}
          style={{ marginLeft: i === 0 ? 0 : '-8px', zIndex: visible.length - i }}
          title={t}
        >
          {t.charAt(0)}
        </div>
      ))}
      {extra > 0 && (
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-semibold text-muted-foreground"
          style={{ marginLeft: '-8px' }}
        >
          +{extra}
        </div>
      )}
    </div>
  )
}

interface RewardsSummaryCardsProps {
  summary?: RewardsSummary
  isLoading: boolean
  onClaimAll: () => void
  isClaiming: boolean
}

export function RewardsSummaryCards({ summary, isLoading, onClaimAll, isClaiming }: RewardsSummaryCardsProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="space-y-3 sm:flex-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-3 w-28" />
            <div className="flex items-center gap-3 pt-1">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>
          <div className="h-px sm:h-16 sm:w-px bg-border/60 shrink-0" />
          <div className="space-y-2 sm:flex-1">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="h-px sm:h-16 sm:w-px bg-border/60 shrink-0" />
          <div className="space-y-2 sm:flex-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card">
      <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch">

        {/* Left: Total Points */}
        <div className="flex-1 p-6 sm:pr-8">
          <p className="text-sm font-medium text-muted-foreground">Total Points</p>
          <p className="mt-1 text-5xl font-black text-foreground tabular-nums leading-none">
            {(summary?.totalPoints ?? 0).toLocaleString()}
            <span className="ml-2 text-2xl font-semibold text-muted-foreground">pts</span>
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Available to claim</p>
              <p className="text-lg font-bold text-success tabular-nums">
                {(summary?.claimablePts ?? 0).toLocaleString()} pts
              </p>
            </div>
            <Button
              onClick={onClaimAll}
              loading={isClaiming}
              disabled={(summary?.claimablePts ?? 0) === 0}
              className="shrink-0"
            >
              <Gift className="h-3.5 w-3.5 mr-1.5" aria-hidden />
              Claim all
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-border/60 sm:mx-0 sm:my-6 sm:h-auto sm:w-px" />

        {/* Middle: Harmonix Points */}
        <div className="flex-1 p-6">
          <p className="text-sm font-medium text-muted-foreground">Harmonix Points</p>
          <p className="mt-1 text-4xl font-black text-foreground tabular-nums leading-none">
            {(summary?.harmonixPoints ?? 0).toLocaleString()}
          </p>
          <p className="mt-1.5 text-sm font-semibold text-success tabular-nums">
            +{(summary?.harmonixPoints24h ?? 0).toLocaleString()} (24h)
          </p>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-border/60 sm:mx-0 sm:my-6 sm:h-auto sm:w-px" />

        {/* Right: Partner Points */}
        <div className="flex-1 p-6">
          <p className="text-sm font-medium text-muted-foreground">Points from Partners</p>
          <p className="mt-1 text-4xl font-black text-foreground tabular-nums leading-none">
            {(summary?.partnerPointsTotal ?? 0).toLocaleString()}
          </p>
          <p className="mt-1.5 text-sm font-semibold text-success tabular-nums">
            +{(summary?.partnerPoints24h ?? 0).toLocaleString()} (24h)
          </p>
          <PartnerAvatars tokens={summary?.partnerTokens ?? []} />
        </div>

        {/* Gift illustration — decorative */}
        <div
          className="hidden xl:flex items-center justify-center px-8 shrink-0 select-none pointer-events-none"
          aria-hidden
        >
          <div className="relative">
            <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center shadow-inner">
              <Gift className="h-14 w-14 text-emerald-600 dark:text-emerald-400" strokeWidth={1.2} />
            </div>
            <div className="absolute -bottom-2 -right-3 h-10 w-10 rounded-full bg-gradient-to-br from-emerald-200 to-teal-200 dark:from-emerald-800/40 dark:to-teal-800/40 flex items-center justify-center shadow">
              <span className="text-emerald-700 dark:text-emerald-300 font-bold text-xs">pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
