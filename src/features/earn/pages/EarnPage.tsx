import { useState } from 'react'
import { VaultGrid } from '../components/VaultGrid'
import { DepositModal } from '@/features/vault/components/DepositModal'
import { WithdrawModal } from '@/features/vault/components/WithdrawModal'
import { useVaults } from '../hooks/useVaults'
import type { VaultPosition } from '../components/RecommendedSection'

function formatTvl(total: number): string {
  if (total >= 1_000_000) return `$${(total / 1_000_000).toFixed(1)}M`
  if (total >= 1_000) return `$${(total / 1_000).toFixed(0)}K`
  return `$${total}`
}

function fmtUsd(n: number) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function EarnPage() {
  const { vaults } = useVaults()
  const [depositVaultId, setDepositVaultId] = useState<string | null>(null)
  const [withdrawVaultId, setWithdrawVaultId] = useState<string | null>(null)
  const [positions, setPositions] = useState<VaultPosition[]>([])

  const depositVault = vaults.find((v) => v.id === depositVaultId) ?? null
  const withdrawVault = vaults.find((v) => v.id === withdrawVaultId) ?? null

  const handleDepositSuccess = (amount: number) => {
    if (!depositVaultId) return
    setPositions((prev) => {
      const existing = prev.find((p) => p.vaultId === depositVaultId)
      if (existing) {
        const newValue = existing.value + amount
        return prev.map((p) =>
          p.vaultId === depositVaultId
            ? { ...p, value: newValue, valueFormatted: fmtUsd(newValue) }
            : p
        )
      }
      return [
        ...prev,
        {
          vaultId: depositVaultId,
          value: amount,
          valueFormatted: fmtUsd(amount),
          pnl: 0,
          pnlFormatted: '$0.00',
          pnlPercent: 0,
        },
      ]
    })
  }

  const totalTvl = vaults.reduce((sum, v) => sum + v.tvl, 0)
  const bestApy = vaults.length > 0 ? Math.max(...vaults.map((v) => v.apy)) : 0

  return (
    <div className="space-y-8">
      {/* Compact page header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">Earn</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Choose a vault that fits your goals.
          </p>
        </div>

        {vaults.length > 0 && (
          <div className="flex items-center gap-5 shrink-0">
            <div>
              <p className="text-xs text-muted-foreground">Best APY</p>
              <p className="text-base font-black text-primary tabular-nums">{bestApy.toFixed(1)}%</p>
            </div>
            <div className="h-8 w-px bg-border/60" aria-hidden />
            <div>
              <p className="text-xs text-muted-foreground">Total TVL</p>
              <p className="text-base font-black text-foreground tabular-nums">{formatTvl(totalTvl)}</p>
            </div>
            <div className="h-8 w-px bg-border/60" aria-hidden />
            <div>
              <p className="text-xs text-muted-foreground">Vaults</p>
              <p className="text-base font-black text-foreground tabular-nums">{vaults.length}</p>
            </div>
          </div>
        )}
      </div>

      <VaultGrid onDeposit={setDepositVaultId} onWithdraw={setWithdrawVaultId} positions={positions} />

      {depositVault && (
        <DepositModal
          open={!!depositVaultId}
          onClose={() => setDepositVaultId(null)}
          onSuccess={handleDepositSuccess}
          vaultName={depositVault.name}
          vaultId={depositVault.id}
          asset={depositVault.asset}
          minDeposit={depositVault.minDeposit}
        />
      )}

      {withdrawVault && (
        <WithdrawModal
          open={!!withdrawVaultId}
          onClose={() => setWithdrawVaultId(null)}
          vaultName={withdrawVault.name}
          vaultId={withdrawVault.id}
          asset={withdrawVault.asset}
          positionValue={positions.find((p) => p.vaultId === withdrawVaultId)?.value ?? 0}
          withdrawalDays={withdrawVault.withdrawalTime ?? '2–3 days'}
        />
      )}
    </div>
  )
}
