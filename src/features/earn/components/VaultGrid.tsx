import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { VaultCardSkeleton } from '@/features/vault/components/VaultCard'
import type { Vault } from '@/features/vault/components/VaultCard'
import { SearchBar } from './SearchBar'
import { FilterBar, type FilterState } from './FilterBar'
import { NewVaultBanner } from './NewVaultBanner'
import { RecommendedSection, type VaultPosition } from './RecommendedSection'
import { VaultTable } from './VaultTable'
import { CompareBar } from './CompareBar'
import { EmptyState, ErrorState } from '@/shared/ui'
import { useVaults } from '../hooks/useVaults'

function sortVaults(vaults: Vault[], sort: FilterState['sort']): Vault[] {
  return [...vaults].sort((a, b) => {
    switch (sort) {
      case 'apy':          return b.apy - a.apy
      case 'tvl':          return b.tvl - a.tvl
      case 'alphabetical': return a.name.localeCompare(b.name)
      case 'newest':       return 0
      default:             return 0
    }
  })
}

interface VaultGridProps {
  onDeposit: (vaultId: string) => void
  onWithdraw: (vaultId: string) => void
  positions?: VaultPosition[]
}

export function VaultGrid({ onDeposit, onWithdraw, positions = [] }: VaultGridProps) {
  const navigate = useNavigate()
  const { vaults, isLoading, error, refetch } = useVaults()

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    goal: 'all',
    risk: 'all',
    asset: 'all',
    sort: 'apy',
  })
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const recommended = useMemo(() => {
    const active = vaults.filter((v) => v.status === 'active')
    // Up to 3: explicit isRecommended first, then fill with best APY
    const explicit = active.filter((v) => v.isRecommended)
    const rest = active.filter((v) => !v.isRecommended).sort((a, b) => b.apy - a.apy)
    return [...explicit, ...rest].slice(0, 3)
  }, [vaults])

  const filtered = useMemo(() => {
    let result = vaults

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.asset.toLowerCase().includes(q) ||
          v.strategy.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      )
    }

    if (filters.goal !== 'all')  result = result.filter((v) => v.goal === filters.goal)
    if (filters.risk !== 'all')  result = result.filter((v) => v.risk === filters.risk)
    if (filters.asset !== 'all') result = result.filter((v) => v.asset === filters.asset)

    return sortVaults(result, filters.sort)
  }, [vaults, search, filters])

  const clearFilters = () => {
    setSearch('')
    setFilters({ goal: 'all', risk: 'all', asset: 'all', sort: 'apy' })
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (next.size < 3) {
        next.add(id)
      }
      return next
    })
  }

  const handleCompare = () => {
    navigate('/earn/compare', { state: { ids: Array.from(selectedIds) } })
  }

  const selectedVaults = vaults.filter((v) => selectedIds.has(v.id))

  const isFiltering =
    !!search.trim() ||
    filters.goal !== 'all' ||
    filters.risk !== 'all' ||
    filters.asset !== 'all'

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-8" aria-busy="true">
        <div className="h-56 rounded-2xl bg-muted animate-pulse" />
        <div className="flex gap-4 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-64 w-[300px] shrink-0 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-8 w-full max-w-sm rounded-lg bg-muted animate-pulse" />
          <div className="h-8 w-80 rounded-md bg-muted animate-pulse" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <VaultCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) {
    return <ErrorState message="Could not load vaults." onRetry={refetch} />
  }

  return (
    <>
      <div className="space-y-8">
        {/* New vault banner — hidden while filtering */}
        {!isFiltering && <NewVaultBanner />}

        {/* Recommended row — hidden while filtering */}
        {!isFiltering && recommended.length > 0 && (
          <RecommendedSection
            vaults={recommended}
            positions={positions}
            onDeposit={onDeposit}
            onWithdraw={onWithdraw}
          />
        )}

        {/* Search */}
        <SearchBar value={search} onChange={setSearch} />

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          resultCount={filtered.length}
        />

        {/* Vault marketplace */}
        {filtered.length === 0 ? (
          <EmptyState
            context={isFiltering ? 'search' : 'vaults'}
            onAction={clearFilters}
          />
        ) : (
          <VaultTable
            vaults={filtered}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onDeposit={onDeposit}
          />
        )}
      </div>

      <CompareBar
        selected={selectedVaults}
        onRemove={(id) => toggleSelect(id)}
        onClear={() => setSelectedIds(new Set())}
        onCompare={handleCompare}
      />
    </>
  )
}
