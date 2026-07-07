import React from 'react'
import { Link } from 'react-router-dom'
import {
  Download, ArrowRight, ArrowUpRight, Eye, Bell,
  Gift, Sun, Moon, Shield, Users, ChevronRight,
  Settings, TrendingUp, Activity, BarChart2, ExternalLink, Info, Github, BookOpen,
} from 'lucide-react'
import { motion, useReducedMotion, type Easing } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip as ReTooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import { useTheme } from '@/shared/context/ThemeContext'
import { Button, Badge, Card, CardContent, CardHeader, Tooltip } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { usePortfolio } from '@/features/portfolio/hooks/usePortfolio'

// ─── Mock chart data ──────────────────────────────────────────────────────────

const PERFORMANCE_DATA = [
  { month: 'Jan', portfolioValue: 200000, netDeposited: 200000, pnl: 0 },
  { month: 'Feb', portfolioValue: 204200, netDeposited: 200000, pnl: 4200 },
  { month: 'Mar', portfolioValue: 208500, netDeposited: 200000, pnl: 8500 },
  { month: 'Apr', portfolioValue: 213100, netDeposited: 200000, pnl: 13100 },
  { month: 'May', portfolioValue: 218400, netDeposited: 200000, pnl: 18400 },
  { month: 'Jun', portfolioValue: 223450, netDeposited: 200000, pnl: 23450 },
]

const SPARKLINE_TVL = [140, 142, 139, 144, 146, 148, 148.62]
const SPARKLINE_DEP = [33000, 33400, 33600, 33900, 34100, 34251]

const VAULT_CARDS = [
  {
    id: 'haUSDC-core',
    name: 'haUSDC Core',
    category: 'Stablecoin',
    apy: 18.20,
    risk: 'low' as const,
    tvl: '$32.5M',
    depositors: '12.3K',
    description: 'Delta-neutral strategy with institutional yield.',
    asset: 'U',
    yieldSources: [
      { label: 'Lending', pct: 45 },
      { label: 'Funding Strategies', pct: 35 },
      { label: 'Incentives', pct: 20 },
    ],
    rewards: [
      { label: 'Hyperliquid', initials: 'HL', color: 'bg-blue-500' },
      { label: 'Harmonix', initials: 'HX', color: 'bg-primary' },
    ],
    depositTokens: [
      { label: 'USDC', color: 'bg-blue-500', textColor: 'text-white' },
      { label: 'haUSDC', color: 'bg-slate-800', textColor: 'text-white' },
    ],
  },
  {
    id: 'hype-yield-vault',
    name: 'HYPE Yield Vault',
    category: 'Yield',
    apy: 21.45,
    risk: 'medium' as const,
    tvl: '$16.2M',
    depositors: '8.1K',
    description: 'Active strategy capturing HyperEVM ecosystem yield.',
    asset: 'H',
    yieldSources: [
      { label: 'Funding Rates', pct: 50 },
      { label: 'Liquidity Provision', pct: 30 },
      { label: 'Staking', pct: 20 },
    ],
    rewards: [
      { label: 'Hyperliquid', initials: 'HL', color: 'bg-blue-500' },
      { label: 'Harmonix', initials: 'HX', color: 'bg-primary' },
      { label: 'Felix', initials: 'FX', color: 'bg-teal-500' },
    ],
    depositTokens: [
      { label: 'HYPE', color: 'bg-blue-600', textColor: 'text-white' },
    ],
  },
  {
    id: 'rwa-income-vault',
    name: 'RWA Income Vault',
    category: 'RWA',
    apy: 9.75,
    risk: 'low' as const,
    tvl: '$18.6M',
    depositors: '6.7K',
    description: 'Real-world yield from vetted credit strategies.',
    asset: 'R',
    yieldSources: [
      { label: 'Credit Strategies', pct: 60 },
      { label: 'Treasury Bills', pct: 25 },
      { label: 'Incentives', pct: 15 },
    ],
    rewards: [
      { label: 'Harmonix', initials: 'HX', color: 'bg-primary' },
    ],
    depositTokens: [
      { label: 'USDC', color: 'bg-blue-500', textColor: 'text-white' },
      { label: 'USDT', color: 'bg-emerald-500', textColor: 'text-white' },
    ],
  },
]

