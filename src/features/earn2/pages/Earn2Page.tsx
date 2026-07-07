import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, ShieldCheck, X, Sparkles, Star, Zap, ChevronLeft, ChevronRight, Clock, Wallet, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVaults } from '@/features/earn/hooks/useVaults'
import { useCountdown } from '@/features/earn/hooks/useCountdown'
import type { Vault } from '@/features/vault/components/VaultCard'
import { DepositModal } from '@/features/vault/components/DepositModal'
import { WithdrawModal } from '@/features/vault/components/WithdrawModal'
import { VaultDetailPanel3 } from '@/features/earn3/pages/VaultDetailPanel3'

// ── Helpers ───────────────────────────────────────────────────────────────────

const RISK_COLOR: Record<string, { bg: string; text: string }> = {
  low:    { bg: '#dcfce7', text: '#15803d' },
  medium: { bg: '#fef3c7', text: '#92400e' },
  high:   { bg: '#fee2e2', text: '#991b1b' },
}
const RISK_LABEL: Record<string, string> = { low: 'Low', medium: 'Medium', high: 'High' }
const ASSET_COLOR: Record<string, string> = { USDC: '#2775CA', ETH: '#627EEA', BTC: '#F7931A', USDT: '#26A17B', HYPE: '#84cc16' }
const RECOMMENDED_IDS = new Set(['delta-neutral-usdc', 'eth-yield-max'])
const NEW_IDS         = new Set(['btc-bull-run'])

