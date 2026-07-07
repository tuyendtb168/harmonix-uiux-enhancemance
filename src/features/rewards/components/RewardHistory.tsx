import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Skeleton } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { RewardHistoryItem, HistoryStatus } from '../types/rewards.types'

const SOURCE_COLORS: Record<string, string> = {
  Harmonix:  'bg-blue-500',
  Valantis:  'bg-emerald-500',
  Pendle:    'bg-violet-500',
  Kinetiq:   'bg-teal-500',
  Hyperlend: 'bg-green-400',
}

const STATUS_STYLES: Record<HistoryStatus, string> = {
  claimable: 'border border-success text-success bg-success/10',
  claimed:   'border border-border text-muted-foreground bg-muted/40',
  pending:   'border border-warning text-warning bg-warning/10',
}

function SourceAvatar({ source }: { source: string }) {
  const color = SOURCE_COLORS[source] ?? 'bg-muted'
  return (
    <div className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white text-[10px] font-bold', color)}>
      {source.charAt(0)}
    </div>
  )
}

interface RewardHistoryProps {
  items: RewardHistoryItem[]
  isLoading: boolean
}

export function RewardHistory({ items, isLoading }: RewardHistoryProps) {
  const [sourceFilter, setSourceFilter] = useState('All sources')
  const [typeFilter, setTypeFilter]     = useState('All types')

  const allSources = ['All sources', ...Array.from(new Set(items.map((i) => i.source)))]
  const allTypes   = ['All types', 'Deposit', 'Campaign', 'Achievement', 'Referral']

  const filtered = items.filter((item) => {
    const matchSource = sourceFilter === 'All sources' || item.source === sourceFilter
    const matchType = typeFilter === 'All types' || item.activity.toLowerCase().includes(typeFilter.toLowerCase())
    return matchSource && matchType
  })

  if (isLoading) {
    return (
      <div className="space-y-3" aria-busy="true">
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-4 py-2.5 border-b border-border/50">
            <Skeleton className="h-3 w-32 shrink-0" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 flex-1 max-w-64" />
            <Skeleton className="h-3 w-14 ml-auto" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header + filters */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-sm font-semibold text-foreground">Recent activities</h3>
        <div className="flex items-center gap-2">
          {/* Source filter */}
          <div className="relative">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="appearance-none rounded-lg border border-border bg-card pl-3 pr-7 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              aria-label="Filter by source"
            >
              {allSources.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
          </div>
          {/* Type filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none rounded-lg border border-border bg-card pl-3 pr-7 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              aria-label="Filter by type"
            >
              {allTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border">
              {['TIME', 'SOURCE', 'ACTIVITY', 'POINTS', 'STATUS'].map((h) => (
                <th
                  key={h}
                  className={cn(
                    'pb-2.5 text-[10px] font-semibold tracking-wider text-muted-foreground',
                    h === 'POINTS' || h === 'STATUS' ? 'text-right pl-4' : 'text-left pr-4'
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                  No activities match the selected filters.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="group hover:bg-muted/20 transition-colors">
                  <td className="py-3 pr-4 whitespace-nowrap text-xs text-muted-foreground tabular-nums">
                    {item.timestamp}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <SourceAvatar source={item.source} />
                      <span className="text-xs font-medium text-foreground">{item.source}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-foreground">{item.activity}</span>
                  </td>
                  <td className="py-3 pl-4 text-right whitespace-nowrap">
                    <span className="text-sm font-semibold text-success tabular-nums">
                      +{item.points} pts
                    </span>
                  </td>
                  <td className="py-3 pl-4 text-right">
                    <span className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                      STATUS_STYLES[item.status]
                    )}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <p className="text-center text-xs text-muted-foreground pt-1">
          Showing {filtered.length} activit{filtered.length === 1 ? 'y' : 'ies'}
        </p>
      )}
    </div>
  )
}
