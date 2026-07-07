import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip as ReTooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/shared/lib/utils'

type TimeTab = '1D' | '7D' | '30D' | '90D' | 'ALL'

const DATA: Record<TimeTab, { month: string; portfolioValue: number; netDeposited: number }[]> = {
  '1D': [
    { month: '00:00', portfolioValue: 223_100, netDeposited: 200_000 },
    { month: '04:00', portfolioValue: 223_180, netDeposited: 200_000 },
    { month: '08:00', portfolioValue: 223_260, netDeposited: 200_000 },
    { month: '12:00', portfolioValue: 223_340, netDeposited: 200_000 },
    { month: '16:00', portfolioValue: 223_400, netDeposited: 200_000 },
    { month: '20:00', portfolioValue: 223_450, netDeposited: 200_000 },
  ],
  '7D': [
    { month: 'Mon', portfolioValue: 222_000, netDeposited: 200_000 },
    { month: 'Tue', portfolioValue: 222_400, netDeposited: 200_000 },
    { month: 'Wed', portfolioValue: 222_100, netDeposited: 200_000 },
    { month: 'Thu', portfolioValue: 222_800, netDeposited: 200_000 },
    { month: 'Fri', portfolioValue: 223_200, netDeposited: 200_000 },
    { month: 'Sat', portfolioValue: 223_300, netDeposited: 200_000 },
    { month: 'Sun', portfolioValue: 223_450, netDeposited: 200_000 },
  ],
  '30D': [
    { month: 'Jun 1',  portfolioValue: 218_400, netDeposited: 200_000 },
    { month: 'Jun 8',  portfolioValue: 219_600, netDeposited: 200_000 },
    { month: 'Jun 15', portfolioValue: 220_900, netDeposited: 200_000 },
    { month: 'Jun 22', portfolioValue: 222_100, netDeposited: 200_000 },
    { month: 'Jun 26', portfolioValue: 223_450, netDeposited: 200_000 },
  ],
  '90D': [
    { month: 'Apr', portfolioValue: 213_100, netDeposited: 200_000 },
    { month: 'May', portfolioValue: 218_400, netDeposited: 200_000 },
    { month: 'Jun', portfolioValue: 223_450, netDeposited: 200_000 },
  ],
  'ALL': [
    { month: 'Jan', portfolioValue: 200_000, netDeposited: 200_000 },
    { month: 'Feb', portfolioValue: 204_200, netDeposited: 200_000 },
    { month: 'Mar', portfolioValue: 208_500, netDeposited: 200_000 },
    { month: 'Apr', portfolioValue: 213_100, netDeposited: 200_000 },
    { month: 'May', portfolioValue: 218_400, netDeposited: 200_000 },
    { month: 'Jun', portfolioValue: 223_450, netDeposited: 200_000 },
  ],
}

interface PortfolioChartProps {
  data?: unknown[]
  isLoading?: boolean
}

export function PortfolioChart({ isLoading }: PortfolioChartProps) {
  const [activeTab, setActiveTab] = React.useState<TimeTab>('ALL')
  const tabs: TimeTab[] = ['1D', '7D', '30D', '90D', 'ALL']
  const chartData = DATA[activeTab]

  const lastPoint = chartData[chartData.length - 1]
  const pnl = lastPoint.portfolioValue - lastPoint.netDeposited
  const pnlPct = ((pnl / lastPoint.netDeposited) * 100).toFixed(2)

  if (isLoading) {
    return <div className="h-[200px] rounded-xl bg-muted animate-pulse" />
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-sm font-semibold text-foreground">Portfolio Performance</span>
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

      <div className="h-44" aria-label="Portfolio performance chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="hsl(var(--success))" stopOpacity={0.22} />
                <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `$${Math.round(v / 1000)}K`}
              domain={[195_000, 230_000]}
              width={44}
            />
            <ReTooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const portfolio = (payload.find(p => p.dataKey === 'portfolioValue')?.value as number) ?? 0
                const deposited = (payload.find(p => p.dataKey === 'netDeposited')?.value as number) ?? 0
                const gain = portfolio - deposited
                const gainPct = deposited > 0 ? ((gain / deposited) * 100).toFixed(2) : '0.00'
                return (
                  <div style={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '12px',
                  }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'hsl(var(--primary))' }} />
                      <span style={{ color: 'hsl(var(--muted-foreground))' }}>Portfolio</span>
                      <span style={{ fontWeight: 600, color: 'hsl(var(--foreground))' }}>${portfolio.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'hsl(var(--muted-foreground))' }} />
                      <span style={{ color: 'hsl(var(--muted-foreground))' }}>Cost Basis</span>
                      <span style={{ fontWeight: 600, color: 'hsl(var(--foreground))' }}>${deposited.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'hsl(var(--success))' }} />
                      <span style={{ color: 'hsl(var(--muted-foreground))' }}>PnL</span>
                      <span style={{ fontWeight: 600, color: 'hsl(var(--success))' }}>+${gain.toLocaleString()} (+{gainPct}%)</span>
                    </div>
                  </div>
                )
              }}
            />
            <Area type="monotone" dataKey="portfolioValue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#gradPortfolio)" dot={false} />
            <Area type="monotone" dataKey="netDeposited" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} fill="transparent" strokeDasharray="4 2" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-5 text-xs flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary inline-block" aria-hidden />
          <span className="text-muted-foreground">Portfolio Value</span>
          <span className="font-semibold text-foreground">${lastPoint.portfolioValue.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted-foreground inline-block" aria-hidden />
          <span className="text-muted-foreground">Cost Basis</span>
          <span className="font-semibold text-foreground">${lastPoint.netDeposited.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-success inline-block" aria-hidden />
          <span className="text-muted-foreground">PnL</span>
          <span className="font-semibold text-success">+${pnl.toLocaleString()} (+{pnlPct}%)</span>
        </div>
      </div>
    </div>
  )
}