function fmtTvl(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function H2Navbar() {
  return (
    <header className="w-full sticky top-0 z-40" style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded" style={{ background: '#1a2e00' }}>
            <span className="font-black" style={{ color: '#c8f731', fontSize: 10 }}>HX</span>
          </div>
          <span className="text-sm font-bold tracking-tight" style={{ color: '#0f172a' }}>HARMONIX</span>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {[{ label: 'Overview', href: '/home2' }, { label: 'Invest', href: '/earn2', active: true }, { label: 'Portfolio', href: '/portfolio2' }].map(l => (
            <Link key={l.label} to={l.href} className="px-3 py-1.5 text-sm font-medium rounded transition-colors"
              style={{ color: l.active ? '#1a2e00' : '#64748b', borderBottom: l.active ? '2px solid #84cc16' : '2px solid transparent', background: l.active ? '#f0fdf4' : 'transparent' }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button className="text-sm font-bold rounded-lg px-4 py-1.5" style={{ background: '#1a2e00', color: '#c8f731' }}>Connect Wallet</button>
      </div>
    </header>
  )
}

// ── Platform Bar ──────────────────────────────────────────────────────────────

function PlatformBar({ vaults }: { vaults: Vault[] }) {
  const bestApy = vaults.length ? Math.max(...vaults.map(v => v.apy)) : 0
  const totalTvl = vaults.reduce((s, v) => s + v.tvl, 0)
  const activeCount = vaults.filter(v => v.status === 'active').length
  const stats = [
    { label: 'TVL', value: fmtTvl(totalTvl), green: false },
    { label: 'Best APY', value: `${bestApy.toFixed(1)}%`, green: true },
    { label: 'Active Vaults', value: `${activeCount}`, green: false },
    { label: 'Withdrawal', value: '2–3 days', green: false },
  ]
  return (
    <div className="flex items-center rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-center">
          {i > 0 && <div style={{ width: 1, height: 28, background: '#e2e8f0' }} />}
          <div className="flex items-center gap-2 px-4 py-2.5">
            <span className="text-xs" style={{ color: '#94a3b8' }}>{s.label}:</span>
            <span className="text-sm font-black tabular-nums" style={{ color: s.green ? '#15803d' : '#0f172a' }}>{s.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── New Vault Banner (light theme) ────────────────────────────────────────────

interface BannerSlide { id: string; vaultId: string; title: string; tagline: string; apy: string; risk: string; bonus: string; deadline: Date; gradient: string }
const DEADLINE_MS = Date.now() + (6 * 24 + 12) * 3_600_000 + 34 * 60_000 + 18_000
const SLIDES: BannerSlide[] = [
  { id: 'btc-new', vaultId: 'btc-bull-run', title: 'BTC Bull Run Vault', tagline: 'Ride BTC momentum with a leveraged long strategy on Hyperliquid.', apy: '22.50%', risk: 'High Risk', bonus: '2× Points', deadline: new Date(DEADLINE_MS), gradient: 'linear-gradient(135deg,#fff7ed 0%,#fed7aa 60%,#fff 100%)' },
]

function CountUnit({ v, l }: { v: number; l: string }) {
  return (
    <div className="text-center min-w-[36px]">
      <p className="text-lg font-black tabular-nums leading-none" style={{ color: '#0f172a' }}>{String(v).padStart(2, '0')}</p>
      <p className="text-[10px] uppercase tracking-wide mt-0.5" style={{ color: '#94a3b8' }}>{l}</p>
    </div>
  )
}

function NewVaultBanner2({ onSelectVault }: { onSelectVault: (id: string) => void }) {
  const [idx, setIdx] = useState(0)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const visible = SLIDES.filter(s => !dismissed.has(s.id))
  const slide = visible[idx] ?? null
  const cd = useCountdown(slide?.deadline ?? new Date(0))
  const prev = useCallback(() => setIdx(i => (i - 1 + visible.length) % visible.length), [visible.length])
  const next = useCallback(() => setIdx(i => (i + 1) % visible.length), [visible.length])

  useEffect(() => {
    if (visible.length <= 1) return
    const t = setInterval(next, 8000)
    return () => clearInterval(t)
  }, [next, visible.length])

  if (!slide) return null

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div key={slide.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}
          className="relative overflow-hidden rounded-2xl" style={{ background: slide.gradient, border: '1.5px solid #bbf7d0' }}>
          <button onClick={() => { setDismissed(p => new Set([...p, slide.id])); setIdx(0) }}
            className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-black/8" style={{ color: '#64748b' }}>
            <X style={{ width: 14, height: 14 }} />
          </button>
          <div className="flex flex-col sm:flex-row sm:items-stretch">
            {/* Left */}
            <div className="flex-1 p-5 flex flex-col gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mb-2" style={{ background: '#dcfce7', border: '1px solid #bbf7d0' }}>
                  <Sparkles style={{ width: 11, height: 11, color: '#15803d' }} />
                  <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: '#15803d' }}>New Vault</span>
                </div>
                <h3 className="text-xl font-black leading-tight" style={{ color: '#0f172a' }}>{slide.title}</h3>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: '#475569' }}>{slide.tagline}</p>
              </div>
              <div className="flex gap-5">
                {[{ icon: <TrendingUp style={{ width: 14, height: 14, color: '#15803d' }} />, val: slide.apy, lbl: 'APY' },
                  { icon: <ShieldCheck style={{ width: 14, height: 14, color: '#64748b' }} />, val: slide.risk, lbl: 'Risk' },
                  { icon: <Zap style={{ width: 14, height: 14, color: '#d97706' }} />, val: slide.bonus, lbl: 'Early bonus' }].map(m => (
                  <div key={m.lbl} className="flex items-center gap-2">
                    {m.icon}
                    <div>
                      <p className="text-sm font-black leading-none" style={{ color: '#0f172a' }}>{m.val}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: '#94a3b8' }}>{m.lbl}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => onSelectVault(slide.vaultId)}
                className="self-start px-5 py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: '#1a2e00', color: '#c8f731' }}>
                Explore vault
              </button>
            </div>
            {/* Right: countdown */}
            {!cd.expired && (
              <div className="hidden sm:flex items-center justify-center px-6 shrink-0" style={{ borderLeft: '1px solid #bbf7d0' }}>
                <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.7)' }}>
                  <p className="text-[11px] font-semibold mb-2" style={{ color: '#64748b' }}>Early bonus ends in</p>
                  <div className="flex items-end gap-1">
                    <CountUnit v={cd.days} l="Days" />
                    <span className="text-base font-black pb-4 leading-none" style={{ color: '#cbd5e1' }}>:</span>
                    <CountUnit v={cd.hours} l="Hrs" />
                    <span className="text-base font-black pb-4 leading-none" style={{ color: '#cbd5e1' }}>:</span>
                    <CountUnit v={cd.minutes} l="Min" />
                    <span className="text-base font-black pb-4 leading-none" style={{ color: '#cbd5e1' }}>:</span>
                    <CountUnit v={cd.seconds} l="Sec" />
                  </div>
                </div>
              </div>
            )}
          </div>
          {visible.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-black/8" style={{ color: '#64748b' }}><ChevronLeft style={{ width: 14, height: 14 }} /></button>
              <button onClick={next} className="absolute right-8 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-black/8" style={{ color: '#64748b' }}><ChevronRight style={{ width: 14, height: 14 }} /></button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {visible.map((s, i) => (
                  <button key={s.id} onClick={() => setIdx(i)} className="rounded-full transition-all"
                    style={{ width: i === idx ? 16 : 8, height: 8, background: i === idx ? '#1a2e00' : '#cbd5e1' }} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── Vault List Card ───────────────────────────────────────────────────────────

function VaultListCard({ vault, isSelected, onSelect, hasPending }: { vault: Vault; isSelected: boolean; onSelect: () => void; hasPending?: boolean }) {
  const ac = ASSET_COLOR[vault.asset] ?? '#94a3b8'
  const rc = RISK_COLOR[vault.risk]
  const isRec = RECOMMENDED_IDS.has(vault.id)
  const isNew = NEW_IDS.has(vault.id)
  return (
    <button onClick={onSelect} className="w-full text-left rounded-xl p-3.5 transition-all"
      style={{ background: isSelected ? '#f0fdf4' : '#fff', border: isSelected ? '1.5px solid #84cc16' : '1.5px solid #e2e8f0', boxShadow: isSelected ? '0 0 0 3px #84cc1620' : undefined }}>
      {(isRec || isNew || hasPending) && (
        <div className="flex gap-1.5 mb-2">
          {isRec && <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#fef9c3', color: '#a16207' }}><Star style={{ width: 9, height: 9 }} /> Recommended</span>}
          {isNew && <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#ede9fe', color: '#6d28d9' }}><Sparkles style={{ width: 9, height: 9 }} /> New</span>}
          {hasPending && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#fef3c7', color: '#d97706' }}>
              <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#d97706', display: 'inline-block' }} />
              Processing
            </span>
          )}
        </div>
      )}
      <div className="flex items-start gap-3">
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black" style={{ background: ac + '18', color: ac, border: `1.5px solid ${ac}44` }}>{vault.asset.slice(0, 2)}</div>
          {hasPending && (
            <span className="animate-pulse" style={{ position: 'absolute', top: -3, right: -3, width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', border: '2px solid #fff', display: 'block' }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold leading-tight" style={{ color: '#0f172a' }}>{vault.name}</p>
          <p className="text-[11px] mt-0.5" style={{ color: '#94a3b8' }}>{vault.strategy}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-base font-black tabular-nums leading-none" style={{ color: '#15803d' }}>{vault.apy.toFixed(1)}%</p>
          <p className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>APY</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2.5">
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md" style={{ background: ac + '14', color: ac }}>{vault.asset}</span>
        <span className="text-[11px]" style={{ color: '#94a3b8' }}>TVL {vault.tvlFormatted ?? fmtTvl(vault.tvl)}</span>
        <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: rc.bg, color: rc.text }}>{RISK_LABEL[vault.risk]}</span>
      </div>
    </button>
  )
}

// ── Left Panel ────────────────────────────────────────────────────────────────

function EarnPanel({ vaults, selectedId, onSelect, pendingVaultIds }: { vaults: Vault[]; selectedId: string | null; onSelect: (v: Vault) => void; pendingVaultIds?: Set<string> }) {
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const shown = filter === 'all' ? vaults : vaults.filter(v => v.risk === filter)
  const pendingCount = pendingVaultIds?.size ?? 0
  return (
    <div className="flex flex-col gap-2.5">
      {pendingCount > 0 && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', flexShrink: 0, display: 'inline-block' }} />
          <p style={{ fontSize: 12, fontWeight: 600, color: '#92400e', margin: 0 }}>
            {pendingCount} withdrawal{pendingCount > 1 ? 's' : ''} processing
          </p>
        </div>
      )}
      <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: '#f1f5f9' }}>
        {(['all', 'low', 'medium', 'high'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className="flex-1 py-1 rounded-lg text-[11px] font-semibold transition-colors"
            style={{ background: filter === f ? '#1a2e00' : 'transparent', color: filter === f ? '#c8f731' : '#64748b' }}>
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {shown.map(v => <VaultListCard key={v.id} vault={v} isSelected={selectedId === v.id} onSelect={() => onSelect(v)} hasPending={pendingVaultIds?.has(v.id)} />)}
      </div>
    </div>
  )
}

// ── Recommended default panel ─────────────────────────────────────────────────

function RecommendedCard({ vault, onSelect, onDeposit }: { vault: Vault; onSelect: () => void; onDeposit: (id: string) => void }) {
  const ac = ASSET_COLOR[vault.asset] ?? '#94a3b8'
  const rc = RISK_COLOR[vault.risk]
  const isRec = RECOMMENDED_IDS.has(vault.id)
  const isNew = NEW_IDS.has(vault.id)
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3 cursor-pointer transition-all hover:shadow-md"
      style={{ background: '#fff', border: '1.5px solid #e2e8f0' }}
      onClick={onSelect}>
      {(isRec || isNew) && (
        <div className="flex gap-1.5">
          {isRec && <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#fef9c3', color: '#a16207' }}><Star style={{ width: 9, height: 9 }} /> Recommended</span>}
          {isNew && <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#ede9fe', color: '#6d28d9' }}><Sparkles style={{ width: 9, height: 9 }} /> New</span>}
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black"
          style={{ background: ac + '18', color: ac, border: `1.5px solid ${ac}44` }}>{vault.asset.slice(0, 2)}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-tight" style={{ color: '#0f172a' }}>{vault.name}</p>
          <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{vault.asset} · {vault.strategy}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-black tabular-nums leading-none" style={{ color: '#15803d' }}>{vault.apy.toFixed(1)}%</p>
          <p className="text-[11px] mt-0.5" style={{ color: '#94a3b8' }}>APY</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: <TrendingUp style={{ width: 12, height: 12, color: '#64748b' }} />, label: 'TVL', value: vault.tvlFormatted ?? fmtTvl(vault.tvl) },
          { icon: <Clock style={{ width: 12, height: 12, color: '#64748b' }} />, label: 'Withdrawal', value: vault.withdrawalTime ?? '2–3d' },
          { icon: <Wallet style={{ width: 12, height: 12, color: '#64748b' }} />, label: 'Min Deposit', value: `$${vault.minDeposit}` },
        ].map(m => (
          <div key={m.label} className="rounded-lg px-2.5 py-2" style={{ background: '#f8fafc' }}>
            <div className="flex items-center gap-1 mb-0.5">{m.icon}<p className="text-[10px]" style={{ color: '#94a3b8' }}>{m.label}</p></div>
            <p className="text-xs font-bold" style={{ color: '#0f172a' }}>{m.value}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ background: rc.bg, color: rc.text }}>{RISK_LABEL[vault.risk]} Risk</span>
        {vault.depositorCount && (
          <span className="flex items-center gap-1 text-[11px]" style={{ color: '#94a3b8' }}>
            <Users style={{ width: 11, height: 11 }} />{vault.depositorCount.toLocaleString()} depositors
          </span>
        )}
        <button onClick={e => { e.stopPropagation(); onDeposit(vault.id) }}
          disabled={vault.status !== 'active'}
          className="ml-auto px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ background: '#1a2e00', color: '#c8f731' }}>
          Deposit
        </button>
      </div>
    </div>
  )
}

function DefaultPanel({ vaults, onSelect, onDeposit }: {
  vaults: Vault[]
  onSelect: (v: Vault) => void
  onDeposit: (id: string) => void
}) {
  const featured = useMemo(() => {
    const recs = vaults.filter(v => RECOMMENDED_IDS.has(v.id))
    const news = vaults.filter(v => NEW_IDS.has(v.id) && !RECOMMENDED_IDS.has(v.id))
    return [...news, ...recs].slice(0, 3)
  }, [vaults])

  return (
    <div className="flex flex-col gap-4">
      <NewVaultBanner2 onSelectVault={(id) => {
        const v = vaults.find(x => x.id === id)
        if (v) onSelect(v)
      }} />
      {featured.length > 0 && (
        <div>
          <p className="text-sm font-bold mb-3" style={{ color: '#475569' }}>Recommended for you</p>
          <div className="flex flex-col gap-3">
            {featured.map(v => (
              <RecommendedCard key={v.id} vault={v} onSelect={() => onSelect(v)} onDeposit={onDeposit} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Bottom Bar ────────────────────────────────────────────────────────────────

function BottomBar() {
  return (
    <div className="flex items-center justify-between px-6 py-3.5" style={{ background: '#fff', borderTop: '1px solid #e2e8f0' }}>
      <p className="text-sm" style={{ color: '#64748b' }}>
        Compare vaults? <Link to="/earn" className="underline underline-offset-2" style={{ color: '#3b82f6' }}>Use the full Earn page</Link>
      </p>
      <Link to="/earn" className="px-5 py-2 rounded-lg text-sm font-bold" style={{ background: '#1a2e00', color: '#c8f731' }}>All Vaults</Link>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function Earn2Page() {
  const { vaults, isLoading } = useVaults()
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null)
  const [depositVaultId, setDepositVaultId] = useState<string | null>(null)
  const [withdrawVaultId, setWithdrawVaultId] = useState<string | null>(null)
  const [pendingVaultIds, setPendingVaultIds] = useState<Set<string>>(new Set())
  const [positions, setPositions] = useState<Record<string, { value: number; valueFormatted: string; pnl: number; pnlFormatted: string; pnlPercent: number; depositedAt: string; pendingWithdrawal?: number; pendingWithdrawalFormatted?: string; pendingArrival?: string }>>({})

  const depositVault = vaults.find(v => v.id === depositVaultId) ?? null
  const withdrawVault = vaults.find(v => v.id === withdrawVaultId) ?? null

  const fmtUsd = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const handleDepositSuccess = (amount: number) => {
    if (!depositVaultId) return
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    setPositions(prev => {
      const ex = prev[depositVaultId]
      if (ex) {
        const newVal = ex.value + amount
        return { ...prev, [depositVaultId]: { ...ex, value: newVal, valueFormatted: fmtUsd(newVal) } }
      }
      return { ...prev, [depositVaultId]: { value: amount, valueFormatted: fmtUsd(amount), pnl: 0, pnlFormatted: '+$0.00', pnlPercent: 0, depositedAt: today } }
    })
  }

  const handleWithdrawSuccess = (amount: number) => {
    if (!withdrawVaultId) return
    const d = new Date(); d.setDate(d.getDate() + 3)
    const d2 = new Date(d); d2.setDate(d2.getDate() + 2)
    const arrival = `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${d2.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`
    setPendingVaultIds(prev => new Set([...prev, withdrawVaultId]))
    setPositions(prev => {
      const ex = prev[withdrawVaultId]
      if (!ex) return prev
      return { ...prev, [withdrawVaultId]: { ...ex, pendingWithdrawal: amount, pendingWithdrawalFormatted: fmtUsd(amount), pendingArrival: arrival } }
    })
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <H2Navbar />
      <div className="flex-1 mx-auto w-full max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h1 className="text-2xl font-black" style={{ color: '#0f172a' }}>Invest</h1>
            <p className="text-sm mt-0.5" style={{ color: '#64748b' }}>Choose a vault that fits your goals.</p>
          </div>
          {!isLoading && <PlatformBar vaults={vaults} />}
        </div>
        <div className="flex gap-5 items-start">
          <div className="w-80 shrink-0 sticky top-[80px] self-start">
            {isLoading ? (
              <div className="flex flex-col gap-2">{[1, 2, 3].map(i => <div key={i} className="rounded-xl h-28 animate-pulse" style={{ background: '#e2e8f0' }} />)}</div>
            ) : (
              <EarnPanel vaults={vaults} selectedId={selectedVault?.id ?? null} onSelect={setSelectedVault} pendingVaultIds={pendingVaultIds} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="rounded-2xl h-64 animate-pulse" style={{ background: '#e2e8f0' }} />
            ) : selectedVault ? (
              <VaultDetailPanel3
                vault={selectedVault}
                onClose={() => setSelectedVault(null)}
                onDeposit={setDepositVaultId}
                onWithdraw={setWithdrawVaultId}
                position={positions[selectedVault.id]}
              />
            ) : (
              <DefaultPanel vaults={vaults} onSelect={setSelectedVault} onDeposit={setDepositVaultId} />
            )}
          </div>
        </div>
      </div>
      <BottomBar />
      {depositVault && (
        <DepositModal open={!!depositVaultId} onClose={() => setDepositVaultId(null)}
          onSuccess={handleDepositSuccess}
          vaultName={depositVault.name} vaultId={depositVault.id} asset={depositVault.asset} minDeposit={depositVault.minDeposit} />
      )}
      {withdrawVault && (
        <WithdrawModal
          open={!!withdrawVaultId}
          onClose={() => setWithdrawVaultId(null)}
          onSuccess={handleWithdrawSuccess}
          vaultName={withdrawVault.name}
          vaultId={withdrawVault.id}
          asset={withdrawVault.asset}
          positionValue={positions[withdrawVault.id]?.value ?? 0}
          withdrawalDays={withdrawVault.withdrawalTime ?? '2–3 days'}
        />
      )}
    </div>
  )
}
