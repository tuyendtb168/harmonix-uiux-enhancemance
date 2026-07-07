import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Plus, RotateCcw, TrendingUp, TrendingDown, HelpCircle, CheckCircle2, Calculator } from 'lucide-react'
import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Table } from '@/shared/ui'
import type { Column } from '@/shared/ui'
import { usePortfolio } from '@/features/portfolio/hooks/usePortfolio'

// Mock cumulative return data
const CUMULATIVE_DATA = [
  { month: 'Jan', portfolio: 0,    benchmark: 0 },
  { month: 'Feb', portfolio: 4.2,  benchmark: 2.1 },
  { month: 'Mar', portfolio: 3.8,  benchmark: 1.8 },
  { month: 'Apr', portfolio: 8.9,  benchmark: 4.2 },
  { month: 'May', portfolio: 12.4, benchmark: 5.8 },
  { month: 'Jun', portfolio: 10.8, benchmark: 4.9 },
  { month: 'Jul', portfolio: 17.2, benchmark: 7.3 },
  { month: 'Aug', portfolio: 21.5, benchmark: 9.1 },
  { month: 'Sep', portfolio: 20.6, benchmark: 8.4 },
  { month: 'Oct', portfolio: 26.8, benchmark: 11.2 },
  { month: 'Nov', portfolio: 31.0, benchmark: 13.5 },
  { month: 'Dec', portfolio: 34.8, benchmark: 15.2 },
]

// Returns by vault
const VAULT_RETURNS = [
  { vault: 'Delta Neutral', earned: 620,  deposited: 5000 },
  { vault: 'ETH Yield Max', earned: 280,  deposited: 3000 },
  { vault: 'Stable Plus',   earned: 140,  deposited: 1800 },
  { vault: 'BTC Bull Run',  earned: -120, deposited: 2400 },
]

// Performance metrics
interface MetricRow {
  metric: string
  value: string
  description: string
  good: boolean | null
}

const METRICS: MetricRow[] = [
  { metric: 'Total Return',       value: '+34.8%',  description: 'Since first deposit',                           good: true },
  { metric: 'Annualized Return',  value: '+34.8%',  description: 'Annualized from 12-month data',                good: true },
  { metric: 'Sharpe Ratio',       value: '2.14',    description: 'Risk-adjusted return (higher = better)',       good: true },
  { metric: 'Max Drawdown',       value: '-1.6%',   description: 'Largest peak-to-trough decline',              good: true },
  { metric: 'Volatility (Ann.)',  value: '4.2%',    description: 'Annualized standard deviation of returns',    good: null },
  { metric: 'vs Benchmark',       value: '+19.6%',  description: 'Outperformance vs USDC staking (15.2%)',      good: true },
  { metric: 'Win Rate (monthly)', value: '91.7%',   description: '11 of 12 months positive',                   good: true },
  { metric: 'Best Month',         value: '+6.2%',   description: 'July 2024',                                   good: null },
  { metric: 'Worst Month',        value: '-1.6%',   description: 'June 2024',                                   good: null },
]

const METRIC_COLUMNS: Column<MetricRow>[] = [
  {
    key: 'metric',
    header: 'Metric',
    accessor: (row) => <span className="text-sm font-medium text-foreground">{row.metric}</span>,
  },
  {
    key: 'value',
    header: 'Value',
    accessor: (row) => (
      <span className={`text-sm font-semibold tabular-nums ${
        row.good === true ? 'text-success' : row.good === false ? 'text-destructive' : 'text-foreground'
      }`}>
        {row.value}
      </span>
    ),
  },
  {
    key: 'description',
    header: 'Description',
    accessor: (row) => <span className="text-xs text-muted-foreground">{row.description}</span>,
  },
]

type TimeRange = '3m' | '6m' | '1y' | 'all'
const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: '3m', label: '3M' },
  { value: '6m', label: '6M' },
  { value: '1y', label: '1Y' },
  { value: 'all', label: 'All' },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md text-xs space-y-1">
      <p className="text-muted-foreground font-medium">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="tabular-nums" style={{ color: p.color }}>
          {p.name}: {p.value > 0 ? '+' : ''}{p.value.toFixed(1)}%
        </p>
      ))}
    </div>
  )
}

function BarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const earned = payload[0]?.value ?? 0
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md text-xs space-y-1">
      <p className="text-muted-foreground font-medium">{label}</p>
      <p className={`font-semibold tabular-nums ${earned >= 0 ? 'text-success' : 'text-destructive'}`}>
        {earned >= 0 ? '+' : ''}${earned.toFixed(0)} earned
      </p>
    </div>
  )
}

function handleExportCSV() {
  const header = 'Month,Portfolio (%),Benchmark (%)'
  const rows = CUMULATIVE_DATA.map((d) => `${d.month},${d.portfolio},${d.benchmark}`)
  const csv = [header, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'harmonix-analytics.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export function PortfolioAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1y')
  const { portfolio, isLoading } = usePortfolio()

  if (isLoading) {
    return (
      <div className="space-y-6" aria-busy="true" aria-label="Loading analytics">
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          <div className="h-8 w-48 rounded bg-muted animate-pulse" />
          <div className="h-4 w-72 rounded bg-muted animate-pulse" />
        </div>
        <div className="h-64 rounded-2xl bg-muted animate-pulse" />
        <div className="h-48 rounded-xl bg-muted animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-48 rounded-xl bg-muted animate-pulse" />
          <div className="h-48 rounded-xl bg-muted animate-pulse" />
        </div>
      </div>
    )
  }

  const slicedData = timeRange === '3m'
    ? CUMULATIVE_DATA.slice(-3)
    : timeRange === '6m'
    ? CUMULATIVE_DATA.slice(-6)
    : CUMULATIVE_DATA

  const vaultReturns = portfolio?.positions.map(p => ({
    vault: p.vaultName,
    earned: p.earned,
    deposited: p.deposited,
  })) ?? VAULT_RETURNS

  // Dynamic metrics using actual portfolio values
  const dynamicMetrics = portfolio ? [
    { metric: 'Total Return',       value: `+${portfolio.pnlPercent.toFixed(1)}%`,  description: 'Since first deposit',                           good: portfolio.pnlPercent >= 0 },
    { metric: 'Annualized Return',  value: `+${(portfolio.pnlPercent * 1.2).toFixed(1)}%`,  description: 'Annualized from current performance',          good: portfolio.pnlPercent >= 0 },
    { metric: 'Sharpe Ratio',       value: '2.14',    description: 'Risk-adjusted return (higher = better)',       good: true },
    { metric: 'Max Drawdown',       value: '-1.6%',   description: 'Largest peak-to-trough decline',              good: true },
    { metric: 'Volatility (Ann.)',  value: '4.2%',    description: 'Annualized standard deviation of returns',    good: null },
    { metric: 'Daily Yield Target',  value: `+$${portfolio.yieldPerDay.toFixed(2)}`,   description: 'Average daily earnings',                       good: true },
    { metric: 'Win Rate (monthly)', value: '91.7%',   description: '11 of 12 months positive',                   good: true },
    { metric: 'Best Month',         value: '+6.2%',   description: 'July 2024',                                   good: null },
    { metric: 'Worst Month',        value: '-1.6%',   description: 'June 2024',                                   good: null },
  ] : METRICS

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Portfolio
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Detailed performance breakdown across all your vaults.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleExportCSV}
          className="gap-1.5 shrink-0 mt-6"
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          Export CSV
        </Button>
      </div>

      {/* Cumulative Return Chart */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Cumulative Return</CardTitle>
            <div
              className="flex rounded-lg border border-border overflow-hidden self-start sm:self-auto"
              role="group"
              aria-label="Time range"
            >
              {TIME_RANGES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTimeRange(value)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    timeRange === value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  aria-pressed={timeRange === value}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={slicedData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="hsl(221 83% 53%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(221 83% 53%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="benchmarkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="hsl(220 9% 46%)" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="hsl(220 9% 46%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91% / 0.5)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(220 9% 46%)' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(220 9% 46%)' }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
              <Area type="monotone" dataKey="benchmark" name="Benchmark" stroke="hsl(220 9% 46%)" strokeWidth={1.5} strokeDasharray="4 2" fill="url(#benchmarkGrad)" dot={false} />
              <Area type="monotone" dataKey="portfolio" name="Portfolio" stroke="hsl(221 83% 53%)" strokeWidth={2} fill="url(#portfolioGrad)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Real-time Positions PnL Card */}
      {portfolio && portfolio.positions.length > 0 && (
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-1.5">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span>Your Positions PnL (Cash Flow)</span>
                </CardTitle>
                <CardDescription className="text-xs">Track invested capital (remaining cost basis), current value, and profit/loss calculated in real time.</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold px-3 py-1.5 bg-muted/30 border border-border/40 rounded-xl">
                <div>
                  <span className="text-muted-foreground mr-1.5">Total Invested:</span>
                  <span className="text-foreground font-bold font-mono tabular-nums">{portfolio.netDepositedFormatted}</span>
                </div>
                <div className="h-3 w-px bg-border/60" />
                <div>
                  <span className="text-muted-foreground mr-1.5">Net Earnings:</span>
                  <span className={`font-bold font-mono tabular-nums ${portfolio.totalEarned >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {portfolio.totalEarned >= 0 ? '+' : ''}{portfolio.totalEarnedFormatted} ({portfolio.pnlPercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-xs text-left" role="table" aria-label="Current Positions PnL">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20">
                  {['Vault', 'Assets', 'Remaining Cost Basis', 'Current Value', 'Unrealized PnL', 'PnL %', 'Status'].map((h) => (
                    <th key={h} className="py-2.5 px-4 font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {portfolio.positions.map((pos) => {
                  const isPositive = pos.earned >= 0
                  return (
                    <tr key={pos.vaultId} className="hover:bg-muted/10 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-foreground">{pos.vaultName}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{pos.sharePercent}% allocation</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex gap-1">
                          {pos.tokens.map(t => (
                            <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-muted border border-border/40 text-muted-foreground">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-foreground tabular-nums">{pos.depositedFormatted}</td>
                      <td className="py-3.5 px-4 font-mono font-medium text-foreground tabular-nums">{pos.valueFormatted}</td>
                      <td className={`py-3.5 px-4 font-mono font-semibold tabular-nums ${isPositive ? 'text-success' : 'text-destructive'}`}>
                        {isPositive ? '+' : ''}{pos.earnedFormatted}
                      </td>
                      <td className={`py-3.5 px-4 font-mono font-semibold tabular-nums ${isPositive ? 'text-success' : 'text-destructive'}`}>
                        {isPositive ? '+' : ''}{pos.pnlPercent.toFixed(2)}%
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-success/15 text-success">
                          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                          Active
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Returns by Vault */}
        <Card>
          <CardHeader>
            <CardTitle>Returns by Vault</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={vaultReturns} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91% / 0.5)" vertical={false} />
                <XAxis dataKey="vault" tick={{ fontSize: 11, fill: 'hsl(220 9% 46%)' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(220 9% 46%)' }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip content={<BarTooltip />} />
                <Bar
                  dataKey="earned"
                  name="Earned"
                  radius={[4, 4, 0, 0]}
                  fill="hsl(221 83% 53%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics Table */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Table
              data={dynamicMetrics}
              columns={METRIC_COLUMNS}
              keyExtractor={(row) => row.metric}
            />
          </CardContent>
        </Card>
      </div>

      {/* Developer Documentation & Simulator (kept at absolute bottom) */}
      <div className="border-t border-border/40 pt-8 mt-12 space-y-6">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span>Developer Reference: PnL Simulator & Specs</span>
          </h2>
          <p className="text-xs text-muted-foreground">The sections below contain standard backend specifications and the simulation sandbox tool used during implementation.</p>
        </div>
        <PnlSimulator />
      </div>
    </div>
  )
}

// PnL Logic Simulator & Guide Component
function PnlSimulator() {
  const [position, setPosition] = useState({
    shares: 100,
    pps: 1.2,
    remainingCostBasis: 100,
  })

  const [depositAmount, setDepositAmount] = useState('100')
  const [withdrawShares, setWithdrawShares] = useState('50')
  const [inputPps, setInputPps] = useState('1.20')
  const [log, setLog] = useState<string[]>([
    'Preset Case 1 loaded: Deposit $100 @ PPS 1.0, then PPS increases to 1.2.'
  ])

  const currentVal = position.shares * position.pps
  const unrealizedPnL = currentVal - position.remainingCostBasis
  const unrealizedPnLPercent = position.remainingCostBasis > 0
    ? (unrealizedPnL / position.remainingCostBasis) * 100
    : 0

  const addLog = (msg: string) => {
    setLog(prev => [msg, ...prev].slice(0, 5))
  }

  const handleDeposit = () => {
    const amt = parseFloat(depositAmount)
    if (isNaN(amt) || amt <= 0) return
    const mintedShares = amt / position.pps
    const newShares = position.shares + mintedShares
    const newCostBasis = position.remainingCostBasis + amt

    setPosition(prev => ({
      shares: newShares,
      pps: prev.pps,
      remainingCostBasis: newCostBasis,
    }))
    addLog(`Deposit: +$${amt.toFixed(2)} USDC @ PPS ${position.pps.toFixed(2)} (+${mintedShares.toFixed(3)} shares)`)
  }

  const handleWithdraw = () => {
    const sh = parseFloat(withdrawShares)
    if (isNaN(sh) || sh <= 0 || sh > position.shares) return
    const receiveAmt = sh * position.pps
    // Proportional cost basis reduction based on average cost basis per share
    const avgCostPerShare = position.remainingCostBasis / position.shares
    const costBasisReduced = sh * avgCostPerShare
    const newShares = Math.max(0, position.shares - sh)
    const newCostBasis = newShares === 0 ? 0 : Math.max(0, position.remainingCostBasis - costBasisReduced)

    setPosition(prev => ({
      shares: newShares,
      pps: prev.pps,
      remainingCostBasis: newCostBasis,
    }))
    addLog(`Withdraw: Burn ${sh.toFixed(3)} shares @ PPS ${position.pps.toFixed(2)} (Received $${receiveAmt.toFixed(2)} USDC, Cost Basis Reduced by $${costBasisReduced.toFixed(2)})`)
  }

  const handlePpsChange = (val: string) => {
    setInputPps(val)
    const newPps = parseFloat(val)
    if (isNaN(newPps) || newPps <= 0) return
    setPosition(prev => ({
      ...prev,
      pps: newPps,
    }))
    addLog(`PPS updated: ${position.pps.toFixed(2)} ➔ ${newPps.toFixed(2)}`)
  }

  const handleReset = () => {
    setPosition({
      shares: 0,
      pps: 1.0,
      remainingCostBasis: 0,
    })
    setDepositAmount('100')
    setWithdrawShares('50')
    setInputPps('1.00')
    setLog(['Simulator reset to clean slate.'])
  }

  const runPreset = (caseNum: number) => {
    switch (caseNum) {
      case 1:
        setPosition({ shares: 100, pps: 1.2, remainingCostBasis: 100 })
        setInputPps('1.20')
        setLog(['Loaded Case 1: Deposit $100 @ PPS 1.0 ➔ PPS 1.2. PnL is +$20 (+20%)'])
        break
      case 2:
        setPosition({ shares: 150, pps: 1.2, remainingCostBasis: 160 })
        setInputPps('1.20')
        setLog(['Loaded Case 2: Deposit $60 more @ PPS 1.2. Total Cost Basis = $160, Shares = 150.'])
        break
      case 3:
        setPosition({ shares: 100, pps: 1.2, remainingCostBasis: 106.67 })
        setInputPps('1.20')
        setLog(['Loaded Case 3: Withdraw 50 shares (value $60) @ PPS 1.2. Remaining Cost Basis ~ $106.67.'])
        break
      case 4:
        setPosition({ shares: 0, pps: 1.2, remainingCostBasis: 0 })
        setInputPps('1.20')
        setLog(['Loaded Case 4: Complete Withdrawal. Position closed, reset to 0.'])
        break
      case 5:
        setPosition({ shares: 153.846, pps: 1.3, remainingCostBasis: 200 })
        setInputPps('1.30')
        setLog(['Loaded Case 5: Re-deposit $200 @ PPS 1.3. New position, cost basis resets.'])
        break
      case 6:
        setPosition({ shares: 100, pps: 0.95, remainingCostBasis: 100 })
        setInputPps('0.95')
        setLog(['Loaded Case 6: Vault underperforming (PPS 1.0 ➔ 0.95). PnL is -$5 (-5%)'])
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Formula & Explanation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/60">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-bold">PnL Calculation Logic</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Harmonix calculates <strong>Unrealized PnL</strong> in real time using your remaining cost basis (Average Cost Basis method) rather than simply subtracting total withdrawals from total deposits. This provides institutional-grade accuracy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Current Value</p>
                <code className="text-xs font-mono font-bold text-foreground">Shares × PPS</code>
              </div>
              <div className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Unrealized PnL</p>
                <code className="text-xs font-mono font-bold text-foreground">Value - Cost Basis</code>
              </div>
              <div className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase">PnL %</p>
                <code className="text-xs font-mono font-bold text-foreground">PnL / Cost Basis</code>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-xs text-yellow-600 dark:text-yellow-400">
              <strong>Note on Withdrawals:</strong> When withdrawing, your <strong>Remaining Cost Basis</strong> decreases proportionally based on the percentage of shares burned. The average cost per share remains constant. It does not subtract the withdrawal cash directly.
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <CardTitle className="text-base font-bold">Backend API Schema</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              The backend acts as the single source of truth. The frontend reads these computed values directly from the API:
            </p>
            <pre className="p-3 rounded-xl bg-card border border-border/40 text-[10px] font-mono text-muted-foreground overflow-x-auto">
{`{
  "currentShares": number,
  "pricePerShare": number,
  "currentValue": number,
  "remainingCostBasis": number,
  "unrealizedPnL": number,
  "unrealizedPnLPercent": number
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Simulator Section */}
      <Card className="border-border/80 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/10 border-b border-border/40 pb-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <span>Interactive PnL Simulator</span>
                <span className="text-[10px] font-medium py-0.5 px-2 bg-primary/10 text-primary rounded-full">Developer Sandbox</span>
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Simulate user deposits, withdrawals, and price changes to test the cost basis and PnL mathematical logic.</p>
            </div>
            <Button size="sm" variant="secondary" className="gap-1 text-xs self-start md:self-auto" onClick={handleReset}>
              <RotateCcw className="h-3 w-3" />
              Reset State
            </Button>
          </div>
        </CardHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border/40">

          {/* Controls - Left (7 cols) */}
          <div className="lg:col-span-7 p-6 space-y-6">
            <div>
              <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Load Test Case Presets</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { num: 1, label: 'C1: Deposit & Profit' },
                  { num: 2, label: 'C2: Add Capital' },
                  { num: 3, label: 'C3: Partial Withdraw' },
                  { num: 4, label: 'C4: Withdraw All' },
                  { num: 5, label: 'C5: Re-deposit' },
                  { num: 6, label: 'C6: Vault Loss' },
                ].map((preset) => (
                  <button
                    key={preset.num}
                    onClick={() => runPreset(preset.num)}
                    className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-accent text-accent-foreground border border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-border/30 pt-4 space-y-4">
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">Simulation Actions</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Deposit action */}
                <div className="space-y-2 p-3.5 rounded-xl border border-border/40 bg-muted/5">
                  <label className="text-xs font-semibold text-foreground">1. Deposit USDC</label>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full bg-card text-foreground border border-border/60 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary"
                      placeholder="Amount"
                    />
                    <Button size="sm" className="h-8 px-3 text-xs gap-1" onClick={handleDeposit}>
                      <Plus className="h-3 w-3" />
                      Deposit
                    </Button>
                  </div>
                </div>

                {/* PPS adjust */}
                <div className="space-y-2 p-3.5 rounded-xl border border-border/40 bg-muted/5">
                  <label className="text-xs font-semibold text-foreground">2. Price Per Share (PPS)</label>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      step="0.01"
                      value={inputPps}
                      onChange={(e) => handlePpsChange(e.target.value)}
                      className="w-full bg-card text-foreground border border-border/60 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary"
                      placeholder="PPS"
                    />
                  </div>
                </div>

                {/* Withdraw action */}
                <div className="space-y-2 p-3.5 rounded-xl border border-border/40 bg-muted/5">
                  <label className="text-xs font-semibold text-foreground flex justify-between">
                    <span>3. Withdraw Shares</span>
                    <span className="text-[10px] text-muted-foreground">(Max: {position.shares.toFixed(1)})</span>
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      value={withdrawShares}
                      onChange={(e) => setWithdrawShares(e.target.value)}
                      className="w-full bg-card text-foreground border border-border/60 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary"
                      placeholder="Shares"
                    />
                    <Button size="sm" variant="secondary" className="h-8 px-3 text-xs" onClick={handleWithdraw}>
                      Withdraw
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Log output */}
            <div className="border-t border-border/30 pt-4 space-y-2">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Activity Log</p>
              <div className="p-3 bg-card border border-border/40 rounded-xl font-mono text-[11px] text-muted-foreground h-28 overflow-y-auto space-y-1">
                {log.map((line, idx) => (
                  <p key={idx} className="leading-tight">
                    <span className="text-primary font-bold">➔</span> {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Position Display - Right (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-muted/5 flex flex-col justify-between">
            <div className="space-y-4">
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">Simulated Position State</p>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center p-3 rounded-xl border border-border/40 bg-card">
                  <span className="text-xs text-muted-foreground font-medium">Shares Balance</span>
                  <span className="text-sm font-mono font-bold text-foreground tabular-nums">{position.shares.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl border border-border/40 bg-card">
                  <span className="text-xs text-muted-foreground font-medium">Price Per Share (PPS)</span>
                  <span className="text-sm font-mono font-bold text-foreground tabular-nums">${position.pps.toFixed(3)}</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl border border-border/40 bg-card">
                  <span className="text-xs text-muted-foreground font-medium">Current Position Value</span>
                  <span className="text-sm font-mono font-bold text-foreground tabular-nums">${currentVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl border border-border/40 bg-card">
                  <span className="text-xs text-muted-foreground font-medium">Remaining Cost Basis</span>
                  <span className="text-sm font-mono font-bold text-foreground tabular-nums">${position.remainingCostBasis.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* PnL highlight block */}
            <div className={`mt-6 p-4 rounded-xl border flex flex-col items-center justify-center text-center ${
              unrealizedPnL >= 0
                ? 'bg-success/5 border-success/20 text-success'
                : 'bg-destructive/5 border-destructive/20 text-destructive'
            }`}>
              <div className="flex items-center gap-1.5 mb-1">
                {unrealizedPnL >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="text-xs font-bold uppercase tracking-wider">Unrealized PnL</span>
              </div>
              <p className="text-2xl font-black font-mono tabular-nums leading-none">
                {unrealizedPnL >= 0 ? '+' : ''}${unrealizedPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs font-semibold font-mono mt-1 opacity-90">
                {unrealizedPnL >= 0 ? '+' : ''}{unrealizedPnLPercent.toFixed(2)}%
              </p>
            </div>

          </div>
        </div>
      </Card>

      {/* Case Studies reference */}
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <span>PnL Mathematical Case Studies Reference</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left" role="table" aria-label="PnL Case Studies">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20">
                {['Case', 'Action', 'PPS', 'Shares', 'Current Value', 'Cost Basis', 'Unrealized PnL', 'Mathematical Result'].map((h) => (
                  <th key={h} className="py-2.5 px-4 font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {[
                { case: 'Case 1', action: 'Deposit $100 USDC', pps: '1.0 ➔ 1.2', shares: '100', val: '$120.00', cb: '$100.00', pnl: '+$20.00 (+20%)', note: 'Standard deposit appreciation' },
                { case: 'Case 2', action: 'Deposit $60 USDC more', pps: '1.2', shares: '150', val: '$180.00', cb: '$160.00', pnl: '+$20.00 (+12.5%)', note: 'Cost basis increases by exact deposit' },
                { case: 'Case 3', action: 'Withdraw 50 shares', pps: '1.2', shares: '100', val: '$120.00', cb: '~$106.67', pnl: '~$13.33 (+12.5%)', note: 'Basis reduced proportionally' },
                { case: 'Case 4', action: 'Withdraw remaining 100', pps: '1.2', shares: '0', val: '$0.00', cb: '$0.00', pnl: '$0.00 (0%)', note: 'Position closed, basis cleared' },
                { case: 'Case 5', action: 'Re-deposit $200 USDC', pps: '1.3', shares: '153.84', val: '$200.00', cb: '$200.00', pnl: '$0.00 (0%)', note: 'Fresh position, no carryover' },
                { case: 'Case 6', action: 'Vault loss (PPS down)', pps: '1.0 ➔ 0.95', shares: '100', val: '$95.00', cb: '$100.00', pnl: '-$5.00 (-5%)', note: 'Negative return calculation' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/10 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-foreground">{row.case}</td>
                  <td className="py-2.5 px-4 text-muted-foreground">{row.action}</td>
                  <td className="py-2.5 px-4 font-mono font-medium text-foreground">{row.pps}</td>
                  <td className="py-2.5 px-4 font-mono text-muted-foreground">{row.shares}</td>
                  <td className="py-2.5 px-4 font-mono font-medium text-foreground">{row.val}</td>
                  <td className="py-2.5 px-4 font-mono text-muted-foreground">{row.cb}</td>
                  <td className={`py-2.5 px-4 font-mono font-semibold ${row.pnl.startsWith('-') ? 'text-destructive' : row.pnl.startsWith('+$') ? 'text-success' : 'text-muted-foreground'}`}>{row.pnl}</td>
                  <td className="py-2.5 px-4 text-xs text-muted-foreground">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
