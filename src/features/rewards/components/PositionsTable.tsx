import { useState } from 'react'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Button, Skeleton, Badge } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { PointsPosition } from '../types/rewards.types'

const ASSET_COLORS: Record<string, string> = {
  USDC:   'bg-blue-500',
  USDT:   'bg-emerald-500',
  HYPE:   'bg-violet-500',
  haHYPE: 'bg-violet-400',
}

function AssetDot({ asset }: { asset: string }) {
  const color = ASSET_COLORS[asset] ?? 'bg-muted-foreground'
  return <span className={cn('inline-block h-2.5 w-2.5 rounded-full shrink-0', color)} aria-hidden />
}

type StatusFilter = 'active' | 'inactive'

interface PositionsTableProps {
  positions: PointsPosition[]
  isLoading: boolean
  onViewHistory: () => void
}

export function PositionsTable({ positions, isLoading, onViewHistory }: PositionsTableProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active')

  const activeCount   = positions.filter((p) => p.positionStatus === 'active').length
  const inactiveCount = positions.filter((p) => p.positionStatus === 'inactive').length
  const visible       = positions.filter((p) => p.positionStatus === statusFilter)

  if (isLoading) {
    return (
      <div className="space-y-3" aria-busy="true">
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-border/50">
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <Skeleton className="h-4 flex-1 max-w-[140px]" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-7 w-14 rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Status filter */}
      <div className="flex items-center gap-2" role="group" aria-label="Filter positions by status">
        {(['active', 'inactive'] as StatusFilter[]).map((s) => {
          const count = s === 'active' ? activeCount : inactiveCount
          const isSelected = statusFilter === s
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                isSelected
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
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

      {/* Table */}
      <div className="w-full overflow-x-auto">
        {visible.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No {statusFilter} positions.
          </p>
        ) : (
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-border">
                {['Product', 'Type', 'Assets', 'Your Balance', 'Points (All time)', 'Vault Share', 'Status', 'Last Updated', 'Action'].map((h) => (
                  <th
                    key={h}
                    className="pb-3 text-left text-xs font-medium text-muted-foreground first:pl-0 last:pr-0 px-3 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {visible.map((pos) => (
                <tr key={pos.id} className={cn('group', pos.positionStatus === 'inactive' && 'opacity-60')}>
                  {/* Product */}
                  <td className="py-3.5 pl-0 pr-3">
                    <div className="flex items-center gap-2.5">
                      <div className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold',
                        ASSET_COLORS[pos.asset] ?? 'bg-muted'
                      )}>
                        {pos.productName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground leading-tight">{pos.productName}</p>
                        <p className="text-xs text-muted-foreground">{pos.productType}</p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-3 py-3.5">
                    <span className="text-xs text-muted-foreground">{pos.depositType}</span>
                  </td>

                  {/* Assets */}
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <AssetDot asset={pos.asset} />
                      <span className="text-xs font-medium text-foreground">{pos.asset}</span>
                    </div>
                  </td>

                  {/* Balance */}
                  <td className="px-3 py-3.5">
                    <p className="text-sm tabular-nums font-medium text-foreground">{pos.balanceFormatted}</p>
                    <p className="text-xs text-muted-foreground tabular-nums">${pos.balanceUsd.toLocaleString()}</p>
                  </td>

                  {/* Points All Time */}
                  <td className="px-3 py-3.5">
                    <p className="text-sm font-semibold tabular-nums text-foreground">
                      {pos.pointsAllTime.toLocaleString()} pts
                    </p>
                    <p className="text-xs text-muted-foreground">{pos.pointsSource}</p>
                  </td>

                  {/* Vault Share % */}
                  <td className="px-3 py-3.5">
                    <span className="text-sm tabular-nums font-medium text-foreground">
                      {pos.vaultSharePercent.toFixed(2)}%
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3.5">
                    <Badge
                      variant={pos.positionStatus === 'active' ? 'low' : 'default'}
                      className="text-[10px] py-0.5 capitalize"
                    >
                      {pos.positionStatus}
                    </Badge>
                  </td>

                  {/* Last Updated */}
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                      <Clock className="h-3 w-3 shrink-0" aria-hidden />
                      {pos.lastUpdatedAt}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="pl-3 pr-0 py-3.5">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-3 text-xs gap-1"
                      onClick={onViewHistory}
                      aria-label={`View history for ${pos.productName}`}
                    >
                      View
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
