import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Skeleton } from './skeleton'

type StatCardSize = 'sm' | 'md' | 'lg'

interface StatCardProps {
  label: string
  value: string
  change?: number
  changeLabel?: string
  prefix?: string
  suffix?: string
  isLoading?: boolean
  size?: StatCardSize
  className?: string
  tooltip?: string
}

const sizeClasses: Record<StatCardSize, { label: string; value: string; change: string }> = {
  sm: { label: 'text-xs', value: 'text-xl font-bold', change: 'text-xs' },
  md: { label: 'text-xs', value: 'text-2xl font-bold', change: 'text-sm' },
  lg: { label: 'text-sm', value: 'text-3xl font-bold', change: 'text-sm' },
}

function StatCard({ label, value, change, changeLabel, prefix, suffix, isLoading, size = 'md', className }: StatCardProps) {
  const cls = sizeClasses[size]

  if (isLoading) {
    return (
      <div className={cn('rounded-xl border border-border/60 bg-card p-5 space-y-2', className)}>
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-3 w-16" />
      </div>
    )
  }

  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0
  const isNeutral  = change !== undefined && change === 0

  return (
    <div
      className={cn('rounded-xl border border-border/60 bg-card p-5', className)}
      aria-label={`${label}: ${prefix ?? ''}${value}${suffix ?? ''}`}
    >
      <p className={cn('text-muted-foreground font-medium uppercase tracking-wider', cls.label)}>{label}</p>
      <p className={cn('mt-2 tabular-nums tracking-tight text-foreground', cls.value)}>
        {prefix && <span className="text-muted-foreground text-sm font-normal mr-0.5">{prefix}</span>}
        {value}
        {suffix && <span className="text-muted-foreground text-sm font-normal ml-0.5">{suffix}</span>}
      </p>
      {change !== undefined && (
        <div className={cn('mt-1.5 flex items-center gap-1', cls.change)}>
          {isPositive && <TrendingUp className="h-3.5 w-3.5 text-success" aria-hidden />}
          {isNegative && <TrendingDown className="h-3.5 w-3.5 text-destructive" aria-hidden />}
          {isNeutral  && <Minus className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />}
          <span className={cn(isPositive && 'text-positive', isNegative && 'text-negative', isNeutral && 'text-neutral')}>
            {isPositive ? '+' : ''}{change.toFixed(2)}%
          </span>
          {changeLabel && <span className="text-muted-foreground">{changeLabel}</span>}
        </div>
      )}
    </div>
  )
}

export { StatCard }
export type { StatCardProps }
