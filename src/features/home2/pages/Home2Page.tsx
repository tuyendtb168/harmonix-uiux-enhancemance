import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, TrendingUp, Shield, Zap, ArrowUpRight } from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────────────────────

const VAULTS = [
  {
    id: 'delta-neutral-usdc',
    name: 'Delta Neutral USDC',
    asset: 'USDC', assetColor: '#2775CA',
    apy: '12.4', risk: 'Low', riskColor: '#16a34a', riskBg: '#dcfce7',
    tvl: '$2.4M', depositors: '1,240', tag: 'Core', tagColor: '#22c55e',
    desc: 'Delta-neutral strategy capturing funding rates. Stable yield with minimal directional exposure.',
  },
  {
    id: 'eth-yield-max',
    name: 'ETH Yield Max',
    asset: 'ETH', assetColor: '#627EEA',
    apy: '18.2', risk: 'Medium', riskColor: '#d97706', riskBg: '#fef3c7',
    tvl: '$1.2M', depositors: '842', tag: 'Growth', tagColor: '#a855f7',
    desc: 'Maximizes ETH yield through diversified on-chain strategies.',
  },
  {
    id: 'btc-bull-run',
    name: 'BTC Bull Run',
    asset: 'BTC', assetColor: '#F7931A',
    apy: '24.8', risk: 'High', riskColor: '#dc2626', riskBg: '#fee2e2',
    tvl: '$890K', depositors: '568', tag: 'Aggressive', tagColor: '#ef4444',
    desc: 'Leveraged BTC exposure with automated risk management.',
  },
]

const PLATFORM_STATS = [
  { label: 'Total Value Locked', value: '$24.8M', sub: '+3.2% this week', color: '#16a34a' },
  { label: 'Total Yield Paid', value: '$3.2M', sub: 'Since launch', color: '#3b82f6' },
  { label: 'Active Vaults', value: '8', sub: 'Across strategies', color: '#a855f7' },
  { label: 'Average APY', value: '14.6%', sub: 'Weighted avg', color: '#f59e0b' },
]

const ACTIVITY = [
  { id: 'a1', type: 'deposit',  label: 'Deposit',     vault: 'Delta Neutral USDC', amount: '+5,000 USDC',  time: '10 min ago' },
  { id: 'a2', type: 'earn',     label: 'Yield Paid',  vault: 'ETH Yield Max',      amount: '+0.024 ETH',   time: '1h ago' },
  { id: 'a3', type: 'deposit',  label: 'Deposit',     vault: 'BTC Bull Run',        amount: '+0.5 BTC',     time: '3h ago' },
  { id: 'a4', type: 'withdraw', label: 'Withdrawal',  vault: 'Delta Neutral USDC', amount: '-2,000 USDC',  time: '6h ago' },
]

const TRUST_BADGES = [
  { icon: '🔐', title: 'Audited Contracts', sub: 'Dec 2024' },
  { icon: '🔑', title: 'Self-Custody', sub: 'You hold keys' },
  { icon: '⚡', title: 'Auto-Compound', sub: 'No claims needed' },
]

// ── Navbar ────────────────────────────────────────────────────────────────────

