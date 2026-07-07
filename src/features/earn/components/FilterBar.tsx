import { X, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import type { VaultGoal } from '@/features/vault/components/VaultCard'

export type AssetFilter = 'all' | 'USDC' | 'ETH' | 'BTC' | 'HYPE'
export type RiskFilter = 'all' | 'low' | 'medium' | 'high'
export type GoalFilter = 'all' | VaultGoal
export type SortOption = 'apy' | 'tvl' | 'newest' | 'alphabetical'

export interface FilterState {
  goal: GoalFilter
  risk: RiskFilter
  asset: AssetFilter
  sort: SortOption
}

interface FilterBarProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  resultCount?: number
  className?: string
}

const GOAL_OPTIONS: { value: GoalFilter; label: string; description: string }[] = [
  { value: 'all',           label: 'All Goals',     description: 'Show all vaults' },
  { value: 'stable-income', label: 'Stable Income', description: 'Low risk, consistent yield' },
  { value: 'growth',        label: 'Growth',        description: 'Medium risk, higher upside' },
  { value: 'delta-neutral', label: 'Delta Neutral', description: 'Market-neutral strategies' },
  { value: 'high-yield',    label: 'High Yield',    description: 'Aggressive, max APY' },
]

const RISK_OPTIONS: { value: RiskFilter; label: string }[] = [
  { value: 'all',    label: 'All' },
  { value: 'low',    label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high',   label: 'High' },
]

const ASSET_OPTIONS: { value: AssetFilter; label: string }[] = [
  { value: 'all',  label: 'All Assets' },
  { value: 'USDC', label: 'USDC' },
  { value: 'ETH',  label: 'ETH' },
  { value: 'BTC',  label: 'BTC' },
  { value: 'HYPE', label: 'HYPE' },
]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'apy',          label: 'Highest APY' },
  { value: 'tvl',          label: 'Highest TVL' },
  { value: 'newest',       label: 'Newest' },
  { value: 'alphabetical', label: 'Alphabetical' },
]

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active
          ? 'bg-primary text-primary-foreground'
          : 'border border-border text-muted-foreground hover:text-foreground hover:bg-accent'
      )}
    >
      {children}
    </button>
  )
}

export function FilterBar({ filters, onFilterChange, resultCount, className }: FilterBarProps) {
  const hasActiveFilters =
    filters.goal !== 'all' || filters.risk !== 'all' || filters.asset !== 'all'

  const clearAll = () =>
    onFilterChange({ goal: 'all', risk: 'all', asset: 'all', sort: filters.sort })

  return (
    <div className={cn('space-y-3', className)}>
      {/* Row 1: Goal filter — primary intent selector */}
      <div
        className="flex flex-wrap items-center gap-1.5"
        role="group"
        aria-label="Filter by goal"
      >
        {GOAL_OPTIONS.map(({ value, label }) => (
          <Pill
            key={value}
            active={filters.goal === value}
            onClick={() => onFilterChange({ ...filters, goal: value })}
          >
            {label}
          </Pill>
        ))}
      </div>

      {/* Row 2: Risk + Asset + Sort */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div
          className="flex flex-wrap items-center gap-1"
          role="group"
          aria-label="Filter by risk"
        >
          {RISK_OPTIONS.map(({ value, label }) => (
            <Pill
              key={value}
              active={filters.risk === value}
              onClick={() => onFilterChange({ ...filters, risk: value })}
            >
              {label}
            </Pill>
          ))}
        </div>

        <div className="hidden sm:block h-5 w-px bg-border/60" aria-hidden />

        <div
          className="flex flex-wrap items-center gap-1"
          role="group"
          aria-label="Filter by asset"
        >
          {ASSET_OPTIONS.map(({ value, label }) => (
            <Pill
              key={value}
              active={filters.asset === value}
              onClick={() => onFilterChange({ ...filters, asset: value })}
            >
              {label}
            </Pill>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:ml-auto">
          <label htmlFor="sort-select" className="text-xs text-muted-foreground whitespace-nowrap">
            Sort
          </label>
          <select
            id="sort-select"
            value={filters.sort}
            onChange={(e) =>
              onFilterChange({ ...filters, sort: e.target.value as SortOption })
            }
            className={cn(
              'rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium',
              'text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer'
            )}
            aria-label="Sort vaults"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Active filter chips + count */}
      {(hasActiveFilters || resultCount !== undefined) && (
        <div className="flex items-center gap-2 flex-wrap">
          {resultCount !== undefined && (
            <span className="text-xs text-muted-foreground">
              {resultCount} vault{resultCount !== 1 ? 's' : ''}
            </span>
          )}

          {filters.goal !== 'all' && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, goal: 'all' })}
              className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Remove ${filters.goal} goal filter`}
            >
              {GOAL_OPTIONS.find((g) => g.value === filters.goal)?.label ?? filters.goal}
              <X className="h-3 w-3" aria-hidden />
            </button>
          )}

          {filters.risk !== 'all' && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, risk: 'all' })}
              className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Remove ${filters.risk} risk filter`}
            >
              <SlidersHorizontal className="h-3 w-3" aria-hidden />
              {filters.risk} risk
              <X className="h-3 w-3" aria-hidden />
            </button>
          )}

          {filters.asset !== 'all' && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, asset: 'all' })}
              className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Remove ${filters.asset} asset filter`}
            >
              {filters.asset}
              <X className="h-3 w-3" aria-hidden />
            </button>
          )}

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground"
              onClick={clearAll}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
