import { StatCard } from '@/shared/ui'

interface PlatformStats {
  tvl: string
  totalYieldPaid: string
  activeVaults: number
  averageApy: string
}

interface PlatformStatsSectionProps {
  stats?: PlatformStats
  isLoading?: boolean
}

const MOCK_STATS: PlatformStats = {
  tvl: '24.8M',
  totalYieldPaid: '3.2M',
  activeVaults: 8,
  averageApy: '14.6',
}

export function PlatformStatsSection({
  stats = MOCK_STATS,
  isLoading,
}: PlatformStatsSectionProps) {
  return (
    <section aria-labelledby="platform-stats-heading" className="py-4">
      <h2 id="platform-stats-heading" className="sr-only">
        Platform Statistics
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Value Locked"
          value={stats.tvl}
          prefix="$"
          isLoading={isLoading}
        />
        <StatCard
          label="Total Yield Paid"
          value={stats.totalYieldPaid}
          prefix="$"
          isLoading={isLoading}
        />
        <StatCard
          label="Active Vaults"
          value={String(stats.activeVaults)}
          isLoading={isLoading}
        />
        <StatCard
          label="Average APY"
          value={stats.averageApy}
          suffix="%"
          isLoading={isLoading}
        />
      </div>
    </section>
  )
}
