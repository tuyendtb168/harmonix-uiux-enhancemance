import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Clock, Unlock, RefreshCw } from 'lucide-react'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { Vault } from '@/features/vault/components/VaultCard'
import { DepositModal } from '@/features/vault/components/DepositModal'

const MOCK_VAULT: Vault & {
  strategyDetail: string
  allocationBreakdown: { label: string; percent: number; color: string }[]
  riskDetails: { title: string; body: string }[]
  withdrawalTime: string
  audited: boolean
  auditDate: string
  operator: string
  launchDate: string
} = {
  id: 'delta-neutral-usdc',
  name: 'Delta Neutral USDC',
  asset: 'USDC',
  apy: 12.4,
  tvl: 2400000,
  tvlFormatted: '$2.4M',
  risk: 'low',
  status: 'active',
  strategy: 'Delta Neutral',
  goal: 'delta-neutral',
  minDeposit: 100,
  description: 'Earn stable yield from funding rates with minimal directional risk. Capital protected through continuous hedging.',
  withdrawalTime: '2–3 days',
  apy30d: 12.1,
  apy90d: 11.8,
  strategyDetail: 'This vault maintains a delta-neutral position by simultaneously holding long and short exposure. Yield is generated from perpetual funding rates paid by directional traders. The strategy rebalances automatically to stay neutral, preserving capital in volatile conditions.',
  allocationBreakdown: [
    { label: 'Long Perps', percent: 48, color: 'bg-primary' },
    { label: 'Short Perps', percent: 48, color: 'bg-muted-foreground' },
    { label: 'Cash Reserve', percent: 4, color: 'bg-border' },
  ],
  riskDetails: [
    {
      title: 'Funding Rate Risk',
      body: 'Rates can turn negative in extreme market conditions, temporarily reducing yield.',
    },
    {
      title: 'Smart Contract Risk',
      body: 'All contracts are audited, but no code is 100% risk-free. Use only funds you can afford to allocate.',
    },
    {
      title: 'Operator Risk',
      body: 'Strategy performance depends on execution quality and rebalancing frequency by Harmonix.',
    },
  ],
  audited: true,
  auditDate: 'December 2024',
  operator: 'Harmonix',
  launchDate: 'January 2024',
}