function H2Navbar() {
  const links = [
    { label: 'Overview', active: true },
    { label: 'Invest', dropdown: true },
    { label: 'Portfolio' },
    { label: 'Rewards' },
    { label: 'Referrals' },
    { label: 'More', dropdown: true },
  ]
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
          {links.map(l => (
            <button key={l.label} className="flex items-center gap-0.5 px-3 py-1.5 text-sm font-medium rounded transition-colors"
              style={{ color: l.active ? '#1a2e00' : '#64748b', borderBottom: l.active ? '2px solid #84cc16' : '2px solid transparent', background: l.active ? '#f0fdf4' : 'transparent' }}>
              {l.label}
              {l.dropdown && <ChevronDown style={{ width: 12, height: 12 }} />}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/portfolio2" className="text-xs font-medium rounded-lg px-3 py-1.5 transition-colors"
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b' }}>
            My Portfolio
          </Link>
          <button className="text-sm font-bold rounded-lg px-4 py-1.5 transition-opacity hover:opacity-90"
            style={{ background: '#1a2e00', color: '#c8f731' }}>
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  )
}

// ── Left Panel: Platform Stats ────────────────────────────────────────────────

function PlatformPanel() {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      <div className="pb-3" style={{ borderBottom: '1px solid #e2e8f0' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: '#84cc16' }} />
          <span className="text-xs font-semibold" style={{ color: '#16a34a' }}>Live on Hyperliquid</span>
        </div>
        <p className="text-[11px] font-medium" style={{ color: '#64748b' }}>Platform Overview</p>
      </div>

      {PLATFORM_STATS.map(s => (
        <div key={s.label} className="rounded-lg px-3 py-2.5" style={{ background: '#f8fafc' }}>
          <p className="text-[11px]" style={{ color: '#64748b' }}>{s.label}</p>
          <p className="text-base font-black tabular-nums mt-0.5" style={{ color: s.color }}>{s.value}</p>
          <p className="text-[11px]" style={{ color: '#94a3b8' }}>{s.sub}</p>
        </div>
      ))}

      <div className="rounded-lg px-3 py-2.5" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <p className="text-[11px]" style={{ color: '#64748b' }}>Withdraw SLA</p>
        <p className="text-base font-black" style={{ color: '#15803d' }}>≤ 3 days</p>
        <p className="text-[11px]" style={{ color: '#16a34a' }}>Guaranteed timeline</p>
      </div>

      <div className="flex flex-col gap-1.5 pt-1" style={{ borderTop: '1px solid #f1f5f9' }}>
        <p className="text-[11px] font-semibold" style={{ color: '#64748b' }}>Security</p>
        {TRUST_BADGES.map(b => (
          <div key={b.title} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: '#f8fafc' }}>
            <span style={{ fontSize: 14 }}>{b.icon}</span>
            <div>
              <p className="text-[11px] font-semibold" style={{ color: '#0f172a' }}>{b.title}</p>
              <p className="text-[10px]" style={{ color: '#94a3b8' }}>{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Hero Banner ───────────────────────────────────────────────────────────────

function HeroBanner() {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #1a2e00 0%, #2d4a00 100%)', border: '1px solid #3a5c00' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: '#c8f731' }} />
        <span className="text-xs font-semibold" style={{ color: '#c8f731' }}>Valantis points are live</span>
      </div>
      <h1 className="text-2xl font-black leading-tight mb-2" style={{ color: '#fff' }}>
        Institutional Yield<br />on Hyperliquid
      </h1>
      <p className="text-sm mb-5" style={{ color: '#a3c45a' }}>
        Deposit once. Earn automatically. Full self-custody with institutional-grade strategies.
      </p>
      <div className="flex gap-3 flex-wrap">
        <Link to="/earn" className="flex items-center gap-1.5 text-sm font-bold rounded-lg px-4 py-2 transition-opacity hover:opacity-90"
          style={{ background: '#c8f731', color: '#1a2e00' }}>
          Explore Vaults
          <ArrowUpRight style={{ width: 14, height: 14 }} />
        </Link>
        <Link to="/portfolio" className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-4 py-2 transition-colors"
          style={{ background: 'transparent', border: '1px solid #4a7a00', color: '#c8f731' }}>
          View Performance
        </Link>
      </div>
    </div>
  )
}

// ── Vault Cards ───────────────────────────────────────────────────────────────

function VaultCard({ v }: { v: typeof VAULTS[0] }) {
  return (
    <div className="rounded-xl p-4 transition-shadow hover:shadow-md" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black"
            style={{ background: v.assetColor + '18', color: v.assetColor, border: `1.5px solid ${v.assetColor}44` }}>
            {v.asset.slice(0, 1)}
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{v.name}</p>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5 inline-block"
              style={{ background: v.tagColor + '22', color: v.tagColor }}>{v.tag}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-black tabular-nums" style={{ color: '#15803d' }}>{v.apy}%</p>
          <p className="text-[10px]" style={{ color: '#64748b' }}>APY</p>
        </div>
      </div>

      <p className="text-xs mb-3 leading-relaxed" style={{ color: '#64748b' }}>{v.desc}</p>

      <div className="flex items-center justify-between text-xs mb-3">
        <div>
          <span style={{ color: '#94a3b8' }}>TVL </span>
          <span className="font-semibold" style={{ color: '#0f172a' }}>{v.tvl}</span>
        </div>
        <div>
          <span style={{ color: '#94a3b8' }}>Depositors </span>
          <span className="font-semibold" style={{ color: '#0f172a' }}>{v.depositors}</span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: v.riskBg, color: v.riskColor }}>{v.risk} Risk</span>
      </div>

      <Link to={`/earn/${v.id}`} className="flex items-center justify-center gap-1.5 w-full text-sm font-bold rounded-lg py-2 transition-opacity hover:opacity-90"
        style={{ background: '#1a2e00', color: '#c8f731' }}>
        Deposit
        <TrendingUp style={{ width: 13, height: 13 }} />
      </Link>
    </div>
  )
}

function VaultsSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-base font-semibold" style={{ color: '#1e293b' }}>Recommended Vaults</p>
        <Link to="/earn" className="text-sm font-medium flex items-center gap-1" style={{ color: '#3b82f6' }}>
          View all <ChevronRight style={{ width: 14, height: 14 }} />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {VAULTS.map(v => <VaultCard key={v.id} v={v} />)}
      </div>
    </div>
  )
}

