import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Skeleton } from '@/shared/ui'
import type { PointsBreakdown } from '../types/rewards.types'

type Period = 'allTime' | 'thisMonth' | 'lastMonth' | 'thisWeek' | 'last7Days' | 'last30Days'

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: 'allTime',   label: 'All time' },
  { value: 'last30Days',label: 'Last 30 days' },
  { value: 'thisMonth', label: 'This month' },
  { value: 'lastMonth', label: 'Last month' },
  { value: 'last7Days', label: 'Last 7 days' },
  { value: 'thisWeek',  label: 'This week' },
]

interface PointsBreakdownChartProps {
  breakdown?: PointsBreakdown
  isLoading: boolean
}

export function PointsBreakdownChart({ breakdown, isLoading }: PointsBreakdownChartProps) {
  const [period, setPeriod] = useState<Period>('allTime')

  const data = breakdown?.[period] ?? []
  const totalPoints = data.reduce((s, d) => s + d.points, 0)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 lg:flex-row" aria-busy="true">
        <div className="flex items-center justify-center">
          <Skeleton className="h-48 w-48 rounded-full" />
        </div>
        <div className="flex-1 space-y-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Period selector */}
      <div className="flex items-center gap-1" role="group" aria-label="Select time period">
        {PERIOD_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setPeriod(opt.value)}
            className={
              period === opt.value
                ? 'rounded-lg border border-foreground bg-foreground px-3 py-1.5 text-xs font-medium text-background'
                : 'rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
            }
            aria-pressed={period === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        {/* Donut chart */}
        <div className="flex shrink-0 items-center justify-center lg:w-52">
          <div className="relative h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={88}
                  dataKey="points"
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${Number(value).toLocaleString()} pts`, '']}
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {totalPoints >= 1000 ? `${(totalPoints / 1000).toFixed(1)}K` : totalPoints.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">Total points</p>
            </div>
          </div>
        </div>

        {/* Breakdown list */}
        <div className="flex-1 min-w-0">
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: item.color }}
                  aria-hidden
                />
                <span className="flex-1 text-sm text-foreground">{item.name}</span>
                <span className="tabular-nums text-sm font-medium text-foreground">
                  {item.points.toLocaleString()} pts
                </span>
                <span className="w-12 text-right tabular-nums text-sm text-muted-foreground">
                  {item.percent.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