const ACTIVITY_ITEMS = [
  { id: 'a1', type: 'deposit',    label: 'Deposit',              vault: 'haUSDC Core',       amount: '+5,000 USDC',  amountClass: 'text-success',    time: '2h ago' },
  { id: 'a2', type: 'earnings',   label: 'Earnings',             vault: 'HYPE Yield Vault',  amount: '+18.42 HYPE',  amountClass: 'text-success',    time: '6h ago' },
  { id: 'a3', type: 'withdraw',   label: 'Withdrawal Requested', vault: 'RWA Income Vault',  amount: '-12,500 USDC', amountClass: 'text-destructive', time: '1d ago' },
  { id: 'a4', type: 'complete',   label: 'Auto Withdraw Completed', vault: 'haUSDC Core',    amount: '+12,500 USDC', amountClass: 'text-success',    time: '2d ago' },
  { id: 'a5', type: 'rewards',    label: 'Rewards Claimed',      vault: 'Valantis Points',   amount: '+250 pts',     amountClass: 'text-primary',    time: '2d ago' },
]

const EARNINGS_SLICES = [
  { name: 'haUSDC Core',       value: 12300.45, pct: 52.5 },
  { name: 'HYPE Yield Vault',  value: 8400.22,  pct: 35.8 },
  { name: 'RWA Income Vault',  value: 2750.01,  pct: 11.7 },
]

const DONUT_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--success))',
  'hsl(var(--warning))',
]

const ACTIVITY_DOT: Record<string, string> = {
  deposit:  'bg-success',
  earnings: 'bg-primary',
  withdraw: 'bg-destructive',
  complete: 'bg-success',
  rewards:  'bg-warning',
}

// ─── Fade-in-up animation variant ────────────────────────────────────────────

const EASE_OUT: Easing = 'easeOut'

function fadeInUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, ease: EASE_OUT, delay },
  }
}

// ─── Section 0: Announcement bar ─────────────────────────────────────────────

function AnnouncementBar() {
  return (
    <div className="w-full bg-primary text-primary-foreground text-sm py-2 px-6 flex items-center justify-between">
      <span>🎉 Valantis points are live! Earn points on every deposit and invite.</span>
      <Link to="/rewards" className="font-semibold underline-offset-2 hover:underline whitespace-nowrap ml-4">
        Learn more →
      </Link>
    </div>
  )
}

// ─── Section 1: Page header row ──────────────────────────────────────────────

function PageHeader() {
  const { resolved, setTheme } = useTheme()
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back 👋</h1>
        <p className="text-sm text-muted-foreground">Here's your portfolio overview</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}
          className="flex items-center justify-center h-8 w-8 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label={resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {resolved === 'dark'
            ? <Sun className="h-3.5 w-3.5" aria-hidden />
            : <Moon className="h-3.5 w-3.5" aria-hidden />
          }
        </button>
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground">
          <Gift className="h-3.5 w-3.5 text-primary" aria-hidden />
          2,450 pts
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground">
          HyperEVM
          <ChevronRight className="h-3 w-3 text-muted-foreground rotate-90" aria-hidden />
        </div>
        <div className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-mono text-muted-foreground">
          0x3e...8795
        </div>
      </div>
    </div>
  )
}

// ─── Section 2: Portfolio overview ───────────────────────────────────────────

type TimeTab = '1D' | '7D' | '30D' | '90D' | 'ALL'

interface PortfolioOverviewProps {
  totalValueFormatted: string
  totalEarnedFormatted: string
  pnlPercent: number
  isLoading: boolean
}

function PortfolioOverviewSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[55fr_45fr]">
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4 animate-pulse">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-10 w-48 rounded bg-muted" />
        <div className="grid grid-cols-3 gap-4">
          {[0,1,2].map(i => <div key={i} className="h-12 rounded bg-muted" />)}
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 animate-pulse">
        <div className="h-4 w-40 rounded bg-muted mb-4" />
        <div className="h-40 rounded bg-muted" />
      </div>
    </div>
  )
}

