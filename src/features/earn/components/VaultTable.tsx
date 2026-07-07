import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Badge, Button } from '@/shared/ui'
import type { Vault } from '@/features/vault/components/VaultCard'

const RISK_CONFIG = {
  low:    { label: 'Low',    badgeVariant: 'low'    as const, dotClass: 'bg-success'     },
  medium: { label: 'Medium', badgeVariant: 'medium' as const, dotClass: 'bg-warning'     },
  high:   { label: 'High',   badgeVariant: 'high'   as const, dotClass: 'bg-destructive' },
}

const ASSET_COLORS: Record<string, { bg: string; text: string }> = {
  USDC: { bg: 'bg-blue-500/15',   text: 'text-blue-600'   },
  ETH:  { bg: 'bg-indigo-500/15', text: 'text-indigo-600' },
  BTC:  { bg: 'bg-orange-500/15', text: 'text-orange-600' },
  HYPE: { bg: 'bg-primary/15',    text: 'text-primary'    },
}

interface VaultTableProps {
  vaults: Vault[]
  selectedIds: Set<string>
  onToggleSelect: (id: string) => void
  onDeposit: (id: string) => void
}

export function VaultTable({ vaults, selectedIds, onToggleSelect, onDeposit }: VaultTableProps) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm" aria-label="Vault marketplace">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th scope="col" className="w-8 px-4 py-3">
                <span className="sr-only">Compare</span>
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Vault
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Asset
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                APY
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Risk
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Liquidity
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Rewards
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                TVL
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {vaults.map((vault) => {
              const risk = RISK_CONFIG[vault.risk]
              const isSelected = selectedIds.has(vault.id)
              const withdrawalTime = vault.withdrawalTime ?? '2–3 days'

              return (
                <tr
                  key={vault.id}
                  className={cn(
                    'group transition-colors',
                    isSelected ? 'bg-primary/4' : 'hover:bg-muted/30'
                  )}
                >
                  {/* Compare checkbox */}
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(vault.id)}
                      aria-label={`Select ${vault.name} for comparison`}
                      disabled={!isSelected && selectedIds.size >= 3}
                      className={cn(
                        'h-4 w-4 rounded border-border accent-primary cursor-pointer',
                        !isSelected && selectedIds.size >= 3 && 'opacity-40 cursor-not-allowed'
                      )}
                    />
                  </td>

                  {/* Vault identity */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-black text-primary ring-1 ring-primary/20">
                        {vault.assetIcon
                          ? <img src={vault.assetIcon} alt={vault.asset} className="h-5 w-5" />
                          : vault.asset.slice(0, 1)
                        }
                      </div>
                      <div>
                        <p className="font-semibold text-foreground leading-tight">{vault.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{vault.strategy}</p>
                      </div>
                    </div>
                  </td>

                  {/* Asset — portfolio-style pill */}
                  <td className="px-4 py-4">
                    {(() => {
                      const color = ASSET_COLORS[vault.asset] ?? { bg: 'bg-muted', text: 'text-muted-foreground' }
                      return (
                        <span className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                          color.bg, color.text
                        )}>
                          <span className={cn('h-1.5 w-1.5 rounded-full', color.text.replace('text-', 'bg-'))} aria-hidden />
                          {vault.asset}
                        </span>
                      )
                    })()}
                  </td>

                  {/* APY — most prominent */}
                  <td className="px-4 py-4 text-right">
                    <p className={cn(
                      'text-lg font-black tabular-nums',
                      vault.status === 'active' ? 'text-primary' : 'text-muted-foreground'
                    )}>
                      {vault.apy.toFixed(1)}%
                    </p>
                    {vault.apy30d && (
                      <p className="text-xs text-muted-foreground tabular-nums">30d {vault.apy30d.toFixed(1)}%</p>
                    )}
                  </td>

                  {/* Risk */}
                  <td className="px-4 py-4">
                    <Badge variant={risk.badgeVariant} className="text-xs">
                      <span className={cn('h-1.5 w-1.5 rounded-full', risk.dotClass)} aria-hidden />
                      {risk.label}
                    </Badge>
                  </td>

                  {/* Liquidity — withdrawal time */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" aria-hidden />
                      <span className="text-sm text-foreground">{withdrawalTime}</span>
                    </div>
                    {vault.liquidity && (
                      <p className="text-xs text-muted-foreground mt-0.5">{vault.liquidity} liquidity</p>
                    )}
                  </td>

                  {/* Rewards */}
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {vault.rewards && vault.rewards.length > 0
                        ? vault.rewards.map((r) => (
                            <span
                              key={r}
                              className="rounded-full bg-muted/60 border border-border px-2 py-0.5 text-xs text-muted-foreground"
                            >
                              {r}
                            </span>
                          ))
                        : <span className="text-xs text-muted-foreground">—</span>
                      }
                    </div>
                  </td>

                  {/* TVL — least prominent per spec */}
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-medium text-muted-foreground tabular-nums">
                      {vault.tvlFormatted}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => onDeposit(vault.id)}
                        disabled={vault.status !== 'active'}
                        aria-label={`Deposit into ${vault.name}`}
                      >
                        Deposit
                      </Button>
                      <Link
                        to={`/earn/${vault.id}`}
                        className={cn(
                          'flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1'
                        )}
                        aria-label={`View ${vault.name} details`}
                      >
                        Details
                        <ArrowRight className="h-3 w-3" aria-hidden />
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: card list */}
      <div className="md:hidden divide-y divide-border">
        {vaults.map((vault) => {
          const risk = RISK_CONFIG[vault.risk]
          const isSelected = selectedIds.has(vault.id)
          const withdrawalTime = vault.withdrawalTime ?? '2–3 days'

          return (
            <div
              key={vault.id}
              className={cn('p-4 transition-colors', isSelected && 'bg-primary/4')}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(vault.id)}
                    aria-label={`Select ${vault.name} for comparison`}
                    disabled={!isSelected && selectedIds.size >= 3}
                    className="h-4 w-4 rounded border-border accent-primary cursor-pointer shrink-0"
                  />
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-black text-primary ring-1 ring-primary/20">
                    {vault.asset.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{vault.name}</p>
                    <p className="text-xs text-muted-foreground">{vault.asset} · {vault.strategy}</p>
                  </div>
                </div>
                <p className="text-xl font-black text-primary tabular-nums shrink-0">
                  {vault.apy.toFixed(1)}%
                </p>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                <Badge variant={risk.badgeVariant} className="text-xs">
                  <span className={cn('h-1.5 w-1.5 rounded-full', risk.dotClass)} aria-hidden />
                  {risk.label}
                </Badge>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" aria-hidden />
                  {withdrawalTime}
                </span>
                <span>{vault.tvlFormatted} TVL</span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-8 text-xs flex-1"
                  onClick={() => onDeposit(vault.id)}
                  disabled={vault.status !== 'active'}
                >
                  Deposit
                </Button>
                <Link
                  to={`/earn/${vault.id}`}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2"
                  aria-label={`View ${vault.name} details`}
                >
                  Details <ArrowRight className="h-3 w-3" aria-hidden />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