const RISK_LABELS = { low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' }
const RISK_BADGE_VARIANT = { low: 'low' as const, medium: 'medium' as const, high: 'high' as const }

export function VaultDetailPage() {
  const { vaultId: _vaultId } = useParams<{ vaultId: string }>()
  const vault = MOCK_VAULT
  const [depositOpen, setDepositOpen] = useState(false)

  return (
    <div className="space-y-8 pb-24 sm:pb-0">
      {/* Back nav */}
      <Link
        to="/earn"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded"
        aria-label="Back to vaults"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to Vaults
      </Link>

      {/* Hero section — all critical info visible immediately */}
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-72 blur-3xl opacity-20" style={{ background: 'hsl(74 84% 56% / 0.12)' }} aria-hidden />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xl font-black text-primary ring-1 ring-primary/20">
                {vault.asset.slice(0, 1)}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl font-black text-foreground tracking-tight">{vault.name}</h1>
                  <Badge variant={RISK_BADGE_VARIANT[vault.risk]}>{RISK_LABELS[vault.risk]}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {vault.asset} · {vault.strategy} · by {vault.operator}
                </p>
              </div>
            </div>

            {/* Key metrics — 2x2 grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4 sm:gap-y-0">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">APY</p>
                <p className="text-2xl font-black text-primary tabular-nums">
                  {vault.apy.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Withdrawal
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" aria-hidden />
                  <p className="text-sm font-semibold text-foreground">{vault.withdrawalTime}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">TVL</p>
                <p className="text-sm font-semibold text-foreground tabular-nums mt-1">{vault.tvlFormatted}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Min Deposit
                </p>
                <p className="text-sm font-semibold text-foreground tabular-nums mt-1">${vault.minDeposit} {vault.asset}</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {vault.audited && (
                <div className="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/8 px-3 py-1 text-xs font-medium text-success">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                  Audited · {vault.auditDate}
                </div>
              )}
              <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Unlock className="h-3.5 w-3.5" aria-hidden />
                Self-custody · No lock-up
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                <RefreshCw className="h-3.5 w-3.5" aria-hidden />
                Auto-compound
              </div>
            </div>
          </div>

          {/* Desktop deposit CTA */}
          <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
            <Button
              size="lg"
              className="min-w-[160px]"
              onClick={() => setDepositOpen(true)}
              disabled={vault.status !== 'active'}
            >
              Deposit {vault.asset}
            </Button>
            <p className="text-xs text-muted-foreground">No lock-up · withdraw in {vault.withdrawalTime}</p>
          </div>
        </div>
      </div>

      {/* Quick facts bar */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground px-1">
        <span>30d APY <span className="font-semibold text-foreground">{vault.apy30d?.toFixed(1)}%</span></span>
        <span>90d APY <span className="font-semibold text-foreground">{vault.apy90d?.toFixed(1)}%</span></span>
        <span>Launched <span className="font-semibold text-foreground">{vault.launchDate}</span></span>
        <span>Operator <span className="font-semibold text-foreground">{vault.operator}</span></span>
        <span>Lock-up <span className="font-semibold text-foreground">None</span></span>
      </div>

      {/* Two-column: main content + sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About this Vault</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{vault.description}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">{vault.strategyDetail}</p>
            </CardContent>
          </Card>

          {/* Allocation */}
          <Card>
            <CardHeader>
              <CardTitle>Strategy Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vault.allocationBreakdown.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-28 shrink-0">
                    <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all', item.color)}
                      style={{ width: `${item.percent}%` }}
                      role="progressbar"
                      aria-valuenow={item.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${item.label}: ${item.percent}%`}
                    />
                  </div>
                  <span className="w-8 text-right text-xs font-medium text-muted-foreground tabular-nums">
                    {item.percent}%
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risk factors — readable, with titles */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4" role="list">
                {vault.riskDetails.map((r) => (
                  <li key={r.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-warning/10">
                      <span className="text-[10px] font-black text-warning">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{r.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card variant="elevated">
            <CardContent className="p-6 space-y-5">
              {/* Metrics summary */}
              <div className="space-y-3">
                {[
                  { label: 'Current APY', value: `${vault.apy}%`, highlight: true },
                  { label: 'Risk Level', value: RISK_LABELS[vault.risk] },
                  { label: 'Min Deposit', value: `$${vault.minDeposit} ${vault.asset}` },
                  { label: 'Withdrawal Time', value: vault.withdrawalTime },
                  { label: 'TVL', value: vault.tvlFormatted },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className={cn('font-semibold', highlight ? 'text-primary' : 'text-foreground')}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/60 pt-4 space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setDepositOpen(true)}
                  disabled={vault.status !== 'active'}
                >
                  Deposit {vault.asset}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  No lock-up · withdraw in {vault.withdrawalTime}
                </p>
              </div>

              {/* Audit trust signal in sidebar too */}
              {vault.audited && (
                <div className="flex items-center gap-2 rounded-lg border border-success/15 bg-success/6 px-3 py-2.5">
                  <ShieldCheck className="h-4 w-4 text-success shrink-0" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold text-success">Audited Contract</p>
                    <p className="text-xs text-muted-foreground">{vault.auditDate}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Mobile sticky deposit bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 border-t border-border/50 bg-background/95 backdrop-blur-md px-4 py-3 sm:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">APY · Withdrawal</p>
            <p className="text-sm font-bold text-foreground tabular-nums">
              <span className="text-primary">{vault.apy}%</span>
              <span className="text-muted-foreground mx-1">·</span>
              {vault.withdrawalTime}
            </p>
          </div>
          <Button
            className="flex-1"
            onClick={() => setDepositOpen(true)}
            disabled={vault.status !== 'active'}
          >
            Deposit {vault.asset}
          </Button>
        </div>
      </div>

      <DepositModal
        open={depositOpen}
        onClose={() => setDepositOpen(false)}
        vaultName={vault.name}
        vaultId={vault.id}
        asset={vault.asset}
        minDeposit={vault.minDeposit}
      />
    </div>
  )
}