function PortfolioChartCard() {
  const [activeTab, setActiveTab] = React.useState<TimeTab>('ALL')
  const tabs: TimeTab[] = ['1D', '7D', '30D', '90D', 'ALL']

  return (
    <Card className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-sm font-semibold text-foreground">Portfolio performance</span>
        <div className="flex items-center gap-1">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                activeTab === t
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
              aria-pressed={activeTab === t}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="h-40" aria-label="Portfolio performance chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PERFORMANCE_DATA} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradPnlGap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="hsl(var(--success))" stopOpacity={0.22} />
                <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false} tickLine={false}
              tickFormatter={(v: number) => `$${Math.round(v / 1000)}K`}
              domain={[120000, 240000]}
              width={44}
            />
            <ReTooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const portfolio = Number(payload.find(p => p.dataKey === 'portfolioValue')?.value ?? 0)
                const deposited = Number(payload.find(p => p.dataKey === 'netDeposited')?.value ?? 0)
                const pnl = portfolio - deposited
                const pnlPct = deposited > 0 ? ((pnl / deposited) * 100).toFixed(2) : '0.00'
                return (
                  <div style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', padding: '8px 12px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'hsl(var(--primary))', flexShrink: 0 }} />
                      <span style={{ color: 'hsl(var(--muted-foreground))' }}>Portfolio Value</span>
                      <span style={{ fontWeight: 600, color: 'hsl(var(--foreground))' }}>${portfolio.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'hsl(var(--muted-foreground))', flexShrink: 0 }} />
                      <span style={{ color: 'hsl(var(--muted-foreground))' }}>Cost Basis</span>
                      <span style={{ fontWeight: 600, color: 'hsl(var(--foreground))' }}>${deposited.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'hsl(var(--success))', flexShrink: 0 }} />
                      <span style={{ color: 'hsl(var(--muted-foreground))' }}>PnL</span>
                      <span style={{ fontWeight: 600, color: 'hsl(var(--success))' }}>+${pnl.toLocaleString()} (+{pnlPct}%)</span>
                    </div>
                  </div>
                )
              }}
            />
            <Area type="monotone" dataKey="portfolioValue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#gradPnlGap)" dot={false} />
            <Area type="monotone" dataKey="netDeposited" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} fill="none" strokeDasharray="4 2" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-5 text-xs flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary inline-block" aria-hidden />
          <span className="text-muted-foreground">Portfolio Value</span>
          <span className="font-semibold text-foreground">$223,450.68</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground inline-block" aria-hidden />
          <span className="text-muted-foreground">Cost Basis</span>
          <span className="font-semibold text-foreground">$200,000.00</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-success inline-block" aria-hidden />
          <span className="text-muted-foreground">PnL</span>
          <span className="font-semibold text-success">+$23,450.68 <span className="font-normal text-muted-foreground">(+11.72%)</span></span>
        </div>
      </div>
    </Card>
  )
}

function PortfolioValueCard({ }: Omit<PortfolioOverviewProps, 'isLoading'>) {
  return (
    <Card className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">Portfolio Value</span>
        <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle visibility">
          <Eye className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div>
        <p className="text-4xl font-black text-foreground tabular-nums leading-none">$223,450.68</p>
        <p className="text-sm text-success mt-1.5">+$142.35 (0.06%) today</p>
      </div>

      <div className="grid grid-cols-2 gap-3 py-4 border-y border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Cost Basis</p>
          <p className="text-sm font-bold text-foreground tabular-nums">$200,000.00</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Total Earning (PnL)</p>
          <p className="text-sm font-bold text-success tabular-nums">+$23,450.68 <span className="font-normal text-xs">(+11.72%)</span></p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/portfolio">
            View portfolio <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </Card>
  )
}

function PortfolioOverview({ isLoading, totalValueFormatted, totalEarnedFormatted, pnlPercent }: PortfolioOverviewProps) {
  const shouldReduce = useReducedMotion()
  if (isLoading) return <PortfolioOverviewSkeleton />

  return (
    <motion.div
      {...(shouldReduce ? {} : fadeInUp(0.05))}
      className="grid grid-cols-1 gap-4 lg:grid-cols-[55fr_45fr]"
    >
      <PortfolioValueCard
        totalValueFormatted={totalValueFormatted}
        totalEarnedFormatted={totalEarnedFormatted}
        pnlPercent={pnlPercent}
      />
      <PortfolioChartCard />
    </motion.div>
  )
}