// ── Protocol Health ───────────────────────────────────────────────────────────

const HEALTH = [
  { label: 'TVL', value: '$148.62M', icon: '💰' },
  { label: 'Active Depositors', value: '34,251', icon: '👥' },
  { label: 'Vaults', value: '42', icon: '🏦' },
  { label: 'Audits', value: '7', icon: '🔐' },
  { label: 'Withdraw SLA', value: '≤3 days', icon: '⏱️' },
]

function ProtocolHealth() {
  return (
    <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      <p className="text-sm font-semibold mb-4" style={{ color: '#1e293b' }}>Protocol Health</p>
      <div className="grid grid-cols-5 gap-3">
        {HEALTH.map(h => (
          <div key={h.label} className="text-center rounded-xl p-3" style={{ background: '#f8fafc' }}>
            <p style={{ fontSize: 20 }}>{h.icon}</p>
            <p className="text-base font-black mt-1 tabular-nums" style={{ color: '#0f172a' }}>{h.value}</p>
            <p className="text-[10px] mt-0.5 leading-tight" style={{ color: '#64748b' }}>{h.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Recent Activity ───────────────────────────────────────────────────────────

const ACT_STYLE: Record<string, { bg: string; color: string }> = {
  deposit:  { bg: '#dcfce7', color: '#16a34a' },
  earn:     { bg: '#eff6ff', color: '#2563eb' },
  withdraw: { bg: '#fee2e2', color: '#dc2626' },
}

function RecentActivity() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-base font-semibold" style={{ color: '#1e293b' }}>Recent Platform Activity</p>
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>Live</span>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #e2e8f0', background: '#fff' }}>
        {ACTIVITY.map((item, i) => {
          const s = ACT_STYLE[item.type] ?? { bg: '#f8fafc', color: '#64748b' }
          return (
            <div key={item.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors"
              style={{ borderBottom: i < ACTIVITY.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                {item.type === 'deposit'  && <ArrowUpRight  style={{ width: 13, height: 13, color: s.color }} />}
                {item.type === 'earn'     && <Zap           style={{ width: 13, height: 13, color: s.color }} />}
                {item.type === 'withdraw' && <Shield        style={{ width: 13, height: 13, color: s.color }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>{item.label}</p>
                <p className="text-xs truncate" style={{ color: '#64748b' }}>{item.vault}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold tabular-nums" style={{ color: s.color }}>{item.amount}</p>
                <p className="text-[11px]" style={{ color: '#94a3b8' }}>{item.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Community ─────────────────────────────────────────────────────────────────

function CommunitySection() {
  const links = [
    { label: 'X (Twitter)', href: '#', icon: '𝕏' },
    { label: 'Telegram',    href: '#', icon: '✈️' },
    { label: 'Discord',     href: '#', icon: '💬' },
    { label: 'Docs',        href: '#', icon: '📖' },
  ]
  return (
    <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      <p className="text-sm font-semibold mb-3" style={{ color: '#1e293b' }}>Community & Resources</p>
      <div className="grid grid-cols-4 gap-3">
        {links.map(l => (
          <a key={l.label} href={l.href} className="flex flex-col items-center gap-1.5 rounded-xl p-3 transition-colors hover:bg-slate-50"
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: 20 }}>{l.icon}</span>
            <span className="text-[11px] font-medium text-center" style={{ color: '#475569' }}>{l.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Bottom Bar ────────────────────────────────────────────────────────────────

function BottomBar() {
  return (
    <div className="flex items-center justify-between px-6 py-3.5" style={{ background: '#fff', borderTop: '1px solid #e2e8f0' }}>
      <p className="text-sm" style={{ color: '#64748b' }}>
        Need help?{' '}
        <a href="#" className="underline underline-offset-2" style={{ color: '#3b82f6' }}>Read the docs</a>
      </p>
      <Link to="/earn" className="px-5 py-2 rounded-lg text-sm font-bold transition-opacity hover:opacity-90"
        style={{ background: '#1a2e00', color: '#c8f731' }}>
        Start Earning
      </Link>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function Home2Page() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <H2Navbar />

      <div className="flex-1 mx-auto w-full max-w-7xl px-6 py-6">
        <div className="flex gap-5 items-start">

          {/* Left: Platform stats — sticky */}
          <div className="w-56 shrink-0 sticky top-[80px] self-start">
            <PlatformPanel />
          </div>

          {/* Right: main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <HeroBanner />
            <VaultsSection />
            <ProtocolHealth />
            <RecentActivity />
            <CommunitySection />
          </div>

        </div>
      </div>

      <BottomBar />
    </div>
  )
}
