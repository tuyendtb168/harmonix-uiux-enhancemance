import { useQuery } from '@tanstack/react-query'
import type { PortfolioPosition } from '@/features/portfolio/components/PositionCard'
import type { PendingWithdrawal } from '@/features/portfolio/components/PendingWithdrawals'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

const MOCK_POSITIONS: PortfolioPosition[] = [
  {
    vaultId: 'delta-neutral-usdc',
    vaultName: 'Delta Neutral USDC',
    asset: 'USDC',
    tokens: ['USDC', 'haUSDC'],
    risk: 'low',
    value: 116_274,
    valueFormatted: '$116,274',
    deposited: 104_000,
    depositedFormatted: '$104,000',
    earned: 12_274,
    earnedFormatted: '$12,274',
    pnlPercent: 11.8,
    currentApy: 12.4,
    sharePercent: 52,
    pointsAccrued: 148,
    pointsPerDay: 7,
  },
  {
    vaultId: 'eth-yield-max',
    vaultName: 'ETH Yield Max',
    asset: 'ETH',
    tokens: ['ETH', 'WETH'],
    risk: 'medium',
    value: 67_176,
    valueFormatted: '$67,176',
    deposited: 60_000,
    depositedFormatted: '$60,000',
    earned: 7_176,
    earnedFormatted: '$7,176',
    pnlPercent: 11.96,
    currentApy: 15.8,
    sharePercent: 30,
    pointsAccrued: 98,
    pointsPerDay: 4,
  },
  {
    vaultId: 'stable-plus',
    vaultName: 'Stable Plus',
    asset: 'USDC',
    tokens: ['USDC', 'USDT'],
    risk: 'low',
    value: 40_000,
    valueFormatted: '$40,000',
    deposited: 36_000,
    depositedFormatted: '$36,000',
    earned: 4_000,
    earnedFormatted: '$4,000',
    pnlPercent: 11.11,
    currentApy: 11.2,
    sharePercent: 18,
    pointsAccrued: 38,
    pointsPerDay: 1,
  },
]

const MOCK_WITHDRAWALS: PendingWithdrawal[] = [
  {
    id: 'w1',
    vaultName: 'BTC Bull Run',
    asset: 'USDC',
    amountFormatted: '$2,400',
    estimatedDate: 'Est. Jun 26',
    status: 'processing',
  },
]

async function fetchPortfolio() {
  await delay(700)
  const positions = MOCK_POSITIONS
  const totalValue = positions.reduce((s, p) => s + p.value, 0)
  const totalDeposited = positions.reduce((s, p) => s + p.deposited, 0)
  const totalEarned = positions.reduce((s, p) => s + p.earned, 0)
  const portfolioApy = positions.reduce((s, p) => s + p.currentApy * (p.value / totalValue), 0)
  const pnlPercent = totalDeposited > 0 ? (totalEarned / totalDeposited) * 100 : 0
  const totalPoints = positions.reduce((s, p) => s + p.pointsAccrued, 0)
  const pointsToday = positions.reduce((s, p) => s + p.pointsPerDay, 0)
  const yieldPerDay = (totalValue * portfolioApy) / 100 / 365

  const earnings24h = 142.35
  const earnings24hPercent = (earnings24h / totalValue) * 100

  return {
    positions,
    pendingWithdrawals: MOCK_WITHDRAWALS,
    totalValue,
    totalValueFormatted: `$${totalValue.toLocaleString()}`,
    totalDeposited,
    netDepositedFormatted: `$${totalDeposited.toLocaleString()}`,
    totalEarned,
    totalEarnedFormatted: `$${totalEarned.toLocaleString()}`,
    earnings24h,
    earnings24hFormatted: `+$${earnings24h.toFixed(2)}`,
    earnings24hPercent,
    portfolioApy,
    pnlPercent,
    totalPoints,
    pointsToday,
    yieldPerDay,
  }
}

export function usePortfolio() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolio,
    staleTime: 30_000,
  })
  return { portfolio: data, isLoading, error, refetch }
}