// ─── Section 3: Recommended vaults ───────────────────────────────────────────

const RISK_LABEL: Record<'low' | 'medium' | 'high', string> = {
  low: 'LOW RISK',
  medium: 'MEDIUM RISK',
  high: 'HIGH RISK',
}

interface VaultCardItemProps {
  id: string
  name: string
  category: string
  apy: number
  risk: 'low' | 'medium' | 'high'
  tvl: string
  depositors: string
  description: string
  asset: string
  yieldSources: { label: string; pct: number }[]
  rewards: { label: string; initials: string; color: string }[]
  depositTokens: { label: string; color: string; textColor: string }[]
}

function VaultCardItem({ id, name, category, apy, risk, tvl, depositors, description, asset, yieldSources, rewards, depositTokens }: VaultCardItemProps) {
  const depositLabel = `Deposit ${depositTokens.map(t => t.label).join('/')}`

  return (
    <Card className="rounded-2xl border border-border bg-card flex flex-col relative overflow-hidden">
      <Link
        to={`/earn/${id}`}
        className="absolute top-3 right-3 p-1.5 rounded-full border border-border bg-card hover:bg-accent transition-colors"
        aria-label={`View ${name}`}
      >
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      </Link>

      <CardContent className="p-5 flex flex-col gap-3 flex-1">
        {/* Header: badge + name */}
        <div>
          <Badge variant={risk} className="text-xs mb-2">{RISK_LABEL[risk]}</Badge>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-black text-primary ring-1 ring-primary/20 shrink-0">
              {asset}
            </div>
            <div>
              <p className="text-xl font-bold text-foreground leading-tight">{name}</p>
              <p className="text-xs text-muted-foreground">{category}</p>
            </div>
          </div>
        </div>

        {/* APY + Description (left) | Yield bars (right) — true 2-col grid */}
        <div className="grid grid-cols-2 gap-4 items-start flex-1">
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-3xl font-black text-primary tabular-nums leading-none">{apy.toFixed(2)}%</p>
            <p className="text-xs text-muted-foreground">APY</p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">{description}</p>
          </div>
          <div className="flex flex-col gap-1.5 pt-0.5 min-w-0 overflow-hidden pr-2">
            {yieldSources.map(s => (
              <div key={s.label} className="w-full space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{s.pct}%</span>
                  <span className="truncate ml-1">{s.label}</span>
                </div>
                <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-muted-foreground/30" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider + stats + rewards row */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                TVL {tvl}
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" aria-hidden />
                {depositors} depositors
              </div>
            </div>
            {/* Rewards — right-aligned */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="mr-1">Rewards</span>
              <div className="flex items-center -space-x-1">
                {rewards.map((r, i) => (
                  <Tooltip key={r.label} content={r.label}>
                    <div
                      className="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-bold text-muted-foreground bg-muted border border-border ring-1 ring-card"
                      style={{ zIndex: rewards.length - i }}
                    >
                      {r.initials}
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button variant="primary" size="sm" className="w-full" asChild>
          <Link to={`/earn/${id}`}>
            <Download className="h-4 w-4" aria-hidden />
            {depositLabel}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function RecommendedSection() {
  const shouldReduce = useReducedMotion()
  return (
    <motion.section
      {...(shouldReduce ? {} : fadeInUp(0.1))}
      aria-labelledby="recommended-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="recommended-heading" className="text-xl font-bold text-foreground">Recommended for you</h2>
          <p className="text-sm text-muted-foreground">Opportunities tailored to your portfolio and market conditions.</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/earn" className="text-sm">View all vaults →</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {VAULT_CARDS.slice(0, 2).map(v => (
          <VaultCardItem key={v.id} {...v} />
        ))}
      </div>
    </motion.section>
  )
}

// ─── Section 4: Protocol health ──────────────────────────────────────────────

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = 56
  const h = 24
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={w} height={h} aria-hidden viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProtocolHealthSection() {
  const shouldReduce = useReducedMotion()

  return (
    <motion.section
      {...(shouldReduce ? {} : fadeInUp(0.15))}
      aria-labelledby="protocol-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="protocol-heading" className="text-xl font-bold text-foreground">Protocol health</h2>
          <p className="text-sm text-muted-foreground">Key metrics that keep Harmonix strong and transparent.</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/earn" className="text-sm">View all metrics →</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {/* TVL */}
        <Card className="rounded-2xl border border-border bg-card p-4 relative">
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-muted-foreground">Total Value Locked</p>
            <Tooltip content="Total assets deposited across all Harmonix vaults">
              <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Total Value Locked info">
                <Info className="h-3.5 w-3.5" aria-hidden />
              </button>
            </Tooltip>
          </div>
          <p className="text-xl font-bold text-foreground tabular-nums">$148.62M</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-success">+4.32% (24h)</p>
            <MiniSparkline data={SPARKLINE_TVL} color="hsl(var(--success))" />
          </div>
        </Card>

        {/* Active Depositors */}
        <Card className="rounded-2xl border border-border bg-card p-4 relative">
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-muted-foreground">Active Depositors</p>
            <Tooltip content="Unique wallets with active deposits in the last 30 days">
              <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Active Depositors info">
                <Info className="h-3.5 w-3.5" aria-hidden />
              </button>
            </Tooltip>
          </div>
          <p className="text-xl font-bold text-foreground tabular-nums">34,251</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-success">+2.81% (24h)</p>
            <MiniSparkline data={SPARKLINE_DEP} color="hsl(var(--primary))" />
          </div>
        </Card>

        {/* Vaults */}
        <Card className="rounded-2xl border border-border bg-card p-4 relative">
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-muted-foreground">Vaults</p>
            <Tooltip content="Number of active yield vaults currently open for deposits">
              <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Vaults info">
                <Info className="h-3.5 w-3.5" aria-hidden />
              </button>
            </Tooltip>
          </div>
          <p className="text-xl font-bold text-foreground tabular-nums">42</p>
          <p className="text-xs text-muted-foreground mt-2">Live &amp; secure</p>
        </Card>

        {/* Audited */}
        <Card className="rounded-2xl border border-border bg-card p-4 relative">
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-muted-foreground">Audited</p>
            <Tooltip content="Independent security audits by CertIK, Salus, and PeckShield">
              <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Audited info">
                <Info className="h-3.5 w-3.5" aria-hidden />
              </button>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-success shrink-0" aria-hidden />
            <p className="text-xl font-bold text-foreground tabular-nums">7 Audits</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">CertIK, Salus, PeckShield</p>
        </Card>

        {/* Withdraw SLA */}
        <Card className="rounded-2xl border border-border bg-card p-4 relative">
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-muted-foreground">Withdraw SLA</p>
            <Tooltip content="Average time from withdrawal request to funds received in wallet">
              <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Withdraw SLA info">
                <Info className="h-3.5 w-3.5" aria-hidden />
              </button>
            </Tooltip>
          </div>
          <p className="text-xl font-bold text-foreground tabular-nums">≤ 3 days</p>
          <p className="text-xs text-muted-foreground mt-2">Average completion time</p>
        </Card>
      </div>
    </motion.section>
  )
}

// ─── Section 5: Action banner ─────────────────────────────────────────────────

const ATTENTION_ITEMS = [
  {
    id: 'b1',
    title: 'Withdrawal in progress',
    vault: 'From haUSDC Core',
    amount: '$12,500.00',
    eta: 'Estimated completion Jun 28, 2026 - 14:30 UTC',
    href: '/portfolio',
  },
]

function ActionBanner() {
  const shouldReduce = useReducedMotion()
  const item = ATTENTION_ITEMS[0]
  const total = ATTENTION_ITEMS.length

  return (
    <motion.section
      {...(shouldReduce ? {} : fadeInUp(0.2))}
      aria-label="Items needing attention"
      className="space-y-2"
    >
      {/* Withdrawal card */}
      <div className="flex items-center gap-4 rounded-2xl border border-warning/20 bg-warning/5 px-5 py-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Bell className="h-5 w-5 text-primary" aria-hidden />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground">
            You have {total + 1} items that need your attention
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{item.title}</span>
            <span>·</span>
            <span>{item.amount} {item.vault}</span>
            <span>·</span>
            <span>{item.eta}</span>
          </div>
        </div>

        <Link
          to={item.href}
          className="shrink-0 text-sm font-semibold text-foreground hover:text-primary flex items-center gap-1 whitespace-nowrap border border-border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors"
        >
          View details <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      {/* Reward card */}
      <div
        className="flex items-center gap-4 rounded-2xl border border-warning/20 bg-warning/5 px-5 py-4"
        role="alert"
        aria-label="Reward available to claim"
      >
        <div className="h-10 w-10 rounded-full bg-success/10 border border-success/20 flex items-center justify-center shrink-0">
          <Gift className="h-5 w-5 text-success" aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground leading-tight">Reward available to claim</p>
          <p className="text-xs text-muted-foreground mt-0.5">$174.50 USDC in yield bonuses ready</p>
        </div>
        <Link
          to="/rewards?tab=history"
          className="shrink-0 text-sm font-semibold text-foreground hover:text-success flex items-center gap-1 whitespace-nowrap border border-border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors"
        >
          Claim now <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </motion.section>
  )
}

// ─── Section 6a: Recent activity ─────────────────────────────────────────────

function RecentActivityCard() {
  return (
    <Card className="rounded-2xl border border-border bg-card flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Recent activity</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/portfolio" className="text-sm">View all →</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <ul className="divide-y divide-border" aria-label="Recent activity list">
          {ACTIVITY_ITEMS.map(item => (
            <li key={item.id} className="flex items-center gap-3 px-6 py-3.5">
              <span className={cn('h-2.5 w-2.5 rounded-full shrink-0', ACTIVITY_DOT[item.type])} aria-hidden />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-tight">{item.label}</p>
                <p className="text-xs text-muted-foreground truncate">{item.vault}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={cn('text-sm font-bold tabular-nums', item.amountClass)}>{item.amount}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-6 py-3 border-t border-border">
          <Link to="/portfolio/analytics" className="text-sm font-medium text-primary hover:underline underline-offset-2">
            View all activity →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Section 6b: Earnings breakdown ──────────────────────────────────────────

function EarningsBreakdownCard() {
  return (
    <Card className="rounded-2xl border border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Earnings breakdown</h2>
          <span className="text-xs text-muted-foreground border border-border rounded-md px-2 py-1">All time</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-2xl font-black text-success tabular-nums">+$23,450.68</p>
        <p className="text-xs text-muted-foreground mb-4">Total earnings</p>

        <div className="flex items-center gap-4">
          {/* Donut chart */}
          <div className="shrink-0" style={{ width: 80, height: 80 }}>
            <PieChart width={80} height={80} aria-label="Earnings by vault">
              <Pie
                data={EARNINGS_SLICES}
                cx={35}
                cy={35}
                innerRadius={22}
                outerRadius={35}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {EARNINGS_SLICES.map((_, i) => (
                  <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} style={{ outline: 'none' }} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Legend */}
          <ul className="flex-1 space-y-1.5" aria-label="Earnings by vault legend">
            {EARNINGS_SLICES.map((s, i) => (
              <li key={s.name} className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }}
                    aria-hidden
                  />
                  <span className="text-muted-foreground truncate">{s.name}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-semibold text-foreground">+${s.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="text-muted-foreground ml-1">({s.pct}%)</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <Link to="/portfolio/analytics" className="text-sm font-medium text-primary hover:underline underline-offset-2">
            View full analytics →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Section 6c: Insights ─────────────────────────────────────────────────────

function InsightsCard() {
  const insights = [
    {
      id: 'i1',
      title: 'Your portfolio is performing well',
      body: 'Your total earnings are 11.72% on your net deposited amount.',
      icon: <BarChart2 className="h-8 w-8 text-primary" aria-hidden />,
    },
    {
      id: 'i2',
      title: 'Diversify to optimize yields',
      body: 'Explore new strategies to improve your risk-adjusted returns.',
      icon: <Activity className="h-8 w-8 text-success" aria-hidden />,
    },
  ]

  return (
    <Card className="rounded-2xl border border-border bg-card">
      <CardHeader className="pb-3">
        <h2 className="text-xl font-bold text-foreground">Insights for you</h2>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {insights.map((insight, i) => (
          <div
            key={insight.id}
            className={cn('flex items-start gap-4', i > 0 && 'pt-4 border-t border-border')}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">{insight.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{insight.body}</p>
            </div>
            <div className="h-14 w-14 rounded-xl border border-border bg-muted/30 flex items-center justify-center shrink-0">
              {insight.icon}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function TwoColumnSection() {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      {...(shouldReduce ? {} : fadeInUp(0.25))}
      className="grid grid-cols-1 gap-4 lg:grid-cols-[55fr_45fr]"
    >
      <RecentActivityCard />
      <div className="flex flex-col gap-4">
        <EarningsBreakdownCard />
        <InsightsCard />
      </div>
    </motion.div>
  )
}

// ─── Section 7: Sticky bottom CTA bar ────────────────────────────────────────

function StickyBottomCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-6 py-3"
      role="complementary"
      aria-label="Earn more prompt"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Settings className="h-4 w-4 text-primary-foreground" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-foreground leading-tight">Earn more with idle assets</p>
            <p className="text-xs text-muted-foreground truncate">
              You have 2,430 USDC in your wallet. Deposit now to start earning.
            </p>
          </div>
        </div>
        <Button variant="primary" size="sm" asChild className="shrink-0">
          <Link to="/earn">
            <Download className="h-4 w-4" aria-hidden />
            Deposit USDC
          </Link>
        </Button>
      </div>
    </div>
  )
}

// ─── Section 8: Treasury stats ───────────────────────────────────────────────

function HarProgressBar({ bought, sold, target }: { bought: number; sold: number; target: number }) {
  const net = bought - sold
  const netPct = Math.min((net / target) * 100, 100)
  const soldPct = Math.min((sold / target) * 100, 100)
  const bars = 60
  return (
    <div className="flex gap-[2px] my-3" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const pct = ((i + 1) / bars) * 100
        let color = 'bg-border'
        if (pct <= netPct) color = 'bg-primary'
        else if (pct <= netPct + soldPct) color = 'bg-warning'
        return <div key={i} className={cn('flex-1 h-4 rounded-sm', color)} />
      })}
    </div>
  )
}

function HypeProgressBar({ amount, target }: { amount: number; target: number }) {
  const pct = Math.min((amount / target) * 100, 100)
  const bars = 60
  return (
    <div className="flex gap-[2px] my-3" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const barPct = ((i + 1) / bars) * 100
        const filled = barPct <= pct
        const color = filled
          ? i < bars * 0.3 ? 'bg-foreground' : 'bg-primary'
          : 'bg-border'
        return <div key={i} className={cn('flex-1 h-4 rounded-sm', color)} />
      })}
    </div>
  )
}

function TreasurySection() {
  const shouldReduce = useReducedMotion()
  return (
    <motion.section
      {...(shouldReduce ? {} : fadeInUp(0.25))}
      aria-labelledby="treasury-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="treasury-heading" className="text-xl font-bold text-foreground">Treasury stats</h2>
          <p className="text-sm text-muted-foreground">Protocol buyback program progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* HYPE bought card — swapped to first */}
        <Card className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
          <p className="text-xs text-muted-foreground mb-1">HYPE bought</p>
          <p className="text-3xl font-black text-foreground tabular-nums leading-tight">
            1,500 <span className="text-lg font-bold text-muted-foreground">$HYPE</span>
          </p>
          <HypeProgressBar amount={1500} target={6250} />
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-foreground shrink-0 inline-block" />
              <span className="text-muted-foreground w-14 shrink-0">Amount</span>
              <span className="font-semibold text-foreground">1,500 HYPE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary/40 shrink-0 inline-block" />
              <span className="text-muted-foreground w-14 shrink-0">Progress</span>
              <span className="font-semibold text-foreground">24%</span>
            </div>
          </div>
          {/* watermark */}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[72px] font-black text-muted-foreground/5 select-none pointer-events-none leading-none">HYPE</span>
        </Card>

        {/* Net HAR card — swapped to second */}
        <Card className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
          <p className="text-xs text-muted-foreground mb-1">Net HAR</p>
          <p className="text-3xl font-black text-foreground tabular-nums leading-tight">
            15,000,000 <span className="text-lg font-bold text-muted-foreground">$HAR</span>
          </p>
          <HarProgressBar bought={15680000} sold={680000} target={19000000} />
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary shrink-0 inline-block" />
              <span className="text-muted-foreground w-14 shrink-0">Bought</span>
              <span className="font-semibold text-foreground">15,680,000 HAR</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-warning shrink-0 inline-block" />
              <span className="text-muted-foreground w-14 shrink-0">Sold</span>
              <span className="font-semibold text-foreground">680,000 HAR</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary/40 shrink-0 inline-block" />
              <span className="text-muted-foreground w-14 shrink-0">Progress</span>
              <span className="font-semibold text-foreground">82%</span>
            </div>
          </div>
          {/* watermark */}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[72px] font-black text-muted-foreground/5 select-none pointer-events-none leading-none">HAR</span>
        </Card>

        {/* HAR price card */}
        <Card className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">HAR price</p>
            <p className="text-3xl font-black text-foreground tabular-nums">$0.002392</p>
          </div>
          <a
            href="https://app.hyperliquid.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Buy HAR
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
          <div className="space-y-2 text-sm border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Source</span>
              <span className="font-semibold text-foreground">HyperCore</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Updated</span>
              <span className="font-semibold text-foreground">25 Jun 2026, 20:17 UTC</span>
            </div>
          </div>
        </Card>

      </div>
    </motion.section>
  )
}

// ─── Section 9: Community + DefiLlama ────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    label: 'X (Twitter)',
    href: 'https://x.com/harmonixfi',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/harmonixfi',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/harmonixfi',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/harmonixfi',
    icon: <Github className="h-4 w-4" aria-hidden />,
  },
  {
    label: 'Docs',
    href: 'https://docs.harmonix.fi',
    icon: <BookOpen className="h-4 w-4" aria-hidden />,
  },
]

function CommunitySection() {
  const shouldReduce = useReducedMotion()
  return (
    <motion.section
      {...(shouldReduce ? {} : fadeInUp(0.3))}
      aria-labelledby="community-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="community-heading" className="text-xl font-bold text-foreground">Community & resources</h2>
          <p className="text-sm text-muted-foreground">Stay connected and track Harmonix across platforms.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        {/* DefiLlama card */}
        <a
          href="https://defillama.com/protocol/harmonix"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:bg-primary/5 transition-colors"
          aria-label="View Harmonix on DefiLlama"
        >
          <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center shrink-0 overflow-hidden">
            <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden fill="none">
              <rect width="40" height="40" rx="10" fill="#1a1a2e" />
              <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#00d395">🦙</text>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">DefiLlama</p>
            <p className="text-xs text-muted-foreground mt-0.5">Track Harmonix TVL, rankings, and protocol analytics in real-time</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success inline-block" />TVL tracked</span>
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />Rankings live</span>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" aria-hidden />
        </a>

        {/* Social icons */}
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-4">
          {SOCIAL_LINKS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-accent transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export function HomePage() {
  const { portfolio, isLoading } = usePortfolio()

  return (
    <>
      <AnnouncementBar />

      <div className="space-y-8 pb-24 pt-4" aria-busy={isLoading}>
        <PageHeader />

        <PortfolioOverview
          isLoading={isLoading}
          totalValueFormatted={portfolio?.totalValueFormatted ?? '$0'}
          totalEarnedFormatted={portfolio?.totalEarnedFormatted ?? '$0'}
          pnlPercent={portfolio?.pnlPercent ?? 0}
        />

        <RecommendedSection />

        <ProtocolHealthSection />

        <ActionBanner />

        <TwoColumnSection />

        <TreasurySection />

        <CommunitySection />
      </div>

      <StickyBottomCTA />
    </>
  )
}
