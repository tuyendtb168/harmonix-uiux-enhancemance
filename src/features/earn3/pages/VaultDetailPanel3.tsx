import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Star, Sparkles, ShieldCheck, Download, Zap, Shield, Activity, ArrowDownLeft, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react'
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import type { Vault } from '@/features/vault/components/VaultCard'

const ASSET_COLOR: Record<string, string> = { USDC: '#2775CA', ETH: '#627EEA', BTC: '#F7931A', USDT: '#26A17B', HYPE: '#84cc16' }
const RECOMMENDED_IDS = new Set(['delta-neutral-usdc', 'eth-yield-max'])
const NEW_IDS         = new Set(['btc-bull-run'])

function fmtTvl(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

type PerfTab = '7D' | '30D' | '90D' | '1Y' | 'All'

function mkPerf(len: number, base: number): { t: string; v: number }[] {
  return Array.from({ length: len }, (_, i) => ({ t: String(i), v: base + Math.sin(i * 0.4) * 2 + (i / len) * 2 }))
}
const PERF_DATA: Record<PerfTab, { t: string; v: number }[]> = {
  '7D': mkPerf(7, 16), '30D': mkPerf(30, 15.5), '90D': mkPerf(90, 14), '1Y': mkPerf(52, 13), 'All': mkPerf(60, 10),
}

function mkPPS(len: number, start: number): { t: string; v: number }[] {
  return Array.from({ length: len }, (_, i) => ({ t: String(i), v: start + (i / len) * 0.012 + Math.sin(i * 0.3) * 0.0008 }))
}
const PPS_DATA: Record<PerfTab, { t: string; v: number }[]> = {
  '7D': mkPPS(7, 1.0100), '30D': mkPPS(30, 1.0090), '90D': mkPPS(90, 1.0060), '1Y': mkPPS(52, 1.0000), 'All': mkPPS(60, 0.9950),
}

function mkAPY(len: number): { t: string; v: number }[] {
  return Array.from({ length: len }, (_, i) => ({ t: String(i), v: 14 + Math.sin(i * 0.5) * 3 + Math.cos(i * 0.2) * 1.5 }))
}
const APY_HISTORY: Record<PerfTab, { t: string; v: number }[]> = {
  '7D': mkAPY(7), '30D': mkAPY(30), '90D': mkAPY(90), '1Y': mkAPY(52), 'All': mkAPY(60),
}

const MONTHLY_RETURNS: { year: number; months: (number | null)[] }[] = [
  { year: 2024, months: [null, null, null, null, null, 1.21, 0.98, 1.45, 1.12, 0.87, 1.33, 1.56] },
  { year: 2025, months: [1.23, 0.94, 1.67, 1.45, 0.72, 1.88, 1.34, 1.09, 1.56, 1.23, 0.89, 1.78] },
  { year: 2026, months: [1.45, 1.12, 1.89, 1.34, 1.67, 1.56, null, null, null, null, null, null] },
]

const DONUT_DATA = [
  { name: 'Lending',         pct: 45, apy: '8.11%', color: '#1a2e00' },
  { name: 'Funding & Basis', pct: 30, apy: '5.45%', color: '#3d6b00' },
  { name: 'Fixed Income',    pct: 15, apy: '2.73%', color: '#84cc16' },
  { name: 'Incentives',      pct: 5,  apy: '0.81%', color: '#bef264' },
  { name: 'Other',           pct: 5,  apy: '0.93%', color: '#d9f99d' },
]

const REWARDS = [
  { name: 'Harmonix Points',  sub: 'Earned automatically on every deposit', mult: '2.45x', textColor: '#c8f731', bg: '#1a2e00', updated: '2 hours ago',  updateNote: 'Multiplier increased from 2.0x' },
  { name: 'Valantis Points',  sub: 'From vault farming strategies',          mult: '1.75x', textColor: '#fff',    bg: '#0d9488', updated: '1 day ago',    updateNote: 'Campaign extended to Jul 31' },
  { name: 'Kinetiq Points',   sub: 'From Kinetiq campaigns',                 mult: '1.25x', textColor: '#fff',    bg: '#374151', updated: '3 days ago',   updateNote: 'New epoch started' },
  { name: 'Hyperlend Points', sub: 'Additional partner rewards',             mult: '—',     textColor: '#fff',    bg: '#6d28d9', updated: '1 week ago',   updateNote: 'Rewards paused — resuming soon' },
]

// Mock activity with PPS + txHash
const VAULT_ACTIVITY = [
  { type: 'deposit',  user: '0x3e...8795', amount: 50000,  token: 'USDC', pps: 1.0107, time: '2 min ago',   txHash: '0xabc1' },
  { type: 'withdraw', user: '0xa1...22fc', amount: 12500,  token: 'USDC', pps: 1.0106, time: '14 min ago',  txHash: '0xabc2' },
  { type: 'deposit',  user: '0x77...b3d1', amount: 100000, token: 'USDC', pps: 1.0105, time: '1 hr ago',    txHash: '0xabc3' },
  { type: 'deposit',  user: '0x5c...9f42', amount: 25000,  token: 'USDC', pps: 1.0104, time: '3 hrs ago',   txHash: '0xabc4' },
  { type: 'withdraw', user: '0x8b...c012', amount: 8000,   token: 'USDC', pps: 1.0103, time: '5 hrs ago',   txHash: '0xabc5' },
  { type: 'deposit',  user: '0xf2...7a88', amount: 200000, token: 'USDC', pps: 1.0102, time: '8 hrs ago',   txHash: '0xabc6' },
  { type: 'withdraw', user: '0x19...d5e3', amount: 33000,  token: 'USDC', pps: 1.0098, time: '12 hrs ago',  txHash: '0xabc7' },
  { type: 'deposit',  user: '0x44...1bc9', amount: 75000,  token: 'USDC', pps: 1.0095, time: '1 day ago',   txHash: '0xabc8' },
  { type: 'deposit',  user: '0x2d...4400', amount: 15000,  token: 'USDC', pps: 1.0090, time: '1 day ago',   txHash: '0xabc9' },
  { type: 'withdraw', user: '0xcc...8811', amount: 60000,  token: 'USDC', pps: 1.0085, time: '2 days ago',  txHash: '0xabca' },
]

// My activity (same user 0x3e...8795)
const MY_ACTIVITY = VAULT_ACTIVITY.filter(a => a.user === '0x3e...8795')

// ── Vault Header ──────────────────────────────────────────────────────────────
function VaultHeader({ vault, onClose, onDeposit }: { vault: Vault; onClose: () => void; onDeposit: (id: string) => void }) {
  const ac = ASSET_COLOR[vault.asset] ?? '#94a3b8'
  const isRec = RECOMMENDED_IDS.has(vault.id)
  const isNew = NEW_IDS.has(vault.id)
  const apySpark = Array.from({ length: 20 }, (_, i) => vault.apy - 1 + Math.sin(i * 0.5) * 1.5)
  const tvlSpark = Array.from({ length: 20 }, (_, i) => 0.95 + Math.sin(i * 0.3) * 0.05)
  const depSpark = Array.from({ length: 20 }, (_, i) => 120 + Math.sin(i * 0.4) * 4)
  void apySpark; void tvlSpark; void depSpark

  // Deposit tokens accepted
  const depositTokens = vault.depositTokens?.map(t => t.label) ?? [vault.asset]
  void depositTokens

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      {/* Identity row */}
      <div className="flex items-start gap-4 p-5 pb-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-black"
          style={{ background: ac + '18', color: ac, border: `2px solid ${ac}44` }}>
          {vault.asset.slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2 className="text-lg font-black" style={{ color: '#0f172a' }}>{vault.name}</h2>
            {isRec && <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#fef9c3', color: '#a16207' }}><Star style={{ width: 9, height: 9 }} /> Recommended</span>}
            {isNew && <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#ede9fe', color: '#6d28d9' }}><Sparkles style={{ width: 9, height: 9 }} /> New</span>}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={{ background: '#dcfce7', color: '#15803d' }}>
              {vault.risk === 'low' ? 'Low Risk' : vault.risk === 'medium' ? 'Med Risk' : 'High Risk'}
            </span>
          </div>
          <p className="text-xs mb-1.5" style={{ color: '#64748b' }}>{vault.strategy} · HyperEVM</p>
          <p className="text-xs leading-relaxed mb-2" style={{ color: '#475569' }}>{vault.description}</p>
          {/* Deposit token info */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px]" style={{ color: '#94a3b8' }}>Accepts:</span>
            {depositTokens.map(t => {
              const tc = ASSET_COLOR[t] ?? '#94a3b8'
              return (
                <span key={t} className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md"
                  style={{ background: tc + '18', color: tc, border: `1px solid ${tc}44` }}>{t}</span>
              )
            })}
            <span className="text-[11px]" style={{ color: '#94a3b8' }}>·</span>
            <span className="text-[11px]" style={{ color: '#64748b' }}>Min deposit <strong style={{ color: '#0f172a' }}>${vault.minDeposit?.toLocaleString()}</strong></span>
            <span className="text-[11px]" style={{ color: '#94a3b8' }}>·</span>
            <span className="text-[11px]" style={{ color: '#64748b' }}>Withdrawal <strong style={{ color: '#0f172a' }}>{vault.withdrawalTime ?? '2–3 days'}</strong></span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Stable Yield', 'Delta Neutral', 'Instant Liquidity'].map(tag => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => onDeposit(vault.id)} disabled={vault.status !== 'active'}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-40"
            style={{ background: '#1a2e00', color: '#c8f731' }}>
            <Download style={{ width: 13, height: 13 }} /> Deposit
          </button>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100" style={{ color: '#94a3b8' }}>
            <X style={{ width: 15, height: 15 }} />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4" style={{ borderTop: '1px solid #f1f5f9' }}>
        {/* APY — large green number, white bg like others */}
        <div className="flex items-start px-5 py-4 gap-2">
          <div>
            <p className="text-[11px] mb-1" style={{ color: '#94a3b8' }}>APY (Current)</p>
            <p className="text-4xl font-black tabular-nums leading-none" style={{ color: '#15803d' }}>{vault.apy.toFixed(2)}%</p>
            <p className="text-[11px] mt-1.5" style={{ color: '#15803d' }}>{(vault.apy30d ?? vault.apy - 0.7).toFixed(2)}% 30D avg</p>
          </div>
        </div>
        {/* TVL */}
        <div className="flex items-start px-4 py-4 gap-2" style={{ borderLeft: '1px solid #f1f5f9' }}>
          <div>
            <p className="text-[11px] mb-1" style={{ color: '#94a3b8' }}>TVL</p>
            <p className="text-xl font-black tabular-nums leading-none" style={{ color: '#0f172a' }}>{fmtTvl(vault.tvl)}</p>
            <p className="text-[11px] mt-1" style={{ color: '#3b82f6' }}>{vault.asset}</p>
          </div>
        </div>
        {/* Depositors */}
        <div className="flex items-start px-4 py-4 gap-2" style={{ borderLeft: '1px solid #f1f5f9' }}>
          <div>
            <p className="text-[11px] mb-1" style={{ color: '#94a3b8' }}>Depositors</p>
            <p className="text-xl font-black tabular-nums leading-none" style={{ color: '#0f172a' }}>{(vault.depositorCount ?? 12345).toLocaleString()}</p>
            <p className="text-[11px] mt-1" style={{ color: '#8b5cf6' }}>Active</p>
          </div>
        </div>
        {/* Liquidity */}
        <div className="flex items-start px-4 py-4 gap-2" style={{ borderLeft: '1px solid #f1f5f9' }}>
          <div>
            <p className="text-[11px] mb-1" style={{ color: '#94a3b8' }}>Liquidity</p>
            <p className="text-xl font-black tabular-nums leading-none" style={{ color: '#0f172a' }}>Instant</p>
            <p className="text-[11px] mt-1" style={{ color: '#15803d' }}>Withdraw anytime</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Overview tab body ─────────────────────────────────────────────────────────
function OverviewBody({ vault, onDeposit, onWithdraw, onSwitchToComposition, position }: {
  vault: Vault
  onDeposit: (id: string) => void
  onWithdraw?: (id: string) => void
  onSwitchToComposition: () => void
  position?: {
    value: number; valueFormatted: string; pnl: number; pnlFormatted: string
    pnlPercent: number; depositedAt: string
    pendingWithdrawal?: number; pendingWithdrawalFormatted?: string; pendingArrival?: string
  }
}) {
  const [perfTab, setPerfTab] = useState<PerfTab>('30D')
  const perfData = PERF_DATA[perfTab]

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: Your position + Rewards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
          <p className="text-sm font-bold" style={{ color: '#0f172a' }}>Your position</p>
          {position ? (
            <>
              {/* Current value — hero */}
              <div className="rounded-xl p-4" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <p className="text-xs mb-1" style={{ color: '#94a3b8' }}>Current value</p>
                <p className="text-4xl font-black tabular-nums leading-none" style={{ color: '#0f172a' }}>{position.valueFormatted}</p>
                <p className="text-sm font-semibold mt-1.5" style={{ color: '#16a34a' }}>{position.pnlFormatted} <span style={{ color: '#94a3b8' }}>({position.pnlPercent.toFixed(2)}%)</span></p>
              </div>
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Deposited', position.depositedAt],
                  ['Total P&L', position.pnlFormatted],
                  ['Pending withdraw', position.pendingWithdrawalFormatted ?? '$0.00'],
                  ['Est. arrival', position.pendingArrival ?? '—'],
                ].map(([l, v]) => {
                  const isPending = l === 'Pending withdraw'
                  const isHighlit = isPending && !!position.pendingWithdrawal
                  return (
                    <div key={l} className="rounded-lg px-3 py-2.5"
                      style={{ background: isHighlit ? '#fffbeb' : '#f8fafc', border: isHighlit ? '1px solid #fcd34d' : '1px solid #f1f5f9' }}>
                      <p className="text-[11px]" style={{ color: isHighlit ? '#92400e' : '#94a3b8' }}>{l}</p>
                      <p className="text-sm font-bold tabular-nums mt-0.5" style={{ color: isHighlit ? '#b45309' : '#0f172a' }}>{v}</p>
                    </div>
                  )
                })}
              </div>
              <div className="flex gap-2">
                {onWithdraw && (
                  <button onClick={() => onWithdraw(vault.id)} className="flex-1 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 border" style={{ background: '#fff', color: '#0f172a', borderColor: '#e2e8f0' }}>
                    Withdraw
                  </button>
                )}
                <button onClick={() => onDeposit(vault.id)} className="flex-1 py-2.5 rounded-xl text-sm font-bold hover:opacity-90" style={{ background: '#1a2e00', color: '#c8f731' }}>
                  Add More
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-xl p-4 text-center" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: '#94a3b8' }}>No position yet</p>
                <p className="text-xs" style={{ color: '#cbd5e1' }}>Deposit to start earning {vault.apy.toFixed(1)}% APY</p>
              </div>
              <button onClick={() => onDeposit(vault.id)} className="w-full py-2.5 rounded-xl text-sm font-bold hover:opacity-90" style={{ background: '#1a2e00', color: '#c8f731' }}>
                Deposit now →
              </button>
            </>
          )}
        </div>
        <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
          <p className="text-sm font-bold mb-3" style={{ color: '#0f172a' }}>Rewards you can earn</p>
          <div className="grid grid-cols-2 gap-2">
            {REWARDS.map(r => (
              <div key={r.name} className="rounded-xl p-3 flex flex-col gap-2" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-black text-white" style={{ background: r.bg }}>
                    {r.name.slice(0, 1)}
                  </div>
                  <p className="text-xs font-semibold truncate flex-1" style={{ color: '#0f172a' }}>{r.name}</p>
                  {r.mult !== '—'
                    ? <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0" style={{ background: '#dcfce7', color: '#15803d' }}>Active</span>
                    : <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0" style={{ background: '#fef9c3', color: '#a16207' }}>Paused</span>}
                </div>
                <p className="text-lg font-black tabular-nums" style={{ color: r.mult === '—' ? '#94a3b8' : '#0f172a' }}>{r.mult}</p>
                <div>
                  <p className="text-[10px] leading-snug" style={{ color: '#94a3b8' }}>{r.updateNote}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#cbd5e1' }}>{r.updated}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Yield composition + Performance */}
      <div className="grid grid-cols-[1fr_1.4fr] gap-4">
        <div className="rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={onSwitchToComposition} style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
          <p className="text-sm font-bold mb-3" style={{ color: '#0f172a' }}>How yield is generated <span className="text-[11px] font-normal" style={{ color: '#94a3b8' }}>ⓘ</span></p>
          <div className="flex items-center gap-3">
            <div style={{ width: 100, height: 100, position: 'relative', flexShrink: 0 }}>
              <PieChart width={100} height={100}>
                <Pie data={DONUT_DATA} dataKey="pct" cx={50} cy={50} innerRadius={30} outerRadius={48} strokeWidth={0}>
                  {DONUT_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                <p className="text-xs font-black leading-tight" style={{ color: '#0f172a' }}>{vault.apy.toFixed(2)}%</p>
                <p style={{ fontSize: 9, color: '#94a3b8' }}>APY</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              {DONUT_DATA.map(d => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-[11px] flex-1 truncate" style={{ color: '#475569' }}>{d.pct}% {d.name}</span>
                  <span className="text-[11px] font-semibold tabular-nums" style={{ color: '#64748b' }}>{d.apy}</span>
                </div>
              ))}
            </div>
          </div>
          <Link to={`/earn/${vault.id}`} className="flex items-center gap-1 text-[11px] font-semibold mt-3" style={{ color: '#15803d' }}>
            Learn more about strategy →
          </Link>
        </div>
        <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold" style={{ color: '#0f172a' }}>Performance</p>
            <div className="flex gap-0.5 rounded-lg p-0.5" style={{ background: '#f1f5f9' }}>
              {(['7D','30D','90D','1Y','All'] as PerfTab[]).map(t => (
                <button key={t} onClick={() => setPerfTab(t)} className="px-2 py-1 rounded-md text-[11px] font-semibold transition-colors"
                  style={{ background: perfTab===t ? '#1a2e00' : 'transparent', color: perfTab===t ? '#c8f731' : '#64748b' }}>{t}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={perfData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#84cc16" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="#84cc16" strokeWidth={2} fill="url(#perfGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-3 mt-2">
            <div className="rounded-lg px-3 py-1.5" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <p className="text-[10px]" style={{ color: '#94a3b8' }}>Share price (USDC)</p>
              <p className="text-xs font-black tabular-nums" style={{ color: '#0f172a' }}>1.0107 <span style={{ color: '#15803d', fontWeight: 600 }}>+1.07%</span></p>
            </div>
            <div className="rounded-lg px-3 py-1.5" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <p className="text-[10px]" style={{ color: '#94a3b8' }}>TVL</p>
              <p className="text-xs font-black tabular-nums" style={{ color: '#0f172a' }}>{fmtTvl(vault.tvl)} <span style={{ color: '#15803d', fontWeight: 600 }}>+5.21%</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Withdraw info (full width) */}
      <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
        <p className="text-sm font-bold mb-3" style={{ color: '#0f172a' }}>Withdraw information <span className="text-[11px] font-normal" style={{ color: '#94a3b8' }}>ⓘ</span></p>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: '🟢', label: 'Withdraw window', value: 'Open', tag: 'Always' },
            { icon: '⏱',  label: 'Processing time', value: '1–3 days', tag: 'avg 21 days' },
            { icon: '⚡', label: 'Auto withdraw', value: 'Automatic', tag: 'Sent to wallet' },
            { icon: '🔔', label: 'Notification', value: 'Email & in-app', tag: 'When completed' },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-2">
              <span className="text-base leading-none mt-0.5">{item.icon}</span>
              <div>
                <p className="text-[11px]" style={{ color: '#94a3b8' }}>{item.label}</p>
                <p className="text-xs font-semibold" style={{ color: '#0f172a' }}>{item.value}</p>
                {item.tag && <p className="text-[11px]" style={{ color: '#94a3b8' }}>{item.tag}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 4: Risk overview + Trust */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
          <p className="text-sm font-bold mb-3" style={{ color: '#0f172a' }}>Risk overview <span className="text-[11px] font-normal" style={{ color: '#94a3b8' }}>ⓘ</span></p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Smart contract',    risk: 'Low',    sub: 'Audited & continuously monitored',             color: '#15803d' },
              { label: 'Market risk',       risk: 'Low',    sub: 'Delta-neutral positions minimize exposure',    color: '#15803d' },
              { label: 'Liquidity risk',    risk: 'Low',    sub: 'High liquidity of underlying lending partners', color: '#15803d' },
              { label: 'Counterparty risk', risk: 'Medium', sub: 'Diversified across multiple lending partners',  color: '#d97706' },
            ].map(r => (
              <div key={r.label}>
                <p className="text-[11px]" style={{ color: '#94a3b8' }}>{r.label}</p>
                <p className="text-sm font-black" style={{ color: r.color }}>{r.risk}</p>
                <p className="text-[10px] leading-tight mt-0.5" style={{ color: '#94a3b8' }}>{r.sub}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
          <p className="text-sm font-bold mb-3" style={{ color: '#0f172a' }}>Trust &amp; security</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Shield style={{ width: 20, height: 20, color: '#15803d' }} />,   label: 'Audits',     sub: '7 audits · Institutional-grade' },
              { icon: <ShieldCheck style={{ width: 20, height: 20, color: '#3b82f6' }} />, label: 'Custody',    sub: 'Non-custodial, self-sovereign' },
              { icon: <Activity style={{ width: 20, height: 20, color: '#8b5cf6' }} />, label: 'Monitoring', sub: '24/7 real-time alerts' },
              { icon: <Zap style={{ width: 20, height: 20, color: '#d97706' }} />,        label: 'Insurance',  sub: 'Protected coverage' },
            ].map(t => (
              <div key={t.label} className="flex items-start gap-2">
                {t.icon}
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#0f172a' }}>{t.label}</p>
                  <p className="text-[11px] leading-tight" style={{ color: '#94a3b8' }}>{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to={`/earn/${vault.id}`} className="flex items-center gap-1 text-[11px] font-semibold mt-3" style={{ color: '#15803d' }}>
            See full security details →
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Performance tab ───────────────────────────────────────────────────────────
const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function PerformanceBody({ vault: _vault }: { vault: Vault }) {
  const [perfTab, setPerfTab] = useState<PerfTab>('30D')

  const ppsData = PPS_DATA[perfTab]
  const apyData = APY_HISTORY[perfTab]
  const tvlData = PERF_DATA[perfTab]

  const latestPPS  = ppsData[ppsData.length - 1]?.v ?? 1.0107
  const earliestPPS = ppsData[0]?.v ?? 1.0000
  const ppsPct = ((latestPPS - earliestPPS) / earliestPPS * 100).toFixed(2)

  const allReturns = MONTHLY_RETURNS.flatMap(r => r.months.filter((v): v is number => v !== null))
  const maxReturn  = Math.max(...allReturns)
  const minReturn  = Math.min(...allReturns)
  const avgReturn  = (allReturns.reduce((s, v) => s + v, 0) / allReturns.length).toFixed(2)

  return (
    <div className="flex flex-col gap-4">
      {/* PPS chart */}
      <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-sm font-bold" style={{ color: '#0f172a' }}>Price Per Share (PPS)</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <p className="text-2xl font-black tabular-nums" style={{ color: '#0f172a' }}>{latestPPS.toFixed(4)}</p>
              <span className="text-sm font-semibold" style={{ color: '#15803d' }}>+{ppsPct}%</span>
            </div>
          </div>
          <div className="flex gap-0.5 rounded-lg p-0.5" style={{ background: '#f1f5f9' }}>
            {(['7D','30D','90D','1Y','All'] as PerfTab[]).map(t => (
              <button key={t} onClick={() => setPerfTab(t)} className="px-2 py-1 rounded-md text-[11px] font-semibold transition-colors"
                style={{ background: perfTab===t ? '#1a2e00' : 'transparent', color: perfTab===t ? '#c8f731' : '#64748b' }}>{t}</button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={ppsData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="ppsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#84cc16" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{ background: '#1a2e00', border: 'none', borderRadius: 8, padding: '6px 10px' }}
              labelStyle={{ display: 'none' }}
              formatter={(v) => [Number(v).toFixed(4), 'PPS']}
              itemStyle={{ color: '#c8f731', fontSize: 12, fontWeight: 700 }}
            />
            <Area type="monotone" dataKey="v" stroke="#84cc16" strokeWidth={2} fill="url(#ppsGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* APY history + TVL side by side */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
          <p className="text-sm font-bold mb-1" style={{ color: '#0f172a' }}>Rolling APY</p>
          <p className="text-xs mb-3" style={{ color: '#94a3b8' }}>7-day rolling APY over selected period</p>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={apyData} margin={{ top: 2, right: 2, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="apyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{ background: '#1e3a5f', border: 'none', borderRadius: 8, padding: '6px 10px' }}
                labelStyle={{ display: 'none' }}
                formatter={(v) => [`${Number(v).toFixed(2)}%`, 'APY']}
                itemStyle={{ color: '#93c5fd', fontSize: 12, fontWeight: 700 }}
              />
              <Area type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2} fill="url(#apyGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
          <p className="text-sm font-bold mb-1" style={{ color: '#0f172a' }}>TVL Growth</p>
          <p className="text-xs mb-3" style={{ color: '#94a3b8' }}>Total value locked over selected period</p>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={tvlData} margin={{ top: 2, right: 2, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="tvlGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{ background: '#2d1b5e', border: 'none', borderRadius: 8, padding: '6px 10px' }}
                labelStyle={{ display: 'none' }}
                formatter={(v) => [fmtTvl(Number(v) * 1_000_000 / 20), 'TVL']}
                itemStyle={{ color: '#c4b5fd', fontSize: 12, fontWeight: 700 }}
              />
              <Area type="monotone" dataKey="v" stroke="#8b5cf6" strokeWidth={2} fill="url(#tvlGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total return',   value: `+${ppsPct}%`,        sub: `since inception`,          color: '#15803d' },
          { label: 'Best month',     value: `+${maxReturn.toFixed(2)}%`, sub: 'All time',           color: '#15803d' },
          { label: 'Worst month',    value: `+${minReturn.toFixed(2)}%`, sub: 'All time',           color: '#d97706' },
          { label: 'Avg monthly',    value: `+${avgReturn}%`,     sub: 'Since inception',           color: '#0f172a' },
        ].map(s => (
          <div key={s.label} className="rounded-xl px-4 py-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <p className="text-[11px]" style={{ color: '#94a3b8' }}>{s.label}</p>
            <p className="text-lg font-black tabular-nums mt-0.5" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Monthly returns heatmap */}
      <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
        <p className="text-sm font-bold mb-4" style={{ color: '#0f172a' }}>Monthly returns</p>
        {/* Month header */}
        <div className="grid gap-1.5" style={{ gridTemplateColumns: '44px repeat(12, 1fr)' }}>
          <div />
          {MONTH_LABELS.map(m => (
            <p key={m} className="text-center text-[10px] font-semibold" style={{ color: '#94a3b8' }}>{m}</p>
          ))}
        </div>
        {/* Rows */}
        <div className="flex flex-col gap-1.5 mt-1.5">
          {MONTHLY_RETURNS.map(row => (
            <div key={row.year} className="grid gap-1.5" style={{ gridTemplateColumns: '44px repeat(12, 1fr)' }}>
              <p className="text-[11px] font-semibold self-center" style={{ color: '#64748b' }}>{row.year}</p>
              {row.months.map((v, i) => {
                if (v === null) return <div key={i} className="h-8 rounded-lg" style={{ background: '#f8fafc' }} />
                const intensity = (v - minReturn) / (maxReturn - minReturn)
                const bg = v >= 1.5 ? '#1a2e00' : v >= 1.2 ? '#3d6b00' : v >= 1.0 ? '#84cc16' : '#bef264'
                const textC = v >= 1.2 ? '#c8f731' : '#1a2e00'
                return (
                  <div key={i} className="h-8 rounded-lg flex items-center justify-center cursor-default transition-opacity hover:opacity-80"
                    style={{ background: bg, opacity: 0.5 + intensity * 0.5 }}
                    title={`${MONTH_LABELS[i]} ${row.year}: +${v.toFixed(2)}%`}>
                    <span className="text-[10px] font-bold" style={{ color: textC }}>{v.toFixed(1)}%</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <p className="text-[10px]" style={{ color: '#94a3b8' }}>Lower</p>
          {['#bef264','#84cc16','#3d6b00','#1a2e00'].map(c => (
            <div key={c} className="h-3 w-6 rounded-sm" style={{ background: c }} />
          ))}
          <p className="text-[10px]" style={{ color: '#94a3b8' }}>Higher</p>
        </div>
      </div>
    </div>
  )
}

// ── Composition tab ───────────────────────────────────────────────────────────
const COMPOSITION_DATA = [
  { name: 'Hyperliquid', amount: 212241.05, pct: 77.88, color: '#1a2e00', initial: 'H' },
  { name: 'Pendle V2',   amount: 50401.37,  pct: 18.49, color: '#6366f1', initial: 'P' },
  { name: 'HyperLend',   amount: 6024.05,   pct: 2.21,  color: '#0d9488', initial: 'L' },
  { name: 'Morpho',      amount: 3359.87,   pct: 1.23,  color: '#3b82f6', initial: 'M' },
  { name: 'Wallet',      amount: 467.57,    pct: 0.17,  color: '#94a3b8', initial: 'W' },
]

function CompositionBody() {
  const total = COMPOSITION_DATA.reduce((s, r) => s + r.amount, 0)
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <p className="text-base font-bold" style={{ color: '#0f172a' }}>Composition <span className="text-sm font-normal" style={{ color: '#94a3b8' }}>ⓘ</span></p>
        <div className="flex items-center gap-2">
          {[{ label: 'HL', color: '#1a2e00' }, { label: 'B', color: '#f97316' }].map(b => (
            <div key={b.label} className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-black text-white" style={{ background: b.color }}>{b.label}</div>
          ))}
        </div>
      </div>
      {/* Table header */}
      <div className="grid grid-cols-[2fr_1fr_1fr] px-5 py-2.5" style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
        {['Protocol', 'Amount', 'Percentage'].map(h => (
          <p key={h} className="text-sm" style={{ color: '#94a3b8' }}>{h}</p>
        ))}
      </div>
      {/* Rows */}
      {COMPOSITION_DATA.map((r, i) => (
        <div key={r.name} className="grid grid-cols-[2fr_1fr_1fr] items-center px-5 py-3.5" style={{ borderBottom: i < COMPOSITION_DATA.length - 1 ? '1px solid #f8fafc' : undefined }}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: r.color }}>{r.initial}</div>
            <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{r.name}</p>
          </div>
          <p className="text-sm tabular-nums" style={{ color: '#0f172a' }}>${r.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-sm tabular-nums" style={{ color: '#0f172a' }}>{r.pct.toFixed(2)}%</p>
        </div>
      ))}
      {/* Total row */}
      <div className="grid grid-cols-[2fr_1fr_1fr] items-center px-5 py-3.5" style={{ background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
        <p className="text-sm font-bold" style={{ color: '#0f172a' }}>Total</p>
        <p className="text-sm font-bold tabular-nums" style={{ color: '#0f172a' }}>${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p className="text-sm font-bold" style={{ color: '#0f172a' }}>100%</p>
      </div>
    </div>
  )
}

// ── Activity tab ──────────────────────────────────────────────────────────────
// ── Main export ───────────────────────────────────────────────────────────────

interface VaultPosition {
  value: number
  valueFormatted: string
  pnl: number
  pnlFormatted: string
  pnlPercent: number
  depositedAt: string
  pendingWithdrawal?: number
  pendingWithdrawalFormatted?: string
  pendingArrival?: string
  completedWithdrawal?: number
  completedWithdrawalFormatted?: string
  completedAt?: string
  completedTxHash?: string
}

interface VaultDetailPanel3Props {
  vault: Vault
  onClose: () => void
  onDeposit: (id: string) => void
  onWithdraw?: (id: string) => void
  position?: VaultPosition
}

export function VaultDetailPanel3({ vault, onClose, onDeposit, onWithdraw, position }: VaultDetailPanel3Props) {
  type Tab = 'overview' | 'composition' | 'performance' | 'activity' | 'risk'
  const [tab, setTab] = useState<Tab>('overview')
  const TABS: { id: Tab; label: string }[] = [
    { id: 'overview',    label: 'Overview' },
    { id: 'composition', label: 'Composition' },
    { id: 'performance', label: 'Performance' },
    { id: 'activity',    label: 'Activity' },
    { id: 'risk',        label: 'Risk' },
  ]

  return (
    <div className="flex flex-col gap-4">
      <VaultHeader vault={vault} onClose={onClose} onDeposit={onDeposit} />

      {/* Pending withdrawal banner */}
      {position?.pendingWithdrawal && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 14, padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock style={{ width: 16, height: 16, color: '#d97706' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: 0 }}>Withdrawal pending</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: '#fef3c7', color: '#d97706' }}>
                  <span className="animate-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                  Processing
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 12px' }}>
                <strong style={{ color: '#0f172a' }}>{position.pendingWithdrawalFormatted}</strong> requested · estimated arrival <strong style={{ color: '#0f172a' }}>{position.pendingArrival}</strong>
              </p>
              {/* Mini timeline */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {[
                  { label: 'Requested', done: true },
                  { label: 'Processing', done: false, active: true },
                  { label: 'Transferred', done: false },
                ].map((s, i) => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                    {i > 0 && <div style={{ height: 1, width: 56, background: s.done ? '#86efac' : s.active ? '#fde68a' : '#e2e8f0' }} />}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 26, height: 26, borderRadius: '50%', border: `1.5px solid ${s.done ? '#22c55e' : s.active ? '#d97706' : '#cbd5e1'}`, background: s.done ? '#dcfce7' : s.active ? '#fef3c7' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {s.done
                          ? <CheckCircle2 style={{ width: 13, height: 13, color: '#22c55e' }} />
                          : s.active
                            ? <Clock style={{ width: 12, height: 12, color: '#d97706' }} />
                            : <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>{i + 1}</span>}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: s.active ? '#d97706' : '#94a3b8', whiteSpace: 'nowrap' }}>{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completed withdrawal banner */}
      {position?.completedWithdrawal && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle2 style={{ width: 16, height: 16, color: '#16a34a' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: 0 }}>Withdrawal sent</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: '#dcfce7', color: '#16a34a' }}>
                  <CheckCircle2 style={{ width: 11, height: 11 }} />
                  Completed
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 10px' }}>
                <strong style={{ color: '#0f172a' }}>{position.completedWithdrawalFormatted}</strong> was sent to your wallet on <strong style={{ color: '#0f172a' }}>{position.completedAt}</strong>.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <a href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#16a34a', textDecoration: 'none', padding: '4px 10px', borderRadius: 8, background: '#dcfce7', border: '1px solid #bbf7d0' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                  View in Portfolio
                </a>
                <a
                  href={`https://www.hyperliquid.xyz/explorer/tx/${position.completedTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#475569', textDecoration: 'none', padding: '4px 10px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  View on HyperEVMscan
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex" style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className="flex-1 py-2.5 text-xs font-semibold transition-colors"
            style={{ background: tab === t.id ? '#f0fdf4' : 'transparent', color: tab === t.id ? '#1a2e00' : '#64748b', borderBottom: tab === t.id ? '2px solid #84cc16' : '2px solid transparent' }}>
            {t.label}
          </button>
        ))}
      </div>
      {/* Tab content */}
      {tab === 'overview'     && <OverviewBody vault={vault} onDeposit={onDeposit} onWithdraw={onWithdraw} position={position} onSwitchToComposition={() => setTab('composition')} />}
      {tab === 'composition'  && <CompositionBody />}
      {tab === 'performance'  && <PerformanceBody vault={vault} />}
      {tab === 'activity'     && <ActivityBody vault={vault} />}
      {tab !== 'overview' && tab !== 'composition' && tab !== 'performance' && tab !== 'activity' && (
        <div className="rounded-2xl p-8 flex flex-col items-center justify-center" style={{ background: '#fff', border: '1px solid #e2e8f0', minHeight: 200 }}>
          <p className="text-sm font-semibold" style={{ color: '#94a3b8' }}>{TABS.find(t2 => t2.id === tab)?.label} — coming soon</p>
          <Link to={`/earn/${vault.id}`} className="text-xs mt-2 underline underline-offset-2" style={{ color: '#3b82f6' }}>View on full page</Link>
        </div>
      )}
    </div>
  )
}

function ActivityBody({ vault: _vault }: { vault: Vault }) {
  const [myOnly, setMyOnly] = useState(false)
  const rows = myOnly ? MY_ACTIVITY : VAULT_ACTIVITY

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      {/* Filter bar */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <p className="text-sm font-bold" style={{ color: '#0f172a' }}>Activity</p>
        <div className="flex items-center gap-2 ml-auto">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div onClick={() => setMyOnly(v => !v)}
              className="relative flex h-5 w-9 items-center rounded-full transition-colors"
              style={{ background: myOnly ? '#1a2e00' : '#e2e8f0' }}>
              <div className="absolute h-4 w-4 rounded-full bg-white shadow transition-all"
                style={{ left: myOnly ? 18 : 2 }} />
            </div>
            <span className="text-xs font-semibold" style={{ color: myOnly ? '#1a2e00' : '#94a3b8' }}>My activity</span>
          </label>
        </div>
      </div>
      {/* Table header */}
      <div className="grid items-center px-4 py-2" style={{ gridTemplateColumns: '130px 1fr 90px 60px 70px 80px 32px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
        {['Type', 'User', 'Amount', 'Token', 'PPS', 'Time', ''].map(h => (
          <p key={h} className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>{h}</p>
        ))}
      </div>
      {/* Rows */}
      <div className="flex flex-col">
        {rows.length === 0 && (
          <div className="flex items-center justify-center py-10">
            <p className="text-sm" style={{ color: '#94a3b8' }}>No activity found</p>
          </div>
        )}
        {rows.map((a, i) => {
          const isDeposit = a.type === 'deposit'
          const tc = ASSET_COLOR[a.token] ?? '#94a3b8'
          const isMe = a.user === '0x3e...8795'
          return (
            <div key={i} className="grid items-center px-4 py-2.5 transition-colors hover:bg-slate-50"
              style={{ gridTemplateColumns: '130px 1fr 90px 60px 70px 80px 32px', borderBottom: i < rows.length - 1 ? '1px solid #f8fafc' : undefined, background: isMe && myOnly ? '#f0fdf4' : undefined }}>
              {/* Type */}
              <div className="flex items-center gap-1.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ background: isDeposit ? '#dcfce7' : '#fee2e2' }}>
                  {isDeposit
                    ? <ArrowDownLeft style={{ width: 11, height: 11, color: '#15803d' }} />
                    : <ArrowUpRight  style={{ width: 11, height: 11, color: '#dc2626' }} />}
                </div>
                <span className="text-[11px] font-semibold capitalize" style={{ color: isDeposit ? '#15803d' : '#dc2626' }}>{a.type}</span>
              </div>
              {/* User */}
              <p className="text-xs font-mono" style={{ color: isMe ? '#1a2e00' : '#475569', fontWeight: isMe ? 700 : 400 }}>{a.user}{isMe && <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#dcfce7', color: '#15803d' }}>you</span>}</p>
              {/* Amount */}
              <p className="text-xs font-bold tabular-nums" style={{ color: '#0f172a' }}>${a.amount.toLocaleString()}</p>
              {/* Token */}
              <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-md w-fit" style={{ background: tc + '18', color: tc }}>{a.token}</span>
              {/* PPS */}
              <p className="text-xs tabular-nums" style={{ color: '#64748b' }}>{a.pps.toFixed(4)}</p>
              {/* Time */}
              <p className="text-[11px]" style={{ color: '#94a3b8' }}>{a.time}</p>
              {/* HyperEVMScan link */}
              <a href={`https://hyperevm-scan.io/tx/${a.txHash}`} target="_blank" rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-slate-100" style={{ color: '#94a3b8' }}>
                <ArrowUpRight style={{ width: 12, height: 12 }} />
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
