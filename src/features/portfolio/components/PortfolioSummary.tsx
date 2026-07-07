import { StatCard } from '@/shared/ui'

interface PortfolioSummaryProps {
  totalValue: number
  totalValueFormatted: string
  totalEarned: number
  totalEarnedFormatted: string
  portfolioApy: number
  pnlPercent: number
  activeVaults?: number
  isLoading?: boolean
}

export function PortfolioSummary({
  totalValueFormatted,
  totalEarnedFormatted,
  portfolioApy,
  pnlPercent,
  activeVaults = 0,
  isLoading,
}: PortfolioSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Value"    value={totalValueFormatted} isLoading={isLoading} />
      <StatCard label="Total Earned"   value={totalEarnedFormatted} change={pnlPercent} isLoading={isLoading} />
      <StatCard label="Portfolio APY"  value={portfolioApy.toFixed(1)} suffix="%" isLoading={isLoading} />
      <StatCard label="Active Vaults"  value={String(activeVaults)} isLoading={isLoading} />
    </div>
  )
}
