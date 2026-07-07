import { useState } from 'react'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Skeleton, Badge, Tooltip, TooltipProvider } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { PartnerPoints } from '../types/rewards.types'
import { PartnerHistoryModal } from './PartnerHistoryModal'

const PARTNER_COLORS: Record<string, string> = {
  valantis:  'bg-emerald-600',
  kinetiq:   'bg-teal-500',
  hyperlend: 'bg-emerald-300',
  pendle:    'bg-green-500',
  aave:      'bg-teal-300',
  others:    'bg-green-200',
}

function PartnerAvatar({ id, name }: { id: string; name: string }) {
  const color = PARTNER_COLORS[id] ?? 'bg-muted'
  return (
    <div className={cn('flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold shrink-0', color)}>
      {name.charAt(0)}
    </div>
  )
}

function TokenBadges({ tokens }: { tokens: string[] }) {
  const visible = tokens.slice(0, 4)
  const extra = tokens.length - 4
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {visible.map((t) => (
        <span key={t} className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {t}
        </span>
      ))}
      {extra > 0 && (
        <span className="text-[10px] text-muted-foreground">+{extra}</span>
      )}
    </div>
  )
}

type FilterStatus = 'active' | 'inactive'

interface PartnerPointsSectionProps {
  partners: PartnerPoints[]
  isLoading: boolean
}

export function PartnerPointsSection({ partners, isLoading }: PartnerPointsSectionProps) {
  const [filter, setFilter] = useState<FilterStatus>('active')
  const [selectedPartner, setSelectedPartner] = useState<PartnerPoints | null>(null)

  const visible = partners.filter((p) => p.status === filter)

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Filter tabs */}
      <div className="flex items-center gap-2" role="group" aria-label="Filter partners by status">
        {(['active', 'inactive'] as FilterStatus[]).map((s) => {
          const count = partners.filter((p) => p.status === s).length
          const isSelected = filter === s
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                isSelected
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80'
              )}
              aria-pressed={isSelected}
            >
              <span className={cn(
                'h-1.5 w-1.5 rounded-full',
                s === 'active' ? 'bg-success' : 'bg-muted-foreground'
              )} aria-hidden />
              {s === 'active' ? 'Active' : 'Inactive'}
              <span className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                isSelected ? 'bg-background/20 text-background' : 'bg-muted text-muted-foreground'
              )}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Cards */}
      {visible.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No {filter} partners.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((partner) => (
            <button
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className={cn(
                'flex flex-col rounded-xl border border-border/60 bg-card p-4 gap-3 text-left',
                'transition-colors hover:border-border hover:bg-card/80 cursor-pointer',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                partner.status === 'inactive' && 'opacity-60'
              )}
              aria-label={`View campaign history for ${partner.name}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <PartnerAvatar id={partner.id} name={partner.name} />
                  <p className="text-sm font-semibold text-foreground truncate">{partner.name}</p>
                </div>
                <Badge
                  variant={partner.status === 'active' ? 'low' : 'default'}
                  className="shrink-0 text-[10px] py-0.5"
                >
                  {partner.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              {/* Points */}
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {partner.points.toLocaleString()}
                <span className="text-sm font-semibold text-muted-foreground ml-1">pts</span>
              </p>

              {/* Monthly change */}
              {partner.weeklyChangePercent > 0 ? (
                <div className="flex items-center gap-1 text-xs font-semibold text-success">
                  <ArrowUpRight className="h-3 w-3" aria-hidden />
                  {partner.weeklyChangePercent.toFixed(2)}% this month
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No change this month</p>
              )}

              {/* From vaults — with tooltip */}
              <TooltipProvider>
                <Tooltip
                  content={
                    <ul className="space-y-1">
                      {partner.fromVaultNames.map((v) => (
                        <li key={v} className="text-xs">• {v}</li>
                      ))}
                    </ul>
                  }
                  side="top"
                >
                  <p className="w-fit cursor-default border-b border-dashed border-muted-foreground/50 text-xs text-muted-foreground">
                    From {partner.fromVaultsCount} vault{partner.fromVaultsCount !== 1 ? 's' : ''}
                  </p>
                </Tooltip>
              </TooltipProvider>

              {/* Token badges */}
              <TokenBadges tokens={partner.vaultTokens} />

              {/* Last updated — bottom of card */}
              <div className="mt-auto pt-2 border-t border-border/50 flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3 shrink-0" aria-hidden />
                <span>Points updated: <span className="font-medium">{partner.lastUpdatedAt}</span></span>
              </div>
            </button>
          ))}
        </div>
      )}

      <PartnerHistoryModal
        partner={selectedPartner}
        open={selectedPartner !== null}
        onClose={() => setSelectedPartner(null)}
      />
    </div>
  )
}
